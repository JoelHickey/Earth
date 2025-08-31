import React from 'react';
import Slider from './components/Slider';
import Divider from './components/Divider';
import CheckboxGroup from './components/CheckboxGroup';
import Timeline from './components/Timeline';
import { useSliderDrag } from './hooks/useSliderDrag';
import { useAppState } from './utils/stateManager';

function Default() {
  const {
    sliderValues,
    updateSlider,
    environmentCheckboxes,
    updateEnvironmentCheckbox,
    timelineEvents,
    addTimelineEvent,
    deleteTimelineEvent,
    activeView,
    setActiveView,
    outputValue
  } = useAppState();

  const handleSliderMouseDown = useSliderDrag();

  // Styles
  const styles = {
    mainWindow: {
      width: "700px",
      height: "fit-content",
      background: "#d4d0c8",
      border: "2px outset #c0c0c0",
      fontFamily: "'MS Sans Serif', sans-serif",
      display: "flex",
      flexDirection: "column",
      padding: "0",
      flexShrink: 0,
      overflow: "hidden"
    },
    header: {
      background: "linear-gradient(90deg, #000080 0%, #1084d0 100%)",
      color: "#ffffff",
      padding: "4px",
      fontSize: "12px",
      fontWeight: "bold",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: "1px solid #808080"
    },
    mainContent: {
      background: "#d4d0c8",
      flex: 1,
      padding: "4px",
      minHeight: "300px",
      width: "100%",
      flexShrink: 0,
      overflow: "hidden"
    },
    viewSwitcher: {
      display: "flex",
      alignItems: "center",
      gap: "2px",
      padding: "4px",
      background: "#d4d0c8",
      borderBottom: "1px solid #808080",
      borderTop: "1px solid #ffffff"
    },
    button: {
      width: "36px",
      height: "28px",
      background: "#d4d0c8",
      border: "2px outset #c0c0c0",
      fontSize: "10px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'MS Sans Serif', Arial, sans-serif",
      boxShadow: "inset 1px 1px #ffffff, inset -1px -1px #808080"
    },
    activeButton: {
      border: "2px inset #c0c0c0",
      boxShadow: "inset 1px 1px #808080, inset -1px -1px #ffffff"
    },
    outputBar: {
      flex: 1,
      height: "28px",
      background: "#ffffff",
      border: "2px inset #c0c0c0",
      display: "flex",
      alignItems: "center",
      padding: "0 8px",
      fontSize: "10px",
      fontFamily: "'MS Sans Serif', Arial, sans-serif",
      marginLeft: "8px"
    },
    separator: {
      width: "1px",
      height: "16px",
      background: "#808080",
      border: "1px inset #c0c0c0",
      marginLeft: "8px"
    },
    statusBar: {
      background: "#d4d0c8",
      borderTop: "1px solid #ffffff",
      padding: "2px 8px",
      fontSize: "10px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontFamily: "'MS Sans Serif', Arial, sans-serif"
    }
  };

  // Slider configurations
  const inputSliders = [
    { name: 'sleepQuality', label: 'Sleep Quality' },
    { name: 'foodLevel', label: 'Food' },
    { name: 'caffeineLevel', label: 'Coffee' }
  ];

  const emotionSliders = [
    { name: 'happiness', label: 'Happiness' },
    { name: 'anxiety', label: 'Anxiety' },
    { name: 'energy', label: 'Energy' },
    { name: 'focus', label: 'Focus' },
    { name: 'stress', label: 'Stress' },
    { name: 'sadness', label: 'Sadness' },
    { name: 'anger', label: 'Anger' },
    { name: 'irritability', label: 'Irritability' },
    { name: 'dread', label: 'Dread' }
  ];

  // Checkbox configurations
  const environmentCheckboxConfig = [
    { name: 'noise', label: 'Noise', checked: environmentCheckboxes.noise, onChange: (checked) => updateEnvironmentCheckbox('noise', checked) },
    { name: 'lighting', label: 'Lighting', checked: environmentCheckboxes.lighting, onChange: (checked) => updateEnvironmentCheckbox('lighting', checked) },
    { name: 'temperature', label: 'Temperature', checked: environmentCheckboxes.temperature, onChange: (checked) => updateEnvironmentCheckbox('temperature', checked) },
    { name: 'crowding', label: 'Crowding', checked: environmentCheckboxes.crowding, onChange: (checked) => updateEnvironmentCheckbox('crowding', checked) },
    { name: 'airQuality', label: 'Air Quality', checked: environmentCheckboxes.airQuality, onChange: (checked) => updateEnvironmentCheckbox('airQuality', checked) },
    { name: 'cleanliness', label: 'Cleanliness', checked: environmentCheckboxes.cleanliness, onChange: (checked) => updateEnvironmentCheckbox('cleanliness', checked) }
  ];

  // Render slider row
  const renderSliderRow = (sliders, align = "center") => (
    <div style={{ 
      display: "flex", 
      gap: "2px", 
      justifyContent: align, 
      alignItems: "flex-start",
      width: "100%",
      maxWidth: "100%",
      position: "relative",
      minHeight: "220px",
      overflow: "hidden"
    }}>
      {sliders.map((slider, index) => (
        <React.Fragment key={slider.name}>
          <Slider
            value={sliderValues[slider.name]}
            onChange={(value) => updateSlider(slider.name, value)}
            onMouseDown={handleSliderMouseDown}
            label={slider.label}
          />
          {index < sliders.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </div>
  );

  // Render view content
  const renderViewContent = () => {
    switch (activeView) {
      case 'inputs':
        return (
          <div style={{ padding: "8px", width: "100%", height: "300px", display: "flex", alignItems: "flex-start", justifyContent: "flex-start", overflow: "hidden" }}>
            {renderSliderRow(inputSliders, "flex-start")}
          </div>
        );
      
      case 'emotions':
        return (
          <div style={{ padding: "8px", width: "100%", height: "300px", display: "flex", alignItems: "flex-start", justifyContent: "flex-start", overflow: "hidden" }}>
            {renderSliderRow(emotionSliders, "flex-start")}
          </div>
        );
      
      case 'environment':
        return (
          <div style={{ padding: "8px", width: "100%", height: "300px", display: "flex", alignItems: "flex-start", justifyContent: "flex-start", overflow: "hidden" }}>
            <CheckboxGroup checkboxes={environmentCheckboxConfig} columns={3} />
          </div>
        );
      
      case 'timeline':
        return (
          <div style={{ padding: "8px", width: "100%", height: "300px", display: "flex", alignItems: "flex-start", justifyContent: "flex-start", overflow: "hidden" }}>
            <Timeline 
              events={timelineEvents}
              onAddEvent={addTimelineEvent}
              onDeleteEvent={deleteTimelineEvent}
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div style={styles.mainWindow}>
      {/* Header */}
      <div style={styles.header}>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <img src="/Earth.ico" alt="Earth" style={{ width: "16px", height: "16px" }} />
          <span>Earth</span>
        </div>
        <button
          style={{
            width: "20px",
            height: "18px",
            background: "#d4d0c8",
            border: "1px outset #c0c0c0",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "10px",
            fontFamily: "'MS Sans Serif', Arial, sans-serif",
            color: "#000000",
            padding: "0",
            lineHeight: "1"
          }}
          onMouseDown={(e) => {
            e.target.style.border = "1px inset #c0c0c0";
            e.target.style.background = "#c0c0c0";
          }}
          onMouseUp={(e) => {
            e.target.style.border = "1px outset #c0c0c0";
            e.target.style.background = "#d4d0c8";
          }}
        >
          ×
        </button>
      </div>

      {/* Toolbar with View Switcher and Output Bar */}
      <div style={styles.viewSwitcher}>
        <button
          style={{
            ...styles.button,
            ...(activeView === 'inputs' && styles.activeButton)
          }}
          onClick={() => setActiveView('inputs')}
          onMouseDown={(e) => {
            if (e.target.tagName === 'BUTTON') {
              e.target.style.border = "2px inset #c0c0c0";
              e.target.style.boxShadow = "inset 1px 1px #808080, inset -1px -1px #ffffff";
            }
          }}
          onMouseUp={(e) => {
            if (e.target.tagName === 'BUTTON') {
              e.target.style.border = "2px outset #c0c0c0";
              e.target.style.boxShadow = "inset 1px 1px #ffffff, inset -1px -1px #808080";
            }
          }}
        >
          <img src="/Plug.ico" alt="Plug" style={{ width: "16px", height: "16px" }} />
        </button>
        <button
          style={{
            ...styles.button,
            ...(activeView === 'emotions' && styles.activeButton)
          }}
          onClick={() => setActiveView('emotions')}
          onMouseDown={(e) => {
            if (e.target.tagName === 'BUTTON') {
              e.target.style.border = "2px inset #c0c0c0";
              e.target.style.boxShadow = "inset 1px 1px #808080, inset -1px -1px #ffffff";
            }
          }}
          onMouseUp={(e) => {
            if (e.target.tagName === 'BUTTON') {
              e.target.style.border = "2px outset #c0c0c0";
              e.target.style.boxShadow = "inset 1px 1px #ffffff, inset -1px -1px #808080";
            }
          }}
        >
          <img src="/Volume Controls.ico" alt="Levels" style={{ width: "16px", height: "16px" }} />
        </button>
        <button
          style={{
            ...styles.button,
            ...(activeView === 'environment' && styles.activeButton)
          }}
          onClick={() => setActiveView('environment')}
          onMouseDown={(e) => {
            if (e.target.tagName === 'BUTTON') {
              e.target.style.border = "2px inset #c0c0c0";
              e.target.style.boxShadow = "inset 1px 1px #808080, inset -1px -1px #ffffff";
            }
          }}
          onMouseUp={(e) => {
            if (e.target.tagName === 'BUTTON') {
              e.target.style.border = "2px outset #c0c0c0";
              e.target.style.boxShadow = "inset 1px 1px #ffffff, inset -1px -1px #808080";
            }
          }}
        >
          <img src="/Tree.ico" alt="Tree" style={{ width: "16px", height: "16px" }} />
        </button>
        <button
          style={{
            ...styles.button,
            ...(activeView === 'timeline' && styles.activeButton)
          }}
          onClick={() => setActiveView('timeline')}
          onMouseDown={(e) => {
            if (e.target.tagName === 'BUTTON') {
              e.target.style.border = "2px inset #c0c0c0";
              e.target.style.boxShadow = "inset 1px 1px #808080, inset -1px -1px #ffffff";
            }
          }}
          onMouseUp={(e) => {
            if (e.target.tagName === 'BUTTON') {
              e.target.style.border = "2px outset #c0c0c0";
              e.target.style.boxShadow = "inset 1px 1px #ffffff, inset -1px -1px #808080";
            }
          }}
        >
          <img src="/Notepad.ico" alt="Notepad" style={{ width: "16px", height: "16px" }} />
        </button>
        
        <div style={styles.separator} />
        
        <div style={styles.outputBar}>
          Output: {Math.round(outputValue)}/10
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {renderViewContent()}
      </div>

      {/* Status Bar */}
      <div style={styles.statusBar}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span>Ready</span>
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span>Neural link</span>
          <div style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "radial-gradient(circle at 20% 20%, #ffffff 0%, #f0f0f0 15%, #e0e0e0 30%, #c0c0c0 60%, #a0a0a0 100%)",
            border: "1px solid #808080",
            boxShadow: "inset 0.5px 0.5px #ffffff, inset -0.5px -0.5px #606060, 0 0 2px rgba(255,255,255,0.3)"
          }} />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div style={{ 
      background: "#008080", 
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "16px"
    }}>
      <Default />
    </div>
  );
}

export default App;
