import React from 'react';
import { VIEW_BUTTONS } from '../utils/constants';

const Toolbar = ({ activeView, setActiveView, outputValue, bloodSugar, getBloodSugarStatus, saveSliderPositions, recallSliderPositions, hasSavedPositions, cortisolLevel = 0 }) => {
  const styles = {
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
      width: "32px",
      height: "28px",
      background: "#d4d0c8",
      borderTop: "2px solid #ffffff",
      borderLeft: "2px solid #ffffff",
      borderBottom: "2px solid #808080",
      borderRight: "2px solid #808080",
      fontSize: "8px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'MS Sans Serif', sans-serif",
      fontWeight: "normal",
      padding: "0",
      boxSizing: "border-box"
    },
    activeButton: {
      borderTop: "2px solid #808080",
      borderLeft: "2px solid #808080",
      borderBottom: "2px solid #ffffff",
      borderRight: "2px solid #ffffff"
    },
    outputBar: {
      width: "126px",
      height: "8px",
      background: "#d4d0c8",
      border: "2px inset #c0c0c0",
      display: "flex",
      alignItems: "center",
      padding: "0",
      fontSize: "8px",
      fontFamily: "'MS Sans Serif', sans-serif",
      marginLeft: "8px",
      boxSizing: "border-box",
      position: "relative",
      overflow: "hidden"
    },
    outputFill: {
      height: "100%",
      width: `${(outputValue / 10) * 100}%`,
      background: (() => {
        if (outputValue === 0) return "transparent";
        if (outputValue <= 3) return "#ff0000";
        if (outputValue <= 6) return "#ffff00";
        return "#00ff00";
      })(),
      position: "absolute",
      left: "0",
      top: "0",
      transition: "width 0.2s ease"
    },
    healthIndicators: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: "8px",
      marginLeft: "auto"
    },
    healthBars: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: "2px"
    },
    bloodSugarBar: {
      width: "126px",
      height: "8px",
      background: "#d4d0c0",
      border: "2px inset #c0c0c0",
      display: "flex",
      alignItems: "center",
      padding: "0",
      fontSize: "8px",
      fontFamily: "'MS Sans Serif', sans-serif",
      marginLeft: "8px",
      boxSizing: "border-box",
      position: "relative",
      overflow: "hidden"
    },
    bloodSugarFill: {
      height: "100%",
      width: (() => {
        if (!bloodSugar) return "0%";
        // Normalize blood sugar to 0-100% (60-180 mg/dL range)
        const normalized = Math.max(0, Math.min(100, ((bloodSugar - 60) / 120) * 100));
        return `${normalized}%`;
      })(),
      background: "#ff0000", // Always red
      position: "absolute",
      left: "0",
      top: "0",
      transition: "width 0.2s ease"
    },
    bloodSugarLabel: {
      fontSize: "8px",
      fontFamily: "'MS Sans Serif', sans-serif",
      color: "#000000"
    },
    cortisolBar: {
      width: "126px",
      height: "8px",
      background: "#d4d0c8",
      border: "2px inset #c0c0c0",
      display: "flex",
      alignItems: "center",
      padding: "0",
      fontSize: "8px",
      fontFamily: "'MS Sans Serif', sans-serif",
      marginLeft: "8px",
      boxSizing: "border-box",
      position: "relative",
      overflow: "hidden"
    },
    cortisolFill: {
      height: "100%",
      width: `${(cortisolLevel / 10) * 100}%`,
      background: "#000000", // Always black
      position: "absolute",
      left: "0",
      top: "0",
      transition: "width 0.2s ease"
    },
    cortisolLabel: {
      fontSize: "8px",
      fontFamily: "'MS Sans Serif', sans-serif",
      color: "#000000"
    }
  };

  const handleButtonMouseDown = (e) => {
    if (e.target.tagName === 'BUTTON') {
      e.target.style.borderTop = "2px solid #808080";
      e.target.style.borderLeft = "2px solid #808080";
      e.target.style.borderBottom = "2px solid #ffffff";
      e.target.style.borderRight = "2px solid #ffffff";
    }
  };

  const handleButtonMouseUp = (e) => {
    if (e.target.tagName === 'BUTTON') {
      e.target.style.borderTop = "2px solid #ffffff";
      e.target.style.borderLeft = "2px solid #ffffff";
      e.target.style.borderBottom = "2px solid #808080";
      e.target.style.borderRight = "2px solid #808080";
    }
  };

  const viewButtons = VIEW_BUTTONS.filter(button => button.id !== 'design');
  const aboutButton = VIEW_BUTTONS.find(button => button.id === 'design');

  return (
    <div style={styles.viewSwitcher}>
      {viewButtons.map(({ id, icon, alt, text }) => (
        <button
          key={id}
          style={{
            ...styles.button,
            ...(activeView === id && styles.activeButton)
          }}
          onClick={() => setActiveView(id)}
          onMouseDown={handleButtonMouseDown}
          onMouseUp={handleButtonMouseUp}
        >
          {text ? (
            <span style={{ fontSize: "8px", fontFamily: "'MS Sans Serif', sans-serif" }}>
              {text}
            </span>
          ) : (
            <img src={icon} alt={alt} style={{ width: "18px", height: "18px" }} />
          )}
        </button>
      ))}
      
      <div style={{ display: "flex", gap: "2px", marginLeft: "8px", alignItems: "center" }}>
        <div style={{
          width: "1px",
          height: "16px",
          background: "#808080",
          borderLeft: "1px solid #ffffff",
          marginRight: "4px"
        }} />
        <button
          onClick={saveSliderPositions}
          style={{
            ...styles.button,
            width: "auto",
            padding: "0 6px",
            fontSize: "8px"
          }}
          onMouseDown={handleButtonMouseDown}
          onMouseUp={handleButtonMouseUp}
        >
          Save
        </button>
        <button
          onClick={recallSliderPositions}
          disabled={!hasSavedPositions}
          style={{
            ...styles.button,
            width: "auto",
            padding: "0 6px",
            fontSize: "8px",
            background: hasSavedPositions ? "#d4d0c8" : "#c0c0c0",
            cursor: hasSavedPositions ? "pointer" : "not-allowed",
            color: hasSavedPositions ? "#000000" : "#808080"
          }}
          onMouseDown={handleButtonMouseDown}
          onMouseUp={handleButtonMouseUp}
        >
          Recall
        </button>
        <div style={{
          width: "1px",
          height: "16px",
          background: "#808080",
          borderLeft: "1px solid #ffffff",
          margin: "0 4px"
        }}></div>
        <button
          style={{
            ...styles.button,
            width: "auto",
            padding: "0 6px",
            fontSize: "8px"
          }}
          onClick={() => console.log("Login button clicked")}
          onMouseDown={handleButtonMouseDown}
          onMouseUp={handleButtonMouseUp}
        >
          Login
        </button>
        <div style={{
          width: "1px",
          height: "16px",
          background: "#808080",
          borderLeft: "1px solid #ffffff",
          margin: "0 4px"
        }}></div>
        <button
          style={{
            ...styles.button,
            width: "auto",
            padding: "0 6px",
            fontSize: "8px"
          }}
          onClick={() => setActiveView(aboutButton.id)}
          onMouseDown={handleButtonMouseDown}
          onMouseUp={handleButtonMouseUp}
        >
          {aboutButton.text}
        </button>
      </div>
      
      <div style={styles.healthIndicators}>
        <div style={styles.healthBars}>
          <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
            <span style={{ 
              fontSize: "8px", 
              fontFamily: "'MS Sans Serif', sans-serif",
              color: "#000000"
            }}>
              Output:
            </span>
            <div style={styles.outputBar}>
              <div style={styles.outputFill} />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
            <span style={styles.bloodSugarLabel}>
              Blood Sugar:
            </span>
            <div style={styles.bloodSugarBar}>
              <div style={styles.bloodSugarFill} />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
            <span style={styles.cortisolLabel}>
              Cortisol:
            </span>
            <div style={styles.cortisolBar}>
              <div style={styles.cortisolFill} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
