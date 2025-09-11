import React from 'react';

const InputBox = ({ 
  value, 
  onChange, 
  label, 
  width = "65px",
  gap = "2px",
  unit = null,
  multiplier = 1
}) => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: gap,
      width: width
    },
    input: {
      width: "50px",
      height: "18px",
      fontSize: "10px",
      fontFamily: "'MS Sans Serif', sans-serif",
      border: "2px inset #c0c0c0",
      background: "#ffffff",
      textAlign: "center",
      padding: "1px 2px",
      boxShadow: "inset 1px 1px #808080, inset -1px -1px #ffffff",
      boxSizing: "border-box"
    },
    label: {
      fontSize: "10px",
      textAlign: "center",
      marginTop: "4px",
      fontFamily: "'MS Sans Serif', sans-serif",
      whiteSpace: "nowrap",
      width: "100%"
    }
  };

  return (
    <div style={styles.container}>
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

export default InputBox;

