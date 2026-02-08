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
      fontSize: "8pt",
      fontFamily: "'MS Sans Serif', sans-serif",
      background: "#ffffff",
      textAlign: "center",
      padding: "1px 2px",
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

