// Slider configurations
export const INPUT_SLIDERS = [
  { name: 'sleepQuality', label: 'Sleep Quality' },
  { name: 'sleepDuration', label: 'Sleep Duration', unit: 'hrs', multiplier: 1 },
  { name: 'waterLevel', label: 'Water', unit: 'ml', multiplier: 300 },
  { name: 'caffeineLevel', label: 'Coffee', unit: 'shots', multiplier: 1 },
  { name: 'foodLevel', label: 'Food', unit: 'cal', multiplier: 300 },
  { name: 'walkLevel', label: 'Walk', unit: 'km', multiplier: 1 },
  { name: 'alcoholLevel', label: 'Alcohol', unit: 'drinks', multiplier: 1 },
  { name: 'medication1', label: 'Zoloft', unit: 'mg', multiplier: 1 },
  { name: 'vitaminD', label: 'Vitamin D', unit: 'IU', multiplier: 100 },
  { name: 'vitaminB12', label: 'Vitamin B12', unit: 'mcg', multiplier: 1 },
  { name: 'vitaminC', label: 'Vitamin C', unit: 'mg', multiplier: 10 },
  { name: 'magnesium', label: 'Magnesium', unit: 'mg', multiplier: 10 },
  { name: 'lTheanine', label: 'L-Theanine', unit: 'mg', multiplier: 1 },
  { name: 'thc', label: 'THC', unit: 'mg', multiplier: 1 },
  { name: 'cbd', label: 'CBD', unit: 'mg', multiplier: 1 }
];

export const MEDICATION_SLIDERS = [
  { name: 'medication1', label: 'Zoloft', unit: 'mg', multiplier: 1 },
  { name: 'medication2', label: 'Medication 2', unit: 'mg', multiplier: 1 },
  { name: 'vitaminD', label: 'Vitamin D', unit: 'IU', multiplier: 100 },
  { name: 'vitaminB12', label: 'Vitamin B12', unit: 'mcg', multiplier: 1 },
  { name: 'vitaminC', label: 'Vitamin C', unit: 'mg', multiplier: 10 },
  { name: 'magnesium', label: 'Magnesium', unit: 'mg', multiplier: 10 },
  { name: 'iron', label: 'Iron', unit: 'mg', multiplier: 1 },
  { name: 'zinc', label: 'Zinc', unit: 'mg', multiplier: 1 }
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
export const VIEW_BUTTONS = [
  { id: 'inputs', icon: '/Plug.ico', alt: 'Plug' },
  { id: 'emotions', icon: '/Smiley face.ico', alt: 'Emotions' },
  { id: 'environment', icon: '/Tree.ico', alt: 'Tree' },
  { id: 'timeline', icon: '/Notepad.ico', alt: 'Notepad' },
  { id: 'design', icon: '/Warning.ico', alt: 'Design System' }
];

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
  activeView: 'inputs'
};
