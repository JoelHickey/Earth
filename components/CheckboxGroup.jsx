import React from 'react';

const CheckboxGroup = ({ checkboxes, columns = 3 }) => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: "16px"
    },
    row: {
      display: "flex",
      gap: "16px"
    },
    checkboxLabel: {
      display: "flex",
      alignItems: "center",
      gap: "4px",
      fontSize: "8pt",
      fontFamily: "'MS Sans Serif', sans-serif"
    },
    checkbox: {
      width: "13px",
      height: "13px",
      background: "#ffffff",
      cursor: "pointer",
      accentColor: "#000000"
    }
  };

  // Split checkboxes into rows
  const rows = [];
  for (let i = 0; i < checkboxes.length; i += columns) {
    rows.push(checkboxes.slice(i, i + columns));
  }

  return (
    <div style={styles.container}>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} style={styles.row}>
          {row.map(({ name, checked, onChange, label }) => (
            <label key={name} style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                style={styles.checkbox}
              />
              {label}
            </label>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CheckboxGroup;
