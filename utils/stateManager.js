import { useState, useMemo, useEffect, useCallback } from 'react';

export const useAppState = () => {
  // Slider states
  const [sliderValues, setSliderValues] = useState({
    sleepQuality: 0,
    foodLevel: 0,
    caffeineLevel: 0,
    waterLevel: 0,
    walkLevel: 0,
    alcoholLevel: 0,
    sugarLevel: 0,
    happiness: 0,
    anxiety: 0,
    energy: 0,
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


  // Blood sugar tracking (auto-calculated)
  const [bloodSugar, setBloodSugar] = useState(null);
  
  // Cortisol tracking (auto-calculated)
  const [cortisolLevel, setCortisolLevel] = useState(0);

  // UI state
  const [activeView, setActiveView] = useState('inputs');
  
  // Flag to prevent auto-update when manually adjusting emotions
  const [isManuallyAdjusting, setIsManuallyAdjusting] = useState(false);
  
  // User login state
  const [currentUser, setCurrentUser] = useState(null);
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  // Slider update function
  const updateSlider = (name, value) => {
    // Check if this is an emotion slider being manually adjusted
    const emotionSliders = ['happiness', 'anxiety', 'energy', 'stress', 'sadness', 'anger', 'irritability', 'dread'];
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



  // Auto-calculate blood sugar when sliders change
  const autoCalculateBloodSugar = useCallback(() => {
    const estimated = estimateBloodSugar();
    setBloodSugar(estimated);
  }, [estimateBloodSugar]);

  // Auto-calculate cortisol when sliders change
  const autoCalculateCortisol = useCallback(() => {
    const estimated = estimateCortisol();
    setCortisolLevel(estimated);
  }, [estimateCortisol]);

  // Calculate blood sugar and cortisol on initial load and when sliders change
  useEffect(() => {
    const estimatedBloodSugar = estimateBloodSugar();
    setBloodSugar(estimatedBloodSugar);
    
    const estimatedCortisol = estimateCortisol();
    setCortisolLevel(estimatedCortisol);
  }, [
    sliderValues.sleepQuality,
    sliderValues.foodLevel,
    sliderValues.caffeineLevel,
    sliderValues.waterLevel,
    sliderValues.walkLevel,
    sliderValues.alcoholLevel,
    sliderValues.sugarLevel,
    estimateBloodSugar,
    estimateCortisol
  ]);



  // Get blood sugar status
  const getBloodSugarStatus = (value) => {
    if (!value) return { status: 'unknown', color: '#000000', message: 'No reading' };
    
    if (value < 70) {
      return { status: 'low', color: '#ff0000', message: 'Low' };
    } else if (value > 140) {
      return { status: 'high', color: '#ff0000', message: 'High' };
    } else {
      return { status: 'normal', color: '#008000', message: 'Normal' };
    }
  };

  // Estimate blood sugar based on current slider levels
  const estimateBloodSugar = useCallback(() => {
    // Check if any sliders have been set (non-zero values)
    const hasInputs = sliderValues.sleepQuality > 0 || sliderValues.foodLevel > 0 || 
                      sliderValues.caffeineLevel > 0 || sliderValues.waterLevel > 0 || 
                      sliderValues.walkLevel > 0 || sliderValues.alcoholLevel > 0 || 
                      sliderValues.sugarLevel > 0;
    
    // If no inputs set, return neutral baseline
    if (!hasInputs) {
      return 85; // Neutral blood sugar baseline
    }
    
    // Get current time and calculate time since last meal (6pm yesterday)
    const now = new Date();
    const lastMealTime = new Date();
    lastMealTime.setHours(18, 0, 0, 0); // 6pm yesterday
    lastMealTime.setDate(lastMealTime.getDate() - 1); // Always set to yesterday
    const hoursSinceLastMeal = (now - lastMealTime) / (1000 * 60 * 60);
    
    
    // Start with neutral baseline
    let estimatedLevel = 85; // Neutral baseline
    
    // Extended fasting impact (only if food slider is explicitly set to 0)
    if (sliderValues.foodLevel === 0 && hoursSinceLastMeal > 12) {
      const fastingHours = hoursSinceLastMeal - 12; // Hours beyond normal fasting
      const fastingPenalty = Math.min(fastingHours * 2, 20); // Moderate penalty for intentional fasting
      estimatedLevel -= fastingPenalty;
    }
    
    // Food level impact (positive impact when food is consumed)
    const currentFoodCalories = sliderValues.foodLevel * 300;
    const currentFoodImpact = (currentFoodCalories / 1000) * 15; // Moderate impact
    estimatedLevel += currentFoodImpact;
    
    // Caffeine impact (moderate impact)
    const caffeineImpact = sliderValues.caffeineLevel * 5; // Moderate impact: 5 points per shot
    estimatedLevel += caffeineImpact;
    
    // Water level impact (dehydration penalty only when water is low)
    const waterCups = (sliderValues.waterLevel * 300) / 237;
    const waterImpact = ((8 - waterCups) / 8) * 5; // Moderate dehydration impact
    estimatedLevel += Math.max(0, waterImpact);
    
    // Sleep quality impact (poor sleep penalty only when sleep is low)
    const sleepImpact = ((10 - sliderValues.sleepQuality) / 10) * 8; // Moderate sleep impact
    estimatedLevel += sleepImpact;
    
    // Exercise impact (exercise lowers blood sugar)
    const exerciseImpact = (sliderValues.walkLevel / 10) * -15; // Moderate exercise impact
    estimatedLevel += exerciseImpact;
    
    // Alcohol impact (moderate impact)
    const alcoholImpact = sliderValues.alcoholLevel * 6; // Moderate impact per drink
    estimatedLevel += alcoholImpact;
    
    // Sugar impact (moderate impact)
    const sugarGrams = sliderValues.sugarLevel * 10; // Convert slider to grams
    const sugarImpact = sugarGrams * 1.5; // Moderate impact: 1.5 points per gram
    estimatedLevel += sugarImpact;
    
    
    // Ensure reasonable bounds (60-180 mg/dL)
    estimatedLevel = Math.max(60, Math.min(180, estimatedLevel));
    
    return Math.round(estimatedLevel);
  }, []);

  // Estimate cortisol based on stress, anxiety, sleep, fasting, and time factors
  const estimateCortisol = useCallback(() => {
    // Check if any sliders have been set (non-zero values)
    const hasInputs = sliderValues.sleepQuality > 0 || sliderValues.foodLevel > 0 || 
                      sliderValues.caffeineLevel > 0 || sliderValues.waterLevel > 0 || 
                      sliderValues.walkLevel > 0 || sliderValues.alcoholLevel > 0 || 
                      sliderValues.sugarLevel > 0;
    
    // If no inputs set, return neutral baseline
    if (!hasInputs) {
      return 12; // Neutral cortisol baseline
    }
    
    // Get current time for circadian rhythm calculation
    const now = new Date();
    const currentHour = now.getHours();
    
    // Calculate time since last meal (assuming last meal was at 6pm yesterday)
    const lastMealTime = new Date();
    lastMealTime.setHours(18, 0, 0, 0); // 6pm yesterday
    lastMealTime.setDate(lastMealTime.getDate() - 1); // Always set to yesterday
    const hoursSinceLastMeal = (now - lastMealTime) / (1000 * 60 * 60);
    
    // Start with circadian baseline (varies by time of day)
    let estimatedCortisol;
    if (currentHour >= 6 && currentHour <= 10) {
      estimatedCortisol = 18; // Morning peak (6-10 AM)
    } else if (currentHour >= 11 && currentHour <= 15) {
      estimatedCortisol = 15; // Afternoon moderate (11 AM - 3 PM)
    } else if (currentHour >= 16 && currentHour <= 20) {
      estimatedCortisol = 12; // Evening lower (4-8 PM)
    } else {
      estimatedCortisol = 8; // Night lowest (9 PM - 5 AM)
    }
    
    // Fasting impact (only if food slider is explicitly set to 0)
    if (sliderValues.foodLevel === 0 && hoursSinceLastMeal > 12) {
      const fastingHours = hoursSinceLastMeal - 12; // Hours beyond normal fasting
      const fastingImpact = Math.min(fastingHours * 1.5, 10); // Moderate impact for intentional fasting
      estimatedCortisol += fastingImpact;
    }
    
    // Note: Not using emotion sliders (stress, anxiety) for cortisol calculation
    
    // Sleep quality impact (poor sleep raises cortisol)
    const sleepImpact = ((10 - sliderValues.sleepQuality) / 10) * 6; // Moderate sleep impact
    estimatedCortisol += sleepImpact;
    
    // Caffeine impact (caffeine raises cortisol)
    const caffeineImpact = sliderValues.caffeineLevel * 3; // Moderate impact: 3 points per shot
    estimatedCortisol += caffeineImpact;
    
    // Exercise impact (moderate exercise can raise cortisol initially)
    const exerciseImpact = (sliderValues.walkLevel / 10) * 2; // Moderate exercise impact
    estimatedCortisol += exerciseImpact;
    
    // Alcohol impact (alcohol can initially lower cortisol)
    const alcoholImpact = sliderValues.alcoholLevel * -2; // Moderate alcohol impact
    estimatedCortisol += alcoholImpact;
    
    // Sugar impact (sugar spikes can cause stress response)
    const sugarGrams = sliderValues.sugarLevel * 10; // Convert slider to grams
    const sugarImpact = sugarGrams * 0.5; // Moderate cortisol impact: 0.5 points per gram
    estimatedCortisol += sugarImpact;
    
    // Water level impact (dehydration can raise cortisol)
    const waterCups = (sliderValues.waterLevel * 300) / 237;
    const waterImpact = ((8 - waterCups) / 8) * 4; // Moderate dehydration impact
    estimatedCortisol += Math.max(0, waterImpact);
    
    // Food level impact (fasting raises cortisol)
    const foodImpact = ((10 - sliderValues.foodLevel) / 10) * 3; // Moderate fasting impact
    estimatedCortisol += foodImpact;
    
    // Note: Not using emotion sliders (anger, irritability, dread, energy) for cortisol calculation
    
    // Ensure reasonable bounds (6-30 μg/dL)
    estimatedCortisol = Math.max(6, Math.min(30, estimatedCortisol));
    
    
    return Math.round(estimatedCortisol);
  }, []);

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
    
    
    // Ensure output starts at 0 for new users
    const finalValue = Math.max(0, Math.min(10, value));
    
    // If all inputs are at default (0/false), return 0
    const allSlidersAtZero = Object.values(sliderValues).every(val => val === 0);
    const allCheckboxesFalse = Object.values(environmentCheckboxes).every(val => val === false);
    
    if (allSlidersAtZero && allCheckboxesFalse) {
      return 0;
    }
    
    return finalValue;
  }, [sliderValues, environmentCheckboxes]);

  // Login functions
  const closeLoginDialog = () => setShowLoginDialog(false);
  const login = (username, password) => {
    // Simple login validation (in real app, this would check against server)
    if (username && password) {
      setCurrentUser(username);
      setShowLoginDialog(false);
    }
  };

  return {
    sliderValues,
    updateSlider,
    environmentCheckboxes,
    updateEnvironmentCheckbox,
    activeView,
    setActiveView,
    outputValue,
    bloodSugar,
    getBloodSugarStatus,
    autoCalculateBloodSugar,
    cortisolLevel,
    autoCalculateCortisol,
    currentUser,
    showLoginDialog,
    closeLoginDialog,
    login,
    isLoggedIn: !!currentUser,
    logout: () => setCurrentUser(null)
  };
};
