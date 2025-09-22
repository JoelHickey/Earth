import React from 'react';

const Header = ({ onClose }) => {
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
      <button
        style={styles.closeButton}
        onClick={onClose}
        onMouseDown={handleCloseButtonMouseDown}
        onMouseUp={handleCloseButtonMouseUp}
      >
        ✕
      </button>
    </div>
  );
};

export default Header;
