import React, { useState } from 'react';
import Header from './components/Header';
import Knob from './components/Knob';
import Slider from './components/Slider';
import { useSliderDrag } from './hooks/useSliderDrag';
import StatusBar from './components/StatusBar';
function App() {
  const handleSliderMouseDown = useSliderDrag();

  const [showOverlays, setShowOverlays] = useState(false);
  const [showDesignSystem, setShowDesignSystem] = useState(false);
  const [activeTab, setActiveTab] = useState('design');
  const [activeSubTab, setActiveSubTab] = useState('foundation');

  const [sliderValues, setSliderValues] = useState({
    sleepQuality: 5,
    foodLevel: 5,
    caffeineLevel: 5,
    waterLevel: 5,
    walkLevel: 5,
    alcoholLevel: 0,
    sugarLevel: 5,
    happiness: 5,
    anxiety: 5,
    energy: 5,
    stress: 5,
    sadness: 5,
    anger: 5,
    irritability: 5,
    dread: 5
  });

  const updateSlider = (key, value) => {
    setSliderValues(prev => ({ ...prev, [key]: value }));
  };

  // Calculate health metrics
  const bloodSugar = 85 + (sliderValues.foodLevel * 2) + (sliderValues.sugarLevel * 3) - (sliderValues.walkLevel * 1.5) - (sliderValues.waterLevel * 0.5);
  const cortisolLevel = 12 + (sliderValues.stress * 2) + (sliderValues.anxiety * 1.5) + (sliderValues.caffeineLevel * 1.2) - (sliderValues.sleepQuality * 1.8) - (sliderValues.walkLevel * 1.2);
  const outputValue = "5am";

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      background: "#008080",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "11px",
      position: "relative"
    }}>
      {/* Design System Button */}
      <button
        onClick={() => setShowDesignSystem(!showDesignSystem)}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          background: showDesignSystem ? "#c0c0c0" : "#d4d0c8",
          border: "2px outset #c0c0c0",
          padding: "4px 8px",
          fontSize: "11px",
          fontFamily: "'MS Sans Serif', sans-serif",
          cursor: "pointer",
          zIndex: 1000
        }}
      >
        {showDesignSystem ? "Close Guide" : "Design System"}
      </button>


      {/* Design System Status Indicator */}
      {showOverlays && (
        <div style={{
          position: "absolute",
          top: "60px",
          right: "20px",
          background: "#ffff00", // Bright yellow background
          border: "2px solid #000000",
          padding: "8px 12px",
          fontSize: "10px",
          fontFamily: "'MS Sans Serif', sans-serif",
          fontWeight: "bold",
          color: "#000000",
          zIndex: 1000,
          boxShadow: "2px 2px 4px rgba(0,0,0,0.3)"
        }}>
          🎨 DESIGN SYSTEM ACTIVE
          <br />
          <span style={{ fontSize: "9px", fontWeight: "normal" }}>
            • Green = Padding (11px)
            <br />
            • Blue = Borders (2px)
            <br />
            • Magenta = Gaps (8px)
          </span>
        </div>
      )}

      {/* Combined Design System Panel with Windows 95 Tabs */}
      {showDesignSystem && (
        <div style={{
          position: "absolute",
          top: "60px",
          right: "20px",
          width: "450px",
          maxHeight: "80vh",
      background: "#d4d0c8",
      borderTop: "2px solid #ffffff",
      borderLeft: "2px solid #ffffff", 
      borderBottom: "2px solid #808080",
      borderRight: "2px solid #808080",
      fontFamily: "'MS Sans Serif', sans-serif",
      display: "flex",
      flexDirection: "column",
      padding: "0",
          zIndex: 1000,
          boxShadow: "2px 2px 4px rgba(0,0,0,0.3)"
        }}>
          {/* Title Bar */}
          <div style={{
            background: "linear-gradient(90deg, #000080 0%, #1084d0 100%)",
            color: "#ffffff",
            padding: "2px 4px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "12px",
            fontWeight: "bold",
            borderBottom: "1px solid #808080",
            height: "19px"
          }}>
            <span>🎨 Design System</span>
            <button
              onClick={() => setShowDesignSystem(false)}
              style={{
                width: "20px",
                height: "16px",
      background: "#d4d0c8",
                borderTop: "1px solid #ffffff",
                borderLeft: "1px solid #ffffff",
                borderBottom: "1px solid #808080",
                borderRight: "1px solid #808080",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "10px",
                fontFamily: "'MS Sans Serif', sans-serif",
                color: "#000000",
                padding: "0",
                lineHeight: "1",
                fontWeight: "normal"
              }}
            >
              ✕
            </button>
          </div>

                {/* Windows 95 Style Tabs */}
                <div style={{
                  display: "flex",
                  background: "#c0c0c0",
                  borderBottom: "1px solid #808080"
                }}>
                  <button
                    onClick={() => setActiveTab('design')}
                    style={{
                      background: activeTab === 'design' ? "#d4d0c8" : "#c0c0c0",
                      border: "1px outset #c0c0c0",
                      borderBottom: activeTab === 'design' ? "1px solid #d4d0c8" : "1px solid #808080",
                      padding: "4px 12px",
                      fontSize: "10px",
                      fontFamily: "'MS Sans Serif', sans-serif",
                      cursor: "pointer",
                      marginRight: "2px"
                    }}
                  >
                    Design Guide
                  </button>
                  <button
                    onClick={() => setActiveTab('dev')}
                    style={{
                      background: activeTab === 'dev' ? "#d4d0c8" : "#c0c0c0",
                      border: "1px outset #c0c0c0",
                      borderBottom: activeTab === 'dev' ? "1px solid #d4d0c8" : "1px solid #808080",
                      padding: "4px 12px",
                      fontSize: "10px",
                      fontFamily: "'MS Sans Serif', sans-serif",
                      cursor: "pointer"
                    }}
                  >
                    Developer Specs
                  </button>
                </div>

                {/* Design System Categories */}
                {activeTab === 'design' && (
                  <div style={{
                    display: "flex",
                    gap: "16px",
                    padding: "8px 11px",
                    background: "#c0c0c0",
                    borderBottom: "1px solid #808080",
                    fontSize: "11px",
                    fontFamily: "'MS Sans Serif', sans-serif",
                    fontWeight: "bold"
                  }}>
                    <div 
                      onClick={() => setActiveSubTab('foundation')}
                      style={{
                        cursor: "pointer",
                        color: activeSubTab === 'foundation' ? "#000080" : "#000000",
                        textDecoration: activeSubTab === 'foundation' ? "underline" : "none"
                      }}
                    >
                      🎨 Foundation
                    </div>
                    <div 
                      onClick={() => setActiveSubTab('components')}
                      style={{
                        cursor: "pointer",
                        color: activeSubTab === 'components' ? "#000080" : "#000000",
                        textDecoration: activeSubTab === 'components' ? "underline" : "none"
                      }}
                    >
                      🧩 Components
                    </div>
                    <div 
                      onClick={() => setActiveSubTab('patterns')}
                      style={{
                        cursor: "pointer",
                        color: activeSubTab === 'patterns' ? "#000080" : "#000000",
                        textDecoration: activeSubTab === 'patterns' ? "underline" : "none"
                      }}
                    >
                      📐 Patterns
                    </div>
                    <div 
                      onClick={() => setActiveSubTab('guidelines')}
                      style={{
                        cursor: "pointer",
                        color: activeSubTab === 'guidelines' ? "#000080" : "#000000",
                        textDecoration: activeSubTab === 'guidelines' ? "underline" : "none"
                      }}
                    >
                      📋 Guidelines
                    </div>
                  </div>
                )}

          {/* Tab Content */}
          <div style={{
      flex: 1,
            padding: "11px",
            fontSize: "10px",
            overflowY: "auto",
            background: "#d4d0c8"
          }}>
            
            {/* Design Guide Tab */}
            {activeTab === 'design' && (
              <>
                {/* Foundation Sub-Tab */}
                {activeSubTab === 'foundation' && (
                  <>
                    {/* Layout Principles */}
                    <h4 style={{ margin: "0 0 11px 0", fontSize: "11px", fontWeight: "bold" }}>Layout Principles</h4>
                    <div style={{ marginBottom: "11px" }}>
                      
                      {/* Spacing */}
                      <div style={{ marginBottom: "10px" }}>
                        <div style={{ 
                          background: "#d4d0c8", 
                          border: "1px solid #808080", 
                          padding: "11px", 
                          fontSize: "9px",
                          minHeight: "60px",
                          position: "relative"
                        }}>
                          <div style={{ 
                            position: "absolute", 
                            top: "-6px", 
                            left: "8px", 
                            background: "#d4d0c8", 
                            padding: "0 4px",
                            fontSize: "8px",
                            fontWeight: "normal"
                          }}>Spacing</div>
                          <div style={{ marginBottom: "5px" }}>
                            <strong>Padding:</strong> 11px standard container padding
                          </div>
                          <div style={{ marginBottom: "5px" }}>
                            <strong>Gaps:</strong> 7px between related elements
                          </div>
                          <div style={{ marginBottom: "5px" }}>
                            <strong>Borders:</strong> 2px outset/inset for 3D effect
                          </div>
                          <div>
                            <strong>Alignment:</strong> Left-aligned text, centered buttons
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Design Tokens */}
                    <h4 style={{ margin: "0 0 11px 0", fontSize: "11px", fontWeight: "bold" }}>Design Tokens</h4>
                <div style={{ marginBottom: "11px" }}>
                  
                  {/* Colors */}
                  <div style={{ marginBottom: "10px" }}>
                    <div style={{ 
                      background: "#d4d0c8", 
                      border: "1px solid #808080", 
                      padding: "11px", 
                      fontSize: "9px",
                      minHeight: "60px",
                      position: "relative"
                    }}>
                      <div style={{ 
                        position: "absolute", 
                        top: "-6px", 
                        left: "8px", 
                        background: "#d4d0c8", 
                        padding: "0 4px",
                        fontSize: "8px",
                        fontWeight: "normal"
                      }}>Colors</div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                          <div style={{ width: "16px", height: "16px", background: "#d4d0c8", border: "1px solid #000" }}></div>
                          <span>#d4d0c8</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                          <div style={{ width: "16px", height: "16px", background: "#c0c0c0", border: "1px solid #000" }}></div>
                          <span>#c0c0c0</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                          <div style={{ width: "16px", height: "16px", background: "#008080", border: "1px solid #000" }}></div>
                          <span>#008080</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                          <div style={{ width: "16px", height: "16px", background: "#808080", border: "1px solid #000" }}></div>
                          <span>#808080</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Typography */}
                  <div style={{ marginBottom: "10px" }}>
                    <div style={{ 
                      background: "#d4d0c8", 
                      border: "1px solid #808080", 
                      padding: "11px", 
                      fontSize: "9px",
                      minHeight: "60px",
                      position: "relative"
                    }}>
                      <div style={{ 
                        position: "absolute", 
                        top: "-6px", 
                        left: "8px", 
                        background: "#d4d0c8", 
                        padding: "0 4px",
                        fontSize: "8px",
                        fontWeight: "normal"
                      }}>Typography</div>
                      <div style={{ fontSize: "12px", fontWeight: "bold", marginBottom: "5px" }}>Heading (12px Bold)</div>
                      <div style={{ fontSize: "11px", marginBottom: "5px" }}>Body Text (11px Regular)</div>
                      <div style={{ fontSize: "10px", marginBottom: "5px" }}>Small Text (10px Regular)</div>
                      <div style={{ fontSize: "9px" }}>Caption (9px Regular)</div>
                    </div>
                  </div>

                  {/* Spacing */}
                  <div style={{ marginBottom: "10px" }}>
                    <div style={{ 
                      background: "#d4d0c8", 
                      border: "1px solid #808080", 
                      padding: "11px", 
                      fontSize: "9px",
                      minHeight: "60px",
                      position: "relative"
                    }}>
                      <div style={{ 
                        position: "absolute", 
                        top: "-6px", 
                        left: "8px", 
                        background: "#d4d0c8", 
                        padding: "0 4px",
                        fontSize: "8px",
                        fontWeight: "normal"
                      }}>Spacing</div>
                      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "5px" }}>
                        <button
                          onClick={() => setShowOverlays(!showOverlays)}
                          style={{
                            background: showOverlays ? "#c0c0c0" : "#d4d0c8",
                            border: "1px outset #c0c0c0",
                            padding: "2px 6px",
                            fontSize: "9px",
                            fontFamily: "'MS Sans Serif', sans-serif",
                            cursor: "pointer"
                          }}
                        >
                          {showOverlays ? "Hide Overlays" : "Show Overlays"}
                        </button>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "5px" }}>
                        <div style={{ width: "5px", height: "5px", background: "#ff00ff" }}></div>
                        <span>5px - Small gap</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "5px" }}>
                        <div style={{ width: "7px", height: "5px", background: "#ff00ff" }}></div>
                        <span>7px - Medium gap</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                        <div style={{ width: "11px", height: "5px", background: "#00ff00" }}></div>
                        <span>11px - Standard padding</span>
                      </div>
                    </div>
                  </div>
                </div>
                  </>
                )}

                {/* Components Sub-Tab */}
                {activeSubTab === 'components' && (
                  <>
                    <h4 style={{ margin: "0 0 11px 0", fontSize: "11px", fontWeight: "bold" }}>Components (Molecules)</h4>
                    <div style={{ marginBottom: "11px" }}>
                      
                      {/* Knob Component */}
                      <div style={{ marginBottom: "10px" }}>
                        <div style={{ 
                          background: "#d4d0c8", 
                          border: "1px solid #808080", 
                          padding: "11px", 
                          fontSize: "9px",
                          minHeight: "60px",
                          position: "relative"
                        }}>
                          <div style={{ 
                            position: "absolute", 
                            top: "-6px", 
                            left: "8px", 
                            background: "#d4d0c8", 
                            padding: "0 4px",
                            fontSize: "8px",
                            fontWeight: "normal"
                          }}>Knob Component</div>
                          <div style={{ 
                            background: "#f8f8f8", 
      padding: "4px",
                            fontSize: "9px",
                            border: "1px inset #c0c0c0",
      display: "flex",
                            alignItems: "center",
                            gap: "7px"
                          }}>
                            <div style={{ 
                              width: "20px", 
                              height: "20px", 
                              background: "#d4d0c8", 
                              border: "2px outset #c0c0c0",
                              borderRadius: "50%",
                              position: "relative"
                            }}>
                              <div style={{
                                position: "absolute",
                                top: "2px",
                                left: "50%",
                                width: "2px",
                                height: "8px",
                                background: "#000000",
                                transform: "translateX(-50%)"
                              }}></div>
                            </div>
                            <span>Rotary control</span>
                          </div>
                        </div>
                      </div>

                      {/* Slider Component */}
                      <div style={{ marginBottom: "10px" }}>
                        <div style={{ 
                          background: "#d4d0c8", 
                          border: "1px solid #808080", 
                          padding: "11px", 
                          fontSize: "9px",
                          minHeight: "60px",
                          position: "relative"
                        }}>
                          <div style={{ 
                            position: "absolute", 
                            top: "-6px", 
                            left: "8px", 
                            background: "#d4d0c8", 
                            padding: "0 4px",
                            fontSize: "8px",
                            fontWeight: "normal"
                          }}>Slider Component</div>
                          <div style={{ 
                            background: "#f8f8f8", 
                            padding: "4px", 
                            fontSize: "9px",
                            border: "1px inset #c0c0c0",
      display: "flex",
                            alignItems: "center",
                            gap: "7px"
                          }}>
                            <div style={{ 
                              width: "4px", 
                              height: "30px", 
                              background: "#c0c0c0", 
                              border: "1px inset #808080",
                              position: "relative"
                            }}>
                              <div style={{ 
                                width: "8px", 
                                height: "8px", 
                                background: "#d4d0c8", 
                                border: "1px outset #c0c0c0",
                                position: "absolute",
                                top: "50%",
                                left: "-2px",
                                transform: "translateY(-50%)"
                              }}></div>
                            </div>
                            <span>Vertical slider control</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Patterns Sub-Tab */}
                {activeSubTab === 'patterns' && (
                  <>
                    {/* Pages */}
                    <h4 style={{ margin: "0 0 11px 0", fontSize: "11px", fontWeight: "bold" }}>Pages/Screens</h4>
                    <div style={{ marginBottom: "11px" }}>
                      
                      {/* Application Pages */}
                      <div style={{ marginBottom: "10px" }}>
    <div style={{ 
                          background: "#d4d0c8", 
                          border: "1px solid #808080", 
                          padding: "11px", 
                          fontSize: "9px",
                          minHeight: "60px",
                          position: "relative"
                        }}>
                          <div style={{ 
                            position: "absolute", 
                            top: "-6px", 
                            left: "8px", 
                            background: "#d4d0c8", 
                            padding: "0 4px",
                            fontSize: "8px",
                            fontWeight: "normal"
                          }}>Application Pages</div>
                          <div style={{ marginBottom: "5px" }}>
                            <strong>Main Interface:</strong> Earth window with controls
                          </div>
                          <div style={{ marginBottom: "5px" }}>
                            <strong>Design Guide:</strong> Design system documentation
                          </div>
                          <div>
                            <strong>Developer Specs:</strong> Technical documentation
                          </div>
                        </div>
                      </div>
                    </div>

                    <h4 style={{ margin: "0 0 11px 0", fontSize: "11px", fontWeight: "bold" }}>Layout Patterns</h4>
                    <div style={{ marginBottom: "11px" }}>
                      
                      {/* Layout Templates */}
                      <div style={{ marginBottom: "10px" }}>
                        <div style={{ 
                          background: "#d4d0c8", 
                          border: "1px solid #808080", 
                          padding: "11px", 
                          fontSize: "9px",
                          minHeight: "60px",
                          position: "relative"
                        }}>
                          <div style={{ 
                            position: "absolute", 
                            top: "-6px", 
                            left: "8px", 
                            background: "#d4d0c8", 
                            padding: "0 4px",
                            fontSize: "8px",
                            fontWeight: "normal"
                          }}>Layout</div>
                          <div style={{ marginBottom: "5px" }}>
                            <strong>Main Window:</strong> 820px × fit-content
    </div>
                          <div style={{ marginBottom: "5px" }}>
                            <strong>Design System:</strong> 450px × 80vh
                          </div>
                          <div>
                            <strong>Desktop:</strong> 100vw × 100vh
                          </div>
                        </div>
                      </div>

                      {/* Content Templates */}
                      <div style={{ marginBottom: "10px" }}>
                        <div style={{ 
                          background: "#d4d0c8", 
                          border: "1px solid #808080", 
                          padding: "11px", 
                          fontSize: "9px",
                          minHeight: "60px",
                          position: "relative"
                        }}>
                          <div style={{ 
                            position: "absolute", 
                            top: "-6px", 
                            left: "8px", 
                            background: "#d4d0c8", 
                            padding: "0 4px",
                            fontSize: "8px",
                            fontWeight: "normal"
                          }}>Content</div>
                          <div style={{ marginBottom: "5px" }}>
                            <strong>Control Group:</strong> Border + padding + gap
          </div>
                          <div style={{ marginBottom: "5px" }}>
                            <strong>Group Box:</strong> Label + content area
                          </div>
                          <div>
                            <strong>Tab Panel:</strong> Tabs + content area
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Templates */}
                    <h4 style={{ margin: "0 0 11px 0", fontSize: "11px", fontWeight: "bold" }}>Templates</h4>
                    <div style={{ marginBottom: "11px" }}>
                      
                      {/* Layout Templates */}
                      <div style={{ marginBottom: "10px" }}>
                        <div style={{ 
                          background: "#d4d0c8", 
                          border: "1px solid #808080", 
                          padding: "11px", 
                          fontSize: "9px",
                          minHeight: "60px",
                          position: "relative"
                        }}>
                          <div style={{ 
                            position: "absolute", 
                            top: "-6px", 
                            left: "8px", 
                            background: "#d4d0c8", 
                            padding: "0 4px",
                            fontSize: "8px",
                            fontWeight: "normal"
                          }}>Layout</div>
                          <div style={{ marginBottom: "5px" }}>
                            <strong>Main Window:</strong> 820px × fit-content
          </div>
                          <div style={{ marginBottom: "5px" }}>
                            <strong>Design System:</strong> 450px × 80vh
                          </div>
                          <div>
                            <strong>Desktop:</strong> 100vw × 100vh
                          </div>
                        </div>
                      </div>

                      {/* Content Templates */}
                      <div style={{ marginBottom: "10px" }}>
                        <div style={{ 
                          background: "#d4d0c8", 
                          border: "1px solid #808080", 
                          padding: "11px", 
                          fontSize: "9px",
                          minHeight: "60px",
                          position: "relative"
                        }}>
                          <div style={{ 
                            position: "absolute", 
                            top: "-6px", 
                            left: "8px", 
                            background: "#d4d0c8", 
                            padding: "0 4px",
                            fontSize: "8px",
                            fontWeight: "normal"
                          }}>Content</div>
                          <div style={{ marginBottom: "5px" }}>
                            <strong>Control Group:</strong> Border + padding + gap
          </div>
                          <div style={{ marginBottom: "5px" }}>
                            <strong>Group Box:</strong> Label + content area
                          </div>
                          <div>
                            <strong>Tab Panel:</strong> Tabs + content area
                          </div>
                        </div>
                      </div>
                    </div>

                    <h4 style={{ margin: "0 0 11px 0", fontSize: "11px", fontWeight: "bold" }}>Organisms</h4>
                    <div style={{ marginBottom: "11px" }}>
                      
                      {/* Control Panels */}
                      <div style={{ marginBottom: "10px" }}>
                        <div style={{ 
                          background: "#d4d0c8", 
                          border: "1px solid #808080", 
                          padding: "11px", 
                          fontSize: "9px",
                          minHeight: "60px",
                          position: "relative"
                        }}>
                          <div style={{ 
                            position: "absolute", 
                            top: "-6px", 
                            left: "8px", 
                            background: "#d4d0c8", 
                            padding: "0 4px",
                            fontSize: "8px",
                            fontWeight: "normal"
                          }}>Control Panels</div>
                          <div style={{ marginBottom: "5px" }}>
                            <strong>Physical Health Panel:</strong> Collection of knobs
          </div>
                          <div style={{ marginBottom: "5px" }}>
                            <strong>Emotional Health Panel:</strong> Collection of sliders
                          </div>
                          <div>
                            <strong>Status Bar Panel:</strong> Information display
                          </div>
                        </div>
                      </div>

                      {/* Window Structure */}
                      <div style={{ marginBottom: "10px" }}>
                        <div style={{ 
                          background: "#d4d0c8", 
                          border: "1px solid #808080", 
                          padding: "11px", 
                          fontSize: "9px",
                          minHeight: "60px",
                          position: "relative"
                        }}>
                          <div style={{ 
                            position: "absolute", 
                            top: "-6px", 
                            left: "8px", 
                            background: "#d4d0c8", 
                            padding: "0 4px",
                            fontSize: "8px",
                            fontWeight: "normal"
                          }}>Window Structure</div>
                          <div style={{ marginBottom: "5px" }}>
                            <strong>Title Bar:</strong> Header with close button
                          </div>
                          <div style={{ marginBottom: "5px" }}>
                            <strong>Content Area:</strong> Main application body
                          </div>
                          <div>
                            <strong>Design System:</strong> Modal overlay panel
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Guidelines Sub-Tab */}
                {activeSubTab === 'guidelines' && (
                  <>
                    <h4 style={{ margin: "0 0 11px 0", fontSize: "11px", fontWeight: "bold" }}>Design Tokens (Atoms)</h4>
                    <div style={{ marginBottom: "11px" }}>
                      
                      {/* Colors */}
                      <div style={{ marginBottom: "10px" }}>
                        <div style={{ 
                          background: "#d4d0c8", 
                          border: "1px solid #808080", 
                          padding: "11px", 
                          fontSize: "9px",
                          minHeight: "60px",
                          position: "relative"
                        }}>
                          <div style={{ 
                            position: "absolute", 
                            top: "-6px", 
                            left: "8px", 
                            background: "#d4d0c8", 
                            padding: "0 4px",
                            fontSize: "8px",
                            fontWeight: "normal"
                          }}>Colors</div>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                              <div style={{ width: "16px", height: "16px", background: "#d4d0c8", border: "1px solid #000" }}></div>
                              <span>#d4d0c8</span>
          </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                              <div style={{ width: "16px", height: "16px", background: "#c0c0c0", border: "1px solid #000" }}></div>
                              <span>#c0c0c0</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                              <div style={{ width: "16px", height: "16px", background: "#008080", border: "1px solid #000" }}></div>
                              <span>#008080</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                              <div style={{ width: "16px", height: "16px", background: "#808080", border: "1px solid #000" }}></div>
                              <span>#808080</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Typography */}
                      <div style={{ marginBottom: "10px" }}>
                        <div style={{ 
                          background: "#d4d0c8", 
                          border: "1px solid #808080", 
                          padding: "11px", 
                          fontSize: "9px",
                          minHeight: "60px",
                          position: "relative"
                        }}>
                          <div style={{ 
                            position: "absolute", 
                            top: "-6px", 
                            left: "8px", 
                            background: "#d4d0c8", 
                            padding: "0 4px",
                            fontSize: "8px",
                            fontWeight: "normal"
                          }}>Typography</div>
                          <div style={{ fontSize: "12px", fontWeight: "bold", marginBottom: "5px" }}>Heading (12px Bold)</div>
                          <div style={{ fontSize: "11px", marginBottom: "5px" }}>Body Text (11px Regular)</div>
                          <div style={{ fontSize: "10px", marginBottom: "5px" }}>Small Text (10px Regular)</div>
                          <div style={{ fontSize: "9px" }}>Caption (9px Regular)</div>
        </div>
      </div>
          
                      {/* Spacing */}
                      <div style={{ marginBottom: "10px" }}>
                        <div style={{ 
                          background: "#d4d0c8", 
                          border: "1px solid #808080", 
                          padding: "11px", 
                          fontSize: "9px",
                          minHeight: "60px",
                          position: "relative"
                        }}>
                          <div style={{ 
                            position: "absolute", 
                            top: "-6px", 
                            left: "8px", 
                            background: "#d4d0c8", 
                            padding: "0 4px",
                            fontSize: "8px",
                            fontWeight: "normal"
                          }}>Spacing</div>
                          <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "5px" }}>
                            <button
                              onClick={() => setShowOverlays(!showOverlays)}
                              style={{
                                background: showOverlays ? "#c0c0c0" : "#d4d0c8",
                                border: "1px outset #c0c0c0",
                                padding: "2px 6px",
                                fontSize: "9px",
                                fontFamily: "'MS Sans Serif', sans-serif",
                                cursor: "pointer"
                              }}
                            >
                              {showOverlays ? "Hide Overlays" : "Show Overlays"}
                            </button>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "5px" }}>
                            <div style={{ width: "5px", height: "5px", background: "#ff00ff" }}></div>
                            <span>5px - Small gap</span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "5px" }}>
                            <div style={{ width: "7px", height: "5px", background: "#ff00ff" }}></div>
                            <span>7px - Medium gap</span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                            <div style={{ width: "11px", height: "5px", background: "#00ff00" }}></div>
                            <span>11px - Standard padding</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

              </>
            )}

            {/* Developer Specs Tab */}
            {activeTab === 'dev' && (
              <>
                {/* Design Tokens */}
                <div style={{ marginBottom: "11px" }}>
                  <h4 style={{ margin: "0 0 6px 0", fontSize: "11px", fontWeight: "bold" }}>Design Tokens (Atoms)</h4>
                  <div style={{ fontSize: "9px", color: "#666", marginBottom: "10px" }}>
                    <p style={{ margin: "0 0 4px 0" }}>Complete token system for consistent implementation across all components.</p>
                  </div>

                  {/* Colors */}
                  <div style={{ marginBottom: "10px" }}>
                    <div style={{ 
                      background: "#d4d0c8", 
                      border: "1px solid #808080", 
                      padding: "11px", 
                      fontFamily: "monospace",
                      fontSize: "8px",
                      minHeight: "60px",
                      position: "relative"
                    }}>
                      <div style={{ 
                        position: "absolute", 
                        top: "-6px", 
                        left: "8px", 
                        background: "#d4d0c8", 
                        padding: "0 4px",
                        fontSize: "8px",
                        fontWeight: "normal",
                        fontFamily: "monospace"
                      }}>Colors</div>
                      <div>--bg-primary: #d4d0c8;</div>
                      <div>--bg-secondary: #c0c0c0;</div>
                      <div>--bg-accent: #008080;</div>
                      <div>--text-primary: #000000;</div>
                      <div>--border-light: #ffffff;</div>
                      <div>--border-dark: #808080;</div>
        </div>
      </div>
          
                  {/* Typography */}
                  <div style={{ marginBottom: "10px" }}>
                    <div style={{ 
                      background: "#d4d0c8", 
                      border: "1px solid #808080", 
                      padding: "11px", 
                      fontFamily: "monospace",
                      fontSize: "8px",
                      minHeight: "60px",
                      position: "relative"
                    }}>
                      <div style={{ 
                        position: "absolute", 
                        top: "-6px", 
                        left: "8px", 
                        background: "#d4d0c8", 
                        padding: "0 4px",
                        fontSize: "8px",
                        fontWeight: "normal",
                        fontFamily: "monospace"
                      }}>Typography</div>
                      <div>--font-family: 'MS Sans Serif', sans-serif;</div>
                      <div>--font-size-sm: 9px;</div>
                      <div>--font-size-md: 10px;</div>
                      <div>--font-size-lg: 11px;</div>
                      <div>--font-size-xl: 12px;</div>
                    </div>
                  </div>

                  {/* Spacing */}
                  <div style={{ marginBottom: "10px" }}>
                    <div style={{ 
                      background: "#d4d0c8", 
                      border: "1px solid #808080", 
                      padding: "11px", 
                      fontFamily: "monospace",
                      fontSize: "8px",
                      minHeight: "60px",
                      position: "relative"
                    }}>
                      <div style={{ 
                        position: "absolute", 
                        top: "-6px", 
                        left: "8px", 
                        background: "#d4d0c8", 
                        padding: "0 4px",
                        fontSize: "8px",
                        fontWeight: "normal",
                        fontFamily: "monospace"
                      }}>Spacing</div>
                      <div>--spacing-xs: 4px;</div>
                      <div>--spacing-sm: 8px;</div>
                      <div>--spacing-md: 11px;</div>
                      <div>--spacing-lg: 16px;</div>
                    </div>
                  </div>
                </div>

                {/* Components */}
                <div style={{ marginBottom: "11px" }}>
                  <h4 style={{ margin: "0 0 6px 0", fontSize: "11px", fontWeight: "bold" }}>Components</h4>
                  
                  {/* Knob Component */}
                  <div style={{ marginBottom: "10px", border: "1px solid #c0c0c0", padding: "6px" }}>
                    <div style={{ fontWeight: "bold", marginBottom: "5px" }}>Knob Component</div>
                    <div style={{ fontSize: "8px", marginBottom: "5px" }}>
                      <strong>Props:</strong> label, value, onChange, width, unit, multiplier
                    </div>
                    <div style={{ 
                      background: "#f8f8f8", 
                      padding: "4px", 
                      fontFamily: "monospace",
                      fontSize: "7px",
                      border: "1px inset #c0c0c0"
                    }}>
                      <div>&lt;Knob</div>
                      <div>&nbsp;&nbsp;label="Sleep Quality"</div>
                      <div>&nbsp;&nbsp;value={sliderValues.sleepQuality}</div>
                      <div>&nbsp;&nbsp;onChange={(value) => updateSlider('sleepQuality', value)}</div>
                      <div>&nbsp;&nbsp;width="70px"</div>
                      <div>&nbsp;&nbsp;unit="hours"</div>
                      <div>&nbsp;&nbsp;multiplier={1}</div>
                      <div>/&gt;</div>
                    </div>
                  </div>

                  {/* Slider Component */}
                  <div style={{ marginBottom: "10px", border: "1px solid #c0c0c0", padding: "6px" }}>
                    <div style={{ fontWeight: "bold", marginBottom: "5px" }}>Slider Component</div>
                    <div style={{ fontSize: "8px", marginBottom: "5px" }}>
                      <strong>Props:</strong> label, value, onChange, onMouseDown
                    </div>
                    <div style={{ 
                      background: "#f8f8f8", 
                      padding: "4px", 
                      fontFamily: "monospace",
                      fontSize: "7px",
                      border: "1px inset #c0c0c0"
                    }}>
                      <div>&lt;Slider</div>
                      <div>&nbsp;&nbsp;label="Happiness"</div>
                      <div>&nbsp;&nbsp;value={sliderValues.happiness}</div>
                      <div>&nbsp;&nbsp;onChange={(value) => updateSlider('happiness', value)}</div>
                      <div>&nbsp;&nbsp;onMouseDown={(e) => handleSliderMouseDown(e, callback, value)}</div>
                      <div>/&gt;</div>
                    </div>
                  </div>
                </div>

                {/* Guidelines */}
                <div style={{ marginBottom: "11px" }}>
                  <div style={{ 
                    background: "#d4d0c8", 
                    border: "1px solid #808080", 
                    padding: "11px", 
                    fontSize: "9px",
                    minHeight: "60px",
                    position: "relative"
                  }}>
                    <div style={{ 
                      position: "absolute", 
                      top: "-6px", 
                      left: "8px", 
                      background: "#d4d0c8", 
                      padding: "0 4px",
fontSize: "8px",
                        fontWeight: "normal"
                    }}>Guidelines</div>
                    <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "9px" }}>
                    <li>Use CSS variables for all design decisions</li>
                    <li>Follow Windows 95 visual standards</li>
                    <li>Maintain consistent spacing and typography</li>
                    <li>Test accessibility and keyboard navigation</li>
                    <li>Document component props and usage</li>
                    </ul>
                  </div>
                </div>

                {/* CSS Specifications */}
                <div style={{ marginBottom: "11px" }}>
                  <div style={{ 
                    background: "#d4d0c8", 
                    border: "1px solid #808080", 
                    padding: "11px", 
                    fontFamily: "monospace",
                    fontSize: "8px",
                    minHeight: "60px",
                    position: "relative"
                  }}>
                    <div style={{ 
                      position: "absolute", 
                      top: "-6px", 
                      left: "8px", 
                      background: "#d4d0c8", 
                      padding: "0 4px",
                      fontSize: "8px",
                      fontWeight: "bold",
                      fontFamily: "monospace"
                    }}>CSS Specifications</div>
                    <div><strong>Container Styling:</strong></div>
                    <div>background: #d4d0c8;</div>
                    <div>border: 2px inset #c0c0c0;</div>
                    <div>padding: 11px;</div>
                    <div>gap: 8px;</div>
                    <div style={{ marginTop: "6px" }}><strong>3D Button Effect:</strong></div>
                    <div>border: 2px outset #c0c0c0;</div>
                    <div>box-shadow: 1px 1px 2px rgba(0,0,0,0.3);</div>
                    <div style={{ marginTop: "6px" }}><strong>Typography:</strong></div>
                    <div>font-family: 'MS Sans Serif', sans-serif;</div>
                    <div>font-size: 11px;</div>
                    <div>color: #000000;</div>
                  </div>
                </div>

                {/* Implementation Notes */}
                <div>
                  <div style={{ 
                    background: "#d4d0c8", 
                    border: "1px solid #808080", 
                    padding: "11px", 
                    fontSize: "8px",
                    minHeight: "60px",
                    position: "relative"
                  }}>
                    <div style={{ 
                      position: "absolute", 
                      top: "-6px", 
                      left: "8px", 
                      background: "#d4d0c8", 
                      padding: "0 4px",
                      fontSize: "8px",
                      fontWeight: "bold"
                    }}>Implementation Notes</div>
                    <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "8px" }}>
                    <li>Use CSS-in-JS for component styling</li>
                    <li>All measurements in pixels for precision</li>
                    <li>Maintain 3D border effects for Windows 95 aesthetic</li>
                    <li>Use flexbox for responsive layouts</li>
                    <li>Implement hover states for interactive elements</li>
                    <li>Ensure proper contrast ratios for accessibility</li>
                    <li>Test on different screen sizes</li>
                    <li>Follow Windows 95 interaction patterns</li>
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Status Bar */}
          <div style={{
            background: "#c0c0c0",
            borderTop: "1px solid #808080",
            borderLeft: "1px solid #808080",
            borderBottom: "1px solid #ffffff",
            borderRight: "1px solid #ffffff",
            padding: "2px 4px",
            fontSize: "9px",
            color: "#000000"
          }}>
                  {activeTab === 'design' ? 'Design Guide Active • Ready' : 'Developer Specs • Ready for Implementation'}
          </div>
        </div>
      )}

      <div style={{
      width: "820px",
      height: "fit-content",
      background: "#d4d0c8",
      borderTop: "2px solid #ffffff",
      borderLeft: "2px solid #ffffff", 
      borderBottom: "2px solid #808080",
      borderRight: "2px solid #808080",
      fontFamily: "'MS Sans Serif', sans-serif",
      display: "flex",
      flexDirection: "column",
      padding: "0",
      boxShadow: "2px 2px 4px rgba(0,0,0,0.3)"
      }}>
        <Header />
        
        
        <div style={{ 
      flex: 1,
      display: "flex",
      flexDirection: "column",
          gap: "7px",
          padding: "11px"
        }}>
    <div style={{ 
      display: "flex", 
              gap: "7px", 
              flexWrap: "wrap",
              border: "2px inset #c0c0c0",
              padding: "11px",
              background: "#c0c0c0",
              position: "relative"
            }}>
            {/* Overlays - only show when toggle is on */}
            {showOverlays && (
              <>
                {/* Gap indicator for physical health container - positioned between first two knobs */}
                <div style={{
                  position: "absolute",
                  top: "50%",
                  left: "calc(11px + 70px)", // After first knob (70px width) + new padding
                  width: "8px",
                  height: "20px",
                  background: "#ff00ff", // Magenta fill for gap between knobs
                  opacity: 0.4,
                  pointerEvents: "none",
                  transform: "translateY(-50%)"
                }} />
                {/* Border overlay */}
                <div style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  border: "1px solid #0000ff", // Blue border to show container border
                  pointerEvents: "none"
                }} />
                {/* Padding fill - show the actual padding areas */}
                <div style={{
                  position: "absolute",
                  top: "0px",
                  left: "0px",
                  right: "0px",
                  height: "11px",
                  background: "#00ff00", // Bright green fill for top padding
                  opacity: 0.7,
                  pointerEvents: "none"
                }} />
                <div style={{
                  position: "absolute",
                  top: "0px",
                  left: "0px",
                  width: "11px",
                  bottom: "0px",
                  background: "#00ff00", // Bright green fill for left padding
                  opacity: 0.7,
                  pointerEvents: "none"
                }} />
                <div style={{
                  position: "absolute",
                  top: "0px",
                  right: "0px",
                  width: "11px",
                  bottom: "0px",
                  background: "#00ff00", // Bright green fill for right padding
                  opacity: 0.7,
                  pointerEvents: "none"
                }} />
                <div style={{
                  position: "absolute",
                  left: "0px",
                  right: "0px",
                  bottom: "0px",
                  height: "11px",
                  background: "#00ff00", // Bright green fill for bottom padding
                  opacity: 0.7,
                  pointerEvents: "none"
                }} />
              </>
            )}
            <Knob
              label="Sleep Quality"
              value={sliderValues.sleepQuality}
              onChange={(value) => updateSlider('sleepQuality', value)}
              width="70px"
            />
            <Knob
              label="Food Level"
              value={sliderValues.foodLevel}
              onChange={(value) => updateSlider('foodLevel', value)}
              width="70px"
            />
            <Knob
              label="Caffeine"
              value={sliderValues.caffeineLevel}
              onChange={(value) => updateSlider('caffeineLevel', value)}
              width="70px"
              unit="shots"
              multiplier={1}
            />
            <Knob
              label="Water"
              value={sliderValues.waterLevel}
              onChange={(value) => updateSlider('waterLevel', value)}
              width="70px"
              unit="ml"
              multiplier={100}
            />
            <Knob
              label="Walk"
              value={sliderValues.walkLevel}
              onChange={(value) => updateSlider('walkLevel', value)}
              width="70px"
              unit="min"
              multiplier={10}
            />
            <Knob
              label="Alcohol"
              value={sliderValues.alcoholLevel}
              onChange={(value) => updateSlider('alcoholLevel', value)}
              width="70px"
              unit="drinks"
              multiplier={1}
            />
            <Knob
              label="Sugar"
              value={sliderValues.sugarLevel}
              onChange={(value) => updateSlider('sugarLevel', value)}
              width="70px"
              unit="g"
              multiplier={5}
      />
    </div>

    <div style={{ 
      display: "flex",
            gap: "7px", 
            flexWrap: "wrap",
            border: "2px inset #c0c0c0",
            padding: "11px",
            background: "#c0c0c0",
            position: "relative"
            }}>
            {/* Overlays - only show when toggle is on */}
            {showOverlays && (
              <>
                {/* Gap indicator for emotional health container - positioned between first two sliders */}
                <div style={{
                  position: "absolute",
                  top: "50%",
                  left: "calc(11px + 65px)", // After first slider (65px width) + new padding
                  width: "8px",
                  height: "20px",
                  background: "#ff00ff", // Magenta fill for gap between sliders
                  opacity: 0.4,
                  pointerEvents: "none",
                  transform: "translateY(-50%)"
                }} />
                {/* Border overlay */}
                <div style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  border: "1px solid #0000ff", // Blue border to show container border
                  pointerEvents: "none"
                }} />
                {/* Padding fill - show the actual padding areas */}
                <div style={{
                  position: "absolute",
                  top: "0px",
                  left: "0px",
                  right: "0px",
                  height: "11px",
                  background: "#00ff00", // Bright green fill for top padding
                  opacity: 0.7,
                  pointerEvents: "none"
                }} />
                <div style={{
                  position: "absolute",
                  top: "0px",
                  left: "0px",
                  width: "11px",
                  bottom: "0px",
                  background: "#00ff00", // Bright green fill for left padding
                  opacity: 0.7,
                  pointerEvents: "none"
                }} />
                <div style={{
                  position: "absolute",
                  top: "0px",
                  right: "0px",
                  width: "11px",
                  bottom: "0px",
                  background: "#00ff00", // Bright green fill for right padding
                  opacity: 0.7,
                  pointerEvents: "none"
                }} />
                <div style={{
                  position: "absolute",
                  left: "0px",
                  right: "0px",
                  bottom: "0px",
                  height: "11px",
                  background: "#00ff00", // Bright green fill for bottom padding
                  opacity: 0.7,
                  pointerEvents: "none"
                }} />
              </>
            )}
            <Slider
              label="Happiness"
              value={sliderValues.happiness}
              onChange={(value) => updateSlider('happiness', value)}
              onMouseDown={(e) => handleSliderMouseDown(e, (value) => updateSlider('happiness', value), sliderValues.happiness)}
              min={0}
              max={10}
            />
            <Slider
              label="Anxiety"
              value={sliderValues.anxiety}
              onChange={(value) => updateSlider('anxiety', value)}
              onMouseDown={(e) => handleSliderMouseDown(e, (value) => updateSlider('anxiety', value), sliderValues.anxiety)}
              min={0}
              max={10}
            />
            <Slider
              label="Energy"
              value={sliderValues.energy}
              onChange={(value) => updateSlider('energy', value)}
              onMouseDown={(e) => handleSliderMouseDown(e, (value) => updateSlider('energy', value), sliderValues.energy)}
              min={0}
              max={10}
            />
            <Slider
              label="Stress"
              value={sliderValues.stress}
              onChange={(value) => updateSlider('stress', value)}
              onMouseDown={(e) => handleSliderMouseDown(e, (value) => updateSlider('stress', value), sliderValues.stress)}
              min={0}
              max={10}
            />
            <Slider
              label="Sadness"
              value={sliderValues.sadness}
              onChange={(value) => updateSlider('sadness', value)}
              onMouseDown={(e) => handleSliderMouseDown(e, (value) => updateSlider('sadness', value), sliderValues.sadness)}
              min={0}
              max={10}
            />
            <Slider
              label="Anger"
              value={sliderValues.anger}
              onChange={(value) => updateSlider('anger', value)}
              onMouseDown={(e) => handleSliderMouseDown(e, (value) => updateSlider('anger', value), sliderValues.anger)}
              min={0}
              max={10}
            />
            <Slider
              label="Irritability"
              value={sliderValues.irritability}
              onChange={(value) => updateSlider('irritability', value)}
              onMouseDown={(e) => handleSliderMouseDown(e, (value) => updateSlider('irritability', value), sliderValues.irritability)}
              min={0}
              max={10}
            />
            <Slider
              label="Dread"
              value={sliderValues.dread}
              onChange={(value) => updateSlider('dread', value)}
              onMouseDown={(e) => handleSliderMouseDown(e, (value) => updateSlider('dread', value), sliderValues.dread)}
              min={0}
              max={10}
            />
      </div>
          
      <StatusBar 
            bloodSugar={bloodSugar}
        caffeineLevel={sliderValues.caffeineLevel}
        sliderValues={sliderValues}
      />
    </div>
      </div>
    </div>
  );
}

export default App;
