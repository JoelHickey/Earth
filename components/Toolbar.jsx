import React from 'react';
import { VIEW_BUTTONS } from '../utils/constants';

const Toolbar = ({ activeView, setActiveView, outputValue, bloodSugar, getBloodSugarStatus, saveSliderPositions, recallSliderPositions, hasSavedPositions, undoSliderChange, hasUndoAvailable, cortisolLevel = 0, isMacOS8Theme = false }) => {
  const styles = {
    viewSwitcher: {
      display: "flex",
      alignItems: "center",
      gap: isMacOS8Theme ? "4px" : "2px",
      padding: isMacOS8Theme ? "4px" : "2px",
      background: isMacOS8Theme ? "#c0c0c0" : "#c0c0c0",
      borderBottom: isMacOS8Theme ? "1px solid #808080" : "1px solid #808080",
      borderTop: isMacOS8Theme ? "1px solid #ffffff" : "1px solid #ffffff",
      height: isMacOS8Theme ? "28px" : "32px",
      boxShadow: isMacOS8Theme ? "inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080" : "none"
    },
    button: {
      width: isMacOS8Theme ? "28px" : "32px",
      height: isMacOS8Theme ? "20px" : "26px",
      background: isMacOS8Theme ? "#c0c0c0" : "#d4d0c8",
      borderTop: isMacOS8Theme ? "1px solid #ffffff" : "2px solid #ffffff",
      borderLeft: isMacOS8Theme ? "1px solid #ffffff" : "2px solid #ffffff",
      borderBottom: isMacOS8Theme ? "1px solid #808080" : "2px solid #808080",
      borderRight: isMacOS8Theme ? "1px solid #808080" : "2px solid #808080",
      fontSize: isMacOS8Theme ? "10px" : "8px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: isMacOS8Theme ? "'Chicago', 'Geneva', 'Helvetica', sans-serif" : "'MS Sans Serif', sans-serif",
      fontWeight: isMacOS8Theme ? "normal" : "normal",
      padding: "0",
      boxSizing: "border-box",
      boxShadow: isMacOS8Theme ? "inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080" : "none"
    },
    activeButton: {
      borderTop: isMacOS8Theme ? "1px solid #808080" : "2px solid #808080",
      borderLeft: isMacOS8Theme ? "1px solid #808080" : "2px solid #808080",
      borderBottom: isMacOS8Theme ? "1px solid #ffffff" : "2px solid #ffffff",
      borderRight: isMacOS8Theme ? "1px solid #ffffff" : "2px solid #ffffff",
      boxShadow: isMacOS8Theme ? "inset 1px 1px 0px #808080, inset -1px -1px 0px #ffffff" : "none"
    },
    outputBar: {
      width: "126px",
      height: "8px",
      background: "#ffffff",
      borderTop: "2px solid #808080",
      borderLeft: "2px solid #808080",
      borderBottom: "2px solid #ffffff",
      borderRight: "2px solid #ffffff",
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
      background: "#ffffff",
      borderTop: "2px solid #808080",
      borderLeft: "2px solid #808080",
      borderBottom: "2px solid #ffffff",
      borderRight: "2px solid #ffffff",
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
      background: "#ffffff",
      borderTop: "2px solid #808080",
      borderLeft: "2px solid #808080",
      borderBottom: "2px solid #ffffff",
      borderRight: "2px solid #ffffff",
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

  return (
    <div style={styles.viewSwitcher}>
      {VIEW_BUTTONS.map(({ id, icon, alt, text }) => (
        <React.Fragment key={id}>
          <button
            style={{
              ...styles.button,
              ...(text && { width: "auto", padding: "0 8px" }),
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
          {id === 'timeline' && (
            <div style={{
              width: "1px",
              height: "20px",
              background: "#808080",
              margin: "0 2px"
            }} />
          )}
        </React.Fragment>
      ))}
      
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
