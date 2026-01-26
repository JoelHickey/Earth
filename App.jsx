import React, { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
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
import TravelPlannerMUI from './src/components/TravelPlannerMUI';
import AmendmentsCaseStudy from './src/components/AmendmentsCaseStudy';
import InsuranceCaseStudy from './src/components/InsuranceCaseStudy';
import TravelOldFlow from './src/components/TravelOldFlow';
import InsuranceOldFlow from './src/components/InsuranceOldFlow';

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
  const [cvDesignStyle, setCvDesignStyle] = useState('apple'); // apple, figma, tesla, material
  
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
  // Third app window state (Travel Amendments)
  const [isTravelAppOpen, setIsTravelAppOpen] = useState(false);
  const [isTravelAppMinimized, setIsTravelAppMinimized] = useState(false);
  const [travelPlannerView, setTravelPlannerView] = useState('caseStudy'); // 'caseStudy', 'oldFlow', 'newFlow'
  
  // Fourth app window state (Insurance)
  const [isInsuranceAppOpen, setIsInsuranceAppOpen] = useState(false);
  const [isInsuranceDemoOpen, setIsInsuranceDemoOpen] = useState(false);
  
  // Window position state - center windows on initial load
  const [windowPosition, setWindowPosition] = useState(() => ({
    x: typeof window !== 'undefined' ? Math.max(0, (window.innerWidth - 1000) / 2) : 50,
    y: typeof window !== 'undefined' ? Math.max(0, (window.innerHeight - 600) / 2) : 100
  }));
  const [secondWindowPosition, setSecondWindowPosition] = useState(() => ({
    x: typeof window !== 'undefined' ? Math.max(0, (window.innerWidth - 800) / 2) : 200,
    y: typeof window !== 'undefined' ? Math.max(0, (window.innerHeight - 600 - 28) / 2) : 120
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

  const openSecondApp = () => {
    setIsSecondAppOpen(true);
    setIsSecondAppMinimized(false);
    // Center the CV window on desktop (accounting for 28px taskbar at bottom)
    const centerX = Math.max(0, (window.innerWidth - 800) / 2);
    const centerY = Math.max(0, (window.innerHeight - 600 - 28) / 2);
    console.log('Centering CV:', { 
      windowWidth: window.innerWidth, 
      windowHeight: window.innerHeight, 
      centerX, 
      centerY 
    });
    setSecondWindowPosition({
      x: centerX,
      y: centerY
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

  const openTravelApp = () => {
    setIsTravelAppOpen(true);
    setIsTravelAppMinimized(false);
    setTravelPlannerView('caseStudy'); // Start with case study
    // Center the Travel window on desktop
    setTravelWindowPosition({
      x: Math.max(0, (window.innerWidth - 700) / 2), // Travel app width is 700px
      y: Math.max(0, (window.innerHeight - 600) / 2) // Travel app height is 600px
    });
    console.log('Travel app opened');
  };

  const openInsuranceApp = () => {
    setIsInsuranceAppOpen(true);
    console.log('Insurance app opened');
  };

  const closeInsuranceApp = () => {
    setIsInsuranceAppOpen(false);
    setIsInsuranceDemoOpen(false);
    console.log('Insurance app closed');
  };

  const openInsuranceDemo = () => {
    setIsInsuranceDemoOpen(true);
  };

  const backToInsuranceCaseStudy = () => {
    setIsInsuranceDemoOpen(false);
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
      // Close searching modal
      closeSearchingModal();
      // Don't reset quick amend flag here - it should only be reset when closing results
    }
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
                  Strategic Management (what to build)
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
                  📋 Product Management
                </button>
                
                <div style={{ marginBottom: "6px", marginTop: "8px", fontWeight: "bold", fontSize: "8px", color: "#000000" }}>
                  Tactical Management (how to build it)
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
                        
                        <div style={{ marginTop: "8px", border: "1px solid #808080", padding: "4px", background: "#f0f0f0" }}>
                          <strong>Planning Artifacts:</strong><br/>
                          • Mission Statement<br/>
                          • Core Values<br/>
                          • Vision Statement<br/>
                          • North Star Metrics<br/>
                          • Strategic Objectives<br/>
                          • Strategic Roadmap<br/>
                          • Success Metrics
                        </div>
                        
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
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 1 — Launch</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Planning artifacts finalized, execution readiness confirmed & execution plans<br/>
                                <strong>Output:</strong> Mission execution launched<br/>
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 2 — Align</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Mission execution launched, Strategic roadmap<br/>
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
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 4 — Optimize</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Mission progress tracking & North Star monitoring, performance insights<br/>
                                <strong>Output:</strong> Mission execution optimized & continuous improvement plan<br/>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        
                        <div style={{ marginTop: "8px", border: "1px solid #808080", padding: "4px", background: "#f0f0f0" }}>
                          <strong>Execution Artifacts:</strong><br/>
                          • Mission Launch Plan<br/>
                          • Department Alignment<br/>
                          • Progress Tracking<br/>
                          • North Star Monitoring<br/>
                          • Mission Reports<br/>
                          • Performance Metrics<br/>
                          • Success Validation
                        </div>
                        
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
                        
                        <div style={{ marginTop: "8px", border: "1px solid #808080", padding: "4px", background: "#f0f0f0" }}>
                          <strong>Delivery Artifacts:</strong><br/>
                          • Mission Validation Report<br/>
                          • Impact Metrics Report<br/>
                          • Success Celebration Plan<br/>
                          • Success Celebration Execution<br/>
                          • Sustainability Plan
                        </div>
                        
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
                                <strong>Output:</strong> business model, value proposition, target market definition & risk assessment<br/>
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 1 — Strategy Definition & Market Positioning</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> business model, value proposition, target market definition, market analysis<br/>
                                <strong>Output:</strong> business strategy document & go‑to‑market plan
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
                        
                        <div style={{ marginTop: "8px", border: "1px solid #808080", padding: "4px", background: "#f0f0f0" }}>
                          <strong>Planning Artifacts:</strong><br/>
                          • Business Strategy Foundation<br/>
                          • Market Positioning<br/>
                          • Market Analysis<br/>
                          • Risk Assessment<br/>
                          • Business Strategy<br/>
                          • Go-to-Market Plan<br/>
                          • Business Roadmap<br/>
                          • Success Metrics<br/>
                          • Execution Readiness
                        </div>
                        
                        
                        
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
                                <strong>Output:</strong> strategy execution launch & initial alignment<br/>
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 2 — Align</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> strategy execution launch & initial alignment, market feedback<br/>
                                <strong>Output:</strong> organizational alignment & coordination<br/>
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 3 — Measure</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> organizational alignment & coordination, market performance<br/>
                                <strong>Output:</strong> performance metrics & market insights<br/>
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 4 — Optimize</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> performance metrics & market insights, market conditions<br/>
                                <strong>Output:</strong> optimization strategy & competitive advantage<br/>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        
                        <div style={{ marginTop: "8px", border: "1px solid #808080", padding: "4px", background: "#f0f0f0" }}>
                          <strong>Execution Artifacts:</strong><br/>
                          • Market Launch Execution<br/>
                          • Initial Traction<br/>
                          • Scaling Strategy<br/>
                          • Market Expansion<br/>
                          • Optimization Strategy<br/>
                          • Competitive Advantage<br/>
                          • Growth Strategy<br/>
                          • Market Leadership
                        </div>
                        
                        
                        
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
                        
                        <div style={{ marginTop: "8px", border: "1px solid #808080", padding: "4px", background: "#f0f0f0" }}>
                          <strong>Delivery Artifacts:</strong><br/>
                          • Market Validation Report<br/>
                          • Strategic Assessment<br/>
                          • Strategic Impact Metrics<br/>
                          • Market Analysis<br/>
                          • Strategic Success Celebration<br/>
                          • Market Recognition<br/>
                          • Market Leadership<br/>
                          • Continuous Growth
                        </div>
                        
                        
                        
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
                        
                        <div style={{ marginTop: "8px", border: "1px solid #808080", padding: "4px", background: "#f0f0f0" }}>
                          <strong>Planning Artifacts:</strong><br/>
                          • Portfolio Foundation<br/>
                          • Product Categories<br/>
                          • Resource Allocation<br/>
                          • Product Specifications<br/>
                          • Feature Requirements<br/>
                          • User Stories<br/>
                          • Portfolio Roadmap<br/>
                          • Success Metrics<br/>
                          • Development Readiness<br/>
                          • Launch Plan
                        </div>
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
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 4 — Optimize</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> portfolio performance tracking & product metrics, market feedback<br/>
                                <strong>Output:</strong> portfolio execution optimized & continuous improvement plan
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        
                        <div style={{ marginTop: "8px", border: "1px solid #808080", padding: "4px", background: "#f0f0f0" }}>
                          <strong>Execution Artifacts:</strong><br/>
                          • Product Development Execution<br/>
                          • Initial Market Traction<br/>
                          • Team Alignment<br/>
                          • Development Processes<br/>
                          • Performance Tracking<br/>
                          • Product Metrics<br/>
                          • Portfolio Success<br/>
                          • Market Leadership
                        </div>
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
                        
                        <div style={{ marginTop: "8px", border: "1px solid #808080", padding: "4px", background: "#f0f0f0" }}>
                          <strong>Delivery Artifacts:</strong><br/>
                          • Portfolio Validation Report<br/>
                          • Portfolio Impact Metrics Report<br/>
                          • Portfolio Success Celebration Plan<br/>
                          • Portfolio Success Celebration Execution<br/>
                          • Portfolio Sustainability Plan
                        </div>
                      </div>
                    </div>
                    
                  </div>
                )}
                {activeTab === 'program' && (
                  <div>
                    <h3 style={{ margin: "0 0 6px 0", fontSize: "14px" }}>📋 Program Management</h3>
                    
                    <div style={{ marginBottom: "6px" }}>
                      <strong>What:</strong> Coordinate multiple projects that deliver on company mission objectives<br/>
                      <strong>Why:</strong> Ensure mission-focused delivery and avoid resource waste<br/>
                      <strong>How:</strong> Align projects to mission → track mission outcomes → deliver value
                    </div>
                    
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Owners:</strong><br/>
                      • <strong>Program Manager:</strong> coordination, stakeholder comms, governance<br/>
                      • <strong>Product Lead:</strong> Mental Health Monitor Program<br/>
                      • <strong>Head of R&D:</strong> Research & Development Program<br/>
                      • <strong>Program Director/PMO:</strong> cross-program coordination, portfolio decisions
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Planning Framework:</strong> Cross-functional planning designed for program success and stakeholder alignment
                        <br/>
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
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 0 — Foundation</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Portfolio strategy, project requirements, resource constraints<br/>
                                <strong>Output:</strong> Program roadmap, dependency register, shared architecture docs
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Portfolio strategy, system constraints, technology standards<br/>
                                <strong>Output:</strong> Architecture strategy, technical constraints, system boundaries
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Portfolio strategy, development constraints, resource limits<br/>
                                <strong>Output:</strong> Engineering strategy, infrastructure needs, development estimates
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Portfolio strategy, design constraints, brand guidelines<br/>
                                <strong>Output:</strong> UX strategy, design constraints, user research plan
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 1 — Coordination</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Program roadmap, dependency register, shared architecture docs<br/>
                                <strong>Output:</strong> Program scope, resource allocation, timeline coordination
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Architecture strategy, program roadmap, dependencies<br/>
                                <strong>Output:</strong> Architecture blueprint, integration strategy, technical roadmap
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Engineering strategy, architecture blueprint, resource allocation<br/>
                                <strong>Output:</strong> Engineering roadmap, infrastructure plan, development strategy
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> UX strategy, program roadmap, user research plan<br/>
                                <strong>Output:</strong> Design roadmap, user research execution plan, interaction patterns
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 2 — Roadmap</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Program scope, resource allocation, timeline coordination<br/>
                                <strong>Output:</strong> Detailed program roadmap & success metrics (milestones, owners, timelines, KPIs)
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Architecture blueprint, integration strategy, cross-project constraints<br/>
                                <strong>Output:</strong> Integration architecture, data flow design, security framework
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Engineering roadmap, infrastructure plan, shared constraints<br/>
                                <strong>Output:</strong> Shared infrastructure design, development environment plan, API strategy
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> UX strategy, design roadmap, cross-project UX constraints<br/>
                                <strong>Output:</strong> Design system plan, component library strategy, user flow architecture
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 3 — Planning Complete</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Program roadmap & success metrics, stakeholder alignment<br/>
                                <strong>Output:</strong> Program readiness confirmed & execution plan
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Integration architecture, security framework, deployment constraints<br/>
                                <strong>Output:</strong> Architecture readiness, deployment strategy, monitoring framework
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Shared infrastructure design, development environment plan, quality constraints<br/>
                                <strong>Output:</strong> Engineering readiness, testing strategy, deployment plan
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Design system plan, component library strategy, accessibility constraints<br/>
                                <strong>Output:</strong> UX readiness, design validation plan, user acceptance criteria
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Execution Framework:</strong> Sequential execution designed for safe delivery and technical coordination<br/>
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
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 1 — Launch</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Program readiness confirmed & execution plan, stakeholder needs<br/>
                                <strong>Output:</strong> Execution plan, coordination framework, communication plan
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Architecture readiness, deployment strategy, monitoring framework<br/>
                                <strong>Output:</strong> Shared architecture blueprint, integration patterns
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Engineering readiness, testing strategy, deployment plan<br/>
                                <strong>Output:</strong> Shared infrastructure foundation, development environment
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> UX readiness, design validation plan, user acceptance criteria<br/>
                                <strong>Output:</strong> Design system foundation, interaction patterns
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 2 — Build</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Execution plan, track outputs, dependencies<br/>
                                <strong>Output:</strong> Dependency management, progress tracking, risk mitigation
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Shared architecture blueprint, project dependencies<br/>
                                <strong>Output:</strong> Integration architecture, data flow design
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Shared infrastructure, project constraints<br/>
                                <strong>Output:</strong> Core services, shared components, APIs
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Design system, project UX constraints<br/>
                                <strong>Output:</strong> Component library, user flow designs
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 3 — Integrate</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Track progress, quality gates, integration points<br/>
                                <strong>Output:</strong> Quality assurance, integration coordination, issue resolution
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Integration architecture, performance constraints<br/>
                                <strong>Output:</strong> Security architecture, performance optimization plan
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Core services, integration constraints<br/>
                                <strong>Output:</strong> Integration implementation, testing framework
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Component library, usability testing results<br/>
                                <strong>Output:</strong> Refined designs, accessibility compliance
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 4 — Deploy</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Final deliverables, user acceptance, performance metrics<br/>
                                <strong>Output:</strong> Program success validation, lessons learned, stakeholder communication
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Security architecture, deployment constraints<br/>
                                <strong>Output:</strong> Deployment architecture, monitoring framework
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Integration implementation, deployment constraints<br/>
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
                        <strong>Delivery Framework:</strong> Cross-functional delivery designed for program validation and stakeholder satisfaction<br/>
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
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 1 — Validate</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Program success validation, lessons learned, stakeholder communication<br/>
                                <strong>Output:</strong> Program Validation Report
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Deployment architecture, monitoring framework<br/>
                                <strong>Output:</strong> Architecture validation report, system compliance assessment
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Production deployment, monitoring implementation<br/>
                                <strong>Output:</strong> Engineering validation report, technical compliance assessment
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Final UX implementation, user acceptance validation<br/>
                                <strong>Output:</strong> UX validation report, user satisfaction assessment
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 2 — Measure</td>
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
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 3 — Celebrate</td>
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
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 4 — Sustain</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Program Success Celebration Plan & Execution<br/>
                                <strong>Output:</strong> Program Sustainability Plan (processes + KPIs)
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Architecture success celebration, system maintenance needs, future needs<br/>
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
                    <h3 style={{ margin: "0 0 6px 0", fontSize: "14px" }}>📋 Project Management</h3>
                    
                    <div style={{ marginBottom: "6px" }}>
                      <strong>What:</strong> Operational execution of individual projects within program frameworks<br/>
                      <strong>Why:</strong> Deliver specific project outcomes that contribute to program objectives<br/>
                      <strong>How:</strong> How individual projects are managed and delivered within program constraints
                    </div>
                    
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Owners:</strong><br/>
                      • <strong>Project Manager:</strong> day-to-day execution, stakeholder communication, delivery<br/>
                      • <strong>Technical Lead:</strong> architecture decisions, code quality, technical delivery<br/>
                      • <strong>Product Owner:</strong> requirements, acceptance criteria, user validation<br/>
                      • <strong>Program Manager:</strong> program alignment, dependency coordination
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Planning Framework:</strong> Project planning designed for successful delivery and stakeholder alignment
                        <br/>
                        <br/>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "8px", fontFamily: "'MS Sans Serif', sans-serif" }}>
                          <thead>
                            <tr>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "8%", fontWeight: "bold" }}>Level</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "23%", fontWeight: "bold" }}>Project Manager</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "23%", fontWeight: "bold" }}>Technical Lead</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "23%", fontWeight: "bold" }}>Product Owner</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "23%", fontWeight: "bold" }}>QA Lead</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 0 — Foundation</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Program roadmap, project scope, resource constraints<br/>
                                <strong>Output:</strong> Project charter, work breakdown structure, resource plan
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Program technical strategy, system constraints, architecture standards<br/>
                                <strong>Output:</strong> Technical strategy, architecture constraints, system boundaries
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Program product strategy, user needs, market constraints<br/>
                                <strong>Output:</strong> Product strategy, user priorities, success criteria
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Program QA strategy, testing constraints, compliance standards<br/>
                                <strong>Output:</strong> QA strategy, testing constraints, quality standards
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 1 — Coordination</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Project charter, work breakdown structure, resource plan<br/>
                                <strong>Output:</strong> Project scope, resource allocation, timeline coordination
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Technical strategy, project charter, dependencies<br/>
                                <strong>Output:</strong> Technical blueprint, integration strategy, development roadmap
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Product strategy, project charter, user research plan<br/>
                                <strong>Output:</strong> Product roadmap, user stories, acceptance criteria
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> QA strategy, project charter, testing plan<br/>
                                <strong>Output:</strong> Testing roadmap, quality gates, validation criteria
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 2 — Roadmap</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Project scope, resource allocation, timeline coordination<br/>
                                <strong>Output:</strong> Project roadmap & success metrics (milestones, owners, timelines, KPIs)
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Technical blueprint, integration strategy, cross-project constraints<br/>
                                <strong>Output:</strong> Technical architecture, data flow design, security framework
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Product roadmap, user stories, cross-project UX constraints<br/>
                                <strong>Output:</strong> Product specifications, user flow designs, feature priorities
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Testing roadmap, quality gates, cross-project QA constraints<br/>
                                <strong>Output:</strong> Test plan, quality framework, validation criteria
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 3 — Planning Complete</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Project roadmap & success metrics, stakeholder alignment<br/>
                                <strong>Output:</strong> Project readiness confirmed & execution plan
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Technical architecture, security framework, deployment constraints<br/>
                                <strong>Output:</strong> Technical readiness, deployment strategy, monitoring framework
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Product specifications, user flow designs, accessibility constraints<br/>
                                <strong>Output:</strong> Product readiness, user validation plan, acceptance criteria
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Test plan, quality framework, validation constraints<br/>
                                <strong>Output:</strong> QA readiness, testing strategy, validation plan
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Execution Framework:</strong> Sequential execution designed for safe delivery and technical coordination
                        <br/>
                        <br/>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "8px", fontFamily: "'MS Sans Serif', sans-serif" }}>
                          <thead>
                            <tr>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "8%", fontWeight: "bold" }}>Level</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "23%", fontWeight: "bold" }}>Project Manager</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "23%", fontWeight: "bold" }}>Technical Lead</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "23%", fontWeight: "bold" }}>Product Owner</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "23%", fontWeight: "bold" }}>QA Lead</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 1 — Launch</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Project readiness confirmed & execution plan, stakeholder needs<br/>
                                <strong>Output:</strong> Execution plan, coordination framework, communication plan
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Technical readiness, deployment strategy, monitoring framework<br/>
                                <strong>Output:</strong> Technical implementation plan, development environment
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Product readiness, user validation plan, acceptance criteria<br/>
                                <strong>Output:</strong> Product implementation plan, user validation framework
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> QA readiness, testing strategy, validation plan<br/>
                                <strong>Output:</strong> QA implementation plan, testing framework
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 2 — Build</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Execution plan, track outputs, dependencies<br/>
                                <strong>Output:</strong> Dependency management, progress tracking, risk mitigation
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Technical implementation plan, project dependencies<br/>
                                <strong>Output:</strong> Core components, shared services, APIs
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Product implementation plan, project constraints<br/>
                                <strong>Output:</strong> Feature implementations, user interfaces, workflows
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> QA implementation plan, project constraints<br/>
                                <strong>Output:</strong> Test implementations, quality gates, validation results
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 3 — Integrate</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Track progress, quality gates, integration points<br/>
                                <strong>Output:</strong> Quality assurance, integration coordination, issue resolution
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Core components, integration constraints<br/>
                                <strong>Output:</strong> Integration implementation, testing framework
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Feature implementations, usability testing results<br/>
                                <strong>Output:</strong> Refined features, accessibility compliance
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Test implementations, quality testing results<br/>
                                <strong>Output:</strong> Quality validation, compliance verification
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 4 — Deploy</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Final deliverables, user acceptance, performance metrics<br/>
                                <strong>Output:</strong> Project success validation, lessons learned, stakeholder communication
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Integration implementation, deployment constraints<br/>
                                <strong>Output:</strong> Production deployment, monitoring implementation
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Refined features, user feedback<br/>
                                <strong>Output:</strong> Final product implementation, user acceptance validation
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Quality validation, compliance verification<br/>
                                <strong>Output:</strong> Final quality validation, compliance certification
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Delivery Framework:</strong> Cross-functional delivery designed for project validation and stakeholder satisfaction
                        <br/>
                        <br/>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "8px", fontFamily: "'MS Sans Serif', sans-serif" }}>
                          <thead>
                            <tr>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "8%", fontWeight: "bold" }}>Level</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "23%", fontWeight: "bold" }}>Project Manager</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "23%", fontWeight: "bold" }}>Technical Lead</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "23%", fontWeight: "bold" }}>Product Owner</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "23%", fontWeight: "bold" }}>QA Lead</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 1 — Validate</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Project success validation, lessons learned, stakeholder communication<br/>
                                <strong>Output:</strong> Project Validation Report
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Production deployment, monitoring implementation<br/>
                                <strong>Output:</strong> Technical validation report, system compliance assessment
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Final product implementation, user acceptance validation<br/>
                                <strong>Output:</strong> Product validation report, user satisfaction assessment
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Final quality validation, compliance certification<br/>
                                <strong>Output:</strong> QA validation report, quality compliance assessment
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 2 — Measure</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Project Validation Report<br/>
                                <strong>Output:</strong> Project Impact Metrics Report
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Technical validation report, performance metrics, system usage data<br/>
                                <strong>Output:</strong> Technical impact metrics, system performance analysis
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Product validation report, user metrics, usability testing data<br/>
                                <strong>Output:</strong> Product impact metrics, user experience analysis
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> QA validation report, quality metrics, testing data<br/>
                                <strong>Output:</strong> QA impact metrics, quality performance analysis
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 3 — Celebrate</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Project Impact Metrics Report<br/>
                                <strong>Output:</strong> Project Success Celebration Plan & Execution
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Technical impact metrics, stakeholder feedback, system success stories<br/>
                                <strong>Output:</strong> Technical success celebration, achievement recognition
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Product impact metrics, user testimonials, product achievements<br/>
                                <strong>Output:</strong> Product success celebration, user achievement recognition
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> QA impact metrics, team feedback, quality achievements<br/>
                                <strong>Output:</strong> QA success celebration, quality achievement recognition
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 4 — Sustain</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Project Success Celebration Plan & Execution<br/>
                                <strong>Output:</strong> Project Sustainability Plan (processes + KPIs)
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Technical success celebration, system maintenance needs, future needs<br/>
                                <strong>Output:</strong> Technical sustainability plan, maintenance framework
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Product success celebration, user feedback, future product needs<br/>
                                <strong>Output:</strong> Product sustainability plan, user maintenance framework
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> QA success celebration, quality feedback, future QA needs<br/>
                                <strong>Output:</strong> QA sustainability plan, quality maintenance framework
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'vision' && (
                  <div>
                    <h3 style={{ margin: "0 0 6px 0", fontSize: "14px" }}>📋 Product Management</h3>
                    
                    <div style={{ marginBottom: "6px" }}>
                      <strong>What:</strong> Strategic process of bringing a product or service to market and guiding it through its entire lifecycle to meet customer needs and achieve business goals<br/>
                      <strong>Why:</strong> Ensure product development delivers user value and business outcomes<br/>
                      <strong>How:</strong> Vision → strategy → roadmap → feature prioritization → market positioning
                    </div>
                    
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Owners:</strong><br/>
                      • <strong>Product Manager:</strong> vision definition, roadmap alignment, market positioning<br/>
                      • <strong>Design Lead:</strong> user experience vision, design language, usability standards<br/>
                      • <strong>Engineering Lead:</strong> technical feasibility, architecture alignment, scalability<br/>
                      • <strong>Business Stakeholders:</strong> market validation, business model alignment, funding
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Planning Framework:</strong> Product planning designed for market success and user satisfaction
                        <br/>
                        <br/>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "8px", fontFamily: "'MS Sans Serif', sans-serif" }}>
                          <thead>
                            <tr>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "8%", fontWeight: "bold" }}>Level</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "23%", fontWeight: "bold" }}>Product Manager</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "23%", fontWeight: "bold" }}>Design Lead</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "23%", fontWeight: "bold" }}>Engineering Lead</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "23%", fontWeight: "bold" }}>Business Stakeholders</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 0 — Foundation</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Company mission, business strategy, portfolio strategy, market research<br/>
                                <strong>Output:</strong> Product concept, value proposition, target users
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Company mission, business strategy, user research, brand guidelines<br/>
                                <strong>Output:</strong> Design approach, UX principles, design constraints
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Company mission, business strategy, technical constraints, architecture standards<br/>
                                <strong>Output:</strong> Technical approach, architecture constraints, tech stack options
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Company mission, business strategy, market positioning, financial targets<br/>
                                <strong>Output:</strong> Product business case, revenue model, go-to-market approach
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 1 — Coordination</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Product concept, value proposition, target users<br/>
                                <strong>Output:</strong> Product strategy, feature priorities, success metrics
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Design approach, UX principles, product strategy<br/>
                                <strong>Output:</strong> Design strategy, user flows, interaction patterns
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Technical approach, architecture constraints, product strategy<br/>
                                <strong>Output:</strong> Technical strategy, system architecture, development approach
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Product business case, revenue model, product strategy<br/>
                                <strong>Output:</strong> Business strategy, go-to-market plan, launch timeline
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 2 — Roadmap</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Product strategy, feature priorities, success metrics<br/>
                                <strong>Output:</strong> Product roadmap, release plan, success criteria
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Design strategy, user flows, product roadmap<br/>
                                <strong>Output:</strong> Design roadmap, component specifications, usability criteria
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Technical strategy, system architecture, product roadmap<br/>
                                <strong>Output:</strong> Technical roadmap, implementation plan, quality standards
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Business strategy, go-to-market plan, product roadmap<br/>
                                <strong>Output:</strong> Business roadmap, market launch plan, financial projections
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 3 — Planning Complete</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Product roadmap, release plan, stakeholder alignment<br/>
                                <strong>Output:</strong> Product readiness confirmed & development plan
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Design roadmap, component specifications, design validation<br/>
                                <strong>Output:</strong> Design readiness, design system, user testing plan
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Technical roadmap, implementation plan, technical validation<br/>
                                <strong>Output:</strong> Technical readiness, development environment, testing strategy
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Business roadmap, market launch plan, business validation<br/>
                                <strong>Output:</strong> Business readiness, launch strategy, success metrics
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Execution Framework:</strong> Sequential execution designed for product delivery and market launch
                        <br/>
                        <br/>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "8px", fontFamily: "'MS Sans Serif', sans-serif" }}>
                          <thead>
                            <tr>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "8%", fontWeight: "bold" }}>Level</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "23%", fontWeight: "bold" }}>Product Manager</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "23%", fontWeight: "bold" }}>Design Lead</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "23%", fontWeight: "bold" }}>Engineering Lead</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "23%", fontWeight: "bold" }}>Business Stakeholders</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 1 — Launch</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Product readiness confirmed & development plan<br/>
                                <strong>Output:</strong> Product development launched & initial execution
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Design readiness, design system, user testing plan<br/>
                                <strong>Output:</strong> Design execution launched & initial implementation
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Technical readiness, development environment, testing strategy<br/>
                                <strong>Output:</strong> Technical execution launched & infrastructure setup
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Business readiness, launch strategy, success metrics<br/>
                                <strong>Output:</strong> Market execution launched & preparation started
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 2 — Align</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Product development launched & initial execution<br/>
                                <strong>Output:</strong> Product team alignment & development coordination
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Design execution launched & initial implementation<br/>
                                <strong>Output:</strong> Design team alignment & UX coordination
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Technical execution launched & infrastructure setup<br/>
                                <strong>Output:</strong> Engineering team alignment & technical coordination
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Market execution launched & preparation started<br/>
                                <strong>Output:</strong> Market team alignment & launch coordination
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 3 — Measure</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Product team alignment & development coordination<br/>
                                <strong>Output:</strong> Product performance tracking & user metrics
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Design team alignment & UX coordination<br/>
                                <strong>Output:</strong> Design performance tracking & usability metrics
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Engineering team alignment & technical coordination<br/>
                                <strong>Output:</strong> Technical performance tracking & quality metrics
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Market team alignment & launch coordination<br/>
                                <strong>Output:</strong> Market performance tracking & business metrics
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 4 — Optimize</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Product performance tracking & user metrics, user feedback<br/>
                                <strong>Output:</strong> Product execution optimized & continuous improvement plan
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Design performance tracking & usability metrics, user feedback<br/>
                                <strong>Output:</strong> Design execution optimized & UX improvement plan
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Technical performance tracking & quality metrics, performance data<br/>
                                <strong>Output:</strong> Technical execution optimized & quality improvement plan
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Market performance tracking & business metrics, market feedback<br/>
                                <strong>Output:</strong> Market execution optimized & growth strategy
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Delivery Framework:</strong> Cross-functional delivery designed for product validation and market success
                        <br/>
                        <br/>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "8px", fontFamily: "'MS Sans Serif', sans-serif" }}>
                          <thead>
                            <tr>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "8%", fontWeight: "bold" }}>Level</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "23%", fontWeight: "bold" }}>Product Manager</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "23%", fontWeight: "bold" }}>Design Lead</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "23%", fontWeight: "bold" }}>Engineering Lead</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "23%", fontWeight: "bold" }}>Business Stakeholders</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 1 — Validate</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Product launched, user onboarding, feedback collection<br/>
                                <strong>Output:</strong> Product validation report, user satisfaction assessment
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Final design deployed, user experience validated<br/>
                                <strong>Output:</strong> Design validation report, UX satisfaction assessment
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Production deployment, monitoring enabled, support ready<br/>
                                <strong>Output:</strong> Technical validation report, system performance assessment
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Market launch executed, user acquisition started, metrics tracking<br/>
                                <strong>Output:</strong> Market validation report, business performance assessment
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 2 — Measure</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Product validation report, user satisfaction data<br/>
                                <strong>Output:</strong> Product impact metrics, user engagement analysis
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Design validation report, UX satisfaction data<br/>
                                <strong>Output:</strong> Design impact metrics, usability analysis
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Technical validation report, system performance data<br/>
                                <strong>Output:</strong> Technical impact metrics, performance analysis
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Market validation report, business performance data<br/>
                                <strong>Output:</strong> Business impact metrics, market analysis
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 3 — Celebrate</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Product impact metrics, user engagement analysis<br/>
                                <strong>Output:</strong> Product success celebration, team recognition
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Design impact metrics, usability analysis<br/>
                                <strong>Output:</strong> Design success celebration, design achievement recognition
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Technical impact metrics, performance analysis<br/>
                                <strong>Output:</strong> Technical success celebration, engineering achievement recognition
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Business impact metrics, market analysis<br/>
                                <strong>Output:</strong> Business success celebration, market achievement recognition
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 4 — Sustain</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Product success celebration, user feedback<br/>
                                <strong>Output:</strong> Product sustainability plan, continuous improvement roadmap
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Design success celebration, usability feedback<br/>
                                <strong>Output:</strong> Design sustainability plan, UX evolution roadmap
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Technical success celebration, performance feedback<br/>
                                <strong>Output:</strong> Technical sustainability plan, maintenance framework
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Business success celebration, market feedback<br/>
                                <strong>Output:</strong> Business sustainability plan, growth strategy
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'requirements' && (
                  <div>
                    <h3 style={{ margin: "0 0 6px 0", fontSize: "14px" }}>📝 Product Requirements - Defines what to build in detail</h3>
                    
                    <div style={{ marginBottom: "6px" }}>
                      <strong>What:</strong> Detailed specifications for product features and functionality<br/>
                      <strong>Why:</strong> Ensure development team builds exactly what users need and business requires<br/>
                      <strong>How:</strong> How requirements drive development priorities and quality standards
                    </div>
                    
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Owners:</strong><br/>
                      • <strong>Product Manager:</strong> business requirements, user stories, acceptance criteria<br/>
                      • <strong>UX Designer:</strong> user experience requirements, interaction specifications, usability standards<br/>
                      • <strong>Technical Lead:</strong> technical requirements, architecture constraints, performance standards<br/>
                      • <strong>QA Lead:</strong> quality requirements, testing criteria, validation standards
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Planning Framework:</strong> Requirements planning designed for clear specifications and stakeholder alignment
                        <br/>
                        <br/>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "8px", fontFamily: "'MS Sans Serif', sans-serif" }}>
                          <thead>
                            <tr>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "8%", fontWeight: "bold" }}>Level</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "23%", fontWeight: "bold" }}>Product Manager</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "23%", fontWeight: "bold" }}>UX Designer</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "23%", fontWeight: "bold" }}>Technical Lead</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "23%", fontWeight: "bold" }}>QA Lead</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 0 — Foundation</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Product roadmap, user needs, business objectives<br/>
                                <strong>Output:</strong> Business requirements, user personas, success criteria
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Product roadmap, user research, design principles<br/>
                                <strong>Output:</strong> UX requirements, interaction principles, usability criteria
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Product roadmap, technical constraints, architecture standards<br/>
                                <strong>Output:</strong> Technical requirements, architecture constraints, performance criteria
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Product roadmap, quality standards, compliance needs<br/>
                                <strong>Output:</strong> Quality requirements, testing criteria, validation standards
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 1 — Coordination</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Business requirements, user personas, success criteria<br/>
                                <strong>Output:</strong> User stories, acceptance criteria, feature specifications
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> UX requirements, interaction principles, user stories<br/>
                                <strong>Output:</strong> UX specifications, wireframes, interaction specifications
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Technical requirements, architecture constraints, user stories<br/>
                                <strong>Output:</strong> Technical specifications, API contracts, data models
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Quality requirements, testing criteria, user stories<br/>
                                <strong>Output:</strong> Test specifications, quality gates, acceptance tests
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 2 — Roadmap</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> User stories, acceptance criteria, feature specifications<br/>
                                <strong>Output:</strong> Requirements roadmap, priority matrix, release criteria
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> UX specifications, wireframes, feature specifications<br/>
                                <strong>Output:</strong> UX design specifications, component requirements, usability criteria
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Technical specifications, API contracts, feature specifications<br/>
                                <strong>Output:</strong> Implementation requirements, integration specifications, performance benchmarks
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Test specifications, quality gates, feature specifications<br/>
                                <strong>Output:</strong> Test plan, quality metrics, validation requirements
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 3 — Planning Complete</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Requirements roadmap, priority matrix, stakeholder alignment<br/>
                                <strong>Output:</strong> Requirements readiness confirmed & implementation plan
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> UX design specifications, component requirements, design validation<br/>
                                <strong>Output:</strong> UX readiness, design specifications finalized, user testing plan
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Implementation requirements, integration specifications, technical validation<br/>
                                <strong>Output:</strong> Technical readiness, implementation plan, testing strategy
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Test plan, quality metrics, QA validation<br/>
                                <strong>Output:</strong> QA readiness, testing plan finalized, validation strategy
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Execution Framework:</strong> Sequential execution designed for requirements implementation and validation
                        <br/>
                        <br/>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "8px", fontFamily: "'MS Sans Serif', sans-serif" }}>
                          <thead>
                            <tr>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "8%", fontWeight: "bold" }}>Level</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "23%", fontWeight: "bold" }}>Product Manager</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "23%", fontWeight: "bold" }}>UX Designer</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "23%", fontWeight: "bold" }}>Technical Lead</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "23%", fontWeight: "bold" }}>QA Lead</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 1 — Launch</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Requirements readiness confirmed & implementation plan<br/>
                                <strong>Output:</strong> Requirements implementation launched, backlog prioritized
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> UX readiness, design specifications finalized, user testing plan<br/>
                                <strong>Output:</strong> UX implementation launched, design components created
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Technical readiness, implementation plan, testing strategy<br/>
                                <strong>Output:</strong> Development launched, environment setup, implementation started
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> QA readiness, testing plan finalized, validation strategy<br/>
                                <strong>Output:</strong> Testing launched, test environment setup, validation started
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 2 — Build</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Requirements implementation launched, backlog<br/>
                                <strong>Output:</strong> User stories implemented, requirements validated, iterations completed
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> UX implementation launched, design components<br/>
                                <strong>Output:</strong> UX designs implemented, usability validated, design iterations
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Development launched, environment setup<br/>
                                <strong>Output:</strong> Features built, technical requirements met, code reviews completed
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Testing launched, test environment setup<br/>
                                <strong>Output:</strong> Tests executed, quality requirements validated, defects tracked
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 3 — Integrate</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> User stories implemented, requirements validated<br/>
                                <strong>Output:</strong> Requirements integrated, acceptance testing, requirement traceability
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> UX designs implemented, usability validated<br/>
                                <strong>Output:</strong> UX integrated, accessibility testing, design compliance
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Features built, technical requirements met<br/>
                                <strong>Output:</strong> System integrated, integration testing, performance validation
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Tests executed, quality requirements validated<br/>
                                <strong>Output:</strong> Quality integrated, regression testing, compliance verification
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 4 — Deploy</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Requirements integrated, acceptance testing complete<br/>
                                <strong>Output:</strong> Requirements deployment validated, user acceptance confirmed
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> UX integrated, accessibility testing complete<br/>
                                <strong>Output:</strong> UX deployment validated, user experience confirmed
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> System integrated, integration testing complete<br/>
                                <strong>Output:</strong> Production deployment, monitoring enabled, technical validation
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Quality integrated, regression testing complete<br/>
                                <strong>Output:</strong> Quality deployment validated, compliance certification
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Delivery Framework:</strong> Cross-functional delivery designed for requirements validation and user satisfaction
                        <br/>
                        <br/>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "8px", fontFamily: "'MS Sans Serif', sans-serif" }}>
                          <thead>
                            <tr>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "8%", fontWeight: "bold" }}>Level</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "23%", fontWeight: "bold" }}>Product Manager</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "23%", fontWeight: "bold" }}>UX Designer</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "23%", fontWeight: "bold" }}>Technical Lead</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "23%", fontWeight: "bold" }}>QA Lead</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 1 — Validate</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Requirements deployment validated, user acceptance confirmed<br/>
                                <strong>Output:</strong> Requirements validation report, user satisfaction assessment
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> UX deployment validated, user experience confirmed<br/>
                                <strong>Output:</strong> UX validation report, usability assessment
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Production deployment, monitoring enabled, technical validation<br/>
                                <strong>Output:</strong> Technical validation report, performance assessment
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Quality deployment validated, compliance certification<br/>
                                <strong>Output:</strong> Quality validation report, compliance assessment
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 2 — Measure</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Requirements validation report, user satisfaction data<br/>
                                <strong>Output:</strong> Requirements impact metrics, feature adoption analysis
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> UX validation report, usability data<br/>
                                <strong>Output:</strong> UX impact metrics, user experience analysis
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Technical validation report, performance data<br/>
                                <strong>Output:</strong> Technical impact metrics, system performance analysis
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Quality validation report, compliance data<br/>
                                <strong>Output:</strong> Quality impact metrics, compliance performance analysis
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 3 — Celebrate</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Requirements impact metrics, feature adoption analysis<br/>
                                <strong>Output:</strong> Requirements success celebration, stakeholder recognition
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> UX impact metrics, user experience analysis<br/>
                                <strong>Output:</strong> UX success celebration, design achievement recognition
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Technical impact metrics, system performance analysis<br/>
                                <strong>Output:</strong> Technical success celebration, engineering achievement recognition
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Quality impact metrics, compliance performance analysis<br/>
                                <strong>Output:</strong> Quality success celebration, QA achievement recognition
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff", fontWeight: "bold" }}>Level 4 — Sustain</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Requirements success celebration, user feedback<br/>
                                <strong>Output:</strong> Requirements sustainability plan, continuous improvement roadmap
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> UX success celebration, usability feedback<br/>
                                <strong>Output:</strong> UX sustainability plan, design evolution roadmap
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Technical success celebration, performance feedback<br/>
                                <strong>Output:</strong> Technical sustainability plan, maintenance framework
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Quality success celebration, compliance feedback<br/>
                                <strong>Output:</strong> Quality sustainability plan, continuous testing framework
                              </td>
                            </tr>
                          </tbody>
                        </table>
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
                              padding: "2px 4px", 
                              background: "#f0f0f0",
                              border: "1px solid #c0c0c0"
                            }}
                          >
                            <strong>📋 Executive Summary</strong>
                          </div>
                          <div style={{ padding: "4px", background: "#ffffff", fontSize: "8px", marginTop: "2px" }}>
                            <strong>Application:</strong> Windows 95-style Mental Health Monitor<br/>
                            <strong>Purpose:</strong> Track mental health through sleep, emotions, and environment monitoring<br/>
                            <strong>Technology:</strong> React 19.1.1 + Vite 7.1.3<br/>
                            <strong>Storage:</strong> Local storage (browser) + Supabase (cloud backup)<br/>
                            <strong>Design:</strong> 100% Windows 95 authentic aesthetic with MS Sans Serif typography
                          </div>
                        </div>

                        <div style={{ marginBottom: "6px" }}>
                          <div 
                            style={{ 
                              padding: "2px 4px", 
                              background: "#f0f0f0",
                              border: "1px solid #c0c0c0"
                            }}
                          >
                            <strong>🏗️ System Architecture Overview</strong>
                          </div>
                          <div style={{ padding: "4px", background: "#ffffff", fontSize: "8px", marginTop: "2px" }}>
                            <strong>Frontend:</strong> React functional components with hooks (useState, useEffect)<br/>
                            <strong>State Management:</strong> Component-level state, no global state management<br/>
                            <strong>Data Layer:</strong> localStorage for persistence + Supabase for cloud sync<br/>
                            <strong>UI Framework:</strong> Custom Windows 95 components (no UI library)<br/>
                            <strong>Routing:</strong> Single-page application, tab-based navigation
                          </div>
                        </div>

                        <div style={{ marginBottom: "6px" }}>
                          <div 
                            style={{ 
                              padding: "2px 4px", 
                              background: "#f0f0f0",
                              border: "1px solid #c0c0c0"
                            }}
                          >
                            <strong>🎯 Application Domains</strong>
                          </div>
                          <div style={{ padding: "4px", background: "#ffffff", fontSize: "8px", marginTop: "2px" }}>
                            <strong>Sleep Domain:</strong> Sleep hours tracking with visual slider controls<br/>
                            <strong>Emotion Domain:</strong> Emotion monitoring across 5 categories (happy, sad, anxious, angry, calm)<br/>
                            <strong>Environment Domain:</strong> Environment factors (social, work, exercise, weather, diet)<br/>
                            <strong>Timeline Domain:</strong> Event logging and chronological tracking<br/>
                            <strong>Data Domain:</strong> Local and cloud data persistence
                          </div>
                        </div>

                        <div style={{ marginBottom: "6px" }}>
                          <div 
                            style={{ 
                              padding: "2px 4px", 
                              background: "#f0f0f0",
                              border: "1px solid #c0c0c0"
                            }}
                          >
                            <strong>📁 Directory Structure</strong>
                          </div>
                          <div style={{ padding: "4px", background: "#ffffff", fontSize: "8px", marginTop: "2px" }}>
                            <strong>Root:</strong> App.jsx, index.html, vite.config.js, package.json<br/>
                            <strong>/components:</strong> Header.jsx, Timeline.jsx, TravelPlannerMUI.jsx<br/>
                            <strong>/src/theme:</strong> muiTheme.js<br/>
                            <strong>/docs:</strong> Microsoft_Windows95Guidelines.pdf<br/>
                            <strong>Assets:</strong> Inline styles, no separate CSS files
                          </div>
                        </div>

                        <div style={{ marginBottom: "6px" }}>
                          <div 
                            style={{ 
                              padding: "2px 4px", 
                              background: "#f0f0f0",
                              border: "1px solid #c0c0c0"
                            }}
                          >
                            <strong>🔄 Data Flow Architecture</strong>
                          </div>
                          <div style={{ padding: "4px", background: "#ffffff", fontSize: "8px", marginTop: "2px" }}>
                            <strong>User Input:</strong> Slider controls → useState hooks → Component state<br/>
                            <strong>Persistence:</strong> State → localStorage → Save on change<br/>
                            <strong>Cloud Sync:</strong> localStorage → Supabase client → Cloud database<br/>
                            <strong>Data Load:</strong> Page load → Check localStorage → Restore state<br/>
                            <strong>Timeline:</strong> Event creation → State array → localStorage → Timeline display
                          </div>
                        </div>

                        <div style={{ marginBottom: "6px" }}>
                          <div 
                            style={{ 
                              padding: "2px 4px", 
                              background: "#f0f0f0",
                              border: "1px solid #c0c0c0"
                            }}
                          >
                            <strong>🗄️ Database Schema (Supabase)</strong>
                          </div>
                          <div style={{ padding: "4px", background: "#ffffff", fontSize: "8px", marginTop: "2px" }}>
                            <strong>mental_health_entries:</strong><br/>
                            • id (uuid, primary key)<br/>
                            • user_id (uuid, references auth.users)<br/>
                            • date (timestamp)<br/>
                            • sleep_hours (integer)<br/>
                            • emotions (jsonb) - [happy, sad, anxious, angry, calm]<br/>
                            • environment (jsonb) - [social, work, exercise, weather, diet]<br/>
                            • notes (text)<br/>
                            • created_at, updated_at (timestamp)
                          </div>
                        </div>

                        <div style={{ marginBottom: "6px" }}>
                          <div 
                            style={{ 
                              padding: "2px 4px", 
                              background: "#f0f0f0",
                              border: "1px solid #c0c0c0"
                            }}
                          >
                            <strong>🔐 Security Architecture</strong>
                          </div>
                          <div style={{ padding: "4px", background: "#ffffff", fontSize: "8px", marginTop: "2px" }}>
                            <strong>Data Privacy:</strong> All data stored locally first (privacy-first approach)<br/>
                            <strong>Cloud Backup:</strong> Optional Supabase sync (user must opt-in)<br/>
                            <strong>Authentication:</strong> Supabase Auth (email/password, social providers)<br/>
                            <strong>Data Encryption:</strong> HTTPS in transit, Supabase encryption at rest<br/>
                            <strong>No Tracking:</strong> No analytics, no third-party trackers, user privacy respected
                          </div>
                        </div>

                        <div style={{ marginBottom: "6px" }}>
                          <div 
                            style={{ 
                              padding: "2px 4px", 
                              background: "#f0f0f0",
                              border: "1px solid #c0c0c0"
                            }}
                          >
                            <strong>🎨 UI/UX Architecture</strong>
                          </div>
                          <div style={{ padding: "4px", background: "#ffffff", fontSize: "8px", marginTop: "2px" }}>
                            <strong>Desktop Shell:</strong> Windows 95 desktop with icons, taskbar, windows<br/>
                            <strong>Windows:</strong> Draggable windows with title bars, close buttons, inset borders<br/>
                            <strong>Controls:</strong> Knob-style sliders, authentic buttons, Windows 95 inputs<br/>
                            <strong>Colors:</strong> #d4d0c8 (background), #000080 (title bars), #c0c0c0 (controls)<br/>
                            <strong>Typography:</strong> MS Sans Serif 8px (body), 10px (headings)
                          </div>
                        </div>

                        <div style={{ marginBottom: "6px" }}>
                          <div 
                            style={{ 
                              padding: "2px 4px", 
                              background: "#f0f0f0",
                              border: "1px solid #c0c0c0"
                            }}
                          >
                            <strong>📊 Performance Architecture</strong>
                          </div>
                          <div style={{ padding: "4px", background: "#ffffff", fontSize: "8px", marginTop: "2px" }}>
                            <strong>Target:</strong> Load time &lt; 2 seconds, smooth 60fps interactions<br/>
                            <strong>Optimization:</strong> No heavy libraries, minimal dependencies<br/>
                            <strong>State:</strong> Component-level state (no Redux overhead)<br/>
                            <strong>Storage:</strong> localStorage for instant access, async Supabase for backup<br/>
                            <strong>Rendering:</strong> Functional components, React.memo for expensive renders
                          </div>
                        </div>

                        <div style={{ marginBottom: "6px" }}>
                          <div 
                            style={{ 
                              padding: "2px 4px", 
                              background: "#f0f0f0",
                              border: "1px solid #c0c0c0"
                            }}
                          >
                            <strong>🚀 Deployment Architecture</strong>
                          </div>
                          <div style={{ padding: "4px", background: "#ffffff", fontSize: "8px", marginTop: "2px" }}>
                            <strong>Development:</strong> Vite dev server on port 3000<br/>
                            <strong>Build:</strong> vite build → static files in /dist<br/>
                            <strong>Hosting:</strong> Static hosting (Netlify, Vercel, or GitHub Pages)<br/>
                            <strong>CI/CD:</strong> Git push → Auto build → Deploy to production<br/>
                            <strong>Rollback:</strong> Git revert → Redeploy previous version
                          </div>
                        </div>

                        <div style={{ marginBottom: "6px" }}>
                          <div 
                            style={{ 
                              padding: "2px 4px", 
                              background: "#f0f0f0",
                              border: "1px solid #c0c0c0"
                            }}
                          >
                            <strong>🛠️ Technology Recommendations</strong>
                          </div>
                          <div style={{ padding: "4px", background: "#ffffff", fontSize: "8px", marginTop: "2px" }}>
                            <strong>Core:</strong> React 19.1.1, React DOM 19.1.1<br/>
                            <strong>Build Tool:</strong> Vite 7.1.3 (fast builds, HMR)<br/>
                            <strong>Backend:</strong> Supabase 2.56.1 (database, auth, storage)<br/>
                            <strong>UI Library:</strong> Material-UI 7.3.4 (for Travel Planner only)<br/>
                            <strong>Styling:</strong> Inline styles, no CSS frameworks (Windows 95 authentic)
                          </div>
                        </div>

                        <div style={{ marginBottom: "6px" }}>
                          <div 
                            style={{ 
                              padding: "2px 4px", 
                              background: "#f0f0f0",
                              border: "1px solid #c0c0c0"
                            }}
                          >
                            <strong>📋 Implementation Roadmap</strong>
                          </div>
                          <div style={{ padding: "4px", background: "#ffffff", fontSize: "8px", marginTop: "2px" }}>
                            <strong>Phase 1:</strong> Core tracking (sleep, emotions, environment) - ✅ Complete<br/>
                            <strong>Phase 2:</strong> Timeline & event logging - ✅ Complete<br/>
                            <strong>Phase 3:</strong> localStorage persistence - ✅ Complete<br/>
                            <strong>Phase 4:</strong> Supabase cloud sync - ✅ Complete<br/>
                            <strong>Future:</strong> Data visualization, insights, multi-user support
                          </div>
                        </div>

                        <div style={{ marginBottom: "6px" }}>
                          <div 
                            style={{ 
                              padding: "2px 4px", 
                              background: "#f0f0f0",
                              border: "1px solid #c0c0c0"
                            }}
                          >
                            <strong>🎯 Success Metrics</strong>
                          </div>
                          <div style={{ padding: "4px", background: "#ffffff", fontSize: "8px", marginTop: "2px" }}>
                            <strong>Performance:</strong> &lt; 2s load time, 60fps interactions<br/>
                            <strong>Reliability:</strong> 99.9% uptime, zero data loss<br/>
                            <strong>Usability:</strong> Authentic Windows 95 experience, intuitive controls<br/>
                            <strong>Maintainability:</strong> Clean code, modular components, documented decisions<br/>
                            <strong>Scalability:</strong> Support 10,000+ users, handle growth efficiently
                          </div>
                        </div>

                        <div style={{ marginBottom: "6px" }}>
                          <div 
                            style={{ 
                              padding: "2px 4px", 
                              background: "#f0f0f0",
                              border: "1px solid #c0c0c0"
                            }}
                          >
                            <strong>👨‍💼 Solutions Architect Involvement by Stage</strong>
                          </div>
                          <div style={{ padding: "4px", background: "#ffffff", fontSize: "8px", marginTop: "2px" }}>
                            <strong>Planning:</strong> Define architecture strategy, technology choices, system design<br/>
                            <strong>Execution:</strong> Code reviews, architecture guidance, technical decisions<br/>
                            <strong>Delivery:</strong> Performance validation, security review, documentation<br/>
                            <strong>Ongoing:</strong> Technical debt management, architecture evolution, mentoring
                          </div>
                        </div>

                        <div style={{ marginBottom: "6px" }}>
                          <div 
                            style={{ 
                              padding: "2px 4px", 
                              background: "#f0f0f0",
                              border: "1px solid #c0c0c0"
                            }}
                          >
                            <strong>🔗 Integration Architecture</strong>
                          </div>
                          <div style={{ padding: "4px", background: "#ffffff", fontSize: "8px", marginTop: "2px" }}>
                            <strong>Internal:</strong> Component props, event handlers, state lifting<br/>
                            <strong>Storage Integration:</strong> localStorage API, Supabase JavaScript client<br/>
                            <strong>Data Format:</strong> JSON for all stored data<br/>
                            <strong>API Calls:</strong> Supabase REST API for CRUD operations<br/>
                            <strong>Future:</strong> Export/import functionality, data migration tools
                          </div>
                        </div>

                        <div style={{ marginBottom: "6px" }}>
                          <div 
                            style={{ 
                              padding: "2px 4px", 
                              background: "#f0f0f0",
                              border: "1px solid #c0c0c0"
                            }}
                          >
                            <strong>🔒 Compliance & Governance</strong>
                          </div>
                          <div style={{ padding: "4px", background: "#ffffff", fontSize: "8px", marginTop: "2px" }}>
                            <strong>Privacy:</strong> GDPR compliant, user data ownership, right to delete<br/>
                            <strong>Data Governance:</strong> Local-first storage, optional cloud sync<br/>
                            <strong>Code Quality:</strong> ESLint rules, code reviews, testing standards<br/>
                            <strong>Documentation:</strong> Architecture decisions documented, code comments<br/>
                            <strong>Accessibility:</strong> Keyboard navigation, screen reader support (future)
                          </div>
                        </div>

                        <div style={{ marginBottom: "6px" }}>
                          <div 
                            style={{ 
                              padding: "2px 4px", 
                              background: "#f0f0f0",
                              border: "1px solid #c0c0c0"
                            }}
                          >
                            <strong>📊 Monitoring & Observability</strong>
                          </div>
                          <div style={{ padding: "4px", background: "#ffffff", fontSize: "8px", marginTop: "2px" }}>
                            <strong>Development:</strong> Vite dev server console logs, React DevTools<br/>
                            <strong>Production:</strong> Browser console errors, localStorage inspection<br/>
                            <strong>Performance:</strong> Chrome DevTools Performance tab, Lighthouse scores<br/>
                            <strong>Future:</strong> Error tracking (Sentry), analytics (privacy-respecting), user feedback
                          </div>
                        </div>

                        <div style={{ marginBottom: "6px" }}>
                          <div 
                            style={{ 
                              padding: "2px 4px", 
                              background: "#f0f0f0",
                              border: "1px solid #c0c0c0"
                            }}
                          >
                            <strong>📝 Architecture Decision Records (ADRs)</strong>
                          </div>
                          <div style={{ padding: "4px", background: "#ffffff", fontSize: "8px", marginTop: "2px" }}>
                            <strong>ADR-001:</strong> Use React 19 for modern hooks and concurrent features<br/>
                            <strong>ADR-002:</strong> localStorage-first for privacy and offline capability<br/>
                            <strong>ADR-003:</strong> Supabase for optional cloud sync (user control)<br/>
                            <strong>ADR-004:</strong> Inline styles for Windows 95 authenticity (no CSS frameworks)<br/>
                            <strong>ADR-005:</strong> Knob controls instead of sliders for unique UX
                          </div>
                        </div>

                        <div style={{ marginBottom: "6px" }}>
                          <div 
                            style={{ 
                              padding: "2px 4px", 
                              background: "#f0f0f0",
                              border: "1px solid #c0c0c0"
                            }}
                          >
                            <strong>📈 Scalability & Capacity Planning</strong>
                          </div>
                          <div style={{ padding: "4px", background: "#ffffff", fontSize: "8px", marginTop: "2px" }}>
                            <strong>Current Capacity:</strong> Supports single-user, localStorage-based (unlimited client-side)<br/>
                            <strong>Supabase Scaling:</strong> Free tier → Pro tier as user base grows<br/>
                            <strong>Performance:</strong> Static site CDN distribution for fast global access<br/>
                            <strong>Data Growth:</strong> localStorage cleanup strategies, archive old data to cloud<br/>
                            <strong>Future:</strong> Multi-tenant architecture, user accounts, shared data (optional)
                          </div>
                        </div>

                        <div style={{ marginBottom: "6px" }}>
                          <div 
                            style={{ 
                              padding: "2px 4px", 
                              background: "#f0f0f0",
                              border: "1px solid #c0c0c0"
                            }}
                          >
                            <strong>📄 Full Documentation</strong>
                          </div>
                          <div style={{ padding: "4px", background: "#ffffff", fontSize: "8px", marginTop: "2px" }}>
                            <strong>Design Docs:</strong> Microsoft_Windows95Guidelines.pdf (authentic guidelines)<br/>
                            <strong>Component Docs:</strong> Inline comments in App.jsx, components/<br/>
                            <strong>Setup Docs:</strong> package.json dependencies, vite.config.js settings<br/>
                            <strong>Data Models:</strong> Documented in code comments and Supabase schema<br/>
                            <strong>This Framework:</strong> Complete strategic and tactical management documentation
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
    <div
      role="main"
      aria-label="Desktop"
      style={{ 
      background: "url('/wp2625478-windows-95-desktop-background.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      width: "100vw",
      position: "relative"
    }}>
      {/* Semi-transparent overlay for better text contrast */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.2)",
        pointerEvents: "none"
      }} />
      {/* Desktop Icons */}
      {/* First Desktop Icon - CV */}
      <div
        style={{
          position: "absolute",
          top: "20px",
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
          }}>📄</span>
        </div>
        <span style={{
          fontSize: "12px",
          fontFamily: "'MS Sans Serif', sans-serif",
          color: "#ffffff",
          textAlign: "center",
          textShadow: "1px 1px 0px #000000",
          whiteSpace: "nowrap"
        }}>
          CV
        </span>
      </div>

      {/* Second Desktop Icon - FCTG Amendments */}
      <div
        style={{
          position: "absolute",
          top: "100px",
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
          fontSize: "12px",
          fontFamily: "'MS Sans Serif', sans-serif",
          color: "#ffffff",
          textAlign: "center",
          textShadow: "1px 1px 0px #000000",
          whiteSpace: "nowrap"
        }}>
          FCTG Amendments
        </span>
      </div>

    {/* Third Desktop Icon - FCTG Insurance */}
    <div
      style={{
        position: "absolute",
        top: "180px",
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
      onClick={openInsuranceApp}
      onDoubleClick={openInsuranceApp}
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
        }}>🛡️</span>
      </div>
      <span style={{
        fontSize: "12px",
        fontFamily: "'MS Sans Serif', sans-serif",
        color: "#ffffff",
        textAlign: "center",
        textShadow: "1px 1px 0px #000000",
        whiteSpace: "nowrap"
      }}>
        FCTG Insurance
      </span>
    </div>

    {/* Fourth Desktop Icon - Magento Shipping */}
    <div
      style={{
        position: "absolute",
        top: "260px",
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
      onClick={() => {/* Will add case study later */}}
      onDoubleClick={() => {/* Will add case study later */}}
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
        }}>📦</span>
      </div>
      <span style={{
        fontSize: "12px",
        fontFamily: "'MS Sans Serif', sans-serif",
        color: "#ffffff",
        textAlign: "center",
        textShadow: "1px 1px 0px #000000",
        whiteSpace: "nowrap"
      }}>
        Magento Shipping
      </span>
    </div>

    {/* Fifth Desktop Icon - Earth (Mental Health) */}
    <div
      style={{
        position: "absolute",
        top: "340px",
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
        fontSize: "12px",
        fontFamily: "'MS Sans Serif', sans-serif",
        color: "#ffffff",
        textAlign: "center",
        textShadow: "1px 1px 0px #000000",
        whiteSpace: "nowrap"
      }}>
        Earth
      </span>
    </div>

      {/* Application Window */}
      {isWindowOpen && !isWindowMinimized && (
        <div 
          style={{
            position: "absolute",
            left: `${windowPosition.x}px`,
            top: `${windowPosition.y}px`,
            zIndex: 100
          }}
        >
      <div style={styles.mainWindow}>
            <Header onClose={closeWindow} onMinimize={minimizeWindow} onDragStart={handleWindowMouseDown} />
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

      {/* Second Application Window - Clean Document */}
      {isSecondAppOpen && !isSecondAppMinimized && (
        <div 
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 99,
            background: "#ffffff",
            width: "926px",
            maxWidth: "90vw",
            height: "1310px",
            maxHeight: "90vh",
            boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column"
          }}
        >
          {/* Close Button - Absolute position in top-right */}
          <button
            onClick={closeSecondApp}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              width: "44px",
              height: "44px",
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
          
          {/* Scrollable content area */}
          <div
            tabIndex={0}
            aria-label="CV content"
            style={{
            flex: 1,
            overflow: "auto",
            padding: "48px 64px",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', sans-serif",
            fontSize: "15px",
            lineHeight: "1.6",
            color: "#1d1d1f",
            WebkitFontSmoothing: "antialiased"
          }}>
              <div style={{ maxWidth: "700px", margin: "0 auto" }}>
                {/* Header */}
                <div style={{ marginBottom: "48px" }}>
                  <h1 style={{ fontSize: "48px", fontWeight: "600", margin: "0 0 8px 0", color: "#1d1d1f", letterSpacing: "-0.5px" }}>Joel Hickey</h1>
                <div style={{ fontSize: "21px", fontWeight: "300", color: "#4a4a4a", letterSpacing: "-0.2px" }}>Senior Product Designer</div>
                </div>

                {/* Introduction */}
                <div style={{ marginBottom: "48px" }}>
                  <h2 style={{ fontSize: "28px", fontWeight: "600", marginBottom: "16px", color: "#1d1d1f", letterSpacing: "-0.3px" }}>Introduction</h2>
                  <p style={{ margin: "0 0 12px 0", fontSize: "15px", lineHeight: "1.6", color: "#1d1d1f" }}>
                    At an early age I was blessed with a passion for design, growing up with a unique lens that combined both design and artistry. I bring with me a special set of skills from a background in interface and sound design, finding joy in the many aspects of digital and physical design.
                  </p>
                  <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.6", color: "#1d1d1f" }}>
                    I strive to shape and deliver valuable, delightful solutions that solve the right problems for the user and the business efficiently and effectively.
                  </p>
                </div>

                {/* Experience */}
                <div style={{ marginBottom: "48px" }}>
                  <h2 style={{ fontSize: "28px", fontWeight: "600", marginBottom: "20px", color: "#1d1d1f", letterSpacing: "-0.3px" }}>Experience</h2>
                  
                  {/* FCTG */}
                  <div style={{ marginBottom: "32px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                      <strong style={{ fontSize: "17px", fontWeight: "600" }}>Senior UI/UX Designer</strong>
                      <span style={{ color: "#4a4a4a", fontSize: "15px" }}>2021-2025</span>
                    </div>
                    <div style={{ marginBottom: "12px", color: "#4a4a4a", fontSize: "15px" }}>Flight Centre Travel Group</div>
                    <p style={{ margin: "0 0 16px 0", fontSize: "15px", lineHeight: "1.6" }}>
                      Improved productivity of the consultant booking platform by reducing the steps required to manage bookings. Involved in all parts of the design process from discovery to post release enhancements with both internal and external teams.
                    </p>
                    
                    <div style={{ marginBottom: "12px" }}>
                      <strong style={{ fontSize: "15px" }}>Amendments</strong> <span style={{ color: "#004b99", fontSize: "13px", cursor: "pointer" }}>View the story</span>
                      <div style={{ display: "flex", gap: "24px", marginTop: "6px", fontSize: "13px", color: "#4a4a4a" }}>
                        <span>Efficiency +67%</span>
                        <span>ROI +67%</span>
                        <span>CSAT +67%</span>
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: "16px" }}>
                      <strong style={{ fontSize: "15px" }}>Travel insurance</strong> <span style={{ color: "#004b99", fontSize: "13px", cursor: "pointer" }}>View the story</span>
                      <div style={{ display: "flex", gap: "24px", marginTop: "6px", fontSize: "13px", color: "#4a4a4a" }}>
                        <span>Efficiency +67%</span>
                        <span>ROI +67%</span>
                        <span>CSAT +67%</span>
                      </div>
                    </div>

                    <div style={{ padding: "16px", background: "#f5f5f7", borderRadius: "8px" }}>
                      <strong style={{ fontSize: "15px", fontWeight: "600" }}>Awards</strong>
                      <div style={{ marginTop: "8px", fontSize: "14px", lineHeight: "1.8" }}>
                        • Selected to attend FCTG Global Lisbon, Portugal 2024<br/>
                        • Buzz night award winner 2022, 2023
                      </div>
                    </div>
                  </div>

                  {/* Canstar */}
                  <div style={{ marginBottom: "32px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                      <strong style={{ fontSize: "17px", fontWeight: "600" }}>Lead UI/UX Designer</strong>
                      <span style={{ color: "#4a4a4a", fontSize: "15px" }}>2019-2020</span>
                    </div>
                    <div style={{ marginBottom: "12px", color: "#4a4a4a", fontSize: "15px" }}>Canstar</div>
                    <div style={{ fontSize: "14px", lineHeight: "1.8" }}>
                      • Focused on customer product verticals and internal software<br/>
                      • Transitioned Canstar to a scalable design tool (Figma)<br/>
                      • UI/UX representative for all agile ceremonies (internal & external)<br/>
                      • Established a UI/UX repository and documentation guidelines<br/>
                      • Wrote a usability testing framework and carried out multiple stakeholder sessions with recommended design updates<br/>
                      • Worked on a design system for efficient design/developer process
                    </div>
                  </div>

                  {/* Temando */}
                  <div style={{ marginBottom: "32px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                      <strong style={{ fontSize: "17px", fontWeight: "600" }}>UI/UX Designer</strong>
                      <span style={{ color: "#4a4a4a", fontSize: "15px" }}>2015-2019</span>
                    </div>
                    <div style={{ marginBottom: "12px", color: "#4a4a4a", fontSize: "15px" }}>Temando</div>
                    <p style={{ margin: "0 0 16px 0", fontSize: "15px", lineHeight: "1.6" }}>
                      Improved the productivity of merchants using Magento Shipping by enabling multiple shipments to be dispatched quickly in a single flow.
                    </p>
                    
                    <div style={{ marginBottom: "16px" }}>
                      <strong style={{ fontSize: "15px" }}>Bulk shipments</strong> <span style={{ color: "#004b99", fontSize: "13px", cursor: "pointer" }}>View the story</span>
                      <div style={{ display: "flex", gap: "24px", marginTop: "6px", fontSize: "13px", color: "#4a4a4a" }}>
                        <span>Efficiency +67%</span>
                        <span>ROI +67%</span>
                        <span>CSAT +67%</span>
                      </div>
                    </div>

                    <div style={{ fontSize: "14px", lineHeight: "1.8" }}>
                      • Designed multiple software proposals for Nike, Myer and Asos<br/>
                      • Designed entire workflows from wire frames to high fidelity<br/>
                      • Established design frameworks and a UX guild<br/>
                      • UI/UX representative for all agile ceremonies (internal & offshore)
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div style={{ marginBottom: "48px" }}>
                  <h2 style={{ fontSize: "28px", fontWeight: "600", marginBottom: "20px", color: "#1d1d1f", letterSpacing: "-0.3px" }}>Education</h2>
                  
                  <div style={{ marginBottom: "20px" }}>
                    <strong style={{ fontSize: "17px", fontWeight: "600" }}>Masters of Interactive Media</strong>
                    <div style={{ color: "#4a4a4a", fontSize: "14px", marginTop: "4px" }}>Queensland College of Art</div>
                    <div style={{ color: "#4a4a4a", fontSize: "14px" }}>2015-2016</div>
                  </div>

                  <div style={{ marginBottom: "20px" }}>
                    <strong style={{ fontSize: "17px", fontWeight: "600" }}>Bachelor of Audio Engineering and Sound Production</strong>
                    <div style={{ color: "#4a4a4a", fontSize: "14px", marginTop: "4px" }}>JMC Academy</div>
                    <div style={{ color: "#4a4a4a", fontSize: "14px" }}>2011-2013</div>
                  </div>
                </div>

                {/* Tools */}
                <div style={{ marginBottom: "48px" }}>
                  <h2 style={{ fontSize: "28px", fontWeight: "600", marginBottom: "20px", color: "#1d1d1f", letterSpacing: "-0.3px" }}>Tools</h2>
                  <div style={{ display: "flex", gap: "24px", fontSize: "15px", flexWrap: "wrap" }}>
                    <span>Figma</span>
                    <span>Miro</span>
                    <span>Fullstory</span>
                    <span>Confluence</span>
                  </div>
                </div>

                {/* Say Hello */}
                <div style={{ marginBottom: "48px" }}>
                  <h2 style={{ fontSize: "28px", fontWeight: "600", marginBottom: "20px", color: "#1d1d1f", letterSpacing: "-0.3px" }}>Say Hello</h2>
                  <div style={{ fontSize: "15px", lineHeight: "1.8" }}>
                    <div style={{ marginBottom: "6px" }}>0421 366 486</div>
                    <div style={{ marginBottom: "6px" }}>joelhickeydesigns@gmail.com</div>
                    <div style={{ marginBottom: "6px" }}>Brisbane or remote</div>
                    <div style={{ marginBottom: "6px", color: "#004b99", cursor: "pointer" }}>dribbble.com/joelhickey</div>
                  </div>
                </div>

                {/* References */}
                <div>
                  <h2 style={{ fontSize: "28px", fontWeight: "600", marginBottom: "20px", color: "#1d1d1f", letterSpacing: "-0.3px" }}>References</h2>
                  <div style={{ fontSize: "15px", color: "#4a4a4a" }}>Available upon request</div>
                </div>
              </div>
          </div>
        </div>
      )}

      {/* Third Application Window - Travel Amendments */}
      {isTravelAppOpen && !isTravelAppMinimized && (
        <>
          {travelPlannerView === 'caseStudy' && (
            <AmendmentsCaseStudy
              onViewOldFlow={() => setTravelPlannerView('oldFlow')}
              onViewNewFlow={() => setTravelPlannerView('newFlow')}
              onClose={closeTravelApp}
            />
          )}
          
          {travelPlannerView === 'oldFlow' && (
            <TravelOldFlow
              onBackToCaseStudy={() => setTravelPlannerView('caseStudy')}
              onClose={closeTravelApp}
            />
          )}
          
          {travelPlannerView === 'newFlow' && (
            <TravelPlannerMUI
              isOpen={isTravelAppOpen}
              onClose={closeTravelApp}
              onMinimize={minimizeTravelApp}
              position={travelWindowPosition}
              onDragStart={handleTravelWindowMouseDown}
              isMinimized={isTravelAppMinimized}
              showBackButton={true}
              onBackToCaseStudy={() => setTravelPlannerView('caseStudy')}
            />
          )}
        </>
      )}

      {/* Fourth Application Window - Insurance */}
      {isInsuranceAppOpen && !isInsuranceDemoOpen && (
        <InsuranceCaseStudy
          onClose={closeInsuranceApp}
          onViewDemo={openInsuranceDemo}
        />
      )}

      {isInsuranceAppOpen && isInsuranceDemoOpen && (
        <InsuranceOldFlow
          onBackToCaseStudy={backToInsuranceCaseStudy}
          onClose={closeInsuranceApp}
        />
      )}

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
                  fontFamily: "'MS Sans Serif', sans-serif"
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
                    fontFamily: "'MS Sans Serif', sans-serif"
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

      <Analytics />
    </div>
  );
}

export default App;


