import React, { useEffect, useRef, useState } from 'react';

const GOOGLE_MAPS_SCRIPT_ID = 'google-maps-js';
let googleMapsScriptPromise;

const loadGoogleMapsScript = (apiKey) => {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Google Maps can only load in the browser.'));
  }

  if (window.google && window.google.maps) {
    return Promise.resolve(window.google.maps);
  }

  if (googleMapsScriptPromise) {
    return googleMapsScriptPromise;
  }

  googleMapsScriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.getElementById(GOOGLE_MAPS_SCRIPT_ID);
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(window.google.maps));
      existingScript.addEventListener('error', () => reject(new Error('Failed to load Google Maps JS API.')));
      return;
    }

    const script = document.createElement('script');
    script.id = GOOGLE_MAPS_SCRIPT_ID;
    script.async = true;
    script.defer = true;
    script.dataset.googleMaps = 'true';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=weekly&libraries=places`;
    script.onload = () => resolve(window.google.maps);
    script.onerror = () => reject(new Error('Failed to load Google Maps JS API.'));
    document.head.appendChild(script);
  });

  return googleMapsScriptPromise;
};

const TravelPlannerMUI = ({
  isOpen,
  onClose,
  onMinimize,
  position,
  onDragStart,
  isMinimized,
  onBackToCaseStudy,
  showBackButton = false,
  zIndex = 1000
}) => {
  const [editingId, setEditingId] = useState(null);
  const [editingTripName, setEditingTripName] = useState(false);
  const [activeMenu, setActiveMenu] = useState('trips');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('itinerary');
  const [isAddingShell, setIsAddingShell] = useState(false);
  const [newShellSearch, setNewShellSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [mapStatus, setMapStatus] = useState('idle');
  const [mapLoadError, setMapLoadError] = useState('');
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const googleMapsMapId = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID;

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            city: 'Brisbane' // Would normally use reverse geocoding API
          });
          setLocationEnabled(true);
        },
        (error) => {
          console.log('Location access denied:', error);
          alert('Location access was denied. Please enable location in your browser settings.');
          setLocationEnabled(false);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  const startVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice search is not supported in your browser. Try Chrome or Edge.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setNewShellSearch(transcript);
      handleSearch(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      if (event.error === 'no-speech') {
        alert('No speech detected. Please try again.');
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  // Trip data
  const [tripData, setTripData] = useState({
    tripName: 'Miami Beach Vacation',
    tripNo: '#TRV-2024-001',
    destination: 'Miami Beach, FL',
    dates: 'Jan 15-18, 2024',
    travelers: 2,
    budget: '$150-200/night'
  });

  useEffect(() => {
    if (activeTab !== 'map') return;

    if (!googleMapsApiKey || googleMapsApiKey === 'YOUR_GOOGLE_MAPS_API_KEY') {
      setMapLoadError('Google Maps API key is missing. Add VITE_GOOGLE_MAPS_API_KEY to your .env file.');
      setMapStatus('error');
      return;
    }

    let isMounted = true;
    setMapLoadError('');
    setMapStatus('loading');

    loadGoogleMapsScript(googleMapsApiKey)
      .then((maps) => {
        if (!isMounted || !mapContainerRef.current) return;

        const defaultCenter = { lat: 25.7907, lng: -80.1300 };

        if (!mapRef.current) {
          mapRef.current = new maps.Map(mapContainerRef.current, {
            center: defaultCenter,
            zoom: 12,
            mapTypeId: 'satellite',
            tilt: 67.5,
            heading: 320,
            mapId: googleMapsMapId || undefined,
            disableDefaultUI: true,
            gestureHandling: 'greedy'
          });
        }

        const geocoder = new maps.Geocoder();
        geocoder.geocode({ address: tripData.destination }, (results, status) => {
          if (!isMounted || !mapRef.current) return;

          if (status === 'OK' && results[0]) {
            const location = results[0].geometry.location;
            mapRef.current.setCenter(location);
            mapRef.current.setZoom(13);
            mapRef.current.setTilt(67.5);
            mapRef.current.setHeading(320);

            if (markerRef.current) {
              markerRef.current.setMap(null);
            }

            markerRef.current = new maps.Marker({
              map: mapRef.current,
              position: location,
              title: tripData.destination
            });
          }

          setMapStatus('ready');
        });
      })
      .catch((error) => {
        if (!isMounted) return;
        console.error(error);
        setMapLoadError('Unable to load Google Maps. Check your API key and billing.');
        setMapStatus('error');
      });

    return () => {
      isMounted = false;
    };
  }, [activeTab, tripData.destination, googleMapsApiKey, googleMapsMapId]);

  // Shells data
  const [components, setComponents] = useState([
    {
      id: 'hotel',
      type: 'Hotel',
      name: 'Grand Plaza Resort',
      details: 'Ocean View Suite • $189/night',
      status: 'Booked',
      statusType: 'success'
    },
    {
      id: 'insurance',
      type: 'Insurance',
      name: 'Travel Protection',
      details: 'Comprehensive Coverage',
      status: 'Available',
      statusType: 'info'
    }
  ]);

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleSave = (id, field, value) => {
    setComponents(components.map(comp => 
      comp.id === id ? { ...comp, [field]: value } : comp
    ));
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleAddShell = () => {
    setIsAddingShell(true);
  };

  // Mock search function - simulates Sabre API search
  const handleSearch = (query) => {
    setNewShellSearch(query);
    
    // List of destinations to trigger search
    const destinations = ['sydney', 'miami', 'paris', 'london', 'tokyo', 'new york', 'los angeles', 'bali', 'dubai', 'singapore'];
    const hasDestination = destinations.some(dest => query.toLowerCase().includes(dest));
    
    if (query.trim().length > 2 && hasDestination) {
      // Show loading state only when destination is detected
      setIsSearching(true);
      setSearchResults([]);
      
      // Simulate API delay (500-800ms like real Sabre API)
      setTimeout(() => {
        const mockResults = [];
        
        if (query.toLowerCase().includes('flight') || query.toLowerCase().includes('sydney')) {
          const origin = userLocation?.city || 'Brisbane';
          mockResults.push(
            { id: 'f1', type: 'Flight', name: `${origin} to Sydney`, details: 'Qantas QF12 • Departs 8:30 AM', price: '$850' },
            { id: 'f2', type: 'Flight', name: `${origin} to Sydney`, details: 'Virgin VA804 • Departs 2:15 PM', price: '$720' },
            { id: 'f3', type: 'Flight', name: `Sydney to ${origin}`, details: 'Qantas QF11 • Departs 6:00 PM', price: '$890' }
          );
        }
        if (query.toLowerCase().includes('hotel')) {
          mockResults.push(
            { id: 'h1', type: 'Hotel', name: 'Sydney Harbour Hotel', details: 'Harbour View Suite • 3 nights', price: '$450/night' },
            { id: 'h2', type: 'Hotel', name: 'Bondi Beach Resort', details: 'Ocean View Room • 3 nights', price: '$320/night' }
          );
        }
        if (query.toLowerCase().includes('car') || query.toLowerCase().includes('rental')) {
          mockResults.push(
            { id: 'c1', type: 'Car Rental', name: 'Compact Car', details: 'Toyota Corolla • 3 days', price: '$45/day' }
          );
        }
        
        setSearchResults(mockResults);
        setIsSearching(false);
      }, 600);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  };

  const handleSelectSearchResult = (result) => {
    const newShell = {
      id: `component-${Date.now()}`,
      type: result.type,
      name: result.name,
      details: result.details,
      status: 'Available',
      statusType: 'info'
    };
    setComponents([...components, newShell]);
    setNewShellSearch('');
    setSearchResults([]);
    setIsAddingShell(false);
  };

  const handleCreateShell = () => {
    if (newShellSearch.trim()) {
      const newShell = {
        id: `component-${Date.now()}`,
        type: 'Custom',
        name: newShellSearch.trim(),
        details: 'Click edit to add details',
        status: 'Pending',
        statusType: 'warning'
      };
      setComponents([...components, newShell]);
      setNewShellSearch('');
      setSearchResults([]);
      setIsAddingShell(false);
    }
  };

  const handleCancelAddShell = () => {
    setIsAddingShell(false);
    setNewShellSearch('');
    setSearchResults([]);
  };

  const handleRemoveShell = (id) => {
    setComponents(components.filter(comp => comp.id !== id));
    setEditingId(null);
  };

  if (!isOpen) return null;

  const getStatusColor = (type) => {
    const colors = {
      success: { bg: '#e3f1df', text: '#008060', border: '#95c9b4' },
      info: { bg: '#e0f5fa', text: '#006fbb', border: '#aac9e3' },
      warning: { bg: '#fff5e0', text: '#916a00', border: '#ffc453' },
      critical: { bg: '#ffd6d6', text: '#d82c0d', border: '#fead9a' }
    };
    return colors[type] || colors.info;
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '926px',
        maxWidth: '90vw',
        height: '1310px',
        maxHeight: '90vh',
        zIndex,
        display: isMinimized ? 'none' : 'flex',
        flexDirection: 'column',
        background: '#ffffff',
        boxShadow: '0 0 0 1px rgba(63, 63, 68, 0.05), 0 1px 3px 0 rgba(63, 63, 68, 0.15)',
        borderRadius: '8px',
        overflow: 'hidden'
      }}
    >
      {/* Header Bar - Shopify Polaris style */}
      <div style={{
        background: '#ffffff',
        padding: '12px 20px',
        borderBottom: '1px solid #e1e3e5',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {showBackButton && (
            <button
              onClick={onBackToCaseStudy}
              style={{
                padding: '8px 12px',
                fontSize: '14px',
                fontWeight: '500',
                color: '#0071e3',
                background: 'transparent',
                border: '1px solid #0071e3',
                borderRadius: '6px',
                cursor: 'pointer',
                fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
              }}
            >
              ← Back to Case Study
            </button>
          )}
          <span style={{ fontSize: '20px' }}>✈️</span>
          <h1 style={{ 
            fontSize: '20px', 
            fontWeight: '600', 
            margin: '0',
            color: '#202223',
            letterSpacing: '-0.2px'
          }}>
            Travel Planner
          </h1>
          <span style={{
            padding: '4px 8px',
            background: '#f6f6f7',
            color: '#6d7175',
            borderRadius: '4px',
            fontSize: '13px',
            fontWeight: '600'
          }}>
            {tripData.tripNo}
          </span>
          {showBackButton && (
            <span style={{
              padding: '4px 8px',
              background: '#d4edda',
              color: '#155724',
              borderRadius: '4px',
              fontSize: '13px',
              fontWeight: '600'
            }}>
              NEW FLOW ✨
            </span>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            width: '32px',
            height: '32px',
            background: 'transparent',
            border: 'none',
            color: '#6d7175',
            fontSize: '20px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.1s',
            borderRadius: '4px',
            fontWeight: '300'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#f6f6f7';
            e.currentTarget.style.color = '#202223';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#6d7175';
          }}
        >
          ✕
        </button>
      </div>

      {/* Content Area */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        padding: '20px',
        background: '#f6f6f7',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
      }}>
        {/* Shells Section */}
        <div style={{
          background: '#ffffff',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0 0 0 1px rgba(63, 63, 68, 0.05), 0 1px 3px 0 rgba(63, 63, 68, 0.15)'
        }}>
          {/* Trip Name and Details */}
          <div style={{ marginBottom: '16px' }}>
            {editingTripName ? (
              <input
                type="text"
                defaultValue={tripData.tripName}
                autoFocus
                onBlur={(e) => {
                  setTripData({ ...tripData, tripName: e.target.value });
                  setEditingTripName(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setTripData({ ...tripData, tripName: e.target.value });
                    setEditingTripName(false);
                  }
                }}
                style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#202223',
                  border: '1px solid #008060',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  fontFamily: 'inherit',
                  width: '100%',
                  boxSizing: 'border-box',
                  marginBottom: '8px'
                }}
              />
            ) : (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h2 style={{ 
                    fontSize: '14px', 
                    fontWeight: '600', 
                    margin: '0',
                    color: '#202223'
                  }}>
                    {tripData.tripName}
                  </h2>
                  <button
                    onClick={() => setEditingTripName(true)}
                    style={{
                      padding: '3px 6px',
                      background: 'transparent',
                      border: '1px solid #c9cccf',
                      borderRadius: '4px',
                      color: '#6d7175',
                      fontSize: '10px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.1s'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = '#f6f6f7';
                      e.currentTarget.style.borderColor = '#919699';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.borderColor = '#c9cccf';
                    }}
                  >
                    Edit
                  </button>
                </div>
                <div style={{
                  fontSize: '12px',
                  fontWeight: '400',
                  color: '#6d7175'
                }}>
                  {components.length} shells
                </div>
              </div>
            )}
            
            {/* Trip Details - Inline */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '13px',
              color: '#6d7175'
            }}>
              <span>{tripData.dates}</span>
              <span>•</span>
              <span>{tripData.travelers} travelers</span>
              <span>•</span>
              <span>{tripData.budget}</span>
            </div>
          </div>

          {/* Tabs */}
          <div style={{
            display: 'flex',
            marginBottom: '20px',
            marginLeft: '-20px',
            marginRight: '-20px',
            paddingLeft: '20px',
            paddingRight: '20px'
          }}>
            {[
              { id: 'itinerary', label: 'Itinerary', icon: '📋' },
              { id: 'map', label: 'Map', icon: '🗺️' },
              { id: 'timeline', label: 'Timeline', icon: '📅' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '10px 16px',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: activeTab === tab.id ? '2px solid #008060' : '2px solid transparent',
                  color: activeTab === tab.id ? '#202223' : '#6d7175',
                  fontSize: '13px',
                  fontWeight: activeTab === tab.id ? '600' : '400',
                  cursor: 'pointer',
                  transition: 'all 0.1s',
                  fontFamily: 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '-1px'
                }}
                onMouseOver={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.color = '#202223';
                  }
                }}
                onMouseOut={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.color = '#6d7175';
                  }
                }}
              >
                <span style={{ fontSize: '14px' }}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'itinerary' && (
            <>
              {/* Shells List */}
              {components.length > 0 && (
                <div style={{ 
                  border: '1px solid #e1e3e5',
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}>
                  {components.map((component, index) => {
                  const statusColors = getStatusColor(component.statusType);
                  const isEditing = editingId === component.id;
                  
                  return (
                    <div
                      key={component.id}
                      style={{
                        padding: '16px',
                        borderBottom: index < components.length - 1 ? '1px solid #e1e3e5' : 'none',
                        background: isEditing ? '#f6f6f7' : '#ffffff',
                        transition: 'background 0.1s'
                      }}
                    >
                      {isEditing ? (
                        // Edit Mode
                        <div>
                          <div style={{ marginBottom: '12px' }}>
                            <label style={{
                              display: 'block',
                              fontSize: '12px',
                              fontWeight: '600',
                              color: '#6d7175',
                              marginBottom: '4px'
                            }}>
                              Name
                            </label>
                            <input
                              type="text"
                              defaultValue={component.name}
                              onBlur={(e) => handleSave(component.id, 'name', e.target.value)}
                              style={{
                                width: '100%',
                                padding: '8px 12px',
                                border: '1px solid #c9cccf',
                                borderRadius: '4px',
                                fontSize: '14px',
                                fontFamily: 'inherit',
                                color: '#202223',
                                background: '#ffffff',
                                boxSizing: 'border-box'
                              }}
                            />
                          </div>
                          
                          <div style={{ marginBottom: '12px' }}>
                            <label style={{
                              display: 'block',
                              fontSize: '12px',
                              fontWeight: '600',
                              color: '#6d7175',
                              marginBottom: '4px'
                            }}>
                              Details
                            </label>
                            <input
                              type="text"
                              defaultValue={component.details}
                              onBlur={(e) => handleSave(component.id, 'details', e.target.value)}
                              style={{
                                width: '100%',
                                padding: '8px 12px',
                                border: '1px solid #c9cccf',
                                borderRadius: '4px',
                                fontSize: '14px',
                                fontFamily: 'inherit',
                                color: '#202223',
                                background: '#ffffff',
                                boxSizing: 'border-box'
                              }}
                            />
                          </div>

                          <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between' }}>
                            <button
                              onClick={() => handleRemoveShell(component.id)}
                              style={{
                                padding: '6px 12px',
                                background: 'transparent',
                                border: '1px solid #d82c0d',
                                borderRadius: '4px',
                                color: '#d82c0d',
                                fontSize: '13px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.1s'
                              }}
                              onMouseOver={(e) => {
                                e.currentTarget.style.background = '#ffd6d6';
                              }}
                              onMouseOut={(e) => {
                                e.currentTarget.style.background = 'transparent';
                              }}
                            >
                              Delete
                            </button>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button
                                onClick={handleCancel}
                                style={{
                                  padding: '6px 12px',
                                  background: '#ffffff',
                                  border: '1px solid #c9cccf',
                                  borderRadius: '4px',
                                  color: '#202223',
                                  fontSize: '13px',
                                  fontWeight: '600',
                                  cursor: 'pointer'
                                }}
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => setEditingId(null)}
                                style={{
                                  padding: '6px 12px',
                                  background: '#008060',
                                  border: 'none',
                                  borderRadius: '4px',
                                  color: '#ffffff',
                                  fontSize: '13px',
                                  fontWeight: '600',
                                  cursor: 'pointer'
                                }}
                              >
                                Done
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        // View Mode
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                          <div style={{ flex: 1 }}>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              marginBottom: '4px'
                            }}>
                              <div style={{ 
                                fontSize: '14px', 
                                fontWeight: '600',
                                color: '#202223'
                              }}>
                                {component.name}
                              </div>
                              <span style={{
                                padding: '2px 8px',
                                background: '#f6f6f7',
                                color: '#6d7175',
                                borderRadius: '4px',
                                fontSize: '11px',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                              }}>
                                {component.type}
                              </span>
                            </div>
                            <div style={{ 
                              fontSize: '13px', 
                              fontWeight: '400',
                              color: '#6d7175'
                            }}>
                              {component.details}
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {/* Status Badge */}
                            <div style={{
                              padding: '4px 8px',
                              background: statusColors.bg,
                              color: statusColors.text,
                              border: `1px solid ${statusColors.border}`,
                              borderRadius: '4px',
                              fontSize: '12px',
                              fontWeight: '500'
                            }}>
                              {component.status}
                            </div>

                            {/* Edit Button */}
                            <button
                              onClick={() => handleEdit(component.id)}
                              style={{
                                padding: '6px 12px',
                                background: 'transparent',
                                border: '1px solid #c9cccf',
                                borderRadius: '4px',
                                color: '#202223',
                                fontSize: '13px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.1s'
                              }}
                              onMouseOver={(e) => {
                                e.currentTarget.style.background = '#f6f6f7';
                                e.currentTarget.style.borderColor = '#919699';
                              }}
                              onMouseOut={(e) => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.borderColor = '#c9cccf';
                              }}
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
                </div>
              )}

              {/* Add Shell Button */}
              <button
                  onClick={handleAddShell}
                  style={{
                    width: '100%',
                    padding: '12px',
                    marginTop: '12px',
                    background: 'transparent',
                    border: '1px dashed #c9cccf',
                    borderRadius: '8px',
                    color: '#6d7175',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.1s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = '#f6f6f7';
                    e.currentTarget.style.borderColor = '#919699';
                    e.currentTarget.style.color = '#202223';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = '#c9cccf';
                    e.currentTarget.style.color = '#6d7175';
                  }}
                >
                  <span style={{ fontSize: '16px' }}>+</span>
                  Add Shell
              </button>

            {/* Action Button - Shopify Polaris style */}
            <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
              <button
                style={{
                  flex: 1,
                  padding: '11px 16px',
                  background: '#008060',
                  border: 'none',
                  borderRadius: '4px',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.1s',
                  boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.05), 0 1px 0 0 rgba(0, 0, 0, 0.05)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#006e52';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = '#008060';
                }}
              >
                Manage Booking
              </button>
              
              <button
                style={{
                  padding: '11px 16px',
                  background: '#ffffff',
                  border: '1px solid #c9cccf',
                  borderRadius: '4px',
                  color: '#202223',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.1s',
                  boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.05), 0 1px 0 0 rgba(0, 0, 0, 0.05)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#f6f6f7';
                  e.currentTarget.style.borderColor = '#919699';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = '#ffffff';
                  e.currentTarget.style.borderColor = '#c9cccf';
                }}
              >
                Export
              </button>
            </div>
          </>
          )}

          {activeTab === 'map' && (
            <div style={{
              border: '1px solid #e1e3e5',
              borderRadius: '8px',
              overflow: 'hidden',
              background: '#ffffff'
            }}>
              <div style={{
                padding: '12px 16px',
                borderBottom: '1px solid #e1e3e5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px'
              }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#202223' }}>
                  3D Earth View
                </div>
                <div style={{ fontSize: '12px', color: '#6d7175' }}>
                  {tripData.destination}
                </div>
              </div>
              <div style={{
                position: 'relative',
                height: '420px',
                background: '#0b1a2a'
              }}>
                <div
                  ref={mapContainerRef}
                  style={{ position: 'absolute', inset: 0 }}
                />
                {mapStatus === 'loading' && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontSize: '13px',
                    background: 'rgba(11, 26, 42, 0.6)'
                  }}>
                    Loading 3D map...
                  </div>
                )}
                {mapLoadError && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontSize: '13px',
                    padding: '16px',
                    textAlign: 'center',
                    background: 'rgba(11, 26, 42, 0.8)'
                  }}>
                    {mapLoadError}
                  </div>
                )}
                {!googleMapsMapId && mapStatus === 'ready' && (
                  <div style={{
                    position: 'absolute',
                    right: '12px',
                    bottom: '12px',
                    padding: '6px 10px',
                    background: 'rgba(0, 0, 0, 0.6)',
                    color: '#ffffff',
                    borderRadius: '6px',
                    fontSize: '11px'
                  }}>
                    Tip: add VITE_GOOGLE_MAPS_MAP_ID for richer 3D.
                  </div>
                )}
              </div>
              <div style={{
                padding: '12px 16px',
                borderTop: '1px solid #e1e3e5',
                fontSize: '12px',
                color: '#6d7175'
              }}>
                Showing satellite terrain with tilt for a 3D-style view. Use scroll to zoom and drag to rotate.
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div style={{
              padding: '20px',
              border: '1px solid #e1e3e5',
              borderRadius: '8px',
              background: '#ffffff',
              color: '#6d7175',
              fontSize: '13px'
            }}>
              Timeline view is coming next. Switch to Itinerary or Map to continue planning.
            </div>
          )}
        </div>
      </div>

      {/* Search Modal */}
      {isAddingShell && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'fadeIn 0.2s ease-in'
        }}
        onClick={handleCancelAddShell}
        >
          <div 
            style={{
              background: '#ffffff',
              width: '700px',
              maxWidth: '90vw',
              maxHeight: '80vh',
              borderRadius: '8px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{
              padding: '20px 24px',
              borderBottom: '1px solid #e1e3e5',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h2 style={{
                fontSize: '18px',
                fontWeight: '600',
                margin: '0',
                color: '#202223'
              }}>
                Add to Trip
              </h2>
              <button
                onClick={handleCancelAddShell}
                style={{
                  width: '32px',
                  height: '32px',
                  background: 'transparent',
                  border: 'none',
                  color: '#6d7175',
                  fontSize: '20px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#f6f6f7'}
                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div style={{
              flex: 1,
              overflow: 'auto',
              padding: '24px'
            }}>
              {/* Search Bar with Voice */}
              <div style={{ position: 'relative', marginBottom: '20px' }}>
                <input
                  type="text"
                  value={isListening ? 'Listening...' : newShellSearch}
                  onChange={(e) => handleSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      handleCancelAddShell();
                    }
                  }}
                  placeholder={locationEnabled ? `Try "flight to Sydney" (from ${userLocation?.city})` : "Try \"flight to Sydney\" or \"hotel in Paris\""}
                  autoFocus
                  disabled={isListening}
                  style={{
                    width: '100%',
                    padding: '12px 48px 12px 16px',
                    border: `2px solid ${isListening ? '#008060' : '#e1e3e5'}`,
                    borderRadius: '6px',
                    fontSize: '16px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                    background: isListening ? '#f0fdf4' : '#ffffff',
                    outline: 'none'
                  }}
                />
                <button
                  onClick={startVoiceSearch}
                  disabled={isListening}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '32px',
                    height: '32px',
                    background: isListening ? '#008060' : 'transparent',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: isListening ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    transition: 'all 0.1s',
                    animation: isListening ? 'pulse 1.5s ease-in-out infinite' : 'none'
                  }}
                  onMouseOver={(e) => {
                    if (!isListening) {
                      e.currentTarget.style.background = '#f6f6f7';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isListening) {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                  title="Voice search"
                >
                  🎤
                </button>
                <style>
                  {`
                    @keyframes pulse {
                      0%, 100% { opacity: 1; transform: translateY(-50%) scale(1); }
                      50% { opacity: 0.6; transform: translateY(-50%) scale(1.1); }
                    }
                  `}
                </style>
              </div>

              {/* Location Enable Banner */}
              {!locationEnabled && newShellSearch.length === 0 && (
                <div style={{
                  padding: '16px',
                  background: '#e0f5fa',
                  border: '1px solid #aac9e3',
                  borderRadius: '6px',
                  marginBottom: '20px',
                  fontSize: '13px'
                }}>
                  <div style={{ fontWeight: '600', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px', color: '#006fbb' }}>
                    <span style={{ fontSize: '18px' }}>📍</span>
                    <span>Get personalized flight searches</span>
                  </div>
                  <div style={{ marginBottom: '12px', color: '#4a5568', fontSize: '12px', lineHeight: '1.5' }}>
                    Enable location to automatically search flights from your current city
                  </div>
                  <button
                    onClick={requestLocation}
                    style={{
                      padding: '8px 16px',
                      background: '#006fbb',
                      border: 'none',
                      borderRadius: '4px',
                      color: '#ffffff',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'background 0.1s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = '#0056a3'}
                    onMouseOut={(e) => e.currentTarget.style.background = '#006fbb'}
                  >
                    Enable Location
                  </button>
                </div>
              )}

              {/* Loading State - Sabre API */}
              {isSearching && (
                <div style={{
                  padding: '40px',
                  textAlign: 'center',
                  color: '#6d7175',
                  fontSize: '14px'
                }}>
                  <div style={{
                    marginBottom: '16px',
                    fontSize: '32px',
                    animation: 'spin 1s linear infinite',
                    display: 'inline-block'
                  }}>
                    ⏳
                  </div>
                  <div style={{ fontWeight: '600', marginBottom: '8px', color: '#202223', fontSize: '16px' }}>
                    Connecting to Sabre GDS
                  </div>
                  <div style={{ fontSize: '13px', color: '#6d7175' }}>
                    Searching global travel inventory...
                  </div>
                  <style>
                    {`
                      @keyframes spin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                      }
                      @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                      }
                    `}
                  </style>
                </div>
              )}

              {/* Search Results */}
              {!isSearching && searchResults.length > 0 && (
                <div>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#6d7175',
                    marginBottom: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {searchResults.length} Results Found
                  </div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}>
                    {searchResults.map((result) => (
                      <div
                        key={result.id}
                        onClick={() => handleSelectSearchResult(result)}
                        style={{
                          padding: '16px',
                          border: '1px solid #e1e3e5',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          background: '#ffffff',
                          transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.background = '#f6f6f7';
                          e.currentTarget.style.borderColor = '#008060';
                          e.currentTarget.style.transform = 'translateX(4px)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.background = '#ffffff';
                          e.currentTarget.style.borderColor = '#e1e3e5';
                          e.currentTarget.style.transform = 'translateX(0)';
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          gap: '16px'
                        }}>
                          <div style={{ flex: 1 }}>
                            <div style={{
                              display: 'inline-block',
                              padding: '3px 8px',
                              background: '#f6f6f7',
                              color: '#6d7175',
                              borderRadius: '4px',
                              fontSize: '10px',
                              fontWeight: '700',
                              marginBottom: '8px',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px'
                            }}>
                              {result.type}
                            </div>
                            <div style={{
                              fontSize: '15px',
                              fontWeight: '600',
                              color: '#202223',
                              marginBottom: '6px'
                            }}>
                              {result.name}
                            </div>
                            <div style={{
                              fontSize: '13px',
                              color: '#6d7175',
                              lineHeight: '1.5'
                            }}>
                              {result.details}
                            </div>
                          </div>
                          <div style={{
                            fontSize: '18px',
                            fontWeight: '700',
                            color: '#008060',
                            whiteSpace: 'nowrap'
                          }}>
                            {result.price}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* No Results / Empty State */}
              {!isSearching && newShellSearch.length > 0 && searchResults.length === 0 && (
                <div style={{
                  padding: '40px',
                  textAlign: 'center',
                  color: '#6d7175'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#202223', marginBottom: '8px' }}>
                    No results found
                  </div>
                  <div style={{ fontSize: '13px', marginBottom: '16px' }}>
                    Try including a destination like "Sydney", "Paris", or "London"
                  </div>
                  <button
                    onClick={handleCreateShell}
                    style={{
                      padding: '8px 16px',
                      background: 'transparent',
                      border: '1px solid #c9cccf',
                      borderRadius: '4px',
                      color: '#202223',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Create custom shell "{newShellSearch}"
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelPlannerMUI;
