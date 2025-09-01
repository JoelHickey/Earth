import React from 'react';

const StatusBar = ({ isAuthenticated, user }) => {
  const styles = {
    statusBar: {
      background: "#d4d0c8",
      borderTop: "1px solid #ffffff",
      padding: "2px 8px",
      fontSize: "10px",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      fontFamily: "'MS Sans Serif', sans-serif",
      color: "#000000",
      minHeight: "20px",
      width: "100%",
      overflow: "hidden",
      boxSizing: "border-box"
    },
    neuralLinkIndicator: {
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      background: "radial-gradient(circle at 20% 20%, #ffffff 0%, #f0f0f0 15%, #e0e0e0 30%, #c0c0c0 60%, #a0a0a0 100%)",
      border: "1px solid #808080",
      boxShadow: "inset 0.5px 0.5px #ffffff, inset -0.5px -0.5px #606060"
    }
  };

    return (
    <div style={styles.statusBar}>
      <span>{isAuthenticated ? `Signed in as ${user?.email || 'User'}` : 'Not signed in'}</span>
      
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginLeft: "auto" }}>
        <span>Neural link</span>
        <div style={styles.neuralLinkIndicator} />
      </div>
    </div>
  );
};

export default StatusBar;
