import React from 'react';

const Toolbar = ({ activeView, setActiveView, outputValue }) => {
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
      width: "36px",
      height: "28px",
      background: "#d4d0c8",
      border: "2px outset #c0c0c0",
      fontSize: "10px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'MS Sans Serif', Arial, sans-serif",
      boxShadow: "inset 1px 1px #ffffff, inset -1px -1px #808080"
    },
    activeButton: {
      border: "2px inset #c0c0c0",
      boxShadow: "inset 1px 1px #808080, inset -1px -1px #ffffff"
    },
    separator: {
      width: "1px",
      height: "20px",
      background: "#808080",
      marginLeft: "8px"
    },
    outputBar: {
      flex: 1,
      height: "24px",
      background: "#ffffff",
      border: "2px inset #c0c0c0",
      display: "flex",
      alignItems: "center",
      padding: "0 8px",
      fontSize: "10px",
      fontFamily: "'MS Sans Serif', Arial, sans-serif",
      marginLeft: "8px"
    }
  };

  const handleButtonMouseDown = (e) => {
    if (e.target.tagName === 'BUTTON') {
      e.target.style.border = "2px inset #c0c0c0";
      e.target.style.boxShadow = "inset 1px 1px #808080, inset -1px -1px #ffffff";
    }
  };

  const handleButtonMouseUp = (e) => {
    if (e.target.tagName === 'BUTTON') {
      e.target.style.border = "2px outset #c0c0c0";
      e.target.style.boxShadow = "inset 1px 1px #ffffff, inset -1px -1px #808080";
    }
  };

  const viewButtons = [
    { id: 'inputs', icon: '/Plug.ico', alt: 'Plug' },
    { id: 'emotions', icon: '/Volume Controls.ico', alt: 'Levels' },
    { id: 'environment', icon: '/Tree.ico', alt: 'Tree' },
    { id: 'timeline', icon: '/Notepad.ico', alt: 'Notepad' }
  ];

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
          <img src={icon} alt={alt} style={{ width: "16px", height: "16px" }} />
        </button>
      ))}
      
      <div style={styles.separator} />
      
      <div style={{ display: "flex", alignItems: "center", gap: "2px", flex: 1, marginLeft: "8px" }}>
        <span style={{ 
          fontSize: "10px", 
          fontFamily: "'MS Sans Serif', Arial, sans-serif",
          color: "#000000"
        }}>
          Output:
        </span>
        <div style={styles.outputBar}>
          {Math.round(outputValue)}/10
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
