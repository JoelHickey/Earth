import { useState, useMemo } from 'react';

export const useAppState = () => {
  // Slider states
  const [sliderValues, setSliderValues] = useState({
    sleepQuality: 0,
    foodLevel: 0,
    caffeineLevel: 0,
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

  // Checkbox states
  const [environmentCheckboxes, setEnvironmentCheckboxes] = useState({
    noise: false,
    lighting: false,
    temperature: false,
    crowding: false,
    airQuality: false,
    cleanliness: false
  });

  const [timelineEvents, setTimelineEvents] = useState([]);

  // UI state
  const [activeView, setActiveView] = useState('emotions');

  // Slider update function
  const updateSlider = (name, value) => {
    setSliderValues(prev => ({ ...prev, [name]: value }));
  };

  // Checkbox update functions
  const updateEnvironmentCheckbox = (name, checked) => {
    setEnvironmentCheckboxes(prev => ({ ...prev, [name]: checked }));
  };

  const addTimelineEvent = (event) => {
    setTimelineEvents(prev => [...prev, event]);
  };

  const deleteTimelineEvent = (index) => {
    setTimelineEvents(prev => prev.filter((_, i) => i !== index));
  };

  // Calculate output value
  const outputValue = useMemo(() => {
    let value = 0;
    
    // Slider contributions
    value += (sliderValues.sleepQuality / 10) * 2;
    value += (sliderValues.foodLevel / 10) * 1.5;
    value += (sliderValues.caffeineLevel / 10) * 0.5;
    value += (sliderValues.happiness / 10) * 2;
    value += (sliderValues.anxiety / 10) * -1.5;
    value += (sliderValues.energy / 10) * 1;
    value += (sliderValues.focus / 10) * 1;
    value += (sliderValues.stress / 10) * -1;
    value += (sliderValues.sadness / 10) * -1;
    value += (sliderValues.anger / 10) * -1;
    value += (sliderValues.irritability / 10) * -1;
    value += (sliderValues.dread / 10) * -1;
    
    // Environment factors
    if (environmentCheckboxes.noise) value -= 0.5;
    if (environmentCheckboxes.lighting) value += 0.3;
    if (environmentCheckboxes.temperature) value += 0.2;
    if (environmentCheckboxes.crowding) value -= 0.8;
    if (environmentCheckboxes.airQuality) value += 0.4;
    if (environmentCheckboxes.cleanliness) value += 0.3;
    
    // Timeline factors (simplified for now)
    if (timelineEvents.length > 0) value += 0.1;
    
    return Math.max(0, Math.min(10, value));
  }, [sliderValues, environmentCheckboxes, timelineEvents]);

  return {
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
  };
};
