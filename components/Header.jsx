import React from 'react';

const Header = ({ onClose, onMinimize, isMacOS8Theme = false }) => {
  const styles = {
    header: {
      background: isMacOS8Theme ? "#c0c0c0" : "linear-gradient(90deg, #000080 0%, #1084d0 100%)",
      color: isMacOS8Theme ? "#000000" : "#ffffff",
      padding: isMacOS8Theme ? "3px 6px" : "2px 4px",
      fontSize: isMacOS8Theme ? "12px" : "8px",
      fontWeight: isMacOS8Theme ? "normal" : "bold",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: isMacOS8Theme ? "1px solid #808080" : "1px solid #808080",
      height: isMacOS8Theme ? "20px" : "19px",
      boxSizing: "border-box",
      fontFamily: isMacOS8Theme ? "'Chicago', 'Geneva', 'Helvetica', sans-serif" : "'MS Sans Serif', sans-serif",
      textShadow: isMacOS8Theme ? "none" : "none"
    },
    windowButton: {
      width: isMacOS8Theme ? "14px" : "16px",
      height: isMacOS8Theme ? "12px" : "14px",
      background: isMacOS8Theme ? "#c0c0c0" : "#d4d0c8",
      borderTop: isMacOS8Theme ? "1px solid #ffffff" : "1px solid #ffffff",
      borderLeft: isMacOS8Theme ? "1px solid #ffffff" : "1px solid #ffffff",
      borderBottom: isMacOS8Theme ? "1px solid #808080" : "1px solid #808080",
      borderRight: isMacOS8Theme ? "1px solid #808080" : "1px solid #808080",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: isMacOS8Theme ? "10px" : "8px",
      fontFamily: isMacOS8Theme ? "'Chicago', 'Geneva', 'Helvetica', sans-serif" : "'MS Sans Serif', sans-serif",
      color: "#000000",
      padding: "0",
      lineHeight: "1",
      fontWeight: isMacOS8Theme ? "bold" : "normal",
      boxShadow: isMacOS8Theme ? "inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080" : "none",
      marginLeft: "2px"
    }
  };

  const handleWindowButtonMouseDown = (e) => {
    e.target.style.borderTop = "1px solid #808080";
    e.target.style.borderLeft = "1px solid #808080";
    e.target.style.borderBottom = "1px solid #ffffff";
    e.target.style.borderRight = "1px solid #ffffff";
    e.target.style.background = "#c0c0c0";
  };

  const handleWindowButtonMouseUp = (e) => {
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
      <div style={{ display: "flex", alignItems: "center" }}>
        <button
          style={styles.windowButton}
          onClick={onMinimize}
          onMouseDown={handleWindowButtonMouseDown}
          onMouseUp={handleWindowButtonMouseUp}
          title="Minimize"
        >
          −
        </button>
        <button
          style={styles.windowButton}
          onClick={onClose}
          onMouseDown={handleWindowButtonMouseDown}
          onMouseUp={handleWindowButtonMouseUp}
          title="Close"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Header;
