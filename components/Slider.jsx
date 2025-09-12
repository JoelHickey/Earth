import React from 'react';

const Slider = ({ 
  value, 
  onChange, 
  onMouseDown, 
  label, 
  width = "65px",
  gap = "2px",
  caffeineMg = null,
  waterMl = null,
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
      width: width
    },
    sliderContainer: {
      width: "4px",
      height: "200px",
      background: "#808080",
      border: "1px inset #c0c0c0",
      position: "relative",
      margin: "0 auto",
      boxShadow: "inset 1px 1px #808080, inset -1px -1px #ffffff"
    },
    sliderTrack: {
      width: "100%",
      height: "100%",
      position: "relative"
    },
    sliderThumb: {
      width: "20px",
      height: "20px",
      background: "#d4d0c8",
      borderTop: "2px solid #ffffff",
      borderLeft: "2px solid #ffffff",
      borderBottom: "2px solid #808080",
      borderRight: "2px solid #808080",
      position: "absolute",
      left: "-10px",
      cursor: "pointer",
      fontFamily: "'MS Sans Serif', sans-serif"
    },
    input: {
      width: "50px",
      height: "14px",
      fontSize: "8px",
      fontFamily: "'MS Sans Serif', sans-serif",
      border: "2px inset #c0c0c0",
      background: "#ffffff",
      textAlign: "center",
      padding: "1px 2px",
      marginTop: "16px",
      boxShadow: "inset 1px 1px #808080, inset -1px -1px #ffffff",
      boxSizing: "border-box"
    },
    label: {
      fontSize: "8px",
      textAlign: "center",
      marginTop: "4px",
      fontFamily: "'MS Sans Serif', sans-serif",
      whiteSpace: "nowrap",
      width: "100%"
    }
  };

  // Create label with caffeine or water if provided
  let displayLabel = label;
  if (caffeineMg !== null) {
    displayLabel = `${label} (${caffeineMg}mg)`;
  } else if (waterMl !== null) {
    displayLabel = `${label} (${waterMl}ml)`;
  }

  return (
    <div style={{...styles.container, ...style}}>
      <div style={styles.sliderContainer}>
        <div style={styles.sliderTrack}>
          <div
            style={{
              ...styles.sliderThumb,
              top: `${Math.max(0, Math.min(180, (10 - value) * 18))}px`
            }}
            onMouseDown={(e) => onMouseDown(e, onChange, value)}
          />
        </div>
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
      <div style={styles.label}>{displayLabel}</div>
    </div>
  );
};

export default Slider;
