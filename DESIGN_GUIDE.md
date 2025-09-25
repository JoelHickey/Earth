# Design Guide - Windows 95 Mental Health Monitor (Version 2)

A comprehensive design guide incorporating user-centered design principles from the Windows 95 interface guidelines, specifically adapted for mental health monitoring applications.

## User-Centered Design Principles

This design system version 2 is built upon the foundational 7 user-centered design principles established in the Windows 95 interface guidelines, ensuring optimal user experience for mental health monitoring.

### 1. Simple and Direct

**Principle**: Focus on core functionalities, ensuring the app performs essential tasks exceptionally well without unnecessary complexity.

**Implementation in Mental Health App**:
- **Primary Function**: Mental health tracking through intuitive slider controls and checkboxes
- **Clear Navigation**: Single toolbar with 4 main views (Inputs, Emotions, Environment, Timeline)
- **Minimal Cognitive Load**: Each view focuses on one category of data entry
- **Direct Actions**: Immediate visual feedback when adjusting sliders or checking boxes

**Design Specifications**:
```
- Maximum 4 primary navigation options
- Single-purpose components (one slider = one metric)
- No nested menus or complex hierarchies
- Immediate state changes without confirmation dialogs
```

### 2. Enjoyable and Desirable

**Principle**: Invest in the app's visual appeal and overall user experience to make interactions engaging and satisfying.

**Implementation in Mental Health App**:
- **Authentic Windows 95 Aesthetic**: Nostalgic and comforting visual design
- **Satisfying Interactions**: Tactile slider dragging with proper resistance
- **Visual Polish**: 3D button effects, proper shadows, and authentic color palette
- **Emotional Connection**: Earth icon and familiar interface reduce anxiety around health tracking

**Design Specifications**:
```css
/* Color Palette */
--win95-grey: #d4d0c8;        /* Main background */
--win95-light-grey: #c0c0c0;  /* Light borders */
--win95-dark-grey: #808080;   /* Dark borders */
--win95-white: #ffffff;       /* Highlights */
--win95-blue: #000080;        /* Title bar */

/* 3D Button Effects */
border-top: 2px solid #ffffff;
border-left: 2px solid #ffffff;
border-right: 2px solid #808080;
border-bottom: 2px solid #808080;
```

### 3. Personal

**Principle**: Allow users to customize their experience, adapting to individual preferences and needs, thereby enhancing personal relevance.

**Implementation in Mental Health App**:
- **Customizable Metrics**: User can focus on personally relevant emotional and physical factors
- **Personal Timeline**: Users create their own event entries with custom descriptions
- **Flexible Tracking**: No mandatory fields - users choose what to track
- **Individual Baselines**: Each user establishes their own normal ranges

**Design Specifications**:
```
- All input fields are optional
- Timeline supports custom event descriptions
- Slider values persist user preferences
- No preset "normal" ranges imposed on users
```

### 4. Glanceable

**Principle**: Design the interface so that users can quickly and easily gather necessary information at a glance, without extensive navigation.

**Implementation in Mental Health App**:
- **Real-time Output Score**: Continuously visible mental health score in toolbar
- **Status Bar Indicators**: Quick visual status of neural link and system state
- **Color-coded Feedback**: Immediate visual response to input changes
- **Compact Layout**: All essential information visible without scrolling

**Design Specifications**:
```
- Output score always visible in toolbar (0-10 scale)
- Maximum window height: 600px (fits standard screens)
- Status indicators use recognizable icons
- Key metrics visible without view switching
```

### 5. Efficient

**Principle**: Enable swift access to information and tasks by minimizing displayed options and settings, streamlining the user journey.

**Implementation in Mental Health App**:
- **Single-Click Navigation**: Toolbar buttons provide immediate view switching
- **Drag-to-Set**: Sliders allow quick value adjustment without typing
- **Minimal Steps**: Add timeline events with just time and description
- **Keyboard Shortcuts**: Quick access to common functions

**Design Specifications**:
```
- Maximum 2 clicks to reach any function
- Slider adjustment in single drag motion
- No confirmation dialogs for reversible actions
- Tab navigation between all interactive elements
```

### 6. Casual

**Principle**: Optimize the app for content consumption, ensuring quick accessibility and avoiding overly dense displays of information.

