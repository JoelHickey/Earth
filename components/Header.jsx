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
      width: "16px",
      height: "16px",
      background: "#d4d0c8",
      borderTop: "2px solid #ffffff",
      borderLeft: "2px solid #ffffff",
      borderBottom: "2px solid #808080",
      borderRight: "2px solid #808080",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "10px",
      fontFamily: "'MS Sans Serif', sans-serif",
      color: "#000000",
      padding: "0",
      lineHeight: "1",
      fontWeight: "normal"
    }
  };

  const handleCloseButtonMouseDown = (e) => {
    e.target.style.borderTop = "2px solid #808080";
    e.target.style.borderLeft = "2px solid #808080";
    e.target.style.borderBottom = "2px solid #ffffff";
    e.target.style.borderRight = "2px solid #ffffff";
    e.target.style.background = "#c0c0c0";
  };

  const handleCloseButtonMouseUp = (e) => {
    e.target.style.borderTop = "2px solid #ffffff";
    e.target.style.borderLeft = "2px solid #ffffff";
    e.target.style.borderBottom = "2px solid #808080";
    e.target.style.borderRight = "2px solid #808080";
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
        onMouseDown={handleCloseButtonMouseDown}
        onMouseUp={handleCloseButtonMouseUp}
      >
        ✕
      </button>
    </div>
  );
};

export default Header;
