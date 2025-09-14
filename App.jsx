import React, { useState } from 'react';
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import Slider from './components/Slider';
import StatusBar from './components/StatusBar';
import Divider from './components/Divider';
import CheckboxGroup from './components/CheckboxGroup';
import Timeline from './components/Timeline';
import { useSliderDrag } from './hooks/useSliderDrag';
import { INPUT_SLIDERS, EMOTION_SLIDERS } from './utils/constants';

function App() {
  console.log("App is rendering!");
  
  // Add state for Toolbar props
  const [activeView, setActiveView] = useState('inputs');
  const [outputValue] = useState(5);
  const [bloodSugar] = useState(100);
  const [cortisolLevel] = useState(3); // Default cortisol level
  const getBloodSugarStatus = () => 'normal';
  
  // Add state for sliders
  const [sliderValues, setSliderValues] = useState({
    sleepQuality: 0,
    sleepDuration: 0,
    waterLevel: 0,
    caffeineLevel: 0,
    foodLevel: 0,
    walkLevel: 0,
    alcoholLevel: 0,
    medication1: 0,
    vitaminD: 0,
    vitaminB12: 0,
    vitaminC: 0,
    magnesium: 0,
    lTheanine: 0,
    thc: 0,
    cbd: 0,
    happiness: 0,
    anxiety: 0,
    energy: 0,
    focus: 0,
    stress: 0,
    sadness: 0,
    anger: 0,
    irritability: 0,
    dread: 0
  });

  // Add state for environment checkboxes
  const [environmentCheckboxes, setEnvironmentCheckboxes] = useState({
    noise: false,
    lighting: false,
    temperature: false,
    crowding: false,
    airQuality: false,
    cleanliness: false
  });

  // Add state for timeline events
  const [timelineEvents, setTimelineEvents] = useState([]);
  
  // Design system state
  const [activeTab, setActiveTab] = useState('design');
  const [activeSubTab, setActiveSubTab] = useState('foundation');

  const handleSliderChange = (name, value) => {
    setSliderValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSliderMouseDown = useSliderDrag();

  // Add functions for Save/Recall functionality
  const saveSliderPositions = () => {
    localStorage.setItem('sliderPositions', JSON.stringify(sliderValues));
    console.log('Slider positions saved!');
  };

  const recallSliderPositions = () => {
    const saved = localStorage.getItem('sliderPositions');
    if (saved) {
      setSliderValues(JSON.parse(saved));
      console.log('Slider positions recalled!');
    }
  };

  const hasSavedPositions = () => {
    return localStorage.getItem('sliderPositions') !== null;
  };

  // Add functions for environment checkboxes
  const updateEnvironmentCheckbox = (name, checked) => {
    setEnvironmentCheckboxes(prev => ({ ...prev, [name]: checked }));
  };

  // Add functions for timeline
  const addTimelineEvent = (event) => {
    setTimelineEvents(prev => [...prev, event]);
  };

  const deleteTimelineEvent = (id) => {
    setTimelineEvents(prev => prev.filter(event => event.id !== id));
  };

  // Render slider row function
  const renderSliderRow = (sliders, align = "center") => (
    <div style={{ 
      display: "flex", 
      gap: "2px", 
      justifyContent: align, 
      alignItems: "flex-start",
      width: "100%",
      maxWidth: "100%",
      position: "relative",
      minHeight: sliders.length > 10 ? "380px" : "220px",
      overflow: sliders.length > 10 ? "visible" : "hidden"
    }}>
      {sliders.map((slider, index) => (
        <React.Fragment key={slider.name}>
          <Slider
            value={sliderValues[slider.name]}
            onChange={(value) => handleSliderChange(slider.name, value)}
            onMouseDown={handleSliderMouseDown}
            label={slider.label}
            unit={slider.unit}
            multiplier={slider.multiplier}
          />
          {index < sliders.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </div>
  );

  // Render view content based on active view
  const renderViewContent = () => {
    switch (activeView) {
      case 'inputs':
        return (
          <div style={{ padding: "8px", width: "100%", height: "300px", display: "flex", alignItems: "flex-start", justifyContent: "flex-start", overflow: "auto" }}>
            {renderSliderRow(INPUT_SLIDERS, "flex-start")}
          </div>
        );
      
      case 'emotions':
        return (
          <div style={{ padding: "8px", width: "100%", height: "300px", display: "flex", alignItems: "flex-start", justifyContent: "flex-start", overflow: "auto" }}>
            {renderSliderRow(EMOTION_SLIDERS, "flex-start")}
          </div>
        );
      
      case 'environment':
        const environmentCheckboxConfig = [
          { name: 'noise', label: 'Noise', checked: environmentCheckboxes.noise, onChange: (checked) => updateEnvironmentCheckbox('noise', checked) },
          { name: 'lighting', label: 'Lighting', checked: environmentCheckboxes.lighting, onChange: (checked) => updateEnvironmentCheckbox('lighting', checked) },
          { name: 'temperature', label: 'Temperature', checked: environmentCheckboxes.temperature, onChange: (checked) => updateEnvironmentCheckbox('temperature', checked) },
          { name: 'crowding', label: 'Crowding', checked: environmentCheckboxes.crowding, onChange: (checked) => updateEnvironmentCheckbox('crowding', checked) },
          { name: 'airQuality', label: 'Air Quality', checked: environmentCheckboxes.airQuality, onChange: (checked) => updateEnvironmentCheckbox('airQuality', checked) },
          { name: 'cleanliness', label: 'Cleanliness', checked: environmentCheckboxes.cleanliness, onChange: (checked) => updateEnvironmentCheckbox('cleanliness', checked) }
        ];
        return (
          <div style={{ padding: "8px", width: "100%", height: "300px", display: "flex", alignItems: "flex-start", justifyContent: "flex-start", overflow: "auto" }}>
            <CheckboxGroup checkboxes={environmentCheckboxConfig} columns={3} />
          </div>
        );
      
      case 'timeline':
        return (
          <div style={{ padding: "8px", width: "100%", height: "300px", display: "flex", alignItems: "flex-start", justifyContent: "flex-start", overflow: "auto" }}>
            <Timeline 
              events={timelineEvents}
              onAddEvent={addTimelineEvent}
              onDeleteEvent={deleteTimelineEvent}
            />
          </div>
        );
      
      case 'design':
        return (
          <div style={{ padding: "8px", width: "100%", height: "300px", display: "flex", alignItems: "flex-start", justifyContent: "flex-start", overflow: "auto" }}>
            <div style={{ width: "100%", background: "#d4d0c8", border: "2px inset #c0c0c0", padding: "8px" }}>
              {/* Windows 95 Style Tabs */}
              <div style={{
                display: "flex",
                background: "#c0c0c0",
                borderBottom: "1px solid #808080",
                marginBottom: "8px"
              }}>
                <button
                  onClick={() => setActiveTab('design')}
                  style={{
                    background: activeTab === 'design' ? "#d4d0c8" : "#c0c0c0",
                    border: "1px outset #c0c0c0",
                    borderBottom: activeTab === 'design' ? "1px solid #d4d0c8" : "1px solid #808080",
                    padding: "4px 12px",
                    fontSize: "8px",
                    fontFamily: "'MS Sans Serif', sans-serif",
                    cursor: "pointer",
                    marginRight: "2px"
                  }}
                >
                  Design Guide
                </button>
                <button
                  onClick={() => setActiveTab('vision')}
                  style={{
                    background: activeTab === 'vision' ? "#d4d0c8" : "#c0c0c0",
                    border: "1px outset #c0c0c0",
                    borderBottom: activeTab === 'vision' ? "1px solid #d4d0c8" : "1px solid #808080",
                    padding: "4px 12px",
                    fontSize: "8px",
                    fontFamily: "'MS Sans Serif', sans-serif",
                    cursor: "pointer"
                  }}
                >
                  Product Vision
                </button>
                <button
                  onClick={() => setActiveTab('dev')}
                  style={{
                    background: activeTab === 'dev' ? "#d4d0c8" : "#c0c0c0",
                    border: "1px outset #c0c0c0",
                    borderBottom: activeTab === 'dev' ? "1px solid #d4d0c8" : "1px solid #808080",
                    padding: "4px 12px",
                    fontSize: "8px",
                    fontFamily: "'MS Sans Serif', sans-serif",
                    cursor: "pointer"
                  }}
                >
                  Developer Specs
                </button>
              </div>

              {/* Design System Content */}
              {activeTab === 'design' && (
                <div style={{ fontSize: "8px", fontFamily: "'MS Sans Serif', sans-serif" }}>
                  <h3 style={{ margin: "0 0 8px 0", fontSize: "10px" }}>🎨 Windows 95 Design System</h3>
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Colors:</strong><br/>
                    • Background: #d4d0c8<br/>
                    • Light Grey: #c0c0c0<br/>
                    • Dark Grey: #808080<br/>
                    • White: #ffffff<br/>
                    • Black: #000000
                  </div>
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Typography:</strong><br/>
                    • Font: MS Sans Serif<br/>
                    • Sizes: 8px, 9px, 10px, 11px, 12px
                  </div>
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Components:</strong><br/>
                    • Buttons: 2px outset/inset borders<br/>
                    • Windows: 2px outset borders<br/>
                    • Title bars: 19px height<br/>
                    • Status bars: 22px height
                  </div>
                </div>
              )}

              {activeTab === 'vision' && (
                <div style={{ fontSize: "8px", fontFamily: "'MS Sans Serif', sans-serif" }}>
                  <h3 style={{ margin: "0 0 8px 0", fontSize: "10px" }}>🎯 Product Vision & Strategy</h3>
                  
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Mission:</strong><br/>
                    Empower individuals to take control of their mental health through intuitive, 
                    nostalgic technology that makes wellness tracking accessible and engaging.
                  </div>
                  
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Vision:</strong><br/>
                    A mental health monitoring platform that combines the simplicity and 
                    reliability of Windows 95 with modern wellness science, creating a 
                    trusted companion for daily mental health management.
                  </div>
                  
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Core Values:</strong><br/>
                    • Simplicity: Easy-to-use interface that doesn't overwhelm<br/>
                    • Reliability: Consistent, predictable functionality<br/>
                    • Privacy: User data stays local and secure<br/>
                    • Accessibility: Works for users of all technical levels<br/>
                    • Nostalgia: Familiar, comforting design language
                  </div>
                  
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Target Users:</strong><br/>
                    • Mental health enthusiasts seeking better self-awareness<br/>
                    • Individuals managing anxiety, depression, or stress<br/>
                    • People who prefer simple, distraction-free tools<br/>
                    • Users who value privacy and local data storage<br/>
                    • Anyone who appreciates retro computing aesthetics
                  </div>
                  
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Key Features:</strong><br/>
                    • Sleep quality and duration tracking<br/>
                    • Medication and supplement monitoring<br/>
                    • Emotional state assessment<br/>
                    • Environmental factor awareness<br/>
                    • Timeline-based event logging<br/>
                    • Offline-first data storage
                  </div>
                  
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Success Metrics:</strong><br/>
                    • Daily active usage<br/>
                    • Data consistency and completeness<br/>
                    • User-reported mental health improvements<br/>
                    • Feature adoption rates<br/>
                    • User retention and engagement
                  </div>
                </div>
              )}

              {activeTab === 'dev' && (
                <div style={{ fontSize: "8px", fontFamily: "'MS Sans Serif', sans-serif" }}>
                  <h3 style={{ margin: "0 0 8px 0", fontSize: "10px" }}>⚙️ Developer Specifications</h3>
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Window Structure:</strong><br/>
                    • Main Window: 1000px × 300px<br/>
                    • Header: 19px height<br/>
                    • Toolbar: Auto height<br/>
                    • Content: 300px height<br/>
                    • Status Bar: 22px height
                  </div>
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Components:</strong><br/>
                    • Sliders: 55px width, 150px height<br/>
                    • Buttons: 32px × 28px<br/>
                    • Inputs: 40px width, 16px height
                  </div>
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Layout:</strong><br/>
                    • Flexbox with Windows 95 styling<br/>
                    • Consistent 2px gaps<br/>
                    • Overflow: auto for scrolling
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  // Styles matching original
  const styles = {
    mainWindow: {
      width: "1000px",
      height: "fit-content",
      background: "#d4d0c8",
      borderTop: "2px solid #ffffff",
      borderLeft: "2px solid #ffffff", 
      borderBottom: "2px solid #808080",
      borderRight: "2px solid #808080",
      fontFamily: "'MS Sans Serif', sans-serif",
      display: "flex",
      flexDirection: "column",
      padding: "0",
      flexShrink: 0,
      overflow: "hidden"
    },
    mainContent: {
      background: "#d4d0c8",
      flex: 1,
      padding: "4px",
      minHeight: "250px",
      width: "100%",
      flexShrink: 0,
      overflow: "hidden",
      display: "flex",
      flexDirection: "row"
    },
    leftContent: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      overflow: "hidden"
    }
  };

  return (
    <div style={{ 
      background: "#008080", 
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "16px"
    }}>
      <div style={styles.mainWindow}>
        <Header />
        <Toolbar 
          activeView={activeView}
          setActiveView={setActiveView}
          outputValue={outputValue}
          bloodSugar={bloodSugar}
          getBloodSugarStatus={getBloodSugarStatus}
          saveSliderPositions={saveSliderPositions}
          recallSliderPositions={recallSliderPositions}
          hasSavedPositions={hasSavedPositions()}
          cortisolLevel={cortisolLevel}
        />
        <div style={styles.mainContent}>
          <div style={styles.leftContent}>
            {renderViewContent()}
          </div>
        </div>
        <StatusBar 
          caffeineLevel={sliderValues.caffeineLevel}
          sliderValues={sliderValues}
        />
      </div>
    </div>
  );
}

export default App;