**Implementation in Mental Health App**:
- **Comfortable Spacing**: Adequate white space between interactive elements
- **Non-intimidating Interface**: Familiar Windows 95 style reduces medical anxiety
- **Bite-sized Interactions**: Small, manageable tasks rather than overwhelming forms
- **Optional Depth**: Users can engage as much or as little as desired

**Design Specifications**:
```
- Minimum 8px padding around interactive elements
- Maximum 6 sliders visible per view
- Dividers separate related groups
- No time pressure or mandatory completion
```

### 7. Consistent

**Principle**: Maintain consistency with established user experience guidelines to provide a familiar and intuitive interface.

**Implementation in Mental Health App**:
- **Windows 95 Standards**: Consistent with established interface conventions
- **Predictable Behavior**: All sliders, buttons, and checkboxes behave identically
- **Visual Language**: Consistent use of colors, fonts, and spacing throughout
- **Interaction Patterns**: Same mouse/keyboard interactions across all components

**Design Specifications**:
```
- All buttons: 36×28px with consistent 3D styling
- All sliders: 20×20px thumbs with identical drag behavior
- Consistent font: MS Sans Serif, 8pt
- Uniform spacing: 8px base unit for all margins/padding
```

## Component Design Standards

### Slider Components

Following user preference [[memory:8801454]], all input controls use knob-style controls rather than traditional sliders.

```jsx
// Slider specifications
thumb: {
  width: '20px',
  height: '20px',
  background: '#d4d0c8',
  border: '2px outset #d4d0c8'
}

track: {
  height: '4px',
  background: '#808080',
  border: '1px inset #d4d0c8'
}
```

### Typography

Maintaining authentic Windows 95 text sizing without modern browser adjustments [[memory:8801470]]:

```css
body {
  font-family: 'MS Sans Serif', sans-serif;
  font-size: 8pt; /* Authentic Windows 95 size */
  line-height: 1.2;
}

.title-bar {
  font-size: 8pt;
  font-weight: bold;
}
```

### Button Interactions

```css
.button {
  /* Rest state */
  border: 2px outset #d4d0c8;
  
  /* Active state */
  &:active {
    border: 2px inset #d4d0c8;
    transform: translate(1px, 1px);
  }
}
```

## Accessibility Considerations

### Keyboard Navigation
- Tab order follows visual layout
- Enter/Space activate buttons and checkboxes
- Arrow keys adjust slider values
- Escape cancels current operation

### Visual Accessibility
- High contrast borders for element definition
- Consistent visual hierarchy
- Clear focus indicators
- Adequate touch targets (minimum 28px)

### Cognitive Accessibility
- Simple, familiar interface patterns
- Immediate feedback for all actions
- No time-based interactions
- Reversible actions without confirmation

## Implementation Guidelines

### State Management
```javascript
// Centralized state following Windows 95 patterns
const initialState = {
  sliderValues: { /* 0-10 values */ },
  environmentCheckboxes: { /* boolean values */ },
  timelineEvents: [ /* event objects */ ],
  activeView: 'inputs' // current view state
};
```

### Performance Standards
- Render time: < 100ms for view switching
- Slider response: < 16ms (60fps)
- Memory usage: < 50MB total
- Bundle size: < 500KB

### Browser Support
- Modern browsers with ES6+ support
- Graceful degradation for older browsers
- No external font dependencies
- CSS Grid fallbacks provided

## Quality Assurance

### User Experience Testing
- [ ] All 7 principles demonstrably implemented
- [ ] Consistent behavior across all components
- [ ] Intuitive navigation without instruction
- [ ] Satisfying tactile feedback

### Technical Validation
- [ ] Accessibility audit passing
- [ ] Performance benchmarks met
- [ ] Cross-browser compatibility verified
- [ ] Responsive design functional

## Future Considerations

### Version 2 Enhancements
- Enhanced personalization options
- Additional accessibility features
- Improved performance optimizations
- Extended component library

### Maintaining Design Integrity
- Regular audits against Windows 95 guidelines
- User feedback integration
- Consistency checks across new features
- Performance monitoring

---

*This design guide ensures our mental health monitoring application maintains authentic Windows 95 user-centered design principles while providing an effective, accessible, and enjoyable user experience for mental health tracking.*
