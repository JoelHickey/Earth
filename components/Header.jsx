import React from 'react';

const Header = () => {
  const styles = {
    header: {
      background: "linear-gradient(90deg, #000080 0%, #1084d0 100%)",
      color: "#ffffff",
      padding: "4px",
      fontSize: "12px",
      fontWeight: "bold",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: "1px solid #808080"
    },
    closeButton: {
      width: "20px",
      height: "18px",
      background: "#d4d0c8",
      border: "1px outset #c0c0c0",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "12px",
      fontFamily: "'MS Sans Serif', Arial, sans-serif",
      color: "#000000",
      padding: "0",
      lineHeight: "1",
      fontWeight: "bold"
    }
  };

  const handleCloseButtonMouseDown = (e) => {
    e.target.style.border = "1px inset #c0c0c0";
    e.target.style.background = "#c0c0c0";
  };

  const handleCloseButtonMouseUp = (e) => {
    e.target.style.border = "1px outset #c0c0c0";
    e.target.style.background = "#d4d0c8";
  };

  return (
    <div style={styles.header}>
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <img src="/Earth.ico" alt="Earth" style={{ width: "16px", height: "16px" }} />
        <span>Earth</span>
      </div>
      <button
        style={styles.closeButton}
        onMouseDown={handleCloseButtonMouseDown}
        onMouseUp={handleCloseButtonMouseUp}
      >
        ✕
      </button>
    </div>
  );
};

export default Header;
