import React from 'react';
import { VIEW_BUTTONS } from '../utils/constants';

const Toolbar = ({ activeView, setActiveView, outputValue, bloodSugar, getBloodSugarStatus }) => {
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
      width: "24px",
      height: "22px",
      background: "#d4d0c8",
      borderTop: "2px solid #ffffff",
      borderLeft: "2px solid #ffffff",
      borderBottom: "2px solid #808080",
      borderRight: "2px solid #808080",
      fontSize: "10px",
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
      width: "250px",
      height: "12px",
      background: "#d4d0c8",
      border: "2px inset #c0c0c0",
      display: "flex",
      alignItems: "center",
      padding: "0",
      fontSize: "10px",
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

  const viewButtons = VIEW_BUTTONS;

  return (
    <div style={styles.viewSwitcher}>
      {viewButtons.map(({ id, icon, alt }) => (
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
          <img src={icon} alt={alt} style={{ width: "14px", height: "14px" }} />
        </button>
      ))}
    </div>
  );
};

export default Toolbar;
