import React from 'react';

const Knob = ({ 
  label, 
  value, 
  onChange, 
  width = "70px", 
  unit = "", 
  multiplier = 1 
}) => {
  const handleMouseDown = (e) => {
    e.preventDefault();
    const startY = e.clientY;
    const startValue = value;
    
    const handleMouseMove = (e) => {
      const deltaY = startY - e.clientY;
      const newValue = Math.max(0, Math.min(10, startValue + deltaY * 0.1));
      onChange(Math.round(newValue * 10) / 10);
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const displayValue = (value * multiplier).toFixed(unit === "ml" ? 0 : 1);
  const rotation = (value / 10) * 270 - 135; // -135 to 135 degrees

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      gap: "4px",
      width: width,
      fontSize: "9px",
      fontFamily: "'MS Sans Serif', sans-serif"
    }}>
      <div style={{ 
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: "2px"
      }}>
        {label}
      </div>
      
      <div style={{ 
        position: "relative",
        width: "40px",
        height: "40px"
      }}>
        {/* Knob background */}
        <div style={{
          width: "40px",
          height: "40px",
          background: "linear-gradient(135deg, #f0f0f0 0%, #d4d0c8 50%, #c0c0c0 100%)",
          border: "2px outset #c0c0c0",
          borderRadius: "50%",
          position: "relative",
          cursor: "pointer",
          boxShadow: "inset 1px 1px 2px rgba(0,0,0,0.1), 1px 1px 2px rgba(0,0,0,0.3)"
        }}
        onMouseDown={handleMouseDown}
        >
          {/* Indicator line */}
          <div style={{
            position: "absolute",
            top: "4px",
            left: "50%",
            width: "2px",
            height: "12px",
            background: "#000000",
            transform: `translateX(-50%) rotate(${rotation}deg)`,
            transformOrigin: "bottom center",
            borderRadius: "1px"
          }} />
          
          {/* Center dot */}
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "4px",
            height: "4px",
            background: "#000000",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)"
          }} />
        </div>
      </div>
      
      <div style={{ 
        textAlign: "center",
        fontSize: "8px",
        color: "#000000",
        fontWeight: "bold"
      }}>
        {displayValue}{unit}
      </div>
    </div>
  );
};

export default Knob;
