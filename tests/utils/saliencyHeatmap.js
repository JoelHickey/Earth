import sharp from 'sharp';
import { fft, ifft } from 'fft-js';

const EPSILON = 1e-8;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const nextPowerOfTwo = (value) => {
  if (value <= 1) {
    return 1;
  }
  return 2 ** Math.ceil(Math.log2(value));
};

const fft2d = (matrix) => {
  const rows = matrix.length;
  const cols = matrix[0].length;

  const rowTransformed = matrix.map((row) => fft(row));
  const output = Array.from({ length: rows }, () => Array(cols));

  for (let col = 0; col < cols; col += 1) {
    const column = rowTransformed.map((row) => row[col]);
    const columnTransformed = fft(column);
    for (let row = 0; row < rows; row += 1) {
      output[row][col] = columnTransformed[row];
    }
  }

  return output;
};

const ifft2d = (matrix) => {
  const rows = matrix.length;
  const cols = matrix[0].length;

  const rowTransformed = matrix.map((row) => ifft(row));
  const output = Array.from({ length: rows }, () => Array(cols));

  for (let col = 0; col < cols; col += 1) {
    const column = rowTransformed.map((row) => row[col]);
    const columnTransformed = ifft(column);
    for (let row = 0; row < rows; row += 1) {
      output[row][col] = columnTransformed[row];
    }
  }

  return output;
};

const boxBlur = (matrix, kernelSize = 3) => {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const radius = Math.floor(kernelSize / 2);
  const output = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      let sum = 0;
      let count = 0;
      for (let ky = -radius; ky <= radius; ky += 1) {
        for (let kx = -radius; kx <= radius; kx += 1) {
          const ny = clamp(y + ky, 0, rows - 1);
          const nx = clamp(x + kx, 0, cols - 1);
          sum += matrix[ny][nx];
          count += 1;
        }
      }
      output[y][x] = sum / count;
    }
  }

  return output;
};

const percentile = (values, pct) => {
  if (!values.length) {
    return 0;
  }
  const sorted = [...values].sort((a, b) => a - b);
  const index = clamp(Math.round((sorted.length - 1) * pct), 0, sorted.length - 1);
  return sorted[index];
};

const normalizeMatrix = (
  matrix,
  {
    lowPercentile = 0.05,
    highPercentile = 0.95,
    gamma = 0.7,
  } = {}
) => {
  const values = matrix.flat();
  let min = percentile(values, lowPercentile);
  let max = percentile(values, highPercentile);

  if (max <= min) {
    min = Math.min(...values);
    max = Math.max(...values);
  }

  const range = max - min || 1;

  return matrix.map((row) =>
    row.map((value) => {
      const normalized = clamp((value - min) / range, 0, 1);
      return Math.pow(normalized, gamma);
    })
  );
};

const createHeatmapColors = (values) => {
  const output = Buffer.alloc(values.length * 4);

  for (let i = 0; i < values.length; i += 1) {
    const value = clamp(values[i], 0, 1);
    const r = Math.round(255 * Math.min(1, Math.max(0, (value - 0.5) * 2)));
    const g = Math.round(255 * Math.min(1, Math.max(0, 1 - Math.abs(value - 0.5) * 2)));
    const b = Math.round(255 * Math.min(1, Math.max(0, (0.5 - value) * 2)));
    const offset = i * 4;
    output[offset] = r;
    output[offset + 1] = g;
    output[offset + 2] = b;
    output[offset + 3] = 200;
  }

  return output;
};

const buildSaliencyMap = (matrix) => {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const spectrum = fft2d(matrix);

  const logAmplitude = Array.from({ length: rows }, () => Array(cols).fill(0));
  const phase = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      const [re, im] = spectrum[y][x];
      const amplitude = Math.sqrt(re * re + im * im) + EPSILON;
      logAmplitude[y][x] = Math.log(amplitude);
      phase[y][x] = Math.atan2(im, re);
    }
  }

  const averageLogAmplitude = boxBlur(logAmplitude, 3);
  const newSpectrum = Array.from({ length: rows }, () => Array(cols));

  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      const spectralResidual = logAmplitude[y][x] - averageLogAmplitude[y][x];
      const amplitude = Math.exp(spectralResidual);
      const angle = phase[y][x];
      newSpectrum[y][x] = [amplitude * Math.cos(angle), amplitude * Math.sin(angle)];
    }
  }

  const saliencyComplex = ifft2d(newSpectrum);
  const saliency = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      const [re, im] = saliencyComplex[y][x];
      saliency[y][x] = re * re + im * im;
    }
  }

  return normalizeMatrix(saliency, {
    lowPercentile: 0.05,
    highPercentile: 0.95,
    gamma: 0.7,
  });
};

export const generateSaliencyHeatmap = async ({
  inputPath,
  heatmapPath,
  overlayPath,
  targetWidth = 128,
}) => {
  const metadata = await sharp(inputPath).metadata();
  const originalWidth = metadata.width ?? 1;
  const originalHeight = metadata.height ?? 1;
  const aspectRatio = originalHeight / originalWidth;

  let smallWidth = nextPowerOfTwo(targetWidth);
  let smallHeight = nextPowerOfTwo(Math.max(32, Math.round(targetWidth * aspectRatio)));

  if (smallWidth > 256) {
    smallWidth = 256;
  }
  if (smallHeight > 256) {
    smallHeight = 256;
  }

  const { data, info } = await sharp(inputPath)
    .resize(smallWidth, smallHeight, { fit: 'fill' })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const grayscale = [];
  for (let i = 0; i < data.length; i += info.channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    grayscale.push((0.299 * r + 0.587 * g + 0.114 * b) / 255);
  }

  const matrix = Array.from({ length: info.height }, (_, row) =>
    grayscale.slice(row * info.width, (row + 1) * info.width)
  );

  const saliencyMap = buildSaliencyMap(matrix);
  const flatSaliency = saliencyMap.flat();

  const heatmapBuffer = createHeatmapColors(flatSaliency);
  const heatmapImage = sharp(heatmapBuffer, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    },
  })
    .resize(originalWidth, originalHeight, { fit: 'fill' })
    .blur(3);

  const heatmapPng = await heatmapImage.png().toBuffer();
  await sharp(heatmapPng).toFile(heatmapPath);

  await sharp(inputPath)
    .composite([{ input: heatmapPng, blend: 'over', opacity: 0.6 }])
    .png()
    .toFile(overlayPath);
};
