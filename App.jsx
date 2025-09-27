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
  const [isWindowOpen, setIsWindowOpen] = useState(true);

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
    console.log('Window closed');
  };

  const openWindow = () => {
    setIsWindowOpen(true);
    console.log('Window opened');
  };

  const hasSavedPositions = () => {
    return localStorage.getItem('sliderPositions') !== null;
  };

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
                        <h3 style={{ margin: "0", fontSize: "10px" }}>🏢 Company Mission</h3>
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
                    
                    
                      <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                        <div style={{ marginBottom: "4px" }}>
                          <strong>Planning Framework:</strong> planning the mission<br/>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "8px", fontFamily: "'MS Sans Serif', sans-serif", marginTop: "4px" }}>
                          <thead>
                            <tr>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "7.5%" }}>Level</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "30%" }}>CEO/Founder </th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "30%" }}>Leadership Team </th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "32.5%" }}>All Team Members </th>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", fontSize: "7px", fontStyle: "italic" }}>Purpose</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", fontSize: "7px", fontStyle: "italic" }}>Strategic planning, mission definition</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", fontSize: "7px", fontStyle: "italic" }}>Operational planning, culture building</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", fontSize: "7px", fontStyle: "italic" }}>Cultural planning, values embodiment</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 0 = Foundation/Groundwork</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Market research & user needs analysis<br/>
                                <strong>Output:</strong> mission statement, core values document<br/>
                                <strong>Done:</strong> Board approval (go/no‑go gate)
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> mission statement, core values<br/>
                                <strong>Output:</strong> rollout plan<br/>
                                <strong>Done:</strong> CEO approval
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Mission statement & values framework<br/>
                                <strong>Output:</strong> Team readiness (culture kickoff)<br/>
                                <strong>Done:</strong> Team alignment (recommend: pulse survey threshold)
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 1 — Vision & Metrics</td>
                                <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                  <strong>Input:</strong> Mission statement, core values<br/>
                                  <strong>Output:</strong> aspirational vision, measurable North‑Star, and strategic objectives<br/>
                                  <strong>Done:</strong> Board approval
                                </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> vision document, North Star<br/>
                                <strong>Output:</strong> culture framework<br/>
                                <strong>Done:</strong> framework ready
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> values framework, culture guidelines<br/>
                                <strong>Output:</strong> decision guidelines<br/>
                                <strong>Done:</strong> team trained
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 2 — Strategy & Roadmap</td>
                                <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                  <strong>Input:</strong> Vision document, North Star, strategic objectives<br/>
                                  <strong>Output:</strong> Strategic roadmap and success metrics (milestones, owners, timelines, KPIs)<br/>
                                  <strong>Done:</strong> Board approval
                                </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> strategic roadmap<br/>
                                <strong>Output:</strong> alignment plan<br/>
                                <strong>Done:</strong> plan executed
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <em>Team preparation complete</em>
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 3 — Execute & Embed</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> Strategic roadmap, governance requirements<br/>
                                <strong>Output:</strong> Strategic updates (status, risks, decisions, progress vs milestones)<br/>
                                <strong>Done:</strong> Quarterly review completed and published (review packet: progress report, risk register updates, decision log)
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> strategic updates<br/>
                                <strong>Output:</strong> continued strategic updates<br/>
                                <strong>Done:</strong> updates implemented
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <em>Team preparation complete</em>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        
                        <div style={{ marginTop: "8px", border: "1px solid #808080", padding: "4px", background: "#f0f0f0" }}>
                            <strong>Artifacts:</strong> What gets produced<br/>
                            • <strong>Mission Statement:</strong> Democratize mental health awareness through accessible, private wellness tracking<br/>
                            • <strong>Core Values:</strong> Privacy first — data stays local; Simplicity over complexity; Technology serves people<br/>
                            • <strong>Vision Statement:</strong> A world where mental health tracking is as simple and private as using a calculator<br/>
                            • <strong>North Star:</strong> 1 million people using our Windows‑95‑inspired mental health tools by 2030 (Owner: CEO/Founder — tracking: Head of Product)<br/>
                            • <strong>Strategic Objectives:</strong> High-level goals that support the mission and drive toward the North Star<br/>
                            • <strong>Roadmap:</strong> Strategic implementation plan with milestones and timelines<br/>
                            • <strong>Success Metrics / KPI dashboard:</strong> Measurable outcomes and progress tracking system
                        </div>
                        
                          <div style={{ marginTop: "8px", border: "1px solid #808080", padding: "4px", background: "#f0f0f0" }}>
                            <strong>Success Criteria:</strong> How you know it's done (measurement)<br/>
                            • Mission published + communicated<br/>
                            • Vision & North Star approved<br/>
                            • Strategic objectives defined and approved<br/>
                            • Strategic roadmap published with milestones and timelines<br/>
                            • Success metrics framework established<br/>
                            • Board approval for all planning artifacts
                          </div>
                        
                        <div style={{ marginTop: "8px", border: "1px solid #808080", padding: "4px", background: "#f0f0f0" }}>
                          <strong>Next Steps:</strong> How to actually implement it (action items)<br/>
                          • Publish the one-page mission doc to docs/ and intranet (Owner: CEO/Founder)<br/>
                          • Run a 30-minute all-hands to present mission + rollout plan (Owner: Leadership Team)<br/>
                          • Define strategic objectives and get Board approval (Owner: CEO/Founder)<br/>
                          • Publish strategic roadmap with milestones and timelines (Owner: Head of Product)<br/>
                          • Establish success metrics framework and reporting cadence (Owner: Head of Product)<br/>
                          • Get Board approval for all planning artifacts (Owner: CEO/Founder)
                        </div>
                      </div>
                    </div>
                    
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Execution Framework:</strong> operationalizing the mission<br/>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "8px", fontFamily: "'MS Sans Serif', sans-serif", marginTop: "4px" }}>
                          <thead>
                            <tr>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "7.5%" }}>Level</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "30%" }}>CEO/Founder </th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "30%" }}>Leadership Team </th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "32.5%" }}>All Team Members </th>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", fontSize: "7px", fontStyle: "italic" }}>Purpose: Executes mission</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", fontSize: "7px", fontStyle: "italic" }}>Strategic execution</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", fontSize: "7px", fontStyle: "italic" }}>Operational execution & culture building</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", fontSize: "7px", fontStyle: "italic" }}>Values embodiment & mission-driven actions</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 1 — Start</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> mission approved, values documented<br/>
                                <strong>Output:</strong> strategic direction & mission progress<br/>
                                  <strong>Done:</strong> quarterly strategic update published
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> mission approved, values documented<br/>
                                <strong>Output:</strong> operational plans & communications framework<br/>
                                <strong>Done:</strong> rollout executed and measured
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> mission approved, values documented<br/>
                                <strong>Output:</strong> mission-driven behaviors<br/>
                                <strong>Done:</strong> initial alignment achieved
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 2 — Align</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> strategic direction, mission progress<br/>
                                <strong>Output:</strong> strategic roadmap & success metrics<br/>
                                <strong>Done:</strong> roadmap approved
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> strategic direction, mission progress<br/>
                                <strong>Output:</strong> cultural framework & implementation plan<br/>
                                <strong>Done:</strong> framework in place
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> strategic direction, mission progress<br/>
                                <strong>Output:</strong> consistent decisions & alignment<br/>
                                <strong>Done:</strong> trained + demonstrated in milestones
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 3 — Measure</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> roadmap, success metrics<br/>
                                <strong>Output:</strong> mission impact report<br/>
                                <strong>Done:</strong> monthly North Star report published
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> roadmap, success metrics<br/>
                                <strong>Output:</strong> alignment framework<br/>
                                <strong>Done:</strong> cross‑program alignment validated
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> roadmap, success metrics<br/>
                                <strong>Output:</strong> values‑driven behavior patterns<br/>
                                <strong>Done:</strong> behaviors observed and recorded
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 4 — Embed</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> mission impact, North Star progress<br/>
                                <strong>Output:</strong> strategic alignment artifacts (scale playbook, budgets)<br/>
                                <strong>Done:</strong> executive sign‑off for scale
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> mission impact, North Star progress<br/>
                                <strong>Output:</strong> communication & alignment metrics<br/>
                                <strong>Done:</strong> metrics tracked & acted on
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> mission impact, North Star progress<br/>
                                <strong>Output:</strong> consistent decision patterns<br/>
                                <strong>Done:</strong> operational KPIs reflect mission
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 5 — Improve</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> strategic alignment, mission success<br/>
                                <strong>Output:</strong> strategic clarity & public messaging<br/>
                                <strong>Done:</strong> leadership reviews & updates
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> strategic alignment, mission success<br/>
                                <strong>Output:</strong> improvement frameworks<br/>
                                <strong>Done:</strong> feedback systems active
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> strategic alignment, mission success<br/>
                                <strong>Output:</strong> culture of iteration<br/>
                                <strong>Done:</strong> improvement metrics
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 6 — Sustain</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> mission leadership, strategic clarity<br/>
                                <strong>Output:</strong> North Star progress & strategic decisions<br/>
                                <strong>Done:</strong> annual mission review
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> mission leadership, strategic clarity<br/>
                                <strong>Output:</strong> embedded mission frameworks<br/>
                                <strong>Done:</strong> sustained metrics for values
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> mission leadership, strategic clarity<br/>
                                <strong>Output:</strong> stakeholder satisfaction<br/>
                                <strong>Done:</strong> target satisfaction met
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Roof — Impact</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> mission culture & stakeholder satisfaction<br/>
                                <strong>Output:</strong> mission success & integrated framework<br/>
                                <strong>Done:</strong> mission validated against North Star and stakeholder outcomes
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> mission culture & stakeholder satisfaction<br/>
                                <strong>Output:</strong> mission success & integrated framework<br/>
                                <strong>Done:</strong> mission validated against North Star and stakeholder outcomes
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> mission culture & stakeholder satisfaction<br/>
                                <strong>Output:</strong> mission success & integrated framework<br/>
                                <strong>Done:</strong> mission validated against North Star
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        
                          <div style={{ marginTop: "8px", border: "1px solid #808080", padding: "4px", background: "#f0f0f0" }}>
                            <strong>Artifacts:</strong><br/>
                            • Mission progress tracking reports<br/>
                            • Active roadmap with current status<br/>
                            • North Star monthly tracking reports<br/>
                            • Operational runbooks and procedures<br/>
                            • Current strategic decisions and approvals<br/>
                            • Execution metrics and dashboards<br/>
                            <em>Note: These are the living, operational artifacts that guide daily execution and track progress toward the mission</em>
                          </div>
                        
                          <div style={{ marginTop: "8px", border: "1px solid #808080", padding: "4px", background: "#f0f0f0" }}>
                            <strong>Success Criteria:</strong><br/>
                            • Mission published — Owner: Head of Comms<br/>
                            • Vision & North Star approved — Owner: CEO<br/>
                            • Strategic objectives defined and approved — Owner: CEO<br/>
                            • Strategic roadmap published — Owner: Head of Product<br/>
                            • Success metrics framework established — Owner: Head of Product<br/>
                            • Board approval for all planning artifacts — Owner: CEO<br/>
                            • Culture adoption shown in quarterly survey and performance reviews — Owner: Head of People<br/>
                            • Monthly progress toward North Star — Owner: Head of Product<br/>
                            • Progress toward North Star (users served) — Owner: Head of Product<br/>
                            • % decisions explicitly tied to mission in quarterly reviews — Owner: CEO<br/>
                            • Values reflected in performance reviews / recognition rate — Owner: Head of People<br/>
                            • Team engagement and mission alignment scores — Owner: Head of People
                          </div>
                        
                        <div style={{ marginTop: "8px", border: "1px solid #808080", padding: "4px", background: "#f0f0f0" }}>
                          <strong>Next Steps:</strong><br/>
                          • Publish one‑page mission doc to docs/ and intranet (Owner: CEO/Founder)<br/>
                          • Run 30‑minute all‑hands to present mission + rollout plan (Owner: Leadership Team)<br/>
                          • Add "mission alignment" field to PRD and milestone reviews (Owner: Head of Product)<br/>
                          • Assign owners and reporting cadence for each success metric (Owner: CEO)<br/>
                          • Publish Strategic Roadmap, Communication Framework, Culture Framework in docs/ (Owner: Head of Product)<br/>
                          • Run initial pulse survey to measure team readiness (Owner: Head of People)<br/>
                          • Produce first Monthly North Star report (baseline metrics) (Owner: Head of Product)<br/>
                          • Schedule recurring cadence: weekly standup, monthly metrics review, quarterly exec update (Owner: CEO)
                        </div>
                      </div>
                      
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                        <div style={{ marginBottom: "4px" }}>
                          <strong>Delivery Framework:</strong> validate, measure and celebrate mission success<br/>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "8px", fontFamily: "'MS Sans Serif', sans-serif", marginTop: "4px" }}>
                          <thead>
                            <tr>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "7.5%" }}>Level</th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "30%" }}>CEO/Founder </th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "30%" }}>Leadership Team </th>
                              <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "32.5%" }}>All Team Members </th>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", fontSize: "7px", fontStyle: "italic" }}>Purpose</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", fontSize: "7px", fontStyle: "italic" }}>Strategic delivery & validation</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", fontSize: "7px", fontStyle: "italic" }}>Operational delivery & culture validation</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", fontSize: "7px", fontStyle: "italic" }}>Values delivery & mission validation</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 1 — Validate</td>
                                <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                  <strong>Input:</strong> mission execution results, North Star progress<br/>
                                  <strong>Output:</strong> Mission Validation Report<br/>
                                  <strong>Done:</strong> report published
                                </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> mission execution results, North Star progress<br/>
                                <strong>Output:</strong> Culture Validation Report<br/>
                                <strong>Done:</strong> assessment completed
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> mission execution results, North Star progress<br/>
                                <strong>Output:</strong> Values Validation Summary<br/>
                                <strong>Done:</strong> values assessment completed
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 2 — Measure</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> validation reports<br/>
                                <strong>Output:</strong> Impact Metrics Report<br/>
                                <strong>Done:</strong> metrics report published
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> validation reports<br/>
                                <strong>Output:</strong> Stakeholder Satisfaction Report<br/>
                                <strong>Done:</strong> survey completed and analyzed
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> validation reports<br/>
                                <strong>Output:</strong> Values Impact Assessment<br/>
                                <strong>Done:</strong> values impact measured
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 3 — Celebrate</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> impact metrics, stakeholder satisfaction<br/>
                                <strong>Output:</strong> Success Celebration Plan & Execution<br/>
                                <strong>Done:</strong> celebration executed
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> impact metrics, stakeholder satisfaction<br/>
                                <strong>Output:</strong> Values Recognition Program<br/>
                                <strong>Done:</strong> program launched
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> impact metrics, stakeholder satisfaction<br/>
                                <strong>Output:</strong> Values Celebration Participation<br/>
                                <strong>Done:</strong> team celebration completed
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 4 — Sustain</td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> celebration outcomes, recognition programs<br/>
                                <strong>Output:</strong> Sustainability Plan (processes + KPIs)<br/>
                                <strong>Done:</strong> plan implemented
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> celebration outcomes, recognition programs<br/>
                                <strong>Output:</strong> Ongoing culture programs & metrics<br/>
                                <strong>Done:</strong> sustained metrics meet targets
                              </td>
                              <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>
                                <strong>Input:</strong> celebration outcomes, recognition programs<br/>
                                <strong>Output:</strong> Values Sustainability Engagement<br/>
                                <strong>Done:</strong> values sustainability achieved
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        
                        <div style={{ marginTop: "8px", border: "1px solid #808080", padding: "4px", background: "#f0f0f0" }}>
                          <strong>Artifacts:</strong><br/>
                          • Mission Validation Report<br/>
                          • Impact Metrics Report<br/>
                          • Culture Assessment Report<br/>
                          • Success Celebration Plan<br/>
                          • Values Recognition Program docs<br/>
                          • Sustainability Plans
                        </div>
                        
                          <div style={{ marginTop: "8px", border: "1px solid #808080", padding: "4px", background: "#f0f0f0" }}>
                            <strong>Success criteria:</strong><br/>
                            • Mission validation report published<br/>
                            • Impact metrics reported monthly<br/>
                            • Stakeholder satisfaction targets met<br/>
                            • Celebration executed & recognition program launched<br/>
                            • Sustainability plans implemented and tracked
                          </div>
                        
                        <div style={{ marginTop: "8px", border: "1px solid #808080", padding: "4px", background: "#f0f0f0" }}>
                          <strong>Next steps:</strong><br/>
                          • Run mission validation assessment and publish report<br/>
                          • Launch stakeholder satisfaction survey and publish findings<br/>
                          • Plan success celebration and values recognition program<br/>
                          • Draft sustainability plan and assign owners
                        </div>
                      </div>
                      
                    </div>
                    
                    <div style={{ marginBottom: "8px" }}>
                        <div style={{ marginBottom: "4px" }}>
                          <strong>Governance:</strong><br/>
                          • Monthly mission alignment reviews<br/>
                          • Quarterly values assessment<br/>
                          • Annual strategic planning<br/>
                          • Continuous culture building and values-based recognition
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
                              • <strong>Output:</strong> mission statement, core values document, aspirational vision, measurable North‑Star, strategic objectives, roadmap, and success metrics<br/>
                              • <strong>Done when:</strong> Board approval (go/no‑go gate), Board approval, Board approval
                            </div>
                          
                          <div style={{ marginBottom: "6px" }}>
                            <strong>Execution:</strong><br/>
                            • <strong>Input:</strong> mission approved, values documented<br/>
                            • <strong>Output:</strong> strategic direction & mission progress, operational plans, mission-driven behaviors, progress tracking reports, active roadmap, operational runbooks, execution metrics<br/>
                            • <strong>Done when:</strong> mission validated against North Star and stakeholder outcomes
                          </div>
                          
                          <div style={{ marginBottom: "6px" }}>
                            <strong>Delivery:</strong><br/>
                            • <strong>Input:</strong> mission execution results, North Star progress<br/>
                            • <strong>Output:</strong> Mission Validation Report, Impact Metrics Report, Culture Assessment Report, Success Celebration Plan, Values Recognition Program, Sustainability Plans<br/>
                            • <strong>Done when:</strong> values sustainability achieved
                          </div>
                          
                          
                          <div style={{ marginBottom: "6px" }}>
                            <strong>Governance:</strong><br/>
                            • Monthly mission alignment reviews<br/>
                            • Quarterly values assessment<br/>
                            • Annual strategic planning<br/>
                            • Continuous culture building and values-based recognition
                          </div>
                          
                        </div>
                      )}
                    </div>
                )}
                {activeTab === 'business' && (
                  <div>
                    <h3 style={{ margin: "0 0 6px 0", fontSize: "10px" }}>💼 Business Strategy</h3>
                    
                    <div style={{ marginBottom: "6px" }}>
                      <strong>What:</strong> Strategic decisions and market positioning in mental-health tech<br/>
                      <strong>Why:</strong> Capture market share and achieve financial targets through differentiated approach<br/>
                      <strong>How:</strong> How to win with Windows-95 aesthetic + privacy-first approach in $5.6B market
                    </div>
                    
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Owners:</strong><br/>
                      • CEO/Founder: strategic direction, market positioning, investor relations<br/>
                      • Business Development: partnerships, revenue model, market expansion<br/>
                      • Marketing Lead: brand positioning, customer acquisition, market research<br/>
                      • Finance Lead: financial planning, revenue optimization, risk management
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Planning:</strong><br/>
                        • <strong>Input:</strong> market research, competitive analysis, user needs, financial targets<br/>
                        • <strong>Do:</strong> define market position, create go-to-market strategy, establish revenue model<br/>
                        • <strong>Output:</strong> business strategy document, market analysis, revenue projections, risk assessment<br/>
                        • <strong>Done when:</strong> strategy approved, market position defined, revenue model established
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Execution:</strong><br/>
                        • <strong>Input:</strong> business strategy, market analysis, partnership opportunities, customer feedback<br/>
                        • <strong>Do:</strong> execute go-to-market, build partnerships, acquire customers, optimize revenue<br/>
                        • <strong>Output:</strong> market traction, customer acquisition, revenue growth, partnership success<br/>
                        • <strong>Done when:</strong> market position achieved, customers acquired, revenue targets met
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Delivery:</strong><br/>
                        • <strong>Input:</strong> market traction, customer base, revenue performance, competitive response<br/>
                        • <strong>Do:</strong> scale operations, expand market, optimize profitability, strategic pivots<br/>
                        • <strong>Output:</strong> market leadership, sustainable growth, competitive advantage, stakeholder value<br/>
                        • <strong>Done when:</strong> market leadership achieved, sustainable growth, competitive advantage
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Core Strategy Elements:</strong><br/>
                      • <strong>Market Analysis:</strong> $5.6B mental health tech market, 15.8% annual growth, privacy-focused gap<br/>
                      • <strong>Competitive Advantage:</strong> Nostalgic UX + privacy-first approach vs. premium modern competitors<br/>
                      • <strong>Target Market:</strong> Privacy-conscious individuals (25-45), mental health professionals, corporate wellness<br/>
                      • <strong>Revenue Model:</strong> Freemium → Enterprise → Healthcare partnerships progression
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Governance:</strong><br/>
                        • Monthly strategy reviews, quarterly market analysis, annual strategic planning<br/>
                        • Continuous competitive monitoring, customer feedback, financial performance tracking<br/>
                        • Required artifacts: Business strategy, Market analysis, Revenue projections, Risk assessment, Performance metrics
                      </div>
                    </div>
                    
                    <div style={{ border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div>
                        <strong>Success metrics:</strong><br/>
                        • Market share and competitive position<br/>
                        • Customer acquisition and retention rates<br/>
                        • Revenue growth and profitability<br/>
                        • Partnership success and market expansion
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'strategy' && (
                  <div>
                    <h3 style={{ margin: "0 0 6px 0", fontSize: "10px" }}>📊 Portfolio Strategy</h3>
                    
                    <div style={{ marginBottom: "6px" }}>
                      <strong>What:</strong> Strategic portfolio management across multiple product lines<br/>
                      <strong>Why:</strong> Drive business value and market coverage through diversified product portfolio<br/>
                      <strong>How:</strong> How portfolio decisions maximize market coverage and revenue diversification
                    </div>
                    
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Owners:</strong><br/>
                      • CEO/Founder: portfolio strategy, resource allocation, strategic direction<br/>
                      • Product Portfolio Manager: portfolio coordination, resource optimization, market coverage<br/>
                      • Business Development: market expansion, partnership strategy, revenue diversification<br/>
                      • Finance Lead: portfolio ROI, resource allocation, financial optimization
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Planning:</strong><br/>
                        • <strong>Input:</strong> market analysis, business strategy, resource constraints, competitive landscape<br/>
                        • <strong>Do:</strong> define portfolio composition, allocate resources, prioritize products, map market coverage<br/>
                        • <strong>Output:</strong> portfolio strategy document, resource allocation plan, market coverage map, product roadmap<br/>
                        • <strong>Done when:</strong> portfolio strategy approved, resources allocated, market coverage defined
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Execution:</strong><br/>
                        • <strong>Input:</strong> portfolio strategy, resource allocation, product roadmaps, market opportunities<br/>
                        • <strong>Do:</strong> execute product development, manage resources, coordinate products, expand market<br/>
                        • <strong>Output:</strong> product portfolio, market coverage, revenue streams, competitive position<br/>
                        • <strong>Done when:</strong> products delivered, market covered, revenue diversified
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Delivery:</strong><br/>
                        • <strong>Input:</strong> product portfolio, market coverage, revenue performance, competitive response<br/>
                        • <strong>Do:</strong> optimize portfolio, scale operations, expand market, strategic pivots<br/>
                        • <strong>Output:</strong> optimized portfolio, market leadership, sustainable growth, stakeholder value<br/>
                        • <strong>Done when:</strong> portfolio optimized, market leadership achieved, sustainable growth
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Core Portfolio Elements:</strong><br/>
                      • <strong>Portfolio Composition:</strong> Individual Mental Health Monitor, Healthcare Provider Platform, Corporate Wellness Platform, R&D initiatives<br/>
                      • <strong>Resource Allocation:</strong> 70% Mental Health Monitor (core), 20% Healthcare Platform (expansion), 10% R&D (innovation)<br/>
                      • <strong>Market Coverage:</strong> Individual consumers (B2C), Healthcare providers (B2B), Corporate clients (B2B), Research institutions (B2B)<br/>
                      • <strong>Portfolio Benefits:</strong> Diversified revenue streams, shared infrastructure, multiple market segments, scalable compliance
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Governance:</strong><br/>
                        • Monthly portfolio reviews, quarterly resource allocation, annual strategic planning<br/>
                        • Continuous market monitoring, competitive analysis, portfolio optimization<br/>
                        • Required artifacts: Portfolio strategy, Resource allocation plan, Market coverage map, Product roadmaps, Performance metrics
                      </div>
                    </div>
                    
                    <div style={{ border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div>
                        <strong>Success metrics:</strong><br/>
                        • Portfolio revenue diversification %<br/>
                        • Market coverage and penetration rates<br/>
                        • Resource allocation efficiency<br/>
                        • Product portfolio ROI and growth
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'program' && (
                  <div>
                    <h3 style={{ margin: "0 0 6px 0", fontSize: "10px" }}>📋 Program Management</h3>
                    
                    <div style={{ marginBottom: "6px" }}>
                      <strong>What:</strong> Tactical coordination across related projects within strategic domains<br/>
                      <strong>Why:</strong> Coordinate projects via shared infrastructure and unified roadmap to maximize impact and reduce duplication<br/>
                      <strong>How:</strong> How related projects work together to achieve shared objectives
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
                        <strong>Planning:</strong><br/>
                        • <strong>Input:</strong> portfolio strategy, project requirements, resource constraints, architectural standards<br/>
                        • <strong>Do:</strong> define program scope, resource allocation, timeline coordination<br/>
                        • <strong>Output:</strong> program roadmap, dependency register, shared architecture docs<br/>
                        • <strong>Done when:</strong> roadmap approved, dependencies mapped, architecture standards defined
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Execution:</strong><br/>
                        • <strong>Input:</strong> program roadmap, shared architecture docs, project deliverables<br/>
                        • <strong>Do:</strong> weekly program standup, dependency management, change control<br/>
                        • <strong>Output:</strong> coordinated project delivery, shared infrastructure, execution framework<br/>
                        • <strong>Done when:</strong> Projects coordinated, dependencies managed, shared infrastructure delivered
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Execution Framework:</strong> Sequential build order for safe delivery and technical execution with shared rules, policies, and governance across multiple projects<br/>
                      <br/>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "8px", fontFamily: "'MS Sans Serif', sans-serif" }}>
                        <thead>
                          <tr>
                            <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "7.5%" }}>Level</th>
                            <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "30%" }}>Architecture </th>
                            <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "30%" }}>Engineering </th>
                            <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "32.5%" }}>UX/Design </th>
                          </tr>
                          <tr>
                            <td style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", fontSize: "7px", fontStyle: "italic" }}>Defines technical foundation</td>
                            <td style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", fontSize: "7px", fontStyle: "italic" }}>Builds implementation</td>
                            <td style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", fontSize: "7px", fontStyle: "italic" }}>Creates user experience</td>
                            <td style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", fontSize: "7px", fontStyle: "italic" }}></td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 1</td>
                            <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Local development topology</td>
                            <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Repo, Dev DX & Local Stack</td>
                            <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Storybook, Tokens & A11y Baseline (design system foundations)</td>
                          </tr>
                          <tr>
                            <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 2</td>
                            <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Runtime topology, API deployment, auth choices</td>
                            <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>API, Data Model & Auth</td>
                            <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Screen Contracts, Wireframes & Interaction</td>
                          </tr>
                          <tr>
                            <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 3</td>
                            <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Secure enclaves, encryption, audit logs</td>
                            <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Security & Compliance</td>
                            <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Consent, Privacy & Compliance UX</td>
                          </tr>
                          <tr>
                            <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 4</td>
                            <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Backup architecture, monitoring integration</td>
                            <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Observability & Reliability</td>
                            <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Errors, States & Offline UX</td>
                          </tr>
                          <tr>
                            <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 5</td>
                            <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>CI/CD topology, staging environments</td>
                            <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Developer Productivity & Automation</td>
                            <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Design System & Handoff</td>
                          </tr>
                          <tr>
                            <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Level 6</td>
                            <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Functional/non-functional requirements</td>
                            <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>UX/Design Finish</td>
                            <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>UX & Vision</td>
                          </tr>
                          <tr>
                            <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Roof</td>
                            <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Cross-cutting rules & policies</td>
                            <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Vision & Go-to-Market</td>
                            <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>UX & Vision</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Delivery:</strong><br/>
                        • <strong>Input:</strong> coordinated project delivery, shared infrastructure, release artifacts<br/>
                        • <strong>Do:</strong> monthly exec summary, quarterly portfolio review, risk management, release planning, staging, production deployment, handoff to operations<br/>
                        • <strong>Output:</strong> integrated program outcomes, lessons learned, release artifacts<br/>
                        • <strong>Done when:</strong> program objectives achieved, portfolio priorities aligned, all projects successfully delivered
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Governance:</strong><br/>
                        • Weekly program standup, biweekly cross-program planning<br/>
                        • Monthly exec summary, quarterly portfolio review<br/>
                        • Required artifacts: Program roadmap, Dependency register, Shared architecture docs, Risk register, Release calendar
                      </div>
                    </div>
                    
                    <div style={{ border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div>
                        <strong>Success metrics:</strong><br/>
                        • Program milestone achievement %<br/>
                        • Cross-program dependency delivery rate<br/>
                        • Shared infrastructure utilization %
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
                    <h3 style={{ margin: "0 0 6px 0", fontSize: "10px" }}>⚙️ Developer Specs</h3>
                    
                    <div style={{ marginBottom: "6px" }}>
                      <strong>What:</strong> Technical specifications and development standards for implementation<br/>
                      <strong>Why:</strong> Ensure consistent, maintainable, and scalable code across the development team<br/>
                      <strong>How:</strong> How technical standards drive code quality and development efficiency
                    </div>
                    
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Owners:</strong><br/>
                      • Technical Lead: architecture decisions, code standards, technical debt management<br/>
                      • Senior Developer: implementation patterns, code reviews, mentoring<br/>
                      • DevOps Engineer: deployment standards, infrastructure, monitoring<br/>
                      • QA Engineer: testing standards, quality gates, automation
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Planning:</strong><br/>
                        • <strong>Input:</strong> technical requirements, architecture constraints, performance targets, security standards<br/>
                        • <strong>Do:</strong> define tech stack, establish coding standards, create development guidelines, set up tooling<br/>
                        • <strong>Output:</strong> technical specification document, coding standards, development environment, tooling setup<br/>
                        • <strong>Done when:</strong> tech stack approved, standards documented, development environment ready
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Execution:</strong><br/>
                        • <strong>Input:</strong> technical specs, coding standards, feature requirements, design mockups<br/>
                        • <strong>Do:</strong> code development, code reviews, testing, documentation, deployment<br/>
                        • <strong>Output:</strong> working code, test coverage, documentation, deployed features<br/>
                        • <strong>Done when:</strong> code meets standards, tests pass, features deployed
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Delivery:</strong><br/>
                        • <strong>Input:</strong> completed code, test results, performance metrics, user feedback<br/>
                        • <strong>Do:</strong> production deployment, monitoring setup, performance optimization, maintenance<br/>
                        • <strong>Output:</strong> production-ready system, monitoring dashboards, performance reports<br/>
                        • <strong>Done when:</strong> system stable, performance targets met, monitoring active
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Core Technical Specifications:</strong><br/>
                      • <strong>Tech Stack:</strong> React 19.1.1 with Vite, MS Sans Serif 8px typography, Windows 95 color palette<br/>
                      • <strong>Architecture:</strong> Component-based React architecture, Local storage for data persistence, No external dependencies<br/>
                      • <strong>Design System:</strong> Microsoft Windows 95 Guidelines compliance, Inset/outset border effects, 8px font size throughout<br/>
                      • <strong>Performance:</strong> Fast load times (&lt; 2 seconds), Offline-first functionality, Smooth interactions
                    </div>
                    
                    <div style={{ marginBottom: "8px", border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div style={{ marginBottom: "4px" }}>
                        <strong>Governance:</strong><br/>
                        • Daily code reviews, weekly technical debt reviews, monthly architecture reviews<br/>
                        • Quarterly tech stack updates, performance audits, security assessments<br/>
                        • Required artifacts: Technical specification, Code standards, Architecture documentation, Performance reports
                      </div>
                    </div>
                    
                    <div style={{ border: "1px solid #808080", padding: "6px", background: "#ffffff" }}>
                      <div>
                        <strong>Success metrics:</strong><br/>
                        • Code quality and maintainability score<br/>
                        • Test coverage percentage<br/>
                        • Performance benchmarks achievement<br/>
                        • Developer productivity and satisfaction
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
      {/* Desktop Icon */}
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
          Earth
        </span>
      </div>

      {/* Application Window */}
      {isWindowOpen && (
        <div style={{
          position: "absolute",
          top: "100px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 100
    }}>
      <div style={styles.mainWindow}>
            <Header onClose={closeWindow} />
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

    </div>
  );
}

export default App;


