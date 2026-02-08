import { test, expect } from '@playwright/test';
import fs from 'fs/promises';
import path from 'path';
import { generateSaliencyHeatmap } from './utils/saliencyHeatmap.js';

test('generate CV saliency heatmap', async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium', 'Heatmap generation runs only on chromium.');

  await page.goto('/');
  const cvIcon = page.getByRole('button', { name: 'Curriculum Vitae' });
  await expect(cvIcon).toBeVisible({ timeout: 30000 });
  await cvIcon.click();

  const cvContent = page.getByLabel('Curriculum Vitae content');
  await expect(cvContent).toBeVisible();

  const artifactsDir = path.join(process.cwd(), 'tests', 'artifacts');
  const publicHeatmapDir = path.join(process.cwd(), 'public', 'heatmaps');
  await fs.mkdir(artifactsDir, { recursive: true });
  await fs.mkdir(publicHeatmapDir, { recursive: true });

  const copyIfExists = async (source, destination) => {
    try {
      await fs.stat(source);
      await fs.copyFile(source, destination);
    } catch (error) {
      if (error?.code !== 'ENOENT') {
        throw error;
      }
    }
  };

  const headerPath = path.join(artifactsDir, 'cv-header.png');
  const headerHeatmapPath = path.join(artifactsDir, 'cv-heatmap-header.png');
  const headerOverlayPath = path.join(artifactsDir, 'cv-heatmap-header-overlay.png');
  const publicHeaderOverlayPath = path.join(publicHeatmapDir, 'cv-heatmap-header-overlay.png');
  const publicHeaderBaselinePath = path.join(
    publicHeatmapDir,
    'cv-heatmap-header-overlay-baseline.png'
  );
  const screenshotPath = path.join(artifactsDir, 'cv-window.png');
  const heatmapPath = path.join(artifactsDir, 'cv-heatmap.png');
  const overlayPath = path.join(artifactsDir, 'cv-heatmap-overlay.png');
  const publicOverlayPath = path.join(publicHeatmapDir, 'cv-heatmap-overlay.png');
  const publicBaselinePath = path.join(publicHeatmapDir, 'cv-heatmap-overlay-baseline.png');

  await copyIfExists(publicOverlayPath, publicBaselinePath);
  await copyIfExists(publicHeaderOverlayPath, publicHeaderBaselinePath);

  const cvHeader = page.getByLabel('Curriculum Vitae header');
  await expect(cvHeader).toBeVisible();
  await cvHeader.screenshot({ path: headerPath });
  await generateSaliencyHeatmap({
    inputPath: headerPath,
    heatmapPath: headerHeatmapPath,
    overlayPath: headerOverlayPath,
    targetWidth: 96,
  });

  await page.evaluate(() => {
    const existing = document.querySelector('[data-heatmap-capture="cv"]');
    if (existing) {
      existing.remove();
    }

    const content = document.querySelector('[aria-label="Curriculum Vitae content"]');
    if (!content) {
      return;
    }

    const contentStyles = getComputedStyle(content);
    const container = document.createElement('div');
    container.setAttribute('data-heatmap-capture', 'cv');
    container.style.position = 'absolute';
    container.style.left = '0';
    container.style.top = '0';
    container.style.zIndex = '9999';
    container.style.width = `${content.getBoundingClientRect().width}px`;
    container.style.background = contentStyles.backgroundColor || '#fff';
    container.style.pointerEvents = 'none';

    const clone = content.cloneNode(true);
    clone.style.height = 'auto';
    clone.style.maxHeight = 'none';
    clone.style.overflow = 'visible';
    clone.style.position = 'static';
    clone.style.width = '100%';

    container.appendChild(clone);
    document.body.appendChild(container);
    container.style.height = `${clone.scrollHeight}px`;
  });

  const capture = page.locator('[data-heatmap-capture="cv"]');
  await expect(capture).toBeVisible();
  await capture.screenshot({ path: screenshotPath });

  await page.evaluate(() => {
    document.querySelector('[data-heatmap-capture="cv"]')?.remove();
  });
  await generateSaliencyHeatmap({
    inputPath: screenshotPath,
    heatmapPath,
    overlayPath,
  });

  await expect(fs.stat(heatmapPath)).resolves.toBeTruthy();
  await expect(fs.stat(overlayPath)).resolves.toBeTruthy();
  await expect(fs.stat(headerHeatmapPath)).resolves.toBeTruthy();
  await expect(fs.stat(headerOverlayPath)).resolves.toBeTruthy();
  await fs.copyFile(headerOverlayPath, publicHeaderOverlayPath);
  await expect(fs.stat(publicHeaderOverlayPath)).resolves.toBeTruthy();
  await fs.copyFile(overlayPath, publicOverlayPath);
  await expect(fs.stat(publicOverlayPath)).resolves.toBeTruthy();
});
