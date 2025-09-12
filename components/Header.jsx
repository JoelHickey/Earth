import React from 'react';

const Header = ({ cortisolLevel = 0 }) => {
  const styles = {
    header: {
      background: "linear-gradient(90deg, #000080 0%, #1084d0 100%)",
      color: "#ffffff",
      padding: "2px 4px",
      fontSize: "8px",
      fontWeight: "bold",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: "1px solid #808080",
      height: "19px",
      boxSizing: "border-box"
    },
    closeButton: {
      width: "16px",
      height: "14px",
      background: "#d4d0c8",
      borderTop: "1px solid #ffffff",
      borderLeft: "1px solid #ffffff",
      borderBottom: "1px solid #808080",
      borderRight: "1px solid #808080",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "8px",
      fontFamily: "'MS Sans Serif', sans-serif",
      color: "#000000",
      padding: "0",
      lineHeight: "1",
      fontWeight: "normal"
    },
    cortisolBar: {
      width: "80px",
      height: "8px",
      background: "#d4d0c8",
      border: "1px inset #c0c0c0",
      display: "flex",
      alignItems: "center",
      padding: "0",
      fontSize: "6px",
      fontFamily: "'MS Sans Serif', sans-serif",
      marginLeft: "8px",
      boxSizing: "border-box",
      position: "relative",
      overflow: "hidden"
    },
    cortisolFill: {
      height: "100%",
      width: `${(cortisolLevel / 10) * 100}%`,
      background: (() => {
        if (cortisolLevel === 0) return "transparent";
        if (cortisolLevel <= 3) return "#00ff00"; // Low - Green
        if (cortisolLevel <= 6) return "#ffff00"; // Medium - Yellow
        return "#ff0000"; // High - Red
      })(),
      position: "absolute",
      left: "0",
      top: "0",
      transition: "width 0.2s ease"
    },
    cortisolLabel: {
      fontSize: "6px",
      fontFamily: "'MS Sans Serif', sans-serif",
      color: "#ffffff",
      marginRight: "2px"
    }
  };

  const handleCloseButtonMouseDown = (e) => {
    e.target.style.borderTop = "1px solid #808080";
    e.target.style.borderLeft = "1px solid #808080";
    e.target.style.borderBottom = "1px solid #ffffff";
    e.target.style.borderRight = "1px solid #ffffff";
    e.target.style.background = "#c0c0c0";
  };

  const handleCloseButtonMouseUp = (e) => {
    e.target.style.borderTop = "1px solid #ffffff";
    e.target.style.borderLeft = "1px solid #ffffff";
    e.target.style.borderBottom = "1px solid #808080";
    e.target.style.borderRight = "1px solid #808080";
    e.target.style.background = "#d4d0c8";
  };

  return (
    <div style={styles.header}>
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <img src="/Earth.ico" alt="Earth" style={{ width: "14px", height: "14px" }} />
        <span>Earth</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <span style={styles.cortisolLabel}>Cortisol:</span>
        <div style={styles.cortisolBar}>
          <div style={styles.cortisolFill} />
        </div>
        <button
          style={styles.closeButton}
          onMouseDown={handleCloseButtonMouseDown}
          onMouseUp={handleCloseButtonMouseUp}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Header;
