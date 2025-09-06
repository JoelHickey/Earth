import { useState, useMemo } from 'react';

export const useAppState = () => {
  // Slider states
  const [sliderValues, setSliderValues] = useState({
    sleepQuality: 0,
    foodLevel: 0,
    caffeineLevel: 0,
    waterLevel: 0,
    walkLevel: 0,
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

  // Blood sugar tracking (auto-calculated)
  const [bloodSugar, setBloodSugar] = useState(null);

  // UI state
  const [activeView, setActiveView] = useState('inputs');
  
  // Flag to prevent auto-update when manually adjusting emotions
  const [isManuallyAdjusting, setIsManuallyAdjusting] = useState(false);
  
  // Saved slider positions for recall
  const [savedSliderPositions, setSavedSliderPositions] = useState(null);

  // Slider update function
  const updateSlider = (name, value) => {
    // Check if this is an emotion slider being manually adjusted
    const emotionSliders = ['happiness', 'anxiety', 'energy', 'focus', 'stress', 'sadness', 'anger', 'irritability', 'dread'];
    if (emotionSliders.includes(name)) {
      setIsManuallyAdjusting(true);
      // Reset flag after a short delay
      setTimeout(() => setIsManuallyAdjusting(false), 1000);
    }
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

  // Blood sugar functions
  const updateBloodSugar = (value) => {
    setBloodSugar(value ? parseInt(value) : null);
  };

  // Auto-calculate blood sugar when sliders change
  const autoCalculateBloodSugar = () => {
    const estimated = estimateBloodSugar();
    setBloodSugar(estimated);
  };

  // Auto-update emotions based on input levels (only emotion sliders)
  const autoUpdateEmotions = () => {
    // Don't auto-update if user is manually adjusting emotions
    if (isManuallyAdjusting) return;
    
    const newEmotions = { ...sliderValues };
    
    // Only update emotion sliders, not input sliders
    const emotionSliders = ['happiness', 'anxiety', 'energy', 'focus', 'stress', 'sadness', 'anger', 'irritability', 'dread'];
    
    // Sleep Quality affects multiple emotions
    if (sliderValues.sleepQuality > 0) {
      // Good sleep increases happiness and energy, decreases anxiety and stress
      newEmotions.happiness = Math.min(10, sliderValues.happiness + (sliderValues.sleepQuality * 0.3));
      newEmotions.energy = Math.min(10, sliderValues.energy + (sliderValues.sleepQuality * 0.4));
      newEmotions.anxiety = Math.max(0, sliderValues.anxiety - (sliderValues.sleepQuality * 0.2));
      newEmotions.stress = Math.max(0, sliderValues.stress - (sliderValues.sleepQuality * 0.25));
    }
    
    // Food Level affects energy, happiness, and irritability
    if (sliderValues.foodLevel > 0) {
      newEmotions.energy = Math.min(10, sliderValues.energy + (sliderValues.foodLevel * 0.2));
      newEmotions.happiness = Math.min(10, sliderValues.happiness + (sliderValues.foodLevel * 0.15));
      newEmotions.irritability = Math.max(0, sliderValues.irritability - (sliderValues.foodLevel * 0.3));
    }
    
    // Caffeine Level affects energy, anxiety, and focus
    if (sliderValues.caffeineLevel > 0) {
      newEmotions.energy = Math.min(10, sliderValues.energy + (sliderValues.caffeineLevel * 0.3));
      newEmotions.focus = Math.min(10, sliderValues.focus + (sliderValues.caffeineLevel * 0.25));
      newEmotions.anxiety = Math.min(10, sliderValues.anxiety + (sliderValues.caffeineLevel * 0.2));
    }
    
    // Water Level affects energy and focus
    // Convert ml to cups for calculation (1 cup = 237ml)
    const waterCups = (sliderValues.waterLevel * 300) / 237;
    if (waterCups > 0) {
      newEmotions.energy = Math.min(10, sliderValues.energy + (waterCups * 0.15));
      newEmotions.focus = Math.min(10, sliderValues.focus + (waterCups * 0.2));
    }
    
    // Exercise (Walk) affects mood and stress
    const totalExercise = sliderValues.walkLevel;
    if (totalExercise > 0) {
      newEmotions.happiness = Math.min(10, sliderValues.happiness + (totalExercise * 0.1));
      newEmotions.stress = Math.max(0, sliderValues.stress - (totalExercise * 0.15));
      newEmotions.energy = Math.min(10, sliderValues.energy + (totalExercise * 0.1));
    }
    
    // Blood sugar affects mood (if we have a reading)
    if (bloodSugar) {
      if (bloodSugar < 70) {
        // Low blood sugar increases irritability, anxiety, and decreases energy
        newEmotions.irritability = Math.min(10, sliderValues.irritability + 2);
        newEmotions.anxiety = Math.min(10, sliderValues.anxiety + 1.5);
        newEmotions.energy = Math.max(0, sliderValues.energy - 1);
      } else if (bloodSugar > 140) {
        // High blood sugar increases fatigue and decreases focus
        newEmotions.energy = Math.max(0, sliderValues.energy - 1.5);
        newEmotions.focus = Math.max(0, sliderValues.focus - 1);
      }
    }
    
    // Only update emotion sliders, preserve input sliders
    const updatedValues = { ...sliderValues };
    emotionSliders.forEach(emotion => {
      updatedValues[emotion] = newEmotions[emotion];
    });
    
    setSliderValues(updatedValues);
  };

  // Recall functions
  const saveSliderPositions = () => {
    setSavedSliderPositions({ ...sliderValues });
  };

  const recallSliderPositions = () => {
    if (savedSliderPositions) {
      setSliderValues({ ...savedSliderPositions });
    }
  };

  // Get current levels for display
  const getCurrentLevels = () => {
    const levels = {};
    
    // Input sliders with units
    levels['Sleep Quality'] = `${sliderValues.sleepQuality}/10`;
    levels['Water'] = `${Math.round(sliderValues.waterLevel * 300)}ml`;
    levels['Coffee'] = `${Math.round(sliderValues.caffeineLevel * 95)}mg`;
    levels['Food'] = `${Math.round(sliderValues.foodLevel * 300)}cal`;
    levels['Walk'] = `${sliderValues.walkLevel}km`;
    
    // Emotion sliders
    levels['Happiness'] = `${sliderValues.happiness}/10`;
    levels['Anxiety'] = `${sliderValues.anxiety}/10`;
    levels['Energy'] = `${sliderValues.energy}/10`;
    levels['Focus'] = `${sliderValues.focus}/10`;
    levels['Stress'] = `${sliderValues.stress}/10`;
    levels['Sadness'] = `${sliderValues.sadness}/10`;
    levels['Anger'] = `${sliderValues.anger}/10`;
    levels['Irritability'] = `${sliderValues.irritability}/10`;
    levels['Dread'] = `${sliderValues.dread}/10`;
    
    return levels;
  };

  // Get blood sugar status
  const getBloodSugarStatus = () => {
    if (!bloodSugar) return { status: 'unknown', color: '#000000', message: 'No reading' };
    
    if (bloodSugar < 70) {
      return { status: 'low', color: '#ff0000', message: 'Low' };
    } else if (bloodSugar > 140) {
      return { status: 'high', color: '#ff0000', message: 'High' };
    } else {
      return { status: 'normal', color: '#008000', message: 'Normal' };
    }
  };

  // Estimate blood sugar based on current slider levels
  const estimateBloodSugar = () => {
    let estimatedLevel = 90; // Base level (normal fasting)
    
    // Food level impact (1 = 300 calories, 10 = 3000 calories)
    const calories = sliderValues.foodLevel * 300; // 1 unit = 300 calories
    const foodImpact = (calories / 3000) * 40; // Scale to max 40 points for 3000 calories
    estimatedLevel += foodImpact;
    
    // Caffeine impact (can cause blood sugar spikes)
    const caffeineImpact = (sliderValues.caffeineLevel / 10) * 15; // Up to 15 point spike
    estimatedLevel += caffeineImpact;
    
    // Water level impact (dehydration can raise blood sugar)
    // Convert ml to cups (1 cup = 237ml) for calculation
    const waterCups = (sliderValues.waterLevel * 300) / 237; // Convert ml to cups
    const waterImpact = ((8 - waterCups) / 8) * 10; // Dehydration adds up to 10 points (8 cups = optimal)
    estimatedLevel += Math.max(0, waterImpact);
    
    // Sleep quality impact (poor sleep raises blood sugar)
    const sleepImpact = ((10 - sliderValues.sleepQuality) / 10) * 20; // Poor sleep adds up to 20 points
    estimatedLevel += sleepImpact;
    
    // Exercise impact (exercise lowers blood sugar)
    const exerciseImpact = (sliderValues.walkLevel / 10) * -25; // Exercise can lower by up to 25 points
    estimatedLevel += exerciseImpact;
    
    // Time since waking (blood sugar naturally rises after waking)
    // Assuming 1h 23min awake = ~1.4 hours
    const timeImpact = 1.4 * 5; // ~5 points per hour after waking
    estimatedLevel += timeImpact;
    
    // Ensure reasonable bounds
    estimatedLevel = Math.max(60, Math.min(180, estimatedLevel));
    
    return Math.round(estimatedLevel);
  };

  // Calculate output value
  const outputValue = useMemo(() => {
    let value = 0;
    
    // Slider contributions
    value += (sliderValues.sleepQuality / 10) * 10;
    value += (sliderValues.foodLevel / 10) * 1.5;
    value += (sliderValues.caffeineLevel / 10) * 0.5;
    // Convert water ml to cups for output calculation
    const waterCups = (sliderValues.waterLevel * 300) / 237;
    value += (waterCups / 8) * 1.0; // Normalize to 8 cups optimal
    value += (sliderValues.walkLevel / 10) * 1.2;
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
    
    // Ensure output starts at 0 for new users
    const finalValue = Math.max(0, Math.min(10, value));
    
    // If all inputs are at default (0/false), return 0
    const allSlidersAtZero = Object.values(sliderValues).every(val => val === 0);
    const allCheckboxesFalse = Object.values(environmentCheckboxes).every(val => val === false);
    const noTimelineEvents = timelineEvents.length === 0;
    
    if (allSlidersAtZero && allCheckboxesFalse && noTimelineEvents) {
      return 0;
    }
    
    return finalValue;
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
    outputValue,
    bloodSugar,
    updateBloodSugar,
    getBloodSugarStatus,
    estimateBloodSugar,
    autoCalculateBloodSugar,
    autoUpdateEmotions,
    saveSliderPositions,
    recallSliderPositions,
    hasSavedPositions: savedSliderPositions !== null,
    getCurrentLevels
  };
};
