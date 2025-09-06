import React from 'react';
import Slider from './components/Slider';
import Divider from './components/Divider';
import CheckboxGroup from './components/CheckboxGroup';
import Timeline from './components/Timeline';
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import StatusBar from './components/StatusBar';
import { useSliderDrag } from './hooks/useSliderDrag';
import { useAppState } from './utils/stateManager';
import { INPUT_SLIDERS, EMOTION_SLIDERS } from './utils/constants';

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
    outputValue,
    bloodSugar,
    updateBloodSugar,
    getBloodSugarStatus,
    estimateBloodSugar,
    autoCalculateBloodSugar,
    autoUpdateEmotions,
    saveSliderPositions,
    recallSliderPositions,
    hasSavedPositions,
    getCurrentLevels
  } = useAppState();

  const handleSliderMouseDown = useSliderDrag();

  // Auto-calculate blood sugar when input sliders change
  React.useEffect(() => {
    autoCalculateBloodSugar();
  }, [
    sliderValues.sleepQuality,
    sliderValues.foodLevel,
    sliderValues.caffeineLevel,
    sliderValues.waterLevel,
    sliderValues.walkLevel,
    sliderValues.squatsLevel,
    autoCalculateBloodSugar
  ]);

  // Styles
  const styles = {
    mainWindow: {
      width: "820px",
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
      {sliders.map((slider, index) => {
        // Calculate caffeine for coffee slider (now handled by unit system)
        const caffeineMg = null; // No longer needed - using unit system
        
        // Calculate water in ml (now handled by unit system)
        const waterMl = null; // No longer needed - using unit system
        
        return (
          <React.Fragment key={slider.name}>
            <Slider
              value={sliderValues[slider.name]}
              onChange={(value) => updateSlider(slider.name, value)}
              onMouseDown={handleSliderMouseDown}
              label={slider.label}
              caffeineMg={caffeineMg}
              waterMl={waterMl}
              unit={slider.unit}
              multiplier={slider.multiplier}
            />
            {index < sliders.length - 1 && <Divider />}
          </React.Fragment>
        );
      })}
    </div>
  );

  // Render view content
  const renderViewContent = () => {
    switch (activeView) {
      case 'inputs':
        return (
          <div style={{ padding: "8px", width: "100%", height: "250px", display: "flex", alignItems: "flex-start", justifyContent: "flex-start", overflow: "hidden" }}>
            {renderSliderRow(INPUT_SLIDERS, "flex-start")}
          </div>
        );
      
      case 'emotions':
        return (
          <div style={{ padding: "8px", width: "100%", height: "250px", display: "flex", alignItems: "flex-start", justifyContent: "flex-start", overflow: "hidden" }}>
            {renderSliderRow(EMOTION_SLIDERS, "flex-start")}
          </div>
        );
      
      case 'environment':
        return (
          <div style={{ padding: "8px", width: "100%", height: "250px", display: "flex", alignItems: "flex-start", justifyContent: "flex-start", overflow: "hidden" }}>
            <CheckboxGroup checkboxes={environmentCheckboxConfig} columns={3} />
          </div>
        );
      
      case 'timeline':
        return (
          <div style={{ padding: "8px", width: "100%", height: "250px", display: "flex", alignItems: "flex-start", justifyContent: "flex-start", overflow: "hidden" }}>
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
      <Header />
      
        <Toolbar 
          activeView={activeView} 
          setActiveView={setActiveView} 
          outputValue={outputValue}
          bloodSugar={bloodSugar}
          getBloodSugarStatus={getBloodSugarStatus}
          saveSliderPositions={saveSliderPositions}
          recallSliderPositions={recallSliderPositions}
          hasSavedPositions={hasSavedPositions}
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
