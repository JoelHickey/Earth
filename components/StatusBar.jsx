import React, { useState, useEffect } from 'react';

const StatusBar = ({ caffeineLevel = 0, sliderValues = {} }) => {
  // Set wake time to today at 5:00 AM
  const today = new Date();
  const wakeTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 5, 0, 0);
  
  const [elapsedTime, setElapsedTime] = useState('');

  // Calculate caffeine based on slider value (1 unit = 1 cup = 95mg)
  const caffeineMg = Math.round(caffeineLevel * 95);
  
  // Calculate hours since waking for caffeine metabolism
  const getHoursSinceWaking = () => {
    const now = new Date();
    const diff = now - wakeTime;
    if (diff < 0) return 0;
    return diff / (1000 * 60 * 60);
  };

  // Calculate safe caffeine limit (400mg per day, but consider time since waking)
  const getCaffeineWarning = () => {
    const hoursSinceWaking = getHoursSinceWaking();
    const maxDailyCaffeine = 400; // mg per day
    const hoursInDay = 24;
    
    // Calculate proportional limit based on time since waking
    const proportionalLimit = Math.round((hoursSinceWaking / hoursInDay) * maxDailyCaffeine);
    
    if (caffeineMg > proportionalLimit) {
      const overLimit = caffeineMg - proportionalLimit;
      return `Caffeine: ${overLimit}mg over limit`;
    }
    
    return null;
  };

  // Generate recommendations based on current state
  const getRecommendations = () => {
    const recommendations = [];
    const hoursSinceWaking = getHoursSinceWaking();
    
    // Food recommendation
    if (sliderValues.foodLevel < 3) {
      recommendations.push("Eat something");
    }
    
    // Water recommendation
    if (sliderValues.waterLevel < 4) {
      recommendations.push("Drink water");
    }
    
    // Exercise recommendations
    if (sliderValues.walkLevel < 3) {
      recommendations.push("Take a walk");
    }
    
    if (sliderValues.squatsLevel < 2) {
      recommendations.push("Do some squats");
    }
    
    // Caffeine recommendations
    if (caffeineMg > 200 && hoursSinceWaking > 6) {
      recommendations.push("Caffeine crash likely");
    }
    
    if (caffeineMg > 300) {
      recommendations.push("Limit more caffeine");
    }
    
    // Sleep recommendations
    if (sliderValues.sleepQuality < 5) {
      recommendations.push("Poor sleep detected");
    }
    
    // Energy recommendations
    if (sliderValues.energy > 7 && caffeineMg > 200) {
      recommendations.push("Energy spike - may crash");
    }
    
    // Time-based recommendations
    if (hoursSinceWaking > 12) {
      recommendations.push("Long day - consider rest");
    }
    
    return recommendations;
  };

  const caffeineWarning = getCaffeineWarning();
  const recommendations = getRecommendations();

  useEffect(() => {
    const updateElapsedTime = () => {
      const now = new Date();
      const diff = now - wakeTime;
      
      // If it's before wake time, show 0 time
      if (diff < 0) {
        setElapsedTime('0h 0m');
        return;
      }
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      setElapsedTime(`${hours}h ${minutes}m`);
    };

    // Update immediately
    updateElapsedTime();
    
    // Update every minute
    const interval = setInterval(updateElapsedTime, 60000);
    
    return () => clearInterval(interval);
  }, [wakeTime]);

  const styles = {
    statusBar: {
      background: "#d4d0c8",
      borderTop: "1px solid #ffffff",
      padding: "2px 8px",
      fontSize: "10px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontFamily: "'MS Sans Serif', sans-serif",
      color: "#000000",
      minHeight: "20px",
      width: "100%",
      overflow: "hidden",
      boxSizing: "border-box"
    },
    leftSection: {
      display: "flex",
      alignItems: "center",
      gap: "8px"
    },
    rightSection: {
      display: "flex",
      alignItems: "center",
      gap: "8px"
    },
    neuralLinkIndicator: {
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      background: "radial-gradient(circle at 20% 20%, #ffffff 0%, #f0f0f0 15%, #e0e0e0 30%, #c0c0c0 60%, #a0a0a0 100%)",
      border: "1px solid #808080",
      boxShadow: "inset 0.5px 0.5px #ffffff, inset -0.5px -0.5px #606060"
    },
    warning: {
      color: "#000000",
      fontWeight: "normal",
      display: "flex",
      alignItems: "center",
      gap: "4px"
    },
    warningIcon: {
      width: "12px",
      height: "12px"
    },
    recommendation: {
      color: "#000000",
      fontWeight: "normal",
      display: "flex",
      alignItems: "center"
    }
  };

  return (
    <div style={styles.statusBar}>
      <div style={styles.leftSection}>
        <span>Awake: {elapsedTime}</span>
        {caffeineWarning && (
          <span style={styles.warning}>
            <img src="/Warning.ico" alt="Warning" style={styles.warningIcon} />
            {caffeineWarning}
          </span>
        )}
        {recommendations.length > 0 && (
          <span style={styles.recommendation}>
            <img src="/lamp.ico" alt="Recommendation" style={{ width: "12px", height: "12px", marginRight: "2px" }} />
            {recommendations[0]}
          </span>
        )}
      </div>
      
      <div style={styles.rightSection}>
        <span>Neural link</span>
        <div style={styles.neuralLinkIndicator} />
      </div>
    </div>
  );
};

export default StatusBar;
