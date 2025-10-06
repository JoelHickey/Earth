import React, { useState } from 'react';
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import Slider from './components/Slider';
import StatusBar from './components/StatusBar';
import Divider from './components/Divider';
import CheckboxGroup from './components/CheckboxGroup';
import Timeline from './components/Timeline';
import { useSliderDrag } from './hooks/useSliderDrag';
import { INPUT_SLIDERS, EMOTION_SLIDERS } from './utils/constants';
import { useTravelSearch } from './src/hooks/useTravelSearch';
import { SearchProgress, ErrorMessage, NoResultsMessage, HotelSkeleton } from './src/components/LoadingComponents';

function App() {
  console.log("App is rendering!");
  
  // Add state for Toolbar props
  const [activeView, setActiveView] = useState('inputs');
  const [outputValue] = useState(5);
  const [bloodSugar] = useState(100);
  const [cortisolLevel] = useState(3);
  const getBloodSugarStatus = () => 'normal';
  
  // Add state for sliders
  const [sliderValues, setSliderValues] = useState({
    sleepQuality: 0,
    sleepDuration: 0,
    waterLevel: 0,
    caffeineLevel: 0,
    foodLevel: 0,
    walkLevel: 0,
    alcoholLevel: 0,
    medication1: 0,
    vitaminD: 0,
    vitaminB12: 0,
    vitaminC: 0,
    magnesium: 0,
    lTheanine: 0,
    thc: 0,
    cbd: 0,
    happiness: 0,
    anxiety: 0,
    energy: 0,
    focus: 0,
    stress: 0,
    sadness: 0,
    anger: 0,
    irritability: 0,
    dread: 0
  });

  // Add state for environment checkboxes
  const [environmentCheckboxes, setEnvironmentCheckboxes] = useState({
    noise: false,
    lighting: false,
    temperature: false,
    crowding: false,
    airQuality: false,
    cleanliness: false
  });

  // Add state for timeline events
  const [timelineEvents, setTimelineEvents] = useState([]);
  
  // About section state
  const [activeTab, setActiveTab] = useState('mission');
  const [isDetailedView, setIsDetailedView] = useState(true);
  const [isBusinessDetailedView, setIsBusinessDetailedView] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState({});
  
  // Toggle function for collapsible sections
  const toggleSection = (sectionId) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };
  
  // Undo functionality state
  const [previousSliderValues, setPreviousSliderValues] = useState(null);
  
  // Window state
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [isWindowMinimized, setIsWindowMinimized] = useState(false);
  
  // Second app window state
  const [isSecondAppOpen, setIsSecondAppOpen] = useState(false);
  const [isSecondAppMinimized, setIsSecondAppMinimized] = useState(false);
  
  // Third app window state (Travel)
  const [isTravelAppOpen, setIsTravelAppOpen] = useState(false);
  const [isTravelAppMinimized, setIsTravelAppMinimized] = useState(false);
  
  // Window position state - center windows on initial load
  const [windowPosition, setWindowPosition] = useState(() => ({
    x: typeof window !== 'undefined' ? Math.max(0, (window.innerWidth - 1000) / 2) : 50,
    y: typeof window !== 'undefined' ? Math.max(0, (window.innerHeight - 600) / 2) : 100
  }));
  const [secondWindowPosition, setSecondWindowPosition] = useState(() => ({
    x: typeof window !== 'undefined' ? Math.max(0, (window.innerWidth - 400) / 2) : 200,
    y: typeof window !== 'undefined' ? Math.max(0, (window.innerHeight - 300) / 2) : 120
  }));
  const [travelWindowPosition, setTravelWindowPosition] = useState(() => ({
    x: typeof window !== 'undefined' ? Math.max(0, (window.innerWidth - 700) / 2) : 300,
    y: typeof window !== 'undefined' ? Math.max(0, (window.innerHeight - 600) / 2) : 150
  }));
  const [isDragging, setIsDragging] = useState(false);
  const [isSecondDragging, setIsSecondDragging] = useState(false);
  const [isTravelDragging, setIsTravelDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingComponent, setEditingComponent] = useState(null);
  const [isSearchDetailsModalOpen, setIsSearchDetailsModalOpen] = useState(false);
  const [isIntermediateModalOpen, setIsIntermediateModalOpen] = useState(false);
  const [isSearchResultsOpen, setIsSearchResultsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isTravelersPageOpen, setIsTravelersPageOpen] = useState(false);
  const [isPaymentPageOpen, setIsPaymentPageOpen] = useState(false);
  const [isLightningPageOpen, setIsLightningPageOpen] = useState(false);
  const [isLightningCheckoutOpen, setIsLightningCheckoutOpen] = useState(false);
  const [isSearchingModalOpen, setIsSearchingModalOpen] = useState(false);
  const [isQuickAmendSearch, setIsQuickAmendSearch] = useState(false);
  const [showAllHotels, setShowAllHotels] = useState(false);
  const [isRoomSelectionLoading, setIsRoomSelectionLoading] = useState(false);

  // Travel search functionality
  const { isLoading: isSearchLoading, error: searchError, results: apiResults, searchHotels, clearResults } = useTravelSearch();

  const handleSliderChange = (name, value) => {
    // Store current values as previous before making change
    setPreviousSliderValues(sliderValues);
    setSliderValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSliderMouseDown = useSliderDrag();

  // Add functions for Save/Recall functionality
  const saveSliderPositions = () => {
    localStorage.setItem('sliderPositions', JSON.stringify(sliderValues));
    console.log('Slider positions saved!');
  };

  const recallSliderPositions = () => {
    const saved = localStorage.getItem('sliderPositions');
    if (saved) {
      setSliderValues(JSON.parse(saved));
      console.log('Slider positions recalled!');
    }
  };

  const undoSliderChange = () => {
    if (previousSliderValues) {
      setSliderValues(previousSliderValues);
      setPreviousSliderValues(null);
      console.log('Slider change undone!');
    }
  };

  const closeWindow = () => {
    setIsWindowOpen(false);
    setIsWindowMinimized(false);
    console.log('Window closed');
  };

  const minimizeWindow = () => {
    setIsWindowMinimized(true);
    console.log('Window minimized');
  };

  const restoreWindow = () => {
    setIsWindowMinimized(false);
    console.log('Window restored');
  };

  const openWindow = () => {
    setIsWindowOpen(true);
    setIsWindowMinimized(false);
    // Center the window on desktop
    setWindowPosition({
      x: Math.max(0, (window.innerWidth - 1000) / 2), // Main window is 1000px wide
      y: Math.max(0, (window.innerHeight - 600) / 2) // Estimated height
    });
    console.log('Window opened');
  };

  // Second app functions
  const closeSecondApp = () => {
    setIsSecondAppOpen(false);
    setIsSecondAppMinimized(false);
    console.log('Second app closed');
  };

  const minimizeSecondApp = () => {
    setIsSecondAppMinimized(true);
    console.log('Second app minimized');
  };

  const restoreSecondApp = () => {
    setIsSecondAppMinimized(false);
    console.log('Second app restored');
  };

  const openSecondApp = () => {
    setIsSecondAppOpen(true);
    setIsSecondAppMinimized(false);
    // Center the Notepad window on desktop
    setSecondWindowPosition({
      x: Math.max(0, (window.innerWidth - 400) / 2), // Notepad width is 400px
      y: Math.max(0, (window.innerHeight - 300) / 2) // Notepad height is 300px
    });
    console.log('Second app opened');
  };

  // Travel app functions
  const closeTravelApp = () => {
    setIsTravelAppOpen(false);
    setIsTravelAppMinimized(false);
    console.log('Travel app closed');
  };

  const minimizeTravelApp = () => {
    setIsTravelAppMinimized(true);
    console.log('Travel app minimized');
  };

  const restoreTravelApp = () => {
    setIsTravelAppMinimized(false);
    console.log('Travel app restored');
  };

  const openTravelApp = () => {
    setIsTravelAppOpen(true);
    setIsTravelAppMinimized(false);
    // Center the Travel window on desktop
    setTravelWindowPosition({
      x: Math.max(0, (window.innerWidth - 700) / 2), // Travel app width is 700px
      y: Math.max(0, (window.innerHeight - 600) / 2) // Travel app height is 600px
    });
    console.log('Travel app opened');
  };

  const handleEditComponent = (componentName) => {
    setEditingComponent(componentName);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingComponent(null);
  };

  const openIntermediateModal = () => {
    setIsEditModalOpen(false);
    setIsIntermediateModalOpen(true);
  };

  const openSearchDetailsModal = () => {
    setIsIntermediateModalOpen(false);
    setIsSearchDetailsModalOpen(true);
  };

  const closeIntermediateModal = () => {
    setIsIntermediateModalOpen(false);
    setEditingComponent(null);
  };

  const closeSearchDetailsModal = () => {
    setIsSearchDetailsModalOpen(false);
    setEditingComponent(null);
  };

  const openSearchResults = async () => {
    console.log("Starting search process...");
    setIsSearchDetailsModalOpen(false);
    setEditingComponent(null);
    
    // Reset quick amend flag for regular search
    setIsQuickAmendSearch(false);
    
    // Show searching modal
    console.log("About to open searching modal...");
    openSearchingModal();
    
    // Clear previous results
    clearResults();
    
    // Simulate realistic search time
    const searchDelay = Math.random() * 2000 + 1500; // 1.5-3.5 seconds
    
    // Search for hotels using real API
    try {
      await new Promise(resolve => setTimeout(resolve, searchDelay));
      await searchHotels({
        cityCode: 'MIA', // Miami - you can make this dynamic based on search form
        checkInDate: '2024-01-15',
        checkOutDate: '2024-01-18',
        adults: 2,
        roomQuantity: 1,
        currency: 'USD',
        max: 10
      });
    } catch (error) {
      console.error('Hotel search failed:', error);
      // Fallback to mock results if API fails
    } finally {
      // Close searching modal and show results
      closeSearchingModal();
      setIsSearchResultsOpen(true);
      // Don't reset quick amend flag here - it should only be reset when closing results
    }
  };

  const closeSearchResults = () => {
    setIsSearchResultsOpen(false);
    setIsQuickAmendSearch(false); // Reset quick amend flag when closing results
  };

  const addToCart = (hotel) => {
    setCartItems(prev => [...prev, hotel]);
    setIsSearchResultsOpen(false);
    setIsCartOpen(true);
  };

  const openCart = () => {
    setIsCartOpen(true);
    setIsSearchResultsOpen(false);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const removeFromCart = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const openTravelersPage = () => {
    setIsCartOpen(false);
    setIsTravelersPageOpen(true);
  };

  const closeTravelersPage = () => {
    setIsTravelersPageOpen(false);
  };

  const openPaymentPage = () => {
    setIsTravelersPageOpen(false);
    setIsPaymentPageOpen(true);
  };

  const closePaymentPage = () => {
    setIsPaymentPageOpen(false);
  };

  const openLightningPage = () => {
    setIsLightningPageOpen(true);
  };

  const closeLightningPage = () => {
    setIsLightningPageOpen(false);
  };

  const openLightningCheckout = (hotel) => {
    setIsSearchResultsOpen(false);
    setIsLightningCheckoutOpen(true);
    // Store the selected hotel for the lightning checkout
    setCartItems([hotel]);
  };

  const closeLightningCheckout = () => {
    setIsLightningCheckoutOpen(false);
  };

  const openSearchingModal = (isQuickAmend = false) => {
    console.log("Opening searching modal...", isQuickAmend ? "(quick amend)" : "(regular search)");
    setIsQuickAmendSearch(isQuickAmend);
    setIsSearchingModalOpen(true);
  };

  const closeSearchingModal = () => {
    setIsSearchingModalOpen(false);
    // Don't reset isQuickAmendSearch here - keep it until results are shown
  };

  const selectRoom = async (roomData) => {
    setIsRoomSelectionLoading(true);
    
    // Simulate room selection processing
    const loadingDelay = Math.random() * 1500 + 1000; // 1-2.5 seconds
    
    try {
      await new Promise(resolve => setTimeout(resolve, loadingDelay));
      setIsRoomSelectionLoading(false);
      openLightningCheckout(roomData);
    } catch (error) {
      console.error('Room selection failed:', error);
      setIsRoomSelectionLoading(false);
    }
  };

  // Drag handlers for main window
  const handleWindowMouseDown = (e) => {
    if (e.target.closest('button')) return; // Don't drag if clicking a button
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    e.preventDefault();
  };

  const handleWindowMouseMove = (e) => {
    if (!isDragging) return;
    setWindowPosition({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y
    });
  };

  const handleWindowMouseUp = () => {
    setIsDragging(false);
  };

  // Drag handlers for second window
  const handleSecondWindowMouseDown = (e) => {
    if (e.target.closest('button')) return; // Don't drag if clicking a button
    setIsSecondDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    e.preventDefault();
  };

  const handleSecondWindowMouseMove = (e) => {
    if (!isSecondDragging) return;
    setSecondWindowPosition({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y
    });
  };

  const handleSecondWindowMouseUp = () => {
    setIsSecondDragging(false);
  };

  // Drag handlers for travel window
  const handleTravelWindowMouseDown = (e) => {
    if (e.target.closest('button')) return; // Don't drag if clicking a button
    setIsTravelDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    e.preventDefault();
  };

  const handleTravelWindowMouseMove = (e) => {
    if (!isTravelDragging) return;
    setTravelWindowPosition({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y
    });
  };

  const handleTravelWindowMouseUp = () => {
    setIsTravelDragging(false);
  };

  const hasSavedPositions = () => {
    return localStorage.getItem('sliderPositions') !== null;
  };

  // Add global mouse event listeners for dragging
  React.useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      handleWindowMouseMove(e);
      handleSecondWindowMouseMove(e);
      handleTravelWindowMouseMove(e);
    };

    const handleGlobalMouseUp = () => {
      handleWindowMouseUp();
      handleSecondWindowMouseUp();
      handleTravelWindowMouseUp();
    };

    if (isDragging || isSecondDragging || isTravelDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, isSecondDragging, isTravelDragging, dragOffset]);

  // Add functions for environment checkboxes
  const updateEnvironmentCheckbox = (name, checked) => {
    setEnvironmentCheckboxes(prev => ({ ...prev, [name]: checked }));
  };

  // Add functions for timeline
  const addTimelineEvent = (event) => {
    setTimelineEvents(prev => [...prev, event]);
  };

  const deleteTimelineEvent = (id) => {
    setTimelineEvents(prev => prev.filter(event => event.id !== id));
  };

  // Render slider row function
  const renderSliderRow = (sliders, align = "center") => (
    <div style={{ 
      display: "flex", 
      gap: "2px", 
      justifyContent: align, 
      alignItems: "flex-start",
      width: "100%",
      maxWidth: "100%",
      position: "relative",
      minHeight: sliders.length > 10 ? "380px" : "220px",
      overflow: sliders.length > 10 ? "visible" : "hidden"
    }}>
      {sliders.map((slider, index) => (
        <React.Fragment key={slider.name}>
          <Slider
            value={sliderValues[slider.name]}
            onChange={(value) => handleSliderChange(slider.name, value)}
            onMouseDown={handleSliderMouseDown}
            label={slider.label}
            unit={slider.unit}
            multiplier={slider.multiplier}
          />
          {index < sliders.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </div>
  );

  // Render view content based on active view
  const renderViewContent = () => {
    switch (activeView) {
      case 'inputs':
        return (
          <div style={{ padding: "8px", width: "100%", height: "300px", display: "flex", alignItems: "flex-start", justifyContent: "flex-start", overflow: "auto" }}>
            {renderSliderRow(INPUT_SLIDERS, "flex-start")}
          </div>
        );
      
      case 'emotions':
        return (
          <div style={{ padding: "8px", width: "100%", height: "300px", display: "flex", alignItems: "flex-start", justifyContent: "flex-start", overflow: "auto" }}>
            {renderSliderRow(EMOTION_SLIDERS, "flex-start")}
          </div>
        );
      
      case 'environment':
        const environmentCheckboxConfig = [
          { name: 'noise', label: 'Noise', checked: environmentCheckboxes.noise, onChange: (checked) => updateEnvironmentCheckbox('noise', checked) },
          { name: 'lighting', label: 'Lighting', checked: environmentCheckboxes.lighting, onChange: (checked) => updateEnvironmentCheckbox('lighting', checked) },
          { name: 'temperature', label: 'Temperature', checked: environmentCheckboxes.temperature, onChange: (checked) => updateEnvironmentCheckbox('temperature', checked) },
          { name: 'crowding', label: 'Crowding', checked: environmentCheckboxes.crowding, onChange: (checked) => updateEnvironmentCheckbox('crowding', checked) },
          { name: 'airQuality', label: 'Air Quality', checked: environmentCheckboxes.airQuality, onChange: (checked) => updateEnvironmentCheckbox('airQuality', checked) },
          { name: 'cleanliness', label: 'Cleanliness', checked: environmentCheckboxes.cleanliness, onChange: (checked) => updateEnvironmentCheckbox('cleanliness', checked) }
        ];
        return (
          <div style={{ padding: "8px", width: "100%", height: "300px", display: "flex", alignItems: "flex-start", justifyContent: "flex-start", overflow: "auto" }}>
            <CheckboxGroup checkboxes={environmentCheckboxConfig} columns={3} />
          </div>
        );
      
      case 'timeline':
        return (
          <div style={{ padding: "8px", width: "100%", height: "300px", display: "flex", alignItems: "flex-start", justifyContent: "flex-start", overflow: "auto" }}>
            <Timeline 
              events={timelineEvents}
              onAddEvent={addTimelineEvent}
              onDeleteEvent={deleteTimelineEvent}
            />
          </div>
        );
      
      case 'about':
        return (
          <div style={{ padding: "8px", width: "100%", height: "500px", display: "flex", alignItems: "flex-start", justifyContent: "flex-start", overflow: "auto" }}>
            <div style={{ width: "100%", background: "#d4d0c8", border: "2px inset #c0c0c0", padding: "8px", display: "flex", flexDirection: "row" }}>
              {/* Left Sidebar Menu */}
                <div style={{
                  width: "150px",
                  background: "#c0c0c0",
                  border: "2px inset #c0c0c0",
                  padding: "4px",
                  marginRight: "8px",
                  fontSize: "8px",
                  fontFamily: "'MS Sans Serif', sans-serif",
                  overflow: "auto"
                }}>
                <div style={{ marginBottom: "8px", fontWeight: "bold", fontSize: "9px", color: "#000080" }}>
                  Organizational Strategy & Delivery
                </div>
                
                <div style={{ marginBottom: "6px", fontWeight: "bold", fontSize: "8px", color: "#000000" }}>
                  Strategic Management
                </div>
                <button
                  onClick={() => setActiveTab('mission')}
                  style={{
                    background: activeTab === 'mission' ? "#ffffff" : "#c0c0c0",
                    border: "1px outset #c0c0c0",
                    padding: "2px 6px",
                    fontSize: "8px",
                    fontFamily: "'MS Sans Serif', sans-serif",
                    cursor: "pointer",
                    width: "100%",
                    textAlign: "left",
                    marginBottom: "1px",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  🏢 Company Mission
                </button>
                <button
                  onClick={() => setActiveTab('business')}
                  style={{
                    background: activeTab === 'business' ? "#ffffff" : "#c0c0c0",
                    border: "1px outset #c0c0c0",
                    padding: "2px 6px",
                    fontSize: "8px",
                    fontFamily: "'MS Sans Serif', sans-serif",
                    cursor: "pointer",
                    width: "100%",
                    textAlign: "left",
                    marginBottom: "1px",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  💼 Business Strategy
                </button>
                <button
                  onClick={() => setActiveTab('strategy')}
                  style={{
                    background: activeTab === 'strategy' ? "#ffffff" : "#c0c0c0",
                    border: "1px outset #c0c0c0",
                    padding: "2px 6px",
                    fontSize: "8px",
                    fontFamily: "'MS Sans Serif', sans-serif",
                    cursor: "pointer",
                    width: "100%",
                    textAlign: "left",
                    marginBottom: "1px",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  📊 Portfolio Strategy
                </button>
                
                <div style={{ marginBottom: "6px", marginTop: "8px", fontWeight: "bold", fontSize: "8px", color: "#000000" }}>
                  Tactical Management
                </div>
                <button
                  onClick={() => setActiveTab('program')}
                  style={{
                    background: activeTab === 'program' ? "#ffffff" : "#c0c0c0",
                    border: "1px outset #c0c0c0",
                    padding: "2px 6px",
                    fontSize: "8px",
                    fontFamily: "'MS Sans Serif', sans-serif",
                    cursor: "pointer",
                    width: "100%",
                    textAlign: "left",
                    marginBottom: "1px",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  📋 Program Management
                </button>
                <button
                  onClick={() => setActiveTab('project')}
                  style={{
                    background: activeTab === 'project' ? "#ffffff" : "#c0c0c0",
                    border: "1px outset #c0c0c0",
                    padding: "2px 6px",
                    fontSize: "8px",
                    fontFamily: "'MS Sans Serif', sans-serif",
                    cursor: "pointer",
                    width: "100%",
                    textAlign: "left",
                    marginBottom: "1px",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  📋 Project Management
                </button>
                
                <div style={{ marginBottom: "6px", marginTop: "8px", fontWeight: "bold", fontSize: "8px", color: "#000000" }}>
                  Product Information (Execution)
                </div>
                <button
                  onClick={() => setActiveTab('vision')}
                  style={{
                    background: activeTab === 'vision' ? "#ffffff" : "#c0c0c0",
                    border: "1px outset #c0c0c0",
                    padding: "2px 6px",
                    fontSize: "8px",
                    fontFamily: "'MS Sans Serif', sans-serif",
                    cursor: "pointer",
                    width: "100%",
                    textAlign: "left",
                    marginBottom: "1px",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  🎯 Product Vision
                </button>
                <button
                  onClick={() => setActiveTab('requirements')}
                  style={{
                    background: activeTab === 'requirements' ? "#ffffff" : "#c0c0c0",
                    border: "1px outset #c0c0c0",
                    padding: "2px 6px",
                    fontSize: "8px",
                    fontFamily: "'MS Sans Serif', sans-serif",
                    cursor: "pointer",
                    width: "100%",
                    textAlign: "left",
                    marginBottom: "1px",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  📝 Product Requirements (PRD)
                </button>
                <button
                  onClick={() => setActiveTab('guidelines')}
                  style={{
                    background: activeTab === 'guidelines' ? "#ffffff" : "#c0c0c0",
                    border: "1px outset #c0c0c0",
                    padding: "2px 6px",
                    fontSize: "8px",
                    fontFamily: "'MS Sans Serif', sans-serif",
                    cursor: "pointer",
                    width: "100%",
                    textAlign: "left",
                    marginBottom: "1px",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  🎨 Interface Guidelines / Design System
                </button>
                <button
                  onClick={() => setActiveTab('developer')}
                  style={{
                    background: activeTab === 'developer' ? "#ffffff" : "#c0c0c0",
                    border: "1px outset #c0c0c0",
                    padding: "2px 6px",
                    fontSize: "8px",
                    fontFamily: "'MS Sans Serif', sans-serif",
                    cursor: "pointer",
                    width: "100%",
                    textAlign: "left",
                    marginBottom: "1px",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  ⚙️ Developer Specs / Architecture
                </button>
                <button
                  onClick={() => setActiveTab('habits')}
                  style={{
                    background: activeTab === 'habits' ? "#ffffff" : "#c0c0c0",
                    border: "1px outset #c0c0c0",
                    padding: "2px 6px",
                    fontSize: "8px",
                    fontFamily: "'MS Sans Serif', sans-serif",
                    cursor: "pointer",
                    width: "100%",
                    textAlign: "left",
                    marginBottom: "1px",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  🔧 Build Habits / Engineering Practices
                </button>
              </div>

              {/* Content Area */}
              <div style={{
                flex: 1,
                background: "#ffffff",
                border: "2px inset #c0c0c0",
                padding: "8px",
                minHeight: "400px",
                fontSize: "8px",
                fontFamily: "'MS Sans Serif', sans-serif",
                overflow: "auto"
              }}>
                  {activeTab === 'mission' && (
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                        <h3 style={{ margin: "0", fontSize: "14px" }}>🏢 Company Mission - why we exist</h3>
                        <button
                          onClick={() => setIsDetailedView(!isDetailedView)}
                          style={{
                            background: isDetailedView ? "#c0c0c0" : "#ffffff",
                            border: "1px outset #c0c0c0",
                            padding: "2px 6px",
                            fontSize: "8px",
                            fontFamily: "'MS Sans Serif', sans-serif",
                            cursor: "pointer",
                            minWidth: "80px"
                          }}
                        >
                          {isDetailedView ? "Simplified view" : "Detailed view"}
                        </button>
                      </div>
                      
                      {isDetailedView ? (
                        <>
                          <div style={{ marginBottom: "6px" }}>
                            <strong>What:</strong> A framework that defines organizational purpose, direction, and execution through mission, vision, and values.<br/>
                            <strong>Why:</strong> Provides a clear sense of purpose that guides all organizational decisions and creates shared understanding of the company's impact.<br/>
                            <strong>How:</strong> Define mission, vision, and core values; publish them; embed into hiring, roadmaps, and product decisions
                          </div>
                      
                      
                      <div style={{ marginBottom: "6px" }}>
                        <strong>Owners:</strong><br/>
                        • <strong>CEO/Founder:</strong> owner of mission & vision; approves strategic direction<br/>
                        • <strong>Leadership Team:</strong> defines values, drives culture, ensures operational alignment<br/>
                        • <strong>All Employees:</strong> live the values and apply them in day‑to‑day decisions<br/>
                        • <strong>Board of Directors:</strong> oversight and approval for material changes (e.g., mission/vision updates)
                      </div>
                    
                    
                      <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                        <div style={{ marginBottom: "4px" }}>
                          <strong>Planning Framework:</strong> mission definition and strategic planning<br/>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "8px", fontFamily: "'MS Sans Serif', sans-serif", marginTop: "4px" }}>
                          <thead>
                            <tr>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "20%", fontWeight: "bold" }}>Level</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "80%", fontWeight: "bold" }}>CEO/Founder </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 0 — Foundation</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Market research & user needs analysis<br/>
                                <strong>Output:</strong> mission statement, core values document<br/>
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 1 — Vision & Strategic Objectives</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Mission statement, core values, market opportunity<br/>
                                <strong>Output:</strong> Vision, measurable North‑Star, strategic objectives<br/>
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 2 — Strategic Roadmap & Success Metrics</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Vision document, North Star, strategic objectives<br/>
                                <strong>Output:</strong> Strategic roadmap and success metrics (milestones, owners, timelines, KPIs)<br/>
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 3 — Planning Complete & Execution Readiness</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Strategic roadmap, success metrics<br/>
                                <strong>Output:</strong> Execution plans created, planning artifacts finalized, execution readiness confirmed<br/>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        
                        
                        {/* <div style={{ marginTop: "8px", border: "1px solid #808080", padding: "4px", background: "#f0f0f0" }}>
                            <strong>Success Criteria:</strong><br/>
                            • Mission published + communicated<br/>
                            • Core values published + communicated<br/>
                            • Vision & North Star approved<br/>
                            • Strategic objectives defined and approved<br/>
                            • Strategic roadmap published with milestones and timelines<br/>
                            • Success metrics framework established<br/>
                            • Board approval for all planning artifacts<br/>
                            • Execution readiness confirmed (planning phase complete, ready for execution)
                          </div> */}
                        
                      </div>
                    </div>
                    
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Execution Framework:</strong> operationalizing the mission<br/>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "8px", fontFamily: "'MS Sans Serif', sans-serif", marginTop: "4px" }}>
                          <thead>
                            <tr>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "20%", fontWeight: "bold" }}>Level</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "80%", fontWeight: "bold" }}>CEO/Founder </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 1 — Start</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Planning artifacts finalized, execution readiness confirmed & execution plans<br/>
                                <strong>Output:</strong> Mission execution started<br/>
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 2 — Align</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Mission execution started, Strategic roadmap<br/>
                                <strong>Output:</strong> Department alignment (engineering, operations, support teams)<br/>
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 3 — Measure</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Department alignment (engineering, operations, support teams), Strategic execution plans<br/>
                                <strong>Output:</strong> Mission progress tracking & North Star monitoring<br/>
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 4 — Impact</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Mission progress tracking & North Star monitoring, Strategic execution plans<br/>
                                <strong>Output:</strong> Mission success validated<br/>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        
                        
                          {/* <div style={{ marginTop: "8px", border: "1px solid #808080", padding: "4px", background: "#f0f0f0" }}>
                            <strong>Success Criteria:</strong><br/>
                            • Mission execution launch completed — Owner: CEO/Founder<br/>
                            • Department plans aligned with strategic roadmap — Owner: Leadership Team<br/>
                            • Monthly North Star reports published — Owner: Head of Product<br/>
                            • Executive sign-off for scale achieved — Owner: CEO/Founder<br/>
                            • Leadership reviews & updates completed — Owner: CEO<br/>
                            • Annual mission review completed — Owner: CEO<br/>
                            • Mission validated against North Star and stakeholder outcomes — Owner: CEO
                          </div> */}
                        
                      </div>
                      
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                        <div style={{ marginBottom: "4px" }}>
                          <strong>Delivery Framework:</strong> validate, measure and celebrate mission success<br/>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "8px", fontFamily: "'MS Sans Serif', sans-serif", marginTop: "4px" }}>
                          <thead>
                            <tr>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "20%", fontWeight: "bold" }}>Level</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "80%", fontWeight: "bold" }}>CEO/Founder </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 1 — Validate</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Mission success validated, North Star progress<br/>
                                <strong>Output:</strong> Mission Validation Report<br/>
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 2 — Measure</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Mission Validation Report<br/>
                                <strong>Output:</strong> Impact Metrics Report<br/>
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 3 — Celebrate</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Impact Metrics Report<br/>
                                <strong>Output:</strong> Success Celebration Plan & Execution<br/>
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 4 — Sustain</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Success Celebration Plan & Execution<br/>
                                <strong>Output:</strong> Sustainability Plan (processes + KPIs)<br/>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        
                        
                          {/* <div style={{ marginTop: "8px", border: "1px solid #808080", padding: "4px", background: "#f0f0f0" }}>
                            <strong>Success criteria:</strong><br/>
                            • Mission validation report published — Owner: CEO/Founder<br/>
                            • Impact metrics report published — Owner: Head of Analytics<br/>
                            • Stakeholder satisfaction targets met — Owner: Head of People<br/>
                            • Celebration executed & recognition program launched — Owner: Comms/People<br/>
                            • Sustainability plans implemented and tracked — Owner: Leadership
                          </div> */}
                        
                      </div>
                      
                    </div>
                    
                    
                        </>
                      ) : (
                        <div>
                          <div style={{ marginBottom: "6px" }}>
                            <strong>What:</strong> A concise statement outlining the organization's core purpose, what it does, who it serves, and its fundamental objectives and values.<br/>
                            <strong>Why:</strong> It acts as a guiding principle for daily operations, strategic decision-making, and stakeholder communication, ensuring everyone is aligned towards common goals.<br/>
                            <strong>How:</strong> Define mission, vision, and core values; publish them; embed into hiring, roadmaps, and product decisions
                          </div>
                          
                          <div style={{ marginBottom: "6px" }}>
                            <strong>Owners:</strong><br/>
                            • <strong>CEO/Founder:</strong> owner of mission & vision; approves strategic direction<br/>
                            • <strong>Leadership Team:</strong> defines values, drives culture, ensures operational alignment<br/>
                            • <strong>All Employees:</strong> live the values and apply them in day‑to‑day decisions<br/>
                            • <strong>Board of Directors:</strong> oversight and approval for material changes (e.g., mission/vision updates)
                          </div>
                          
                            <div style={{ marginBottom: "6px" }}>
                              <strong>Planning:</strong><br/>
                              • <strong>Input:</strong> Market research & user needs analysis<br/>
                              • <strong>Output:</strong> Mission statement, core values document, Vision, measurable North‑Star, strategic objectives, roadmap, and success metrics<br/>
                              • <strong>Done when:</strong> Board approval (go/no‑go gate)
                            </div>
                          
                          <div style={{ marginBottom: "6px" }}>
                            <strong>Execution:</strong><br/>
                            • <strong>Input:</strong> Planning artifacts finalized, execution readiness confirmed<br/>
                            • <strong>Output:</strong> Mission execution started, department alignment & execution plans, mission progress tracking & North Star monitoring, scale playbook & budgets, strategic clarity & public messaging, North Star progress & strategic decisions, mission success validated<br/>
                            • <strong>Done when:</strong> mission success validated<br/>
                          </div>
                          
                          <div style={{ marginBottom: "6px" }}>
                            <strong>Delivery:</strong><br/>
                            • <strong>Input:</strong> Mission execution results, North Star progress<br/>
                            • <strong>Output:</strong> Mission Validation Report, Impact Metrics Report, Culture Assessment Report, Success Celebration Plan, Values Recognition Program, Sustainability Plans<br/>
                            • <strong>Done when:</strong> values sustainability achieved
                          </div>
                          
                          
                          
                        </div>
                      )}
                    </div>
                )}
                {activeTab === 'business' && (
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                      <h3 style={{ margin: "0", fontSize: "14px" }}>💼 Business Strategy - how we'll achieve our mission</h3>
                      <button
                        onClick={() => setIsBusinessDetailedView(!isBusinessDetailedView)}
                        style={{
                          background: isBusinessDetailedView ? "#c0c0c0" : "#ffffff",
                          border: "1px outset #c0c0c0",
                          padding: "2px 6px",
                          fontSize: "8px",
                          fontFamily: "'MS Sans Serif', sans-serif",
                          cursor: "pointer",
                          minWidth: "80px"
                        }}
                      >
                        {isBusinessDetailedView ? "Detailed view" : "Simplified view"}
                      </button>
                    </div>
                      
                      {isBusinessDetailedView ? (
                        <>
                          <div style={{ marginBottom: "6px" }}>
                            <strong>What:</strong> How we'll position ourselves in the market and compete effectively<br/>
                            <strong>Why:</strong> Enables consistent decisions and sustainable competitive advantage<br/>
                            <strong>How:</strong> Analyze market → set objectives → allocate resources → execute & iterate
                          </div>
                          
                          <div style={{ marginBottom: "6px" }}>
                            <strong>Owners:</strong><br/>
                            • <strong>CEO/Founder:</strong> strategic direction, market positioning, investor relations<br/>
                            • <strong>Business Development:</strong> partnerships, revenue model, market expansion<br/>
                            • <strong>Marketing Lead:</strong> brand positioning, customer acquisition, market research<br/>
                            • <strong>Finance Lead:</strong> financial planning, revenue optimization, risk management
                          </div>
                          
                          <div style={{ marginBottom: "6px" }}>
                            <strong>Planning:</strong><br/>
                            • <strong>Input:</strong> mission & vision, market opportunity, competitive landscape, financial targets<br/>
                            • <strong>Output:</strong> business strategy document, market analysis, strategic roadmap, resource allocation plan, launch plan<br/>
                            • <strong>Done when:</strong> Board approval, market analysis validated, roadmap approved, budget allocated, execution readiness confirmed
                          </div>
                          
                          <div style={{ marginBottom: "6px" }}>
                            <strong>Execution:</strong><br/>
                            • <strong>Input:</strong> business strategy, launch plan, market conditions<br/>
                            • <strong>Output:</strong> market launch execution, scaling strategy, optimization plan, sustainability framework<br/>
                            • <strong>Done when:</strong> market launch completed, scaling implemented, optimization achieved, sustainable growth established
                          </div>
                          
                          <div style={{ marginBottom: "6px" }}>
                            <strong>Delivery:</strong><br/>
                            • <strong>Input:</strong> execution results, market performance, impact metrics<br/>
                            • <strong>Output:</strong> market validation report, impact metrics dashboard, success celebration plan, sustainability framework<br/>
                            • <strong>Done when:</strong> market validation completed, impact measured, celebrations executed, sustainability achieved
                          </div>
                          
                        </>
                      ) : (
                        <>
                          <div style={{ marginBottom: "6px" }}>
                            <strong>What:</strong> How we'll position ourselves in the market and compete effectively<br/>
                            <strong>Why:</strong> Enables consistent decisions and sustainable competitive advantage<br/>
                            <strong>How:</strong> Analyze market → set objectives → allocate resources → execute & iterate
                          </div>
                          
                          <div style={{ marginBottom: "6px" }}>
                            <strong>Owners:</strong><br/>
                            • <strong>CEO/Founder:</strong> strategic direction, market positioning, investor relations<br/>
                            • <strong>Business Development:</strong> partnerships, revenue model, market expansion<br/>
                            • <strong>Marketing Lead:</strong> brand positioning, customer acquisition, market research<br/>
                            • <strong>Finance Lead:</strong> financial planning, revenue optimization, risk management
                          </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Planning Framework:</strong> business strategy definition and market positioning<br/>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "8px", fontFamily: "'MS Sans Serif', sans-serif", marginTop: "4px" }}>
                          <thead>
                            <tr>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "20%", fontWeight: "bold" }}>Level</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "80%", fontWeight: "bold" }}>CEO/Founder </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 0 — Foundation</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Mission statement, vision, strategic objectives, market opportunity, competitive landscape, financial targets<br/>
                                <strong>Output:</strong> business strategy foundation, market positioning, market analysis & risk assessment<br/>
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 1 — Strategy Definition & Market Positioning</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> business strategy foundation & market positioning, market analysis<br/>
                                <strong>Output:</strong> business strategy document & go‑to‑market plan<br/>
 (or CEO approval if no material funding/policy change)
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 2 — Business Roadmap & Success Metrics</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> business strategy document & go-to-market plan, market feedback<br/>
                                <strong>Output:</strong> Business roadmap & success metrics (milestones, owners, timelines, KPIs)<br/>
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 3 — Execution Preparation & Launch Plan</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Business roadmap & success metrics, market conditions<br/>
                                <strong>Output:</strong> execution readiness & launch plan<br/>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        
                        
                        
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Execution Framework:</strong> executes business strategy & market positioning<br/>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "8px", fontFamily: "'MS Sans Serif', sans-serif", marginTop: "4px" }}>
                          <thead>
                            <tr>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "20%", fontWeight: "bold" }}>Level</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "80%", fontWeight: "bold" }}>CEO/Founder </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 1 — Launch</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> execution readiness, launch plan<br/>
                                <strong>Output:</strong> market launch execution & initial traction<br/>
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 2 — Scale</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> market launch execution & initial traction, market feedback<br/>
                                <strong>Output:</strong> scaling strategy & market expansion<br/>
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 3 — Optimize</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> scaling strategy & market expansion, market conditions<br/>
                                <strong>Output:</strong> optimization strategy & competitive advantage<br/>
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 4 — Sustain</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> optimization strategy & competitive advantage, market position<br/>
                                <strong>Output:</strong> sustainable growth strategy & market leadership<br/>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        
                        
                        
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Delivery Framework:</strong> validate, measure, celebrate and sustain business success<br/>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "8px", fontFamily: "'MS Sans Serif', sans-serif", marginTop: "4px" }}>
                          <thead>
                            <tr>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "20%", fontWeight: "bold" }}>Level</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "80%", fontWeight: "bold" }}>CEO/Founder </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 1 — Validate</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> execution results, market performance<br/>
                                <strong>Output:</strong> market validation report & strategic assessment<br/>
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 2 — Measure</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> validation reports, market metrics<br/>
                                <strong>Output:</strong> strategic impact metrics & market analysis<br/>
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 3 — Celebrate</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> impact metrics, market success<br/>
                                <strong>Output:</strong> strategic success celebration & market recognition<br/>
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 4 — Sustain</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> celebration outcomes, market position<br/>
                                <strong>Output:</strong> sustainable market leadership & continuous growth<br/>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        
                        
                        
                      </div>
                    </div>
                    
                        </>
                      )}
                  </div>
                )}
                {activeTab === 'strategy' && (
                  <div>
                    <h3 style={{ margin: "0 0 6px 0", fontSize: "14px" }}>📊 Portfolio Strategy - what we'll build to collectively achieve the mission</h3>
                    
                    <div style={{ marginBottom: "6px" }}>
                      <strong>What:</strong> What products we'll build to achieve our mission<br/>
                      <strong>Why:</strong> Drive business value through diversified product portfolio<br/>
                      <strong>How:</strong> Prioritize products → allocate resources → maximize market coverage
                    </div>
                    
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Owners:</strong><br/>
                      • <strong>CEO/Founder:</strong> portfolio strategy, resource allocation, strategic direction<br/>
                      • <strong>Product Portfolio Manager:</strong> portfolio coordination, resource optimization, market coverage<br/>
                      • <strong>Business Development:</strong> market expansion, partnership strategy, revenue diversification<br/>
                      • <strong>Finance Lead:</strong> portfolio ROI, resource allocation, financial optimization
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Planning Framework:</strong> portfolio planning and product prioritization<br/>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "8px", fontFamily: "'MS Sans Serif', sans-serif", marginTop: "4px" }}>
                          <thead>
                            <tr>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "20%", fontWeight: "bold" }}>Level</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "80%", fontWeight: "bold" }}>CEO/Founder </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 0 — Foundation</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Business strategy, market analysis, resource constraints<br/>
                                <strong>Output:</strong> portfolio foundation, product categories, resource allocation framework
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 1 — Product Definition</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> portfolio foundation, product categories, market feedback<br/>
                                <strong>Output:</strong> product specifications, feature requirements, user stories
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 2 — Portfolio Roadmap</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> product specifications, feature requirements, resource constraints<br/>
                                <strong>Output:</strong> Portfolio roadmap & success metrics (milestones, owners, timelines, KPIs)
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 3 — Development Preparation</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Portfolio roadmap & success metrics, technical requirements<br/>
                                <strong>Output:</strong> development readiness & launch plan
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Execution Framework:</strong> executes portfolio strategy & product delivery<br/>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "8px", fontFamily: "'MS Sans Serif', sans-serif", marginTop: "4px" }}>
                          <thead>
                            <tr>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "20%", fontWeight: "bold" }}>Level</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "80%", fontWeight: "bold" }}>CEO/Founder </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 1 — Launch</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Portfolio roadmap, development readiness & launch plan<br/>
                                <strong>Output:</strong> product development execution & initial market traction
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 2 — Align</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> product development execution & initial market traction<br/>
                                <strong>Output:</strong> team alignment & development processes
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 3 — Measure</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> team alignment & development processes<br/>
                                <strong>Output:</strong> portfolio performance tracking & product metrics
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 4 — Impact</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> portfolio performance tracking & product metrics<br/>
                                <strong>Output:</strong> portfolio success validated & market leadership achieved
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Delivery Framework:</strong> validate, measure and celebrate portfolio success<br/>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "8px", fontFamily: "'MS Sans Serif', sans-serif", marginTop: "4px" }}>
                          <thead>
                            <tr>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "20%", fontWeight: "bold" }}>Level</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "80%", fontWeight: "bold" }}>CEO/Founder </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 1 — Validate</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> portfolio success validated & market leadership achieved<br/>
                                <strong>Output:</strong> Portfolio Validation Report
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 2 — Measure</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Portfolio Validation Report<br/>
                                <strong>Output:</strong> Portfolio Impact Metrics Report
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 3 — Celebrate</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Portfolio Impact Metrics Report<br/>
                                <strong>Output:</strong> Portfolio Success Celebration Plan & Execution
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 4 — Sustain</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Portfolio Success Celebration Plan & Execution<br/>
                                <strong>Output:</strong> Portfolio Sustainability Plan (processes + KPIs)
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                  </div>
                )}
                {activeTab === 'program' && (
                  <div>
                    <h3 style={{ margin: "0 0 6px 0", fontSize: "10px" }}>📋 Program Management</h3>
                    
                    <div style={{ marginBottom: "6px" }}>
                      <strong>What:</strong> Coordinate related projects within strategic domains to achieve shared objectives<br/>
                      <strong>Why:</strong> Maximize impact and reduce duplication through shared infrastructure and unified roadmaps<br/>
                      <strong>How:</strong> Align projects → manage dependencies → track progress → deliver outcomes
                    </div>
                    
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Owners:</strong><br/>
                      • Program Manager: coordination, stakeholder comms, governance<br/>
                      • Product Lead: Mental Health Monitor Program<br/>
                      • Head of R&D: Research & Development Program<br/>
                      • Program Director/PMO: cross-program coordination, portfolio decisions
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Planning Framework:</strong> program coordination and resource planning<br/>
                        Plan using coordinated planning models:<br/>
                        Cross-functional planning designed for program success and stakeholder alignment:<br/>
                        <br/>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "8px", fontFamily: "'MS Sans Serif', sans-serif" }}>
                          <thead>
                            <tr>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "8%", fontWeight: "bold" }}>Level</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "23%", fontWeight: "bold" }}>Program Manager</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "23%", fontWeight: "bold" }}>Architecture</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "23%", fontWeight: "bold" }}>Engineering</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "23%", fontWeight: "bold" }}>UX/Design</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 0</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Portfolio strategy, project requirements, resource constraints<br/>
                                <strong>Output:</strong> Program roadmap, dependency register, shared architecture docs
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Portfolio strategy, technical requirements, system constraints<br/>
                                <strong>Output:</strong> Architecture requirements, technical constraints, system boundaries
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Architecture requirements, development constraints, resource limits<br/>
                                <strong>Output:</strong> Engineering requirements, infrastructure needs, development estimates
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> User requirements, design constraints, brand guidelines<br/>
                                <strong>Output:</strong> UX requirements, design constraints, user research plan
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 1</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Program roadmap, dependency register, shared architecture docs<br/>
                                <strong>Output:</strong> Program scope, resource allocation, timeline coordination
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Architecture requirements, program roadmap, dependencies<br/>
                                <strong>Output:</strong> Architecture blueprint, integration strategy, technical roadmap
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Engineering requirements, architecture blueprint, resource allocation<br/>
                                <strong>Output:</strong> Engineering roadmap, infrastructure plan, development strategy
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> UX requirements, program roadmap, user research plan<br/>
                                <strong>Output:</strong> UX strategy, design roadmap, user research execution plan
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 2</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Program scope, resource allocation, timeline coordination<br/>
                                <strong>Output:</strong> Program roadmap & success metrics (milestones, owners, timelines, KPIs)
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Architecture blueprint, integration strategy, cross-project requirements<br/>
                                <strong>Output:</strong> Integration architecture, data flow design, security framework
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Engineering roadmap, infrastructure plan, shared requirements<br/>
                                <strong>Output:</strong> Shared infrastructure design, development environment plan, API strategy
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> UX strategy, design roadmap, cross-project UX requirements<br/>
                                <strong>Output:</strong> Design system plan, component library strategy, user flow architecture
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 3</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Program roadmap & success metrics, stakeholder alignment<br/>
                                <strong>Output:</strong> Program readiness confirmed & execution plan
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Integration architecture, security framework, deployment requirements<br/>
                                <strong>Output:</strong> Architecture readiness, deployment strategy, monitoring framework
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Shared infrastructure design, development environment plan, quality requirements<br/>
                                <strong>Output:</strong> Engineering readiness, testing strategy, deployment plan
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Design system plan, component library strategy, accessibility requirements<br/>
                                <strong>Output:</strong> UX readiness, design validation plan, user acceptance criteria
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Execution Framework:</strong> executes program coordination & project delivery<br/>
                        Execute using coordinated execution models:<br/>
                        Sequential build order designed for safe delivery and technical execution:<br/>
                        <br/>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "8px", fontFamily: "'MS Sans Serif', sans-serif" }}>
                          <thead>
                            <tr>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "8%", fontWeight: "bold" }}>Level</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "23%", fontWeight: "bold" }}>Program Manager</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "23%", fontWeight: "bold" }}>Architecture</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "23%", fontWeight: "bold" }}>Engineering</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "23%", fontWeight: "bold" }}>UX/Design</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 1</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Program requirements, stakeholder needs<br/>
                                <strong>Output:</strong> Execution plan, coordination framework, communication plan
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Program requirements, technical constraints<br/>
                                <strong>Output:</strong> Shared architecture blueprint, integration patterns
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Architecture blueprint, shared infrastructure requirements<br/>
                                <strong>Output:</strong> Shared infrastructure foundation, development environment
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Program UX requirements, user research<br/>
                                <strong>Output:</strong> Design system foundation, interaction patterns
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 2</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Execution plan, track outputs, dependencies<br/>
                                <strong>Output:</strong> Dependency management, progress tracking, risk mitigation
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Shared architecture blueprint, project dependencies<br/>
                                <strong>Output:</strong> Integration architecture, data flow design
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Shared infrastructure, project requirements<br/>
                                <strong>Output:</strong> Core services, shared components, APIs
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Design system, project UX requirements<br/>
                                <strong>Output:</strong> Component library, user flow designs
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 3</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Track progress, quality gates, integration points<br/>
                                <strong>Output:</strong> Quality assurance, integration coordination, issue resolution
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Integration architecture, performance requirements<br/>
                                <strong>Output:</strong> Security architecture, performance optimization plan
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Core services, integration requirements<br/>
                                <strong>Output:</strong> Integration implementation, testing framework
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Component library, usability testing results<br/>
                                <strong>Output:</strong> Refined designs, accessibility compliance
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 4</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Final deliverables, user acceptance, performance metrics<br/>
                                <strong>Output:</strong> Program success validation, lessons learned, stakeholder communication
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Security architecture, deployment requirements<br/>
                                <strong>Output:</strong> Deployment architecture, monitoring framework
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Integration implementation, deployment requirements<br/>
                                <strong>Output:</strong> Production deployment, monitoring implementation
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Refined designs, user feedback<br/>
                                <strong>Output:</strong> Final UX implementation, user acceptance validation
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Delivery Framework:</strong> validate, measure and celebrate program success<br/>
                        Deliver using coordinated delivery models:<br/>
                        Cross-functional delivery designed for program validation and stakeholder satisfaction:<br/>
                        <br/>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "8px", fontFamily: "'MS Sans Serif', sans-serif" }}>
                          <thead>
                            <tr>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "8%", fontWeight: "bold" }}>Level</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "23%", fontWeight: "bold" }}>Program Manager</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "23%", fontWeight: "bold" }}>Architecture</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "23%", fontWeight: "bold" }}>Engineering</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "23%", fontWeight: "bold" }}>UX/Design</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 1</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Program execution results, project deliverables<br/>
                                <strong>Output:</strong> Program Validation Report
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Architecture implementation, system performance data, deployment results<br/>
                                <strong>Output:</strong> Architecture validation report, system compliance assessment
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Engineering implementation, code quality metrics, deployment results<br/>
                                <strong>Output:</strong> Engineering validation report, technical compliance assessment
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> UX implementation, user feedback, accessibility testing results<br/>
                                <strong>Output:</strong> UX validation report, user satisfaction assessment
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 2</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Program Validation Report<br/>
                                <strong>Output:</strong> Program Impact Metrics Report
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Architecture validation report, performance metrics, system usage data<br/>
                                <strong>Output:</strong> Architecture impact metrics, system performance analysis
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Engineering validation report, performance metrics, reliability data<br/>
                                <strong>Output:</strong> Engineering impact metrics, technical performance analysis
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> UX validation report, user metrics, usability testing data<br/>
                                <strong>Output:</strong> UX impact metrics, user experience analysis
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 3</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Program Impact Metrics Report<br/>
                                <strong>Output:</strong> Program Success Celebration Plan & Execution
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Architecture impact metrics, stakeholder feedback, system success stories<br/>
                                <strong>Output:</strong> Architecture success celebration, technical achievement recognition
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Engineering impact metrics, team feedback, technical achievements<br/>
                                <strong>Output:</strong> Engineering success celebration, development achievement recognition
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> UX impact metrics, user testimonials, design achievements<br/>
                                <strong>Output:</strong> UX success celebration, design achievement recognition
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 4</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Program Success Celebration Plan & Execution<br/>
                                <strong>Output:</strong> Program Sustainability Plan (processes + KPIs)
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Architecture success celebration, system maintenance needs, future requirements<br/>
                                <strong>Output:</strong> Architecture sustainability plan, system maintenance framework
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Engineering success celebration, system maintenance needs, future development<br/>
                                <strong>Output:</strong> Engineering sustainability plan, development maintenance framework
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> UX success celebration, user feedback, future UX needs<br/>
                                <strong>Output:</strong> UX sustainability plan, design maintenance framework
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                  </div>
                )}
                {activeTab === 'project' && (
                  <div>
                    <h3 style={{ margin: "0 0 6px 0", fontSize: "10px" }}>📋 Project Management</h3>
                    
                    <div style={{ marginBottom: "6px" }}>
                      <strong>What:</strong> Operational execution of individual projects within program frameworks<br/>
                      <strong>Why:</strong> Deliver specific project outcomes that contribute to program objectives<br/>
                      <strong>How:</strong> How individual projects are managed and delivered within program constraints
                    </div>
                    
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Owners:</strong><br/>
                      • Project Manager: day-to-day execution, stakeholder communication, delivery<br/>
                      • Technical Lead: architecture decisions, code quality, technical delivery<br/>
                      • Product Owner: requirements, acceptance criteria, user validation<br/>
                      • Program Manager: program alignment, dependency coordination
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Planning:</strong><br/>
                        • <strong>Input:</strong> program roadmap, project requirements, resource availability, technical constraints<br/>
                        • <strong>Do:</strong> define project scope, create timeline, allocate resources, identify risks<br/>
                        • <strong>Output:</strong> project charter, work breakdown structure, resource plan, risk register<br/>
                        • <strong>Done when:</strong> project approved, team assigned, baseline established
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Execution:</strong><br/>
                        • <strong>Input:</strong> project charter, work breakdown structure, team resources<br/>
                        • <strong>Do:</strong> daily standups, sprint planning, code reviews, testing, stakeholder updates<br/>
                        • <strong>Output:</strong> working software, test results, progress reports, lessons learned<br/>
                        • <strong>Done when:</strong> features delivered, quality gates passed, stakeholders satisfied
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Delivery:</strong><br/>
                        • <strong>Input:</strong> completed features, test results, deployment artifacts<br/>
                        • <strong>Do:</strong> user acceptance testing, production deployment, documentation, training<br/>
                        • <strong>Output:</strong> live system, user documentation, support materials, project closure<br/>
                        • <strong>Done when:</strong> system live, users trained, project closed, knowledge transferred
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Governance:</strong><br/>
                        • Daily standups, weekly sprint reviews, biweekly retrospectives<br/>
                        • Monthly project reviews, quarterly program alignment<br/>
                        • Required artifacts: Project charter, Work breakdown structure, Risk register, Progress reports, Lessons learned
                      </div>
                    </div>
                    
                    <div style={{ border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div>
                        <strong>Success metrics:</strong><br/>
                        • Project delivery on time and within budget %<br/>
                        • Quality gate pass rate %<br/>
                        • Stakeholder satisfaction score<br/>
                        • Team velocity and burndown rate
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'vision' && (
                  <div>
                    <h3 style={{ margin: "0 0 6px 0", fontSize: "10px" }}>🎯 Product Vision & Strategy</h3>
                    
                    <div style={{ marginBottom: "6px" }}>
                      <strong>What:</strong> Long-term product direction and strategic positioning<br/>
                      <strong>Why:</strong> Guide product development decisions and align stakeholders on future direction<br/>
                      <strong>How:</strong> How product vision drives feature prioritization and market positioning
                    </div>
                    
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Owners:</strong><br/>
                      • Product Manager: vision definition, roadmap alignment, market positioning<br/>
                      • Design Lead: user experience vision, design language, usability standards<br/>
                      • Engineering Lead: technical feasibility, architecture alignment, scalability<br/>
                      • Business Stakeholders: market validation, business model alignment, funding
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Planning:</strong><br/>
                        • <strong>Input:</strong> market research, user feedback, competitive analysis, business objectives<br/>
                        • <strong>Do:</strong> define vision statement, create product roadmap, prioritize features, validate assumptions<br/>
                        • <strong>Output:</strong> product vision document, strategic roadmap, feature prioritization, validation results<br/>
                        • <strong>Done when:</strong> vision approved, roadmap published, stakeholders aligned
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Execution:</strong><br/>
                        • <strong>Input:</strong> product roadmap, feature specifications, user stories, design mockups<br/>
                        • <strong>Do:</strong> sprint planning, feature development, user testing, iteration cycles<br/>
                        • <strong>Output:</strong> working features, user feedback, performance metrics, iteration learnings<br/>
                        • <strong>Done when:</strong> features shipped, users engaged, metrics improved
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Delivery:</strong><br/>
                        • <strong>Input:</strong> completed features, user feedback, market data, performance metrics<br/>
                        • <strong>Do:</strong> market launch, user onboarding, feedback collection, performance monitoring<br/>
                        • <strong>Output:</strong> market-ready product, user adoption, revenue generation, market position<br/>
                        • <strong>Done when:</strong> product launched, users adopting, business objectives met
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Core Vision Elements:</strong><br/>
                      • <strong>Mission:</strong> Empower individuals to take control of their mental health through intuitive, nostalgic technology<br/>
                      • <strong>Vision:</strong> A mental health monitoring platform that combines Windows 95 simplicity with modern wellness science<br/>
                      • <strong>Values:</strong> Privacy first, Simplicity over complexity, Technology serves people<br/>
                      • <strong>North Star:</strong> 1 million people using our Windows-95-inspired mental health tools by 2030
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Governance:</strong><br/>
                        • Weekly product reviews, monthly roadmap updates, quarterly vision alignment<br/>
                        • Annual strategic planning, market analysis, competitive positioning<br/>
                        • Required artifacts: Product vision document, Strategic roadmap, Feature specifications, Market analysis
                      </div>
                    </div>
                    
                    <div style={{ border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div>
                        <strong>Success metrics:</strong><br/>
                        • User adoption and retention rates<br/>
                        • Feature usage and engagement metrics<br/>
                        • Market share and competitive position<br/>
                        • Revenue growth and business objectives achievement
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'requirements' && (
                  <div>
                    <h3 style={{ margin: "0 0 6px 0", fontSize: "10px" }}>📝 Product Requirements</h3>
                    
                    <div style={{ marginBottom: "6px" }}>
                      <strong>What:</strong> Detailed specifications for product features and functionality<br/>
                      <strong>Why:</strong> Ensure development team builds exactly what users need and business requires<br/>
                      <strong>How:</strong> How requirements drive development priorities and quality standards
                    </div>
                    
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Owners:</strong><br/>
                      • Product Manager: business requirements, user stories, acceptance criteria<br/>
                      • UX Designer: user experience requirements, interaction specifications, usability standards<br/>
                      • Technical Lead: technical requirements, architecture constraints, performance standards<br/>
                      • QA Lead: quality requirements, testing criteria, validation standards
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Planning:</strong><br/>
                        • <strong>Input:</strong> user research, business objectives, technical constraints, market analysis<br/>
                        • <strong>Do:</strong> gather requirements, define user stories, create acceptance criteria, prioritize features<br/>
                        • <strong>Output:</strong> requirements document, user stories, acceptance criteria, feature prioritization<br/>
                        • <strong>Done when:</strong> requirements approved, user stories ready, development can begin
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Execution:</strong><br/>
                        • <strong>Input:</strong> requirements document, user stories, design mockups, technical specifications<br/>
                        • <strong>Do:</strong> sprint planning, feature development, code reviews, testing, requirement validation<br/>
                        • <strong>Output:</strong> working features, test results, requirement traceability, quality metrics<br/>
                        • <strong>Done when:</strong> features meet requirements, quality gates passed, stakeholders approve
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Delivery:</strong><br/>
                        • <strong>Input:</strong> completed features, test results, user feedback, requirement validation<br/>
                        • <strong>Do:</strong> user acceptance testing, requirement verification, documentation, training<br/>
                        • <strong>Output:</strong> requirement-compliant product, user documentation, validation reports<br/>
                        • <strong>Done when:</strong> all requirements met, users trained, product validated
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Core Requirements Categories:</strong><br/>
                      • <strong>Functional:</strong> Sleep, emotion, and environment tracking, Timeline events, Local storage<br/>
                      • <strong>Technical:</strong> React 19+ with Vite, Local storage persistence, No external API dependencies<br/>
                      • <strong>Design:</strong> 100% Windows 95 Guidelines compliance, MS Sans Serif 8px typography, Authentic color palette<br/>
                      • <strong>Performance:</strong> Fast load times (&lt; 2 seconds), Offline-first functionality, Smooth interactions
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Governance:</strong><br/>
                        • Weekly requirement reviews, biweekly user story refinement, monthly requirement validation<br/>
                        • Quarterly requirement audits, stakeholder alignment, change management<br/>
                        • Required artifacts: Requirements document, User stories, Acceptance criteria, Test cases, Validation reports
                      </div>
                    </div>
                    
                    <div style={{ border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div>
                        <strong>Success metrics:</strong><br/>
                        • Requirement coverage and traceability %<br/>
                        • User story completion rate %<br/>
                        • Quality gate pass rate %<br/>
                        • Stakeholder satisfaction with delivered features
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'guidelines' && (
                  <div>
                    <h3 style={{ margin: "0 0 6px 0", fontSize: "14px" }}>🎨 Interface Guidelines</h3>
                    
                    <div style={{ marginBottom: "6px" }}>
                      <strong>What:</strong> Design standards and visual specifications for consistent user experience<br/>
                      <strong>Why:</strong> Ensure all interfaces follow Windows 95 design principles for authentic user experience<br/>
                      <strong>How:</strong> How design guidelines drive consistent implementation across all components
                    </div>
                    
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Owners:</strong><br/>
                      • Design Lead: visual standards, component specifications, design system maintenance<br/>
                      • Frontend Developer: implementation standards, component library, code quality<br/>
                      • UX Researcher: usability standards, accessibility guidelines, user testing protocols<br/>
                      • Product Manager: design consistency, brand alignment, user experience validation
                    </div>
                    
                    
                    
                    <div style={{ marginBottom: "6px" }}>
                      <div style={{ fontSize: "12px", fontWeight: "bold", marginBottom: "4px" }}>Fundamentals of designing user interaction</div>
                      <div 
                        style={{ 
                          fontSize: "10px", 
                          fontWeight: "bold", 
                          marginBottom: "4px", 
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center"
                        }}
                        onClick={() => toggleSection('principles')}
                      >
                        <span style={{ marginRight: "4px" }}>
                          {collapsedSections['principles'] ? '▶' : '▼'}
                        </span>
                        User-Centered Design Principles:
                      </div>
                      {!collapsedSections['principles'] && (
                        <>
                          <strong>User in Control:</strong> Users should always feel in control of the software, not controlled by it, with the ability to customize the interface and avoid restrictive modes.<br/>
                          <br/>
                          <strong>Directness:</strong> Users should be able to directly manipulate software representations of information with visible results and familiar metaphors that transfer real-world knowledge.<br/>
                          <br/>
                          <strong>Consistency:</strong> Maintain consistent behavior, appearance, and command names across the interface to allow users to transfer existing knowledge to new tasks.<br/>
                          <br/>
                          <strong>Forgiveness:</strong> Design interfaces that allow users to explore safely, make actions reversible, and provide clear recovery from mistakes.<br/>
                          <br/>
                          <strong>Feedback:</strong> Always provide timely visual and audio feedback for user actions to confirm the software is responding and communicate the nature of the action.<br/>
                          <br/>
                          <strong>Aesthetics:</strong> Create visually appealing interfaces that contribute to user understanding while avoiding visual clutter that competes for attention.<br/>
                          <br/>
                          <strong>Simplicity:</strong> Design interfaces that are simple, easy to learn, and easy to use while providing access to all functionality through progressive disclosure and natural organization.
                        </>
                      )}
                    </div>
                    
                    <div style={{ marginBottom: "6px" }}>
                      <div 
                        style={{ 
                          fontSize: "10px", 
                          fontWeight: "bold", 
                          marginBottom: "4px", 
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center"
                        }}
                        onClick={() => toggleSection('methodology')}
                      >
                        <span style={{ marginRight: "4px" }}>
                          {collapsedSections['methodology'] ? '▶' : '▼'}
                        </span>
                        Design Methodology
                      </div>
                      {!collapsedSections['methodology'] && (
                        <>
                          <strong>A Balanced Design Team:</strong><br/>
                          • Include users, developers, and designers in the design process<br/>
                          • Ensure diverse perspectives and expertise<br/>
                          • Foster collaboration and communication<br/>
                          <br/>
                          <strong>The Design Cycle:</strong><br/>
                          • Plan: Define requirements and user needs<br/>
                          • Design: Create interface concepts and prototypes<br/>
                          • Build: Implement the design<br/>
                          • Test: Evaluate with users and iterate<br/>
                          <br/>
                          <strong>Usability Assessment in the Design Process:</strong><br/>
                          • Conduct user testing throughout development<br/>
                          • Gather feedback early and often<br/>
                          • Measure usability metrics and user satisfaction<br/>
                          • Iterate based on findings<br/>
                          <br/>
                          <strong>Understanding Users:</strong><br/>
                          • Research user needs, goals, and behaviors<br/>
                          • Create user personas and scenarios<br/>
                          • Understand context of use and constraints<br/>
                          <br/>
                          <strong>Design Tradeoffs:</strong><br/>
                          • Balance functionality with simplicity<br/>
                          • Consider performance vs. features<br/>
                          • Evaluate cost vs. user benefit<br/>
                          • Make informed decisions based on user research
                        </>
                      )}
                    </div>
                    
                    <div style={{ marginBottom: "6px" }}>
                      <div 
                        style={{ 
                          fontSize: "10px", 
                          fontWeight: "bold", 
                          marginBottom: "4px", 
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center"
                        }}
                        onClick={() => toggleSection('concepts')}
                      >
                        <span style={{ marginRight: "4px" }}>
                          {collapsedSections['concepts'] ? '▶' : '▼'}
                        </span>
                        Basic Concepts
                      </div>
                      {!collapsedSections['concepts'] && (
                        <>
                          <strong>Data-Centered Design:</strong><br/>
                          • Design interfaces around data structures and user workflows<br/>
                          • Organize information hierarchically and logically<br/>
                          • Make data relationships clear and intuitive<br/>
                          <br/>
                          <strong>Objects as Metaphor:</strong><br/>
                          • Use familiar real-world objects as interface metaphors<br/>
                          • Leverage user's existing mental models<br/>
                          • Create intuitive associations between interface elements and real objects<br/>
                          <br/>
                            <strong>Object Characteristics:</strong><br/>
                            • Define clear properties and behaviors for interface objects<br/>
                            • Ensure consistent appearance and interaction patterns<br/>
                            • Make object states visible and understandable<br/>
                            <br/>
                            <strong>Relationships:</strong><br/>
                            • Establish clear relationships between interface objects<br/>
                            • Use visual hierarchy to show object importance<br/>
                            • Create logical groupings and associations<br/>
                            <br/>
                            <strong>Composition:</strong><br/>
                            • Build complex interfaces from simple components<br/>
                            • Maintain consistency in component design<br/>
                            • Allow for flexible arrangement and customization<br/>
                            <br/>
                            <strong>Persistence:</strong><br/>
                            • Remember user preferences and settings<br/>
                            • Maintain state across sessions<br/>
                            • Provide clear feedback about saved changes<br/>
                            <br/>
                            <strong>Putting Theory into Practice:</strong><br/>
                            • Apply design principles consistently<br/>
                            • Test with real users regularly<br/>
                            • Iterate based on feedback and usage data<br/>
                            <br/>
                          • Use visual cues to indicate object relationships<br/>
                          • Make navigation and hierarchy obvious to users<br/>
                          <br/>
                          <strong>Composition:</strong><br/>
                          • Build complex interfaces from simple, reusable components<br/>
                          • Maintain consistency in component design and behavior<br/>
                          • Create modular, maintainable interface structures<br/>
                          <br/>
                          <strong>Persistence:</strong><br/>
                          • Save user data and preferences automatically<br/>
                          • Maintain state across sessions and interactions<br/>
                          • Provide clear feedback about data saving and loading<br/>
                          <br/>
                          <strong>Putting Theory into Practice:</strong><br/>
                          • Apply design principles consistently across all interface elements<br/>
                          • Test designs with real users and iterate based on feedback<br/>
                          • Document design decisions and rationale for future reference
                        </>
                      )}
                    </div>
                    
                    <div style={{ marginBottom: "6px" }}>
                      <div 
                        style={{ 
                          fontSize: "10px", 
                          fontWeight: "bold", 
                          marginBottom: "4px", 
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center"
                        }}
                        onClick={() => toggleSection('windows')}
                      >
                        <span style={{ marginRight: "4px" }}>
                          {collapsedSections['windows'] ? '▶' : '▼'}
                        </span>
                        Windows Environment (Shell)
                      </div>
                      {!collapsedSections['windows'] && (
                        <>
                          <strong>The Desktop:</strong><br/>
                          • Primary workspace area for user interaction<br/>
                          • Background for application windows and icons<br/>
                          • Supports wallpaper and desktop icons<br/>
                          <br/>
                          <strong>The Taskbar:</strong><br/>
                          • Bottom bar providing access to running applications<br/>
                          • Shows open windows and allows switching between them<br/>
                          • Contains Start button and system status area<br/>
                          <br/>
                          <strong>The Start Button:</strong><br/>
                          • Primary entry point to system functions and applications<br/>
                          • Opens Start menu with program access and system options<br/>
                          • Located at the left end of the taskbar<br/>
                          <br/>
                          <strong>Window Buttons:</strong><br/>
                          • Taskbar buttons representing open applications<br/>
                          • Allow switching between running programs<br/>
                          • Show application state and provide quick access<br/>
                          <br/>
                          <strong>The Status Area:</strong><br/>
                          • System tray area on the right side of taskbar<br/>
                          • Displays system status and background applications<br/>
                          • Provides access to system settings and notifications<br/>
                          <br/>
                          <strong>Icons:</strong><br/>
                          • Visual representations of files, folders, and applications<br/>
                          • Provide quick access to programs and documents<br/>
                          • Support drag and drop operations<br/>
                          <br/>
                          <strong>Windows:</strong><br/>
                          • Primary containers for application content<br/>
                          • Standard window controls: title bar, menu bar, status bar<br/>
                          • Support resizing, moving, and layering operations
                        </>
                      )}
                    </div>
                    
                    <div style={{ marginBottom: "6px" }}>
                      <div 
                        style={{ 
                          fontSize: "10px", 
                          fontWeight: "bold", 
                          marginBottom: "4px", 
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center"
                        }}
                        onClick={() => toggleSection('inputBasics')}
                      >
                        <span style={{ marginRight: "4px" }}>
                          {collapsedSections['inputBasics'] ? '▶' : '▼'}
                        </span>
                        Input Basics
                      </div>
                      {!collapsedSections['inputBasics'] && (
                        <>
                          <strong>Input Methods:</strong><br/>
                          • Mouse: Pointing, clicking, dragging, and scrolling<br/>
                          • Keyboard: Text entry, shortcuts, and navigation<br/>
                          • Touch: Direct manipulation for touch-enabled devices<br/>
                          <br/>
                          <strong>Accessibility:</strong><br/>
                          • Design for inclusive interaction across all abilities<br/>
                          • Provide alternative input methods and feedback<br/>
                          • Support assistive technologies and screen readers<br/>
                          <br/>
                          <strong>Input Affordances:</strong><br/>
                          • Clear visual cues for interactive elements<br/>
                          • Consistent feedback for user actions<br/>
                          • Obvious states for buttons, links, and controls<br/>
                          <br/>
                          <strong>User Skill Levels:</strong><br/>
                          • Support both novice and expert users<br/>
                          • Provide progressive disclosure of advanced features<br/>
                          • Include help and guidance for complex interactions
                        </>
                      )}
                    </div>
                    
                    <div style={{ marginBottom: "6px" }}>
                      <div 
                        style={{ 
                          fontSize: "10px", 
                          fontWeight: "bold", 
                          marginBottom: "4px", 
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center"
                        }}
                        onClick={() => toggleSection('interactionTechniques')}
                      >
                        <span style={{ marginRight: "4px" }}>
                          {collapsedSections['interactionTechniques'] ? '▶' : '▼'}
                        </span>
                        General interaction techniques
                      </div>
                      {!collapsedSections['interactionTechniques'] && (
                        <>
                          <strong>Standard Patterns:</strong><br/>
                          • Use familiar interaction patterns users expect<br/>
                          • Follow established conventions and behaviors<br/>
                          • Maintain consistency across the application<br/>
                          <br/>
                          <strong>Multiple Task Paths:</strong><br/>
                          • Provide different ways to accomplish the same task<br/>
                          • Support both mouse and keyboard interactions<br/>
                          • Include context menus and toolbar options<br/>
                          <br/>
                          <strong>Efficiency and Learnability:</strong><br/>
                          • Design for both efficiency and ease of learning<br/>
                          • Balance power user features with simplicity<br/>
                          • Provide clear feedback and error prevention<br/>
                          <br/>
                          <strong>Keyboard Shortcuts:</strong><br/>
                          • Include keyboard accelerators for common actions<br/>
                          • Display shortcut keys in menus and tooltips<br/>
                          • Support customizable keyboard mappings
                        </>
                      )}
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Governance:</strong><br/>
                        • Weekly design reviews, biweekly component audits, monthly accessibility assessments<br/>
                        • Quarterly design system updates, user testing, brand alignment reviews<br/>
                        • Required artifacts: Design system, Component library, Style guide, Accessibility standards, Usability reports
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Planning:</strong><br/>
                        • <strong>Input:</strong> Windows 95 Guidelines, user research, accessibility standards, brand requirements<br/>
                        • <strong>Do:</strong> define design system, create component library, establish style guide, validate usability<br/>
                        • <strong>Output:</strong> design system documentation, component specifications, style guide, usability standards<br/>
                        • <strong>Done when:</strong> design system approved, components documented, developers trained
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Execution:</strong><br/>
                        • <strong>Input:</strong> design system, component specifications, design mockups, implementation requirements<br/>
                        • <strong>Do:</strong> component development, design reviews, code reviews, accessibility testing<br/>
                        • <strong>Output:</strong> implemented components, design compliance reports, accessibility validation<br/>
                        • <strong>Done when:</strong> components implemented, design standards met, accessibility validated
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Delivery:</strong><br/>
                        • <strong>Input:</strong> implemented components, design validation, user feedback, accessibility reports<br/>
                        • <strong>Do:</strong> design audits, user testing, accessibility validation, documentation updates<br/>
                        • <strong>Output:</strong> design-compliant product, user documentation, accessibility certification<br/>
                        • <strong>Done when:</strong> design standards met, users satisfied, accessibility validated
                      </div>
                    </div>
                    
                    <div style={{ border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div>
                        <strong>Success metrics:</strong><br/>
                        • Design compliance rate %<br/>
                        • Component reusability and consistency %<br/>
                        • Accessibility compliance score<br/>
                        • User satisfaction with visual design
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'developer' && (
                  <div>
                    <h3 style={{ margin: "0 0 6px 0", fontSize: "10px" }}>🏗️ Solutions Architecture</h3>
 
                    <div style={{ border: "1px solid #808080", padding: "6px", background: "#f0f0f0" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>🏗️ Solutions Architecture Blueprint</strong><br/>
                      </div>
                       
                      <div style={{ fontSize: "8px", lineHeight: "1.4" }}>
                        <div style={{ marginBottom: "6px" }}>
                          <div 
                            style={{ 
                              cursor: "pointer", 
                              padding: "2px 4px", 
                              background: "#f0f0f0",
                              border: "1px solid #c0c0c0",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between"
                            }}
                          >
                            <strong>📋 Executive Summary</strong>
                            <span style={{ fontSize: "10px", fontWeight: "bold" }}>▶</span>
                          </div>
                        </div>

                        <div style={{ marginBottom: "6px" }}>
                          <div 
                            style={{ 
                              cursor: "pointer", 
                              padding: "2px 4px", 
                              background: "#f0f0f0",
                              border: "1px solid #c0c0c0",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between"
                            }}
                          >
                            <strong>🏗️ System Architecture Overview</strong>
                            <span style={{ fontSize: "10px", fontWeight: "bold" }}>▶</span>
                          </div>
                        </div>

                        <div style={{ marginBottom: "6px" }}>
                          <div 
                            style={{ 
                              cursor: "pointer", 
                              padding: "2px 4px", 
                              background: "#f0f0f0",
                              border: "1px solid #c0c0c0",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between"
                            }}
                          >
                            <strong>🎯 Application Domains</strong>
                            <span style={{ fontSize: "10px", fontWeight: "bold" }}>▶</span>
                          </div>
                        </div>

                        <div style={{ marginBottom: "6px" }}>
                          <div 
                            style={{ 
                              cursor: "pointer", 
                              padding: "2px 4px", 
                              background: "#f0f0f0",
                              border: "1px solid #c0c0c0",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between"
                            }}
                          >
                            <strong>📁 Directory Structure</strong>
                            <span style={{ fontSize: "10px", fontWeight: "bold" }}>▶</span>
                          </div>
                        </div>

                        <div style={{ marginBottom: "6px" }}>
                          <div 
                            style={{ 
                              cursor: "pointer", 
                              padding: "2px 4px", 
                              background: "#f0f0f0",
                              border: "1px solid #c0c0c0",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between"
                            }}
                          >
                            <strong>🔄 Data Flow Architecture</strong>
                            <span style={{ fontSize: "10px", fontWeight: "bold" }}>▶</span>
                          </div>
                        </div>

                        <div style={{ marginBottom: "6px" }}>
                          <div 
                            style={{ 
                              cursor: "pointer", 
                              padding: "2px 4px", 
                              background: "#f0f0f0",
                              border: "1px solid #c0c0c0",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between"
                            }}
                          >
                            <strong>🗄️ Database Schema (Supabase)</strong>
                            <span style={{ fontSize: "10px", fontWeight: "bold" }}>▶</span>
                          </div>
                        </div>

                        <div style={{ marginBottom: "6px" }}>
                          <div 
                            style={{ 
                              cursor: "pointer", 
                              padding: "2px 4px", 
                              background: "#f0f0f0",
                              border: "1px solid #c0c0c0",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between"
                            }}
                          >
                            <strong>🔐 Security Architecture</strong>
                            <span style={{ fontSize: "10px", fontWeight: "bold" }}>▶</span>
                          </div>
                        </div>

                        <div style={{ marginBottom: "6px" }}>
                          <div 
                            style={{ 
                              cursor: "pointer", 
                              padding: "2px 4px", 
                              background: "#f0f0f0",
                              border: "1px solid #c0c0c0",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between"
                            }}
                          >
                            <strong>🎨 UI/UX Architecture</strong>
                            <span style={{ fontSize: "10px", fontWeight: "bold" }}>▶</span>
                          </div>
                        </div>

                        <div style={{ marginBottom: "6px" }}>
                          <div 
                            style={{ 
                              cursor: "pointer", 
                              padding: "2px 4px", 
                              background: "#f0f0f0",
                              border: "1px solid #c0c0c0",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between"
                            }}
                          >
                            <strong>📊 Performance Architecture</strong>
                            <span style={{ fontSize: "10px", fontWeight: "bold" }}>▶</span>
                          </div>
                        </div>

                        <div style={{ marginBottom: "6px" }}>
                          <div 
                            style={{ 
                              cursor: "pointer", 
                              padding: "2px 4px", 
                              background: "#f0f0f0",
                              border: "1px solid #c0c0c0",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between"
                            }}
                          >
                            <strong>🚀 Deployment Architecture</strong>
                            <span style={{ fontSize: "10px", fontWeight: "bold" }}>▶</span>
                          </div>
                        </div>

                        <div style={{ marginBottom: "6px" }}>
                          <div 
                            style={{ 
                              cursor: "pointer", 
                              padding: "2px 4px", 
                              background: "#f0f0f0",
                              border: "1px solid #c0c0c0",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between"
                            }}
                          >
                            <strong>🛠️ Technology Recommendations</strong>
                            <span style={{ fontSize: "10px", fontWeight: "bold" }}>▶</span>
                          </div>
                        </div>

                        <div style={{ marginBottom: "6px" }}>
                          <div 
                            style={{ 
                              cursor: "pointer", 
                              padding: "2px 4px", 
                              background: "#f0f0f0",
                              border: "1px solid #c0c0c0",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between"
                            }}
                          >
                            <strong>📋 Implementation Roadmap</strong>
                            <span style={{ fontSize: "10px", fontWeight: "bold" }}>▶</span>
                          </div>
                        </div>

                        <div style={{ marginBottom: "6px" }}>
                          <div 
                            style={{ 
                              cursor: "pointer", 
                              padding: "2px 4px", 
                              background: "#f0f0f0",
                              border: "1px solid #c0c0c0",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between"
                            }}
                          >
                            <strong>🎯 Success Metrics</strong>
                            <span style={{ fontSize: "10px", fontWeight: "bold" }}>▶</span>
                          </div>
                        </div>

                        <div style={{ marginBottom: "6px" }}>
                          <div 
                            style={{ 
                              cursor: "pointer", 
                              padding: "2px 4px", 
                              background: "#f0f0f0",
                              border: "1px solid #c0c0c0",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between"
                            }}
                          >
                            <strong>👨‍💼 Solutions Architect Involvement by Stage</strong>
                            <span style={{ fontSize: "10px", fontWeight: "bold" }}>▶</span>
                          </div>
                        </div>

                        <div style={{ marginBottom: "6px" }}>
                          <div 
                            style={{ 
                              cursor: "pointer", 
                              padding: "2px 4px", 
                              background: "#f0f0f0",
                              border: "1px solid #c0c0c0",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between"
                            }}
                          >
                            <strong>🔗 Integration Architecture</strong>
                            <span style={{ fontSize: "10px", fontWeight: "bold" }}>▶</span>
                          </div>
                        </div>

                        <div style={{ marginBottom: "6px" }}>
                          <div 
                            style={{ 
                              cursor: "pointer", 
                              padding: "2px 4px", 
                              background: "#f0f0f0",
                              border: "1px solid #c0c0c0",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between"
                            }}
                          >
                            <strong>🔒 Compliance & Governance</strong>
                            <span style={{ fontSize: "10px", fontWeight: "bold" }}>▶</span>
                          </div>
                        </div>

                        <div style={{ marginBottom: "6px" }}>
                          <div 
                            style={{ 
                              cursor: "pointer", 
                              padding: "2px 4px", 
                              background: "#f0f0f0",
                              border: "1px solid #c0c0c0",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between"
                            }}
                          >
                            <strong>📊 Monitoring & Observability</strong>
                            <span style={{ fontSize: "10px", fontWeight: "bold" }}>▶</span>
                          </div>
                        </div>

                        <div style={{ marginBottom: "6px" }}>
                          <div 
                            style={{ 
                              cursor: "pointer", 
                              padding: "2px 4px", 
                              background: "#f0f0f0",
                              border: "1px solid #c0c0c0",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between"
                            }}
                          >
                            <strong>📝 Architecture Decision Records (ADRs)</strong>
                            <span style={{ fontSize: "10px", fontWeight: "bold" }}>▶</span>
                          </div>
                        </div>

                        <div style={{ marginBottom: "6px" }}>
                          <div 
                            style={{ 
                              cursor: "pointer", 
                              padding: "2px 4px", 
                              background: "#f0f0f0",
                              border: "1px solid #c0c0c0",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between"
                            }}
                          >
                            <strong>📈 Scalability & Capacity Planning</strong>
                            <span style={{ fontSize: "10px", fontWeight: "bold" }}>▶</span>
                          </div>
                        </div>

                        <div style={{ marginBottom: "6px" }}>
                          <div 
                            style={{ 
                              cursor: "pointer", 
                              padding: "2px 4px", 
                              background: "#f0f0f0",
                              border: "1px solid #c0c0c0",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between"
                            }}
                          >
                            <strong>📄 Full Documentation</strong>
                            <span style={{ fontSize: "10px", fontWeight: "bold" }}>▶</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'habits' && (
                  <div>
                    <h3 style={{ margin: "0 0 6px 0", fontSize: "10px" }}>🔧 Build Habits / Engineering Practices</h3>
                    
                    <div style={{ marginBottom: "6px" }}>
                      <strong>What:</strong> Development workflow and version control best practices<br/>
                      <strong>Why:</strong> Establish consistent habits that prevent lost work and enable smooth collaboration<br/>
                      <strong>How:</strong> How development habits drive code quality and team productivity
                    </div>
                    
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Owners:</strong><br/>
                      • Development Team: daily workflow execution, code quality, collaboration<br/>
                      • Technical Lead: workflow standards, tooling decisions, process improvement<br/>
                      • DevOps Engineer: CI/CD pipeline, automation, deployment processes<br/>
                      • Project Manager: workflow compliance, team productivity, delivery tracking
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Planning:</strong><br/>
                        • <strong>Input:</strong> team capabilities, project requirements, tooling constraints, collaboration needs<br/>
                        • <strong>Do:</strong> define workflow standards, establish tooling, create guidelines, train team<br/>
                        • <strong>Output:</strong> workflow documentation, tooling setup, team training, process guidelines<br/>
                        • <strong>Done when:</strong> workflow established, team trained, tools configured
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Execution:</strong><br/>
                        • <strong>Input:</strong> workflow guidelines, development tasks, code changes, team coordination<br/>
                        • <strong>Do:</strong> daily commits, code reviews, testing, documentation, collaboration<br/>
                        • <strong>Output:</strong> version-controlled code, quality reviews, test coverage, team coordination<br/>
                        • <strong>Done when:</strong> code committed, reviewed, tested, documented
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Delivery:</strong><br/>
                        • <strong>Input:</strong> completed features, tested code, documentation, team feedback<br/>
                        • <strong>Do:</strong> deployment, monitoring, feedback collection, process improvement<br/>
                        • <strong>Output:</strong> deployed features, performance metrics, process improvements, team satisfaction<br/>
                        • <strong>Done when:</strong> features deployed, performance monitored, processes improved
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Core Development Habits:</strong><br/>
                      • <strong>Version Control:</strong> Commit often, Write good commit messages, Push regularly, Check status<br/>
                      • <strong>Daily Workflow:</strong> Start with git status, Work on changes, Stage files, Commit with descriptive message, Push to backup<br/>
                      • <strong>Code Quality:</strong> Write tests, Code reviews, Documentation, Refactoring, Performance monitoring<br/>
                      • <strong>Collaboration:</strong> Clear communication, Shared standards, Knowledge sharing, Conflict resolution
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Governance:</strong><br/>
                        • Daily workflow checks, weekly process reviews, monthly tooling assessments<br/>
                        • Quarterly workflow optimization, team training, process improvement<br/>
                        • Required artifacts: Workflow documentation, Code standards, Process guidelines, Team training materials
                      </div>
                    </div>
                    
                    <div style={{ border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div>
                        <strong>Success metrics:</strong><br/>
                        • Commit frequency and message quality<br/>
                        • Code review completion rate %<br/>
                        • Test coverage and quality metrics<br/>
                        • Team productivity and satisfaction scores
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const styles = {
    mainWindow: {
      width: "1000px",
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
      flexShrink: 0,
      overflow: "hidden"
    },
    mainContent: {
      background: "#d4d0c8",
      flex: 1,
      padding: "4px",
      minHeight: "250px",
      width: "100%",
      flexShrink: 0,
      overflow: "hidden",
      display: "flex",
      flexDirection: "row"
    },
    leftContent: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      overflow: "hidden"
    }
  };

  return (
    <div style={{ 
      background: "#008080", 
      minHeight: "100vh",
      width: "100vw",
      position: "relative",
      paddingBottom: "28px" // Space for taskbar
    }}>
      {/* Desktop Icons */}
      <div
        style={{
          position: "absolute",
          top: "50px",
          left: "50px",
          width: "64px",
          height: "64px",
          cursor: "pointer",
      display: "flex",
          flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
          background: "transparent"
        }}
        onClick={openWindow}
        onDoubleClick={openWindow}
      >
        <img src="/Earth.ico" alt="Earth" style={{ width: "32px", height: "32px", marginBottom: "4px" }} />
        <span style={{
          fontSize: "8px",
          fontFamily: "'MS Sans Serif', sans-serif",
          color: "#ffffff",
          textAlign: "center",
          textShadow: "1px 1px 0px #000000"
        }}>
          Mental Health Monitor
        </span>
      </div>

      {/* Second Desktop Icon - Notepad */}
      <div
        style={{
          position: "absolute",
          top: "130px",
          left: "50px",
          width: "64px",
          height: "64px",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent"
        }}
        onClick={openSecondApp}
        onDoubleClick={openSecondApp}
      >
        <div style={{
          width: "32px",
          height: "32px",
          background: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "4px"
        }}>
          <span style={{
            fontSize: "32px",
            fontFamily: "'MS Sans Serif', sans-serif",
            color: "#ffffff",
            textShadow: "1px 1px 0px #000000"
          }}>📝</span>
        </div>
        <span style={{
          fontSize: "8px",
          fontFamily: "'MS Sans Serif', sans-serif",
          color: "#ffffff",
          textAlign: "center",
          textShadow: "1px 1px 0px #000000"
        }}>
          Notepad
        </span>
      </div>

      {/* Third Desktop Icon - Travel */}
      <div
        style={{
          position: "absolute",
          top: "210px",
          left: "50px",
          width: "64px",
          height: "64px",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent"
        }}
        onClick={openTravelApp}
        onDoubleClick={openTravelApp}
      >
        <div style={{
          width: "32px",
          height: "32px",
          background: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "4px"
        }}>
          <span style={{
            fontSize: "32px",
            fontFamily: "'MS Sans Serif', sans-serif",
            color: "#ffffff",
            textShadow: "1px 1px 0px #000000"
          }}>✈️</span>
        </div>
        <span style={{
          fontSize: "8px",
          fontFamily: "'MS Sans Serif', sans-serif",
          color: "#ffffff",
          textAlign: "center",
          textShadow: "1px 1px 0px #000000"
        }}>
          Travel Planner
        </span>
      </div>

      {/* Application Window */}
      {isWindowOpen && !isWindowMinimized && (
        <div 
          style={{
            position: "absolute",
            left: `${windowPosition.x}px`,
            top: `${windowPosition.y}px`,
            zIndex: 100,
            cursor: isDragging ? "grabbing" : "grab"
          }}
          onMouseDown={handleWindowMouseDown}
        >
      <div style={styles.mainWindow}>
            <Header onClose={closeWindow} onMinimize={minimizeWindow} />
        <Toolbar 
          activeView={activeView}
          setActiveView={setActiveView}
          outputValue={outputValue}
          bloodSugar={bloodSugar}
          getBloodSugarStatus={getBloodSugarStatus}
          saveSliderPositions={saveSliderPositions}
          recallSliderPositions={recallSliderPositions}
          hasSavedPositions={hasSavedPositions()}
                  undoSliderChange={undoSliderChange}
                  hasUndoAvailable={previousSliderValues !== null}
          cortisolLevel={cortisolLevel}
        />
        <div style={styles.mainContent}>
          <div style={styles.leftContent}>
            {renderViewContent()}
          </div>
        </div>
        <StatusBar 
          caffeineLevel={sliderValues.caffeineLevel}
          sliderValues={sliderValues}
        />
      </div>
        </div>
      )}

      {/* Second Application Window - Notepad */}
      {isSecondAppOpen && !isSecondAppMinimized && (
        <div 
          style={{
            position: "absolute",
            left: `${secondWindowPosition.x}px`,
            top: `${secondWindowPosition.y}px`,
            zIndex: 99,
            cursor: isSecondDragging ? "grabbing" : "grab"
          }}
          onMouseDown={handleSecondWindowMouseDown}
        >
          <div style={{
            background: "#c0c0c0",
            border: "2px outset #c0c0c0",
            width: "400px",
            height: "300px",
            display: "flex",
            flexDirection: "column",
            fontFamily: "'MS Sans Serif', sans-serif"
          }}>
            {/* Notepad Header */}
            <div style={{
              background: "linear-gradient(90deg, #000080 0%, #1084d0 100%)",
              color: "#ffffff",
              padding: "2px 4px",
              fontSize: "8px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #808080",
              height: "19px",
              boxSizing: "border-box"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <div style={{
                  width: "14px",
                  height: "14px",
                  background: "#ffffff",
                  border: "1px solid #808080",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <span style={{ fontSize: "8px", color: "#000000" }}>📝</span>
                </div>
                <span>Untitled - Notepad</span>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <button
                  style={{
                    width: "16px",
                    height: "14px",
                    background: "#d4d0c8",
                    borderTop: "1px solid #ffffff",
                    borderLeft: "1px solid #ffffff",
                    borderBottom: "1px solid #808080",
                    borderRight: "1px solid #808080",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "8px",
                    fontFamily: "'MS Sans Serif', sans-serif",
                    color: "#000000",
                    padding: "0",
                    lineHeight: "1",
                    fontWeight: "normal",
                    marginLeft: "2px"
                  }}
                  onClick={minimizeSecondApp}
                  title="Minimize"
                >
                  −
                </button>
                <button
                  style={{
                    width: "16px",
                    height: "14px",
                    background: "#d4d0c8",
                    borderTop: "1px solid #ffffff",
                    borderLeft: "1px solid #ffffff",
                    borderBottom: "1px solid #808080",
                    borderRight: "1px solid #808080",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "8px",
                    fontFamily: "'MS Sans Serif', sans-serif",
                    color: "#000000",
                    padding: "0",
                    lineHeight: "1",
                    fontWeight: "normal",
                    marginLeft: "2px"
                  }}
                  onClick={closeSecondApp}
                  title="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Notepad Menu Bar */}
            <div style={{
              background: "#c0c0c0",
              borderBottom: "1px solid #808080",
              padding: "2px 4px",
              fontSize: "8px",
              fontFamily: "'MS Sans Serif', sans-serif"
            }}>
              <span style={{ marginRight: "12px", cursor: "pointer" }}>File</span>
              <span style={{ marginRight: "12px", cursor: "pointer" }}>Edit</span>
              <span style={{ marginRight: "12px", cursor: "pointer" }}>Search</span>
              <span style={{ marginRight: "12px", cursor: "pointer" }}>Help</span>
            </div>

            {/* Notepad Content Area */}
            <div style={{
              flex: 1,
              background: "#ffffff",
              padding: "8px",
              fontSize: "12px",
              fontFamily: "'Courier New', monospace",
              color: "#000000",
              overflow: "auto",
              border: "1px inset #c0c0c0",
              margin: "2px"
            }}>
              <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.2" }}>
{`Welcome to Windows 95 Notepad!

This is a simple text editor that comes with Windows 95.
You can use it to create and edit text files.

Features:
• Create new documents
• Open existing files
• Save your work
• Print documents
• Find and replace text

This is a demo implementation showing how multiple
applications can run simultaneously on the Windows 95
desktop environment.

Try opening the Mental Health Monitor application
as well to see multiple windows in action!`}
              </div>
            </div>

            {/* Notepad Status Bar */}
            <div style={{
              background: "#c0c0c0",
              borderTop: "1px solid #808080",
              padding: "2px 4px",
              fontSize: "8px",
              fontFamily: "'MS Sans Serif', sans-serif",
              height: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <span>Line 1, Col 1</span>
              <span>Ready</span>
            </div>
          </div>
        </div>
      )}

      {/* Third Application Window - Travel Planner */}
      {isTravelAppOpen && !isTravelAppMinimized && (
        <div 
          style={{
            position: "absolute",
            left: `${travelWindowPosition.x}px`,
            top: `${travelWindowPosition.y}px`,
            zIndex: 98,
            cursor: isTravelDragging ? "grabbing" : "grab"
          }}
          onMouseDown={handleTravelWindowMouseDown}
        >
          <div style={{
            background: "#c0c0c0",
            border: "2px outset #c0c0c0",
            width: "700px",
            height: "600px",
            display: "flex",
            flexDirection: "column",
            fontFamily: "'MS Sans Serif', sans-serif"
          }}>
            {/* Travel App Header */}
            <div style={{
              background: "linear-gradient(90deg, #000080 0%, #1084d0 100%)",
              color: "#ffffff",
              padding: "2px 4px",
              fontSize: "8px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #808080",
              height: "19px",
              boxSizing: "border-box"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <div style={{
                  width: "14px",
                  height: "14px",
                  background: "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <span style={{ fontSize: "8px", color: "#000000" }}>✈️</span>
                </div>
                <span>Travel Planner</span>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <button
                  style={{
                    width: "16px",
                    height: "14px",
                    background: "#d4d0c8",
                    borderTop: "1px solid #ffffff",
                    borderLeft: "1px solid #ffffff",
                    borderBottom: "1px solid #808080",
                    borderRight: "1px solid #808080",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "8px",
                    fontFamily: "'MS Sans Serif', sans-serif",
                    color: "#000000",
                    padding: "0",
                    lineHeight: "1",
                    fontWeight: "normal",
                    marginLeft: "2px"
                  }}
                  onClick={minimizeTravelApp}
                  title="Minimize"
                >
                  −
                </button>
                <button
                  style={{
                    width: "16px",
                    height: "14px",
                    background: "#d4d0c8",
                    borderTop: "1px solid #ffffff",
                    borderLeft: "1px solid #ffffff",
                    borderBottom: "1px solid #808080",
                    borderRight: "1px solid #808080",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "8px",
                    fontFamily: "'MS Sans Serif', sans-serif",
                    color: "#000000",
                    padding: "0",
                    lineHeight: "1",
                    fontWeight: "normal",
                    marginLeft: "2px"
                  }}
                  onClick={closeTravelApp}
                  title="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Travel App Menu Bar */}
            <div style={{
              background: "#c0c0c0",
              borderBottom: "1px solid #808080",
              padding: "2px 4px",
              fontSize: "8px",
              fontFamily: "'MS Sans Serif', sans-serif"
            }}>
              <span style={{ marginRight: "12px", cursor: "pointer" }}>File</span>
              <span style={{ marginRight: "12px", cursor: "pointer" }}>Edit</span>
              <span style={{ marginRight: "12px", cursor: "pointer" }}>View</span>
              <span style={{ marginRight: "12px", cursor: "pointer" }}>Tools</span>
              <span style={{ marginRight: "12px", cursor: "pointer" }}>Help</span>
            </div>

            {/* Travel App Content Area */}
            <div style={{
              flex: 1,
              background: "#ffffff",
              padding: "8px",
              fontSize: "11px",
              fontFamily: "'MS Sans Serif', sans-serif",
              color: "#000000",
              overflow: "auto",
              border: "1px inset #c0c0c0",
              margin: "2px"
            }}>
              {!isSearchResultsOpen && !isCartOpen && !isTravelersPageOpen && !isPaymentPageOpen && !isLightningPageOpen && !isLightningCheckoutOpen ? (
                <div style={{ marginBottom: "12px" }}>
                  {/* Trip Info Container */}
                <div style={{
                  border: "1px inset #c0c0c0",
                  background: "#c0c0c0",
                  padding: "8px",
                  marginBottom: "12px"
                }}>
                  <h4 style={{ margin: "0 0 8px 0", fontSize: "12px", fontWeight: "bold" }}>Trip Info</h4>
                  <div style={{ fontSize: "10px", color: "#000000", lineHeight: "1.4" }}>
                    <div style={{ marginBottom: "4px" }}>
                      <strong>Destination:</strong> Miami Beach, Florida
                    </div>
                    <div style={{ marginBottom: "4px" }}>
                      <strong>Dates:</strong> January 15-18, 2024 (3 nights)
                    </div>
                    <div style={{ marginBottom: "4px" }}>
                      <strong>Travelers:</strong> 2 adults
                    </div>
                    <div style={{ marginBottom: "4px" }}>
                      <strong>Budget:</strong> $2,500 total
                    </div>
                    <div>
                      <strong>Status:</strong> Planning in progress
                    </div>
                  </div>
                </div>

                {/* Components Container */}
                <div style={{
                  border: "1px inset #c0c0c0",
                  background: "#c0c0c0",
                  padding: "8px",
                  marginBottom: "12px"
                }}>
                  
                  {/* Add Component Buttons */}
                  <div style={{ display: "flex", gap: "4px", marginBottom: "8px", flexWrap: "wrap" }}>
                    <button style={{
                      background: "#c0c0c0",
                      border: "2px outset #c0c0c0",
                      padding: "2px 6px",
                      fontSize: "10px",
                      fontFamily: "'MS Sans Serif', sans-serif",
                      cursor: "pointer",
                      height: "18px",
                      display: "flex",
                      alignItems: "center",
                      gap: "2px"
                    }}>
                      🏨 + Hotel
                    </button>
                    <button style={{
                      background: "#c0c0c0",
                      border: "2px outset #c0c0c0",
                      padding: "2px 6px",
                      fontSize: "10px",
                      fontFamily: "'MS Sans Serif', sans-serif",
                      cursor: "pointer",
                      height: "18px",
                      display: "flex",
                      alignItems: "center",
                      gap: "2px"
                    }}>
                      🛡️ + Insurance
                    </button>
                  </div>
                  

                  {/* Hotel Component */}
                  <div style={{
                    border: "1px outset #c0c0c0",
                    background: "#d4d0c8",
                    padding: "6px",
                    marginBottom: "6px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}>
                    <div style={{ fontSize: "9px", color: "#000000", lineHeight: "1.2", display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                        🏨 <strong>Hotel:</strong> Grand Plaza Resort
                      </span>
                      <span><strong>Location:</strong> 123 Beach Drive, Miami</span>
                      <span><strong>Check-in:</strong> Jan 15, 2024</span>
                      <span><strong>Check-out:</strong> Jan 18, 2024</span>
                      <span><strong>Rate:</strong> $189/night</span>
                    </div>
                    <div style={{ display: "flex", gap: "2px" }}>
                      <button 
                        style={{
                          background: "#d4d0c8",
                          border: "1px outset #c0c0c0",
                          padding: "1px",
                          fontSize: "8px",
                          fontFamily: "'MS Sans Serif', sans-serif",
                          cursor: "pointer",
                          width: "16px",
                          height: "14px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                        title="Quick Action"
                        onClick={openLightningPage}
                      >
                        ⚡
                      </button>
                      <button 
                        style={{
                          background: "#d4d0c8",
                          border: "1px outset #c0c0c0",
                          padding: "1px",
                          fontSize: "8px",
                          fontFamily: "'MS Sans Serif', sans-serif",
                          cursor: "pointer",
                          width: "16px",
                          height: "14px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                        title="Edit"
                        onClick={() => handleEditComponent("Hotel")}
                      >
                        ✏️
                      </button>
                      <button 
                        style={{
                          background: "#d4d0c8",
                          border: "1px outset #c0c0c0",
                          padding: "1px",
                          fontSize: "8px",
                          fontFamily: "'MS Sans Serif', sans-serif",
                          cursor: "pointer",
                          width: "16px",
                          height: "14px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>




                </div>
              </div>
            ) : isSearchResultsOpen ? (
              /* Search Results within Travel Planner */
              <div>
                {/* Search Results Header */}
                <div style={{
                  background: "#d4d0c8",
                  border: "1px inset #c0c0c0",
                  padding: "6px 8px",
                  marginBottom: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <div style={{ fontSize: "9px", color: "#808080", display: "flex", alignItems: "center", gap: "4px" }}>
                      <span>Home</span>
                      <span>›</span>
                      <span style={{ color: "#000080", fontWeight: "bold" }}>{isQuickAmendSearch ? "Quick Edit" : "Search Results"}</span>
                      <span>›</span>
                      <span>Cart</span>
                      <span>›</span>
                      <span>Travelers</span>
                      <span>›</span>
                      <span>Payment</span>
                    </div>
                    <span style={{ fontSize: "11px", fontWeight: "bold" }}>{isQuickAmendSearch ? "🔍 Hotel Search Results - Miami Beach, FL" : "🔍 Hotel Search Results - Miami Beach, FL"}</span>
                  </div>
                  <button
                    style={{
                      background: "#c0c0c0",
                      border: "1px outset #c0c0c0",
                      padding: "2px 6px",
                      cursor: "pointer",
                      fontSize: "9px",
                      fontFamily: "'MS Sans Serif', sans-serif",
                      fontWeight: "bold"
                    }}
                    onClick={closeSearchResults}
                  >
                    ✕ Back to Trip
                  </button>
                </div>

                {/* Search Summary */}
                <div style={{
                  background: "#f0f0f0",
                  border: "1px inset #c0c0c0",
                  padding: "6px",
                  marginBottom: "8px",
                  fontSize: "10px"
                }}>
                  <strong>Search Criteria:</strong> Jan 15-18, 2024 • 2 Guests • $150-200/night • Pool, Beach Access, Restaurant, WiFi
                </div>

                {/* Hotel Results */}
                <div style={{ display: "grid", gap: "6px" }}>
                  {/* Loading State */}
                  {isSearchLoading && (
                    <>
                      <HotelSkeleton />
                      <HotelSkeleton />
                      <HotelSkeleton />
                    </>
                  )}

                  {/* Error State */}
                  {searchError && (
                    <ErrorMessage 
                      error={searchError}
                      onRetry={() => openSearchResults()}
                    />
                  )}

                  {/* Current Booking (Quick Amend) */}
                  {!isSearchLoading && !searchError && apiResults.length === 0 && cartItems.length > 0 && cartItems[0].id === 'current-booking' && (
                    <div style={{
                      border: "1px outset #c0c0c0",
                      background: "#d4d0c8",
                      padding: "8px",
                      marginBottom: "8px"
                    }}>
                      {/* Hotel Header */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                        <div>
                          <h4 style={{ margin: "0 0 4px 0", fontSize: "13px", fontWeight: "bold" }}>🏨 {cartItems[0].name}</h4>
                          <p style={{ margin: "0 0 4px 0", fontSize: "10px", color: "#000080" }}>
                            {cartItems[0].rating} • Miami Beach, FL
                          </p>
                          <p style={{ margin: "0", fontSize: "10px" }}>{cartItems[0].address}</p>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontSize: "13px", fontWeight: "bold", color: "#000080" }}>
                            From $189/night
                          </div>
                          <div style={{ fontSize: "9px", color: "#808080" }}>
                            {cartItems[0].checkIn} - {cartItems[0].checkOut}
                          </div>
                        </div>
                      </div>

                      {/* Room Options */}
                      <div style={{ marginBottom: "12px" }}>
                        <h5 style={{ margin: "0 0 8px 0", fontSize: "11px", fontWeight: "bold", color: "#000080" }}>Available Rooms:</h5>
                        
                        {/* Room 1 - Current Booking (Pre-selected) */}
                        <div style={{
                          border: "2px outset #000080",
                          background: "#f0f8ff",
                          padding: "8px",
                          marginBottom: "6px"
                        }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div>
                              <div style={{ fontSize: "11px", fontWeight: "bold" }}>✓ Ocean View Suite (Current Booking)</div>
                              <div style={{ fontSize: "9px", color: "#000080" }}>King bed • Ocean view • 450 sq ft</div>
                              <div style={{ fontSize: "9px", color: "#008000", fontWeight: "bold" }}>✓ {cartItems[0].cancellationPolicy}</div>
                            </div>
                            <div style={{ textAlign: "right" }}>
                              <div style={{ fontSize: "12px", fontWeight: "bold", color: "#000080" }}>$189/night</div>
                              <div style={{ fontSize: "9px", color: "#808080" }}>Total: $567</div>
                            </div>
                          </div>
                        </div>

                        {/* Room 2 - Alternative Option */}
                        <div style={{
                          border: "1px outset #c0c0c0",
                          background: "#ffffff",
                          padding: "8px",
                          marginBottom: "6px",
                          cursor: "pointer"
                        }}
                        onClick={() => selectRoom({
                          name: "🏨 Grand Plaza Resort - Deluxe Room",
                          rating: "★★★★☆ • Beachfront • 0.2 mi from center",
                          address: "123 Beach Drive, Miami Beach, FL",
                          price: "$165",
                          total: "$495",
                          checkIn: "Jan 15, 2024",
                          checkOut: "Jan 18, 2024",
                          guests: "2 adults",
                          amenities: "Pool • Beach Access • Restaurant • WiFi • Parking • Spa"
                        })}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div>
                              <div style={{ fontSize: "11px", fontWeight: "bold" }}>Deluxe Room</div>
                              <div style={{ fontSize: "9px", color: "#000080" }}>Queen bed • Partial ocean view • 350 sq ft</div>
                              <div style={{ fontSize: "9px", color: "#666666" }}>Free cancellation until Jan 10</div>
                            </div>
                            <div style={{ textAlign: "right" }}>
                              <div style={{ fontSize: "12px", fontWeight: "bold", color: "#000080" }}>$165/night</div>
                              <div style={{ fontSize: "9px", color: "#808080" }}>Total: $495</div>
                            </div>
                          </div>
                        </div>

                        {/* Room 3 - Budget Option */}
                        <div style={{
                          border: "1px outset #c0c0c0",
                          background: "#ffffff",
                          padding: "8px",
                          marginBottom: "6px",
                          cursor: "pointer"
                        }}
                        onClick={() => selectRoom({
                          name: "🏨 Grand Plaza Resort - Standard Room",
                          rating: "★★★★☆ • Beachfront • 0.2 mi from center",
                          address: "123 Beach Drive, Miami Beach, FL",
                          price: "$142",
                          total: "$426",
                          checkIn: "Jan 15, 2024",
                          checkOut: "Jan 18, 2024",
                          guests: "2 adults",
                          amenities: "Pool • Beach Access • Restaurant • WiFi • Parking • Spa"
                        })}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div>
                              <div style={{ fontSize: "11px", fontWeight: "bold" }}>Standard Room</div>
                              <div style={{ fontSize: "9px", color: "#000080" }}>King bed • Garden view • 300 sq ft</div>
                              <div style={{ fontSize: "9px", color: "#666666" }}>Free cancellation until Jan 10</div>
                            </div>
                            <div style={{ textAlign: "right" }}>
                              <div style={{ fontSize: "12px", fontWeight: "bold", color: "#000080" }}>$142/night</div>
                              <div style={{ fontSize: "9px", color: "#808080" }}>Total: $426</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style={{ marginBottom: "8px" }}>
                        <p style={{ margin: "0 0 4px 0", fontSize: "10px" }}>
                          <strong>Amenities:</strong> {cartItems[0].amenities.join(' • ')}
                        </p>
                        <p style={{ margin: "0 0 4px 0", fontSize: "10px" }}>
                          <strong>Description:</strong> {cartItems[0].description}
                        </p>
                        <p style={{ margin: "0", fontSize: "9px", color: "#008000", fontWeight: "bold" }}>
                          ✓ {cartItems[0].cancellationPolicy}
                        </p>
                      </div>
                      <div style={{ display: "flex", gap: "6px" }}>
                        <button style={{
                          background: "#c0c0c0",
                          border: "1px outset #c0c0c0",
                          padding: "4px 12px",
                          cursor: "pointer",
                          fontSize: "10px",
                          fontWeight: "bold"
                        }}
                        onClick={() => selectRoom(cartItems[0])}
                        >
                          Continue with Selected Room
                        </button>
                        <button style={{
                          background: "#c0c0c0",
                          border: "1px outset #c0c0c0",
                          padding: "4px 8px",
                          cursor: "pointer",
                          fontSize: "10px"
                        }}>
                          View Full Details
                        </button>
                      </div>
                    </div>
                  )}

                  {/* API Results */}
                  {!isSearchLoading && !searchError && apiResults.length > 0 && apiResults.map((hotel, index) => (
                    <div key={hotel.id || index} style={{
                      border: "1px outset #c0c0c0",
                      background: "#d4d0c8",
                      padding: "8px"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                        <div>
                          <h4 style={{ margin: "0 0 2px 0", fontSize: "12px", fontWeight: "bold" }}>🏨 {hotel.name}</h4>
                          <p style={{ margin: "0 0 2px 0", fontSize: "9px", color: "#000080" }}>
                            {hotel.rating !== 'N/A' ? '★'.repeat(Math.floor(hotel.rating)) + '☆'.repeat(5 - Math.floor(hotel.rating)) : '★★★★☆'} • {hotel.roomType}
                          </p>
                          <p style={{ margin: "0", fontSize: "9px" }}>{hotel.address}, {hotel.city}</p>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontSize: "12px", fontWeight: "bold", color: "#000080" }}>
                            {hotel.price}{hotel.currency}
                          </div>
                          <div style={{ fontSize: "8px", color: "#808080" }}>
                            {hotel.checkIn} - {hotel.checkOut}
                          </div>
                        </div>
                      </div>
                      <div style={{ marginBottom: "6px" }}>
                        <p style={{ margin: "0 0 2px 0", fontSize: "9px" }}>
                          <strong>Amenities:</strong> {hotel.amenities.length > 0 ? hotel.amenities.join(' • ') : 'Standard amenities'}
                        </p>
                        {hotel.description && hotel.description !== 'No description available' && (
                          <p style={{ margin: "0", fontSize: "9px" }}>
                            <strong>Description:</strong> {hotel.description.length > 80 ? hotel.description.substring(0, 80) + '...' : hotel.description}
                          </p>
                        )}
                      </div>
                      <div style={{ display: "flex", gap: "4px" }}>
                        <button style={{
                          background: "#c0c0c0",
                          border: "1px outset #c0c0c0",
                          padding: "2px 8px",
                          cursor: "pointer",
                          fontSize: "9px",
                          fontWeight: "bold"
                        }}
                        onClick={() => openLightningCheckout({
                          name: `🏨 ${hotel.name}`,
                          rating: hotel.rating !== 'N/A' ? '★'.repeat(Math.floor(hotel.rating)) + '☆'.repeat(5 - Math.floor(hotel.rating)) : '★★★★☆',
                          address: `${hotel.address}, ${hotel.city}`,
                          price: `${hotel.price}${hotel.currency}`,
                          total: `${hotel.price}${hotel.currency}`,
                          checkIn: hotel.checkIn,
                          checkOut: hotel.checkOut,
                          guests: "2 adults",
                          amenities: hotel.amenities.length > 0 ? hotel.amenities.join(' • ') : 'Standard amenities'
                        })}
                        >
                          Select Hotel
                        </button>
                        <button style={{
                          background: "#c0c0c0",
                          border: "1px outset #c0c0c0",
                          padding: "2px 8px",
                          cursor: "pointer",
                          fontSize: "9px"
                        }}>
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Fallback to mock data if no API results (only when not quick amend) */}
                  {!isSearchLoading && !searchError && apiResults.length === 0 && !(cartItems.length > 0 && cartItems[0].id === 'current-booking') && (
                    <>
                      {/* Hotel 1 - Always show */}
                  <div style={{
                    border: "1px outset #c0c0c0",
                    background: "#d4d0c8",
                    padding: "8px"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                      <div>
                        <h4 style={{ margin: "0 0 2px 0", fontSize: "12px", fontWeight: "bold" }}>🏨 Grand Plaza Resort</h4>
                        <p style={{ margin: "0 0 2px 0", fontSize: "9px", color: "#000080" }}>★★★★☆ • Beachfront • 0.2 mi from center</p>
                        <p style={{ margin: "0", fontSize: "9px" }}>123 Beach Drive, Miami Beach, FL</p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: "12px", fontWeight: "bold", color: "#000080" }}>$189/night</div>
                        <div style={{ fontSize: "8px", color: "#808080" }}>Total: $567</div>
                      </div>
                    </div>
                    <div style={{ marginBottom: "6px" }}>
                      <p style={{ margin: "0 0 2px 0", fontSize: "9px" }}>
                        <strong>Amenities:</strong> Pool • Beach Access • Restaurant • WiFi • Parking • Spa
                      </p>
                      <p style={{ margin: "0", fontSize: "9px" }}>
                        <strong>Description:</strong> Luxury beachfront resort with stunning ocean views.
                      </p>
                    </div>
                    <div style={{ display: "flex", gap: "4px" }}>
                      <button style={{
                        background: "#c0c0c0",
                        border: "1px outset #c0c0c0",
                        padding: "2px 8px",
                        cursor: "pointer",
                        fontSize: "9px",
                        fontWeight: "bold"
                      }}
                      onClick={() => openLightningCheckout({
                        name: "🏨 Grand Plaza Resort",
                        rating: "★★★★☆ • Beachfront • 0.2 mi from center",
                        address: "123 Beach Drive, Miami Beach, FL",
                        price: "$189",
                        total: "$567",
                        checkIn: "Jan 15, 2024",
                        checkOut: "Jan 18, 2024",
                        guests: "2 adults",
                        amenities: "Pool • Beach Access • Restaurant • WiFi • Parking • Spa"
                      })}
                      >
                        Select Hotel
                      </button>
                      <button style={{
                        background: "#c0c0c0",
                        border: "1px outset #c0c0c0",
                        padding: "2px 8px",
                        cursor: "pointer",
                        fontSize: "9px"
                      }}>
                        View Details
                      </button>
                    </div>
                  </div>

                  {/* Additional Hotels - Show only if not quick amend or if showAllHotels is true */}
                  {(!isQuickAmendSearch || showAllHotels) && (
                    <>
                      {/* Hotel 2 */}
                      <div style={{
                    border: "1px outset #c0c0c0",
                    background: "#d4d0c8",
                    padding: "8px"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                      <div>
                        <h4 style={{ margin: "0 0 2px 0", fontSize: "12px", fontWeight: "bold" }}>🏨 Ocean View Suites</h4>
                        <p style={{ margin: "0 0 2px 0", fontSize: "9px", color: "#000080" }}>★★★★☆ • Beachfront • 0.5 mi from center</p>
                        <p style={{ margin: "0", fontSize: "9px" }}>456 Ocean Drive, Miami Beach, FL</p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: "12px", fontWeight: "bold", color: "#000080" }}>$165/night</div>
                        <div style={{ fontSize: "8px", color: "#808080" }}>Total: $495</div>
                      </div>
                    </div>
                    <div style={{ marginBottom: "6px" }}>
                      <p style={{ margin: "0 0 2px 0", fontSize: "9px" }}>
                        <strong>Amenities:</strong> Pool • Beach Access • Restaurant • WiFi • Gym • Concierge
                      </p>
                      <p style={{ margin: "0", fontSize: "9px" }}>
                        <strong>Description:</strong> Modern suites with panoramic ocean views.
                      </p>
                    </div>
                    <div style={{ display: "flex", gap: "4px" }}>
                      <button style={{
                        background: "#c0c0c0",
                        border: "1px outset #c0c0c0",
                        padding: "2px 8px",
                        cursor: "pointer",
                        fontSize: "9px",
                        fontWeight: "bold"
                      }}
                      onClick={() => openLightningCheckout({
                        name: "🏨 Ocean View Suites",
                        rating: "★★★★☆ • Beachfront • 0.5 mi from center",
                        address: "456 Ocean Drive, Miami Beach, FL",
                        price: "$165",
                        total: "$495",
                        checkIn: "Jan 15, 2024",
                        checkOut: "Jan 18, 2024",
                        guests: "2 adults",
                        amenities: "Pool • Beach Access • Restaurant • WiFi • Gym • Concierge"
                      })}
                      >
                        Select Hotel
                      </button>
                      <button style={{
                        background: "#c0c0c0",
                        border: "1px outset #c0c0c0",
                        padding: "2px 8px",
                        cursor: "pointer",
                        fontSize: "9px"
                      }}>
                        View Details
                      </button>
                    </div>
                  </div>

                  {/* Hotel 3 */}
                  <div style={{
                    border: "1px outset #c0c0c0",
                    background: "#d4d0c8",
                    padding: "8px"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                      <div>
                        <h4 style={{ margin: "0 0 2px 0", fontSize: "12px", fontWeight: "bold" }}>🏨 Miami Beach Inn</h4>
                        <p style={{ margin: "0 0 2px 0", fontSize: "9px", color: "#000080" }}>★★★☆☆ • Beachfront • 0.8 mi from center</p>
                        <p style={{ margin: "0", fontSize: "9px" }}>789 Collins Avenue, Miami Beach, FL</p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: "12px", fontWeight: "bold", color: "#000080" }}>$142/night</div>
                        <div style={{ fontSize: "8px", color: "#808080" }}>Total: $426</div>
                      </div>
                    </div>
                    <div style={{ marginBottom: "6px" }}>
                      <p style={{ margin: "0 0 2px 0", fontSize: "9px" }}>
                        <strong>Amenities:</strong> Pool • Beach Access • Restaurant • WiFi • Parking
                      </p>
                      <p style={{ margin: "0", fontSize: "9px" }}>
                        <strong>Description:</strong> Classic Miami Beach hotel with Art Deco charm.
                      </p>
                    </div>
                    <div style={{ display: "flex", gap: "4px" }}>
                      <button style={{
                        background: "#c0c0c0",
                        border: "1px outset #c0c0c0",
                        padding: "2px 8px",
                        cursor: "pointer",
                        fontSize: "9px",
                        fontWeight: "bold"
                      }}
                      onClick={() => openLightningCheckout({
                        name: "🏨 Miami Beach Inn",
                        rating: "★★★☆☆ • Beachfront • 0.8 mi from center",
                        address: "789 Collins Avenue, Miami Beach, FL",
                        price: "$142",
                        total: "$426",
                        checkIn: "Jan 15, 2024",
                        checkOut: "Jan 18, 2024",
                        guests: "2 adults",
                        amenities: "Pool • Beach Access • Restaurant • WiFi • Parking"
                      })}
                      >
                        Select Hotel
                      </button>
                      <button style={{
                        background: "#c0c0c0",
                        border: "1px outset #c0c0c0",
                        padding: "2px 8px",
                        cursor: "pointer",
                        fontSize: "9px"
                      }}>
                        View Details
                      </button>
                    </div>
                  </div>
                    </>
                  )}

                  {/* Show More/Less Button for Quick Amend */}
                  {isQuickAmendSearch && (
                    <div style={{ textAlign: "center", marginTop: "8px" }}>
                      <button
                        style={{
                          background: "#c0c0c0",
                          border: "1px outset #c0c0c0",
                          padding: "4px 12px",
                          cursor: "pointer",
                          fontSize: "10px",
                          fontFamily: "'MS Sans Serif', sans-serif",
                          fontWeight: "bold"
                        }}
                        onClick={() => setShowAllHotels(!showAllHotels)}
                      >
                        {showAllHotels ? "Show Less" : "Show More Hotels"}
                      </button>
                    </div>
                  )}
                    </>
                  )}
                </div>

                {/* Pagination */}
                <div style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "6px",
                  marginTop: "12px",
                  padding: "6px"
                }}>
                  <button style={{
                    background: "#c0c0c0",
                    border: "1px outset #c0c0c0",
                    padding: "2px 6px",
                    cursor: "pointer",
                    fontSize: "9px"
                  }}>
                    ← Previous
                  </button>
                  <span style={{ fontSize: "9px", padding: "0 6px" }}>Page 1 of 3</span>
                  <button style={{
                    background: "#c0c0c0",
                    border: "1px outset #c0c0c0",
                    padding: "2px 6px",
                    cursor: "pointer",
                    fontSize: "9px"
                  }}>
                    Next →
                  </button>
                </div>
              </div>
            ) : isCartOpen ? (
              /* Cart Page within Travel Planner */
              <div>
                {/* Cart Header */}
                <div style={{
                  background: "#d4d0c8",
                  border: "1px inset #c0c0c0",
                  padding: "6px 8px",
                  marginBottom: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <div style={{ fontSize: "9px", color: "#808080", display: "flex", alignItems: "center", gap: "4px" }}>
                      <span>Home</span>
                      <span>›</span>
                      <span>Search Results</span>
                      <span>›</span>
                      <span style={{ color: "#000080", fontWeight: "bold" }}>Cart</span>
                      <span>›</span>
                      <span>Travelers</span>
                      <span>›</span>
                      <span>Payment</span>
                    </div>
                    <span style={{ fontSize: "11px", fontWeight: "bold" }}>🛒 Shopping Cart ({cartItems.length} items)</span>
                  </div>
                  <button
                    style={{
                      background: "#c0c0c0",
                      border: "1px outset #c0c0c0",
                      padding: "2px 6px",
                      cursor: "pointer",
                      fontSize: "9px",
                      fontFamily: "'MS Sans Serif', sans-serif",
                      fontWeight: "bold"
                    }}
                    onClick={closeCart}
                  >
                    ✕ Back to Trip
                  </button>
                </div>

                {/* Cart Items */}
                {cartItems.length === 0 ? (
                  <div style={{
                    background: "#f0f0f0",
                    border: "1px inset #c0c0c0",
                    padding: "20px",
                    textAlign: "center",
                    fontSize: "11px",
                    color: "#808080"
                  }}>
                    Your cart is empty
                  </div>
                ) : (
                  <div>
                    {cartItems.map((hotel, index) => (
                      <div key={index} style={{
                        border: "1px outset #c0c0c0",
                        background: "#d4d0c8",
                        padding: "8px",
                        marginBottom: "6px"
                      }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                          <div>
                            <h4 style={{ margin: "0 0 2px 0", fontSize: "12px", fontWeight: "bold" }}>{hotel.name}</h4>
                            <p style={{ margin: "0 0 2px 0", fontSize: "9px", color: "#000080" }}>{hotel.rating} • {hotel.location}</p>
                            <p style={{ margin: "0", fontSize: "9px" }}>{hotel.address}</p>
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: "12px", fontWeight: "bold", color: "#000080" }}>{hotel.price}/night</div>
                            <div style={{ fontSize: "8px", color: "#808080" }}>Total: {hotel.total}</div>
                          </div>
                        </div>
                        <div style={{ marginBottom: "6px" }}>
                          <p style={{ margin: "0 0 2px 0", fontSize: "9px" }}>
                            <strong>Dates:</strong> {hotel.checkIn} - {hotel.checkOut}
                          </p>
                          <p style={{ margin: "0 0 2px 0", fontSize: "9px" }}>
                            <strong>Guests:</strong> {hotel.guests}
                          </p>
                          <p style={{ margin: "0", fontSize: "9px" }}>
                            <strong>Amenities:</strong> {hotel.amenities}
                          </p>
                        </div>
                        <div style={{ display: "flex", gap: "4px" }}>
                          <button style={{
                            background: "#c0c0c0",
                            border: "1px outset #c0c0c0",
                            padding: "2px 8px",
                            cursor: "pointer",
                            fontSize: "9px",
                            fontWeight: "bold"
                          }}>
                            Modify
                          </button>
                          <button 
                            style={{
                              background: "#c0c0c0",
                              border: "1px outset #c0c0c0",
                              padding: "2px 8px",
                              cursor: "pointer",
                              fontSize: "9px"
                            }}
                            onClick={() => removeFromCart(index)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Cart Summary */}
                    <div style={{
                      border: "1px outset #c0c0c0",
                      background: "#f0f0f0",
                      padding: "8px",
                      marginTop: "8px"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                        <span style={{ fontSize: "11px", fontWeight: "bold" }}>Total Cost:</span>
                        <span style={{ fontSize: "14px", fontWeight: "bold", color: "#000080" }}>
                          ${cartItems.reduce((sum, item) => sum + parseInt(item.total.replace('$', '')), 0)}
                        </span>
                      </div>
                      <div style={{ fontSize: "9px", color: "#808080", marginBottom: "8px" }}>
                        {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} • 3 nights
                      </div>
                      <div style={{ display: "flex", gap: "4px" }}>
                        <button style={{
                          background: "#c0c0c0",
                          border: "1px outset #c0c0c0",
                          padding: "4px 12px",
                          cursor: "pointer",
                          fontSize: "10px",
                          fontWeight: "bold",
                          flex: 1
                        }}
                        onClick={openTravelersPage}
                        >
                          Proceed to Checkout
                        </button>
                        <button style={{
                          background: "#c0c0c0",
                          border: "1px outset #c0c0c0",
                          padding: "4px 8px",
                          cursor: "pointer",
                          fontSize: "10px"
                        }}
                        onClick={() => {
                          setIsCartOpen(false);
                          setIsSearchResultsOpen(true);
                        }}
                        >
                          Continue Shopping
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : isTravelersPageOpen ? (
              /* Travelers Page within Travel Planner */
              <div>
                {/* Travelers Page Header */}
                <div style={{
                  background: "#d4d0c8",
                  border: "1px inset #c0c0c0",
                  padding: "6px 8px",
                  marginBottom: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <div style={{ fontSize: "9px", color: "#808080", display: "flex", alignItems: "center", gap: "4px" }}>
                      <span>Home</span>
                      <span>›</span>
                      <span>Search Results</span>
                      <span>›</span>
                      <span>Cart</span>
                      <span>›</span>
                      <span style={{ color: "#000080", fontWeight: "bold" }}>Travelers</span>
                      <span>›</span>
                      <span>Payment</span>
                    </div>
                    <span style={{ fontSize: "11px", fontWeight: "bold" }}>👥 Travelers Information</span>
                  </div>
                  <button
                    style={{
                      background: "#c0c0c0",
                      border: "1px outset #c0c0c0",
                      padding: "2px 6px",
                      cursor: "pointer",
                      fontSize: "9px",
                      fontFamily: "'MS Sans Serif', sans-serif",
                      fontWeight: "bold"
                    }}
                    onClick={closeTravelersPage}
                  >
                    ✕ Back to Cart
                  </button>
                </div>

                {/* Travelers Content */}
                <div style={{
                  background: "#f0f0f0",
                  border: "1px inset #c0c0c0",
                  padding: "8px",
                  marginBottom: "8px",
                  fontSize: "10px"
                }}>
                  <strong>Booking Summary:</strong> {cartItems.length} hotel{cartItems.length !== 1 ? 's' : ''} • 3 nights • Total: ${cartItems.reduce((sum, item) => sum + parseInt(item.total.replace('$', '')), 0)}
                </div>

                {/* Traveler Details Form */}
                <div style={{ marginBottom: "12px" }}>
                  <h4 style={{ margin: "0 0 8px 0", fontSize: "12px", fontWeight: "bold" }}>Primary Guest</h4>
                  <div style={{ display: "grid", gap: "6px", marginBottom: "12px" }}>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <input
                        type="text"
                        placeholder="First Name"
                        style={{
                          flex: 1,
                          padding: "2px 4px",
                          border: "1px inset #c0c0c0",
                          background: "#ffffff",
                          fontSize: "10px",
                          fontFamily: "'MS Sans Serif', sans-serif",
                          boxSizing: "border-box"
                        }}
                        defaultValue="John"
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        style={{
                          flex: 1,
                          padding: "2px 4px",
                          border: "1px inset #c0c0c0",
                          background: "#ffffff",
                          fontSize: "10px",
                          fontFamily: "'MS Sans Serif', sans-serif",
                          boxSizing: "border-box"
                        }}
                        defaultValue="Doe"
                      />
                    </div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      style={{
                        width: "100%",
                        padding: "2px 4px",
                        border: "1px inset #c0c0c0",
                        background: "#ffffff",
                        fontSize: "10px",
                        fontFamily: "'MS Sans Serif', sans-serif",
                        boxSizing: "border-box"
                      }}
                      defaultValue="john.doe@email.com"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      style={{
                        width: "100%",
                        padding: "2px 4px",
                        border: "1px inset #c0c0c0",
                        background: "#ffffff",
                        fontSize: "10px",
                        fontFamily: "'MS Sans Serif', sans-serif",
                        boxSizing: "border-box"
                      }}
                      defaultValue="(555) 123-4567"
                    />
                  </div>

                  <h4 style={{ margin: "0 0 8px 0", fontSize: "12px", fontWeight: "bold" }}>Additional Guests</h4>
                  <div style={{ display: "grid", gap: "6px", marginBottom: "12px" }}>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <input
                        type="text"
                        placeholder="First Name"
                        style={{
                          flex: 1,
                          padding: "2px 4px",
                          border: "1px inset #c0c0c0",
                          background: "#ffffff",
                          fontSize: "10px",
                          fontFamily: "'MS Sans Serif', sans-serif",
                          boxSizing: "border-box"
                        }}
                        defaultValue="Jane"
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        style={{
                          flex: 1,
                          padding: "2px 4px",
                          border: "1px inset #c0c0c0",
                          background: "#ffffff",
                          fontSize: "10px",
                          fontFamily: "'MS Sans Serif', sans-serif",
                          boxSizing: "border-box"
                        }}
                        defaultValue="Smith"
                      />
                    </div>
                    <input
                      type="email"
                      placeholder="Email Address (Optional)"
                      style={{
                        width: "100%",
                        padding: "2px 4px",
                        border: "1px inset #c0c0c0",
                        background: "#ffffff",
                        fontSize: "10px",
                        fontFamily: "'MS Sans Serif', sans-serif",
                        boxSizing: "border-box"
                      }}
                    />
                  </div>

                  <h4 style={{ margin: "0 0 8px 0", fontSize: "12px", fontWeight: "bold" }}>Special Requests</h4>
                  <textarea
                    placeholder="Any special requests or preferences?"
                    style={{
                      width: "100%",
                      height: "40px",
                      padding: "2px 4px",
                      border: "1px inset #c0c0c0",
                      background: "#ffffff",
                      fontSize: "10px",
                      fontFamily: "'MS Sans Serif', sans-serif",
                      boxSizing: "border-box",
                      resize: "none"
                    }}
                  />
                </div>

                {/* Action Buttons */}
                <div style={{ display: "flex", gap: "4px" }}>
                  <button style={{
                    background: "#c0c0c0",
                    border: "1px outset #c0c0c0",
                    padding: "4px 12px",
                    cursor: "pointer",
                    fontSize: "10px",
                    fontWeight: "bold",
                    flex: 1
                  }}
                  onClick={openPaymentPage}
                  >
                    Continue to Payment
                  </button>
                  <button style={{
                    background: "#c0c0c0",
                    border: "1px outset #c0c0c0",
                    padding: "4px 8px",
                    cursor: "pointer",
                    fontSize: "10px"
                  }}
                  onClick={() => {
                    setIsTravelersPageOpen(false);
                    setIsCartOpen(true);
                  }}
                  >
                    Back to Cart
                  </button>
                </div>
              </div>
            ) : isPaymentPageOpen ? (
              /* Payment Page within Travel Planner */
              <div>
                {/* Payment Page Header */}
                <div style={{
                  background: "#d4d0c8",
                  border: "1px inset #c0c0c0",
                  padding: "6px 8px",
                  marginBottom: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <div style={{ fontSize: "9px", color: "#808080", display: "flex", alignItems: "center", gap: "4px" }}>
                      <span>Home</span>
                      <span>›</span>
                      <span>Search Results</span>
                      <span>›</span>
                      <span>Cart</span>
                      <span>›</span>
                      <span>Travelers</span>
                      <span>›</span>
                      <span style={{ color: "#000080", fontWeight: "bold" }}>Payment</span>
                    </div>
                    <span style={{ fontSize: "11px", fontWeight: "bold" }}>💳 Payment Information</span>
                  </div>
                  <button
                    style={{
                      background: "#c0c0c0",
                      border: "1px outset #c0c0c0",
                      padding: "2px 6px",
                      cursor: "pointer",
                      fontSize: "9px",
                      fontFamily: "'MS Sans Serif', sans-serif",
                      fontWeight: "bold"
                    }}
                    onClick={closePaymentPage}
                  >
                    ✕ Back to Travelers
                  </button>
                </div>

                {/* Payment Summary */}
                <div style={{
                  background: "#f0f0f0",
                  border: "1px inset #c0c0c0",
                  padding: "8px",
                  marginBottom: "8px",
                  fontSize: "10px"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span>Subtotal:</span>
                    <span>${cartItems.reduce((sum, item) => sum + parseInt(item.total.replace('$', '')), 0)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span>Taxes & Fees:</span>
                    <span>$45</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", borderTop: "1px solid #808080", paddingTop: "4px" }}>
                    <span>Total:</span>
                    <span>${cartItems.reduce((sum, item) => sum + parseInt(item.total.replace('$', '')), 0) + 45}</span>
                  </div>
                </div>

                {/* Payment Form */}
                <div style={{ marginBottom: "12px" }}>
                  <h4 style={{ margin: "0 0 8px 0", fontSize: "12px", fontWeight: "bold" }}>Payment Method</h4>
                  <div style={{ display: "grid", gap: "6px", marginBottom: "12px" }}>
                    <select
                      style={{
                        width: "100%",
                        padding: "2px 4px",
                        border: "1px inset #c0c0c0",
                        background: "#ffffff",
                        fontSize: "10px",
                        fontFamily: "'MS Sans Serif', sans-serif",
                        boxSizing: "border-box"
                      }}
                      defaultValue="visa"
                    >
                      <option value="visa">💳 Visa</option>
                      <option value="mastercard">💳 Mastercard</option>
                      <option value="amex">💳 American Express</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Card Number"
                      style={{
                        width: "100%",
                        padding: "2px 4px",
                        border: "1px inset #c0c0c0",
                        background: "#ffffff",
                        fontSize: "10px",
                        fontFamily: "'MS Sans Serif', sans-serif",
                        boxSizing: "border-box"
                      }}
                      defaultValue="4532 1234 5678 9012"
                    />
                    <div style={{ display: "flex", gap: "6px" }}>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        style={{
                          flex: 1,
                          padding: "2px 4px",
                          border: "1px inset #c0c0c0",
                          background: "#ffffff",
                          fontSize: "10px",
                          fontFamily: "'MS Sans Serif', sans-serif",
                          boxSizing: "border-box"
                        }}
                        defaultValue="12/25"
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        style={{
                          flex: 1,
                          padding: "2px 4px",
                          border: "1px inset #c0c0c0",
                          background: "#ffffff",
                          fontSize: "10px",
                          fontFamily: "'MS Sans Serif', sans-serif",
                          boxSizing: "border-box"
                        }}
                        defaultValue="123"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Cardholder Name"
                      style={{
                        width: "100%",
                        padding: "2px 4px",
                        border: "1px inset #c0c0c0",
                        background: "#ffffff",
                        fontSize: "10px",
                        fontFamily: "'MS Sans Serif', sans-serif",
                        boxSizing: "border-box"
                      }}
                      defaultValue="John Doe"
                    />
                  </div>

                  <h4 style={{ margin: "0 0 8px 0", fontSize: "12px", fontWeight: "bold" }}>Billing Address</h4>
                  <div style={{ display: "grid", gap: "6px", marginBottom: "12px" }}>
                    <input
                      type="text"
                      placeholder="Street Address"
                      style={{
                        width: "100%",
                        padding: "2px 4px",
                        border: "1px inset #c0c0c0",
                        background: "#ffffff",
                        fontSize: "10px",
                        fontFamily: "'MS Sans Serif', sans-serif",
                        boxSizing: "border-box"
                      }}
                      defaultValue="123 Main Street"
                    />
                    <div style={{ display: "flex", gap: "6px" }}>
                      <input
                        type="text"
                        placeholder="City"
                        style={{
                          flex: 1,
                          padding: "2px 4px",
                          border: "1px inset #c0c0c0",
                          background: "#ffffff",
                          fontSize: "10px",
                          fontFamily: "'MS Sans Serif', sans-serif",
                          boxSizing: "border-box"
                        }}
                        defaultValue="Miami"
                      />
                      <select
                        style={{
                          flex: 1,
                          padding: "2px 4px",
                          border: "1px inset #c0c0c0",
                          background: "#ffffff",
                          fontSize: "10px",
                          fontFamily: "'MS Sans Serif', sans-serif",
                          boxSizing: "border-box"
                        }}
                        defaultValue="FL"
                      >
                        <option value="FL">FL</option>
                        <option value="CA">CA</option>
                        <option value="NY">NY</option>
                        <option value="TX">TX</option>
                      </select>
                      <input
                        type="text"
                        placeholder="ZIP"
                        style={{
                          flex: 1,
                          padding: "2px 4px",
                          border: "1px inset #c0c0c0",
                          background: "#ffffff",
                          fontSize: "10px",
                          fontFamily: "'MS Sans Serif', sans-serif",
                          boxSizing: "border-box"
                        }}
                        defaultValue="33101"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: "flex", gap: "4px" }}>
                  <button style={{
                    background: "#c0c0c0",
                    border: "1px outset #c0c0c0",
                    padding: "4px 12px",
                    cursor: "pointer",
                    fontSize: "10px",
                    fontWeight: "bold",
                    flex: 1
                  }}
                  onClick={() => {
                    alert("Booking confirmed! Check your email for confirmation details.");
                    setIsPaymentPageOpen(false);
                  }}
                  >
                    Complete Booking
                  </button>
                  <button style={{
                    background: "#c0c0c0",
                    border: "1px outset #c0c0c0",
                    padding: "4px 8px",
                    cursor: "pointer",
                    fontSize: "10px"
                  }}
                  onClick={() => {
                    setIsPaymentPageOpen(false);
                    setIsTravelersPageOpen(true);
                  }}
                  >
                    Back to Travelers
                  </button>
                </div>
              </div>
            ) : isLightningPageOpen ? (
              /* Lightning Quick Action Page within Travel Planner */
              <div>
                {/* Lightning Page Header */}
                <div style={{
                  background: "#d4d0c8",
                  border: "1px inset #c0c0c0",
                  padding: "6px 8px",
                  marginBottom: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <div style={{ fontSize: "9px", color: "#808080", display: "flex", alignItems: "center", gap: "4px" }}>
                      <span>Home</span>
                      <span>›</span>
                      <span style={{ color: "#000080", fontWeight: "bold" }}>Quick Edit</span>
                    </div>
                    <span style={{ fontSize: "11px", fontWeight: "bold" }}>⚡ Quick Hotel Edit & Search</span>
                  </div>
                  <button
                    style={{
                      background: "#c0c0c0",
                      border: "1px outset #c0c0c0",
                      padding: "2px 6px",
                      cursor: "pointer",
                      fontSize: "9px",
                      fontFamily: "'MS Sans Serif', sans-serif",
                      fontWeight: "bold"
                    }}
                    onClick={closeLightningPage}
                  >
                    ✕ Close
                  </button>
                </div>

                {/* Lightning Page Content */}
                <div style={{ display: "grid", gap: "8px" }}>
                  {/* Travelers Section */}
                  <div style={{
                    border: "1px inset #c0c0c0",
                    background: "#f0f0f0",
                    padding: "8px"
                  }}>
                    <h4 style={{ margin: "0 0 8px 0", fontSize: "12px", fontWeight: "bold" }}>👥 Travelers</h4>
                    <div style={{ display: "grid", gap: "6px", marginBottom: "8px" }}>
                      <div style={{ display: "flex", gap: "6px" }}>
                        <input
                          type="text"
                          placeholder="Traveler 1"
                          style={{
                            flex: 1,
                            padding: "2px 4px",
                            border: "1px inset #c0c0c0",
                            background: "#ffffff",
                            fontSize: "10px",
                            fontFamily: "'MS Sans Serif', sans-serif",
                            boxSizing: "border-box"
                          }}
                          defaultValue="John Doe"
                        />
                        <select
                          style={{
                            padding: "2px 4px",
                            border: "1px inset #c0c0c0",
                            background: "#ffffff",
                            fontSize: "10px",
                            fontFamily: "'MS Sans Serif', sans-serif"
                          }}
                          defaultValue="adult"
                        >
                          <option value="adult">Adult</option>
                          <option value="child">Child</option>
                        </select>
                      </div>
                      <div style={{ display: "flex", gap: "6px" }}>
                        <input
                          type="text"
                          placeholder="Traveler 2"
                          style={{
                            flex: 1,
                            padding: "2px 4px",
                            border: "1px inset #c0c0c0",
                            background: "#ffffff",
                            fontSize: "10px",
                            fontFamily: "'MS Sans Serif', sans-serif",
                            boxSizing: "border-box"
                          }}
                          defaultValue="Jane Smith"
                        />
                        <select
                          style={{
                            padding: "2px 4px",
                            border: "1px inset #c0c0c0",
                            background: "#ffffff",
                            fontSize: "10px",
                            fontFamily: "'MS Sans Serif', sans-serif"
                          }}
                          defaultValue="adult"
                        >
                          <option value="adult">Adult</option>
                          <option value="child">Child</option>
                        </select>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "4px" }}>
                      <button style={{
                        background: "#c0c0c0",
                        border: "1px outset #c0c0c0",
                        padding: "2px 8px",
                        cursor: "pointer",
                        fontSize: "9px",
                        fontFamily: "'MS Sans Serif', sans-serif"
                      }}>
                        + Add Traveler
                      </button>
                      <button style={{
                        background: "#c0c0c0",
                        border: "1px outset #c0c0c0",
                        padding: "2px 8px",
                        cursor: "pointer",
                        fontSize: "9px",
                        fontFamily: "'MS Sans Serif', sans-serif"
                      }}>
                        - Remove
                      </button>
                    </div>
                  </div>

                  {/* Hotel Edit Section */}
                  <div style={{
                    border: "1px inset #c0c0c0",
                    background: "#f0f0f0",
                    padding: "8px"
                  }}>
                    <h4 style={{ margin: "0 0 8px 0", fontSize: "12px", fontWeight: "bold" }}>🏨 Current Hotel Details</h4>
                    <div style={{ display: "grid", gap: "6px" }}>
                      <div style={{ display: "flex", gap: "6px" }}>
                        <input
                          type="text"
                          placeholder="Hotel Name"
                          style={{
                            flex: 1,
                            padding: "2px 4px",
                            border: "1px inset #c0c0c0",
                            background: "#ffffff",
                            fontSize: "10px",
                            fontFamily: "'MS Sans Serif', sans-serif",
                            boxSizing: "border-box"
                          }}
                          defaultValue="Grand Plaza Resort"
                        />
                        <input
                          type="text"
                          placeholder="Location"
                          style={{
                            flex: 1,
                            padding: "2px 4px",
                            border: "1px inset #c0c0c0",
                            background: "#ffffff",
                            fontSize: "10px",
                            fontFamily: "'MS Sans Serif', sans-serif",
                            boxSizing: "border-box"
                          }}
                          defaultValue="Miami Beach, FL"
                        />
                      </div>
                      <div style={{ display: "flex", gap: "6px" }}>
                        <input
                          type="date"
                          style={{
                            flex: 1,
                            padding: "2px 4px",
                            border: "1px inset #c0c0c0",
                            background: "#ffffff",
                            fontSize: "10px",
                            fontFamily: "'MS Sans Serif', sans-serif",
                            boxSizing: "border-box"
                          }}
                          defaultValue="2024-01-15"
                        />
                        <input
                          type="date"
                          style={{
                            flex: 1,
                            padding: "2px 4px",
                            border: "1px inset #c0c0c0",
                            background: "#ffffff",
                            fontSize: "10px",
                            fontFamily: "'MS Sans Serif', sans-serif",
                            boxSizing: "border-box"
                          }}
                          defaultValue="2024-01-18"
                        />
                        <input
                          type="text"
                          placeholder="Rate/night"
                          style={{
                            flex: 1,
                            padding: "2px 4px",
                            border: "1px inset #c0c0c0",
                            background: "#ffffff",
                            fontSize: "10px",
                            fontFamily: "'MS Sans Serif', sans-serif",
                            boxSizing: "border-box"
                          }}
                          defaultValue="$189"
                        />
                      </div>
                    </div>
                  </div>


                  {/* Action Buttons */}
                  <div style={{ display: "flex", gap: "4px" }}>
                    <button style={{
                      background: "#c0c0c0",
                      border: "1px outset #c0c0c0",
                      padding: "4px 12px",
                      cursor: "pointer",
                      fontSize: "10px",
                      fontWeight: "bold",
                      flex: 1
                    }}
                    onClick={async () => {
                      closeLightningPage();
                      
                      // Show searching modal for lightning flow too
                      openSearchingModal(true); // true = quick amend search
                      
                      // Simulate realistic search time
                      const searchDelay = Math.random() * 1000 + 800; // 0.8-1.8 seconds (shorter for existing booking)
                      
                      try {
                        await new Promise(resolve => setTimeout(resolve, searchDelay));
                        // Clear previous results
                        clearResults();
                        // For quick amend, show only the current booked hotel
                        setCartItems([{
                          id: 'current-booking',
                          name: 'Grand Plaza Resort',
                          rating: '★★★★☆',
                          address: '123 Beach Drive, Miami Beach, FL',
                          city: 'Miami Beach',
                          country: 'US',
                          amenities: ['Pool', 'Beach Access', 'Restaurant', 'WiFi', 'Parking', 'Spa'],
                          description: 'Luxury beachfront resort with stunning ocean views.',
                          price: '$189',
                          currency: 'USD',
                          checkIn: '2024-01-15',
                          checkOut: '2024-01-18',
                          roomType: 'Ocean View Suite',
                          cancellationPolicy: 'Free cancellation until Jan 10',
                          bookingLink: '#'
                        }]);
                      } catch (error) {
                        console.error('Quick amend search failed:', error);
                      } finally {
                        // Close searching modal and show results
                        closeSearchingModal();
                        setIsSearchResultsOpen(true);
                        // Don't reset quick amend flag - keep it active for the entire quick amend session
                        // setIsQuickAmendSearch(false);
                      }
                    }}
                    >
                      Search
                    </button>
                    <button style={{
                      background: "#c0c0c0",
                      border: "1px outset #c0c0c0",
                      padding: "4px 8px",
                      cursor: "pointer",
                      fontSize: "10px"
                    }}
                    onClick={closeLightningPage}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : isLightningCheckoutOpen ? (
              /* Lightning Checkout Page - Combined Passengers & Payment */
              <div>
                {/* Lightning Checkout Header */}
                <div style={{
                  background: "#d4d0c8",
                  border: "1px inset #c0c0c0",
                  padding: "6px 8px",
                  marginBottom: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <div style={{ fontSize: "9px", color: "#808080", display: "flex", alignItems: "center", gap: "4px" }}>
                      <span>Home</span>
                      <span>›</span>
                      <span>Quick Edit</span>
                      <span>›</span>
                      <span style={{ color: "#000080", fontWeight: "bold" }}>Quick Checkout</span>
                    </div>
                    <span style={{ fontSize: "11px", fontWeight: "bold" }}>⚡ Quick Checkout - Passengers & Payment</span>
                  </div>
                  <button
                    style={{
                      background: "#c0c0c0",
                      border: "1px outset #c0c0c0",
                      padding: "2px 6px",
                      cursor: "pointer",
                      fontSize: "9px",
                      fontFamily: "'MS Sans Serif', sans-serif",
                      fontWeight: "bold"
                    }}
                    onClick={closeLightningCheckout}
                  >
                    ✕ Close
                  </button>
                </div>

                {/* Selected Hotel Summary */}
                <div style={{
                  background: "#f0f0f0",
                  border: "1px inset #c0c0c0",
                  padding: "8px",
                  marginBottom: "8px",
                  fontSize: "10px"
                }}>
                  <strong>Selected Hotel:</strong> {cartItems[0]?.name} • {cartItems[0]?.price}/night • Total: {cartItems[0]?.total}
                </div>

                {/* Lightning Checkout Content */}
                <div style={{ display: "grid", gap: "8px" }}>
                  {/* Travelers Section */}
                  <div style={{
                    border: "1px inset #c0c0c0",
                    background: "#f0f0f0",
                    padding: "8px"
                  }}>
                    <h4 style={{ margin: "0 0 8px 0", fontSize: "12px", fontWeight: "bold" }}>👥 Travelers Information</h4>
                    <div style={{ display: "grid", gap: "6px", marginBottom: "12px" }}>
                      <div style={{ display: "flex", gap: "6px" }}>
                        <input
                          type="text"
                          placeholder="First Name"
                          style={{
                            flex: 1,
                            padding: "2px 4px",
                            border: "1px inset #c0c0c0",
                            background: "#ffffff",
                            fontSize: "10px",
                            fontFamily: "'MS Sans Serif', sans-serif",
                            boxSizing: "border-box"
                          }}
                          defaultValue="John"
                        />
                        <input
                          type="text"
                          placeholder="Last Name"
                          style={{
                            flex: 1,
                            padding: "2px 4px",
                            border: "1px inset #c0c0c0",
                            background: "#ffffff",
                            fontSize: "10px",
                            fontFamily: "'MS Sans Serif', sans-serif",
                            boxSizing: "border-box"
                          }}
                          defaultValue="Doe"
                        />
                      </div>
                      <input
                        type="email"
                        placeholder="Email Address"
                        style={{
                          width: "100%",
                          padding: "2px 4px",
                          border: "1px inset #c0c0c0",
                          background: "#ffffff",
                          fontSize: "10px",
                          fontFamily: "'MS Sans Serif', sans-serif",
                          boxSizing: "border-box"
                        }}
                        defaultValue="john.doe@email.com"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        style={{
                          width: "100%",
                          padding: "2px 4px",
                          border: "1px inset #c0c0c0",
                          background: "#ffffff",
                          fontSize: "10px",
                          fontFamily: "'MS Sans Serif', sans-serif",
                          boxSizing: "border-box"
                        }}
                        defaultValue="(555) 123-4567"
                      />
                    </div>
                  </div>

                  {/* Payment Section */}
                  <div style={{
                    border: "1px inset #c0c0c0",
                    background: "#f0f0f0",
                    padding: "8px"
                  }}>
                    <h4 style={{ margin: "0 0 8px 0", fontSize: "12px", fontWeight: "bold" }}>💳 Payment Information</h4>
                    
                    {/* Payment Summary */}
                    <div style={{
                      background: "#ffffff",
                      border: "1px inset #c0c0c0",
                      padding: "6px",
                      marginBottom: "8px",
                      fontSize: "9px"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
                        <span>Subtotal:</span>
                        <span>{cartItems[0]?.total}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
                        <span>Taxes & Fees:</span>
                        <span>$45</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", borderTop: "1px solid #808080", paddingTop: "2px" }}>
                        <span>Total:</span>
                        <span>${parseInt(cartItems[0]?.total?.replace('$', '')) + 45}</span>
                      </div>
                    </div>

                    {/* Payment Form */}
                    <div style={{ display: "grid", gap: "6px", marginBottom: "8px" }}>
                      <select
                        style={{
                          width: "100%",
                          padding: "2px 4px",
                          border: "1px inset #c0c0c0",
                          background: "#ffffff",
                          fontSize: "10px",
                          fontFamily: "'MS Sans Serif', sans-serif",
                          boxSizing: "border-box"
                        }}
                        defaultValue="visa"
                      >
                        <option value="visa">💳 Visa</option>
                        <option value="mastercard">💳 Mastercard</option>
                        <option value="amex">💳 American Express</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Card Number"
                        style={{
                          width: "100%",
                          padding: "2px 4px",
                          border: "1px inset #c0c0c0",
                          background: "#ffffff",
                          fontSize: "10px",
                          fontFamily: "'MS Sans Serif', sans-serif",
                          boxSizing: "border-box"
                        }}
                        defaultValue="4532 1234 5678 9012"
                      />
                      <div style={{ display: "flex", gap: "6px" }}>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          style={{
                            flex: 1,
                            padding: "2px 4px",
                            border: "1px inset #c0c0c0",
                            background: "#ffffff",
                            fontSize: "10px",
                            fontFamily: "'MS Sans Serif', sans-serif",
                            boxSizing: "border-box"
                          }}
                          defaultValue="12/25"
                        />
                        <input
                          type="text"
                          placeholder="CVV"
                          style={{
                            flex: 1,
                            padding: "2px 4px",
                            border: "1px inset #c0c0c0",
                            background: "#ffffff",
                            fontSize: "10px",
                            fontFamily: "'MS Sans Serif', sans-serif",
                            boxSizing: "border-box"
                          }}
                          defaultValue="123"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Cardholder Name"
                        style={{
                          width: "100%",
                          padding: "2px 4px",
                          border: "1px inset #c0c0c0",
                          background: "#ffffff",
                          fontSize: "10px",
                          fontFamily: "'MS Sans Serif', sans-serif",
                          boxSizing: "border-box"
                        }}
                        defaultValue="John Doe"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: "flex", gap: "4px" }}>
                    <button style={{
                      background: "#c0c0c0",
                      border: "1px outset #c0c0c0",
                      padding: "4px 12px",
                      cursor: "pointer",
                      fontSize: "10px",
                      fontWeight: "bold",
                      flex: 1
                    }}
                    onClick={() => {
                      closeLightningCheckout();
                      // Show toast message
                      setTimeout(() => {
                        alert("✅ Booking confirmed! Check your email for confirmation details.");
                      }, 100);
                    }}
                    >
                      Complete Booking
                    </button>
                    <button style={{
                      background: "#c0c0c0",
                      border: "1px outset #c0c0c0",
                      padding: "4px 8px",
                      cursor: "pointer",
                      fontSize: "10px"
                    }}
                    onClick={closeLightningCheckout}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
            </div>

            {/* Travel App Status Bar */}
            <div style={{
              background: "#c0c0c0",
              borderTop: "1px solid #808080",
              padding: "2px 4px",
              fontSize: "8px",
              fontFamily: "'MS Sans Serif', sans-serif",
              height: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <span>Ready</span>
              <span>Travel Planner v1.0</span>
            </div>
          </div>
        </div>
      )}

      {/* Edit Component Modal */}
      {isEditModalOpen && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1001,
          fontFamily: "'MS Sans Serif', sans-serif"
        }}>
          <div style={{
            background: "#c0c0c0",
            border: "2px outset #c0c0c0",
            width: "400px",
            height: "300px",
            display: "flex",
            flexDirection: "column"
          }}>
            {/* Modal Header */}
            <div style={{
              background: "linear-gradient(90deg, #000080 0%, #1084d0 100%)",
              color: "#ffffff",
              padding: "4px 8px",
              fontSize: "11px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #808080"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <span>Edit {editingComponent}</span>
              </div>
              <button
                style={{
                  width: "16px",
                  height: "14px",
                  background: "#d4d0c8",
                  borderTop: "1px solid #ffffff",
                  borderLeft: "1px solid #ffffff",
                  borderBottom: "1px solid #808080",
                  borderRight: "1px solid #808080",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "8px",
                  fontFamily: "'MS Sans Serif', sans-serif",
                  color: "#000000",
                  padding: "0",
                  lineHeight: "1",
                  fontWeight: "normal"
                }}
                onClick={closeEditModal}
                title="Close"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div style={{
              flex: 1,
              background: "#ffffff",
              padding: "12px",
              fontSize: "11px",
              fontFamily: "'MS Sans Serif', sans-serif",
              color: "#000000",
              overflow: "auto"
            }}>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>
                  Amendment Reason:
                </label>
                <textarea
                  style={{
                    width: "100%",
                    height: "80px",
                    padding: "4px",
                    border: "1px inset #c0c0c0",
                    background: "#ffffff",
                    fontSize: "11px",
                    fontFamily: "'MS Sans Serif', sans-serif",
                    resize: "none",
                    boxSizing: "border-box"
                  }}
                  placeholder="Enter the reason for this amendment..."
                />
              </div>
              
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>
                  Cause:
                </label>
                <textarea
                  style={{
                    width: "100%",
                    height: "80px",
                    padding: "4px",
                    border: "1px inset #c0c0c0",
                    background: "#ffffff",
                    fontSize: "11px",
                    fontFamily: "'MS Sans Serif', sans-serif",
                    resize: "none",
                    boxSizing: "border-box"
                  }}
                  placeholder="Describe what caused this change..."
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{
              background: "#c0c0c0",
              padding: "8px",
              display: "flex",
              justifyContent: "flex-end",
              gap: "8px",
              borderTop: "1px solid #808080"
            }}>
              <button
                style={{
                  background: "#d4d0c8",
                  border: "2px outset #c0c0c0",
                  padding: "4px 12px",
                  fontSize: "11px",
                  fontFamily: "'MS Sans Serif', sans-serif",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
                onClick={closeEditModal}
              >
                Cancel
              </button>
              <button
                style={{
                  background: "#d4d0c8",
                  border: "2px outset #c0c0c0",
                  padding: "4px 12px",
                  fontSize: "11px",
                  fontFamily: "'MS Sans Serif', sans-serif",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
                onClick={openIntermediateModal}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Travelers Selection Modal */}
      {isIntermediateModalOpen && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1002,
          fontFamily: "'MS Sans Serif', sans-serif"
        }}>
          <div style={{
            background: "#c0c0c0",
            border: "2px outset #c0c0c0",
            width: "450px",
            height: "350px",
            display: "flex",
            flexDirection: "column"
          }}>
            {/* Modal Header */}
            <div style={{
              background: "linear-gradient(90deg, #000080 0%, #1084d0 100%)",
              color: "#ffffff",
              padding: "4px 8px",
              fontSize: "11px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #808080"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <span>👥 Travelers - {editingComponent}</span>
              </div>
              <button
                style={{
                  width: "16px",
                  height: "14px",
                  background: "#d4d0c8",
                  borderTop: "1px solid #ffffff",
                  borderLeft: "1px solid #ffffff",
                  borderBottom: "1px solid #808080",
                  borderRight: "1px solid #808080",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "8px",
                  fontFamily: "'MS Sans Serif', sans-serif",
                  color: "#000000",
                  padding: "0",
                  lineHeight: "1",
                  fontWeight: "normal"
                }}
                onClick={closeIntermediateModal}
                title="Close"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div style={{
              flex: 1,
              background: "#ffffff",
              padding: "12px",
              fontSize: "11px",
              fontFamily: "'MS Sans Serif', sans-serif",
              color: "#000000",
              overflow: "auto"
            }}>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>
                  Current Travelers:
                </label>
                <div style={{
                  border: "1px inset #c0c0c0",
                  background: "#ffffff",
                  padding: "8px",
                  minHeight: "60px",
                  fontSize: "10px"
                }}>
                  <div style={{ marginBottom: "4px" }}>• John Doe (Adult)</div>
                  <div style={{ marginBottom: "4px" }}>• Jane Smith (Adult)</div>
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>
                  Add New Traveler:
                </label>
                <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                  <input
                    type="text"
                    placeholder="Full Name"
                    style={{
                      flex: 1,
                      padding: "2px 4px",
                      border: "1px inset #c0c0c0",
                      background: "#ffffff",
                      fontSize: "11px",
                      fontFamily: "'MS Sans Serif', sans-serif",
                      boxSizing: "border-box"
                    }}
                  />
                  <select
                    style={{
                      padding: "2px 4px",
                      border: "1px inset #c0c0c0",
                      background: "#ffffff",
                      fontSize: "11px",
                      fontFamily: "'MS Sans Serif', sans-serif"
                    }}
                  >
                    <option value="adult">Adult</option>
                    <option value="child">Child</option>
                    <option value="infant">Infant</option>
                  </select>
                </div>
                <button style={{
                  background: "#c0c0c0",
                  borderTop: "1px solid #ffffff",
                  borderLeft: "1px solid #ffffff",
                  borderBottom: "1px solid #808080",
                  borderRight: "1px solid #808080",
                  padding: "2px 8px",
                  cursor: "pointer",
                  fontSize: "10px",
                  fontFamily: "'MS Sans Serif', sans-serif",
                  cursor: "pointer"
                }}>
                  + Add Traveler
                </button>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>
                  Remove Traveler:
                </label>
                <div style={{ display: "flex", gap: "4px" }}>
                  <select
                    style={{
                      flex: 1,
                      padding: "2px 4px",
                      border: "1px inset #c0c0c0",
                      background: "#ffffff",
                      fontSize: "11px",
                      fontFamily: "'MS Sans Serif', sans-serif",
                      boxSizing: "border-box"
                    }}
                  >
                    <option value="">Select traveler to remove...</option>
                    <option value="john">John Doe (Adult)</option>
                    <option value="jane">Jane Smith (Adult)</option>
                  </select>
                  <button style={{
                    background: "#c0c0c0",
                    borderTop: "1px solid #ffffff",
                    borderLeft: "1px solid #ffffff",
                    borderBottom: "1px solid #808080",
                    borderRight: "1px solid #808080",
                    padding: "2px 8px",
                    cursor: "pointer",
                    fontSize: "10px",
                    fontFamily: "'MS Sans Serif', sans-serif",
                    cursor: "pointer"
                  }}>
                    - Remove
                  </button>
                </div>
              </div>

              <div style={{
                background: "#f0f0f0",
                border: "1px inset #c0c0c0",
                padding: "8px",
                fontSize: "10px"
              }}>
                <strong>Travel Summary:</strong><br/>
                • 2 Adults, 0 Children, 0 Infants<br/>
                • Total travelers: 2<br/>
                • Room requirements: 1 room (2 adults max)
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{
              background: "#c0c0c0",
              borderTop: "1px solid #808080",
              padding: "6px 8px",
              display: "flex",
              justifyContent: "space-between",
              gap: "6px"
            }}>
              <button
                style={{
                  background: "#c0c0c0",
                  borderTop: "1px solid #ffffff",
                  borderLeft: "1px solid #ffffff",
                  borderBottom: "1px solid #808080",
                  borderRight: "1px solid #808080",
                  padding: "2px 8px",
                  cursor: "pointer",
                  fontSize: "11px",
                  fontFamily: "'MS Sans Serif', sans-serif",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
                onClick={closeIntermediateModal}
              >
                Cancel
              </button>
              <button
                style={{
                  background: "#c0c0c0",
                  borderTop: "1px solid #ffffff",
                  borderLeft: "1px solid #ffffff",
                  borderBottom: "1px solid #808080",
                  borderRight: "1px solid #808080",
                  padding: "2px 8px",
                  cursor: "pointer",
                  fontSize: "11px",
                  fontFamily: "'MS Sans Serif', sans-serif",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
                onClick={openSearchDetailsModal}
              >
                Continue to Search
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Details Modal */}
      {isSearchDetailsModalOpen && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1002,
          fontFamily: "'MS Sans Serif', sans-serif"
        }}>
          <div style={{
            background: "#c0c0c0",
            border: "2px outset #c0c0c0",
            width: "500px",
            height: "400px",
            display: "flex",
            flexDirection: "column"
          }}>
            {/* Modal Header */}
            <div style={{
              background: "linear-gradient(90deg, #000080 0%, #1084d0 100%)",
              color: "#ffffff",
              padding: "4px 8px",
              fontSize: "11px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #808080"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <span>🔍 Search Details - {editingComponent}</span>
              </div>
              <button
                style={{
                  width: "16px",
                  height: "14px",
                  background: "#d4d0c8",
                  borderTop: "1px solid #ffffff",
                  borderLeft: "1px solid #ffffff",
                  borderBottom: "1px solid #808080",
                  borderRight: "1px solid #808080",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "8px",
                  fontFamily: "'MS Sans Serif', sans-serif",
                  color: "#000000",
                  padding: "0",
                  lineHeight: "1",
                  fontWeight: "normal"
                }}
                onClick={closeSearchDetailsModal}
                title="Close"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div style={{
              flex: 1,
              background: "#ffffff",
              padding: "12px",
              fontSize: "11px",
              fontFamily: "'MS Sans Serif', sans-serif",
              color: "#000000",
              overflow: "auto"
            }}>
              <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>
                  Destination:
                </label>
                <input
                  type="text"
                  style={{
                    width: "100%",
                    padding: "2px 4px",
                    border: "1px inset #c0c0c0",
                    background: "#ffffff",
                    fontSize: "11px",
                    fontFamily: "'MS Sans Serif', sans-serif",
                    boxSizing: "border-box"
                  }}
                  defaultValue="Miami Beach, Florida"
                />
              </div>

              <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>
                  Check-in Date:
                </label>
                <input
                  type="date"
                  style={{
                    width: "100%",
                    padding: "2px 4px",
                    border: "1px inset #c0c0c0",
                    background: "#ffffff",
                    fontSize: "11px",
                    fontFamily: "'MS Sans Serif', sans-serif",
                    boxSizing: "border-box"
                  }}
                  defaultValue="2024-01-15"
                />
              </div>

              <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>
                  Check-out Date:
                </label>
                <input
                  type="date"
                  style={{
                    width: "100%",
                    padding: "2px 4px",
                    border: "1px inset #c0c0c0",
                    background: "#ffffff",
                    fontSize: "11px",
                    fontFamily: "'MS Sans Serif', sans-serif",
                    boxSizing: "border-box"
                  }}
                  defaultValue="2024-01-18"
                />
              </div>

              <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>
                  Number of Guests:
                </label>
                <select
                  style={{
                    width: "100%",
                    padding: "2px 4px",
                    border: "1px inset #c0c0c0",
                    background: "#ffffff",
                    fontSize: "11px",
                    fontFamily: "'MS Sans Serif', sans-serif",
                    boxSizing: "border-box"
                  }}
                  defaultValue="2"
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5+">5+ Guests</option>
                </select>
              </div>

              <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>
                  Budget Range:
                </label>
                <select
                  style={{
                    width: "100%",
                    padding: "2px 4px",
                    border: "1px inset #c0c0c0",
                    background: "#ffffff",
                    fontSize: "11px",
                    fontFamily: "'MS Sans Serif', sans-serif",
                    boxSizing: "border-box"
                  }}
                  defaultValue="$150-200"
                >
                  <option value="$50-100">$50-100/night</option>
                  <option value="$100-150">$100-150/night</option>
                  <option value="$150-200">$150-200/night</option>
                  <option value="$200-300">$200-300/night</option>
                  <option value="$300+">$300+/night</option>
                </select>
              </div>

              <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>
                  Amenities:
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "10px" }}>
                    <input type="checkbox" defaultChecked /> Pool
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "10px" }}>
                    <input type="checkbox" defaultChecked /> Beach Access
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "10px" }}>
                    <input type="checkbox" /> Spa
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "10px" }}>
                    <input type="checkbox" defaultChecked /> Restaurant
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "10px" }}>
                    <input type="checkbox" /> Gym
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "10px" }}>
                    <input type="checkbox" defaultChecked /> WiFi
                  </label>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{
              background: "#c0c0c0",
              borderTop: "1px solid #808080",
              padding: "6px 8px",
              display: "flex",
              justifyContent: "flex-end",
              gap: "6px"
            }}>
              <button
                style={{
                  background: "#c0c0c0",
                  borderTop: "1px solid #ffffff",
                  borderLeft: "1px solid #ffffff",
                  borderBottom: "1px solid #808080",
                  borderRight: "1px solid #808080",
                  padding: "2px 8px",
                  cursor: "pointer",
                  fontSize: "11px",
                  fontFamily: "'MS Sans Serif', sans-serif",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
                onClick={closeSearchDetailsModal}
              >
                Cancel
              </button>
              <button
                style={{
                  background: "#c0c0c0",
                  borderTop: "1px solid #ffffff",
                  borderLeft: "1px solid #ffffff",
                  borderBottom: "1px solid #808080",
                  borderRight: "1px solid #808080",
                  padding: "2px 8px",
                  cursor: "pointer",
                  fontSize: "11px",
                  fontFamily: "'MS Sans Serif', sans-serif",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
                onClick={openSearchResults}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Searching Modal */}
      {isSearchingModalOpen && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 99999,
          width: "100vw",
          height: "100vh"
        }}>
          <div style={{
            background: "#c0c0c0",
            border: "2px outset #c0c0c0",
            padding: "20px",
            minWidth: "300px",
            textAlign: "center",
            fontFamily: "'MS Sans Serif', sans-serif"
          }}>
            {/* Modal Header */}
            <div style={{
              background: "#000080",
              color: "#ffffff",
              padding: "4px 8px",
              margin: "-20px -20px 16px -20px",
              fontSize: "12px",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <span>{isQuickAmendSearch ? "📋 Retrieving Current Booking..." : "🔍 Searching Hotels..."}</span>
              <button
                style={{
                  background: "#c0c0c0",
                  border: "1px outset #c0c0c0",
                  color: "#000000",
                  padding: "1px 4px",
                  fontSize: "10px",
                  cursor: "pointer"
                }}
                onClick={closeSearchingModal}
              >
                ✕
              </button>
            </div>

            {/* Search Progress */}
            <div style={{ marginBottom: "16px" }}>
              <div style={{
                width: "200px",
                height: "20px",
                background: "#ffffff",
                border: "1px inset #c0c0c0",
                margin: "0 auto 8px auto",
                position: "relative",
                overflow: "hidden"
              }}>
                <div style={{
                  position: "absolute",
                  top: 0,
                  left: "-100%",
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(90deg, transparent, #000080, transparent)",
                  animation: "searchProgress 2s infinite linear"
                }}>
                  <style>
                    {`
                      @keyframes searchProgress {
                        0% { left: -100%; }
                        100% { left: 100%; }
                      }
                    `}
                  </style>
                </div>
              </div>
              <div style={{ fontSize: "10px", color: "#000080", fontWeight: "bold" }}>
                {isQuickAmendSearch ? "Loading booking details..." : "Searching 2,500+ hotels..."}
              </div>
            </div>

            {/* Search Steps */}
            <div style={{ textAlign: "left", fontSize: "10px", marginBottom: "16px" }}>
              {isQuickAmendSearch ? (
                <>
                  <div style={{ marginBottom: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ color: "#008000" }}>✓</span>
                    <span>Connecting to booking system</span>
                  </div>
                  <div style={{ marginBottom: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ color: "#008000" }}>✓</span>
                    <span>Retrieving booking details</span>
                  </div>
                  <div style={{ marginBottom: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <div style={{
                      width: "8px",
                      height: "8px",
                      border: "1px solid #000080",
                      borderRadius: "50%",
                      animation: "pulse 1s infinite"
                    }}>
                      <style>
                        {`
                          @keyframes pulse {
                            0% { background: #000080; }
                            50% { background: #ffffff; }
                            100% { background: #000080; }
                          }
                        `}
                      </style>
                    </div>
                    <span>Loading current booking...</span>
                  </div>
                  <div style={{ marginBottom: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ color: "#c0c0c0" }}>⏳</span>
                    <span>Preparing modification options</span>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ marginBottom: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ color: "#008000" }}>✓</span>
                    <span>Connecting to hotel database</span>
                  </div>
                  <div style={{ marginBottom: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ color: "#008000" }}>✓</span>
                    <span>Checking availability for Jan 15-18</span>
                  </div>
                  <div style={{ marginBottom: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <div style={{
                      width: "8px",
                      height: "8px",
                      border: "1px solid #000080",
                      borderRadius: "50%",
                      animation: "pulse 1s infinite"
                    }}>
                      <style>
                        {`
                          @keyframes pulse {
                            0% { background: #000080; }
                            50% { background: #ffffff; }
                            100% { background: #000080; }
                          }
                        `}
                      </style>
                    </div>
                    <span>Finding best prices...</span>
                  </div>
                  <div style={{ marginBottom: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ color: "#c0c0c0" }}>⏳</span>
                    <span>Loading hotel details</span>
                  </div>
                </>
              )}
            </div>

            {/* Search Info */}
            <div style={{
              background: "#f0f0f0",
              border: "1px inset #c0c0c0",
              padding: "8px",
              fontSize: "9px",
              marginBottom: "16px"
            }}>
              <div style={{ fontWeight: "bold", marginBottom: "4px" }}>Search Criteria:</div>
              <div>📍 Miami Beach, FL</div>
              <div>📅 Jan 15-18, 2024</div>
              <div>👥 2 Adults</div>
              <div>🏨 1 Room</div>
            </div>

            {/* Cancel Button */}
            <button
              style={{
                background: "#c0c0c0",
                border: "1px outset #c0c0c0",
                padding: "4px 12px",
                cursor: "pointer",
                fontSize: "10px",
                fontFamily: "'MS Sans Serif', sans-serif"
              }}
              onClick={closeSearchingModal}
            >
              Cancel Search
            </button>
          </div>
        </div>
      )}

      {/* Room Selection Loading Modal */}
      {isRoomSelectionLoading && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 99999,
          width: "100vw",
          height: "100vh"
        }}>
          <div style={{
            background: "#c0c0c0",
            border: "2px outset #c0c0c0",
            padding: "20px",
            minWidth: "300px",
            textAlign: "center",
            fontFamily: "'MS Sans Serif', sans-serif"
          }}>
            {/* Modal Header */}
            <div style={{
              background: "#000080",
              color: "#ffffff",
              padding: "4px 8px",
              margin: "-20px -20px 16px -20px",
              fontSize: "12px",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <span>🏨 Processing Room Selection...</span>
              <button
                style={{
                  background: "#c0c0c0",
                  border: "1px outset #c0c0c0",
                  color: "#000000",
                  padding: "1px 4px",
                  fontSize: "10px",
                  cursor: "pointer"
                }}
                onClick={() => setIsRoomSelectionLoading(false)}
              >
                ✕
              </button>
            </div>

            {/* Processing Animation */}
            <div style={{ marginBottom: "16px" }}>
              <div style={{
                width: "200px",
                height: "20px",
                background: "#ffffff",
                border: "1px inset #c0c0c0",
                margin: "0 auto 8px auto",
                position: "relative",
                overflow: "hidden"
              }}>
                <div style={{
                  position: "absolute",
                  top: 0,
                  left: "-100%",
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(90deg, transparent, #000080, transparent)",
                  animation: "roomProcessing 2.5s infinite linear"
                }}>
                  <style>
                    {`
                      @keyframes roomProcessing {
                        0% { left: -100%; }
                        100% { left: 100%; }
                      }
                    `}
                  </style>
                </div>
              </div>
              <div style={{ fontSize: "10px", color: "#000080", fontWeight: "bold" }}>
                Confirming room availability...
              </div>
            </div>

            {/* Processing Steps */}
            <div style={{ textAlign: "left", fontSize: "10px", marginBottom: "16px" }}>
              <div style={{ marginBottom: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ color: "#008000" }}>✓</span>
                <span>Room selected</span>
              </div>
              <div style={{ marginBottom: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ color: "#008000" }}>✓</span>
                <span>Checking availability</span>
              </div>
              <div style={{ marginBottom: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{
                  width: "8px",
                  height: "8px",
                  border: "1px solid #000080",
                  borderRadius: "50%",
                  animation: "pulse 1s infinite"
                }}>
                  <style>
                    {`
                      @keyframes pulse {
                        0% { background: #000080; }
                        50% { background: #ffffff; }
                        100% { background: #000080; }
                      }
                    `}
                  </style>
                </div>
                <span>Updating booking details...</span>
              </div>
              <div style={{ marginBottom: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ color: "#c0c0c0" }}>⏳</span>
                <span>Preparing checkout</span>
              </div>
            </div>

            {/* Room Info */}
            <div style={{
              background: "#f0f0f0",
              border: "1px inset #c0c0c0",
              padding: "8px",
              fontSize: "9px",
              marginBottom: "16px"
            }}>
              <div style={{ fontWeight: "bold", marginBottom: "4px" }}>Selected Room:</div>
              <div>🏨 Grand Plaza Resort</div>
              <div>📅 Jan 15-18, 2024</div>
              <div>👥 2 Adults</div>
              <div>🛏️ Room type varies by selection</div>
            </div>

            {/* Cancel Button */}
            <button
              style={{
                background: "#c0c0c0",
                border: "1px outset #c0c0c0",
                padding: "4px 12px",
                cursor: "pointer",
                fontSize: "10px",
                fontFamily: "'MS Sans Serif', sans-serif"
              }}
              onClick={() => setIsRoomSelectionLoading(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}


    </div>
  );
}

export default App;


