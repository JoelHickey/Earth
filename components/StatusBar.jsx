import React from 'react';

const StatusBar = ({ isAuthenticated, user }) => {
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
      overflow: "hidden"
    },
    neuralLinkIndicator: {
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      background: "radial-gradient(circle at 20% 20%, #ffffff 0%, #f0f0f0 15%, #e0e0e0 30%, #c0c0c0 60%, #a0a0a0 100%)",
      border: "1px solid #808080",
      boxShadow: "inset 0.5px 0.5px #ffffff, inset -0.5px -0.5px #606060, 0 0 2px rgba(255,255,255,0.3)"
    }
  };

    return (
    <div style={styles.statusBar}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span>{isAuthenticated ? `Signed in as ${user?.email || 'User'}` : 'Not signed in'}</span>
      </div>
      
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginRight: "4px" }}>
        <span>Neural link</span>
        <div style={styles.neuralLinkIndicator} />
      </div>
    </div>
  );
};

export default StatusBar;
