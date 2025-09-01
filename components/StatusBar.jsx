import React from 'react';

const StatusBar = ({ isAuthenticated, user, onSignIn, onSignOut }) => {
  const styles = {
    statusBar: {
      background: "#d4d0c8",
      borderTop: "1px solid #ffffff",
      padding: "2px 8px",
      fontSize: "10px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontFamily: "'MS Sans Serif', Arial, sans-serif"
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

  const handleButtonMouseDown = (e) => {
    e.target.style.borderTop = "2px solid #808080";
    e.target.style.borderLeft = "2px solid #808080";
    e.target.style.borderBottom = "2px solid #ffffff";
    e.target.style.borderRight = "2px solid #ffffff";
  };

  const handleButtonMouseUp = (e) => {
    e.target.style.borderTop = "2px solid #ffffff";
    e.target.style.borderLeft = "2px solid #ffffff";
    e.target.style.borderBottom = "2px solid #808080";
    e.target.style.borderRight = "2px solid #808080";
  };

  return (
    <div style={styles.statusBar}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span>{isAuthenticated ? `Signed in as ${user?.email || 'User'}` : 'Not signed in'}</span>
        {isAuthenticated ? (
          <button
            style={{
              width: "60px",
              height: "18px",
              background: "#d4d0c8",
              borderTop: "2px solid #ffffff",
              borderLeft: "2px solid #ffffff",
              borderBottom: "2px solid #808080",
              borderRight: "2px solid #808080",
              fontSize: "9px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'MS Sans Serif', Arial, sans-serif"
            }}
            onClick={onSignOut}
            onMouseDown={handleButtonMouseDown}
            onMouseUp={handleButtonMouseUp}
          >
            Sign Out
          </button>
        ) : (
          <button
            style={{
              width: "60px",
              height: "18px",
              background: "#d4d0c8",
              borderTop: "2px solid #ffffff",
              borderLeft: "2px solid #ffffff",
              borderBottom: "2px solid #808080",
              borderRight: "2px solid #808080",
              fontSize: "9px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'MS Sans Serif', Arial, sans-serif"
            }}
            onClick={onSignIn}
            onMouseDown={handleButtonMouseDown}
            onMouseUp={handleButtonMouseUp}
          >
            Sign In
          </button>
        )}
      </div>
      
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span>Neural link</span>
        <div style={styles.neuralLinkIndicator} />
      </div>
    </div>
  );
};

export default StatusBar;
