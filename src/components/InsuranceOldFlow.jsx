import React, { useState } from 'react';

const InsuranceOldFlow = ({ onBackToCaseStudy, onClose }) => {
  const [activeTab, setActiveTab] = useState('booking');
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  
  // Old Flow States
  const [showOldFlow, setShowOldFlow] = useState(false);
  const [oldFlowStep, setOldFlowStep] = useState(1);
  
  // New Flow States
  const [showNewFlow, setShowNewFlow] = useState(false);
  const [newFlowStep, setNewFlowStep] = useState(1);
  
  // Dream Flow States
  const [showDreamFlow, setShowDreamFlow] = useState(false);
  const [dreamFlowExpanded, setDreamFlowExpanded] = useState(false);
  
  const [showFlowMenu, setShowFlowMenu] = useState(false);
  const [insuranceAdded, setInsuranceAdded] = useState(false);
  const [selectedCoverage, setSelectedCoverage] = useState(null);
  const [confirmingInsuranceIdx, setConfirmingInsuranceIdx] = useState(null);

  const showLoadingThen = (message, callback, duration = 1500) => {
    setLoadingMessage(message);
    setShowLoadingModal(true);
    setTimeout(() => {
      callback();
      setShowLoadingModal(false);
    }, duration);
  };

  const bookingData = {
    bookingRef: "FC-2024-558",
    customer: "Sarah Johnson",
    destination: "Paris, France",
    startDate: "June 15, 2024",
    endDate: "June 22, 2024",
    travelers: 2,
    totalCost: "$4,850"
  };

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
      boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
      borderRadius: "10px",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', sans-serif"
    }}>
      {/* Window Header - Apple Compact */}
      <div style={{
        padding: "8px 16px",
        borderBottom: "1px solid #e0e0e0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#f8f9fa"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            onClick={onBackToCaseStudy}
            style={{
              padding: "4px 10px",
              fontSize: "12px",
              fontWeight: "500",
              color: "#0071e3",
              background: "transparent",
              border: "1px solid #0071e3",
              borderRadius: "6px",
              cursor: "pointer",
              fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
              height: "24px"
            }}
          >
            ← Back to Case Study
          </button>
        </div>
        
        <button
          onClick={onClose}
          style={{
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            border: "none",
            background: "#e0e0e0",
            color: "#666",
            fontSize: "14px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          ✕
        </button>
      </div>

      {/* Header - Apple Compact */}
      <div style={{ padding: "12px 16px", background: "#ffffff", borderBottom: "1px solid #e0e0e0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h2 style={{
              fontSize: "16px",
              fontWeight: "600",
              margin: "0 0 2px 0",
              color: "#1d1d1f"
            }}>
              Booking #{bookingData.bookingRef}
            </h2>
            <div style={{ fontSize: "12px", color: "#6e6e73" }}>
              {bookingData.customer} · {bookingData.travelers} travelers
            </div>
          </div>
          <div style={{ textAlign: "right", whiteSpace: "nowrap" }}>
            <div style={{ fontSize: "12px", color: "#6e6e73", marginBottom: "2px" }}>
              📍 {bookingData.destination}
            </div>
            <div style={{ fontSize: "12px", color: "#6e6e73" }}>
              📅 {bookingData.startDate} - {bookingData.endDate}
            </div>
          </div>
        </div>
      </div>

        {/* Tab Navigation - Apple Compact */}
        {!showOldFlow && !showNewFlow && !showDreamFlow && (
        <div style={{
          display: "flex",
          gap: "0",
          borderBottom: "1px solid #d0d0d0",
          background: "#f0f0f0",
          padding: "0"
        }}>
          {['booking', 'payments', 'documents'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "8px 16px",
                fontSize: "12px",
                fontWeight: activeTab === tab ? "600" : "400",
                color: activeTab === tab ? "#1d1d1f" : "#6e6e73",
                background: activeTab === tab ? "#ffffff" : "transparent",
                border: "none",
                borderBottom: activeTab === tab ? "2px solid #0071e3" : "2px solid transparent",
                cursor: "pointer",
                textTransform: "capitalize",
                fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      {/* Booking Tab Content */}
      {activeTab === 'booking' && (!showOldFlow || (showOldFlow && (oldFlowStep === 1 || oldFlowStep === 2))) && !showNewFlow && (
        <div 
          style={{ flex: 1, overflow: showOnboarding ? "visible" : "auto", padding: "16px", background: "#fafafa" }}
          onClick={() => setShowFlowMenu(false)}
        >
          <div 
            style={{ display: "flex", flexDirection: "column", gap: "12px", position: "relative" }}
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Insurance Component */}
            <div style={{
              padding: "12px",
              background: "#ffffff",
              border: "1px solid #d0d0d0",
              borderRadius: "8px",
              position: "relative",
              zIndex: showOnboarding ? 10 : "auto"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ fontSize: "20px" }}>{insuranceAdded ? "✅" : "🛡️"}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "14px", fontWeight: "600", color: "#1d1d1f", marginBottom: "4px" }}>
                    {insuranceAdded ? "Travel Insurance - Comprehensive Plan" : "Travel Insurance"}
                  </div>
                  <div style={{ fontSize: "12px", color: "#6e6e73", marginBottom: insuranceAdded ? "0" : "8px" }}>
                    {insuranceAdded ? (
                      <>
                        <div>Medical coverage up to $500K · Trip cancellation · Baggage protection</div>
                        <div style={{ fontSize: "11px", marginTop: "4px", color: "#86868b" }}>🌍 Global coverage · 24/7 emergency assistance</div>
                      </>
                    ) : (
                      "Protect your trip with comprehensive coverage"
                    )}
                  </div>
                  
                  {/* DREAM FLOW - Inline AI Assistant Bar */}
                  {!insuranceAdded && showDreamFlow && (
                    <div style={{ marginTop: "12px", animation: "fadeIn 0.5s ease-out" }}>
                      {/* AI Bar - Collapsed */}
                      <div 
                        onClick={() => setDreamFlowExpanded(!dreamFlowExpanded)}
                        style={{
                          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          borderRadius: "8px",
                          padding: "12px",
                          cursor: "pointer",
                          position: "relative",
                          marginBottom: dreamFlowExpanded ? "12px" : "0",
                          overflow: "hidden",
                          transition: "all 0.3s ease",
                          boxShadow: dreamFlowExpanded ? "0 4px 16px rgba(102, 126, 234, 0.3)" : "0 2px 8px rgba(102, 126, 234, 0.2)"
                        }}
                      >
                        {/* Animated shimmer effect */}
                        <div style={{
                          position: "absolute",
                          top: 0,
                          left: "-100%",
                          width: "100%",
                          height: "100%",
                          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                          animation: "shimmer 3s infinite"
                        }}></div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", position: "relative", zIndex: 1 }}>
                          <div style={{ 
                            fontSize: "18px",
                            animation: "pulse 2s ease-in-out infinite",
                            filter: "drop-shadow(0 0 8px rgba(255,255,255,0.5))"
                          }}>🤖</div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: "13px", fontWeight: "600", color: "#ffffff", marginBottom: "3px" }}>
                              AI-Powered Insurance Selection
                            </div>
                            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.9)" }}>
                              ✨ Medical history detected · Recommending enhanced coverage
                            </div>
                          </div>
                          <div style={{ 
                            fontSize: "12px", 
                            color: "#ffffff", 
                            fontWeight: "500",
                            transition: "transform 0.3s ease"
                          }}>
                            {dreamFlowExpanded ? "▼" : "▶"}
                          </div>
                        </div>
                      </div>

                      {/* Expanded Content */}
                      {dreamFlowExpanded && (
                        <div style={{ animation: "slideDown 0.4s ease-out" }}>
                          {/* Success Message - Inline */}
                          {confirmingInsuranceIdx !== null && (
                            <div style={{
                              padding: "8px 10px",
                              background: "#d4edda",
                              border: "1px solid #34c759",
                              borderRadius: "4px",
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                              animation: "slideDown 0.3s ease-out"
                            }}>
                              <div style={{ fontSize: "14px" }}>✓</div>
                              <div>
                                <div style={{ fontSize: "10px", fontWeight: "600", color: "#155724" }}>
                                  Insurance Added Successfully
                                </div>
                                <div style={{ fontSize: "8px", color: "#155724", marginTop: "2px" }}>
                                  Coverage confirmed · Added to booking
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {confirmingInsuranceIdx === null && (
                          <>
                          {/* Medical Alert - Compact */}
                          <div style={{
                            padding: "6px 8px",
                            background: "#ffe3e3",
                            border: "1px solid #ff3b30",
                            borderRadius: "4px",
                            display: "flex",
                            gap: "6px",
                            alignItems: "center",
                            marginBottom: "8px"
                          }}>
                            <div style={{ fontSize: "12px" }}>🏥</div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: "9px", fontWeight: "600", color: "#ff3b30" }}>
                                Medical History Detected
                              </div>
                              <div style={{ fontSize: "8px", color: "#c41e3a", marginTop: "1px" }}>
                                Heart condition (2019) · Enhanced coverage recommended
                              </div>
                            </div>
                          </div>

                          {/* Trust Signals */}
                          <div style={{ 
                            display: "flex", 
                            gap: "6px", 
                            marginBottom: "6px",
                            alignItems: "center",
                            flexWrap: "wrap"
                          }}>
                            <div style={{
                              fontSize: "8px",
                              padding: "2px 5px",
                              background: "#34c759",
                              color: "#ffffff",
                              borderRadius: "3px",
                              fontWeight: "600",
                              display: "flex",
                              alignItems: "center",
                              gap: "3px"
                            }}>
                              <span style={{ fontSize: "10px" }}>●</span> LIVE
                            </div>
                            <div style={{ fontSize: "9px", color: "#6e6e73" }}>
                              Updated 3s ago
                            </div>
                            <div style={{ fontSize: "9px", color: "#6e6e73" }}>·</div>
                            <div style={{ fontSize: "9px", color: "#6e6e73" }}>
                              Direct from providers
                            </div>
                          </div>
                          
                          {/* Provider Options - Compact */}
                          <div style={{
                            marginBottom: "10px"
                          }}>
                            
                            {[
                              { provider: "Allianz", plan: "Comprehensive+ (Medical)", price: "$185", score: 9.4, badge: "AI Pick", color: "#34c759", medical: true, commission: "$32", commissionRate: "17%" },
                              { provider: "Covermore", plan: "Premium", price: "$210", score: 9.1, badge: "High Coverage", color: "#0071e3", medical: false, commission: "$29", commissionRate: "14%" },
                              { provider: "Travel Guard", plan: "Standard", price: "$145", score: 8.7, badge: "Budget", color: "#ff9500", medical: false, commission: "$18", commissionRate: "12%" }
                            ].map((opt, idx) => (
                              <div
                                key={idx}
                                style={{
                                  padding: "4px 5px",
                                  background: "#fafafa",
                                  border: "1px solid #e0e0e0",
                                  borderRadius: "3px",
                                  marginBottom: "2px",
                                  transition: "all 0.15s",
                                  animation: `fadeIn 0.4s ease-out ${idx * 0.1}s both`,
                                  position: "relative"
                                }}
                                onMouseOver={(e) => {
                                  e.currentTarget.style.borderColor = "#667eea";
                                }}
                                onMouseOut={(e) => {
                                  e.currentTarget.style.borderColor = "#e0e0e0";
                                }}
                              >
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "6px" }}>
                                  <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "1px" }}>
                                      <div style={{ fontSize: "9px", fontWeight: "600", color: "#1d1d1f" }}>
                                        {opt.provider}
                                      </div>
                                      {idx === 0 && (
                                        <span style={{
                                          fontSize: "6px",
                                          padding: "1px 3px",
                                          background: "#34c759",
                                          color: "#ffffff",
                                          borderRadius: "2px",
                                          fontWeight: "600"
                                        }}>
                                          AI PICK
                                        </span>
                                      )}
                                    </div>
                                    <div style={{ fontSize: "7px", color: "#86868b" }}>
                                      {opt.plan}
                                      {opt.medical && <span style={{ color: "#ff3b30", fontWeight: "600" }}> · 🏥 Pre-existing</span>}
                                    </div>
                                    <div style={{ fontSize: "7px", color: "#86868b", marginTop: "2px" }}>
                                      Score {opt.score}/10 · Commission {opt.commission} ({opt.commissionRate})
                                    </div>
                                  </div>
                                  <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
                                    <div style={{ textAlign: "right" }}>
                                      <div style={{ fontSize: "10px", fontWeight: "600", color: "#1d1d1f" }}>
                                        {opt.price}
                                      </div>
                                    </div>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setConfirmingInsuranceIdx(idx);
                                        setTimeout(() => {
                                          setInsuranceAdded(true);
                                          setConfirmingInsuranceIdx(null);
                                          setTimeout(() => {
                                            setShowDreamFlow(false);
                                          }, 2000);
                                        }, 2500);
                                      }}
                                      disabled={confirmingInsuranceIdx === idx}
                                      style={{
                                        fontSize: "8px",
                                        padding: "2px 6px",
                                        background: confirmingInsuranceIdx === idx ? "#34c759" : "#667eea",
                                        color: "#ffffff",
                                        border: "none",
                                        borderRadius: "3px",
                                        cursor: confirmingInsuranceIdx === idx ? "default" : "pointer",
                                        fontWeight: "600",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "3px",
                                        transition: "all 0.3s ease"
                                      }}
                                      onMouseOver={(e) => confirmingInsuranceIdx !== idx && (e.currentTarget.style.background = "#5566d9")}
                                      onMouseOut={(e) => confirmingInsuranceIdx !== idx && (e.currentTarget.style.background = "#667eea")}
                                    >
                                      {confirmingInsuranceIdx === idx ? (
                                        <>
                                          <div style={{
                                            width: "6px",
                                            height: "6px",
                                            border: "1.5px solid #ffffff",
                                            borderTopColor: "transparent",
                                            borderRadius: "50%",
                                            animation: "spin 0.6s linear infinite"
                                          }} />
                                          <span>...</span>
                                        </>
                                      ) : (
                                        'Select'
                                      )}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          </>
                          )}

                          {/* Technical Constraints */}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {!insuranceAdded && !showDreamFlow && (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "8px", position: "relative" }}>
                      {/* Onboarding Tooltip */}
                      {showOnboarding && (
                        <div style={{
                          position: "absolute",
                          bottom: "calc(100% + 8px)",
                          left: "0px",
                          background: "rgba(0, 0, 0, 0.85)",
                          color: "#ffffff",
                          padding: "6px 8px",
                          borderRadius: "6px",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                          zIndex: 1000,
                          fontSize: "11px",
                          fontWeight: "500",
                          lineHeight: "1.4",
                          animation: "pulse 2s infinite",
                          whiteSpace: "nowrap"
                        }}>
                          👋 Click here to try the old or new flow
                          <div style={{
                            position: "absolute",
                            bottom: "-4px",
                            left: "16px",
                            width: "8px",
                            height: "8px",
                            background: "rgba(0, 0, 0, 0.85)",
                            transform: "rotate(45deg)"
                          }}></div>
                        </div>
                      )}
                      <button
                        onClick={() => {
                          setShowFlowMenu(!showFlowMenu);
                          setShowOnboarding(false);
                        }}
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
                          e.currentTarget.style.background = '#106ebe';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.background = '#0071e3';
                        }}
                      >
                        Add to Trip
                      </button>
                      <div style={{ fontSize: "12px", color: "#6e6e73" }}>
                        from <span style={{ fontWeight: "500", color: "#1d1d1f" }}>$95</span>
                      </div>

                      {/* Flow Selection Menu */}
                      {showFlowMenu && (
                        <div style={{
                          position: "absolute",
                          top: "100%",
                          left: "0",
                          marginTop: "8px",
                          background: "#ffffff",
                          border: "1px solid #d0d0d0",
                          borderRadius: "6px",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                          minWidth: "200px",
                          zIndex: 100
                        }}>
                          <button
                            onClick={() => {
                              setShowOldFlow(true);
                              setOldFlowStep(1);
                              setShowFlowMenu(false);
                            }}
                            style={{
                              width: "100%",
                              padding: "8px 12px",
                              fontSize: "13px",
                              fontWeight: "500",
                              color: "#1d1d1f",
                              background: "transparent",
                              border: "none",
                              textAlign: "left",
                              cursor: "pointer",
                              fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                              whiteSpace: "nowrap"
                            }}
                            onMouseOver={(e) => e.currentTarget.style.background = "#f8f9fa"}
                            onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
                          >
                            🐢 Old Flow (Separate System)
                          </button>
                          <button
                            onClick={() => {
                              setShowFlowMenu(false);
                              showLoadingThen('Loading insurance options...', () => {
                                setShowNewFlow(true);
                                setNewFlowStep(1);
                              }, 800);
                            }}
                            style={{
                              width: "100%",
                              padding: "8px 12px",
                              fontSize: "13px",
                              fontWeight: "500",
                              color: "#1d1d1f",
                              background: "transparent",
                              border: "none",
                              borderTop: "1px solid #e0e0e0",
                              textAlign: "left",
                              cursor: "pointer",
                              fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                              whiteSpace: "nowrap"
                            }}
                            onMouseOver={(e) => e.currentTarget.style.background = "#f8f9fa"}
                            onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
                          >
                            ⚡ New Flow (Integrated)
                          </button>
                          <button
                            onClick={() => {
                              setShowFlowMenu(false);
                              setShowOnboarding(false);
                              setShowDreamFlow(true);
                              setDreamFlowExpanded(false);
                              // Auto-expand after a brief moment for effect
                              setTimeout(() => setDreamFlowExpanded(true), 300);
                            }}
                            style={{
                              width: "100%",
                              padding: "8px 12px",
                              fontSize: "13px",
                              fontWeight: "500",
                              color: "#1d1d1f",
                              background: "transparent",
                              border: "none",
                              borderTop: "1px solid #e0e0e0",
                              textAlign: "left",
                              cursor: "pointer",
                              fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                              whiteSpace: "nowrap"
                            }}
                            onMouseOver={(e) => e.currentTarget.style.background = "#f8f9fa"}
                            onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
                          >
                            🚀 Dream Flow (Future Vision)
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div style={{ textAlign: "right", display: "flex", alignItems: "center", gap: "8px" }}>
                  {insuranceAdded ? (
                    <div style={{ fontSize: "14px", fontWeight: "600", color: "#1d1d1f" }}>
                      $185
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Flight Component */}
            <div style={{
              padding: "12px",
              background: "#ffffff",
              border: "1px solid #d0d0d0",
              borderRadius: "8px"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ fontSize: "20px" }}>✈️</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "14px", fontWeight: "600", color: "#1d1d1f", marginBottom: "2px" }}>
                    Round Trip Flights
                  </div>
                  <div style={{ fontSize: "12px", color: "#6e6e73" }}>
                    SYD → CDG · {bookingData.startDate} - {bookingData.endDate}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ padding: "2px 8px", background: "#dff6dd", color: "#0b6a0b", borderRadius: "6px", fontSize: "11px", fontWeight: "500", marginBottom: "2px" }}>
                    Confirmed
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: "600", color: "#1d1d1f" }}>
                    $2,850
                  </div>
                </div>
              </div>
            </div>

            {/* Hotel Component */}
            <div style={{
              padding: "12px",
              background: "#ffffff",
              border: "1px solid #d0d0d0",
              borderRadius: "8px"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ fontSize: "20px" }}>🏨</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "14px", fontWeight: "600", color: "#1d1d1f", marginBottom: "2px" }}>
                    Le Meurice Paris
                  </div>
                  <div style={{ fontSize: "12px", color: "#6e6e73" }}>
                    7 nights · Deluxe Room
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ padding: "2px 8px", background: "#dff6dd", color: "#0b6a0b", borderRadius: "6px", fontSize: "11px", fontWeight: "500", marginBottom: "2px" }}>
                    Confirmed
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: "600", color: "#1d1d1f" }}>
                    $2,000
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* OLD FLOW - Step 1: Travellers Modal */}
      {showOldFlow && oldFlowStep === 1 && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10000
        }}>
          <div style={{
            background: "#ffffff",
            borderRadius: "10px",
            width: "90%",
            maxWidth: "500px",
            maxHeight: "80vh",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
          }}>
            <div style={{
              padding: "16px",
              borderBottom: "1px solid #e0e0e0"
            }}>
              <div style={{ fontSize: "14px", fontWeight: "600", color: "#1d1d1f", marginBottom: "6px" }}>
                Select Travellers for Insurance
              </div>
              <div style={{ fontSize: "14px", color: "#6e6e73" }}>
                Choose which travellers to add insurance for
              </div>
            </div>

            <div style={{ flex: 1, overflow: "auto", padding: "16px" }}>
              {[
                { name: "Sarah Mitchell", email: "sarah.mitchell@email.com" },
                { name: "James Mitchell", email: "james.mitchell@email.com" }
              ].map((traveller, index) => (
                <div key={index} style={{
                  padding: "12px",
                  background: "#f8f9fa",
                  borderRadius: "10px",
                  marginBottom: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px"
                }}>
                  <input
                    type="checkbox"
                    defaultChecked
                    style={{
                      width: "18px",
                      height: "18px",
                      cursor: "pointer"
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "14px", fontWeight: "500", color: "#1d1d1f" }}>
                      {traveller.name}
                    </div>
                    <div style={{ fontSize: "13px", color: "#6e6e73" }}>
                      {traveller.email}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              padding: "16px 20px",
              borderTop: "1px solid #e0e0e0",
              display: "flex",
              gap: "12px",
              justifyContent: "flex-end"
            }}>
              <button
                onClick={() => setShowOldFlow(false)}
                style={{
                  padding: "7px 16px",
                  fontSize: "13px",
                  fontWeight: "500",
                  color: "#6e6e73",
                  background: "#f8f9fa",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  showLoadingThen('Loading insurance form...', () => {
                    setOldFlowStep(2);
                  }, 800);
                }}
                style={{
                  padding: "7px 16px",
                  fontSize: "13px",
                  fontWeight: "500",
                  color: "#ffffff",
                  background: "#0071e3",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OLD FLOW - Step 2: Manual Insurance Form Modal */}
      {showOldFlow && oldFlowStep === 2 && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10000
        }}>
          <div style={{
            background: "#ffffff",
            borderRadius: "10px",
            width: "90%",
            maxWidth: "700px",
            maxHeight: "85vh",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 4px 16px rgba(0,0,0,0.15)"
          }}>
            <div style={{
              padding: "16px 20px",
              borderBottom: "1px solid #d0d0d0"
            }}>
              <div style={{ fontSize: "18px", fontWeight: "600", color: "#1d1d1f", marginBottom: "4px" }}>
                Add Manual Item - Travel Insurance
              </div>
              <div style={{ fontSize: "14px", color: "#6e6e73", marginBottom: "12px" }}>
                Enter insurance details manually
              </div>
              
              {/* Helper Text */}
              <div style={{
                background: "#fff3cd",
                border: "1px solid #ffc107",
                borderRadius: "8px",
                padding: "10px 12px",
                display: "flex",
                gap: "10px",
                alignItems: "flex-start"
              }}>
                <div style={{ fontSize: "16px", lineHeight: "1" }}>💡</div>
                <div style={{ fontSize: "12px", color: "#856404", lineHeight: "1.5" }}>
                  <strong>Note:</strong> You need to go to the Covermore website to get a quote first, then copy the details across to this form.
                </div>
              </div>
            </div>

            <div style={{ flex: 1, overflow: "auto", padding: "16px" }}>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "4px", color: "#1d1d1f" }}>
                  Item Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Travel Insurance - Comprehensive Plan"
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    fontSize: "14px",
                    border: "1px solid #d0d0d0",
                    borderRadius: "6px",
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                    boxSizing: "border-box"
                  }}
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "4px", color: "#1d1d1f" }}>
                  Provider
                </label>
                <input
                  type="text"
                  placeholder="e.g., Covermore, Allianz"
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    fontSize: "14px",
                    border: "1px solid #d0d0d0",
                    borderRadius: "6px",
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                    boxSizing: "border-box"
                  }}
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "4px", color: "#1d1d1f" }}>
                  Coverage Type
                </label>
                <select
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    fontSize: "14px",
                    border: "1px solid #d0d0d0",
                    borderRadius: "6px",
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                    boxSizing: "border-box",
                    color: "#6e6e73"
                  }}
                >
                  <option value="">Select coverage type...</option>
                  <option value="basic">Basic Coverage</option>
                  <option value="comprehensive">Comprehensive Coverage</option>
                  <option value="premium">Premium Coverage</option>
                </select>
              </div>

              <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "4px", color: "#1d1d1f" }}>
                    Coverage Amount
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., $500,000"
                    style={{
                      width: "100%",
                      padding: "12px",
                      fontSize: "14px",
                      border: "1px solid #d0d0d0",
                      borderRadius: "6px",
                      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                      boxSizing: "border-box"
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "4px", color: "#1d1d1f" }}>
                    Price per Person
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., $185.00"
                    style={{
                      width: "100%",
                      padding: "12px",
                      fontSize: "14px",
                      border: "1px solid #d0d0d0",
                      borderRadius: "6px",
                      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                      boxSizing: "border-box"
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "4px", color: "#1d1d1f" }}>
                  Number of Travellers
                </label>
                <input
                  type="number"
                  placeholder="2"
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    fontSize: "14px",
                    border: "1px solid #d0d0d0",
                    borderRadius: "6px",
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                    boxSizing: "border-box"
                  }}
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "4px", color: "#1d1d1f" }}>
                  Coverage Description
                </label>
                <textarea
                  placeholder="Enter coverage details (e.g., Medical coverage, Trip cancellation, Baggage protection, etc.)"
                  rows={3}
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    fontSize: "14px",
                    border: "1px solid #d0d0d0",
                    borderRadius: "6px",
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                    boxSizing: "border-box",
                    resize: "vertical"
                  }}
                />
              </div>

              <div style={{
                background: "#f8f9fa",
                padding: "16px",
                borderRadius: "10px",
                marginTop: "20px"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "14px", fontWeight: "500", color: "#1d1d1f" }}>
                    Total Price:
                  </span>
                  <span style={{ fontSize: "18px", fontWeight: "600", color: "#0071e3" }}>
                    $370.00
                  </span>
                </div>
                <div style={{ fontSize: "13px", color: "#6e6e73", marginTop: "4px" }}>
                  $185.00 × 2 travellers
                </div>
              </div>
            </div>

            <div style={{
              padding: "16px 20px",
              borderTop: "1px solid #e0e0e0",
              display: "flex",
              gap: "12px",
              justifyContent: "flex-end"
            }}>
              <button
                onClick={() => setShowOldFlow(false)}
                style={{
                  padding: "7px 16px",
                  fontSize: "13px",
                  fontWeight: "500",
                  color: "#6e6e73",
                  background: "#f8f9fa",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  showLoadingThen('Adding to cart...', () => {
                    setOldFlowStep(3);
                  }, 1000);
                }}
                style={{
                  padding: "7px 16px",
                  fontSize: "13px",
                  fontWeight: "500",
                  color: "#ffffff",
                  background: "#0071e3",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Add to Cart →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OLD FLOW - Step 3: Cart Page */}
      {showOldFlow && oldFlowStep === 3 && (
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          background: "#f8f9fa",
          overflow: "hidden"
        }}>
          <div style={{
            background: "#ffffff",
            borderBottom: "1px solid #d0d0d0",
            padding: "16px 20px",
            flexShrink: 0
          }}>
            <div style={{ fontSize: "18px", fontWeight: "600", color: "#1d1d1f", marginBottom: "4px" }}>
              Cart
            </div>
            <div style={{ fontSize: "14px", color: "#6e6e73" }}>
              Review your items before checkout
            </div>
          </div>

          <div style={{ flex: 1, overflow: "auto", padding: "16px" }}>
            <div style={{ maxWidth: "800px", margin: "0 auto" }}>
              
              {/* Cart Item */}
              <div style={{
                background: "#ffffff",
                borderRadius: "10px",
                padding: "16px",
                border: "1px solid #e0e0e0",
                marginBottom: "16px"
              }}>
                <div style={{ display: "flex", gap: "16px" }}>
                  <div style={{ fontSize: "20px" }}>🛡️</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "14px", fontWeight: "600", color: "#1d1d1f", marginBottom: "6px" }}>
                      Travel Insurance - Comprehensive Plan
                    </div>
                    <div style={{ fontSize: "13px", color: "#6e6e73", marginBottom: "8px" }}>
                      SafeTravel Insurance Co.
                    </div>
                    <div style={{ fontSize: "13px", color: "#6e6e73", lineHeight: "1.6" }}>
                      • Medical coverage up to $500K<br/>
                      • Trip cancellation protection<br/>
                      • Baggage protection<br/>
                      • Emergency evacuation
                    </div>
                    <div style={{ fontSize: "13px", color: "#6e6e73", marginTop: "8px" }}>
                      <strong>Travellers:</strong> Sarah Mitchell, James Mitchell (2 people)
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "18px", fontWeight: "500", color: "#1d1d1f" }}>
                      $370.00
                    </div>
                    <div style={{ fontSize: "12px", color: "#6e6e73" }}>
                      $185.00 × 2
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div style={{
                background: "#ffffff",
                borderRadius: "10px",
                padding: "16px",
                border: "1px solid #e0e0e0"
              }}>
                <h3 style={{ fontSize: "14px", fontWeight: "600", margin: "0 0 16px 0", color: "#1d1d1f" }}>
                  Order Summary
                </h3>
                <div style={{ fontSize: "14px", color: "#6e6e73", marginBottom: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span>Subtotal</span>
                    <span>$370.00</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span>Tax</span>
                    <span>$37.00</span>
                  </div>
                  <div style={{ borderTop: "1px solid #e0e0e0", paddingTop: "12px", marginTop: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "18px", fontWeight: "500", color: "#1d1d1f" }}>
                      <span>Total</span>
                      <span>$407.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{
            background: "#ffffff",
            borderTop: "2px solid #e0e0e0",
            padding: "16px 20px",
            display: "flex",
            justifyContent: "space-between"
          }}>
            <button
              onClick={() => setOldFlowStep(2)}
              style={{
                padding: "12px 24px",
                fontSize: "14px",
                fontWeight: "500",
                color: "#6e6e73",
                background: "#f8f9fa",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              ← Back
            </button>
            <button
              onClick={() => {
                showLoadingThen('Loading passenger details...', () => {
                  setOldFlowStep(4);
                }, 1000);
              }}
              style={{
                padding: "12px 32px",
                fontSize: "14px",
                fontWeight: "500",
                color: "#ffffff",
                background: "#0071e3",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              Continue to Checkout →
            </button>
          </div>
        </div>
      )}

      {/* OLD FLOW - Step 4: Passenger Details */}
      {showOldFlow && oldFlowStep === 4 && (
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          background: "#fafafa",
          overflow: "hidden"
        }}>
          <div style={{
            background: "#ffffff",
            borderBottom: "1px solid #e0e0e0",
            padding: "16px 20px",
            flexShrink: 0
          }}>
            <div style={{ fontSize: "18px", fontWeight: "600", color: "#1d1d1f", marginBottom: "4px" }}>
              Passenger Details
            </div>
            <div style={{ fontSize: "14px", color: "#6e6e73" }}>
              Enter details for each traveller
            </div>
          </div>

          <div style={{ flex: 1, overflow: "auto", padding: "16px" }}>
            <div style={{ maxWidth: "700px", margin: "0 auto" }}>
              
              {/* Passenger 1 */}
              <div style={{
                background: "#ffffff",
                borderRadius: "10px",
                padding: "16px",
                border: "1px solid #e0e0e0",
                marginBottom: "16px"
              }}>
                <h3 style={{ fontSize: "14px", fontWeight: "600", margin: "0 0 16px 0", color: "#1d1d1f" }}>
                  Passenger 1
                </h3>
                <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "4px", color: "#1d1d1f" }}>
                      First Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Sarah"
                      style={{
                        width: "100%",
                        padding: "12px",
                        fontSize: "14px",
                        border: "1px solid #d0d0d0",
                        borderRadius: "6px",
                        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                        boxSizing: "border-box"
                      }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "4px", color: "#1d1d1f" }}>
                      Last Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Mitchell"
                      style={{
                        width: "100%",
                        padding: "12px",
                        fontSize: "14px",
                        border: "1px solid #d0d0d0",
                        borderRadius: "6px",
                        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                        boxSizing: "border-box"
                      }}
                    />
                  </div>
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "4px", color: "#1d1d1f" }}>
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    defaultValue="1985-06-15"
                    style={{
                      width: "100%",
                      padding: "12px",
                      fontSize: "14px",
                      border: "1px solid #d0d0d0",
                      borderRadius: "6px",
                      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                      boxSizing: "border-box"
                    }}
                  />
                </div>
              </div>

              {/* Passenger 2 */}
              <div style={{
                background: "#ffffff",
                borderRadius: "10px",
                padding: "16px",
                border: "1px solid #e0e0e0"
              }}>
                <h3 style={{ fontSize: "14px", fontWeight: "600", margin: "0 0 16px 0", color: "#1d1d1f" }}>
                  Passenger 2
                </h3>
                <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "4px", color: "#1d1d1f" }}>
                      First Name
                    </label>
                    <input
                      type="text"
                      defaultValue="James"
                      style={{
                        width: "100%",
                        padding: "12px",
                        fontSize: "14px",
                        border: "1px solid #d0d0d0",
                        borderRadius: "6px",
                        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                        boxSizing: "border-box"
                      }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "4px", color: "#1d1d1f" }}>
                      Last Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Mitchell"
                      style={{
                        width: "100%",
                        padding: "12px",
                        fontSize: "14px",
                        border: "1px solid #d0d0d0",
                        borderRadius: "6px",
                        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                        boxSizing: "border-box"
                      }}
                    />
                  </div>
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "4px", color: "#1d1d1f" }}>
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    defaultValue="1983-03-22"
                    style={{
                      width: "100%",
                      padding: "12px",
                      fontSize: "14px",
                      border: "1px solid #d0d0d0",
                      borderRadius: "6px",
                      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                      boxSizing: "border-box"
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div style={{
            background: "#ffffff",
            borderTop: "2px solid #e0e0e0",
            padding: "16px 20px",
            display: "flex",
            justifyContent: "space-between"
          }}>
            <button
              onClick={() => setOldFlowStep(3)}
              style={{
                padding: "12px 24px",
                fontSize: "14px",
                fontWeight: "500",
                color: "#6e6e73",
                background: "#f8f9fa",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              ← Back
            </button>
            <button
              onClick={() => {
                showLoadingThen('Loading payment...', () => {
                  setOldFlowStep(5);
                }, 1000);
              }}
              style={{
                padding: "12px 32px",
                fontSize: "14px",
                fontWeight: "500",
                color: "#ffffff",
                background: "#0071e3",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              Continue to Payment →
            </button>
          </div>
        </div>
      )}

      {/* OLD FLOW - Step 5: Payment Page */}
      {showOldFlow && oldFlowStep === 5 && (
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          background: "#f8f9fa",
          overflow: "hidden"
        }}>
          <div style={{
            background: "#ffffff",
            borderBottom: "1px solid #e0e0e0",
            padding: "16px 20px",
            flexShrink: 0
          }}>
            <div style={{ fontSize: "18px", fontWeight: "600", color: "#1d1d1f", marginBottom: "4px" }}>
              Payment
            </div>
            <div style={{ fontSize: "14px", color: "#6e6e73" }}>
              Complete your purchase
            </div>
          </div>

          <div style={{ flex: 1, overflow: "auto", padding: "16px" }}>
            <div style={{ maxWidth: "700px", margin: "0 auto" }}>
              
              {/* Payment Method */}
              <div style={{
                background: "#ffffff",
                borderRadius: "10px",
                padding: "16px",
                border: "1px solid #e0e0e0",
                marginBottom: "16px"
              }}>
                <h3 style={{ fontSize: "14px", fontWeight: "600", margin: "0 0 16px 0", color: "#1d1d1f" }}>
                  Payment Method
                </h3>
                
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "4px", color: "#1d1d1f" }}>
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    defaultValue="4532 1234 5678 9010"
                    style={{
                      width: "100%",
                      padding: "12px",
                      fontSize: "14px",
                      border: "1px solid #d0d0d0",
                      borderRadius: "6px",
                      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                      boxSizing: "border-box"
                    }}
                  />
                </div>

                <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "4px", color: "#1d1d1f" }}>
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      defaultValue="12/25"
                      style={{
                        width: "100%",
                        padding: "12px",
                        fontSize: "14px",
                        border: "1px solid #d0d0d0",
                        borderRadius: "6px",
                        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                        boxSizing: "border-box"
                      }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "4px", color: "#1d1d1f" }}>
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      defaultValue="***"
                      style={{
                        width: "100%",
                        padding: "12px",
                        fontSize: "14px",
                        border: "1px solid #d0d0d0",
                        borderRadius: "6px",
                        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                        boxSizing: "border-box"
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "4px", color: "#1d1d1f" }}>
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="Name on card"
                    defaultValue="Sarah Mitchell"
                    style={{
                      width: "100%",
                      padding: "12px",
                      fontSize: "14px",
                      border: "1px solid #d0d0d0",
                      borderRadius: "6px",
                      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                      boxSizing: "border-box"
                    }}
                  />
                </div>
              </div>

              {/* Order Summary */}
              <div style={{
                background: "#ffffff",
                borderRadius: "10px",
                padding: "16px",
                border: "1px solid #e0e0e0"
              }}>
                <h3 style={{ fontSize: "14px", fontWeight: "600", margin: "0 0 16px 0", color: "#1d1d1f" }}>
                  Order Summary
                </h3>
                <div style={{ fontSize: "14px", color: "#6e6e73", marginBottom: "12px" }}>
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Travel Insurance - Comprehensive Plan</strong><br/>
                    2 travellers × $185.00
                  </div>
                  <div style={{ borderTop: "1px solid #e0e0e0", paddingTop: "12px", marginTop: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                      <span>Subtotal</span>
                      <span>$370.00</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                      <span>Tax</span>
                      <span>$37.00</span>
                    </div>
                    <div style={{ borderTop: "1px solid #e0e0e0", paddingTop: "12px", marginTop: "12px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "18px", fontWeight: "600", color: "#1d1d1f" }}>
                        <span>Total</span>
                        <span>$407.00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{
            background: "#ffffff",
            borderTop: "2px solid #e0e0e0",
            padding: "16px 20px",
            display: "flex",
            justifyContent: "space-between"
          }}>
            <button
              onClick={() => setOldFlowStep(4)}
              style={{
                padding: "12px 24px",
                fontSize: "14px",
                fontWeight: "500",
                color: "#6e6e73",
                background: "#f8f9fa",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              ← Back
            </button>
            <button
              onClick={() => {
                showLoadingThen('Processing payment...', () => {
                  setInsuranceAdded(true);
                  setShowOldFlow(false);
                  setOldFlowStep(1);
                  setShowSuccessToast(true);
                  setTimeout(() => setShowSuccessToast(false), 3000);
                }, 2000);
              }}
              style={{
                padding: "12px 32px",
                fontSize: "14px",
                fontWeight: "500",
                color: "#ffffff",
                background: "#34c759",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              Pay $407.00 →
            </button>
          </div>
        </div>
      )}

      {/* OLD FLOW - Step 6: Add to Booking (Back in Main System) */}
      {showOldFlow && oldFlowStep === 6 && (
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          background: "#f8f9fa",
          overflow: "hidden"
        }}>
          <div style={{
            background: "#ffffff",
            borderBottom: "1px solid #e0e0e0",
            padding: "16px 24px",
            flexShrink: 0
          }}>
            <div style={{ fontSize: "18px", fontWeight: "500", color: "#1d1d1f" }}>
              Add Insurance to Booking
            </div>
            <div style={{ fontSize: "13px", color: "#6e6e73", marginTop: "4px" }}>
              Manually enter insurance details
            </div>
          </div>

          <div style={{ flex: 1, overflow: "auto" }}>
            <div style={{ maxWidth: "700px", margin: "0 auto", padding: "16px" }}>
              <div style={{
                background: "#ffffff",
                borderRadius: "10px",
                padding: "16px",
                border: "1px solid #e0e0e0"
              }}>
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "4px", color: "#1d1d1f" }}>
                    Insurance Provider
                  </label>
                  <input
                    type="text"
                    placeholder="EA Travel Insurance"
                    style={{
                      width: "100%",
                      padding: "12px",
                      fontSize: "14px",
                      border: "1px solid #d0d0d0",
                      borderRadius: "6px",
                      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                      boxSizing: "border-box"
                    }}
                  />
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "4px", color: "#1d1d1f" }}>
                    Plan Name
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedCoverage?.name}
                    style={{
                      width: "100%",
                      padding: "12px",
                      fontSize: "14px",
                      border: "1px solid #d0d0d0",
                      borderRadius: "6px",
                      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                      boxSizing: "border-box"
                    }}
                  />
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "4px", color: "#1d1d1f" }}>
                    Premium Amount
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedCoverage?.price}
                    style={{
                      width: "100%",
                      padding: "12px",
                      fontSize: "14px",
                      border: "1px solid #d0d0d0",
                      borderRadius: "6px",
                      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                      boxSizing: "border-box"
                    }}
                  />
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "4px", color: "#1d1d1f" }}>
                    Policy Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter from insurance system"
                    style={{
                      width: "100%",
                      padding: "12px",
                      fontSize: "14px",
                      border: "1px solid #d0d0d0",
                      borderRadius: "6px",
                      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                      boxSizing: "border-box"
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div style={{
            background: "#ffffff",
            borderTop: "2px solid #e0e0e0",
            padding: "16px 20px",
            display: "flex",
            justifyContent: "flex-end",
            boxShadow: "0 -4px 12px rgba(0,0,0,0.1)"
          }}>
            <button
              onClick={() => {
                showLoadingThen('Adding insurance to booking...', () => {
                  setShowOldFlow(false);
                  setOldFlowStep(1);
                  setInsuranceAdded(true);
                  setActiveTab('booking');
                  setShowSuccessToast(true);
                  setTimeout(() => setShowSuccessToast(false), 4000);
                }, 4000);
              }}
              style={{
                padding: "8px 20px",
                fontSize: "14px",
                fontWeight: "500",
                color: "#ffffff",
                background: "#34c759",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(52, 199, 89, 0.3)"
              }}
            >
              Add to Booking ✓
            </button>
          </div>
        </div>
      )}

      {/* NEW FLOW - Step 1: Integrated Insurance Panel */}
      {showNewFlow && newFlowStep === 1 && (
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          background: "#f8f9fa",
          overflow: "hidden"
        }}>
          <div style={{
            background: "#ffffff",
            borderBottom: "1px solid #e0e0e0",
            padding: "16px 24px",
            flexShrink: 0
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {[
                { label: "Select Coverage", active: true },
                { label: "Confirm & Add", active: false }
              ].map((step, index, array) => (
                <React.Fragment key={index}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    background: step.active ? "#e3f2fd" : "transparent",
                    color: step.active ? "#0071e3" : "#6e6e73",
                    fontSize: "13px",
                    fontWeight: step.active ? "600" : "400"
                  }}>
                    <span style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      background: step.active ? "#0071e3" : "#d0d0d0",
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      fontWeight: "500"
                    }}>
                      {index + 1}
                    </span>
                    {step.label}
                  </div>
                  {index < array.length - 1 && (
                    <div style={{ color: "#d0d0d0", fontSize: "12px" }}>→</div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div style={{ flex: 1, overflow: "auto" }}>
            <div style={{ maxWidth: "900px", margin: "0 auto", padding: "16px" }}>
              
              {/* Auto-filled Customer Info Banner */}
              <div style={{
                background: "#e8f5e9",
                border: "1px solid #4caf50",
                borderRadius: "10px",
                padding: "16px",
                marginBottom: "24px"
              }}>
                <div style={{ fontSize: "14px", color: "#2e7d32", marginBottom: "4px" }}>
                  ✓ <strong>Customer information auto-filled from booking</strong>
                </div>
                <div style={{ fontSize: "13px", color: "#2e7d32" }}>
                  {bookingData.customer} · {bookingData.destination} · {bookingData.startDate} - {bookingData.endDate}
                </div>
              </div>

              <h3 style={{ fontSize: "18px", fontWeight: "500", margin: "0 0 16px 0", color: "#1d1d1f" }}>
                Select Coverage Level
              </h3>

              {/* Pre-selected Coverage */}
              {(() => {
                const preSelected = { name: "Comprehensive Plan", price: "$185", coverage: "$500K medical, Trip cancellation, Baggage protection" };
                if (!selectedCoverage) {
                  setSelectedCoverage(preSelected);
                }
                const current = selectedCoverage || preSelected;

                return (
                  <div style={{
                    background: "#e3f2fd",
                    borderRadius: "10px",
                    padding: "16px",
                    marginBottom: "16px",
                    border: "2px solid #0071e3"
                  }}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "12px"
                    }}>
                      <div style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background: "#0071e3",
                        color: "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        fontWeight: "bold"
                      }}>
                        ✓
                      </div>
                      <span style={{ fontSize: "13px", fontWeight: "500", color: "#0071e3" }}>
                        Recommended
                      </span>
                    </div>
                    
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <h4 style={{ fontSize: "14px", fontWeight: "500", margin: "0 0 8px 0", color: "#1d1d1f" }}>
                          {current.name}
                        </h4>
                        <p style={{ fontSize: "14px", color: "#6e6e73", margin: 0 }}>
                          {current.coverage}
                        </p>
                      </div>
                      <div style={{ fontSize: "20px", fontWeight: "500", color: "#1d1d1f" }}>
                        {current.price}
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Other Options Collapsed */}
              <button
                style={{
                  width: "100%",
                  padding: "14px 20px",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#0071e3",
                  background: "#ffffff",
                  border: "1px solid #e0e0e0",
                  borderRadius: "10px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px"
                }}
              >
                Show Other Plans
                <span style={{ fontSize: "12px" }}>▼</span>
              </button>
            </div>
          </div>

          <div style={{
            background: "#ffffff",
            borderTop: "2px solid #e0e0e0",
            padding: "16px 20px",
            display: "flex",
            justifyContent: "space-between",
            boxShadow: "0 -4px 12px rgba(0,0,0,0.1)"
          }}>
            <button
              onClick={() => setShowNewFlow(false)}
              style={{
                padding: "12px 24px",
                fontSize: "14px",
                fontWeight: "500",
                color: "#6e6e73",
                background: "#f8f9fa",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                showLoadingThen('Adding insurance to booking...', () => {
                  setShowNewFlow(false);
                  setNewFlowStep(1);
                  setInsuranceAdded(true);
                  setActiveTab('booking');
                  setShowSuccessToast(true);
                  setTimeout(() => setShowSuccessToast(false), 4000);
                }, 1500);
              }}
              style={{
                padding: "8px 20px",
                fontSize: "14px",
                fontWeight: "500",
                color: "#ffffff",
                background: "#34c759",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(52, 199, 89, 0.3)"
              }}
            >
              Add to Booking ✓
            </button>
          </div>
        </div>
      )}

      {/* Other Tabs */}
      {activeTab === 'payments' && (
        <div style={{ flex: 1, overflow: "auto", padding: "16px", background: "#fafafa" }}>
          <div style={{
            padding: "40px 24px",
            textAlign: "center",
            background: "#ffffff",
            border: "1px solid #d0d0d0",
            borderRadius: "10px"
          }}>
            <div style={{ fontSize: "36px", marginBottom: "16px" }}>💳</div>
            <h3 style={{ fontSize: "18px", fontWeight: "500", marginBottom: "12px", color: "#1d1d1f" }}>
              Payments
            </h3>
          </div>
        </div>
      )}

      {activeTab === 'documents' && (
        <div style={{ flex: 1, overflow: "auto", padding: "16px", background: "#fafafa" }}>
          <div style={{
            padding: "40px 24px",
            textAlign: "center",
            background: "#ffffff",
            border: "1px solid #d0d0d0",
            borderRadius: "10px"
          }}>
            <div style={{ fontSize: "36px", marginBottom: "16px" }}>📄</div>
            <h3 style={{ fontSize: "18px", fontWeight: "500", marginBottom: "12px", color: "#1d1d1f" }}>
              Documents
            </h3>
          </div>
        </div>
      )}

      {/* DREAM FLOW - Will render inline in the insurance card below */}

      {/* Loading Modal */}
      {showLoadingModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 20000,
          backdropFilter: "blur(4px)"
        }}>
          <div style={{
            background: "#ffffff",
            borderRadius: "10px",
            padding: "20px 24px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            minWidth: "280px"
          }}>
            <div style={{
              width: "40px",
              height: "40px",
              border: "3px solid #f0f0f0",
              borderTop: "3px solid #0071e3",
              borderRadius: "50%",
              animation: "spin 1s linear infinite"
            }}></div>
            
            <div style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "#1d1d1f",
              textAlign: "center"
            }}>
              {loadingMessage}
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showSuccessToast && (
        <div style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          background: "#34c759",
          color: "#ffffff",
          padding: "12px 16px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(52, 199, 89, 0.25)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          zIndex: 400,
          animation: "slideInRight 0.3s ease-out"
        }}>
          <div style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            background: "#ffffff",
            color: "#34c759",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            fontWeight: "bold"
          }}>
            ✓
          </div>
          <div>
            <div style={{ fontSize: "14px", fontWeight: "600", marginBottom: "2px" }}>
              Insurance Added
            </div>
            <div style={{ fontSize: "12px", opacity: 0.9 }}>
              Travel insurance successfully added to booking
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes slideInRight {
          0% { transform: translateX(400px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
        }
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        @keyframes slideDown {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default InsuranceOldFlow;

