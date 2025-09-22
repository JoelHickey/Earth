import React from 'react';

const DesignGuide = () => {
  const styles = {
    section: {
      marginBottom: "8px"
    },
    item: {
      marginBottom: "4px"
    },
    colorItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: "4px"
    },
    colorSwatch: {
      width: '16px',
      height: '16px',
      border: '1px inset #808080'
    }
  };

  const principles = [
    "Control",
    "Directness", 
    "Consistency",
    "Forgiveness",
    "Feedback",
    "Aesthetics",
    "Simplicity"
  ];

  const interfaceElements = [
    "Title Bar", "Menu Bar", "Toolbar", "Status Bar", "Buttons",
    "Checkboxes", "Radio Buttons", "Text Fields", "Sliders",
    "Progress Bars", "Windows", "Dialog Boxes", "List Boxes", "Tabs"
  ];

  const colorPalette = [
    { name: "Background", value: "#d4d0c8" },
    { name: "Light Grey", value: "#c0c0c0" },
    { name: "Dark Grey", value: "#808080" },
    { name: "White", value: "#ffffff" },
    { name: "Black", value: "#000000" },
    { name: "Windows Blue", value: "#000080" }
  ];

  const typographySpecs = [
    { element: "Body Text", font: "MS Sans Serif", size: "8px" },
    { element: "Headings", font: "MS Sans Serif", size: "10px" },
    { element: "Title Bar", font: "MS Sans Serif", size: "8px" },
    { element: "Buttons", font: "MS Sans Serif", size: "8px" }
  ];

  return (
    <div>
      <div style={styles.section}>
        <h3 style={{ margin: "0 0 6px 0", fontSize: "10px" }}>User-Centered Design Principles</h3>
        {principles.map((principle, index) => (
          <div key={index} style={styles.item}>
            <strong>{principle}</strong>
          </div>
        ))}
      </div>

      <div style={styles.section}>
        <h3 style={{ margin: "0 0 6px 0", fontSize: "10px" }}>Interface Elements</h3>
        {interfaceElements.map((element, index) => (
          <div key={index} style={styles.item}>
            <strong>{element}</strong>
          </div>
        ))}
      </div>

      <div style={styles.section}>
        <h3 style={{ margin: "0 0 6px 0", fontSize: "10px" }}>Color Palette</h3>
        {colorPalette.map((color, index) => (
          <div key={index} style={styles.colorItem}>
            <div style={{
              ...styles.colorSwatch,
              backgroundColor: color.value
            }} />
            <strong>{color.name}</strong>
            <span style={{ fontSize: '7px', color: '#666' }}>{color.value}</span>
          </div>
        ))}
      </div>

      <div style={styles.section}>
        <h3 style={{ margin: "0 0 6px 0", fontSize: "10px" }}>Typography</h3>
        {typographySpecs.map((spec, index) => (
          <div key={index} style={styles.item}>
            <strong>{spec.element}:</strong> {spec.font}, {spec.size}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignGuide;
