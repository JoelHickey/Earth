import React, { useState } from 'react';
import Header from './components/Header';
import Knob from './components/Knob';
import Slider from './components/Slider';
import { useSliderDrag } from './hooks/useSliderDrag';
import StatusBar from './components/StatusBar';
function App() {
  const handleSliderMouseDown = useSliderDrag();

  const [sliderValues, setSliderValues] = useState({
    sleepQuality: 5,
    foodLevel: 5,
    caffeineLevel: 5,
    waterLevel: 5,
    walkLevel: 5,
    alcoholLevel: 0,
    sugarLevel: 5,
    happiness: 5,
    anxiety: 5,
    energy: 5,
    stress: 5,
    sadness: 5,
    anger: 5,
    irritability: 5,
    dread: 5
  });

  const updateSlider = (key, value) => {
    setSliderValues(prev => ({ ...prev, [key]: value }));
  };

  // Calculate health metrics
  const bloodSugar = 85 + (sliderValues.foodLevel * 2) + (sliderValues.sugarLevel * 3) - (sliderValues.walkLevel * 1.5) - (sliderValues.waterLevel * 0.5);
  const cortisolLevel = 12 + (sliderValues.stress * 2) + (sliderValues.anxiety * 1.5) + (sliderValues.caffeineLevel * 1.2) - (sliderValues.sleepQuality * 1.8) - (sliderValues.walkLevel * 1.2);
  const outputValue = "5am";

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      background: "#008080",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "8px"
    }}>
      <div style={{
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
        padding: "0"
      }}>
        <Header />
        
        <div style={{ 
      flex: 1,
      display: "flex",
      flexDirection: "column",
          gap: "8px", 
          padding: "11px"
        }}>
    <div style={{ 
      display: "flex", 
              gap: "8px", 
              flexWrap: "wrap",
              border: "2px inset #c0c0c0",
              padding: "11px",
              background: "#c0c0c0",
              position: "relative"
            }}>
            {/* Gap indicator for physical health container - positioned between first two knobs */}
            <div style={{
              position: "absolute",
              top: "50%",
              left: "calc(11px + 70px)", // After first knob (70px width) + new padding
              width: "8px",
              height: "20px",
              background: "#ff00ff", // Magenta fill for gap between knobs
              opacity: 0.4,
              pointerEvents: "none",
              transform: "translateY(-50%)"
            }} />
            {/* Border overlay */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              border: "1px solid #0000ff", // Blue border to show container border
              pointerEvents: "none"
            }} />
            {/* Padding fill - show the actual padding areas */}
            <div style={{
              position: "absolute",
              top: "0px",
              left: "0px",
              right: "0px",
              height: "11px",
              background: "#00ff00", // Bright green fill for top padding
              opacity: 0.7,
              pointerEvents: "none"
            }} />
            <div style={{
              position: "absolute",
              top: "0px",
              left: "0px",
              width: "11px",
              bottom: "0px",
              background: "#00ff00", // Bright green fill for left padding
              opacity: 0.7,
              pointerEvents: "none"
            }} />
            <div style={{
              position: "absolute",
              top: "0px",
              right: "0px",
              width: "11px",
              bottom: "0px",
              background: "#00ff00", // Bright green fill for right padding
              opacity: 0.7,
              pointerEvents: "none"
            }} />
            <div style={{
              position: "absolute",
              left: "0px",
              right: "0px",
              bottom: "0px",
              height: "11px",
              background: "#00ff00", // Bright green fill for bottom padding
              opacity: 0.7,
              pointerEvents: "none"
            }} />
            <Knob
              label="Sleep Quality"
              value={sliderValues.sleepQuality}
              onChange={(value) => updateSlider('sleepQuality', value)}
              width="70px"
            />
            <Knob
              label="Food Level"
              value={sliderValues.foodLevel}
              onChange={(value) => updateSlider('foodLevel', value)}
              width="70px"
            />
            <Knob
              label="Caffeine"
              value={sliderValues.caffeineLevel}
              onChange={(value) => updateSlider('caffeineLevel', value)}
              width="70px"
              unit="shots"
              multiplier={1}
            />
            <Knob
              label="Water"
              value={sliderValues.waterLevel}
              onChange={(value) => updateSlider('waterLevel', value)}
              width="70px"
              unit="ml"
              multiplier={100}
            />
            <Knob
              label="Walk"
              value={sliderValues.walkLevel}
              onChange={(value) => updateSlider('walkLevel', value)}
              width="70px"
              unit="min"
              multiplier={10}
            />
            <Knob
              label="Alcohol"
              value={sliderValues.alcoholLevel}
              onChange={(value) => updateSlider('alcoholLevel', value)}
              width="70px"
              unit="drinks"
              multiplier={1}
            />
            <Knob
              label="Sugar"
              value={sliderValues.sugarLevel}
              onChange={(value) => updateSlider('sugarLevel', value)}
              width="70px"
              unit="g"
              multiplier={5}
            />
          </div>

            <div style={{ 
            display: "flex", 
            gap: "8px", 
            flexWrap: "wrap",
            border: "2px inset #c0c0c0",
            padding: "11px",
            background: "#c0c0c0",
            position: "relative"
            }}>
            {/* Gap indicator for emotional health container - positioned between first two sliders */}
            <div style={{
              position: "absolute",
              top: "50%",
              left: "calc(11px + 65px)", // After first slider (65px width) + new padding
              width: "8px",
              height: "20px",
              background: "#ff00ff", // Magenta fill for gap between sliders
              opacity: 0.4,
              pointerEvents: "none",
              transform: "translateY(-50%)"
            }} />
            {/* Border overlay */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              border: "1px solid #0000ff", // Blue border to show container border
              pointerEvents: "none"
            }} />
            {/* Padding fill - show the actual padding areas */}
            <div style={{
              position: "absolute",
              top: "0px",
              left: "0px",
              right: "0px",
              height: "11px",
              background: "#00ff00", // Bright green fill for top padding
              opacity: 0.7,
              pointerEvents: "none"
            }} />
            <div style={{
              position: "absolute",
              top: "0px",
              left: "0px",
              width: "11px",
              bottom: "0px",
              background: "#00ff00", // Bright green fill for left padding
              opacity: 0.7,
              pointerEvents: "none"
            }} />
            <div style={{
              position: "absolute",
              top: "0px",
              right: "0px",
              width: "11px",
              bottom: "0px",
              background: "#00ff00", // Bright green fill for right padding
              opacity: 0.7,
              pointerEvents: "none"
            }} />
            <div style={{
              position: "absolute",
              left: "0px",
              right: "0px",
              bottom: "0px",
              height: "11px",
              background: "#00ff00", // Bright green fill for bottom padding
              opacity: 0.7,
              pointerEvents: "none"
            }} />
            <Slider
              label="Happiness"
              value={sliderValues.happiness}
              onChange={(value) => updateSlider('happiness', value)}
              onMouseDown={(e) => handleSliderMouseDown(e, (value) => updateSlider('happiness', value), sliderValues.happiness)}
              min={0}
              max={10}
            />
            <Slider
              label="Anxiety"
              value={sliderValues.anxiety}
              onChange={(value) => updateSlider('anxiety', value)}
              onMouseDown={(e) => handleSliderMouseDown(e, (value) => updateSlider('anxiety', value), sliderValues.anxiety)}
              min={0}
              max={10}
            />
            <Slider
              label="Energy"
              value={sliderValues.energy}
              onChange={(value) => updateSlider('energy', value)}
              onMouseDown={(e) => handleSliderMouseDown(e, (value) => updateSlider('energy', value), sliderValues.energy)}
              min={0}
              max={10}
            />
            <Slider
              label="Stress"
              value={sliderValues.stress}
              onChange={(value) => updateSlider('stress', value)}
              onMouseDown={(e) => handleSliderMouseDown(e, (value) => updateSlider('stress', value), sliderValues.stress)}
              min={0}
              max={10}
            />
            <Slider
              label="Sadness"
              value={sliderValues.sadness}
              onChange={(value) => updateSlider('sadness', value)}
              onMouseDown={(e) => handleSliderMouseDown(e, (value) => updateSlider('sadness', value), sliderValues.sadness)}
              min={0}
              max={10}
            />
            <Slider
              label="Anger"
              value={sliderValues.anger}
              onChange={(value) => updateSlider('anger', value)}
              onMouseDown={(e) => handleSliderMouseDown(e, (value) => updateSlider('anger', value), sliderValues.anger)}
              min={0}
              max={10}
            />
            <Slider
              label="Irritability"
              value={sliderValues.irritability}
              onChange={(value) => updateSlider('irritability', value)}
              onMouseDown={(e) => handleSliderMouseDown(e, (value) => updateSlider('irritability', value), sliderValues.irritability)}
              min={0}
              max={10}
            />
            <Slider
              label="Dread"
              value={sliderValues.dread}
              onChange={(value) => updateSlider('dread', value)}
              onMouseDown={(e) => handleSliderMouseDown(e, (value) => updateSlider('dread', value), sliderValues.dread)}
              min={0}
              max={10}
            />
      </div>
          
      <StatusBar 
            bloodSugar={bloodSugar}
        caffeineLevel={sliderValues.caffeineLevel}
        sliderValues={sliderValues}
      />
    </div>
      </div>
    </div>
  );
}

export default App;
