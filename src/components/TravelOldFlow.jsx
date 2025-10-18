import React, { useState } from 'react';

const TravelOldFlow = ({ onBackToCaseStudy, onClose }) => {
  const [activeTab, setActiveTab] = useState('itinerary');
  const [openMenuId, setOpenMenuId] = useState(null);
  const [isAmendModalOpen, setIsAmendModalOpen] = useState(false);
  const [isTravellersModalOpen, setIsTravellersModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showCartPage, setShowCartPage] = useState(false);
  const [showTravellersPage, setShowTravellersPage] = useState(false);
  const [showPaymentPage, setShowPaymentPage] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  // New Flow States
  const [showNewFlow, setShowNewFlow] = useState(false);
  const [newFlowStep, setNewFlowStep] = useState(1);
  const [showOtherHotels, setShowOtherHotels] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [selectedShell, setSelectedShell] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [hotelAmended, setHotelAmended] = useState(false);
  const [reasonForAmendment, setReasonForAmendment] = useState('');
  const [causeOfAmendment, setCauseOfAmendment] = useState('');
  
  // Dream Flow States
  const [showDreamFlow, setShowDreamFlow] = useState(false);
  const [dreamFlowExpanded, setDreamFlowExpanded] = useState(false);
  const [nlInput, setNlInput] = useState('');
  const [selectedPill, setSelectedPill] = useState(''); // Track which pill is clicked
  const [showDreamResults, setShowDreamResults] = useState(false);
  const [calendarStartDate, setCalendarStartDate] = useState(null); // For manual date selection
  const [calendarEndDate, setCalendarEndDate] = useState(null);
  const [isConfirming, setIsConfirming] = useState(false); // Track confirmation state
  const [confirmingHotelIdx, setConfirmingHotelIdx] = useState(null); // Track which hotel button is confirming
  const [showPayment, setShowPayment] = useState(false); // Show payment options
  const [selectedPayment, setSelectedPayment] = useState(null); // Selected payment method
  const [undoCountdown, setUndoCountdown] = useState(null); // Countdown for undo action
  const [lastAmendment, setLastAmendment] = useState(null); // Store last amendment for undo
  const [processingStep, setProcessingStep] = useState(''); // Show processing steps
  const [showUndoConfirmation, setShowUndoConfirmation] = useState(false); // Show undo success
  const [detectedChangeType, setDetectedChangeType] = useState('room'); // AI-detected change type
  const [liveInventory, setLiveInventory] = useState({ room1: 2, room2: 5, room3: 3 }); // Live countdown
  const [secondsAgo, setSecondsAgo] = useState(2); // Timestamp counter
  const [inventoryChange, setInventoryChange] = useState({ room1: null, room2: null, room3: null }); // Track changes
  const [soldOutRooms, setSoldOutRooms] = useState({}); // Track sold out animation
  const [showBookingPerson, setShowBookingPerson] = useState(false); // Show person booking animation
  const [expandedCard, setExpandedCard] = useState(null); // Track which card is expanded for notes
  const [cardNotes, setCardNotes] = useState({}); // Store notes for each card

  const showLoadingThen = (message, callback, duration = 1500) => {
    setLoadingMessage(message);
    setShowLoadingModal(true);
    setTimeout(() => {
      callback();
      setShowLoadingModal(false);
    }, duration);
  };

  // Live inventory countdown simulation
  React.useEffect(() => {
    if (showDreamResults && showDreamFlow) {
      const interval = setInterval(() => {
        const roomKey = ['room1', 'room2', 'room3'][Math.floor(Math.random() * 3)];
        const changeDirection = Math.random() > 0.7 ? 'up' : 'down'; // 70% down, 30% up
        
        setLiveInventory(prev => {
          const newInventory = { ...prev };
          if (changeDirection === 'down' && newInventory[roomKey] > 0) {
            newInventory[roomKey] -= 1;
            // If hit zero, trigger sold out animation
            if (newInventory[roomKey] === 0) {
              setSoldOutRooms(prevSold => ({ ...prevSold, [roomKey]: true }));
              // Remove after animation completes
              setTimeout(() => {
                setSoldOutRooms(prevSold => ({ ...prevSold, [roomKey]: false }));
              }, 1000);
            }
          } else if (changeDirection === 'up' && newInventory[roomKey] < 6) {
            newInventory[roomKey] += 1;
          }
          return newInventory;
        });
        
        // Set change indicator
        setInventoryChange({ room1: null, room2: null, room3: null, [roomKey]: changeDirection });
        
        // Clear indicator after 2 seconds
        setTimeout(() => {
          setInventoryChange({ room1: null, room2: null, room3: null });
        }, 2000);
        
        setSecondsAgo(0); // Reset timestamp when inventory changes
      }, 4000); // Every 4 seconds inventory changes (faster for visibility)
      return () => clearInterval(interval);
    }
  }, [showDreamResults, showDreamFlow]);

  // Timestamp ticker
  React.useEffect(() => {
    if (showDreamResults && showDreamFlow) {
      const ticker = setInterval(() => {
        setSecondsAgo(prev => prev + 1);
      }, 1000); // Increment every second
      return () => clearInterval(ticker);
    }
  }, [showDreamResults, showDreamFlow]);

  const tripData = {
    tripName: "Hawaii Family Vacation",
    tripNo: "FC-2026-001",
    destination: "Honolulu, Hawaii",
    startDate: "June 15, 2026",
    endDate: "June 20, 2026",
    travelers: 4
  };

  const shells = [
    {
      id: 1,
      type: 'Hotel',
      name: hotelAmended && selectedHotel ? selectedHotel.name : 'Royal Hawaiian Resort',
      icon: '🏨',
      dates: 'May 15-20, 2024',
      status: hotelAmended ? 'Updated' : 'Confirmed',
      price: hotelAmended && selectedHotel ? `$${parseInt(selectedHotel.price.replace('$', '')) * 5}` : '$2,450',
      room: {
        current: 'Standard King',
        features: ['City View', 'Queen Bed'],
        pricePerNight: 450
      }
    },
    {
      id: 2,
      type: 'Car Rental',
      name: 'Enterprise - Full Size SUV',
      icon: '🚗',
      dates: 'May 15-20, 2024',
      status: 'Confirmed',
      price: '$380'
    },
    {
      id: 3,
      type: 'Activity',
      name: 'Pearl Harbor Tour',
      icon: '🎯',
      dates: 'May 17, 2024',
      status: 'Pending',
      price: '$240'
    }
  ];

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
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif"
    }}>
      {/* Header Bar - Apple Compact */}
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

      {/* Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Trip Summary - Static Section - Apple Compact */}
        <div style={{
          padding: "12px 16px",
          background: "#ffffff",
          borderBottom: "1px solid #e0e0e0"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h2 style={{
                fontSize: "16px",
                fontWeight: "600",
                margin: "0 0 2px 0",
                color: "#1d1d1f"
              }}>
                {tripData.tripName}
              </h2>
              <div style={{ fontSize: "12px", color: "#6e6e73" }}>
                Trip #{tripData.tripNo} · {tripData.travelers} travelers
              </div>
            </div>
            <div style={{ textAlign: "right", whiteSpace: "nowrap" }}>
              <div style={{ fontSize: "12px", color: "#6e6e73", marginBottom: "2px" }}>
                📍 {tripData.destination}
              </div>
              <div style={{ fontSize: "12px", color: "#6e6e73" }}>
                📅 {tripData.startDate} - {tripData.endDate}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation - Apple Compact */}
        {!showSearchResults && !showCartPage && !showTravellersPage && !showPaymentPage && !showNewFlow && !showDreamFlow && (
        <div style={{
          display: "flex",
          gap: "0",
          borderBottom: "1px solid #d0d0d0",
          background: "#f0f0f0",
          padding: "0"
        }}>
          {['itinerary', 'payments', 'documents', 'notes'].map(tab => (
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

        {/* Tab Content - Shells Below */}
        {activeTab === 'itinerary' && !showSearchResults && !showCartPage && !showTravellersPage && !showPaymentPage && !showNewFlow && (
          <div style={{ flex: 1, overflow: showOnboarding ? "visible" : "auto", padding: "16px", background: "#fafafa" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", position: "relative" }}>
              {shells.map(shell => (
                <div
                  key={shell.id}
                  style={{
                    padding: "8px 10px",
                    background: "#ffffff",
                    border: showDreamFlow && selectedShell && selectedShell.id === shell.id ? "2px solid #fa709a" : "1px solid #d0d0d0",
                    borderRadius: "8px",
                    position: "relative",
                    zIndex: shell.id === 1 && showOnboarding ? 10 : "auto",
                    transition: "all 0.3s ease"
                  }}
                >
                  {/* Shell Header Row - Always Horizontal */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ fontSize: "18px" }}>{shell.icon}</div>
                      <div>
                        <div style={{ fontSize: "14px", fontWeight: "600", color: "#1d1d1f", marginBottom: "2px" }}>
                          {shell.name}
                        </div>
                        <div style={{ fontSize: "12px", color: "#6e6e73" }}>
                          {shell.type === 'Hotel' ? (
                            <>
                              {shell.dates}
                              <span style={{ color: "#86868b" }}> · Standard King · $450/night</span>
                            </>
                          ) : (
                            <>{shell.type} · {shell.dates}</>
                          )}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ textAlign: "right" }}>
                      <div style={{
                        fontSize: "11px",
                        padding: "2px 6px",
                        background: shell.status === 'Confirmed' ? '#d4edda' : '#fff3cd',
                        color: shell.status === 'Confirmed' ? '#155724' : '#856404',
                        borderRadius: "4px",
                        marginBottom: "2px",
                        fontWeight: "500"
                      }}>
                        {shell.status}
                      </div>
                      <div style={{ fontSize: "14px", fontWeight: "600", color: "#1d1d1f" }}>
                        {shell.price}
                      </div>
                    </div>
                    <div style={{ position: "relative" }}>
                      {/* Onboarding Tooltip - Only on first shell */}
                      {shell.id === 1 && showOnboarding && (
                        <div style={{
                          position: "absolute",
                          bottom: "calc(100% + 8px)",
                          right: "-8px",
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
                            right: "16px",
                            width: "8px",
                            height: "8px",
                            background: "rgba(0, 0, 0, 0.85)",
                            transform: "rotate(45deg)"
                          }}></div>
                        </div>
                      )}
                      
                      <button
                        onClick={() => {
                          setOpenMenuId(openMenuId === shell.id ? null : shell.id);
                        }}
                        style={{
                          background: "transparent",
                          border: "none",
                          fontSize: "18px",
                          color: "#6e6e73",
                          cursor: "pointer",
                          padding: "4px 8px",
                          lineHeight: "1",
                          position: "relative"
                        }}
                        title="Actions"
                      >
                        ⋮
                      </button>
                      
                      {openMenuId === shell.id && (
                        <div style={{
                          position: "absolute",
                          top: "100%",
                          right: "0",
                          marginTop: "4px",
                          background: "#ffffff",
                          border: "1px solid #d0d0d0",
                          borderRadius: "6px",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                          minWidth: "140px",
                          zIndex: 100
                        }}>
                          <button
                            onClick={() => {
                              setSelectedShell(shell);
                              setIsAmendModalOpen(true);
                              setOpenMenuId(null);
                              setShowOnboarding(false);
                            }}
                            style={{
                              width: "100%",
                              padding: "10px 16px",
                              fontSize: "14px",
                              fontWeight: "500",
                              color: "#1d1d1f",
                              background: "transparent",
                              border: "none",
                              textAlign: "left",
                              cursor: "pointer",
                              fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                              whiteSpace: "nowrap"
                            }}
                            onMouseOver={(e) => e.currentTarget.style.background = "#f5f5f7"}
                            onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
                          >
                            🐢 Amend (Old Flow)
                          </button>
                          <button
                            onClick={() => {
                              setSelectedShell(shell);
                              setOpenMenuId(null);
                              setShowOnboarding(false);
                              showLoadingThen('Loading amendment form...', () => {
                                setShowNewFlow(true);
                                setNewFlowStep(1);
                              }, 1200);
                            }}
                            style={{
                              width: "100%",
                              padding: "10px 16px",
                              fontSize: "14px",
                              fontWeight: "500",
                              color: "#1d1d1f",
                              background: "transparent",
                              border: "none",
                              borderTop: "1px solid #e0e0e0",
                              textAlign: "left",
                              cursor: "pointer",
                              fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                              whiteSpace: "nowrap"
                            }}
                            onMouseOver={(e) => e.currentTarget.style.background = "#f5f5f7"}
                            onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
                          >
                            ⚡ Amend (New Flow)
                          </button>
                          <button
                            onClick={() => {
                              setSelectedShell(shell);
                              setOpenMenuId(null);
                              setShowOnboarding(false);
                              setShowDreamFlow(true);
                              setDreamFlowExpanded(true); // Skip straight to expanded
                              setShowDreamResults(false); // Don't show results until user searches
                              setNlInput(''); // Start with empty search
                              setSelectedPill(''); // Clear any selected pill
                            }}
                            style={{
                              width: "100%",
                              padding: "10px 16px",
                              fontSize: "14px",
                              fontWeight: "500",
                              color: "#1d1d1f",
                              background: "transparent",
                              border: "none",
                              borderTop: "1px solid #e0e0e0",
                              textAlign: "left",
                              cursor: "pointer",
                              fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                              whiteSpace: "nowrap"
                            }}
                            onMouseOver={(e) => e.currentTarget.style.background = "#f5f5f7"}
                            onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
                          >
                            🚀 Amend (Dream Flow)
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  </div>

                  {/* DREAM FLOW - Inline AI Bar (only for selected shell) */}
                  {showDreamFlow && selectedShell && selectedShell.id === shell.id && (
                    <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid #f0f0f0", animation: "fadeIn 0.5s ease-out" }}>
                      {/* AI Smart Search Bar */}
                      <div
                        style={{
                          background: dreamFlowExpanded ? "rgba(255,255,255,0.95)" : "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
                          borderRadius: "8px",
                          padding: dreamFlowExpanded ? "8px 10px" : "12px",
                          cursor: dreamFlowExpanded ? "default" : "pointer",
                          position: "relative",
                          overflow: "hidden",
                          transition: "all 0.3s ease",
                          boxShadow: dreamFlowExpanded ? "0 4px 16px rgba(250, 112, 154, 0.3)" : "0 2px 8px rgba(250, 112, 154, 0.2)"
                        }}
                        onClick={(e) => {
                          if (!dreamFlowExpanded) {
                            e.stopPropagation();
                            setDreamFlowExpanded(true);
                          }
                        }}
                      >
                        {!dreamFlowExpanded && (
                          <>
                            {/* Shimmer */}
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
                              <div style={{ flex: 1, fontSize: "13px", fontWeight: "600", color: "#ffffff" }}>
                                AI-Powered Amendment
                              </div>
                              <div style={{ fontSize: "12px", color: "#ffffff", fontWeight: "500" }}>
                                ▶
                              </div>
                            </div>
                          </>
                        )}

                        {dreamFlowExpanded && (
                          <div style={{ animation: "fadeIn 0.3s ease-out" }}>
                            {/* Inline Payment Flow - Universal for all amendments */}
                            {showPayment && (
                              <div style={{
                                marginTop: "8px",
                                padding: "8px",
                                background: "#ffffff",
                                border: "2px solid #667eea",
                                borderRadius: "6px",
                                marginBottom: "8px",
                                animation: "fadeIn 0.3s ease-out"
                              }}>
                                <div style={{ fontSize: "8px", color: "#86868b", fontWeight: "600", marginBottom: "6px" }}>
                                  PAYMENT METHOD
                                </div>
                                
                                {/* Payment Options */}
                                <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "8px" }}>
                                  {[
                                    { id: 'card', name: 'Credit Card', icon: '💳', subtitle: 'Visa ****4242 • Instant', color: '#667eea' },
                                    { id: 'apple', name: 'Apple Pay', icon: '', subtitle: 'Touch ID • Instant', color: '#000000' },
                                    { id: 'booking', name: 'On File', icon: '📋', subtitle: 'Corporate card on booking • No action', color: '#34c759' }
                                  ].map(method => (
                                    <div
                                      key={method.id}
                                      onClick={() => setSelectedPayment(method.id)}
                                      style={{
                                        padding: "6px 8px",
                                        background: selectedPayment === method.id ? '#f0f4ff' : '#fafafa',
                                        border: '1px solid',
                                        borderColor: selectedPayment === method.id ? method.color : '#e0e0e0',
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                        transition: "all 0.15s",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px"
                                      }}
                                      onMouseOver={(e) => {
                                        if (selectedPayment !== method.id) {
                                          e.currentTarget.style.borderColor = method.color;
                                        }
                                      }}
                                      onMouseOut={(e) => {
                                        if (selectedPayment !== method.id) {
                                          e.currentTarget.style.borderColor = '#e0e0e0';
                                        }
                                      }}
                                    >
                                      <div style={{ fontSize: "16px" }}>{method.icon}</div>
                                      <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: "9px", fontWeight: "600", color: "#1d1d1f" }}>
                                          {method.name}
                                        </div>
                                        <div style={{ fontSize: "7px", color: "#6e6e73" }}>
                                          {method.subtitle}
                                        </div>
                                      </div>
                                      {selectedPayment === method.id && (
                                        <div style={{ fontSize: "12px", color: method.color }}>✓</div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                                
                                {/* Payment Summary */}
                                <div style={{
                                  padding: "6px 8px",
                                  background: "#f9f9fb",
                                  borderRadius: "4px",
                                  marginBottom: "6px",
                                  fontSize: "7px",
                                  color: "#6e6e73"
                                }}>
                                  <div style={{ fontSize: "8px", fontWeight: "600", color: "#1d1d1f", marginBottom: "4px" }}>
                                    {selectedHotel ? selectedHotel.name : 'Date Change'}
                                  </div>
                                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
                                    <span>Amendment charge:</span>
                                    <span style={{ color: "#ff9500", fontWeight: "600" }}>+$450</span>
                                  </div>
                                  <div style={{ 
                                    display: "flex", 
                                    justifyContent: "space-between", 
                                    paddingTop: "4px",
                                    borderTop: "1px solid #e0e0e0",
                                    fontWeight: "600",
                                    color: "#1d1d1f",
                                    fontSize: "8px"
                                  }}>
                                    <span>Total due now:</span>
                                    <span>$450</span>
                                  </div>
                                </div>
                                
                                {/* Action Buttons */}
                                <div style={{ display: "flex", gap: "4px" }}>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setShowPayment(false);
                                      setSelectedPayment(null);
                                      setConfirmingHotelIdx(null);
                                    }}
                                    style={{
                                      flex: 1,
                                      fontSize: "8px",
                                      padding: "4px",
                                      background: "#ffffff",
                                      color: "#6e6e73",
                                      border: "1px solid #e0e0e0",
                                      borderRadius: "3px",
                                      cursor: "pointer",
                                      fontWeight: "600"
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.background = "#f5f5f7"}
                                    onMouseOut={(e) => e.currentTarget.style.background = "#ffffff"}
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setShowPayment(false);
                                      setIsConfirming(true);
                                      
                                      // Realistic multi-step processing
                                      setProcessingStep('Authorizing payment...');
                                      setTimeout(() => {
                                        setProcessingStep('Updating booking...');
                                        setTimeout(() => {
                                          setProcessingStep('Syncing itinerary...');
                                          setTimeout(() => {
                                            setProcessingStep('');
                                            // Keep success message visible longer (5s undo window)
                                            setTimeout(() => {
                                              setShowDreamFlow(false);
                                              setConfirmingHotelIdx(null);
                                              setSelectedPayment(null);
                                              setIsConfirming(false);
                                            }, 5000); // 5s to see success and undo if needed
                                          }, 800);
                                        }, 900);
                                      }, 1000);
                                    }}
                                    disabled={!selectedPayment}
                                    style={{
                                      flex: 2,
                                      fontSize: "9px",
                                      padding: "4px 10px",
                                      background: selectedPayment ? "#667eea" : "#d1d1d6",
                                      color: "#ffffff",
                                      border: "none",
                                      borderRadius: "4px",
                                      cursor: selectedPayment ? "pointer" : "not-allowed",
                                      fontWeight: "600"
                                    }}
                                    onMouseOver={(e) => selectedPayment && (e.currentTarget.style.background = "#5566d9")}
                                    onMouseOut={(e) => selectedPayment && (e.currentTarget.style.background = "#667eea")}
                                  >
                                    Confirm & Pay ${selectedHotel ? Math.abs((selectedHotel.priceNum - selectedHotel.currentPrice) * selectedHotel.nights) : '450'}
                                  </button>
                                </div>
                              </div>
                            )}
                            
                            {/* Processing or Success Message */}
                            {isConfirming && !showPayment && (
                              <div style={{
                                padding: "8px 10px",
                                background: processingStep ? "#fff8e1" : "#d4edda",
                                border: "1px solid " + (processingStep ? "#ff9500" : "#34c759"),
                                borderRadius: "4px",
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                animation: "slideDown 0.3s ease-out"
                              }}>
                                {processingStep ? (
                                  <>
                                    <div style={{
                                      width: "12px",
                                      height: "12px",
                                      border: "2px solid #ff9500",
                                      borderTopColor: "transparent",
                                      borderRadius: "50%",
                                      animation: "spin 0.6s linear infinite"
                                    }} />
                                    <div style={{ flex: 1 }}>
                                      <div style={{ fontSize: "10px", fontWeight: "600", color: "#e65100" }}>
                                        {processingStep}
                                      </div>
                                      <div style={{ fontSize: "7px", color: "#f57c00", marginTop: "2px" }}>
                                        Secure connection · Encrypted
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div style={{ fontSize: "14px" }}>✓</div>
                                    <div style={{ flex: 1 }}>
                                      <div style={{ fontSize: "10px", fontWeight: "600", color: "#155724" }}>
                                        ✓ Payment Confirmed · Booking Updated
                                      </div>
                                      <div style={{ fontSize: "8px", color: "#155724", marginTop: "2px" }}>
                                        {selectedPayment === 'card' && 'Visa ****4242 charged • '}
                                        {selectedPayment === 'apple' && 'Apple Pay completed • '}
                                        {selectedPayment === 'booking' && 'Card on file charged • '}
                                        Client itinerary synced
                                      </div>
                                    </div>
                                  </>
                                )}
                                {!processingStep && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      // Undo the amendment
                                      setIsConfirming(false);
                                      setConfirmingHotelIdx(null);
                                      setSelectedHotel(null);
                                      setHotelAmended(false);
                                      setUndoCountdown(null);
                                      setLastAmendment(null);
                                      setProcessingStep('');
                                      
                                      // Show undo confirmation
                                      setShowUndoConfirmation(true);
                                      setTimeout(() => {
                                        setShowUndoConfirmation(false);
                                      }, 2000);
                                    }}
                                    style={{
                                      fontSize: "8px",
                                      padding: "3px 8px",
                                      background: "#ffffff",
                                      color: "#ff9500",
                                      border: "1px solid #ff9500",
                                      borderRadius: "3px",
                                      cursor: "pointer",
                                      fontWeight: "700",
                                      transition: "all 0.15s"
                                    }}
                                    onMouseOver={(e) => {
                                      e.currentTarget.style.background = "#fff8f0";
                                    }}
                                    onMouseOut={(e) => {
                                      e.currentTarget.style.background = "#ffffff";
                                    }}
                                  >
                                    ↶ UNDO
                                  </button>
                                )}
                              </div>
                            )}
                            
                            {/* Integrated Search */}
                            {confirmingHotelIdx === null && (
                              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                              <div style={{ fontSize: "14px" }}>✨</div>
                              <input
                                value={nlInput}
                                onChange={(e) => setNlInput(e.target.value)}
                                placeholder="Type what you want to change..."
                                autoFocus
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                  flex: 1,
                                  border: "none",
                                  outline: "none",
                                  fontSize: "12px",
                                  fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                                  background: "transparent",
                                  color: "#1d1d1f"
                                }}
                              />
                              <button
                                onClick={(e) => { 
                                  e.stopPropagation(); 
                                  setShowDreamResults(true);
                                }}
                                style={{
                                  padding: "4px 10px",
                                  fontSize: "11px",
                                  fontWeight: "500",
                                  color: "#ffffff",
                                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                  border: "none",
                                  borderRadius: "4px",
                                  cursor: "pointer"
                                }}
                              >
                                Search
                              </button>
                            </div>
                            )}
                            
                            {/* Quick Pills + Close - AI Context Aware */}
                            {confirmingHotelIdx === null && (
                            <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", alignItems: "center" }}>
                                {/* Parent pills - always visible */}
                                {["Room Upgrade", "Different Hotel", "Date Change"].map((ex, idx) => (
                                  <button
                                    key={idx}
                                    onClick={(e) => { 
                                      e.stopPropagation(); 
                                      if (ex === "Date Change") {
                                        setSelectedPill(ex);
                                      } else {
                                        setSelectedPill(ex);
                                      }
                                      setShowDreamResults(true);
                                    }}
                                    style={{
                                      fontSize: "9px",
                                      padding: "3px 7px",
                                      background: (ex === "Date Change" && (selectedPill === 'Date Change' || selectedPill === 'Extend +1' || selectedPill === 'Shorten -1' || selectedPill === 'Shift +3')) || selectedPill === ex ? "#667eea" : "#f5f5f7",
                                      border: (ex === "Date Change" && (selectedPill === 'Date Change' || selectedPill === 'Extend +1' || selectedPill === 'Shorten -1' || selectedPill === 'Shift +3')) || selectedPill === ex ? "1px solid #667eea" : "1px solid #e0e0e0",
                                      borderRadius: "10px",
                                      color: (ex === "Date Change" && (selectedPill === 'Date Change' || selectedPill === 'Extend +1' || selectedPill === 'Shorten -1' || selectedPill === 'Shift +3')) || selectedPill === ex ? "#ffffff" : "#667eea",
                                      cursor: "pointer",
                                      fontWeight: (ex === "Date Change" && (selectedPill === 'Date Change' || selectedPill === 'Extend +1' || selectedPill === 'Shorten -1' || selectedPill === 'Shift +3')) || selectedPill === ex ? "600" : "500",
                                      transition: "all 0.2s ease"
                                    }}
                                  >
                                    {ex}
                                  </button>
                                ))}
                                <button
                                  onClick={(e) => { e.stopPropagation(); setShowDreamFlow(false); }}
                                  style={{
                                    fontSize: "8px",
                                    padding: "2px 6px",
                                    background: "transparent",
                                    border: "none",
                                    color: "#6e6e73",
                                    cursor: "pointer",
                                    fontWeight: "500",
                                    marginLeft: "auto",
                                    textDecoration: "underline"
                                  }}
                                >
                                  Close
                                </button>
                              </div>
                              
                              {/* Show child pills when Date Change is active - on separate line */}
                              {(selectedPill === 'Date Change' || selectedPill === 'Extend +1' || selectedPill === 'Shorten -1' || selectedPill === 'Shift +3') && (
                                <div style={{ 
                                  paddingTop: "6px",
                                  marginTop: "6px",
                                  borderTop: "1px solid #e0e0e0"
                                }}>
                                  <div style={{ 
                                    display: "flex", 
                                    flexWrap: "wrap", 
                                    gap: "3px", 
                                    alignItems: "center",
                                    marginBottom: "6px"
                                  }}>
                                    {["Extend +1", "Shorten -1", "Shift +3"].map((ex, idx) => (
                                      <button
                                        key={idx}
                                        onClick={(e) => { 
                                          e.stopPropagation(); 
                                          setSelectedPill(ex);
                                          setShowDreamResults(true);
                                        }}
                                        style={{
                                          fontSize: "8px",
                                          padding: "2px 6px",
                                          background: selectedPill === ex ? "#667eea" : "#f5f5f7",
                                          border: selectedPill === ex ? "1px solid #667eea" : "1px solid #e0e0e0",
                                          borderRadius: "8px",
                                          color: selectedPill === ex ? "#ffffff" : "#6e6e73",
                                          cursor: "pointer",
                                          fontWeight: selectedPill === ex ? "600" : "500",
                                          transition: "all 0.2s ease"
                                        }}
                                      >
                                        {ex}
                                      </button>
                                    ))}
                                  </div>
                                  </div>
                                )}
                            </div>
                            )}

                            {/* AI Results - Inline */}
                            {confirmingHotelIdx === null && showDreamResults && (
                              <div style={{ 
                                marginTop: (selectedPill === 'Date Change' || selectedPill === 'Extend +1' || selectedPill === 'Shorten -1' || selectedPill === 'Shift +3') ? "0px" : "6px", 
                                paddingTop: (selectedPill === 'Date Change' || selectedPill === 'Extend +1' || selectedPill === 'Shorten -1' || selectedPill === 'Shift +3') ? "0px" : "6px", 
                                borderTop: (selectedPill === 'Date Change' || selectedPill === 'Extend +1' || selectedPill === 'Shorten -1' || selectedPill === 'Shift +3') ? "none" : "1px solid #e0e0e0",
                                animation: "slideDown 0.3s ease-out"
                              }}>
                                {/* Current Booking Reference - conditional based on selected pill */}
                                {!(selectedPill === 'Date Change' || selectedPill === 'Extend +1' || selectedPill === 'Shorten -1' || selectedPill === 'Shift +3') && (
                                  <div style={{
                                    padding: "4px 6px",
                                    background: "#f9f9fb",
                                    border: "1px solid #e0e0e0",
                                    borderRadius: "4px",
                                    marginBottom: "4px"
                                  }}>
                                    <div style={{ fontSize: "8px", color: "#86868b", marginBottom: "3px", fontWeight: "500" }}>
                                      CURRENT ROOM
                                    </div>
                                    <div style={{ fontSize: "10px", fontWeight: "600", color: "#1d1d1f" }}>
                                      Standard King · $450/night
                                    </div>
                                    <div style={{ fontSize: "8px", color: "#6e6e73", marginTop: "2px" }}>
                                      City View · Queen Bed
                                    </div>
                                  </div>
                                )}

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
                                    Updated {secondsAgo}s ago
                                  </div>
                                  <div style={{ fontSize: "9px", color: "#6e6e73" }}>·</div>
                                  <div style={{ fontSize: "9px", color: "#ff9500", fontWeight: "500" }}>
                                    3 viewing
                                  </div>
                                </div>
                                {(() => {
                                  const input = (selectedPill || nlInput).toLowerCase();
                                  let hotels;
                                  const isDateChange = selectedPill === 'Date Change' || selectedPill === 'Extend +1' || selectedPill === 'Shorten -1' || selectedPill === 'Shift +3';
                                  
                                  if (input.includes('flight') || input.includes('depart') || input.includes('arrival')) {
                                    hotels = [
                                      { name: "United 1402 - 8:15am", type: "Earlier Departure", price: "+$125", match: 99, badge: "Available", color: "#34c759", available: "4 seats", features: ["Direct", "2h 15m"] },
                                      { name: "Business Class", type: "Upgrade", price: "+$890", match: 95, badge: "Available", color: "#667eea", available: "2 seats", features: ["Lie-flat", "Lounge"] },
                                      { name: "Hawaiian Air 52", type: "Different Airline", price: "+$0", match: 90, badge: "Available", color: "#0071e3", available: "8 seats", features: ["Direct", "Meals"] }
                                    ];
                                  } else if (input.includes('passenger') || input.includes('guest')) {
                                    hotels = [
                                      { name: "Add 1 adult", type: "Passenger Change", price: "+$420", match: 99, badge: "Available", color: "#34c759", available: "Room fits 3", features: ["Rollaway bed", "Extra amenities"] },
                                      { name: "Upgrade to 2-bedroom", type: "Room Change", price: "+$325/nt", match: 95, badge: "Available", color: "#667eea", available: "2 left", features: ["Suite", "Living room"] },
                                      { name: "Remove 1 guest", type: "Passenger Change", price: "-$0", match: 90, badge: "Free", color: "#34c759", features: ["Update booking"] }
                                    ];
                                  } else if (input.includes('activity') || input.includes('tour')) {
                                    hotels = [
                                      { name: "Traditional Luau", type: "Activity", price: "$159/pp", match: 99, badge: "Popular", color: "#ff9500", available: "Tonight 6pm", features: ["Dinner", "Show", "Transport"] },
                                      { name: "Snorkel & Dolphin", type: "Water Activity", price: "$189/pp", match: 95, badge: "Available", color: "#0071e3", available: "Tomorrow 9am", features: ["Gear included", "Lunch"] },
                                      { name: "Volcano Helicopter", type: "Air Tour", price: "$349/pp", match: 92, badge: "Available", color: "#667eea", available: "3 days", features: ["60 min", "Doors off"] }
                                    ];
                                  } else if (input.includes('meal') || input.includes('dining')) {
                                    hotels = [
                                      { name: "All-Inclusive", type: "Meal Upgrade", price: "+$145/night", match: 99, badge: "Available", color: "#34c759", features: ["All meals", "Premium drinks", "Room service"] },
                                      { name: "Half Board", type: "Meal Plan", price: "+$65/night", match: 95, badge: "Available", color: "#0071e3", features: ["Breakfast", "Dinner"] },
                                      { name: "Breakfast Only", type: "Meal Plan", price: "+$35/night", match: 90, badge: "Available", color: "#667eea", features: ["Daily buffet"] }
                                    ];
                                  } else if (isDateChange || input.includes('date') || input.includes('extend') || input.includes('shorten') || input.includes('shift') || input.includes('custom')) {
                                    hotels = 'calendar'; // Special flag for calendar view
                                  } else if (input.includes('hotel') || input.includes('property') || input.includes('resort')) {
                                    const currentPrice = 450;
                                    const nights = 5;
                                    hotels = [
                                      { name: "Four Seasons Hualalai", type: "King Room · Same Dates", price: "$850/nt", priceNum: 850, match: 98, badge: "Luxury", color: "#667eea", available: "3 rooms left", features: ["5-star", "Beachfront", "Golf"], currentPrice, nights, source: "Sabre GDS" },
                                      { name: "Fairmont Orchid", type: "King Room · Same Dates", price: "$625/nt", priceNum: 625, match: 95, badge: "Available", color: "#0071e3", available: "8 rooms left", features: ["Resort", "Spa", "Pools"], currentPrice, nights, source: "Amadeus" },
                                      { name: "Grand Hyatt Kauai", type: "King Room · Same Dates", price: "$580/nt", priceNum: 580, match: 92, badge: "Value", color: "#34c759", available: "12 rooms left", features: ["Family", "Beach", "Activities"], currentPrice, nights, source: "Direct API" }
                                    ];
                                  } else {
                                    // Default: Room changes with LIVE inventory + Cost comparison
                                    const currentPrice = 450;
                                    const nights = 5;
                                    hotels = [
                                      { name: "Ocean Suite", type: "Upgrade", price: "$625", priceNum: 625, match: 99, badge: "Available", color: "#34c759", available: `${liveInventory.room1} left`, features: ["Ocean View", "Living Room", "Balcony"], lastBooked: "4m ago by Maria T.", roomKey: 'room1', inventory: liveInventory.room1, currentPrice, nights, source: "Hilton API" },
                                      { name: "Premium King", type: "Upgrade", price: "$520", priceNum: 520, match: 95, badge: "Available", color: "#34c759", available: `${liveInventory.room2} left`, features: ["Partial Ocean", "King Bed"], lastBooked: "12m ago by John D.", roomKey: 'room2', inventory: liveInventory.room2, currentPrice, nights, source: "Hilton API" },
                                      { name: "Garden View Suite", type: "Upgrade", price: "$580", priceNum: 580, match: 92, badge: "Available", color: "#0071e3", available: `${liveInventory.room3} left`, features: ["Garden View", "Suite"], lastBooked: "28m ago by Lisa K.", roomKey: 'room3', inventory: liveInventory.room3, currentPrice, nights, source: "Hilton API" }
                                    ].filter(room => room.inventory > 0); // Only show rooms with inventory
                                  }
                                
                                  // Render logic
                                  if (hotels === 'calendar') {
                                    // Determine date range based on manual selection or selected pill
                                    let startDate = calendarStartDate || 22;
                                    let endDate = calendarEndDate || 27;
                                    
                                    // Override with pill presets if no manual selection
                                    if (!calendarStartDate && !calendarEndDate) {
                                      if (selectedPill === 'Extend +1') {
                                        startDate = 15; endDate = 21; // Jun 15-21
                                      } else if (selectedPill === 'Shorten -1') {
                                        startDate = 15; endDate = 19; // Jun 15-19
                                      } else if (selectedPill === 'Shift +3') {
                                        startDate = 18; endDate = 23; // Jun 18-23
                                      } else {
                                        startDate = 15; endDate = 20; // Default (current booking)
                                      }
                                    }
                                    
                                    const months = [
                                      {
                                        name: 'MARCH',
                                        emptyStart: 5, // March 2025 starts on Saturday (5 empty cells)
                                        days: Array.from({length: 31}, (_, i) => {
                                          const date = i + 1;
                                          const isCurrent = date >= startDate && date <= endDate;
                                          let price = 450;
                                          let avail = 'high';
                                          
                                          // Weekend pricing
                                          if ([7,8,14,15,20,21].includes(date)) {
                                            price = 480;
                                            avail = 'medium';
                                          }
                                          if ([30,31].includes(date)) {
                                            price = 520;
                                            avail = date === 31 ? 'low' : 'high';
                                          }
                                          
                                          return { 
                                            date, 
                                            price, 
                                            avail: isCurrent ? 'current' : avail,
                                            current: isCurrent
                                          };
                                        })
                                      },
                                      {
                                        name: 'APRIL',
                                        emptyStart: 1, // April 2025 starts on Tuesday (1 empty cell)
                                        days: [
                                          { date: 1, price: 520, avail: 'sold' },
                                          { date: 2, price: 520, avail: 'sold' },
                                          { date: 3, price: 480, avail: 'high' },
                                          { date: 4, price: 480, avail: 'high' },
                                          { date: 5, price: 480, avail: 'medium' },
                                          { date: 6, price: 480, avail: 'medium' },
                                          { date: 7, price: 450, avail: 'high' },
                                          { date: 8, price: 450, avail: 'high' },
                                          { date: 9, price: 450, avail: 'high' },
                                          { date: 10, price: 450, avail: 'high' },
                                          { date: 11, price: 450, avail: 'low' },
                                          { date: 12, price: 520, avail: 'medium' },
                                          { date: 13, price: 520, avail: 'high' },
                                          { date: 14, price: 480, avail: 'high' },
                                          { date: 15, price: 480, avail: 'high' },
                                          { date: 16, price: 450, avail: 'high' },
                                          { date: 17, price: 450, avail: 'high' },
                                          { date: 18, price: 450, avail: 'medium' },
                                          { date: 19, price: 480, avail: 'medium' },
                                          { date: 20, price: 480, avail: 'high' },
                                          { date: 21, price: 450, avail: 'high' },
                                          { date: 22, price: 450, avail: 'high' },
                                          { date: 23, price: 450, avail: 'high' },
                                          { date: 24, price: 450, avail: 'high' },
                                          { date: 25, price: 520, avail: 'medium' },
                                          { date: 26, price: 520, avail: 'low' },
                                          { date: 27, price: 480, avail: 'high' },
                                          { date: 28, price: 480, avail: 'high' },
                                          { date: 29, price: 450, avail: 'high' },
                                          { date: 30, price: 450, avail: 'high' }
                                        ]
                                      },
                                      {
                                        name: 'MAY',
                                        emptyStart: 3, // May 2025 starts on Thursday (3 empty cells)
                                        days: [
                                          { date: 1, price: 450, avail: 'high' },
                                          { date: 2, price: 450, avail: 'high' },
                                          { date: 3, price: 480, avail: 'medium' },
                                          { date: 4, price: 480, avail: 'high' },
                                          { date: 5, price: 450, avail: 'high' },
                                          { date: 6, price: 450, avail: 'high' },
                                          { date: 7, price: 450, avail: 'high' },
                                          { date: 8, price: 450, avail: 'high' },
                                          { date: 9, price: 450, avail: 'low' },
                                          { date: 10, price: 520, avail: 'medium' },
                                          { date: 11, price: 520, avail: 'high' },
                                          { date: 12, price: 480, avail: 'high' },
                                          { date: 13, price: 480, avail: 'high' },
                                          { date: 14, price: 450, avail: 'high' },
                                          { date: 15, price: 450, avail: 'high' },
                                          { date: 16, price: 450, avail: 'medium' },
                                          { date: 17, price: 480, avail: 'medium' },
                                          { date: 18, price: 480, avail: 'high' },
                                          { date: 19, price: 450, avail: 'high' },
                                          { date: 20, price: 450, avail: 'high' },
                                          { date: 21, price: 450, avail: 'high' },
                                          { date: 22, price: 450, avail: 'high' },
                                          { date: 23, price: 520, avail: 'low' },
                                          { date: 24, price: 520, avail: 'medium' },
                                          { date: 25, price: 480, avail: 'high' },
                                          { date: 26, price: 480, avail: 'sold' },
                                          { date: 27, price: 450, avail: 'high' },
                                          { date: 28, price: 450, avail: 'high' },
                                          { date: 29, price: 450, avail: 'high' },
                                          { date: 30, price: 450, avail: 'medium' },
                                          { date: 31, price: 520, avail: 'high' }
                                        ]
                                      },
                                      {
                                        name: 'JUNE',
                                        emptyStart: 6, // June 2025 starts on Sunday (6 empty cells)
                                        days: [
                                          { date: 1, price: 450, avail: 'high' },
                                          { date: 2, price: 450, avail: 'high' },
                                          { date: 3, price: 450, avail: 'high' },
                                          { date: 4, price: 450, avail: 'high' },
                                          { date: 5, price: 450, avail: 'medium' },
                                          { date: 6, price: 480, avail: 'medium' },
                                          { date: 7, price: 480, avail: 'high' },
                                          { date: 8, price: 480, avail: 'high' },
                                          { date: 9, price: 450, avail: 'high' },
                                          { date: 10, price: 450, avail: 'high' },
                                          { date: 11, price: 450, avail: 'high' },
                                          { date: 12, price: 450, avail: 'high' },
                                          { date: 13, price: 520, avail: 'low' },
                                          { date: 14, price: 520, avail: 'medium' },
                                          { date: 15, price: 480, avail: 'high' },
                                          { date: 16, price: 480, avail: 'high' },
                                          { date: 17, price: 450, avail: 'high' },
                                          { date: 18, price: 450, avail: 'high' },
                                          { date: 19, price: 450, avail: 'high' },
                                          { date: 20, price: 450, avail: 'medium' },
                                          { date: 21, price: 520, avail: 'medium' },
                                          { date: 22, price: 520, avail: 'high' },
                                          { date: 23, price: 480, avail: 'high' },
                                          { date: 24, price: 480, avail: 'high' },
                                          { date: 25, price: 450, avail: 'high' },
                                          { date: 26, price: 450, avail: 'high' },
                                          { date: 27, price: 450, avail: 'sold' },
                                          { date: 28, price: 450, avail: 'low' },
                                          { date: 29, price: 520, avail: 'medium' },
                                          { date: 30, price: 520, avail: 'high' }
                                        ]
                                      }
                                    ];
                                  
                                  return (
                                    <div style={{ marginTop: "4px" }}>
                                      <div style={{ 
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginBottom: "3px"
                                      }}>
                                        <div style={{ 
                                          fontSize: "7px", 
                                          color: "#86868b", 
                                          fontWeight: "600"
                                        }}>
                                          SELECT NEW DATES · LIVE AVAILABILITY
                                        </div>
                                        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                                          <button
                                            style={{
                                              fontSize: "8px",
                                              padding: "1px 4px",
                                              background: "#f5f5f7",
                                              border: "1px solid #e0e0e0",
                                              borderRadius: "2px",
                                              cursor: "pointer",
                                              color: "#1d1d1f",
                                              fontWeight: "600"
                                            }}
                                            onMouseOver={(e) => e.currentTarget.style.background = "#e0e0e0"}
                                            onMouseOut={(e) => e.currentTarget.style.background = "#f5f5f7"}
                                          >
                                            ‹
                                          </button>
                                          <div style={{ fontSize: "6px", color: "#6e6e73", fontWeight: "600" }}>
                                            MAR - JUN 2025
                                          </div>
                                          <button
                                            style={{
                                              fontSize: "8px",
                                              padding: "1px 4px",
                                              background: "#f5f5f7",
                                              border: "1px solid #e0e0e0",
                                              borderRadius: "2px",
                                              cursor: "pointer",
                                              color: "#1d1d1f",
                                              fontWeight: "600"
                                            }}
                                            onMouseOver={(e) => e.currentTarget.style.background = "#e0e0e0"}
                                            onMouseOut={(e) => e.currentTarget.style.background = "#f5f5f7"}
                                          >
                                            ›
                                          </button>
                                        </div>
                                      </div>
                                      <div style={{ display: "flex", gap: "4px" }}>
                                        {months.map((month, monthIdx) => (
                                          <div key={month.name} style={{ flex: 1 }}>
                                            <div style={{ 
                                              fontSize: "6px", 
                                              fontWeight: "700", 
                                              color: "#1d1d1f",
                                              marginBottom: "2px",
                                              textAlign: "center"
                                            }}>
                                              {month.name}
                                            </div>
                                            <div style={{ 
                                              display: "grid", 
                                              gridTemplateColumns: "repeat(7, 1fr)", 
                                              gap: "1px",
                                              marginBottom: "2px"
                                            }}>
                                              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                                                <div key={d} style={{ 
                                                  fontSize: "5px", 
                                                  color: "#86868b", 
                                                  textAlign: "center",
                                                  fontWeight: "600",
                                                  padding: "1px 0"
                                                }}>{d}</div>
                                              ))}
                                            </div>
                                            <div style={{ 
                                              display: "grid", 
                                              gridTemplateColumns: "repeat(7, 1fr)", 
                                              gap: "1px"
                                            }}>
                                              {/* Empty cells for alignment */}
                                              {[...Array(month.emptyStart)].map((_, i) => <div key={`empty-${i}`} />)}
                                              
                                              {month.days.map(day => {
                                          const bgColor = day.avail === 'sold' ? '#f5f5f7' : 
                                                         day.avail === 'low' ? '#fff3cd' : 
                                                         day.avail === 'medium' ? '#ffe5cc' :
                                                         day.avail === 'current' ? '#667eea' :
                                                         '#d4f5dd';
                                          const textColor = day.current ? '#ffffff' : 
                                                           day.avail === 'sold' ? '#d1d1d6' : '#1d1d1f';
                                          const cursor = day.avail === 'sold' ? 'not-allowed' : 'pointer';
                                          
                                          return (
                                            <div
                                              key={`${month.name}-${day.date}`}
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                if (day.avail !== 'sold') {
                                                  // First click = start date, second click = end date
                                                  if (!calendarStartDate) {
                                                    setCalendarStartDate(day.date);
                                                    setCalendarEndDate(null);
                                                  } else if (!calendarEndDate) {
                                                    if (day.date > calendarStartDate) {
                                                      setCalendarEndDate(day.date);
                                                    } else {
                                                      setCalendarStartDate(day.date);
                                                      setCalendarEndDate(null);
                                                    }
                                                  } else {
                                                    // Reset and start over
                                                    setCalendarStartDate(day.date);
                                                    setCalendarEndDate(null);
                                                  }
                                                }
                                              }}
                                              style={{
                                                background: bgColor,
                                                border: day.current ? '1.5px solid #667eea' : '0.5px solid #e0e0e0',
                                                borderRadius: "2px",
                                                padding: "1px 0px",
                                                textAlign: "center",
                                                cursor: cursor,
                                                position: "relative",
                                                transition: "all 0.15s",
                                                opacity: day.avail === 'sold' ? 0.5 : 1,
                                                minHeight: "18px",
                                                fontSize: "7px"
                                              }}
                                              onMouseOver={(e) => {
                                                if (day.avail !== 'sold') {
                                                  e.currentTarget.style.transform = 'scale(1.05)';
                                                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                                                }
                                              }}
                                              onMouseOut={(e) => {
                                                e.currentTarget.style.transform = 'scale(1)';
                                                e.currentTarget.style.boxShadow = 'none';
                                              }}
                                            >
                                              <div style={{ 
                                                fontSize: "7px", 
                                                fontWeight: day.current ? "700" : "600", 
                                                color: textColor,
                                                lineHeight: "1"
                                              }}>
                                                {day.date}
                                              </div>
                                              {!day.current && day.avail !== 'sold' && (
                                                <div style={{ 
                                                  fontSize: "4px", 
                                                  color: textColor === '#ffffff' ? textColor : '#6e6e73',
                                                  marginTop: "1px",
                                                  lineHeight: "1"
                                                }}>
                                                  ${day.price}
                                                </div>
                                              )}
                                              {day.avail === 'sold' && (
                                                <div style={{ 
                                                  fontSize: "4px", 
                                                  color: "#86868b",
                                                  marginTop: "1px",
                                                  fontWeight: "600",
                                                  lineHeight: "1"
                                                }}>
                                                  FULL
                                                </div>
                                              )}
                                            </div>
                                          );
                                        })}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                      <div style={{
                                        marginTop: "4px",
                                        display: "flex",
                                        gap: "4px",
                                        fontSize: "6px",
                                        color: "#6e6e73"
                                      }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                                          <div style={{ width: "6px", height: "6px", background: "#667eea", borderRadius: "1px" }} />
                                          <span>Current</span>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                                          <div style={{ width: "6px", height: "6px", background: "#d4f5dd", borderRadius: "1px" }} />
                                          <span>Available</span>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                                          <div style={{ width: "6px", height: "6px", background: "#ffe5cc", borderRadius: "1px" }} />
                                          <span>Limited</span>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                                          <div style={{ width: "6px", height: "6px", background: "#f5f5f7", borderRadius: "1px" }} />
                                          <span>Sold Out</span>
                                        </div>
                                      </div>
                                      
                                      {/* Confirmation Bar - Show when dates are selected or pill is clicked */}
                                      {!showPayment && (calendarStartDate || selectedPill === 'Extend +1' || selectedPill === 'Shorten -1' || selectedPill === 'Shift +3') && (
                                        <div style={{
                                          marginTop: "6px",
                                          padding: "6px 8px",
                                          background: "#f9f9fb",
                                          border: "1px solid #667eea",
                                          borderRadius: "4px",
                                          display: "flex",
                                          justifyContent: "space-between",
                                          alignItems: "center"
                                        }}>
                                          <div>
                                            <div style={{ fontSize: "8px", color: "#86868b", fontWeight: "600", marginBottom: "2px" }}>
                                              NEW DATES
                                            </div>
                                            <div style={{ fontSize: "10px", fontWeight: "600", color: "#1d1d1f" }}>
                                              Mar {startDate} - {endDate > 31 ? `Apr ${endDate - 31}` : endDate}
                                              <span style={{ 
                                                fontSize: "8px", 
                                                color: startDate === 22 && endDate === 27 ? "#6e6e73" : (endDate - startDate + 1) > 6 ? "#ff9500" : "#34c759",
                                                fontWeight: "600",
                                                marginLeft: "6px"
                                              }}>
                                                {startDate === 22 && endDate === 27 ? '(No change)' : (endDate - startDate + 1) > 6 ? `+$${(endDate - startDate + 1 - 6) * 450}` : `-$${(6 - (endDate - startDate + 1)) * 450}`}
                                              </span>
                                            </div>
                                            
                                            {/* Impact Details */}
                                            <div style={{ marginTop: "6px", paddingTop: "6px", borderTop: "1px solid #e0e0e0" }}>
                                              {/* Dependencies */}
                                              <div style={{ fontSize: "7px", marginBottom: "3px" }}>
                                                <span style={{ color: "#34c759", fontWeight: "600" }}>✓</span>
                                                <span style={{ color: "#1d1d1f", marginLeft: "3px" }}>Flight departure compatible</span>
                                              </div>
                                              {(endDate - startDate + 1) !== 6 && (
                                                <div style={{ fontSize: "7px", marginBottom: "3px" }}>
                                                  <span style={{ color: "#ff9500", fontWeight: "600" }}>⚠</span>
                                                  <span style={{ color: "#1d1d1f", marginLeft: "3px" }}>Airport transfer needs adjustment (+15min)</span>
                                                </div>
                                              )}
                                              <div style={{ fontSize: "7px", marginBottom: "3px" }}>
                                                <span style={{ color: "#34c759", fontWeight: "600" }}>✓</span>
                                                <span style={{ color: "#1d1d1f", marginLeft: "3px" }}>Free cancellation maintained (until Mar 15)</span>
                                              </div>
                                              
                                              {/* Total Impact */}
                                              <div style={{ 
                                                fontSize: "8px", 
                                                marginTop: "4px", 
                                                padding: "3px 5px", 
                                                background: "#f5f5f7",
                                                borderRadius: "3px",
                                                display: "flex",
                                                justifyContent: "space-between"
                                              }}>
                                                <span style={{ color: "#6e6e73" }}>Total trip:</span>
                                                <span style={{ fontWeight: "600", color: "#1d1d1f" }}>
                                                  $4,250 → ${4250 + (endDate - startDate + 1 - 6) * 450}
                                                </span>
                                              </div>
                                              
                                              {/* Booking & Sync */}
                                              <div style={{ fontSize: "7px", marginTop: "4px", color: "#6e6e73" }}>
                                                <div>Booking #HTL-2847 · Auto-sync to client itinerary</div>
                                              </div>
                                            </div>
                                          </div>
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setShowPayment(true);
                                              setConfirmingHotelIdx(-1); // Use -1 for date changes
                                            }}
                                            disabled={isConfirming}
                                            style={{
                                              fontSize: "9px",
                                              padding: "4px 10px",
                                              background: isConfirming ? "#34c759" : "#667eea",
                                              color: "#ffffff",
                                              border: "none",
                                              borderRadius: "4px",
                                              cursor: isConfirming ? "default" : "pointer",
                                              fontWeight: "600",
                                              display: "flex",
                                              alignItems: "center",
                                              gap: "4px",
                                              transition: "all 0.3s ease"
                                            }}
                                            onMouseOver={(e) => !isConfirming && (e.currentTarget.style.background = "#5566d9")}
                                            onMouseOut={(e) => !isConfirming && (e.currentTarget.style.background = "#667eea")}
                                          >
                                            {isConfirming ? (
                                              <>
                                                <div style={{
                                                  width: "8px",
                                                  height: "8px",
                                                  border: "2px solid #ffffff",
                                                  borderTopColor: "transparent",
                                                  borderRadius: "50%",
                                                  animation: "spin 0.6s linear infinite"
                                                }} />
                                                <span>Processing...</span>
                                              </>
                                            ) : (
                                              'Review & Pay'
                                            )}
                                          </button>
                                        </div>
                                      )}
                                      
                                      {/* Inline Payment Flow */}
                                      {showPayment && confirmingHotelIdx === -1 && (
                                        <div style={{
                                          marginTop: "8px",
                                          padding: "8px",
                                          background: "#ffffff",
                                          border: "2px solid #667eea",
                                          borderRadius: "6px",
                                          animation: "fadeIn 0.3s ease-out"
                                        }}>
                                          <div style={{ fontSize: "8px", color: "#86868b", fontWeight: "600", marginBottom: "6px" }}>
                                            PAYMENT METHOD
                                          </div>
                                          
                                          {/* Payment Options */}
                                          <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "8px" }}>
                                            {[
                                              { id: 'card', name: 'Credit Card', icon: '💳', subtitle: 'Visa ****4242 • Instant', color: '#667eea' },
                                              { id: 'apple', name: 'Apple Pay', icon: '', subtitle: 'Touch ID • Instant', color: '#000000' },
                                              { id: 'booking', name: 'On File', icon: '📋', subtitle: 'Corporate card on booking • No action', color: '#34c759' }
                                            ].map(method => (
                                              <div
                                                key={method.id}
                                                onClick={() => setSelectedPayment(method.id)}
                                                style={{
                                                  padding: "6px 8px",
                                                  background: selectedPayment === method.id ? '#f0f4ff' : '#fafafa',
                                                  border: '1px solid',
                                                  borderColor: selectedPayment === method.id ? method.color : '#e0e0e0',
                                                  borderRadius: "4px",
                                                  cursor: "pointer",
                                                  transition: "all 0.15s",
                                                  display: "flex",
                                                  alignItems: "center",
                                                  gap: "8px"
                                                }}
                                                onMouseOver={(e) => {
                                                  if (selectedPayment !== method.id) {
                                                    e.currentTarget.style.borderColor = method.color;
                                                  }
                                                }}
                                                onMouseOut={(e) => {
                                                  if (selectedPayment !== method.id) {
                                                    e.currentTarget.style.borderColor = '#e0e0e0';
                                                  }
                                                }}
                                              >
                                                <div style={{ fontSize: "16px" }}>{method.icon}</div>
                                                <div style={{ flex: 1 }}>
                                                  <div style={{ fontSize: "9px", fontWeight: "600", color: "#1d1d1f" }}>
                                                    {method.name}
                                                  </div>
                                                  <div style={{ fontSize: "7px", color: "#6e6e73" }}>
                                                    {method.subtitle}
                                                  </div>
                                                </div>
                                                {selectedPayment === method.id && (
                                                  <div style={{ fontSize: "12px", color: method.color }}>✓</div>
                                                )}
                                              </div>
                                            ))}
                                          </div>
                                          
                                          {/* Payment Summary */}
                                          <div style={{
                                            padding: "6px 8px",
                                            background: "#f9f9fb",
                                            borderRadius: "4px",
                                            marginBottom: "6px",
                                            fontSize: "7px",
                                            color: "#6e6e73"
                                          }}>
                                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
                                              <span>Original booking:</span>
                                              <span>$4,250</span>
                                            </div>
                                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
                                              <span>Amendment charge:</span>
                                              <span style={{ color: (endDate - startDate + 1) > 6 ? "#ff9500" : "#34c759" }}>
                                                {(endDate - startDate + 1) > 6 ? `+$${(endDate - startDate + 1 - 6) * 450}` : `-$${(6 - (endDate - startDate + 1)) * 450}`}
                                              </span>
                                            </div>
                                            <div style={{ 
                                              display: "flex", 
                                              justifyContent: "space-between", 
                                              paddingTop: "4px",
                                              borderTop: "1px solid #e0e0e0",
                                              fontWeight: "600",
                                              color: "#1d1d1f",
                                              fontSize: "8px"
                                            }}>
                                              <span>Total due now:</span>
                                              <span>${Math.abs((endDate - startDate + 1 - 6) * 450)}</span>
                                            </div>
                                          </div>
                                          
                                          {/* Action Buttons */}
                                          <div style={{ display: "flex", gap: "4px" }}>
                                            <button
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                setShowPayment(false);
                                                setSelectedPayment(null);
                                              }}
                                              style={{
                                                flex: 1,
                                                fontSize: "8px",
                                                padding: "4px",
                                                background: "#ffffff",
                                                color: "#6e6e73",
                                                border: "1px solid #e0e0e0",
                                                borderRadius: "3px",
                                                cursor: "pointer",
                                                fontWeight: "600"
                                              }}
                                              onMouseOver={(e) => e.currentTarget.style.background = "#f5f5f7"}
                                              onMouseOut={(e) => e.currentTarget.style.background = "#ffffff"}
                                            >
                                              Cancel
                                            </button>
                                            <button
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                setShowPayment(false);
                                                setIsConfirming(true);
                                                setTimeout(() => {
                                                  setIsConfirming(false);
                                                  setTimeout(() => {
                                                    setShowDreamFlow(false);
                                                    setConfirmingHotelIdx(null);
                                                    setSelectedPayment(null);
                                                  }, 2000);
                                                }, 2500);
                                              }}
                                              disabled={!selectedPayment}
                                              style={{
                                                flex: 2,
                                                fontSize: "9px",
                                                padding: "4px 10px",
                                                background: selectedPayment ? "#667eea" : "#d1d1d6",
                                                color: "#ffffff",
                                                border: "none",
                                                borderRadius: "4px",
                                                cursor: selectedPayment ? "pointer" : "not-allowed",
                                                fontWeight: "600"
                                              }}
                                              onMouseOver={(e) => selectedPayment && (e.currentTarget.style.background = "#5566d9")}
                                              onMouseOut={(e) => selectedPayment && (e.currentTarget.style.background = "#667eea")}
                                            >
                                              {selectedPayment === 'apple' ? 'Pay with ' : ''}Confirm & Pay
                                            </button>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  );
                                  }
                                  
                                  return hotels.map((hotel, idx) => (
                                  <div
                                    key={hotel.roomKey || idx}
                                    style={{
                                      padding: "4px 5px",
                                      background: "#fafafa",
                                      border: "1px solid #e0e0e0",
                                      borderRadius: "3px",
                                      marginBottom: "2px",
                                      transition: "all 0.15s",
                                      animation: `fadeIn 0.4s ease-out ${idx * 0.1}s both`,
                                      position: "relative",
                                      overflow: "hidden"
                                    }}
                                    onMouseOver={(e) => {
                                      e.currentTarget.style.borderColor = "#667eea";
                                    }}
                                    onMouseOut={(e) => {
                                      e.currentTarget.style.borderColor = "#e0e0e0";
                                    }}
                                  >
                                    {/* SOLD OUT Overlay Animation */}
                                    {hotel.roomKey && soldOutRooms[hotel.roomKey] && (
                                      <div style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        background: "rgba(255, 59, 48, 0.95)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        zIndex: 10,
                                        animation: "slideInLeft 0.3s ease-out",
                                        borderRadius: "6px"
                                      }}>
                                        <div style={{
                                          fontSize: "16px",
                                          fontWeight: "900",
                                          color: "#ffffff",
                                          letterSpacing: "2px",
                                          animation: "pulse 0.5s infinite"
                                        }}>
                                          SOLD OUT
                                        </div>
                                      </div>
                                    )}
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "6px" }}>
                                      <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "1px" }}>
                                          <div style={{ fontSize: "9px", fontWeight: "600", color: "#1d1d1f" }}>
                                            {hotel.name}
                                          </div>
                                          {hotel.source && (
                                            <span style={{
                                              fontSize: "6px",
                                              padding: "1px 3px",
                                              background: "#f5f5f7",
                                              color: "#86868b",
                                              borderRadius: "2px",
                                              fontWeight: "600",
                                              whiteSpace: "nowrap"
                                            }}>
                                              {hotel.source}
                                            </span>
                                          )}
                                        </div>
                                        <div style={{ fontSize: "7px", color: "#86868b" }}>
                                          {hotel.features ? hotel.features.join(' · ') : (hotel.type || `${hotel.match}% match`)}
                                        </div>
                                        <div style={{ fontSize: "7px", color: "#86868b", marginTop: "2px", display: "flex", alignItems: "center", gap: "3px" }}>
                                          {inventoryChange[hotel.roomKey] && (
                                            <span style={{
                                              fontSize: "8px",
                                              fontWeight: "900",
                                              color: inventoryChange[hotel.roomKey] === 'up' ? "#34c759" : "#ff3b30"
                                            }}>
                                              {inventoryChange[hotel.roomKey] === 'up' ? '▲' : '▼'}
                                            </span>
                                          )}
                                          <span style={{
                                            fontSize: "7px",
                                            color: hotel.available && hotel.available.includes('1 ') ? "#ff3b30" : hotel.available && hotel.available.includes('2 ') ? "#ff9500" : "#34c759",
                                            fontWeight: "600"
                                          }}>
                                            {hotel.available || ''}
                                          </span>
                                          {hotel.lastBooked && (
                                            <>
                                              <span style={{ color: "#d1d1d6" }}>·</span>
                                              <span>Last booked {hotel.lastBooked}</span>
                                            </>
                                          )}
                                        </div>
                                      </div>
                                      <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
                                        <div style={{ textAlign: "right" }}>
                                          <div style={{ fontSize: "10px", fontWeight: "600", color: "#1d1d1f" }}>
                                            {hotel.price}
                                          </div>
                                          {hotel.priceNum && hotel.currentPrice && hotel.nights && (
                                            <div style={{ 
                                              fontSize: "7px", 
                                              color: hotel.priceNum > hotel.currentPrice ? "#ff9500" : "#34c759",
                                              fontWeight: "600"
                                            }}>
                                              {hotel.priceNum > hotel.currentPrice ? '+' : ''}{hotel.priceNum - hotel.currentPrice > 0 ? '+$' : '-$'}{Math.abs((hotel.priceNum - hotel.currentPrice) * hotel.nights)}
                                            </div>
                                          )}
                                        </div>
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedHotel(hotel);
                                            setConfirmingHotelIdx(idx);
                                            setShowPayment(true);
                                          }}
                                          disabled={confirmingHotelIdx === idx && !showPayment}
                                          style={{
                                            fontSize: "8px",
                                            padding: "2px 6px",
                                            background: confirmingHotelIdx === idx && !showPayment ? "#34c759" : "#667eea",
                                            color: "#ffffff",
                                            border: "none",
                                            borderRadius: "3px",
                                            cursor: confirmingHotelIdx === idx && !showPayment ? "default" : "pointer",
                                            fontWeight: "600",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "3px",
                                            transition: "all 0.3s ease"
                                          }}
                                          onMouseOver={(e) => !(confirmingHotelIdx === idx && !showPayment) && (e.currentTarget.style.background = "#5566d9")}
                                          onMouseOut={(e) => !(confirmingHotelIdx === idx && !showPayment) && (e.currentTarget.style.background = "#667eea")}
                                        >
                                          {confirmingHotelIdx === idx && !showPayment ? (
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
                                  ));
                                })()}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        )}

        {/* DREAM FLOW - Renders inline in shell card above, not as separate view */}
        {false && showDreamFlow && selectedShell && (
          <div style={{ flex: 1, overflow: "auto", padding: "16px", background: "#fafafa" }}>
            <div style={{ maxWidth: "700px", margin: "0 auto" }}>
              
              {/* Current Shell Reference */}
              <div style={{
                padding: "10px 12px",
                background: "#ffffff",
                border: "1px solid #d0d0d0",
                borderRadius: "8px",
                marginBottom: "12px",
                display: "flex",
                alignItems: "center",
                gap: "10px"
              }}>
                <div style={{ fontSize: "16px" }}>{selectedShell.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "11px", fontWeight: "600", color: "#6e6e73", textTransform: "uppercase", marginBottom: "2px" }}>
                    Amending
                  </div>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "#1d1d1f" }}>
                    {selectedShell.name}
                  </div>
                </div>
                <div style={{
                  fontSize: "10px",
                  padding: "3px 8px",
                  background: "#34c759",
                  color: "#ffffff",
                  borderRadius: "4px",
                  fontWeight: "600"
                }}>
                  {selectedShell.status}
                </div>
              </div>

              {/* AI Assistant Bar */}
              <div
                onClick={() => setDreamFlowExpanded(!dreamFlowExpanded)}
                style={{
                  background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
                  borderRadius: "8px",
                  padding: "12px",
                  cursor: "pointer",
                  position: "relative",
                  marginBottom: dreamFlowExpanded ? "12px" : "12px",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  boxShadow: dreamFlowExpanded ? "0 4px 16px rgba(250, 112, 154, 0.3)" : "0 2px 8px rgba(250, 112, 154, 0.2)",
                  animation: "fadeIn 0.5s ease-out"
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
                {/* Future Badge */}
                <div style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  background: "rgba(255,255,255,0.25)",
                  backdropFilter: "blur(10px)",
                  padding: "3px 8px",
                  borderRadius: "12px",
                  fontSize: "9px",
                  fontWeight: "600",
                  color: "#ffffff",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}>
                  🔮 FUTURE
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px", position: "relative", zIndex: 1 }}>
                  <div style={{ 
                    fontSize: "18px",
                    animation: "pulse 2s ease-in-out infinite",
                    filter: "drop-shadow(0 0 8px rgba(255,255,255,0.5))"
                  }}>🤖</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "13px", fontWeight: "600", color: "#ffffff", marginBottom: "3px" }}>
                      Natural Language Amendment
                    </div>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.9)" }}>
                      {dreamFlowExpanded ? "Tell us what you want to change..." : "✨ AI-powered smart amendments"}
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
                  {/* Natural Language Input */}
                  <div style={{
                    background: "#ffffff",
                    border: "1px solid #d0d0d0",
                    borderRadius: "8px",
                    padding: "12px",
                    marginBottom: "10px"
                  }}>
                    <textarea
                      value={nlInput}
                      onChange={(e) => setNlInput(e.target.value)}
                      placeholder="e.g., 'Change to 5-star beachfront hotel with pool'"
                      style={{
                        width: "100%",
                        minHeight: "60px",
                        padding: "8px 10px",
                        fontSize: "13px",
                        border: "1px solid #d0d0d0",
                        borderRadius: "6px",
                        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                        resize: "vertical",
                        boxSizing: "border-box",
                        marginBottom: "8px"
                      }}
                    />
                    <button
                      onClick={() => {}}
                      style={{
                        padding: "6px 14px",
                        fontSize: "13px",
                        fontWeight: "500",
                        color: "#ffffff",
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer"
                      }}
                    >
                      ✨ Find Smart Options
                    </button>
                  </div>

                  {/* Quick Examples */}
                  <div style={{
                    background: "#f5f5f7",
                    borderRadius: "8px",
                    padding: "10px 12px",
                    marginBottom: "10px"
                  }}>
                    <div style={{ fontSize: "11px", fontWeight: "600", color: "#1d1d1f", marginBottom: "6px" }}>
                      💡 Try: 
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                      {["Upgrade to luxury", "Cheaper alternative", "Beachfront property"].map((ex, idx) => (
                        <button
                          key={idx}
                          onClick={() => setNlInput(ex)}
                          style={{
                            fontSize: "10px",
                            padding: "4px 8px",
                            background: "#ffffff",
                            border: "1px solid #d0d0d0",
                            borderRadius: "4px",
                            color: "#667eea",
                            cursor: "pointer",
                            fontWeight: "500"
                          }}
                        >
                          "{ex}"
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Technical Constraints */}
                  <div style={{
                    background: "#fff3cd",
                    border: "1px solid #ffc107",
                    borderRadius: "6px",
                    padding: "8px 10px"
                  }}>
                    <div style={{ fontSize: "10px", color: "#856404", lineHeight: "1.5" }}>
                      <strong>⚠️ Why not built:</strong> No NLP/AI infrastructure, complex cross-system dependencies, real-time availability requirements
                    </div>
                  </div>

                  {/* Close Dream Flow Button */}
                  <button
                    onClick={() => setShowDreamFlow(false)}
                    style={{
                      marginTop: "10px",
                      width: "100%",
                      padding: "6px 14px",
                      fontSize: "12px",
                      fontWeight: "500",
                      color: "#6e6e73",
                      background: "#f8f9fa",
                      border: "1px solid #d0d0d0",
                      borderRadius: "6px",
                      cursor: "pointer"
                    }}
                  >
                    Close Dream Flow
                  </button>
                </div>
              )}

            </div>
          </div>
        )}

        {/* Search Results View */}
        {showSearchResults && (
          <div style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            background: "#f5f5f7",
            overflow: "hidden"
          }}>
            {/* Header */}
            <div style={{
              background: "#ffffff",
              borderBottom: "1px solid #e0e0e0",
              padding: "14px 20px",
              flexShrink: 0
            }}>
              {/* Breadcrumb Steps */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {[
                  { label: "Search", active: true },
                  { label: "Review", active: false },
                  { label: "Travellers", active: false },
                  { label: "Payment", active: false }
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
                        fontWeight: "600"
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

            {/* Results Container */}
            <div style={{
              flex: 1,
              overflow: "auto"
            }}>
              <div style={{ maxWidth: "900px", margin: "0 auto", padding: "16px" }}>
                <p style={{ fontSize: "14px", color: "#6e6e73", marginBottom: "20px" }}>
                  Found 8 available hotels
                </p>

                {/* Hotel Results */}
                {[
                  { name: "Hilton Hawaiian Village", price: "$289", rating: "4.5", reviews: "2,341", image: "🏨" },
                  { name: "Royal Hawaiian Resort", price: "$425", rating: "4.7", reviews: "1,892", image: "🏨" },
                  { name: "Moana Surfrider", price: "$350", rating: "4.6", reviews: "1,567", image: "🏨" },
                  { name: "Sheraton Waikiki", price: "$315", rating: "4.4", reviews: "3,112", image: "🏨" },
                  { name: "Hyatt Regency Waikiki", price: "$298", rating: "4.5", reviews: "2,789", image: "🏨" },
                  { name: "Outrigger Reef Waikiki", price: "$275", rating: "4.3", reviews: "1,456", image: "🏨" },
                  { name: "Alohilani Resort", price: "$340", rating: "4.6", reviews: "987", image: "🏨" },
                  { name: "The Laylow", price: "$265", rating: "4.4", reviews: "654", image: "🏨" }
                ].map((hotel, index) => (
                  <div key={index} style={{
                    background: "#ffffff",
                    borderRadius: "8px",
                    padding: "16px",
                    marginBottom: "12px",
                    display: "flex",
                    gap: "16px",
                    border: "1px solid #e0e0e0"
                  }}>
                    {/* Hotel Image Placeholder */}
                    <div style={{
                      width: "120px",
                      height: "90px",
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "24px",
                      flexShrink: 0
                    }}>
                      {hotel.image}
                    </div>

                    {/* Hotel Details */}
                    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                      <h3 style={{ fontSize: "14px", fontWeight: "600", margin: "0 0 4px 0", color: "#1d1d1f" }}>
                        {hotel.name}
                      </h3>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                        <span style={{ fontSize: "13px", color: "#f5a623" }}>★ {hotel.rating}</span>
                        <span style={{ fontSize: "12px", color: "#6e6e73" }}>({hotel.reviews} reviews)</span>
                      </div>
                      <p style={{ fontSize: "12px", color: "#6e6e73", margin: "0 0 8px 0" }}>
                        Waikiki Beach · Free WiFi · Pool · Ocean View
                      </p>
                      <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div>
                          <span style={{ fontSize: "12px", color: "#6e6e73" }}>From </span>
                          <span style={{ fontSize: "16px", fontWeight: "600", color: "#1d1d1f" }}>{hotel.price}</span>
                          <span style={{ fontSize: "12px", color: "#6e6e73" }}> /night</span>
                        </div>
                        <button 
                          onClick={() => setSelectedHotel(hotel)}
                          style={{
                            padding: "8px 20px",
                            fontSize: "13px",
                            fontWeight: "500",
                            color: "#ffffff",
                            background: "#0071e3",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer"
                          }}
                        >
                          Select Room
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Bar - Shows when hotel selected */}
            {selectedHotel && (
              <div style={{
                background: "#ffffff",
                borderTop: "2px solid #e0e0e0",
                padding: "14px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: "0 -4px 12px rgba(0,0,0,0.1)"
              }}>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: "600", color: "#1d1d1f", marginBottom: "2px" }}>
                    {selectedHotel.name}
                  </div>
                  <div style={{ fontSize: "12px", color: "#6e6e73" }}>
                    5 nights · 2 rooms
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "12px", color: "#6e6e73" }}>Total Price</div>
                    <div style={{ fontSize: "16px", fontWeight: "600", color: "#1d1d1f" }}>
                      ${parseInt(selectedHotel.price.replace('$', '')) * 5}
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      showLoadingThen('Preparing your booking details...', () => {
                        setShowSearchResults(false);
                        setShowCartPage(true);
                      }, 4000);
                    }}
                    style={{
                      padding: "12px 32px",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#ffffff",
                      background: "#34c759",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      boxShadow: "0 2px 8px rgba(52, 199, 89, 0.3)"
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Cart Page View */}
        {showCartPage && (
          <div style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            background: "#f5f5f7",
            overflow: "hidden"
          }}>
            {/* Header */}
            <div style={{
              background: "#ffffff",
              borderBottom: "1px solid #e0e0e0",
              padding: "14px 20px",
              flexShrink: 0
            }}>
              {/* Breadcrumb Steps */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {[
                  { label: "Search", active: false, completed: true },
                  { label: "Review", active: true, completed: false },
                  { label: "Travellers", active: false, completed: false },
                  { label: "Payment", active: false, completed: false }
                ].map((step, index, array) => (
                  <React.Fragment key={index}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      background: step.active ? "#e3f2fd" : "transparent",
                      color: step.active ? "#0071e3" : step.completed ? "#34c759" : "#6e6e73",
                      fontSize: "13px",
                      fontWeight: step.active ? "600" : "400"
                    }}>
                      <span style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background: step.active ? "#0071e3" : step.completed ? "#34c759" : "#d0d0d0",
                        color: "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "11px",
                        fontWeight: "600"
                      }}>
                        {step.completed ? "✓" : index + 1}
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

            {/* Cart Content */}
            <div style={{
              flex: 1,
              overflow: "auto"
            }}>
              <div style={{ maxWidth: "800px", margin: "0 auto", padding: "16px" }}>
                
                {/* Selected Hotel Card */}
                <div style={{
                  background: "#ffffff",
                  borderRadius: "10px",
                  padding: "16px",
                  marginBottom: "20px",
                  border: "1px solid #e0e0e0"
                }}>
                  <h3 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 16px 0", color: "#1d1d1f" }}>
                    New Hotel Selection
                  </h3>
                  <div style={{ display: "flex", gap: "16px", paddingBottom: "16px", borderBottom: "1px solid #f0f0f0" }}>
                    <div style={{
                      width: "100px",
                      height: "75px",
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                      flexShrink: 0
                    }}>
                      {selectedHotel.image}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: "14px", fontWeight: "600", margin: "0 0 4px 0", color: "#1d1d1f" }}>
                        {selectedHotel.name}
                      </h4>
                      <div style={{ fontSize: "13px", color: "#6e6e73", marginBottom: "4px" }}>
                        ★ {selectedHotel.rating} ({selectedHotel.reviews} reviews)
                      </div>
                      <div style={{ fontSize: "13px", color: "#6e6e73" }}>
                        May 15-20, 2024 · 5 nights · 2 rooms
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "16px", fontWeight: "600", color: "#1d1d1f" }}>
                        ${parseInt(selectedHotel.price.replace('$', '')) * 5}
                      </div>
                      <div style={{ fontSize: "12px", color: "#6e6e73" }}>
                        {selectedHotel.price}/night
                      </div>
                    </div>
                  </div>
                  
                  {/* Price Breakdown */}
                  <div style={{ marginTop: "16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#6e6e73", marginBottom: "8px" }}>
                      <span>{selectedHotel.price} × 5 nights × 2 rooms</span>
                      <span>${parseInt(selectedHotel.price.replace('$', '')) * 5 * 2}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#6e6e73", marginBottom: "8px" }}>
                      <span>Taxes & fees</span>
                      <span>${Math.round(parseInt(selectedHotel.price.replace('$', '')) * 5 * 2 * 0.12)}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#ff3b30", marginBottom: "12px" }}>
                      <span>Amendment fee</span>
                      <span>$45</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: "600", color: "#1d1d1f", paddingTop: "12px", borderTop: "2px solid #e0e0e0" }}>
                      <span>Total</span>
                      <span>${parseInt(selectedHotel.price.replace('$', '')) * 5 * 2 + Math.round(parseInt(selectedHotel.price.replace('$', '')) * 5 * 2 * 0.12) + 45}</span>
                    </div>
                  </div>
                </div>

                {/* Travellers Summary */}
                <div style={{
                  background: "#ffffff",
                  borderRadius: "10px",
                  padding: "16px",
                  marginBottom: "20px",
                  border: "1px solid #e0e0e0"
                }}>
                  <h3 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 12px 0", color: "#1d1d1f" }}>
                    Travellers (2 selected)
                  </h3>
                  <div style={{ fontSize: "13px", color: "#6e6e73" }}>
                    • John Smith<br/>
                    • Sarah Smith
                  </div>
                </div>

                {/* Amendment Summary */}
                <div style={{
                  background: "#ffffff",
                  borderRadius: "10px",
                  padding: "16px",
                  border: "1px solid #e0e0e0"
                }}>
                  <h3 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 12px 0", color: "#1d1d1f" }}>
                    Amendment Details
                  </h3>
                  <div style={{ fontSize: "13px", color: "#6e6e73", lineHeight: "1.6" }}>
                    <strong>Reason:</strong> Found better accommodation<br/>
                    <strong>Type:</strong> Client request<br/>
                    <strong>Amendment fee:</strong> $45
                  </div>
                </div>
              </div>
            </div>

            {/* Footer with Checkout Button */}
            <div style={{
              background: "#ffffff",
              borderTop: "2px solid #e0e0e0",
              padding: "20px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 -4px 12px rgba(0,0,0,0.1)"
            }}>
              <div>
                <div style={{ fontSize: "12px", color: "#6e6e73", marginBottom: "2px" }}>
                  Total Amount
                </div>
                <div style={{ fontSize: "16px", fontWeight: "600", color: "#1d1d1f" }}>
                  ${selectedHotel && parseInt(selectedHotel.price.replace('$', '')) * 5 * 2 + Math.round(parseInt(selectedHotel.price.replace('$', '')) * 5 * 2 * 0.12) + 45}
                </div>
              </div>
              <button 
                onClick={() => {
                  showLoadingThen('Loading traveller information...', () => {
                    setShowCartPage(false);
                    setShowTravellersPage(true);
                  }, 3500);
                }}
                style={{
                  padding: "14px 40px",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#ffffff",
                  background: "#0071e3",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(0, 113, 227, 0.3)"
                }}
              >
                Proceed to Travellers →
              </button>
            </div>
          </div>
        )}

        {/* Travellers Page */}
        {showTravellersPage && (
          <div style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            background: "#f5f5f7",
            overflow: "hidden"
          }}>
            <div style={{
              background: "#ffffff",
              borderBottom: "1px solid #e0e0e0",
              padding: "14px 20px",
              flexShrink: 0
            }}>
              {/* Breadcrumb Steps */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {[
                  { label: "Search", active: false, completed: true },
                  { label: "Review", active: false, completed: true },
                  { label: "Travellers", active: true, completed: false },
                  { label: "Payment", active: false, completed: false }
                ].map((step, index, array) => (
                  <React.Fragment key={index}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      background: step.active ? "#e3f2fd" : "transparent",
                      color: step.active ? "#0071e3" : step.completed ? "#34c759" : "#6e6e73",
                      fontSize: "13px",
                      fontWeight: step.active ? "600" : "400"
                    }}>
                      <span style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background: step.active ? "#0071e3" : step.completed ? "#34c759" : "#d0d0d0",
                        color: "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "11px",
                        fontWeight: "600"
                      }}>
                        {step.completed ? "✓" : index + 1}
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
              <div style={{ maxWidth: "700px", margin: "0 auto", padding: "16px" }}>
                {[
                  { name: "John Smith", email: "john@example.com", passport: "US123456" },
                  { name: "Sarah Smith", email: "sarah@example.com", passport: "US789012" }
                ].map((traveller, index) => (
                  <div key={index} style={{
                    background: "#ffffff",
                    borderRadius: "10px",
                    padding: "16px",
                    marginBottom: "16px",
                    border: "1px solid #e0e0e0"
                  }}>
                    <h3 style={{ fontSize: "14px", fontWeight: "600", margin: "0 0 12px 0", color: "#1d1d1f" }}>
                      Traveller {index + 1}
                    </h3>
                    <div style={{ fontSize: "13px", color: "#6e6e73", lineHeight: "1.8" }}>
                      <strong>Name:</strong> {traveller.name}<br/>
                      <strong>Email:</strong> {traveller.email}<br/>
                      <strong>Passport:</strong> {traveller.passport}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              background: "#ffffff",
              borderTop: "2px solid #e0e0e0",
              padding: "20px 24px",
              display: "flex",
              justifyContent: "flex-end",
              boxShadow: "0 -4px 12px rgba(0,0,0,0.1)"
            }}>
              <button 
                onClick={() => {
                  showLoadingThen('Loading payment form...', () => {
                    setShowTravellersPage(false);
                    setShowPaymentPage(true);
                  }, 3800);
                }}
                style={{
                  padding: "14px 40px",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#ffffff",
                  background: "#0071e3",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(0, 113, 227, 0.3)"
                }}
              >
                Go to Payment →
              </button>
            </div>
          </div>
        )}

        {/* Payment Page */}
        {showPaymentPage && (
          <div style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            background: "#f5f5f7",
            overflow: "hidden"
          }}>
            <div style={{
              background: "#ffffff",
              borderBottom: "1px solid #e0e0e0",
              padding: "14px 20px",
              flexShrink: 0
            }}>
              {/* Breadcrumb Steps */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {[
                  { label: "Search", active: false, completed: true },
                  { label: "Review", active: false, completed: true },
                  { label: "Travellers", active: false, completed: true },
                  { label: "Payment", active: true, completed: false }
                ].map((step, index, array) => (
                  <React.Fragment key={index}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      background: step.active ? "#e3f2fd" : "transparent",
                      color: step.active ? "#0071e3" : step.completed ? "#34c759" : "#6e6e73",
                      fontSize: "13px",
                      fontWeight: step.active ? "600" : "400"
                    }}>
                      <span style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background: step.active ? "#0071e3" : step.completed ? "#34c759" : "#d0d0d0",
                        color: "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "11px",
                        fontWeight: "600"
                      }}>
                        {step.completed ? "✓" : index + 1}
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
              <div style={{ maxWidth: "600px", margin: "0 auto", padding: "16px" }}>
                <div style={{
                  background: "#ffffff",
                  borderRadius: "10px",
                  padding: "16px",
                  border: "1px solid #e0e0e0"
                }}>
                  <h3 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 20px 0", color: "#1d1d1f" }}>
                    Credit Card Details
                  </h3>
                  
                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px", color: "#1d1d1f" }}>
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      style={{
                        width: "100%",
                        padding: "8px 10px",
                        fontSize: "14px",
                        border: "1px solid #d0d0d0",
                        borderRadius: "6px",
                        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                        boxSizing: "border-box"
                      }}
                    />
                  </div>

                  <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px", color: "#1d1d1f" }}>
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        style={{
                          width: "100%",
                          padding: "8px 10px",
                          fontSize: "14px",
                          border: "1px solid #d0d0d0",
                          borderRadius: "6px",
                          fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                          boxSizing: "border-box"
                        }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px", color: "#1d1d1f" }}>
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        style={{
                          width: "100%",
                          padding: "8px 10px",
                          fontSize: "14px",
                          border: "1px solid #d0d0d0",
                          borderRadius: "6px",
                          fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                          boxSizing: "border-box"
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px", color: "#1d1d1f" }}>
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Smith"
                      style={{
                        width: "100%",
                        padding: "8px 10px",
                        fontSize: "14px",
                        border: "1px solid #d0d0d0",
                        borderRadius: "6px",
                        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                        boxSizing: "border-box"
                      }}
                    />
                  </div>
                </div>

                <div style={{
                  background: "#ffffff",
                  borderRadius: "10px",
                  padding: "16px",
                  marginTop: "20px",
                  border: "1px solid #e0e0e0"
                }}>
                  <h3 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 12px 0", color: "#1d1d1f" }}>
                    Payment Summary
                  </h3>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#6e6e73", marginBottom: "8px" }}>
                    <span>Hotel booking</span>
                    <span>${selectedHotel && parseInt(selectedHotel.price.replace('$', '')) * 5 * 2}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#6e6e73", marginBottom: "8px" }}>
                    <span>Taxes & fees</span>
                    <span>${selectedHotel && Math.round(parseInt(selectedHotel.price.replace('$', '')) * 5 * 2 * 0.12)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#ff3b30", marginBottom: "12px" }}>
                    <span>Amendment fee</span>
                    <span>$45</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: "600", color: "#1d1d1f", paddingTop: "12px", borderTop: "2px solid #e0e0e0" }}>
                    <span>Total Due</span>
                    <span>${selectedHotel && parseInt(selectedHotel.price.replace('$', '')) * 5 * 2 + Math.round(parseInt(selectedHotel.price.replace('$', '')) * 5 * 2 * 0.12) + 45}</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              background: "#ffffff",
              borderTop: "2px solid #e0e0e0",
              padding: "20px 24px",
              display: "flex",
              justifyContent: "flex-end",
              boxShadow: "0 -4px 12px rgba(0,0,0,0.1)"
            }}>
              <button 
                onClick={() => {
                  showLoadingThen('Processing payment and updating booking...', () => {
                    setShowPaymentPage(false);
                    setHotelAmended(true);
                    setActiveTab('itinerary');
                    setShowSuccessToast(true);
                    setTimeout(() => setShowSuccessToast(false), 4000);
                  }, 7000);
                }}
                style={{
                  padding: "14px 40px",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#ffffff",
                  background: "#34c759",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(52, 199, 89, 0.3)"
                }}
              >
                Confirm Payment ✓
              </button>
            </div>
          </div>
        )}

        {/* NEW FLOW - Step 1: Combined Amendment + Travellers + Search */}
        {showNewFlow && newFlowStep === 1 && (
          <div style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            background: "#f5f5f7",
            overflow: "hidden"
          }}>
            <div style={{
              background: "#ffffff",
              borderBottom: "1px solid #e0e0e0",
              padding: "14px 20px",
              flexShrink: 0
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {[
                  { label: "Details", active: true },
                  { label: "Select Hotel", active: false },
                  { label: "Checkout", active: false }
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
                        fontWeight: "600"
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
              <div style={{ maxWidth: "800px", margin: "0 auto", padding: "16px" }}>
                
                {/* Amendment Fee Notice */}
                <div style={{
                  background: "#fff8e1",
                  border: "1px solid #ffc107",
                  borderRadius: "8px",
                  padding: "16px",
                  marginBottom: "20px"
                }}>
                  <div style={{ fontSize: "14px", color: "#856404", marginBottom: "4px" }}>
                    <strong>Amendment Fee:</strong> $45
                  </div>
                  <div style={{ fontSize: "13px", color: "#856404" }}>
                    This fee covers the cost of modifying your existing booking
                  </div>
                </div>

                {/* Travellers Section */}
                <div style={{
                  background: "#ffffff",
                  borderRadius: "10px",
                  padding: "16px",
                  marginBottom: "20px",
                  border: "1px solid #e0e0e0"
                }}>
                  <h3 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 16px 0", color: "#1d1d1f" }}>
                    Select Travellers
                  </h3>
                  {[
                    { name: "John Smith", email: "john@example.com" },
                    { name: "Sarah Smith", email: "sarah@example.com" },
                    { name: "Emily Smith", email: "emily@example.com" },
                    { name: "Michael Smith", email: "michael@example.com" }
                  ].map((traveller, index) => (
                    <label key={index} style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "8px 10px",
                      marginBottom: "8px",
                      border: "1px solid #e0e0e0",
                      borderRadius: "6px",
                      cursor: "pointer",
                      background: index < 2 ? "#f0f8ff" : "transparent"
                    }}>
                      <input
                        type="checkbox"
                        defaultChecked={index < 2}
                        style={{ marginRight: "12px", width: "18px", height: "18px" }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "14px", fontWeight: "500", color: "#1d1d1f" }}>
                          {traveller.name}
                        </div>
                        <div style={{ fontSize: "12px", color: "#6e6e73" }}>
                          {traveller.email}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Search Parameters */}
                <div style={{
                  background: "#ffffff",
                  borderRadius: "10px",
                  padding: "16px",
                  border: "1px solid #e0e0e0"
                }}>
                  <h3 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 16px 0", color: "#1d1d1f" }}>
                    Search Parameters
                  </h3>
                  
                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px", color: "#1d1d1f" }}>
                      Destination
                    </label>
                    <input
                      type="text"
                      defaultValue="Honolulu, Hawaii"
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        fontSize: "14px",
                        border: "1px solid #d0d0d0",
                        borderRadius: "6px",
                        background: "#ffffff",
                        color: "#1d1d1f",
                        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                        boxSizing: "border-box"
                      }}
                    />
                  </div>

                  <div style={{ display: "flex", gap: "12px" }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px", color: "#1d1d1f" }}>
                        Check-in Date
                      </label>
                      <input
                        type="date"
                        defaultValue="2024-05-15"
                        style={{
                          width: "100%",
                          padding: "10px 12px",
                          fontSize: "14px",
                          border: "1px solid #d0d0d0",
                          borderRadius: "6px",
                          background: "#ffffff",
                          color: "#1d1d1f",
                          fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                          boxSizing: "border-box"
                        }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px", color: "#1d1d1f" }}>
                        Check-out Date
                      </label>
                      <input
                        type="date"
                        defaultValue="2024-05-20"
                        style={{
                          width: "100%",
                          padding: "10px 12px",
                          fontSize: "14px",
                          border: "1px solid #d0d0d0",
                          borderRadius: "6px",
                          background: "#ffffff",
                          color: "#1d1d1f",
                          fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                          boxSizing: "border-box"
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              background: "#ffffff",
              borderTop: "2px solid #e0e0e0",
              padding: "20px 24px",
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
                  background: "#f5f5f7",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  showLoadingThen('Searching available hotels...', () => {
                    setNewFlowStep(2);
                  }, 3500);
                }}
                style={{
                  padding: "12px 32px",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#ffffff",
                  background: "#0071e3",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Search Hotels →
              </button>
            </div>
          </div>
        )}

        {/* NEW FLOW - Step 2: Search Results */}
        {showNewFlow && newFlowStep === 2 && (
          <div style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            background: "#f5f5f7",
            overflow: "hidden"
          }}>
            <div style={{
              background: "#ffffff",
              borderBottom: "1px solid #e0e0e0",
              padding: "14px 20px",
              flexShrink: 0
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {[
                  { label: "Details", active: false, completed: true },
                  { label: "Select Hotel", active: true, completed: false },
                  { label: "Checkout", active: false, completed: false }
                ].map((step, index, array) => (
                  <React.Fragment key={index}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      background: step.active ? "#e3f2fd" : "transparent",
                      color: step.active ? "#0071e3" : step.completed ? "#34c759" : "#6e6e73",
                      fontSize: "13px",
                      fontWeight: step.active ? "600" : "400"
                    }}>
                      <span style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background: step.active ? "#0071e3" : step.completed ? "#34c759" : "#d0d0d0",
                        color: "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "11px",
                        fontWeight: "600"
                      }}>
                        {step.completed ? "✓" : index + 1}
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
                
                {/* Pre-selected Hotel - Expanded */}
                {(() => {
                  const preSelectedHotel = { name: "Royal Hawaiian Resort", price: "$425", rating: "4.7", reviews: "1,892", image: "🏨" };
                  if (!selectedHotel) {
                    setSelectedHotel(preSelectedHotel);
                  }
                  const currentHotel = selectedHotel || preSelectedHotel;
                  
                  return (
                    <div style={{
                      background: "#e3f2fd",
                      borderRadius: "10px",
                      padding: "16px",
                      marginBottom: "20px",
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
                        <span style={{ fontSize: "13px", fontWeight: "600", color: "#0071e3" }}>
                          Selected
                        </span>
                      </div>

                      <div style={{ display: "flex", gap: "16px" }}>
                        <div style={{
                          width: "140px",
                          height: "105px",
                          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "24px",
                          flexShrink: 0
                        }}>
                          {currentHotel.image}
                        </div>

                        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                          <h3 style={{ fontSize: "17px", fontWeight: "600", margin: "0 0 8px 0", color: "#1d1d1f" }}>
                            {currentHotel.name}
                          </h3>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                            <span style={{ fontSize: "14px", color: "#f5a623" }}>★ {currentHotel.rating}</span>
                            <span style={{ fontSize: "13px", color: "#6e6e73" }}>({currentHotel.reviews} reviews)</span>
                          </div>
                          <p style={{ fontSize: "13px", color: "#6e6e73", margin: "0 0 12px 0" }}>
                            Waikiki Beach · Free WiFi · Pool · Ocean View · Beachfront
                          </p>
                          <div style={{ marginTop: "auto" }}>
                            <span style={{ fontSize: "13px", color: "#6e6e73" }}>From </span>
                            <span style={{ fontSize: "16px", fontWeight: "600", color: "#1d1d1f" }}>{currentHotel.price}</span>
                            <span style={{ fontSize: "13px", color: "#6e6e73" }}> /night</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Show Other Hotels Section */}
                <div>
                  <button
                    onClick={() => setShowOtherHotels(!showOtherHotels)}
                    style={{
                      width: "100%",
                      padding: "14px 20px",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#0071e3",
                      background: "#ffffff",
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      marginBottom: showOtherHotels ? "16px" : "0"
                    }}
                  >
                    {showOtherHotels ? "Hide" : "Show"} Other Hotels
                    <span style={{ fontSize: "12px" }}>{showOtherHotels ? "▲" : "▼"}</span>
                  </button>

                  {showOtherHotels && (
                    <div>
                      {[
                        { name: "Hilton Hawaiian Village", price: "$289", rating: "4.5", reviews: "2,341", image: "🏨" },
                        { name: "Moana Surfrider", price: "$350", rating: "4.6", reviews: "1,567", image: "🏨" },
                        { name: "Sheraton Waikiki", price: "$315", rating: "4.4", reviews: "3,112", image: "🏨" },
                        { name: "Hyatt Regency Waikiki", price: "$298", rating: "4.5", reviews: "2,789", image: "🏨" }
                      ].map((hotel, index) => (
                        <div key={index} style={{
                          background: "#ffffff",
                          borderRadius: "8px",
                          padding: "16px",
                          marginBottom: "12px",
                          display: "flex",
                          gap: "16px",
                          border: "1px solid #e0e0e0",
                          cursor: "pointer"
                        }}
                        onClick={() => {
                          setSelectedHotel(hotel);
                          setShowOtherHotels(false);
                        }}>
                          <div style={{
                            width: "100px",
                            height: "75px",
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            borderRadius: "6px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "20px",
                            flexShrink: 0
                          }}>
                            {hotel.image}
                          </div>

                          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                            <h3 style={{ fontSize: "14px", fontWeight: "600", margin: "0 0 4px 0", color: "#1d1d1f" }}>
                              {hotel.name}
                            </h3>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                              <span style={{ fontSize: "13px", color: "#f5a623" }}>★ {hotel.rating}</span>
                              <span style={{ fontSize: "12px", color: "#6e6e73" }}>({hotel.reviews} reviews)</span>
                            </div>
                            <p style={{ fontSize: "12px", color: "#6e6e73", margin: "0 0 8px 0" }}>
                              Waikiki Beach · Free WiFi · Pool · Ocean View
                            </p>
                            <div style={{ marginTop: "auto" }}>
                              <span style={{ fontSize: "12px", color: "#6e6e73" }}>From </span>
                              <span style={{ fontSize: "16px", fontWeight: "600", color: "#1d1d1f" }}>{hotel.price}</span>
                              <span style={{ fontSize: "12px", color: "#6e6e73" }}> /night</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer with Continue Button */}
            <div style={{
              background: "#ffffff",
              borderTop: "2px solid #e0e0e0",
              padding: "20px 24px",
              display: "flex",
              justifyContent: "flex-end",
              boxShadow: "0 -4px 12px rgba(0,0,0,0.1)"
            }}>
              <button
                onClick={() => {
                  showLoadingThen('Preparing checkout...', () => {
                    setNewFlowStep(3);
                  }, 1500);
                }}
                style={{
                  padding: "14px 40px",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#ffffff",
                  background: "#0071e3",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(0, 113, 227, 0.3)"
                }}
              >
                Continue to Checkout →
              </button>
            </div>
          </div>
        )}

        {/* NEW FLOW - Step 3: Checkout (Summary + Travellers + Payment) */}
        {showNewFlow && newFlowStep === 3 && (
          <div style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            background: "#f5f5f7",
            overflow: "hidden"
          }}>
            <div style={{
              background: "#ffffff",
              borderBottom: "1px solid #e0e0e0",
              padding: "14px 20px",
              flexShrink: 0
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {[
                  { label: "Details", active: false, completed: true },
                  { label: "Select Hotel", active: false, completed: true },
                  { label: "Checkout", active: true, completed: false }
                ].map((step, index, array) => (
                  <React.Fragment key={index}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      background: step.active ? "#e3f2fd" : "transparent",
                      color: step.active ? "#0071e3" : step.completed ? "#34c759" : "#6e6e73",
                      fontSize: "13px",
                      fontWeight: step.active ? "600" : "400"
                    }}>
                      <span style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background: step.active ? "#0071e3" : step.completed ? "#34c759" : "#d0d0d0",
                        color: "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "11px",
                        fontWeight: "600"
                      }}>
                        {step.completed ? "✓" : index + 1}
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
              <div style={{ maxWidth: "900px", margin: "0 auto", padding: "16px", display: "flex", gap: "24px" }}>
                
                {/* Left Column - Summary */}
                <div style={{ flex: 2 }}>
                  {/* Booking Summary */}
                  <div style={{
                    background: "#ffffff",
                    borderRadius: "10px",
                    padding: "16px",
                    marginBottom: "20px",
                    border: "1px solid #e0e0e0"
                  }}>
                    <h3 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 16px 0", color: "#1d1d1f" }}>
                      Booking Summary
                    </h3>
                    <div style={{ display: "flex", gap: "16px", paddingBottom: "16px", borderBottom: "1px solid #f0f0f0" }}>
                      <div style={{
                        width: "80px",
                        height: "60px",
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "20px",
                        flexShrink: 0
                      }}>
                        {selectedHotel?.image}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: "14px", fontWeight: "600", margin: "0 0 4px 0", color: "#1d1d1f" }}>
                          {selectedHotel?.name}
                        </h4>
                        <div style={{ fontSize: "13px", color: "#6e6e73" }}>
                          May 15-20, 2024 · 5 nights · 2 rooms
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ marginTop: "16px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#6e6e73", marginBottom: "8px" }}>
                        <span>{selectedHotel?.price} × 5 nights × 2 rooms</span>
                        <span>${selectedHotel && parseInt(selectedHotel.price.replace('$', '')) * 10}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#6e6e73", marginBottom: "8px" }}>
                        <span>Taxes & fees</span>
                        <span>${selectedHotel && Math.round(parseInt(selectedHotel.price.replace('$', '')) * 10 * 0.12)}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#ff3b30", marginBottom: "12px" }}>
                        <span>Amendment fee</span>
                        <span>$45</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: "600", color: "#1d1d1f", paddingTop: "12px", borderTop: "2px solid #e0e0e0" }}>
                        <span>Total</span>
                        <span>${selectedHotel && parseInt(selectedHotel.price.replace('$', '')) * 10 + Math.round(parseInt(selectedHotel.price.replace('$', '')) * 10 * 0.12) + 45}</span>
                      </div>
                    </div>
                  </div>

                  {/* Travellers */}
                  <div style={{
                    background: "#ffffff",
                    borderRadius: "10px",
                    padding: "16px",
                    border: "1px solid #e0e0e0"
                  }}>
                    <h3 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 12px 0", color: "#1d1d1f" }}>
                      Travellers
                    </h3>
                    <div style={{ fontSize: "13px", color: "#6e6e73", lineHeight: "1.8" }}>
                      • John Smith (john@example.com)<br/>
                      • Sarah Smith (sarah@example.com)
                    </div>
                  </div>
                </div>

                {/* Right Column - Payment */}
                <div style={{ flex: 1 }}>
                  <div style={{
                    background: "#ffffff",
                    borderRadius: "10px",
                    padding: "16px",
                    border: "1px solid #e0e0e0"
                  }}>
                    <h3 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 16px 0", color: "#1d1d1f" }}>
                      Payment Details
                    </h3>
                    
                    <div style={{ marginBottom: "16px" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px", color: "#1d1d1f" }}>
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        style={{
                          width: "100%",
                          padding: "10px 12px",
                          fontSize: "14px",
                          border: "1px solid #d0d0d0",
                          borderRadius: "6px",
                          fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                          boxSizing: "border-box"
                        }}
                      />
                    </div>

                    <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px", color: "#1d1d1f" }}>
                          Expiry
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          style={{
                            width: "100%",
                            padding: "10px 12px",
                            fontSize: "14px",
                            border: "1px solid #d0d0d0",
                            borderRadius: "6px",
                            fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                            boxSizing: "border-box"
                          }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px", color: "#1d1d1f" }}>
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          style={{
                            width: "100%",
                            padding: "10px 12px",
                            fontSize: "14px",
                            border: "1px solid #d0d0d0",
                            borderRadius: "6px",
                            fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                            boxSizing: "border-box"
                          }}
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: "16px" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px", color: "#1d1d1f" }}>
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        placeholder="John Smith"
                        style={{
                          width: "100%",
                          padding: "10px 12px",
                          fontSize: "14px",
                          border: "1px solid #d0d0d0",
                          borderRadius: "6px",
                          fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                          boxSizing: "border-box"
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              background: "#ffffff",
              borderTop: "2px solid #e0e0e0",
              padding: "20px 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 -4px 12px rgba(0,0,0,0.1)"
            }}>
              <div>
                <div style={{ fontSize: "12px", color: "#6e6e73", marginBottom: "2px" }}>
                  Total Amount
                </div>
                <div style={{ fontSize: "16px", fontWeight: "600", color: "#1d1d1f" }}>
                  ${selectedHotel && parseInt(selectedHotel.price.replace('$', '')) * 10 + Math.round(parseInt(selectedHotel.price.replace('$', '')) * 10 * 0.12) + 45}
                </div>
              </div>
              <button
                onClick={() => {
                  showLoadingThen('Processing payment...', () => {
                    setShowNewFlow(false);
                    setNewFlowStep(1);
                    setHotelAmended(true);
                    setActiveTab('itinerary');
                    setShowSuccessToast(true);
                    setTimeout(() => setShowSuccessToast(false), 4000);
                  }, 3000);
                }}
                style={{
                  padding: "14px 40px",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#ffffff",
                  background: "#34c759",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(52, 199, 89, 0.3)"
                }}
              >
                Confirm & Pay →
              </button>
            </div>
          </div>
        )}

        {activeTab === 'payments' && (
          <div style={{ flex: 1, overflow: "auto", padding: "16px", background: "#fafafa" }}>
            <div style={{
              padding: "40px 24px",
              textAlign: "center",
              background: "#ffffff",
              border: "1px solid #d0d0d0",
              borderRadius: "8px"
            }}>
              <div style={{ fontSize: "24px", marginBottom: "16px" }}>💳</div>
              <h3 style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "12px",
                color: "#1d1d1f"
              }}>
                Payments Screen
              </h3>
              <p style={{
                fontSize: "14px",
                color: "#6e6e73"
              }}>
                Separate screen for payment management
              </p>
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
              borderRadius: "8px"
            }}>
              <div style={{ fontSize: "24px", marginBottom: "16px" }}>📄</div>
              <h3 style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "12px",
                color: "#1d1d1f"
              }}>
                Documents Screen
              </h3>
              <p style={{
                fontSize: "14px",
                color: "#6e6e73"
              }}>
                Separate screen for document management
              </p>
            </div>
          </div>
        )}

        {activeTab === 'notes' && (
          <div style={{ flex: 1, overflow: "auto", padding: "16px", background: "#fafafa" }}>
            <div style={{
              padding: "40px 24px",
              textAlign: "center",
              background: "#ffffff",
              border: "1px solid #d0d0d0",
              borderRadius: "8px"
            }}>
              <div style={{ fontSize: "24px", marginBottom: "16px" }}>📝</div>
              <h3 style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "12px",
                color: "#1d1d1f"
              }}>
                Notes Screen
              </h3>
              <p style={{
                fontSize: "14px",
                color: "#6e6e73"
              }}>
                Separate screen for trip notes
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Amendment Modal */}
      {isAmendModalOpen && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 200
        }}>
          <div style={{
            background: "#ffffff",
            borderRadius: "10px",
            width: "500px",
            maxWidth: "90vw",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)"
          }}>
            {/* Modal Header */}
            <div style={{
              padding: "20px 24px",
              borderBottom: "1px solid #e0e0e0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <h3 style={{
                fontSize: "18px",
                fontWeight: "600",
                margin: "0",
                color: "#1d1d1f"
              }}>
                Amend {selectedShell?.type}
              </h3>
              <button
                onClick={() => setIsAmendModalOpen(false)}
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  border: "none",
                  background: "#e0e0e0",
                  color: "#666",
                  fontSize: "16px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ padding: "16px" }}>
              <div style={{
                marginBottom: "20px",
                padding: "8px 10px",
                background: "#f8f9fa",
                borderRadius: "6px",
                fontSize: "13px",
                color: "#6e6e73"
              }}>
                {selectedShell?.name} · {selectedShell?.type}
              </div>

              {/* Question 1: Reason for Amendment */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "600",
                  marginBottom: "8px",
                  color: "#1d1d1f"
                }}>
                  1. Reason for Amendment <span style={{ color: "#dc3545" }}>*</span>
                </label>
                <select
                  value={reasonForAmendment}
                  onChange={(e) => setReasonForAmendment(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    fontSize: "14px",
                    border: "1px solid #d0d0d0",
                    borderRadius: "6px",
                    background: "#ffffff",
                    color: "#1d1d1f",
                    cursor: "pointer",
                    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
                  }}
                >
                  <option value="">Select reason...</option>
                  <option value="customer_request">Customer Request</option>
                  <option value="date_change">Date Change</option>
                  <option value="upgrade">Upgrade</option>
                  <option value="downgrade">Downgrade</option>
                  <option value="pricing_error">Pricing Error</option>
                  <option value="availability_issue">Availability Issue</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Question 2: Type of Amendment */}
              <div style={{ marginBottom: "24px" }}>
                <label style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "600",
                  marginBottom: "8px",
                  color: "#1d1d1f"
                }}>
                  2. Type of Amendment <span style={{ color: "#dc3545" }}>*</span>
                </label>
                <select
                  value={causeOfAmendment}
                  onChange={(e) => setCauseOfAmendment(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    fontSize: "14px",
                    border: "1px solid #d0d0d0",
                    borderRadius: "6px",
                    background: "#ffffff",
                    color: "#1d1d1f",
                    cursor: "pointer",
                    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
                  }}
                >
                  <option value="">Select type...</option>
                  <option value="date_change">Date Change</option>
                  <option value="room_change">Room/Vehicle Change</option>
                  <option value="passenger_change">Passenger/Traveller Change</option>
                  <option value="cancel_component">Cancel Component</option>
                  <option value="add_component">Add Component</option>
                  <option value="pricing_adjustment">Pricing Adjustment</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Warning Message - Shows when both answers selected */}
              {reasonForAmendment && causeOfAmendment && (
                <div style={{
                  padding: "16px",
                  background: "#fff3cd",
                  border: "1px solid #ffc107",
                  borderRadius: "6px",
                  marginBottom: "20px"
                }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}>
                    <div style={{ fontSize: "13px", color: "#856404", fontWeight: "600" }}>
                      Amendment Fee
                    </div>
                    <div style={{ fontSize: "16px", fontWeight: "700", color: "#856404" }}>
                      $45.00
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                <button
                  onClick={() => setIsAmendModalOpen(false)}
                  style={{
                    padding: "10px 20px",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#6e6e73",
                    background: "#f5f5f7",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
                  }}
                >
                  Cancel
                </button>
                <button
                  disabled={!reasonForAmendment || !causeOfAmendment}
                  onClick={() => {
                    if (reasonForAmendment && causeOfAmendment) {
                      showLoadingThen('Loading traveller selection...', () => {
                        setIsAmendModalOpen(false);
                        setIsTravellersModalOpen(true);
                      }, 3000);
                    }
                  }}
                  style={{
                    padding: "10px 20px",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#ffffff",
                    background: (!reasonForAmendment || !causeOfAmendment) ? "#d0d0d0" : "#0071e3",
                    border: "none",
                    borderRadius: "6px",
                    cursor: (!reasonForAmendment || !causeOfAmendment) ? "not-allowed" : "pointer",
                    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
                  }}
                >
                  Continue to Travellers →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Travellers Modal */}
      {isTravellersModalOpen && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 200
        }}>
          <div style={{
            background: "#ffffff",
            borderRadius: "10px",
            width: "600px",
            maxWidth: "90vw",
            maxHeight: "80vh",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column"
          }}>
            {/* Modal Header */}
            <div style={{
              padding: "20px 24px",
              borderBottom: "1px solid #e0e0e0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <h3 style={{
                fontSize: "18px",
                fontWeight: "600",
                margin: "0",
                color: "#1d1d1f"
              }}>
                Adjust Travellers
              </h3>
              <button
                onClick={() => setIsTravellersModalOpen(false)}
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  border: "none",
                  background: "#e0e0e0",
                  color: "#666",
                  fontSize: "16px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ flex: 1, overflow: "auto", padding: "16px" }}>
              <div style={{
                marginBottom: "20px",
                padding: "8px 10px",
                background: "#f8f9fa",
                borderRadius: "6px",
                fontSize: "13px",
                color: "#6e6e73"
              }}>
                {selectedShell?.name} · {selectedShell?.type}
              </div>

              <h4 style={{
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "16px",
                color: "#1d1d1f"
              }}>
                Select Travellers for Amendment
              </h4>

              {/* Traveller List */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
                {['John Smith (Adult)', 'Jane Smith (Adult)', 'Emily Smith (Child - 12)', 'Max Smith (Child - 8)'].map((traveller, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "8px 10px",
                      background: "#ffffff",
                      border: "1px solid #d0d0d0",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px"
                    }}
                  >
                    <input
                      type="checkbox"
                      defaultChecked={true}
                      style={{
                        width: "18px",
                        height: "18px",
                        cursor: "pointer"
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "14px", fontWeight: "500", color: "#1d1d1f" }}>
                        {traveller}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Modal Footer */}
            <div style={{
              padding: "20px 24px",
              borderTop: "1px solid #e0e0e0",
              display: "flex",
              gap: "12px",
              justifyContent: "space-between"
            }}>
              <button
                onClick={() => {
                  setIsTravellersModalOpen(false);
                  setIsAmendModalOpen(true);
                }}
                style={{
                  padding: "10px 20px",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#6e6e73",
                  background: "#f5f5f7",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
                }}
              >
                ← Back
              </button>
              <button
                onClick={() => {
                  showLoadingThen('Loading search form...', () => {
                    setIsTravellersModalOpen(false);
                    setIsSearchModalOpen(true);
                  }, 3000);
                }}
                style={{
                  padding: "10px 20px",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#ffffff",
                  background: "#0071e3",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
                }}
              >
                Continue to Search →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Parameters Modal */}
      {isSearchModalOpen && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 200
        }}>
          <div style={{
            background: "#ffffff",
            borderRadius: "10px",
            width: "600px",
            maxWidth: "90vw",
            maxHeight: "80vh",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column"
          }}>
            {/* Modal Header */}
            <div style={{
              padding: "20px 24px",
              borderBottom: "1px solid #e0e0e0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <h3 style={{
                fontSize: "18px",
                fontWeight: "600",
                margin: "0",
                color: "#1d1d1f"
              }}>
                Search Parameters
              </h3>
              <button
                onClick={() => setIsSearchModalOpen(false)}
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  border: "none",
                  background: "#e0e0e0",
                  color: "#666",
                  fontSize: "16px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ flex: 1, overflow: "auto", padding: "16px" }}>
              <div style={{
                marginBottom: "20px",
                padding: "8px 10px",
                background: "#f8f9fa",
                borderRadius: "6px",
                fontSize: "13px",
                color: "#6e6e73"
              }}>
                {selectedShell?.name} · {selectedShell?.type}
              </div>

              {/* Destination */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "600",
                  marginBottom: "8px",
                  color: "#1d1d1f"
                }}>
                  Destination
                </label>
                <input
                  type="text"
                  defaultValue="Honolulu, Hawaii"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    fontSize: "14px",
                    border: "1px solid #d0d0d0",
                    borderRadius: "6px",
                    background: "#ffffff",
                    color: "#1d1d1f",
                    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                    boxSizing: "border-box"
                  }}
                />
              </div>

              {/* Check-in Date */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "600",
                  marginBottom: "8px",
                  color: "#1d1d1f"
                }}>
                  Check-in Date
                </label>
                <input
                  type="date"
                  defaultValue="2024-05-15"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    fontSize: "14px",
                    border: "1px solid #d0d0d0",
                    borderRadius: "6px",
                    background: "#ffffff",
                    color: "#1d1d1f",
                    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                    boxSizing: "border-box"
                  }}
                />
              </div>

              {/* Check-out Date */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "600",
                  marginBottom: "8px",
                  color: "#1d1d1f"
                }}>
                  Check-out Date
                </label>
                <input
                  type="date"
                  defaultValue="2024-05-20"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    fontSize: "14px",
                    border: "1px solid #d0d0d0",
                    borderRadius: "6px",
                    background: "#ffffff",
                    color: "#1d1d1f",
                    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                    boxSizing: "border-box"
                  }}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{
              padding: "20px 24px",
              borderTop: "1px solid #e0e0e0",
              display: "flex",
              gap: "12px",
              justifyContent: "space-between"
            }}>
              <button
                onClick={() => {
                  setIsSearchModalOpen(false);
                  setIsTravellersModalOpen(true);
                }}
                style={{
                  padding: "10px 20px",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#6e6e73",
                  background: "#f5f5f7",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
                }}
              >
                ← Back
              </button>
              <button
                onClick={() => {
                  showLoadingThen('Searching available hotels...', () => {
                    setIsSearchModalOpen(false);
                    setShowSearchResults(true);
                  }, 6500);
                }}
                style={{
                  padding: "10px 20px",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#ffffff",
                  background: "#0071e3",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
                }}
              >
                Search Availability →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DREAM FLOW - Will render inline in the shell cards below */}
      {false && (
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
          overflow: "hidden",
          position: "relative"
        }}>
          {/* Future Vision Badge */}
          <div style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "rgba(255,255,255,0.2)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: "20px",
            padding: "6px 12px",
            fontSize: "11px",
            fontWeight: "600",
            color: "#ffffff",
            zIndex: 10
          }}>
            🔮 FUTURE VISION
          </div>

          {/* Header */}
          <div style={{
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.2)",
            padding: "16px 20px"
          }}>
            <div style={{ fontSize: "16px", fontWeight: "600", color: "#ffffff", marginBottom: "4px" }}>
              Natural Language Amendment Assistant
            </div>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.9)" }}>
              Just tell us what you want to change - AI handles the rest
            </div>
          </div>

          {/* Content */}
          <div style={{ flex: 1, overflow: "auto", padding: "20px" }}>
            <div style={{ maxWidth: "700px", margin: "0 auto" }}>
              
              {/* Current Booking Reference */}
              <div style={{
                background: "rgba(255,255,255,0.95)",
                borderRadius: "10px",
                padding: "12px 16px",
                marginBottom: "16px",
                border: "1px solid rgba(255,255,255,0.4)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ fontSize: "16px" }}>📌</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "11px", fontWeight: "600", color: "#6e6e73", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "3px" }}>
                      Amending
                    </div>
                    <div style={{ fontSize: "13px", fontWeight: "600", color: "#1d1d1f" }}>
                      {selectedShell ? selectedShell.name : 'Royal Hawaiian Resort'}
                    </div>
                    <div style={{ fontSize: "12px", color: "#6e6e73" }}>
                      {selectedShell ? selectedShell.type : 'Hotel'} · May 15-20, 2024 · {selectedShell ? selectedShell.price : '$2,450'}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{
                      fontSize: "10px",
                      padding: "3px 8px",
                      background: "#34c759",
                      color: "#ffffff",
                      borderRadius: "4px",
                      fontWeight: "600"
                    }}>
                      Confirmed
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Natural Language Input */}
              <div style={{
                background: "rgba(255,255,255,0.95)",
                borderRadius: "10px",
                padding: "20px",
                marginBottom: "16px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)"
              }}>
                <div style={{ fontSize: "14px", fontWeight: "600", color: "#1d1d1f", marginBottom: "12px" }}>
                  What would you like to change?
                </div>
                <textarea
                  value={nlInput}
                  onChange={(e) => setNlInput(e.target.value)}
                  placeholder="e.g., 'Change hotel to 5-star near beach with pool and ocean view' or 'Upgrade to luxury hotel, adjust car to match'"
                  style={{
                    width: "100%",
                    minHeight: "80px",
                    padding: "12px",
                    fontSize: "14px",
                    border: "2px solid #d0d0d0",
                    borderRadius: "8px",
                    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                    resize: "vertical",
                    boxSizing: "border-box"
                  }}
                />
                <button
                  onClick={() => setDreamFlowStep(2)}
                  style={{
                    marginTop: "12px",
                    padding: "8px 16px",
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "#ffffff",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(102, 126, 234, 0.3)"
                  }}
                >
                  ✨ Analyze & Find Options
                </button>
              </div>

              {/* Example Queries */}
              <div style={{
                background: "rgba(255,255,255,0.95)",
                borderRadius: "10px",
                padding: "16px",
                marginBottom: "16px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)"
              }}>
                <div style={{ fontSize: "12px", fontWeight: "600", color: "#1d1d1f", marginBottom: "10px" }}>
                  💡 Try these examples:
                </div>
                {[
                  "Change to cheaper hotel, similar quality",
                  "Upgrade hotel to luxury beachfront",
                  "Move entire trip forward 2 days",
                  "Add family suite with kitchen"
                ].map((example, idx) => (
                  <button
                    key={idx}
                    onClick={() => setNlInput(example)}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      padding: "8px 12px",
                      marginBottom: "6px",
                      fontSize: "12px",
                      color: "#667eea",
                      background: "#f5f5f7",
                      border: "1px solid #e0e0e0",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = "#e8e8ed"}
                    onMouseOut={(e) => e.currentTarget.style.background = "#f5f5f7"}
                  >
                    "{example}"
                  </button>
                ))}
              </div>

              {/* Why This Couldn't Be Built */}
              <div style={{
                background: "rgba(255,255,255,0.95)",
                borderRadius: "10px",
                padding: "16px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)"
              }}>
                <div style={{ display: "flex", gap: "12px" }}>
                  <div style={{ fontSize: "16px" }}>⚠️</div>
                  <div>
                    <div style={{ fontSize: "12px", fontWeight: "600", color: "#1d1d1f", marginBottom: "6px" }}>
                      Technical Constraints
                    </div>
                    <div style={{ fontSize: "12px", color: "#6e6e73", lineHeight: "1.5", marginBottom: "8px" }}>
                      This vision couldn't be implemented due to:
                    </div>
                    <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "11px", color: "#6e6e73", lineHeight: "1.6" }}>
                      <li>No NLP/AI infrastructure for natural language processing</li>
                      <li>Complex dependency resolution across multiple booking systems</li>
                      <li>Real-time availability checks required across all providers</li>
                      <li>Pricing calculation engine not flexible enough for dynamic scenarios</li>
                      <li>Legacy system architecture couldn't support automated workflows</li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Footer */}
          <div style={{
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(255,255,255,0.2)",
            padding: "16px 20px",
            display: "flex",
            gap: "12px",
            justifyContent: "flex-end"
          }}>
            <button
              onClick={() => setShowDreamFlow(false)}
              style={{
                padding: "7px 16px",
                fontSize: "13px",
                fontWeight: "500",
                color: "#ffffff",
                background: "rgba(255,255,255,0.2)",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "6px",
                cursor: "pointer",
                backdropFilter: "blur(10px)"
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {false && (
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
          overflow: "hidden",
          position: "relative"
        }}>
          {/* Future Vision Badge */}
          <div style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "rgba(255,255,255,0.2)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: "20px",
            padding: "6px 12px",
            fontSize: "11px",
            fontWeight: "600",
            color: "#ffffff",
            zIndex: 10
          }}>
            🔮 FUTURE VISION
          </div>

          {/* Header */}
          <div style={{
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.2)",
            padding: "16px 20px"
          }}>
            <div style={{ fontSize: "16px", fontWeight: "600", color: "#ffffff", marginBottom: "4px" }}>
              AI Amendment Recommendations
            </div>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.9)" }}>
              Based on: "{nlInput || 'your request'}"
            </div>
          </div>

          {/* Content */}
          <div style={{ flex: 1, overflow: "auto", padding: "20px" }}>
            <div style={{ maxWidth: "700px", margin: "0 auto" }}>
              
              {/* Current Booking Reference */}
              <div style={{
                background: "rgba(255,255,255,0.95)",
                borderRadius: "10px",
                padding: "12px 16px",
                marginBottom: "16px",
                border: "1px solid rgba(255,255,255,0.4)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ fontSize: "16px" }}>📌</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "11px", fontWeight: "600", color: "#6e6e73", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "3px" }}>
                      Current Selection
                    </div>
                    <div style={{ fontSize: "13px", fontWeight: "600", color: "#1d1d1f" }}>
                      {selectedShell ? selectedShell.name : 'Royal Hawaiian Resort'}
                    </div>
                    <div style={{ fontSize: "12px", color: "#6e6e73" }}>
                      {selectedShell ? selectedShell.type : 'Hotel'} · May 15-20, 2024 · {selectedShell ? selectedShell.price : '$2,450'}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{
                      fontSize: "10px",
                      padding: "3px 8px",
                      background: "#34c759",
                      color: "#ffffff",
                      borderRadius: "4px",
                      fontWeight: "600"
                    }}>
                      Current
                    </div>
                  </div>
                </div>
              </div>
              
              {/* AI Understanding */}
              <div style={{
                background: "rgba(255,255,255,0.95)",
                borderRadius: "10px",
                padding: "16px",
                marginBottom: "16px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)"
              }}>
                <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
                  <div style={{ fontSize: "20px" }}>🤖</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "14px", fontWeight: "600", color: "#1d1d1f", marginBottom: "4px" }}>
                      AI Interpretation
                    </div>
                    <div style={{ fontSize: "13px", color: "#6e6e73", lineHeight: "1.5" }}>
                      Detected: <strong>Hotel upgrade</strong> · Looking for luxury beachfront properties with pools and ocean views
                    </div>
                  </div>
                </div>

                {/* Impact Analysis */}
                <div style={{
                  background: "#fff3cd",
                  border: "1px solid #ffc107",
                  borderRadius: "6px",
                  padding: "10px",
                  fontSize: "12px",
                  color: "#856404"
                }}>
                  <strong>Auto-detected impacts:</strong> Car rental location adjusted · Transfer times updated · Activity schedules verified
                </div>
              </div>

              {/* Smart Hotel Recommendations */}
              <div style={{
                background: "rgba(255,255,255,0.95)",
                borderRadius: "10px",
                padding: "16px",
                marginBottom: "16px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)"
              }}>
                <div style={{ fontSize: "14px", fontWeight: "600", color: "#1d1d1f", marginBottom: "12px" }}>
                  Recommended Hotels (AI-Ranked)
                </div>

                {[
                  {
                    name: "Four Seasons Resort Hualalai",
                    price: "$850",
                    rating: 4.9,
                    match: 98,
                    badge: "Perfect Match",
                    badgeColor: "#34c759",
                    features: ["Beachfront", "Infinity Pool", "Ocean View", "5-Star Luxury"]
                  },
                  {
                    name: "Fairmont Orchid",
                    price: "$625",
                    rating: 4.7,
                    match: 92,
                    badge: "Best Value",
                    badgeColor: "#0071e3",
                    features: ["Beach Access", "Pool", "Ocean View", "Spa"]
                  },
                  {
                    name: "Grand Hyatt Kauai",
                    price: "$580",
                    rating: 4.6,
                    match: 87,
                    badge: "Budget Option",
                    badgeColor: "#ff9500",
                    features: ["Near Beach", "Pool", "Partial View"]
                  }
                ].map((hotel, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setSelectedHotel(hotel);
                      showLoadingThen('Applying changes & updating dependencies...', () => {
                        setHotelAmended(true);
                        setShowDreamFlow(false);
                        setShowSuccessToast(true);
                        setTimeout(() => setShowSuccessToast(false), 3000);
                      }, 1500);
                    }}
                    style={{
                      padding: "12px",
                      background: idx === 0 ? "linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)" : "#ffffff",
                      border: idx === 0 ? "2px solid #667eea" : "1px solid #d0d0d0",
                      borderRadius: "8px",
                      marginBottom: "10px",
                      cursor: "pointer",
                      transition: "all 0.15s",
                      position: "relative"
                    }}
                    onMouseOver={(e) => {
                      if (idx !== 0) e.currentTarget.style.borderColor = "#fa709a";
                    }}
                    onMouseOut={(e) => {
                      if (idx !== 0) e.currentTarget.style.borderColor = "#d0d0d0";
                    }}
                  >
                    {/* Badge */}
                    <div style={{
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      background: hotel.badgeColor,
                      color: "#ffffff",
                      padding: "3px 8px",
                      borderRadius: "4px",
                      fontSize: "10px",
                      fontWeight: "600"
                    }}>
                      {hotel.badge}
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", paddingRight: "90px" }}>
                      <div>
                        <div style={{ fontSize: "14px", fontWeight: "600", color: "#1d1d1f", marginBottom: "3px" }}>
                          {hotel.name}
                        </div>
                        <div style={{ fontSize: "12px", color: "#f5a623" }}>
                          ★ {hotel.rating} · {hotel.match}% match to your request
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "10px" }}>
                      {hotel.features.map((feature, fIdx) => (
                        <div key={fIdx} style={{
                          fontSize: "10px",
                          padding: "3px 6px",
                          background: idx === 0 ? "rgba(250, 112, 154, 0.1)" : "#f5f5f7",
                          color: idx === 0 ? "#fa709a" : "#6e6e73",
                          borderRadius: "4px",
                          fontWeight: "500"
                        }}>
                          ✓ {feature}
                        </div>
                      ))}
                    </div>

                    {/* Price Comparison */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "10px", borderTop: "1px solid #f0f0f0" }}>
                      <div style={{ fontSize: "11px", color: "#6e6e73" }}>
                        <span style={{ textDecoration: "line-through" }}>$490</span>
                        <span style={{ color: parseInt(hotel.price.replace('$','')) > 490 ? "#ff3b30" : "#34c759", fontWeight: "600", marginLeft: "6px" }}>
                          {hotel.price} /night
                        </span>
                      </div>
                      <div style={{ fontSize: "11px", fontWeight: "600", color: parseInt(hotel.price.replace('$','')) > 490 ? "#ff3b30" : "#34c759" }}>
                        {parseInt(hotel.price.replace('$','')) > 490 ? '+' : '-'}${Math.abs(parseInt(hotel.price.replace('$','')) - 490)} /night
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Auto-Detected Dependencies */}
              <div style={{
                background: "rgba(255,255,255,0.95)",
                borderRadius: "10px",
                padding: "16px",
                marginBottom: "16px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)"
              }}>
                <div style={{ fontSize: "13px", fontWeight: "600", color: "#1d1d1f", marginBottom: "10px" }}>
                  🔗 Dependencies Auto-Adjusted
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {[
                    { item: "Car Rental Pickup", change: "Updated to new hotel location", icon: "🚗" },
                    { item: "Airport Transfer", change: "Time adjusted for new location", icon: "🚕" },
                    { item: "Pearl Harbor Tour", change: "Verified compatibility with new hotel", icon: "🎯" }
                  ].map((dep, idx) => (
                    <div key={idx} style={{
                      display: "flex",
                      gap: "10px",
                      padding: "8px",
                      background: "#f5f5f7",
                      borderRadius: "6px"
                    }}>
                      <div style={{ fontSize: "16px" }}>{dep.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "12px", fontWeight: "600", color: "#1d1d1f" }}>
                          {dep.item}
                        </div>
                        <div style={{ fontSize: "11px", color: "#6e6e73" }}>
                          {dep.change}
                        </div>
                      </div>
                      <div style={{ fontSize: "16px", color: "#34c759" }}>✓</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Constraints */}
              <div style={{
                background: "rgba(255,255,255,0.95)",
                borderRadius: "10px",
                padding: "16px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)"
              }}>
                <div style={{ display: "flex", gap: "12px" }}>
                  <div style={{ fontSize: "16px" }}>⚠️</div>
                  <div>
                    <div style={{ fontSize: "12px", fontWeight: "600", color: "#1d1d1f", marginBottom: "6px" }}>
                      Why This Remained a Concept
                    </div>
                    <div style={{ fontSize: "12px", color: "#6e6e73", lineHeight: "1.5", marginBottom: "8px" }}>
                      This natural language approach required:
                    </div>
                    <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "11px", color: "#6e6e73", lineHeight: "1.6" }}>
                      <li>Advanced NLP/AI infrastructure not available in legacy platform</li>
                      <li>Complex cross-system dependency resolution engine</li>
                      <li>Real-time availability aggregation across all providers</li>
                      <li>Intelligent pricing optimization algorithms</li>
                      <li>Automated workflow orchestration beyond current capabilities</li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Footer */}
          <div style={{
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(255,255,255,0.2)",
            padding: "16px 20px",
            display: "flex",
            gap: "12px",
            justifyContent: "space-between"
          }}>
            <button
              onClick={() => setDreamFlowStep(1)}
              style={{
                padding: "7px 16px",
                fontSize: "13px",
                fontWeight: "500",
                color: "#ffffff",
                background: "rgba(255,255,255,0.2)",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "6px",
                cursor: "pointer",
                backdropFilter: "blur(10px)"
              }}
            >
              ← Back
            </button>
            <button
              onClick={() => setShowDreamFlow(false)}
              style={{
                padding: "7px 16px",
                fontSize: "13px",
                fontWeight: "500",
                color: "#ffffff",
                background: "rgba(255,255,255,0.2)",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "6px",
                cursor: "pointer",
                backdropFilter: "blur(10px)"
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

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
          zIndex: 300,
          backdropFilter: "blur(4px)"
        }}>
          <div style={{
            background: "#ffffff",
            borderRadius: "10px",
            padding: "32px 40px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            minWidth: "320px"
          }}>
            {/* Spinner */}
            <div style={{
              width: "48px",
              height: "48px",
              border: "4px solid #f0f0f0",
              borderTop: "4px solid #0071e3",
              borderRadius: "50%",
              animation: "spin 1s linear infinite"
            }}></div>
            
            {/* Loading Message */}
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
          top: "24px",
          right: "24px",
          background: "#34c759",
          color: "#ffffff",
          padding: "14px 20px",
          borderRadius: "10px",
          boxShadow: "0 8px 24px rgba(52, 199, 89, 0.3)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          zIndex: 400,
          animation: "slideInRight 0.3s ease-out"
        }}>
          <div style={{
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            background: "#ffffff",
            color: "#34c759",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
            fontWeight: "bold"
          }}>
            ✓
          </div>
          <div>
            <div style={{ fontSize: "14px", fontWeight: "600", marginBottom: "2px" }}>
              Amendment Completed
            </div>
            <div style={{ fontSize: "13px", opacity: 0.9 }}>
              Hotel booking has been successfully updated
            </div>
          </div>
        </div>
      )}

      {/* Add keyframes for animations */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes slideInRight {
          0% { transform: translateX(400px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-3px); }
          20%, 40%, 60%, 80% { transform: translateX(3px); }
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

export default TravelOldFlow;



