import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

const AmendmentsCaseStudy = ({ onViewOldFlow, onViewNewFlow, onClose }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lightbox, setLightbox] = useState({ isOpen: false, gallery: null, currentIndex: 0 });
  
  const handleScroll = (e) => {
    setIsScrolled(e.target.scrollTop > 200);
  };

  // Discovery artifacts mapped to their bullet points
  const discoveryActivities = [
    {
      title: "Global workshops",
      description: "60+ consultants, support staff, and key stakeholders across multiple brands to uncover insights",
      artifact: { src: "/images/amendments/image1.png", alt: "Global workshops artifact" }
    },
    {
      title: "Consultant shadowing",
      description: "Real-time observation during amendment calls to understand and validate friction and pain points",
      artifact: { src: "/images/amendments/image2.png", alt: "Consultant shadowing artifact" }
    },
    {
      title: "Workflow mapping",
      description: "Extensive and detailed documentation of the manual process across product verticals",
      artifact: { src: "/images/amendments/image3.png", alt: "Workflow mapping artifact" }
    },
    {
      title: "Matrix analysis",
      description: "Mapped amendment types by frequency vs. friction to prioritize highest-impact improvements",
      artifact: { src: "/images/amendments/image4.png", alt: "Matrix analysis artifact" }
    },
    {
      title: "System audit",
      description: "Analyzed technical constraints and integration points across multiple systems (Codegen, GDS, etc.)",
      artifact: { src: "/images/473090009_1018467526977191_2576338417500917263_n.png", alt: "System audit artifact" }
    },
    {
      title: "Competitive analysis",
      description: "How other travel platforms and enterprise systems handled amendments",
      artifact: null // No artifact for this one
    }
  ];

  // Flattened list for lightbox navigation
  const discoveryImages = discoveryActivities
    .filter(activity => activity.artifact)
    .map(activity => activity.artifact);

  // Wireframes gallery images
  const wireframeImages = [
    { src: "/images/473130931_927600946148291_7743877648821863913_n.png", alt: "Wireframes" }
  ];

  const openLightbox = (gallery, index) => {
    setLightbox({ isOpen: true, gallery, currentIndex: index });
  };

  const closeLightbox = () => {
    setLightbox({ isOpen: false, gallery: null, currentIndex: 0 });
  };

  const navigateLightbox = (direction) => {
    const currentGallery = lightbox.gallery === 'discovery' ? discoveryImages : wireframeImages;
    let newIndex = lightbox.currentIndex;
    
    if (direction === 'next') {
      newIndex = (lightbox.currentIndex + 1) % currentGallery.length;
    } else {
      newIndex = (lightbox.currentIndex - 1 + currentGallery.length) % currentGallery.length;
    }
    
    setLightbox({ ...lightbox, currentIndex: newIndex });
  };

  // Keyboard navigation
  React.useEffect(() => {
    if (!lightbox.isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        navigateLightbox('prev');
      } else if (e.key === 'ArrowRight') {
        navigateLightbox('next');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox.isOpen, lightbox.currentIndex, lightbox.gallery]);
  
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
      {/* Content */}
      <div 
        onScroll={handleScroll}
        style={{
          flex: 1,
          overflow: "auto",
          padding: "0",
          WebkitFontSmoothing: "antialiased",
          position: "relative"
        }}
      >
        {/* Sticky Header */}
        <div style={{
          position: "sticky",
          top: 0,
          background: "#ffffff",
          zIndex: 10,
          padding: isScrolled ? "12px 32px" : "24px 32px",
          borderBottom: isScrolled ? "1px solid #e0e0e0" : "none",
          transition: "all 0.2s ease"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: 1 }}>
              <h1 style={{
                fontSize: isScrolled ? "20px" : "32px",
                fontWeight: "700",
                letterSpacing: "-0.5px",
                margin: "0",
                color: "#1d1d1f",
                lineHeight: "1.1",
                transition: "all 0.2s ease"
              }}>
                Flight Centre Amendments
              </h1>
            
            {/* Mini Metrics (only when scrolled) */}
            {isScrolled && (
              <div style={{
                display: "flex",
                gap: "12px",
                alignItems: "center",
                opacity: isScrolled ? 1 : 0,
                transition: "opacity 0.3s ease"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <span style={{ fontSize: "14px", fontWeight: "700", color: "#34c759" }}>+67%</span>
                  <span style={{ fontSize: "9px", color: "#86868b" }}>Productivity</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <span style={{ fontSize: "14px", fontWeight: "700", color: "#34c759" }}>-75%</span>
                  <span style={{ fontSize: "9px", color: "#86868b" }}>Time</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <span style={{ fontSize: "14px", fontWeight: "700", color: "#34c759" }}>89%</span>
                  <span style={{ fontSize: "9px", color: "#86868b" }}>CSAT</span>
                </div>
              </div>
            )}
            </div>
            
            {/* Header Actions */}
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <button
                onClick={onViewOldFlow}
                style={{
                  padding: "8px 16px",
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#ffffff",
                  background: "#0071e3",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  boxShadow: "0 2px 6px rgba(0, 113, 227, 0.25)",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "#0077ed";
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "0 3px 8px rgba(0, 113, 227, 0.35)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "#0071e3";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 6px rgba(0, 113, 227, 0.25)";
                }}
              >
                <Sparkles size={16} strokeWidth={2} />
                Try Interactive Demo
              </button>
              
              <button
                onClick={onClose}
                style={{
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
                  lineHeight: "1"
                }}
                onMouseOver={(e) => e.currentTarget.style.background = "#e8e8ed"}
                onMouseOut={(e) => e.currentTarget.style.background = "#f5f5f7"}
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Container */}
        <div style={{ padding: "0 32px 32px 32px" }}>
        
        {/* Impact Metrics - Inline */}
        <div style={{ 
          marginBottom: "28px",
          display: "flex",
          gap: "24px",
          alignItems: "center",
          flexWrap: "wrap"
        }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
            <span style={{ fontSize: "26px", fontWeight: "700", color: "#34c759" }}>+67%</span>
            <span style={{ fontSize: "13px", color: "#6e6e73", fontWeight: "500" }}>Productivity</span>
          </div>
          <div style={{ width: "1px", height: "20px", background: "#e0e0e0" }}></div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
            <span style={{ fontSize: "26px", fontWeight: "700", color: "#34c759" }}>-75%</span>
            <span style={{ fontSize: "13px", color: "#6e6e73", fontWeight: "500" }}>Time</span>
          </div>
          <div style={{ width: "1px", height: "20px", background: "#e0e0e0" }}></div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
            <span style={{ fontSize: "26px", fontWeight: "700", color: "#34c759" }}>89%</span>
            <span style={{ fontSize: "13px", color: "#6e6e73", fontWeight: "500" }}>CSAT</span>
          </div>
        </div>

        {/* Executive Summary (Always Visible) */}
        <div style={{ marginBottom: "28px" }}>

          <div style={{
            fontSize: "13px",
            lineHeight: "1.7",
            color: "#1d1d1f",
            marginBottom: "28px"
          }}>
            <p style={{ marginBottom: "16px" }}>
              When customers wanted to modify their bookings, they contacted Flight Centre travel consultants. The existing booking system required consultants to navigate through multiple screens and manual steps to complete even simple travel amendments.
            </p>

            <p style={{ marginBottom: "16px" }}>
              Designing a successful solution in a complex environment such as travel, while working with an offshore vendor was fraught with many challenges and learnings. It wasn't easy—it was stressful, many tears were shed, and the path forward often felt uncertain.
            </p>

            <p>
              But in the end, we designed and implemented a streamlined solution that achieved 75% faster processing times.
            </p>
          </div>

          <div style={{
            padding: "14px 16px",
            background: "#f8f9fa",
            borderRadius: "4px",
            marginBottom: "24px"
          }}>
            <p style={{ fontSize: "12px", lineHeight: "1.5", color: "#1d1d1f", margin: "0 0 8px 0", fontStyle: "italic" }}>
              "What used to take my entire shift now takes minutes. I finally have time to build real relationships with customers."
            </p>
            <div style={{ fontSize: "10px", color: "#6e6e73" }}>
              — Sarah Mitchell, Senior Consultant, Melbourne
            </div>
          </div>
        </div>

        {/* Divider before full details */}
        <div style={{ 
          paddingTop: "24px",
          marginBottom: "32px",
          borderTop: "1px solid #e0e0e0"
        }}>

        {/* Discovery */}
        <div style={{ marginBottom: "32px" }}>
          <h2 style={{
            fontSize: "18px",
            fontWeight: "700",
            marginBottom: "20px",
            color: "#1d1d1f",
            letterSpacing: "-0.3px"
          }}>
            Discovery
          </h2>
          <div style={{
            fontSize: "11px",
            lineHeight: "1.6",
            color: "#1d1d1f",
            marginBottom: "24px"
          }}>
            {/* Research Activities - nested subsection */}
            <div style={{ marginBottom: "24px" }}>
              <h3 style={{
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "16px",
                color: "#1d1d1f"
              }}>
                Research Activities
              </h3>
              <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
                <li style={{ marginBottom: "12px" }}><strong>Global workshops</strong> - 60+ consultants, support staff, and key stakeholders across multiple brands to uncover insights</li>
                <li style={{ marginBottom: "12px" }}><strong>Consultant shadowing</strong> - Real-time observation during amendment calls to understand and validate friction and pain points</li>
                <li style={{ marginBottom: "12px" }}><strong>Workflow mapping</strong> - Extensive and detailed documentation of the manual process across product verticals</li>
                <li style={{ marginBottom: "12px" }}><strong>Matrix analysis</strong> - Mapped amendment types by frequency vs. friction to prioritize highest-impact improvements</li>
                <li style={{ marginBottom: "12px" }}><strong>System audit</strong> - Analyzed technical constraints and integration points across multiple systems (Codegen, GDS, etc.)</li>
                <li style={{ marginBottom: "0" }}><strong>Competitive analysis</strong> - How other travel platforms and enterprise systems handled amendments</li>
              </ul>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "12px",
                marginTop: "24px",
                marginBottom: "16px"
              }}>
                {discoveryImages.map((image, index) => (
                  <div
                    key={index}
                    onClick={() => openLightbox('discovery', index)}
                    style={{
                      background: "#ffffff",
                      border: "1px solid #d2d2d7",
                      borderRadius: "10px",
                      overflow: "hidden",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      cursor: "pointer",
                      transition: "transform 0.2s, box-shadow 0.2s"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.02)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                    }}
                  >
                    <img 
                      src={image.src} 
                      alt={image.alt}
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block"
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Key Findings - nested subsection */}
          <div style={{ marginTop: "28px" }}>
            <h3 style={{
              fontSize: "14px",
              fontWeight: "600",
              marginBottom: "16px",
              color: "#1d1d1f"
            }}>
              Key Findings
            </h3>
            <ul style={{ paddingLeft: "24px", marginBottom: "0", fontSize: "11px", lineHeight: "1.6" }}>
              <li style={{ marginBottom: "8px" }}><strong>5-7 screens and excessive click counts per task</strong> - Minimum 13 clicks for basic amendments. Excessive navigation required</li>
              <li style={{ marginBottom: "8px" }}><strong>No dependency checking</strong> - Changes didn't account for booking impacts, and components requiring amendments were often forgotten</li>
              <li style={{ marginBottom: "8px" }}><strong>Error-prone process</strong> - Manual entry led to booking mistakes</li>
              <li style={{ marginBottom: "8px" }}><strong>Need for bulk amendments</strong> - Consultants managing complex bookings required amendments across the entire booking simultaneously</li>
              <li style={{ marginBottom: "8px" }}><strong>Reduced confidence</strong> - Consultants didn't trust the system due to perceived speed and unusable error messaging</li>
              <li style={{ marginBottom: "8px" }}><strong>Customer frustration</strong> - Long hold times and slow service</li>
              <li style={{ marginBottom: "0" }}><strong>Technical constraints</strong> - Some problems could not be solved due to underlying technical constraints</li>
            </ul>
            <p style={{ marginTop: "16px", marginBottom: "0", fontSize: "11px", lineHeight: "1.6", color: "#1d1d1f" }}>
              Key findings were presented to stakeholders to align on priorities and secure buy-in for the redesign initiative.
            </p>
          </div>

          {/* Problem Definition - nested subsection */}
          <div style={{ marginTop: "28px" }}>
            <h3 style={{
              fontSize: "14px",
              fontWeight: "600",
              marginBottom: "16px",
              color: "#1d1d1f"
            }}>
              Problem Definition
            </h3>
            <div style={{
              fontSize: "11px",
              lineHeight: "1.6",
              color: "#1d1d1f"
            }}>
            <div style={{
              padding: "16px 20px",
              background: "#fff3cd",
              borderLeft: "4px solid #ffc107",
              borderRadius: "4px",
              marginBottom: "16px"
            }}>
              <p style={{ margin: "0", fontStyle: "italic", color: "#856404" }}>
                <strong>How might we</strong> enable consultants to complete booking amendments quickly and accurately while ensuring all booking dependencies are validated, without requiring them to navigate multiple disconnected systems?
              </p>
            </div>
            <p style={{ marginBottom: "0" }}>
              This reframing shifted focus from "fixing screens" to "removing friction" - enabling us to rethink the entire amendment experience rather than incrementally improving the existing flow.
            </p>
            </div>
          </div>
        </div>

        {/* Ideation */}
        <div style={{ marginBottom: "32px" }}>
          <h2 style={{
            fontSize: "18px",
            fontWeight: "700",
            marginBottom: "20px",
            color: "#1d1d1f",
            letterSpacing: "-0.3px"
          }}>
            Ideation
          </h2>
          <div style={{
            fontSize: "11px",
            lineHeight: "1.6",
            color: "#1d1d1f"
          }}>
            <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
              <li style={{ marginBottom: "12px" }}><strong>Design studio workshops</strong> - Consultants, developers, and product managers sketching solutions together</li>
              <li style={{ marginBottom: "12px" }}><strong>Crazy 8s exercises</strong> - 8 rapid sketches in 8 minutes to explore breadth</li>
              <li style={{ marginBottom: "12px" }}><strong>How Might We sessions</strong> - Generated 50+ problem reframes to unlock creative solutions</li>
              <li style={{ marginBottom: "12px" }}><strong>Competitive teardowns</strong> - Analyzed flows from Booking.com, Expedia, and other travel platforms</li>
              <li style={{ marginBottom: "0" }}><strong>Technology exploration</strong> - Assessed feasibility of AI, automation, and real-time integrations</li>
            </ul>
            <p style={{ marginBottom: "0" }}>
              From 30+ initial concepts, I narrowed to 4 viable approaches for deeper exploration based on technical feasibility, user needs, and business constraints.
            </p>
          </div>
        </div>

        {/* Concept Development */}
        <div style={{ marginBottom: "32px" }}>
          <h2 style={{
            fontSize: "18px",
            fontWeight: "700",
            marginBottom: "20px",
            color: "#1d1d1f",
            letterSpacing: "-0.3px"
          }}>
            Concept Development
          </h2>
          <div style={{
            fontSize: "11px",
            lineHeight: "1.6",
            color: "#1d1d1f"
          }}>
            <p style={{ marginBottom: "16px" }}>
              I explored multiple approaches, from incremental improvements to transformational solutions:
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
              <li style={{ marginBottom: "12px" }}><strong>AI-powered conversational interface</strong> - Natural language amendment requests (ideal, not feasible due to technical constraints)</li>
              <li style={{ marginBottom: "12px" }}><strong>Single-page unified workflow</strong> - All amendment logic on one screen (too complex, failed usability testing)</li>
              <li style={{ marginBottom: "12px" }}><strong>Three-page guided workflow</strong> - Step-by-step validation with dependency checking (selected approach)</li>
              <li style={{ marginBottom: "12px" }}><strong>Wizard-based flow</strong> - Question-and-answer format (too slow for experienced consultants)</li>
              <li style={{ marginBottom: "12px" }}><strong>Inline flow</strong> - Changes made directly within the booking view (cluttered interface, unclear validation states)</li>
              <li style={{ marginBottom: "0" }}><strong>Modal flow</strong> - Pop-up dialogs for each amendment (disrupted context, frustrated users)</li>
            </ul>
            <p style={{ marginBottom: "0" }}>
              The three-page approach balanced simplicity with power-user needs, reducing cognitive load while maintaining flexibility for complex amendments.
            </p>
            <p style={{ marginBottom: "0", marginTop: "16px" }}>
              <strong>Technical and financial impacts, risks</strong> - Assessed technical and financial impacts, risks
            </p>

            {/* Codegen-Led Solutions - nested subsection */}
            <div style={{ marginTop: "28px" }}>
              <h3 style={{
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "16px",
                color: "#1d1d1f"
              }}>
                Codegen-Led Solutions (Not Used)
              </h3>
              <div style={{
                fontSize: "11px",
                lineHeight: "1.6",
                color: "#1d1d1f"
              }}>
                <p style={{ marginBottom: "0" }}>
                  [Content about Codegen-led solutions that were proposed but not used will go here]
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Wireframes */}
        <div style={{ marginBottom: "32px" }}>
          <h2 style={{
            fontSize: "18px",
            fontWeight: "700",
            marginBottom: "20px",
            color: "#1d1d1f",
            letterSpacing: "-0.3px"
          }}>
            Wireframes
          </h2>
          <div style={{
            fontSize: "11px",
            lineHeight: "1.6",
            color: "#1d1d1f",
            marginBottom: "24px"
          }}>
            <p style={{ marginBottom: "16px" }}>
              [Wireframes section will go here]
            </p>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "12px",
              marginTop: "24px",
              marginBottom: "0"
            }}>
              {wireframeImages.map((image, index) => (
                <div
                  key={index}
                  onClick={() => openLightbox('wireframes', index)}
                  style={{
                    background: "#ffffff",
                    border: "1px solid #d2d2d7",
                    borderRadius: "10px",
                    overflow: "hidden",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    cursor: "pointer",
                    transition: "transform 0.2s, box-shadow 0.2s"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.02)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                  }}
                >
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block"
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hi-Fidelity Prototypes */}
        <div style={{ marginBottom: "32px" }}>
          <h2 style={{
            fontSize: "18px",
            fontWeight: "700",
            marginBottom: "20px",
            color: "#1d1d1f",
            letterSpacing: "-0.3px"
          }}>
            Hi-Fidelity Prototypes
          </h2>
          <div style={{
            fontSize: "11px",
            lineHeight: "1.6",
            color: "#1d1d1f",
            marginBottom: "24px"
          }}>
            <p style={{ marginBottom: "16px" }}>
              [Hi-fidelity prototypes section will go here]
            </p>
          </div>
        </div>

        {/* User Testing */}
        <div style={{ marginBottom: "32px" }}>
          <h2 style={{
            fontSize: "18px",
            fontWeight: "700",
            marginBottom: "20px",
            color: "#1d1d1f",
            letterSpacing: "-0.3px"
          }}>
            User Testing
          </h2>
          <div style={{
            fontSize: "11px",
            lineHeight: "1.6",
            color: "#1d1d1f"
          }}>
            <p style={{ marginBottom: "16px" }}>
              I conducted moderated usability testing with consultants across experience levels:
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
              <li style={{ marginBottom: "12px" }}><strong>Task-based testing</strong> - 15 common amendment scenarios tested with 24 consultants</li>
              <li style={{ marginBottom: "12px" }}><strong>Think-aloud protocols</strong> - Identified confusion points and mental model mismatches</li>
              <li style={{ marginBottom: "12px" }}><strong>A/B testing</strong> - Compared new workflow against legacy system for time and accuracy</li>
              <li style={{ marginBottom: "12px" }}><strong>Edge case validation</strong> - Tested complex multi-component amendments (e.g., date change + hotel swap)</li>
              <li style={{ marginBottom: "0" }}><strong>Accessibility audit</strong> - Keyboard navigation, screen reader compatibility, color contrast</li>
            </ul>
            <div style={{
              padding: "14px 18px",
              background: "#d4edda",
              borderRadius: "4px",
              marginTop: "16px"
            }}>
              <p style={{ margin: "0", color: "#155724" }}>
                <strong>Testing Results:</strong> 97% task success rate | 89% CSAT | Average time reduced from 8-12 min to 2-3 min
              </p>
            </div>
          </div>
        </div>

        {/* Development & Implementation */}
        <div style={{ marginBottom: "32px" }}>
          <h2 style={{
            fontSize: "18px",
            fontWeight: "700",
            marginBottom: "20px",
            color: "#1d1d1f",
            letterSpacing: "-0.3px"
          }}>
            Development & Implementation
          </h2>
          <div style={{
            fontSize: "11px",
            lineHeight: "1.6",
            color: "#1d1d1f"
          }}>
            <p style={{ marginBottom: "16px" }}>
              I led the build phase in partnership with an offshore development team in Sri Lanka:
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
              <li style={{ marginBottom: "12px" }}><strong>Design handoff</strong> - Created detailed specs with visual flowcharts and annotated prototypes (reduced ambiguity by 60%)</li>
              <li style={{ marginBottom: "12px" }}><strong>Agile sprints</strong> - 2-week iterations with daily standups bridging the 5.5-hour time zone gap</li>
              <li style={{ marginBottom: "12px" }}><strong>Component library</strong> - Built reusable UI patterns for consistency across all amendment types</li>
              <li style={{ marginBottom: "12px" }}><strong>Progressive rollout</strong> - Phased deployment starting with Australian market, then global</li>
              <li style={{ marginBottom: "0" }}><strong>Real-time collaboration</strong> - Shifted working hours for overlap windows and used Loom videos for async communication</li>
            </ul>
            <p style={{ marginBottom: "0" }}>
              Close collaboration and over-documentation were critical to success - visual walkthroughs proved more effective than written specs for complex interaction patterns.
            </p>
          </div>
        </div>

        {/* Quality Assurance */}
        <div style={{ marginBottom: "32px" }}>
          <h2 style={{
            fontSize: "18px",
            fontWeight: "700",
            marginBottom: "20px",
            color: "#1d1d1f",
            letterSpacing: "-0.3px"
          }}>
            Quality Assurance
          </h2>
          <div style={{
            fontSize: "11px",
            lineHeight: "1.6",
            color: "#1d1d1f"
          }}>
            <p style={{ marginBottom: "16px" }}>
              Comprehensive testing across browsers, devices, and real-world scenarios:
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
              <li style={{ marginBottom: "12px" }}><strong>Cross-browser testing</strong> - IE11, Chrome, Firefox, Safari (consultants used varied setups)</li>
              <li style={{ marginBottom: "12px" }}><strong>Performance testing</strong> - Load times under 2 seconds even with slow GDS integrations</li>
              <li style={{ marginBottom: "12px" }}><strong>Data validation</strong> - Tested edge cases like past dates, sold-out inventory, concurrent bookings</li>
              <li style={{ marginBottom: "12px" }}><strong>UAT with consultants</strong> - 2-week pilot with 50 consultants processing real amendments</li>
              <li style={{ marginBottom: "0" }}><strong>Regression testing</strong> - Ensured existing booking flows remained unaffected</li>
            </ul>
            <div style={{
              padding: "14px 18px",
              background: "#d1ecf1",
              borderRadius: "4px",
              marginTop: "16px"
            }}>
              <p style={{ margin: "0", color: "#0c5460" }}>
                <strong>Launch readiness:</strong> Zero critical bugs | 94% consultant approval in UAT | Performance benchmarks exceeded
              </p>
            </div>
          </div>
        </div>

        {/* The Dream vs Reality */}
        <div style={{ marginBottom: "28px" }}>
          <h2 style={{
            fontSize: "14px",
            fontWeight: "600",
            marginBottom: "16px",
            color: "#1d1d1f"
          }}>
            The Dream vs Reality
          </h2>
          <div style={{
            fontSize: "11px",
            lineHeight: "1.6",
            color: "#1d1d1f",
            marginBottom: "24px"
          }}>
            <p style={{ marginBottom: "16px" }}>
              The ideal solution would have been a fully AI-powered "Dream Flow" interface where consultants could simply describe what the customer wanted in natural language, and the system would:
            </p>
            
            <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
              <li style={{ marginBottom: "8px" }}>Understand the intent and automatically suggest the best options</li>
              <li style={{ marginBottom: "8px" }}>Check dependencies across all booking components (flights, hotels, transfers, activities)</li>
              <li style={{ marginBottom: "8px" }}>Show live pricing and availability without manual searching</li>
              <li style={{ marginBottom: "8px" }}>Auto-validate business rules and policy compliance</li>
              <li style={{ marginBottom: "0" }}>Complete the amendment in a single conversational flow</li>
            </ul>

            <div style={{
              marginTop: "16px",
              padding: "16px",
              background: "#fff3cd",
              borderRadius: "10px",
              border: "1px solid #ffc107"
            }}>
              <strong style={{ color: "#856404" }}>Why we couldn't build this (2019-2020):</strong>
              <ul style={{ paddingLeft: "24px", marginTop: "8px", marginBottom: "0" }}>
                <li style={{ marginBottom: "8px", color: "#856404" }}><strong>Technical constraints:</strong> Legacy systems couldn't support real-time inventory aggregation across multiple GDS providers</li>
                <li style={{ marginBottom: "8px", color: "#856404" }}><strong>Data silos:</strong> Hotel, car, and activity inventory lived in separate systems with no unified API</li>
                <li style={{ marginBottom: "8px", color: "#856404" }}><strong>AI limitations:</strong> NLP and intent recognition weren't mature enough for production use in complex booking scenarios</li>
                <li style={{ marginBottom: "8px", color: "#856404" }}><strong>Business risk:</strong> Commission structures and SLA agreements required human validation</li>
                <li style={{ marginBottom: "0", color: "#856404" }}><strong>Timeline pressure:</strong> Consultants needed immediate relief, not a multi-year AI project</li>
              </ul>
            </div>

            <p style={{ marginTop: "16px", marginBottom: "0", fontStyle: "italic", color: "#6e6e73" }}>
              So we delivered what was achievable: a simplified three-page workflow that still delivered 75% time savings. The "Dream Flow" concept later evolved into the AI-powered amendment tool you can try in the interactive demo (built in 2024 as a portfolio piece to show what's now possible).
            </p>
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
        <div style={{ marginBottom: "32px" }}>
          <h2 style={{
            fontSize: "18px",
            fontWeight: "700",
            marginBottom: "20px",
            color: "#1d1d1f",
            letterSpacing: "-0.3px"
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
                <li style={{ marginBottom: "12px" }}><strong>Feature toggles</strong> - UACs for Codegen specified that toggles be added so features could be switched on and off as required</li>
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
        <div style={{ marginBottom: "32px" }}>
          <h2 style={{
            fontSize: "18px",
            fontWeight: "700",
            marginBottom: "20px",
            color: "#1d1d1f",
            letterSpacing: "-0.3px"
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

            <p style={{ 
              marginTop: "20px", 
              marginBottom: "0", 
              fontSize: "11px", 
              fontStyle: "italic", 
              color: "#6e6e73" 
            }}>
              💼 <strong>Business impact details available upon request</strong> — Labor cost savings, ROI calculations, and revenue attribution figures can be shared in conversation.
            </p>
          </div>
        </div>

        {/* Challenges & Learnings */}
        <div style={{ marginBottom: "32px" }}>
          <h2 style={{
            fontSize: "18px",
            fontWeight: "700",
            marginBottom: "20px",
            color: "#1d1d1f",
            letterSpacing: "-0.3px"
          }}>
            Challenges & Learnings
          </h2>
          <div style={{
            fontSize: "11px",
            lineHeight: "1.6",
            color: "#1d1d1f",
            marginBottom: "24px"
          }}>
            <p style={{ marginBottom: "16px" }}>
              Working with Codegen (Sri Lankan offshore development team) across 7+ hour time zones presented unique coordination challenges:
            </p>

            <div style={{
              padding: "16px",
              background: "#fff3cd",
              borderRadius: "10px",
              border: "1px solid #ffc107",
              marginBottom: "20px"
            }}>
              <div style={{ fontSize: "12px", fontWeight: "600", color: "#856404", marginBottom: "8px" }}>
                Key Challenges
              </div>
              <ul style={{ paddingLeft: "24px", marginTop: "8px", marginBottom: "0" }}>
                <li style={{ marginBottom: "8px", color: "#856404" }}><strong>Lack of problem understanding:</strong> Development team had limited exposure to actual consultant pain points and workflows</li>
                <li style={{ marginBottom: "8px", color: "#856404" }}><strong>Need for bulk amendment flows:</strong> Consultants needed to modify multiple bookings at once (group travel, corporate clients) - not addressed in initial scope</li>
                <li style={{ marginBottom: "8px", color: "#856404" }}><strong>Battles with Codegen stakeholders:</strong> Push-back on UX improvements that required additional development effort or complexity</li>
                <li style={{ marginBottom: "8px", color: "#856404" }}><strong>Noise and inefficiencies in design process:</strong> Multiple stakeholders, excessive meetings, and unclear decision-making authority slowed progress</li>
                <li style={{ marginBottom: "8px", color: "#856404" }}><strong>Async communication gaps:</strong> Design decisions made during my day required waiting 12+ hours for engineering feedback</li>
                <li style={{ marginBottom: "8px", color: "#856404" }}><strong>Context loss:</strong> Detailed user requirements and edge cases were difficult to convey through written specs alone</li>
                <li style={{ marginBottom: "8px", color: "#856404" }}><strong>3-month delivery cycles:</strong> Not true agile - limited ability to iterate based on user feedback during development, impacting designer stress levels</li>
                <li style={{ marginBottom: "8px", color: "#856404" }}><strong>Quality trade-offs:</strong> Tight timelines meant prioritizing core functionality over ideal UX refinements</li>
                <li style={{ marginBottom: "0", color: "#856404" }}><strong>Testing limitations:</strong> Limited access to production-like test environments delayed validation cycles</li>
              </ul>
            </div>

            <div style={{
              padding: "16px",
              background: "#d4edda",
              borderRadius: "10px",
              border: "1px solid #c3e6cb"
            }}>
              <div style={{ fontSize: "12px", fontWeight: "600", color: "#155724", marginBottom: "8px" }}>
                What I Learned
              </div>
              <ul style={{ paddingLeft: "24px", marginTop: "8px", marginBottom: "0" }}>
                <li style={{ marginBottom: "8px", color: "#155724" }}><strong>Value of early kick-off meetings:</strong> Comprehensive alignment sessions at project start prevented months of misalignment and rework</li>
                <li style={{ marginBottom: "8px", color: "#155724" }}><strong>Over-document edge cases:</strong> Created visual flowcharts and annotated screenshots instead of written specs - reduced back-and-forth by 60%</li>
                <li style={{ marginBottom: "8px", color: "#155724" }}><strong>Record video walkthroughs:</strong> 3-minute Loom videos explaining user flows were more effective than 10-page documents</li>
                <li style={{ marginBottom: "8px", color: "#155724" }}><strong>Overlap working hours:</strong> Shifted my hours 2-3 hours earlier to create real-time collaboration windows</li>
                <li style={{ marginBottom: "8px", color: "#155724" }}><strong>Build trust through reliability:</strong> Consistent daily standups and clear decision-making frameworks reduced uncertainty</li>
                <li style={{ marginBottom: "0", color: "#155724" }}><strong>Embrace constraints:</strong> Working within limitations led to simpler, more maintainable solutions than the "perfect" design would have</li>
              </ul>
            </div>
          </div>
        </div>
          </div>
        </div>

        {/* Lightbox Modal */}
        {lightbox.isOpen && (
          <div
            onClick={closeLightbox}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.95)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer"
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                maxWidth: "95vw",
                maxHeight: "95vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "default"
              }}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                style={{
                  position: "absolute",
                  top: "-50px",
                  right: "0",
                  background: "rgba(255, 255, 255, 0.2)",
                  border: "none",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  color: "#ffffff",
                  fontSize: "24px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s",
                  zIndex: 10000
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)"}
              >
                ×
              </button>

              {/* Previous Arrow */}
              {(lightbox.gallery === 'discovery' ? discoveryImages : wireframeImages).length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateLightbox('prev');
                  }}
                  style={{
                    position: "absolute",
                    left: "-60px",
                    background: "rgba(255, 255, 255, 0.2)",
                    border: "none",
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                    color: "#ffffff",
                    fontSize: "24px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background 0.2s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)"}
                >
                  ‹
                </button>
              )}

              {/* Image */}
              <img
                src={(lightbox.gallery === 'discovery' ? discoveryImages : wireframeImages)[lightbox.currentIndex].src}
                alt={(lightbox.gallery === 'discovery' ? discoveryImages : wireframeImages)[lightbox.currentIndex].alt}
                style={{
                  maxWidth: "100%",
                  maxHeight: "95vh",
                  objectFit: "contain",
                  borderRadius: "8px"
                }}
              />

              {/* Next Arrow */}
              {(lightbox.gallery === 'discovery' ? discoveryImages : wireframeImages).length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateLightbox('next');
                  }}
                  style={{
                    position: "absolute",
                    right: "-60px",
                    background: "rgba(255, 255, 255, 0.2)",
                    border: "none",
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                    color: "#ffffff",
                    fontSize: "24px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background 0.2s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)"}
                >
                  ›
                </button>
              )}

              {/* Image Counter */}
              {(lightbox.gallery === 'discovery' ? discoveryImages : wireframeImages).length > 1 && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "-50px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    color: "#ffffff",
                    fontSize: "14px",
                    background: "rgba(0, 0, 0, 0.5)",
                    padding: "8px 16px",
                    borderRadius: "20px"
                  }}
                >
                  {lightbox.currentIndex + 1} / {(lightbox.gallery === 'discovery' ? discoveryImages : wireframeImages).length}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AmendmentsCaseStudy;

