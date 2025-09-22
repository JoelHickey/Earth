import React from 'react';

const Taskbar = ({ onOpenWindow }) => {
  const styles = {
    taskbar: {
      position: "fixed",
      bottom: "0",
      left: "0",
      right: "0",
      height: "28px",
      background: "#c0c0c0",
      borderTop: "1px solid #ffffff",
      borderBottom: "1px solid #808080",
      display: "flex",
      alignItems: "center",
      padding: "2px",
      fontFamily: "'MS Sans Serif', sans-serif",
      fontSize: "8px",
      zIndex: 1000,
      justifyContent: "space-between"
    },
    startButton: {
      height: "22px",
      background: "#c0c0c0",
      borderTop: "1px solid #ffffff",
      borderLeft: "1px solid #ffffff",
      borderBottom: "1px solid #808080",
      borderRight: "1px solid #808080",
      padding: "0 6px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "8px",
      fontFamily: "'MS Sans Serif', sans-serif",
      color: "#000000",
      fontWeight: "bold",
      marginRight: "2px",
      boxSizing: "border-box",
      minWidth: "60px"
    },
    taskbarButton: {
      height: "22px",
      background: "#c0c0c0",
      borderTop: "1px solid #ffffff",
      borderLeft: "1px solid #ffffff",
      borderBottom: "1px solid #808080",
      borderRight: "1px solid #808080",
      padding: "0 6px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "8px",
      fontFamily: "'MS Sans Serif', sans-serif",
      color: "#000000",
      marginRight: "2px",
      minWidth: "80px",
      boxSizing: "border-box"
    },
    clock: {
      padding: "2px 6px",
      fontSize: "8px",
      fontFamily: "'MS Sans Serif', sans-serif",
      color: "#000000",
      background: "#c0c0c0",
      borderTop: "1px solid #808080",
      borderLeft: "1px solid #808080",
      borderBottom: "1px solid #ffffff",
      borderRight: "1px solid #ffffff",
      height: "22px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxSizing: "border-box",
      minWidth: "60px"
    }
  };

  const handleStartMouseDown = (e) => {
    e.target.style.borderTop = "1px solid #808080";
    e.target.style.borderLeft = "1px solid #808080";
    e.target.style.borderBottom = "1px solid #ffffff";
    e.target.style.borderRight = "1px solid #ffffff";
  };

  const handleStartMouseUp = (e) => {
    e.target.style.borderTop = "1px solid #ffffff";
    e.target.style.borderLeft = "1px solid #ffffff";
    e.target.style.borderBottom = "1px solid #808080";
    e.target.style.borderRight = "1px solid #808080";
  };

  const handleTaskbarButtonMouseDown = (e) => {
    e.target.style.borderTop = "1px solid #808080";
    e.target.style.borderLeft = "1px solid #808080";
    e.target.style.borderBottom = "1px solid #ffffff";
    e.target.style.borderRight = "1px solid #ffffff";
  };

  const handleTaskbarButtonMouseUp = (e) => {
    e.target.style.borderTop = "1px solid #ffffff";
    e.target.style.borderLeft = "1px solid #ffffff";
    e.target.style.borderBottom = "1px solid #808080";
    e.target.style.borderRight = "1px solid #808080";
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div style={styles.taskbar}>
      {/* Left side - buttons */}
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* Start Button */}
        <button
          style={styles.startButton}
          onMouseDown={handleStartMouseDown}
          onMouseUp={handleStartMouseUp}
          onClick={onOpenWindow}
        >
          <img src="/Windows logo (without text).ico" alt="Start" style={{ width: "16px", height: "16px", marginRight: "4px" }} />
          Start
        </button>

        {/* Taskbar Button for the Application */}
        <button
          style={styles.taskbarButton}
          onMouseDown={handleTaskbarButtonMouseDown}
          onMouseUp={handleTaskbarButtonMouseUp}
          onClick={onOpenWindow}
        >
          <img src="/Earth.ico" alt="Earth" style={{ width: "16px", height: "16px", marginRight: "4px" }} />
          Earth
        </button>
      </div>

      {/* Clock */}
      <div style={styles.clock}>
        {getCurrentTime()}
      </div>
    </div>
  );
};

export default Taskbar;
