import React from 'react';

const Slider = ({ 
  value, 
  onChange, 
  onMouseDown, 
  label, 
  width = "55px",
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
      height: "150px",
      background: "#808080",
      borderTop: "1px solid #808080",
      borderLeft: "1px solid #808080",
      borderBottom: "1px solid #ffffff",
      borderRight: "1px solid #ffffff",
      position: "relative",
      margin: "0 auto",
      boxShadow: "none"
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
      width: "40px",
      height: "16px",
      fontSize: "8pt",
      fontFamily: "'MS Sans Serif', sans-serif",
      background: "#ffffff",
      textAlign: "center",
      padding: "2px",
      marginTop: "16px",
      borderTop: "2px solid #808080",
      borderLeft: "2px solid #808080",
      borderBottom: "2px solid #ffffff",
      borderRight: "2px solid #ffffff",
      boxSizing: "border-box"
    },
    label: {
      fontSize: "8pt",
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
              top: `${Math.max(0, Math.min(130, (10 - value) * 13))}px`
            }}
            onMouseDown={(e) => onMouseDown(e, onChange, value)}
          />
        </div>
      </div>
      <input
        type="text"
        value={unit ? `${Math.round(value * multiplier)} ${unit}` : Math.round(value)}
        onChange={(e) => {
          if (unit) {
            const numericValue = parseFloat(e.target.value.replace(` ${unit}`, '')) || 0;
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
