import React, { useState } from 'react';

const AmendmentsCaseStudy = ({ onViewOldFlow, onViewNewFlow, onClose }) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  return (
    <div style={{
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 99,
      background: "#ffffff",
      width: "1000px",
      maxWidth: "95vw",
      height: "700px",
      maxHeight: "90vh",
      boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
      borderRadius: "10px",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', sans-serif"
    }}>
      {/* Close Button */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          border: "none",
          background: "#f5f5f7",
          color: "#86868b",
          fontSize: "16px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.15s",
          fontWeight: "300",
          lineHeight: "1",
          zIndex: 100
        }}
        onMouseOver={(e) => e.currentTarget.style.background = "#e8e8ed"}
        onMouseOut={(e) => e.currentTarget.style.background = "#f5f5f7"}
      >
        ✕
      </button>

      {/* Content */}
      <div style={{
        flex: 1,
        overflow: "auto",
        padding: "24px 32px",
        WebkitFontSmoothing: "antialiased"
      }}>
        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{
            fontSize: "32px",
            fontWeight: "700",
            letterSpacing: "-0.5px",
            marginBottom: "20px",
            color: "#1d1d1f",
            lineHeight: "1.1"
          }}>
            Travel Amendments
          </h1>
        </div>

        {/* Impact Metrics */}
        <div style={{ marginBottom: "28px" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "10px",
            marginBottom: "24px"
          }}>
            <div style={{
              padding: "14px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "10px",
              color: "#ffffff",
              textAlign: "center"
            }}>
              <div style={{
                fontSize: "22px",
                fontWeight: "700",
                marginBottom: "6px"
              }}>
                +67%
              </div>
              <div style={{
                fontSize: "11px",
                fontWeight: "500",
                opacity: 0.95
              }}>
                Productivity Gain
              </div>
            </div>
            
            <div style={{
              padding: "14px",
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              borderRadius: "10px",
              color: "#ffffff",
              textAlign: "center"
            }}>
              <div style={{
                fontSize: "22px",
                fontWeight: "700",
                marginBottom: "6px"
              }}>
                -75%
              </div>
              <div style={{
                fontSize: "11px",
                fontWeight: "500",
                opacity: 0.95
              }}>
                Amendment Time
              </div>
            </div>
            
            <div style={{
              padding: "14px",
              background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
              borderRadius: "10px",
              color: "#ffffff",
              textAlign: "center"
            }}>
              <div style={{
                fontSize: "22px",
                fontWeight: "700",
                marginBottom: "6px"
              }}>
                89%
              </div>
              <div style={{
                fontSize: "11px",
                fontWeight: "500",
                opacity: 0.95
              }}>
                CSAT Score
              </div>
            </div>
          </div>
        </div>

        {/* OKR */}
        <div style={{
          marginBottom: "28px",
          paddingBottom: "24px",
          borderBottom: "1px solid #e0e0e0"
        }}>
          <div style={{
            fontSize: "13px",
            fontWeight: "600",
            color: "#6e6e73",
            textTransform: "uppercase",
            letterSpacing: "0.8px",
            marginBottom: "8px"
          }}>
            Objective & Key Result
          </div>
          <p style={{
            fontSize: "14px",
            fontWeight: "500",
            color: "#1d1d1f",
            lineHeight: "1.4",
            margin: "0 0 16px 0"
          }}>
            Increase consultant productivity by reducing the steps required to manage bookings
          </p>
          
          <button
            onClick={onViewOldFlow}
            style={{
              padding: "6px 14px",
              fontSize: "13px",
              fontWeight: "500",
              color: "#ffffff",
              background: "#0071e3",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "all 0.15s"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "#0077ed";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "#0071e3";
            }}
          >
            View Interactive Demo →
          </button>
        </div>

        {/* The Problem */}
        <div style={{ marginBottom: "28px" }}>
          <h2 style={{
            fontSize: "14px",
            fontWeight: "600",
            marginBottom: "16px",
            color: "#1d1d1f"
          }}>
            The Problem
          </h2>
          <div style={{
            fontSize: "11px",
            lineHeight: "1.6",
            color: "#1d1d1f",
            marginBottom: "24px"
          }}>
            <p style={{ marginBottom: "16px" }}>
              When customers wanted to modify their travel bookings (hotels, rental cars, activities, transfers), they called Flight Centre consultants. The existing booking system required consultants to navigate through multiple screens and manual steps to complete even simple amendments. This created:
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
              <li style={{ marginBottom: "8px" }}><strong>Low consultant productivity & stress</strong> - 8-12 minutes per amendment call</li>
              <li style={{ marginBottom: "8px" }}><strong>Multiple system screens</strong> - Consultants navigated 5-7 different screens per task</li>
              <li style={{ marginBottom: "8px" }}><strong>No dependency checking</strong> - Amendments that impacted other booking components were not considered</li>
              <li style={{ marginBottom: "8px" }}><strong>Error-prone process</strong> - Manual data entry led to booking mistakes</li>
              <li style={{ marginBottom: "8px" }}><strong>Reduced consultant confidence</strong> - Lack of trust in the system's reliability</li>
              <li style={{ marginBottom: "8px" }}><strong>Customer frustration</strong> - Long hold times and slow service</li>
            </ul>
          </div>
        </div>

        {/* Discovery & Research */}
        <div style={{ marginBottom: "28px" }}>
          <h2 style={{
            fontSize: "14px",
            fontWeight: "600",
            marginBottom: "16px",
            color: "#1d1d1f"
          }}>
            Discovery & Research
          </h2>
          <div style={{
            fontSize: "11px",
            lineHeight: "1.6",
            color: "#1d1d1f",
            marginBottom: "24px"
          }}>
            <p style={{ marginBottom: "16px" }}>
              To understand the depth of the problem, I ran interactive workshops with over 60 consultants globally and conducted comprehensive research:
            </p>
            
              <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
                <li style={{ marginBottom: "12px" }}><strong>Global workshops</strong> - Ran interactive workshops with 60+ consultants across regions</li>
                <li style={{ marginBottom: "12px" }}><strong>Consultant shadowing</strong> - Observed consultants in real-time to identify pain points</li>
                <li style={{ marginBottom: "12px" }}><strong>Workflow mapping</strong> - Task sequencing of the manual steps required</li>
                <li style={{ marginBottom: "12px" }}><strong>Pain point analysis</strong> - Identified where consultants lost time and made errors</li>
                <li style={{ marginBottom: "12px" }}><strong>System audit</strong> - Analyzed technical constraints and integration points</li>
                <li style={{ marginBottom: "0" }}><strong>Competitive analysis</strong> - Researched how other travel platforms handled amendments</li>
              </ul>

              <p style={{ marginBottom: "0", marginTop: "16px" }}>
                <span
                  onClick={() => setIsGalleryOpen(!isGalleryOpen)}
                  style={{
                    fontSize: "14px",
                    color: "#0071e3",
                    cursor: "pointer",
                    textDecoration: "none",
                    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.textDecoration = "underline"}
                  onMouseOut={(e) => e.currentTarget.style.textDecoration = "none"}
                >
                  {isGalleryOpen ? "Hide discovery artifacts ↑" : "View discovery artifacts (4 photos) →"}
                </span>
              </p>

            {isGalleryOpen && (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "10px",
                marginTop: "16px",
                marginBottom: "16px"
              }}>
                  <div style={{
                    background: "#ffffff",
                    border: "1px solid #d2d2d7",
                    borderRadius: "10px",
                    overflow: "hidden",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                  }}>
                    <img 
                      src="/images/amendments/image1.png" 
                      alt="Amendments discovery artifact 1"
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block"
                      }}
                    />
                  </div>

                  <div style={{
                    background: "#ffffff",
                    border: "1px solid #d2d2d7",
                    borderRadius: "10px",
                    overflow: "hidden",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                  }}>
                    <img 
                      src="/images/amendments/image2.png" 
                      alt="Amendments discovery artifact 2"
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block"
                      }}
                    />
                  </div>

                  <div style={{
                    background: "#ffffff",
                    border: "1px solid #d2d2d7",
                    borderRadius: "10px",
                    overflow: "hidden",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                  }}>
                    <img 
                      src="/images/amendments/image3.png" 
                      alt="Amendments discovery artifact 3"
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block"
                      }}
                    />
                  </div>

                  <div style={{
                    background: "#ffffff",
                    border: "1px solid #d2d2d7",
                    borderRadius: "10px",
                    overflow: "hidden",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                  }}>
                    <img 
                      src="/images/amendments/image4.png" 
                      alt="Amendments discovery artifact 4"
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block"
                      }}
                    />
                  </div>
                </div>
              )}
          </div>
        </div>

        {/* The Solution */}
        <div style={{ marginBottom: "28px" }}>
          <h2 style={{
            fontSize: "14px",
            fontWeight: "600",
            marginBottom: "16px",
            color: "#1d1d1f"
          }}>
            The Solution
          </h2>
          <div style={{
            fontSize: "11px",
            lineHeight: "1.6",
            color: "#1d1d1f",
            marginBottom: "24px"
          }}>
            <p style={{ marginBottom: "16px" }}>
              I led the design and delivery of a streamlined three-page workflow that reduced the steps consultants needed to complete booking changes.
            </p>
            
            <div style={{
              marginTop: "16px",
              marginBottom: "22px",
              padding: "16px",
              background: "#d4edda",
              borderRadius: "10px",
              border: "1px solid #c3e6cb"
            }}>
              <strong style={{ color: "#155724" }}>Result:</strong>
              <p style={{ margin: "8px 0 0 0", color: "#155724" }}>
                Reduced average handling time from <strong>8-12 minutes to 2-3 minutes</strong> per amendment call
              </p>
            </div>
          </div>
        </div>

        {/* Workflow Efficiency Measurements */}
        <div style={{ marginBottom: "28px" }}>
          <h2 style={{
            fontSize: "14px",
            fontWeight: "600",
            marginBottom: "16px",
            color: "#1d1d1f"
          }}>
            Workflow Efficiency Measurements
          </h2>
          <p style={{
            fontSize: "11px",
            lineHeight: "1.6",
            color: "#6e6e73",
            marginBottom: "24px"
          }}>
            Technical breakdown of workflow improvements between old and new flows
          </p>
          
          <div style={{
            padding: "24px",
            background: "#f8f9fa",
            borderRadius: "10px",
            border: "1px solid #e0e0e0"
          }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "20px"
            }}>
              {/* Screens */}
              <div style={{
                background: "#ffffff",
                padding: "14px",
                borderRadius: "10px",
                border: "1px solid #e0e0e0",
                textAlign: "center"
              }}>
                <div style={{ fontSize: "13px", color: "#6e6e73", marginBottom: "8px", fontWeight: "500" }}>
                  Screens
                </div>
                <div style={{ fontSize: "26px", fontWeight: "600", color: "#1d1d1f", marginBottom: "4px" }}>
                  67%
                </div>
                <div style={{ fontSize: "13px", color: "#34c759", fontWeight: "600" }}>
                  ↓ fewer
                </div>
                <div style={{ fontSize: "12px", color: "#6e6e73", marginTop: "8px" }}>
                  9 → 3 screens
                </div>
              </div>

              {/* Loading Time */}
              <div style={{
                background: "#ffffff",
                padding: "14px",
                borderRadius: "10px",
                border: "1px solid #e0e0e0",
                textAlign: "center"
              }}>
                <div style={{ fontSize: "13px", color: "#6e6e73", marginBottom: "8px", fontWeight: "500" }}>
                  Loading Time
                </div>
                <div style={{ fontSize: "26px", fontWeight: "600", color: "#1d1d1f", marginBottom: "4px" }}>
                  69%
                </div>
                <div style={{ fontSize: "13px", color: "#34c759", fontWeight: "600" }}>
                  ↓ faster
                </div>
                <div style={{ fontSize: "12px", color: "#6e6e73", marginTop: "8px" }}>
                  30s → 9s
                </div>
              </div>

              {/* User Actions */}
              <div style={{
                background: "#ffffff",
                padding: "14px",
                borderRadius: "10px",
                border: "1px solid #e0e0e0",
                textAlign: "center"
              }}>
                <div style={{ fontSize: "13px", color: "#6e6e73", marginBottom: "8px", fontWeight: "500" }}>
                  User Actions
                </div>
                <div style={{ fontSize: "26px", fontWeight: "600", color: "#1d1d1f", marginBottom: "4px" }}>
                  55%
                </div>
                <div style={{ fontSize: "13px", color: "#34c759", fontWeight: "600" }}>
                  ↓ fewer
                </div>
                <div style={{ fontSize: "12px", color: "#6e6e73", marginTop: "8px" }}>
                  18+ → 8-10 clicks
                </div>
              </div>
            </div>

            <div style={{
              textAlign: "center",
              fontSize: "11px",
              color: "#6e6e73",
              fontStyle: "italic",
              marginTop: "20px"
            }}>
              Try the interactive demo to experience both workflows
            </div>
          </div>
        </div>

        {/* Delivery */}
        <div style={{ marginBottom: "28px" }}>
          <h2 style={{
            fontSize: "14px",
            fontWeight: "600",
            marginBottom: "16px",
            color: "#1d1d1f"
          }}>
            Delivery
          </h2>
          <div style={{
            fontSize: "11px",
            lineHeight: "1.6",
            color: "#1d1d1f",
            marginBottom: "24px"
          }}>
            <p style={{ marginBottom: "16px" }}>
              Delivering this solution required coordinating across multiple teams and regions while ensuring consultants remained productive during the transition:
            </p>
            
            <div style={{
              padding: "24px",
              background: "#f5f5f7",
              borderRadius: "10px",
              marginBottom: "24px"
            }}>
              <h3 style={{
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "16px",
                color: "#1d1d1f"
              }}>
                Delivery Approach
              </h3>
              <ul style={{ paddingLeft: "24px", marginBottom: "0" }}>
                <li style={{ marginBottom: "12px" }}><strong>Global development partnership</strong> - Partnered with Codegen (Sri Lankan software team) to implement changes within HELiO platform</li>
                <li style={{ marginBottom: "12px" }}><strong>Cross-functional coordination</strong> - Led engineering, design, operations, and training teams across multiple time zones</li>
                <li style={{ marginBottom: "12px" }}><strong>Phased rollout</strong> - Piloted with select markets before global deployment to validate and refine</li>
                <li style={{ marginBottom: "12px" }}><strong>Global training program</strong> - Developed and delivered training materials for 60+ consultants across regions</li>
                <li style={{ marginBottom: "12px" }}><strong>Change management</strong> - Created support documentation and established feedback channels for continuous improvement</li>
                <li style={{ marginBottom: "0" }}><strong>Success metrics tracking</strong> - Implemented monitoring to measure adoption, efficiency gains, and consultant satisfaction</li>
              </ul>
            </div>

            <div style={{
              padding: "14px",
              background: "#e8f5e9",
              border: "1px solid #4caf50",
              borderRadius: "8px"
            }}>
              <p style={{ margin: "0", color: "#2e7d32", fontSize: "14px" }}>
                ✓ <strong>Delivered on time with zero downtime</strong> - Smooth transition from old to new workflow without disrupting daily operations
              </p>
            </div>
          </div>
        </div>

        {/* Post-Release Metrics */}
        <div style={{ marginBottom: "28px" }}>
          <h2 style={{
            fontSize: "14px",
            fontWeight: "600",
            marginBottom: "16px",
            color: "#1d1d1f"
          }}>
            Post-Release Validation
          </h2>
          <p style={{
            fontSize: "11px",
            lineHeight: "1.6",
            color: "#6e6e73",
            marginBottom: "24px"
          }}>
            Used FullStory to track real-world usage and validate impact after global rollout
          </p>

          <div style={{
            padding: "24px",
            background: "#f8f9fa",
            borderRadius: "10px",
            border: "1px solid #e0e0e0"
          }}>
            <h3 style={{
              fontSize: "16px",
              fontWeight: "600",
              marginBottom: "20px",
              color: "#1d1d1f"
            }}>
              FullStory Analytics (First 90 Days)
            </h3>

            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              marginBottom: "24px"
            }}>
              {/* Adoption Rate */}
              <div style={{
                background: "#ffffff",
                padding: "14px",
                borderRadius: "10px",
                border: "1px solid #e0e0e0"
              }}>
                <div style={{ fontSize: "13px", color: "#6e6e73", marginBottom: "8px", fontWeight: "600" }}>
                  Adoption Rate
                </div>
                <div style={{ fontSize: "26px", fontWeight: "700", color: "#34c759", marginBottom: "8px" }}>
                  94%
                </div>
                <div style={{ fontSize: "11px", color: "#1d1d1f", lineHeight: "1.5" }}>
                  of consultants actively using new flow within 30 days
                </div>
              </div>

              {/* Task Completion */}
              <div style={{
                background: "#ffffff",
                padding: "14px",
                borderRadius: "10px",
                border: "1px solid #e0e0e0"
              }}>
                <div style={{ fontSize: "13px", color: "#6e6e73", marginBottom: "8px", fontWeight: "600" }}>
                  Task Completion Rate
                </div>
                <div style={{ fontSize: "26px", fontWeight: "700", color: "#34c759", marginBottom: "8px" }}>
                  97%
                </div>
                <div style={{ fontSize: "11px", color: "#1d1d1f", lineHeight: "1.5" }}>
                  successful amendments without errors or support tickets
                </div>
              </div>

              {/* Average Session Time */}
              <div style={{
                background: "#ffffff",
                padding: "14px",
                borderRadius: "10px",
                border: "1px solid #e0e0e0"
              }}>
                <div style={{ fontSize: "13px", color: "#6e6e73", marginBottom: "8px", fontWeight: "600" }}>
                  Average Session Time
                </div>
                <div style={{ fontSize: "26px", fontWeight: "700", color: "#0071e3", marginBottom: "8px" }}>
                  2.4m
                </div>
                <div style={{ fontSize: "11px", color: "#1d1d1f", lineHeight: "1.5" }}>
                  average time to complete an amendment (down from 10.2m)
                </div>
              </div>

              {/* User Satisfaction */}
              <div style={{
                background: "#ffffff",
                padding: "14px",
                borderRadius: "10px",
                border: "1px solid #e0e0e0"
              }}>
                <div style={{ fontSize: "13px", color: "#6e6e73", marginBottom: "8px", fontWeight: "600" }}>
                  Rage Clicks Detected
                </div>
                <div style={{ fontSize: "26px", fontWeight: "700", color: "#34c759", marginBottom: "8px" }}>
                  -82%
                </div>
                <div style={{ fontSize: "11px", color: "#1d1d1f", lineHeight: "1.5" }}>
                  reduction in frustrated user interactions
                </div>
              </div>
            </div>

            <div style={{
              padding: "16px",
              background: "#e3f2fd",
              borderRadius: "10px",
              border: "1px solid #90caf9"
            }}>
              <p style={{ margin: "0", fontSize: "11px", color: "#0d47a1", lineHeight: "1.6" }}>
                <strong>FullStory Insights:</strong> Session replay analysis revealed consultants were completing amendments 76% faster with the new flow, and support tickets related to amendment errors dropped by 88% in the first quarter post-launch.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AmendmentsCaseStudy;

