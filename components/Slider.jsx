import React from 'react';

const Slider = ({ 
  value, 
  onChange, 
  onMouseDown, 
  label, 
  width = "65px",
  gap = "2px" 
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
      width: "20px",
      height: "18px",
      fontSize: "10px",
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
      fontSize: "10px",
      textAlign: "center",
      marginTop: "4px",
      fontFamily: "'MS Sans Serif', sans-serif"
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.sliderContainer}>
        <div style={styles.sliderTrack}>
          <div
            style={{
              ...styles.sliderThumb,
              top: `calc(100% - ${(value / 10) * 100}% - 10px)`
            }}
            onMouseDown={(e) => onMouseDown(e, onChange, value)}
          />
        </div>
      </div>
      <input
        type="text"
        value={Math.round(value)}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        style={styles.input}
      />
      <div style={styles.label}>{label}</div>
    </div>
  );
};

export default Slider;
