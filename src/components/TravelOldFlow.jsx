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

  const showLoadingThen = (message, callback, duration = 1500) => {
    setLoadingMessage(message);
    setShowLoadingModal(true);
    setTimeout(() => {
      callback();
      setShowLoadingModal(false);
    }, duration);
  };

  const tripData = {
    tripName: "Hawaii Family Vacation",
    tripNo: "FC-2024-001",
    destination: "Honolulu, Hawaii",
    startDate: "May 15, 2024",
    endDate: "May 20, 2024",
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
      price: hotelAmended && selectedHotel ? `$${parseInt(selectedHotel.price.replace('$', '')) * 5}` : '$2,450'
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
      {/* Header Bar */}
      <div style={{
        padding: "12px 20px",
        borderBottom: "2px solid #e0e0e0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#f8f9fa"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            onClick={onBackToCaseStudy}
            style={{
              padding: "6px 12px",
              fontSize: "13px",
              fontWeight: "500",
              color: "#0071e3",
              background: "transparent",
              border: "1px solid #0071e3",
              borderRadius: "6px",
              cursor: "pointer",
              fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
            }}
          >
            ← Back to Case Study
          </button>
        </div>
        
        <button
          onClick={onClose}
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

      {/* Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Trip Summary - Static Section */}
        <div style={{
          padding: "20px",
          background: "#ffffff",
          borderBottom: "2px solid #e0e0e0"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
            <div>
              <h2 style={{
                fontSize: "20px",
                fontWeight: "600",
                margin: "0 0 4px 0",
                color: "#1d1d1f"
              }}>
                {tripData.tripName}
              </h2>
              <div style={{ fontSize: "13px", color: "#6e6e73" }}>
                Trip #{tripData.tripNo} · {tripData.travelers} travelers
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "13px", color: "#6e6e73", marginBottom: "4px" }}>
                📍 {tripData.destination}
              </div>
              <div style={{ fontSize: "13px", color: "#6e6e73" }}>
                📅 {tripData.startDate} - {tripData.endDate}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        {!showSearchResults && !showCartPage && !showTravellersPage && !showPaymentPage && !showNewFlow && (
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
                padding: "10px 20px",
                fontSize: "13px",
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
          <div style={{ flex: 1, overflow: showOnboarding ? "visible" : "auto", padding: "20px", background: "#fafafa" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", position: "relative" }}>
              {shells.map(shell => (
                <div
                  key={shell.id}
                  style={{
                    padding: "16px",
                    background: "#ffffff",
                    border: "1px solid #d0d0d0",
                    borderRadius: "8px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    position: "relative",
                    zIndex: shell.id === 1 && showOnboarding ? 10 : "auto"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ fontSize: "24px" }}>{shell.icon}</div>
                    <div>
                      <div style={{ fontSize: "15px", fontWeight: "600", color: "#1d1d1f", marginBottom: "4px" }}>
                        {shell.name}
                      </div>
                      <div style={{ fontSize: "13px", color: "#6e6e73" }}>
                        {shell.type} · {shell.dates}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div style={{ textAlign: "right" }}>
                      <div style={{
                        fontSize: "13px",
                        padding: "4px 8px",
                        background: shell.status === 'Confirmed' ? '#d4edda' : '#fff3cd',
                        color: shell.status === 'Confirmed' ? '#155724' : '#856404',
                        borderRadius: "4px",
                        marginBottom: "4px",
                        fontWeight: "500"
                      }}>
                        {shell.status}
                      </div>
                      <div style={{ fontSize: "15px", fontWeight: "600", color: "#1d1d1f" }}>
                        {shell.price}
                      </div>
                    </div>
                    <div style={{ position: "relative" }}>
                      {/* Onboarding Tooltip - Only on first shell */}
                      {shell.id === 1 && showOnboarding && (
                        <div style={{
                          position: "absolute",
                          bottom: "calc(100% + 15px)",
                          right: "-10px",
                          background: "#0071e3",
                          color: "#ffffff",
                          padding: "10px 14px",
                          borderRadius: "8px",
                          boxShadow: "0 6px 20px rgba(0, 113, 227, 0.5)",
                          zIndex: 1000,
                          fontSize: "12px",
                          fontWeight: "500",
                          lineHeight: "1.4",
                          animation: "pulse 2s infinite",
                          whiteSpace: "nowrap"
                        }}>
                          👋 Click here to try the old or new flow
                          <div style={{
                            position: "absolute",
                            bottom: "-8px",
                            right: "20px",
                            width: "16px",
                            height: "16px",
                            background: "#0071e3",
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
                          fontSize: "20px",
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
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
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
              padding: "16px 24px",
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
              <div style={{ maxWidth: "900px", margin: "0 auto", padding: "24px" }}>
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
                      fontSize: "36px",
                      flexShrink: 0
                    }}>
                      {hotel.image}
                    </div>

                    {/* Hotel Details */}
                    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                      <h3 style={{ fontSize: "15px", fontWeight: "600", margin: "0 0 4px 0", color: "#1d1d1f" }}>
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
                          <span style={{ fontSize: "18px", fontWeight: "600", color: "#1d1d1f" }}>{hotel.price}</span>
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
                padding: "16px 24px",
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
                    <div style={{ fontSize: "20px", fontWeight: "600", color: "#1d1d1f" }}>
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
              padding: "16px 24px",
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
              <div style={{ maxWidth: "800px", margin: "0 auto", padding: "24px" }}>
                
                {/* Selected Hotel Card */}
                <div style={{
                  background: "#ffffff",
                  borderRadius: "10px",
                  padding: "20px",
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
                      fontSize: "32px",
                      flexShrink: 0
                    }}>
                      {selectedHotel.image}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: "15px", fontWeight: "600", margin: "0 0 4px 0", color: "#1d1d1f" }}>
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
                      <div style={{ fontSize: "18px", fontWeight: "600", color: "#1d1d1f" }}>
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
                  padding: "20px",
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
                  padding: "20px",
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
                <div style={{ fontSize: "24px", fontWeight: "600", color: "#1d1d1f" }}>
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
                  fontSize: "15px",
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
              padding: "16px 24px",
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
              <div style={{ maxWidth: "700px", margin: "0 auto", padding: "24px" }}>
                {[
                  { name: "John Smith", email: "john@example.com", passport: "US123456" },
                  { name: "Sarah Smith", email: "sarah@example.com", passport: "US789012" }
                ].map((traveller, index) => (
                  <div key={index} style={{
                    background: "#ffffff",
                    borderRadius: "10px",
                    padding: "20px",
                    marginBottom: "16px",
                    border: "1px solid #e0e0e0"
                  }}>
                    <h3 style={{ fontSize: "15px", fontWeight: "600", margin: "0 0 12px 0", color: "#1d1d1f" }}>
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
                  fontSize: "15px",
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
              padding: "16px 24px",
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
              <div style={{ maxWidth: "600px", margin: "0 auto", padding: "24px" }}>
                <div style={{
                  background: "#ffffff",
                  borderRadius: "10px",
                  padding: "24px",
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
                        padding: "12px",
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
                          padding: "12px",
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
                          padding: "12px",
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
                        padding: "12px",
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
                  padding: "20px",
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
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "18px", fontWeight: "600", color: "#1d1d1f", paddingTop: "12px", borderTop: "2px solid #e0e0e0" }}>
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
                  fontSize: "15px",
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
              padding: "16px 24px",
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
              <div style={{ maxWidth: "800px", margin: "0 auto", padding: "24px" }}>
                
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
                  padding: "20px",
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
                      padding: "12px",
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
                  padding: "20px",
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
              padding: "16px 24px",
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
              <div style={{ maxWidth: "900px", margin: "0 auto", padding: "24px" }}>
                
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
                      padding: "20px",
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
                          fontSize: "48px",
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
                            <span style={{ fontSize: "22px", fontWeight: "600", color: "#1d1d1f" }}>{currentHotel.price}</span>
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
                            fontSize: "32px",
                            flexShrink: 0
                          }}>
                            {hotel.image}
                          </div>

                          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                            <h3 style={{ fontSize: "15px", fontWeight: "600", margin: "0 0 4px 0", color: "#1d1d1f" }}>
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
                              <span style={{ fontSize: "18px", fontWeight: "600", color: "#1d1d1f" }}>{hotel.price}</span>
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
                  fontSize: "15px",
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
              padding: "16px 24px",
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
              <div style={{ maxWidth: "900px", margin: "0 auto", padding: "24px", display: "flex", gap: "24px" }}>
                
                {/* Left Column - Summary */}
                <div style={{ flex: 2 }}>
                  {/* Booking Summary */}
                  <div style={{
                    background: "#ffffff",
                    borderRadius: "10px",
                    padding: "20px",
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
                        fontSize: "24px",
                        flexShrink: 0
                      }}>
                        {selectedHotel?.image}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: "15px", fontWeight: "600", margin: "0 0 4px 0", color: "#1d1d1f" }}>
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
                    padding: "20px",
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
                    padding: "20px",
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
                <div style={{ fontSize: "24px", fontWeight: "600", color: "#1d1d1f" }}>
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
                  fontSize: "15px",
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
          <div style={{ flex: 1, overflow: "auto", padding: "20px", background: "#fafafa" }}>
            <div style={{
              padding: "60px 40px",
              textAlign: "center",
              background: "#ffffff",
              border: "1px solid #d0d0d0",
              borderRadius: "8px"
            }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>💳</div>
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
          <div style={{ flex: 1, overflow: "auto", padding: "20px", background: "#fafafa" }}>
            <div style={{
              padding: "60px 40px",
              textAlign: "center",
              background: "#ffffff",
              border: "1px solid #d0d0d0",
              borderRadius: "8px"
            }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>📄</div>
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
          <div style={{ flex: 1, overflow: "auto", padding: "20px", background: "#fafafa" }}>
            <div style={{
              padding: "60px 40px",
              textAlign: "center",
              background: "#ffffff",
              border: "1px solid #d0d0d0",
              borderRadius: "8px"
            }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>📝</div>
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
            <div style={{ padding: "24px" }}>
              <div style={{
                marginBottom: "20px",
                padding: "12px",
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
            <div style={{ flex: 1, overflow: "auto", padding: "24px" }}>
              <div style={{
                marginBottom: "20px",
                padding: "12px",
                background: "#f8f9fa",
                borderRadius: "6px",
                fontSize: "13px",
                color: "#6e6e73"
              }}>
                {selectedShell?.name} · {selectedShell?.type}
              </div>

              <h4 style={{
                fontSize: "15px",
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
                      padding: "12px",
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
            <div style={{ flex: 1, overflow: "auto", padding: "24px" }}>
              <div style={{
                marginBottom: "20px",
                padding: "12px",
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
            borderRadius: "12px",
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
              fontSize: "15px",
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
          padding: "16px 24px",
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
            <div style={{ fontSize: "15px", fontWeight: "600", marginBottom: "2px" }}>
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
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
        }
      `}</style>
    </div>
  );
};

export default TravelOldFlow;



