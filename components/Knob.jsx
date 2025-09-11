import React from 'react';

const Knob = ({ 
  value, 
  onChange, 
  label, 
  width = "65px",
  gap = "2px",
  unit = null,
  multiplier = 1,
  style = {}
}) => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: gap,
      width: width,
      fontFamily: "'MS Sans Serif', sans-serif"
    },
    knobContainer: {
      width: "28px",
      height: "28px",
      background: "#d4d0c8",
      borderTop: "2px solid #ffffff",
      borderLeft: "2px solid #ffffff",
      borderBottom: "2px solid #808080",
      borderRight: "2px solid #808080",
      borderRadius: "50%",
      position: "relative",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    knobIndicator: {
      width: "3px",
      height: "10px",
      background: "radial-gradient(circle, #808080 0%, #606060 100%)",
      position: "absolute",
      top: "2px",
      left: "50%",
      transformOrigin: "50% 12px",
      transform: `translateX(-50%) rotate(${(value / 10) * 270 - 135}deg)`,
      borderRadius: "1px",
      boxShadow: "inset 0.5px 0.5px 1px rgba(0,0,0,0.3)"
    },
    knobCenter: {
      width: "4px",
      height: "4px",
      background: "radial-gradient(circle, #808080 0%, #606060 100%)",
      borderRadius: "50%",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      boxShadow: "inset 0.5px 0.5px 1px rgba(0,0,0,0.3)"
    },
    input: {
      width: "55px",
      height: "20px",
      fontSize: "11px",
      fontFamily: "'MS Sans Serif', sans-serif",
      border: "2px inset #c0c0c0",
      background: "#ffffff",
      textAlign: "center",
      padding: "2px 3px",
      boxShadow: "inset 1px 1px 2px rgba(0,0,0,0.3), inset -1px -1px 2px rgba(255,255,255,0.8)",
      boxSizing: "border-box",
      color: "#000000",
      fontWeight: "normal"
    },
    label: {
      fontSize: "11px",
      textAlign: "center",
      fontFamily: "'MS Sans Serif', sans-serif",
      whiteSpace: "nowrap",
      width: "100%",
      color: "#000000",
      fontWeight: "normal",
      marginTop: "2px"
    }
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const handleMouseMove = (moveEvent) => {
      const angle = Math.atan2(moveEvent.clientY - centerY, moveEvent.clientX - centerX);
      const degrees = (angle * 180 / Math.PI + 135) % 360;
      const normalizedValue = Math.max(0, Math.min(10, (degrees / 270) * 10));
      onChange(normalizedValue);
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div style={{...styles.container, ...style}}>
      <div 
        style={styles.knobContainer}
        onMouseDown={handleMouseDown}
      >
        <div style={styles.knobIndicator} />
        <div style={styles.knobCenter} />
      </div>
      <input
        type="text"
        value={unit ? `${Math.round(value * multiplier)}${unit}` : Math.round(value)}
        onChange={(e) => {
          if (unit) {
            const numericValue = parseFloat(e.target.value.replace(unit, '')) || 0;
            onChange(numericValue / multiplier);
          } else {
            onChange(parseFloat(e.target.value) || 0);
          }
        }}
        style={styles.input}
      />
      <div style={styles.label}>{label}</div>
    </div>
  );
};

export default Knob;
