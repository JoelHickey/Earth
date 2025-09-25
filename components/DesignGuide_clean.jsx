import React, { useState } from 'react';

const DesignGuide = () => {
  const [activeSection, setActiveSection] = useState('principles');

  const styles = {
    tabContainer: {
      display: "flex",
      background: "#c0c0c0",
      borderBottom: "1px solid #808080",
      marginBottom: "8px"
    },
    tab: {
      background: "#c0c0c0",
      border: "1px outset #c0c0c0",
      borderBottom: "1px solid #808080",
      padding: "4px 8px",
      fontSize: "8px",
      fontFamily: "'MS Sans Serif', sans-serif",
      cursor: "pointer",
      marginRight: "2px",
      color: "#000000"
    },
    activeTab: {
      background: "#ffffff",
      borderBottom: "1px solid #ffffff"
    },
    principleContainer: {
      marginBottom: "4px"
    }
  };

  const principles = [
    { id: "1", title: "Control" },
    { id: "2", title: "Directness" },
    { id: "3", title: "Consistency" },
    { id: "4", title: "Forgiveness" },
    { id: "5", title: "Feedback" },
    { id: "6", title: "Aesthetics" },
    { id: "7", title: "Simplicity" }
  ];

  const interfaceElements = [
    "Title Bar", "Menu Bar", "Toolbar", "Status Bar", "Buttons",
    "Checkboxes", "Radio Buttons", "Text Fields", "Sliders",
    "Progress Bars", "Windows", "Dialog Boxes", "List Boxes", "Tabs"
  ];

  const navigationSections = [
    { id: 'principles', label: 'Principles' },
    { id: 'elements', label: 'Elements' },
    { id: 'colors', label: 'Colors' },
    { id: 'typography', label: 'Typography' }
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

  const renderContent = () => {
    switch (activeSection) {
      case 'principles':
        return (
          <div>
            {principles.map((principle) => (
              <div key={principle.id} style={styles.principleContainer}>
                <strong>{principle.title}</strong>
              </div>
            ))}
          </div>
        );
      
      case 'elements':
        return (
          <div>
            {interfaceElements.map((element, index) => (
              <div key={index} style={styles.principleContainer}>
                <strong>{element}</strong>
              </div>
            ))}
          </div>
        );
      
      case 'colors':
        return (
          <div>
            {colorPalette.map((color, index) => (
              <div key={index} style={styles.principleContainer}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    backgroundColor: color.value,
                    border: '1px inset #808080'
                  }} />
                  <strong>{color.name}</strong>
                  <span style={{ fontSize: '7px', color: '#666' }}>{color.value}</span>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'typography':
        return (
          <div>
            {typographySpecs.map((spec, index) => (
              <div key={index} style={styles.principleContainer}>
                <strong>{spec.element}:</strong> {spec.font}, {spec.size}
              </div>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div>
      <div style={styles.tabContainer}>
        {navigationSections.map((section) => (
          <button
            key={section.id}
            style={{
              ...styles.tab,
              ...(activeSection === section.id && styles.activeTab)
            }}
            onClick={() => setActiveSection(section.id)}
          >
            {section.label}
          </button>
        ))}
      </div>
      
      <div>
        {renderContent()}
      </div>
    </div>
  );
};

export default DesignGuide;
