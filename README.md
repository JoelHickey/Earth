# Windows 95 Mental Health Monitor

A React-based mental health monitoring application with an authentic Windows 95 aesthetic. Track your daily inputs, emotional states, environmental factors, and timeline events to monitor your mental well-being.

## Features

### 🎛️ **Input Tracking**
- **Sleep Quality**: Rate your sleep quality (0-10)
- **Food Level**: Track your food intake
- **Coffee/Caffeine**: Monitor caffeine consumption

### 😊 **Emotional Monitoring**
- **Happiness**: Current happiness level
- **Anxiety**: Anxiety level tracking
- **Energy**: Energy level assessment
- **Focus**: Concentration and focus level
- **Stress**: Stress level monitoring
- **Sadness**: Sadness level tracking
- **Anger**: Anger level assessment
- **Irritability**: Irritability level
- **Dread**: Feelings of dread or apprehension

### 🌍 **Environmental Factors**
- **Noise**: Environmental noise levels
- **Lighting**: Lighting conditions
- **Temperature**: Environmental temperature
- **Crowding**: Crowded environment
- **Air Quality**: Air quality assessment
- **Cleanliness**: Environmental cleanliness

### ⏰ **Timeline Events**
- Record specific events with timestamps
- Add custom event descriptions
- Delete individual events
- Track patterns over time

### 📊 **Output Calculation**
- Real-time mental health score (0-10)
- Weighted calculation based on all inputs
- Displayed in the toolbar output bar

## Technical Architecture

### **Components**
- `App.jsx`: Main application component with Windows 95 styling
- `Slider.jsx`: Custom Windows 95-style slider component
- `Divider.jsx`: Vertical divider component
- `CheckboxGroup.jsx`: Grouped checkbox component
- `Timeline.jsx`: Event timeline component

### **Hooks**
- `useSliderDrag.js`: Custom hook for slider drag functionality
- `useAppState.js`: Centralized state management

### **Styling**
- Authentic Windows 95 color palette
- 3D button effects with proper shadows
- Classic Windows 95 fonts and spacing
- Responsive layout with proper overflow handling

## Windows 95 Design Elements

### **Color Palette**
- `#d4d0c8`: Main background (Windows 95 grey)
- `#c0c0c0`: Light grey for borders
- `#808080`: Dark grey for borders
- `#ffffff`: White for highlights
- `#000080`: Windows blue for title bar

### **UI Components**
- **Title Bar**: Blue gradient with Earth icon and close button
- **Toolbar**: Button bar with view switcher and output display
- **Sliders**: Custom 20×20px thumbs with 3D styling
- **Buttons**: 36×28px buttons with press-down effects
- **Checkboxes**: Authentic Windows 95 checkbox styling
- **Status Bar**: Bottom status bar with neural link indicator

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd fresh-project

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Build & Deploy
```bash
# Build static assets (output: dist/)
npm run build

# Preview the production build locally
npm run preview
```

#### Vercel (recommended)
1. Import the repo into Vercel
2. Build command: `npm run build`
3. Output directory: `dist`
4. Set environment variables (if using Supabase)
5. Add your custom domain in Vercel → Settings → Domains
6. Production URL: `https://joelhickey.com`

### Usage
1. **Navigate Views**: Use the toolbar buttons to switch between different monitoring sections
2. **Adjust Sliders**: Click and drag slider thumbs to set values (0-10)
3. **Toggle Checkboxes**: Click checkboxes to mark environmental factors
4. **Add Timeline Events**: Enter time and description to record events
5. **Monitor Output**: Watch the real-time mental health score in the output bar

## File Structure

```
fresh-project/
├── components/
│   ├── Slider.jsx          # Custom slider component
│   ├── Divider.jsx          # Vertical divider
│   ├── CheckboxGroup.jsx   # Grouped checkboxes
│   └── Timeline.jsx         # Event timeline
├── hooks/
│   └── useSliderDrag.js    # Slider drag functionality
├── utils/
│   └── stateManager.js     # Centralized state management
├── public/                 # Static assets and icons
├── App.jsx                 # Main application component
├── index.jsx               # Entry point
└── README.md               # This file
```

## State Management

The application uses a centralized state management system with the following state:

### **Slider Values**
- All slider values (0-10) for inputs and emotions

### **Environment Checkboxes**
- Boolean values for environmental factors

### **Timeline Events**
- Array of events with time and description

### **UI State**
- Active view (inputs, emotions, environment, timeline)
- Output calculation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure Windows 95 styling consistency
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Inspired by classic Windows 95 interface design
- Built with React and modern web technologies
- Designed for mental health awareness and monitoring
