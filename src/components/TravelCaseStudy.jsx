import React from 'react';

const TravelCaseStudy = ({ onViewOldFlow, onViewNewFlow, onClose }) => {
  return (
    <div style={{
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 99,
      background: "#ffffff",
      width: "900px",
      maxWidth: "90vw",
      height: "700px",
      maxHeight: "90vh",
      boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
      borderRadius: "10px",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden"
    }}>
      {/* Close Button */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "16px",
          right: "16px",
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          border: "none",
          background: "#e0e0e0",
          color: "#666",
          fontSize: "18px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.2s",
          fontWeight: "300",
          lineHeight: "1",
          zIndex: 100
        }}
        onMouseOver={(e) => e.currentTarget.style.background = "#d0d0d0"}
        onMouseOut={(e) => e.currentTarget.style.background = "#e0e0e0"}
      >
        ✕
      </button>

      {/* Content */}
      <div style={{
        flex: 1,
        overflow: "auto",
        padding: "48px 64px",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', sans-serif",
        WebkitFontSmoothing: "antialiased"
      }}>
        {/* Header */}
        <div style={{ marginBottom: "48px" }}>
          <div style={{
            fontSize: "14px",
            fontWeight: "600",
            color: "#0071e3",
            textTransform: "uppercase",
            letterSpacing: "0.8px",
            marginBottom: "12px"
          }}>
            Case Study · Travel
          </div>
          <h1 style={{
            fontSize: "48px",
            fontWeight: "600",
            letterSpacing: "-0.5px",
            marginBottom: "16px",
            color: "#1d1d1f",
            lineHeight: "1.1"
          }}>
            Streamlining Amendments & Insurance
          </h1>
        </div>

        {/* OKR - Prominent Display */}
        <div style={{
          marginBottom: "48px",
          padding: "32px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "16px",
          textAlign: "center"
        }}>
          <div style={{
            fontSize: "14px",
            fontWeight: "600",
            color: "rgba(255,255,255,0.9)",
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginBottom: "12px"
          }}>
            Objective & Key Result
          </div>
          <h2 style={{
            fontSize: "28px",
            fontWeight: "600",
            color: "#ffffff",
            lineHeight: "1.3",
            margin: "0"
          }}>
            Increase consultant productivity by reducing the steps required to manage bookings
          </h2>
        </div>

        {/* The Challenge */}
        <div style={{ marginBottom: "48px" }}>
          <h2 style={{
            fontSize: "32px",
            fontWeight: "600",
            marginBottom: "16px",
            color: "#1d1d1f"
          }}>
            The Challenge
          </h2>
          <div style={{
            fontSize: "17px",
            lineHeight: "1.6",
            color: "#1d1d1f",
            marginBottom: "24px"
          }}>
            <p style={{ marginBottom: "16px" }}>
              When customers wanted to modify their travel bookings—hotels (change dates, upgrade rooms), rental cars (adjust pickup times, vehicle types), activities (reschedule tours, change group sizes), transfers (update pickup locations, times)—or add travel insurance, they called travel consultants. The existing booking system required consultants to navigate through multiple screens and manual steps to complete even simple requests. This created:
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
              <li style={{ marginBottom: "8px" }}><strong>Low consultant productivity</strong> - 8-12 minutes per amendment or insurance call</li>
              <li style={{ marginBottom: "8px" }}><strong>Multiple system screens</strong> - Consultants navigated 5-7 different screens per task</li>
              <li style={{ marginBottom: "8px" }}><strong>Complex insurance quoting</strong> - Manual calculations and separate insurance system</li>
              <li style={{ marginBottom: "8px" }}><strong>Error-prone process</strong> - Manual data entry led to booking and coverage mistakes</li>
              <li style={{ marginBottom: "8px" }}><strong>Customer frustration</strong> - Long hold times and slow service</li>
              <li style={{ marginBottom: "8px" }}><strong>High call volume</strong> - 40% of calls were simple amendments or insurance adds</li>
            </ul>
          </div>
        </div>

        {/* The Solution */}
        <div style={{ marginBottom: "48px" }}>
          <h2 style={{
            fontSize: "32px",
            fontWeight: "600",
            marginBottom: "16px",
            color: "#1d1d1f"
          }}>
            The Solution
          </h2>
          <div style={{
            fontSize: "17px",
            lineHeight: "1.6",
            color: "#1d1d1f",
            marginBottom: "24px"
          }}>
            <p style={{ marginBottom: "16px" }}>
              I led the design and delivery of a streamlined workflow that reduced the steps consultants needed to complete booking amendments and insurance additions:
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
              <li style={{ marginBottom: "8px" }}><strong>Quick Amend search</strong> - One-click access to customer bookings from any screen</li>
              <li style={{ marginBottom: "8px" }}><strong>Single-page workflow</strong> - All amendment and insurance options visible without navigation</li>
              <li style={{ marginBottom: "8px" }}><strong>Real-time availability</strong> - Instant room options and pricing without system delays</li>
              <li style={{ marginBottom: "8px" }}><strong>Integrated insurance quoting</strong> - Auto-calculated premiums based on booking details</li>
              <li style={{ marginBottom: "8px" }}><strong>Smart defaults</strong> - Auto-populated fields based on existing booking data</li>
              <li style={{ marginBottom: "8px" }}><strong>One-click confirmation</strong> - Complete amendments or add insurance in 2-3 steps instead of 12+</li>
            </ul>
            
            <div style={{
              marginTop: "16px",
              padding: "16px",
              background: "#d4edda",
              borderRadius: "8px",
              border: "1px solid #c3e6cb"
            }}>
              <strong style={{ color: "#155724" }}>Result:</strong>
              <p style={{ margin: "8px 0 0 0", color: "#155724" }}>
                Reduced average handling time from <strong>8-12 minutes to 2-3 minutes</strong> per amendment or insurance call
              </p>
            </div>
          </div>
        </div>

        {/* The Impact - Metrics Cards */}
        <div style={{ marginBottom: "48px" }}>
          <h2 style={{
            fontSize: "32px",
            fontWeight: "600",
            marginBottom: "24px",
            color: "#1d1d1f"
          }}>
            The Impact
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "24px",
            marginBottom: "24px"
          }}>
            <div style={{
              padding: "32px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "12px",
              color: "#ffffff",
              textAlign: "center"
            }}>
              <div style={{
                fontSize: "48px",
                fontWeight: "700",
                marginBottom: "8px"
              }}>
                +67%
              </div>
              <div style={{
                fontSize: "17px",
                fontWeight: "500",
                opacity: 0.95
              }}>
                Efficiency Gain
              </div>
            </div>
            
            <div style={{
              padding: "32px",
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              borderRadius: "12px",
              color: "#ffffff",
              textAlign: "center"
            }}>
              <div style={{
                fontSize: "48px",
                fontWeight: "700",
                marginBottom: "8px"
              }}>
                +67%
              </div>
              <div style={{
                fontSize: "17px",
                fontWeight: "500",
                opacity: 0.95
              }}>
                ROI Increase
              </div>
            </div>
            
            <div style={{
              padding: "32px",
              background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
              borderRadius: "12px",
              color: "#ffffff",
              textAlign: "center"
            }}>
              <div style={{
                fontSize: "48px",
                fontWeight: "700",
                marginBottom: "8px"
              }}>
                +67%
              </div>
              <div style={{
                fontSize: "17px",
                fontWeight: "500",
                opacity: 0.95
              }}>
                CSAT Score
              </div>
            </div>
          </div>
        </div>

        {/* Try the Flows - CTA Buttons */}
        <div style={{
          marginTop: "48px",
          padding: "40px",
          background: "#f5f5f7",
          borderRadius: "16px",
          textAlign: "center"
        }}>
          <h2 style={{
            fontSize: "28px",
            fontWeight: "600",
            marginBottom: "16px",
            color: "#1d1d1f"
          }}>
            Experience the Difference
          </h2>
          <p style={{
            fontSize: "17px",
            lineHeight: "1.5",
            color: "#6e6e73",
            marginBottom: "32px",
            maxWidth: "500px",
            margin: "0 auto 32px"
          }}>
            Experience both workflows to see how we reduced consultant steps and increased productivity
          </p>
          
          <div style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap"
          }}>
            <button
              onClick={onViewOldFlow}
              style={{
                padding: "16px 32px",
                fontSize: "17px",
                fontWeight: "500",
                color: "#ffffff",
                background: "#6e6e73",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.2s",
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif"
              }}
              onMouseOver={(e) => e.currentTarget.style.background = "#515154"}
              onMouseOut={(e) => e.currentTarget.style.background = "#6e6e73"}
            >
              📞 Try Old Flow (Call Center)
            </button>
            
            <button
              onClick={onViewNewFlow}
              style={{
                padding: "16px 32px",
                fontSize: "17px",
                fontWeight: "500",
                color: "#ffffff",
                background: "#0071e3",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.2s",
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif"
              }}
              onMouseOver={(e) => e.currentTarget.style.background = "#0077ed"}
              onMouseOut={(e) => e.currentTarget.style.background = "#0071e3"}
            >
              ✨ Try New Flow (Self-Service)
            </button>
          </div>
        </div>

        {/* My Role */}
        <div style={{
          marginTop: "48px",
          paddingTop: "32px",
          borderTop: "1px solid #d2d2d7"
        }}>
          <h3 style={{
            fontSize: "24px",
            fontWeight: "600",
            marginBottom: "16px",
            color: "#1d1d1f"
          }}>
            My Role
          </h3>
          <p style={{
            fontSize: "17px",
            lineHeight: "1.6",
            color: "#1d1d1f"
          }}>
            As <strong>Product & Program Manager</strong>, I led the end-to-end delivery of this feature, from identifying the customer pain point through stakeholder interviews, to defining requirements, coordinating with engineering and design teams, and measuring post-launch success metrics.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TravelCaseStudy;

