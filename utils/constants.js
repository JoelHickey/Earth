// Slider configurations
export const INPUT_SLIDERS = [
  { name: 'sleepQuality', label: 'Sleep Quality' },
  { name: 'waterLevel', label: 'Water', unit: 'ml', multiplier: 300 },
  { name: 'caffeineLevel', label: 'Coffee', unit: 'shots', multiplier: 1 },
  { name: 'foodLevel', label: 'Food', unit: 'cal', multiplier: 300 },
  { name: 'walkLevel', label: 'Walk', unit: 'km', multiplier: 1 },
  { name: 'alcoholLevel', label: 'Alcohol', unit: 'drinks', multiplier: 1 },
  { name: 'sugarLevel', label: 'Sugar', unit: 'g', multiplier: 10 }
];

export const EMOTION_SLIDERS = [
  { name: 'anxiety', label: 'Anxiety' },
  { name: 'stress', label: 'Stress' },
  { name: 'energy', label: 'Energy' },
  { name: 'sadness', label: 'Sadness' },
  { name: 'anger', label: 'Anger' },
  { name: 'irritability', label: 'Irritability' },
  { name: 'dread', label: 'Dread' }
];

// View button configurations
export const VIEW_BUTTONS = [];

// Windows 95 color palette
export const COLORS = {
  mainBackground: '#d4d0c8',
  lightGrey: '#c0c0c0',
  darkGrey: '#808080',
  white: '#ffffff',
  black: '#000000',
  windowsBlue: '#000080',
  titleBarGradient: 'linear-gradient(90deg, #000080 0%, #1084d0 100%)'
};

// Default values
export const DEFAULT_VALUES = {
  sliderValue: 0,
  checkboxValue: false,
  activeView: 'emotions'
};
