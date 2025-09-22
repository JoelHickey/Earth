import React, { useState } from 'react';
import Header from './components/Header';
import MenuBar from './components/MenuBar';
import Toolbar from './components/Toolbar';
import Slider from './components/Slider';
import StatusBar from './components/StatusBar';
import Divider from './components/Divider';
import CheckboxGroup from './components/CheckboxGroup';
import Timeline from './components/Timeline';
import Taskbar from './components/Taskbar';
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
          <div style={{ padding: "8px", width: "100%", height: "400px", display: "flex", alignItems: "flex-start", justifyContent: "flex-start", overflow: "auto" }}>
            {renderSliderRow(INPUT_SLIDERS, "flex-start")}
          </div>
        );
      
      case 'emotions':
        return (
          <div style={{ padding: "8px", width: "100%", height: "400px", display: "flex", alignItems: "flex-start", justifyContent: "flex-start", overflow: "auto" }}>
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
          <div style={{ padding: "8px", width: "100%", height: "400px", display: "flex", alignItems: "flex-start", justifyContent: "flex-start", overflow: "auto" }}>
            <CheckboxGroup checkboxes={environmentCheckboxConfig} columns={3} />
          </div>
        );
      
      case 'timeline':
        return (
          <div style={{ padding: "8px", width: "100%", height: "400px", display: "flex", alignItems: "flex-start", justifyContent: "flex-start", overflow: "auto" }}>
            <Timeline 
              events={timelineEvents}
              onAddEvent={addTimelineEvent}
              onDeleteEvent={deleteTimelineEvent}
            />
          </div>
        );
      
      case 'about':
        return (
          <div style={{ padding: "8px", width: "100%", height: "400px", display: "flex", alignItems: "flex-start", justifyContent: "flex-start", overflow: "auto" }}>
            <div style={{ width: "100%", background: "#d4d0c8", border: "2px inset #c0c0c0", padding: "8px" }}>
              {/* Authentic Windows 95 Property Sheet Tabs */}
              <div style={{
                display: "flex",
                background: "#c0c0c0",
                borderBottom: "1px solid #808080",
                marginBottom: "8px"
              }}>
                <button
                  onClick={() => setActiveTab('mission')}
                  style={{
                    background: activeTab === 'mission' ? "#ffffff" : "#c0c0c0",
                    border: "1px outset #c0c0c0",
                    borderBottom: activeTab === 'mission' ? "1px solid #ffffff" : "1px solid #808080",
                    padding: "2px 6px",
                    fontSize: "8px",
                    fontFamily: "'MS Sans Serif', sans-serif",
                    cursor: "pointer",
                    marginRight: "1px"
                  }}
                >
                  Company Mission
                </button>
                <button
                  onClick={() => setActiveTab('business')}
                  style={{
                    background: activeTab === 'business' ? "#ffffff" : "#c0c0c0",
                    border: "1px outset #c0c0c0",
                    borderBottom: activeTab === 'business' ? "1px solid #ffffff" : "1px solid #808080",
                    padding: "2px 6px",
                    fontSize: "8px",
                    fontFamily: "'MS Sans Serif', sans-serif",
                    cursor: "pointer",
                    marginRight: "1px"
                  }}
                >
                  Business Strategy
                </button>
                <button
                  onClick={() => setActiveTab('strategy')}
                  style={{
                    background: activeTab === 'strategy' ? "#ffffff" : "#c0c0c0",
                    border: "1px outset #c0c0c0",
                    borderBottom: activeTab === 'strategy' ? "1px solid #ffffff" : "1px solid #808080",
                    padding: "2px 6px",
                    fontSize: "8px",
                    fontFamily: "'MS Sans Serif', sans-serif",
                    cursor: "pointer",
                    marginRight: "1px"
                  }}
                >
                  Portfolio Strategy
                </button>
                <button
                  onClick={() => setActiveTab('program')}
                  style={{
                    background: activeTab === 'program' ? "#ffffff" : "#c0c0c0",
                    border: "1px outset #c0c0c0",
                    borderBottom: activeTab === 'program' ? "1px solid #ffffff" : "1px solid #808080",
                    padding: "2px 6px",
                    fontSize: "8px",
                    fontFamily: "'MS Sans Serif', sans-serif",
                    cursor: "pointer",
                    marginRight: "1px"
                  }}
                >
                  Program Management
                </button>
                <button
                  onClick={() => setActiveTab('project')}
                  style={{
                    background: activeTab === 'project' ? "#ffffff" : "#c0c0c0",
                    border: "1px outset #c0c0c0",
                    borderBottom: activeTab === 'project' ? "1px solid #ffffff" : "1px solid #808080",
                    padding: "2px 6px",
                    fontSize: "8px",
                    fontFamily: "'MS Sans Serif', sans-serif",
                    cursor: "pointer",
                    marginRight: "1px"
                  }}
                >
                  Project Management
                </button>
                <button
                  onClick={() => setActiveTab('vision')}
                  style={{
                    background: activeTab === 'vision' ? "#ffffff" : "#c0c0c0",
                    border: "1px outset #c0c0c0",
                    borderBottom: activeTab === 'vision' ? "1px solid #ffffff" : "1px solid #808080",
                    padding: "2px 6px",
                    fontSize: "8px",
                    fontFamily: "'MS Sans Serif', sans-serif",
                    cursor: "pointer",
                    marginRight: "1px"
                  }}
                >
                  Product Vision
                </button>
                <button
                  onClick={() => setActiveTab('requirements')}
                  style={{
                    background: activeTab === 'requirements' ? "#ffffff" : "#c0c0c0",
                    border: "1px outset #c0c0c0",
                    borderBottom: activeTab === 'requirements' ? "1px solid #ffffff" : "1px solid #808080",
                    padding: "2px 6px",
                    fontSize: "8px",
                    fontFamily: "'MS Sans Serif', sans-serif",
                    cursor: "pointer",
                    marginRight: "1px"
                  }}
                >
                  Product Requirements
                </button>
                <button
                  onClick={() => setActiveTab('guidelines')}
                  style={{
                    background: activeTab === 'guidelines' ? "#ffffff" : "#c0c0c0",
                    border: "1px outset #c0c0c0",
                    borderBottom: activeTab === 'guidelines' ? "1px solid #ffffff" : "1px solid #808080",
                    padding: "2px 6px",
                    fontSize: "8px",
                    fontFamily: "'MS Sans Serif', sans-serif",
                    cursor: "pointer",
                    marginRight: "1px"
                  }}
                >
                  Interface Guidelines
                </button>
                <button
                  onClick={() => setActiveTab('developer')}
                  style={{
                    background: activeTab === 'developer' ? "#ffffff" : "#c0c0c0",
                    border: "1px outset #c0c0c0",
                    borderBottom: activeTab === 'developer' ? "1px solid #ffffff" : "1px solid #808080",
                    padding: "2px 6px",
                    fontSize: "8px",
                    fontFamily: "'MS Sans Serif', sans-serif",
                    cursor: "pointer"
                  }}
                >
                  Developer Specs
                </button>
              </div>

              {/* Content Area */}
              <div style={{ 
                background: "#ffffff", 
                border: "2px inset #c0c0c0", 
                padding: "8px",
                minHeight: "200px",
                fontSize: "8px", 
                fontFamily: "'MS Sans Serif', sans-serif",
                overflow: "auto"
              }}>
                {activeTab === 'mission' && (
                  <div>
                    <h3 style={{ margin: "0 0 6px 0", fontSize: "10px" }}>🏢 Company Mission</h3>
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Scope:</strong> Foundational purpose and organizational culture for mental health technology company<br/>
                      <strong>Focus:</strong> How we define our identity and guide decision-making with Windows 95 aesthetic + privacy-first approach<br/>
                      <strong>Goal:</strong> Establish clear mission, vision, and values that drive all business activities toward 1M users by 2030
                    </div>
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Owners:</strong><br/>
                      • CEO: mission statement, organizational vision<br/>
                      • Leadership Team: values definition, cultural alignment<br/>
                      • All Employees: values implementation, mission-driven decisions<br/>
                      • Board of Directors: mission oversight, strategic alignment
                    </div>
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Planning:</strong><br/>
                      • Input: stakeholder feedback, market analysis, organizational needs, cultural assessment<br/>
                      • Output: mission statement, vision statement, core values, cultural framework<br/>
                      • Do: stakeholder interviews, values workshops, mission alignment sessions, cultural assessment<br/>
                      • Done when: mission approved by board; values adopted by team; vision communicated company-wide<br/>
                      <br/>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "8px", fontFamily: "'MS Sans Serif', sans-serif" }}>
                        <thead>
                          <tr>
                            <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "8%" }}>Element</th>
                            <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "32%" }}>Definition</th>
                            <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "60%" }}>Statement</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Mission</td>
                            <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Why we exist (purpose)</td>
                            <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Democratize mental health awareness through accessible, private wellness tracking.</td>
                          </tr>
                          <tr>
                            <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Vision</td>
                            <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>What the world looks like when we succeed (aspiration)</td>
                            <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>A world where mental health tracking is as simple and private as using a calculator.</td>
                          </tr>
                          <tr>
                            <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Values</td>
                            <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>How we behave (principles)</td>
                            <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Privacy first (data stays local), Simplicity over complexity, Technology serves people</td>
                          </tr>
                          <tr>
                            <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>North Star</td>
                            <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>Where we're heading (destination)</td>
                            <td style={{ border: "1px solid #808080", padding: "2px", background: "#ffffff" }}>1 million people using our Windows 95-inspired mental health tools by 2030</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Execution:</strong><br/>
                      • Input: mission/vision/values statements, business strategy, market feedback<br/>
                      • Output: mission-driven decisions, values-based culture, aligned behaviors<br/>
                      • Do: strategic mission implementation, market positioning alignment, partnership mission reviews, product decision framework application<br/>
                      • Quality gates: mission alignment in major decisions; values consistency in hiring/promotions<br/>
                      • Change control: mission changes require board approval; values updates need company-wide input
                    </div>
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Delivery:</strong><br/>
                      • Input: mission-driven decisions, values-based culture, market feedback<br/>
                      • Output: strong organizational culture, mission-driven outcomes, values-based reputation<br/>
                      • Do: quarterly culture surveys, annual mission reviews, values recognition programs<br/>
                      • Done when: mission drives daily decisions; values are consistently demonstrated; culture supports business goals
                    </div>
                    <div>
                      <strong>Success Metrics:</strong><br/>
                      • Progress toward North Star (users served)<br/>
                      • Mission-driven product decisions percentage<br/>
                      • Values consistency in performance reviews
                    </div>
                  </div>
                )}
                {activeTab === 'business' && (
                  <div>
                    <h3 style={{ margin: "0 0 6px 0", fontSize: "10px" }}>💼 Business Strategy</h3>
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Scope:</strong> Strategic business decisions and market positioning in mental health tech<br/>
                      <strong>Focus:</strong> How to win with Windows 95 aesthetic + privacy-first approach in $5.6B market<br/>
                      <strong>Goal:</strong> Capture 1% market share (50K users) with $500K ARR by Year 3
                    </div>
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Owners:</strong><br/>
                      • CEO: overall strategy, market positioning, partnerships<br/>
                      • Head of Product: product strategy, Windows 95 UX consistency<br/>
                      • Head of Business Development: healthcare partnerships, revenue model<br/>
                      • Finance Director: financial projections, funding strategy
                    </div>
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Planning:</strong><br/>
                      • Input: market research, competitive analysis, organizational capabilities, financial resources<br/>
                      • Output: market analysis, competitive positioning, go-to-market strategy<br/>
                      • Do: market research (15.8% annual growth), competitive analysis (Headspace/Calm vs our nostalgic UX), target market definition (privacy-conscious 25-45), revenue model design (freemium + enterprise)<br/>
                      • Done when: strategy approved; unique positioning defined; go-to-market plan established
                    </div>
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Execution:</strong><br/>
                      • Input: business strategy, market analysis, partnership opportunities, resource allocation<br/>
                      • Output: market entry, partnerships, revenue generation<br/>
                      • Do: open source community building, healthcare provider partnerships, corporate wellness platform launch<br/>
                      • Quality gates: partnership agreements signed; revenue targets met<br/>
                      • Change control: strategic pivots require board approval
                    </div>
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Delivery:</strong><br/>
                      • Input: market entry results, partnership outcomes, revenue performance<br/>
                      • Output: market leadership, sustainable revenue, brand recognition<br/>
                      • Do: quarterly business reviews, market expansion, competitive response<br/>
                      • Done when: market position established; sustainable growth achieved; competitive advantage maintained
                    </div>
                    <div>
                      <strong>Success Metrics:</strong><br/>
                      • Year 1: 1K users (community building)<br/>
                      • Year 2: 10K users (healthcare partnerships)<br/>
                      • Year 3: 50K users, $500K ARR (corporate platform)
                    </div>
                  </div>
                )}
                {activeTab === 'strategy' && (
                  <div>
                    <h3 style={{ margin: "0 0 6px 0", fontSize: "10px" }}>📊 Portfolio Strategy</h3>
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Scope:</strong> Strategic portfolio management across mental health technology product lines<br/>
                      <strong>Focus:</strong> How portfolio decisions drive business value and market coverage with Windows 95 aesthetic + privacy-first approach<br/>
                      <strong>Goal:</strong> Maximize market coverage and revenue diversification through Individual → Family/Group → Healthcare Provider → Corporate Wellness progression
                    </div>
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Owners:</strong><br/>
                      • Portfolio Manager: strategic planning, resource allocation, market coverage<br/>
                      • Business Strategy Lead: market analysis, competitive positioning<br/>
                      • Product Strategy Lead: product roadmap, feature prioritization<br/>
                      • Finance Director: budget allocation, revenue planning
                    </div>
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Planning:</strong><br/>
                      • Input: business strategy, market analysis, resource constraints, competitive landscape<br/>
                      • Output: portfolio roadmap, resource allocation plan, market analysis<br/>
                      • Do: market research (15.8% growth), competitive analysis (vs Headspace/Calm), portfolio composition definition (Individual → Family/Group → Healthcare Provider → Corporate Wellness)<br/>
                      • Done when: portfolio strategy approved; resource allocation finalized
                    </div>
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Execution:</strong><br/>
                      • Input: portfolio roadmap, resource allocation, market feedback, development capacity<br/>
                      • Output: coordinated product development, shared infrastructure (tracking engine, privacy framework, Windows 95 design system)<br/>
                      • Do: quarterly portfolio reviews, resource reallocation, market expansion<br/>
                      • Quality gates: market validation, competitive positioning review<br/>
                      • Change control: portfolio changes require executive approval
                    </div>
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Delivery:</strong><br/>
                      • Input: coordinated product development, shared infrastructure, market launches<br/>
                      • Output: market penetration, revenue diversification, portfolio metrics<br/>
                      • Do: market launch coordination, revenue tracking, portfolio optimization<br/>
                      • Done when: portfolio objectives achieved; market coverage targets met
                    </div>
                    <div>
                      <strong>Success Metrics:</strong><br/>
                      • Progress toward 50K users by Year 3<br/>
                      • Portfolio revenue growth %<br/>
                      • Shared infrastructure utilization %
                    </div>
                  </div>
                )}
                {activeTab === 'program' && (
                  <div>
                    <h3 style={{ margin: "0 0 6px 0", fontSize: "10px" }}>📋 Program Management</h3>
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Scope:</strong> Tactical coordination across related projects within strategic domains<br/>
                      <strong>Focus:</strong> How related projects work together to achieve shared objectives<br/>
                      <strong>Goal:</strong> Coordinate projects via shared infrastructure and unified roadmap to maximize impact and reduce duplication
                    </div>
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Owners:</strong><br/>
                      • Program Manager: coordination, stakeholder comms, governance<br/>
                      • Product Lead: Mental Health Monitor Program<br/>
                      • Head of R&D: Research & Development Program<br/>
                      • Program Director/PMO: cross-program coordination, portfolio decisions
                    </div>
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Planning:</strong><br/>
                      • Input: portfolio strategy, project requirements, resource constraints, architectural standards<br/>
                      • Output: program roadmap, dependency register, shared architecture docs<br/>
                      • Do: define program scope, resource allocation, timeline coordination<br/>
                      • Done when: roadmap approved; dependencies mapped; architecture standards defined
                    </div>
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Execution:</strong><br/>
                      • Input: program roadmap, shared architecture docs, project deliverables, execution framework<br/>
                      • Output: coordinated project delivery, shared infrastructure<br/>
                      • Do: weekly program standup, dependency management, change control<br/>
                      • Quality gates: architecture review board approval for changes<br/>
                      • Change control: maintain dependency register; require sign-offs before milestone changes
                      <br/><br/>
                      <strong>Execution Framework:</strong><br/>
                      • Sequential build order designed for safe delivery and technical execution<br/>
                      • Program‑level artifact that guides project execution (so multiple projects share the same rules)<br/>
                      • Enforces consistent, cross‑project sequencing, shared policies, dependency rules, and governance<br/>
                      <br/>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "8px", fontFamily: "'MS Sans Serif', sans-serif" }}>
                        <thead>
                          <tr>
                            <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "10%" }}>Level</th>
                            <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "30%" }}>Architecture Track</th>
                            <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "30%" }}>Engineering Track</th>
                            <th style={{ border: "1px solid #808080", padding: "2px", background: "#c0c0c0", textAlign: "left", width: "30%" }}>UX/Design Track</th>
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
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Delivery:</strong><br/>
                      • Input: coordinated project delivery, shared infrastructure, release artifacts<br/>
                      • Output: integrated program outcomes, lessons learned, release artifacts<br/>
                      • Do: monthly exec summary, quarterly portfolio review, risk management, release planning, staging, production deployment, handoff to operations<br/>
                      • Done when: program objectives achieved; portfolio priorities aligned; all projects successfully delivered
                    </div>
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Governance:</strong><br/>
                      • Weekly program standup, biweekly cross-program planning<br/>
                      • Monthly exec summary, quarterly portfolio review<br/>
                      • Required artifacts: Program roadmap, Dependency register, Shared architecture docs, Risk register, Release calendar
                    </div>
                    <div>
                      <strong>Success Metrics:</strong><br/>
                      • Program milestone achievement %<br/>
                      • Cross-program dependency delivery rate<br/>
                      • Shared infrastructure utilization %
                    </div>
                  </div>
                )}
                {activeTab === 'project' && (
                  <div>
                    <h3 style={{ margin: "0 0 6px 0", fontSize: "10px" }}>📋 Project Management</h3>
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Scope:</strong> Planning, execution, delivery<br/>
                      <strong>Focus:</strong> How to build it and when<br/>
                      <strong>Goal:</strong> Deliver projects on time, on budget, within scope
                    </div>
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Owners:</strong><br/>
                      • Project Manager: schedule, scope, stakeholder comms<br/>
                      • Tech Lead: technical quality, code reviews, releases<br/>
                      • QA: test strategy & UAT<br/>
                      • Product Owner: acceptance/sign-off
                    </div>
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Planning:</strong><br/>
                      • Input: program requirements, resource constraints, technical specifications, stakeholder needs<br/>
                      • Output: one-page PRD + milestones, named resources, budget<br/>
                      • Do: define scope, acceptance criteria, timeline, risk register<br/>
                      • Done when: PRD signed; milestones & budget approved
                    </div>
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Execution:</strong><br/>
                      • Input: PRD, milestones, named resources, execution framework<br/>
                      • Output: working increments, weekly status<br/>
                      • Do: daily standups, sprint planning, track blockers, stakeholder updates<br/>
                      • Quality gates: PRs require tests + CI green + 1-2 reviewers<br/>
                      • Change control: log change requests; approve before scope change
                    </div>
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Delivery:</strong><br/>
                      • Input: working increments, weekly status, UAT results<br/>
                      • Output: release artifacts, runbooks, handoff<br/>
                      • Do: UAT, release checklist (CI green, backups, rollback plan), docs, lessons learned<br/>
                      • Done when: PO + Ops sign off; runbook handed to support
                    </div>
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Risk & Incidents:</strong><br/>
                      • Maintain risk register (owner, mitigation); review weekly<br/>
                      • Incident flow: page → triage → fix → postmortem within 72h
                    </div>
                    <div>
                      <strong>Success Metrics:</strong><br/>
                      • On-time milestones %<br/>
                      • Budget variance<br/>
                      • Escaped defects or MTTR
                    </div>
                  </div>
                )}
                {activeTab === 'vision' && (
                  <div>
                    <h3 style={{ margin: "0 0 6px 0", fontSize: "10px" }}>🎯 Product Vision & Strategy</h3>
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Mission:</strong><br/>
                      Empower individuals to take control of their mental health through intuitive, 
                      nostalgic technology that makes wellness tracking accessible and engaging.
                    </div>
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Vision:</strong><br/>
                      A mental health monitoring platform that combines the simplicity and 
                      reliability of Windows 95 with modern wellness science, creating a 
                      trusted companion for daily mental health management.
                    </div>
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Core Values:</strong><br/>
                      • Simplicity: Easy-to-use interface that doesn't overwhelm<br/>
                      • Reliability: Consistent, predictable functionality<br/>
                      • Privacy: User data stays local and secure<br/>
                      • Accessibility: Works for users of all technical levels<br/>
                      • Nostalgia: Familiar, comforting design language
                    </div>
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Target Users:</strong><br/>
                      • Mental health enthusiasts seeking better self-awareness<br/>
                      • Individuals managing anxiety, depression, or stress<br/>
                      • People who prefer simple, distraction-free tools<br/>
                      • Users who value privacy and data ownership
                    </div>
                    <div>
                      <strong>Success Metrics:</strong><br/>
                      • Daily active usage and engagement<br/>
                      • User retention and satisfaction scores<br/>
                      • Privacy compliance and data security<br/>
                      • Accessibility and usability ratings
                    </div>
                  </div>
                )}
                {activeTab === 'requirements' && (
                  <div>
                    <h3 style={{ margin: "0 0 6px 0", fontSize: "10px" }}>📝 Product Requirements</h3>
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Core Features:</strong><br/>
                      • Sleep, emotion, and environment tracking<br/>
                      • Timeline events and local storage<br/>
                      • Windows 95 authentic design
                    </div>
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Technical Requirements:</strong><br/>
                      • React 19+ with Vite build system<br/>
                      • Local storage for data persistence<br/>
                      • No external API dependencies
                    </div>
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Design Requirements:</strong><br/>
                      • 100% Windows 95 Guidelines compliance<br/>
                      • MS Sans Serif, 8px typography<br/>
                      • Authentic color palette and borders
                    </div>
                    <div>
                      <strong>Performance Requirements:</strong><br/>
                      • Fast load times (&lt; 2 seconds)<br/>
                      • Offline-first functionality<br/>
                      • Smooth slider interactions
                    </div>
                  </div>
                )}
                {activeTab === 'guidelines' && (
                  <div>
                    <h3 style={{ margin: "0 0 6px 0", fontSize: "10px" }}>🎨 Interface Guidelines</h3>
                    <div style={{ marginBottom: "6px" }}>
                      <strong>User-Centered Design Principles:</strong><br/>
                      • Control<br/>
                      • Directness<br/>
                      • Consistency<br/>
                      • Forgiveness<br/>
                      • Feedback<br/>
                      • Aesthetics<br/>
                      • Simplicity
                    </div>
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Interface Elements:</strong><br/>
                      • Title Bar, Menu Bar, Toolbar, Status Bar<br/>
                      • Buttons, Checkboxes, Radio Buttons<br/>
                      • Text Fields, Sliders, Progress Bars<br/>
                      • Windows, Dialog Boxes, List Boxes, Tabs
                    </div>
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Color Palette:</strong><br/>
                      • Background: #d4d0c8<br/>
                      • Light Grey: #c0c0c0<br/>
                      • Dark Grey: #808080<br/>
                      • White: #ffffff<br/>
                      • Black: #000000<br/>
                      • Windows Blue: #000080
                    </div>
                    <div>
                      <strong>Typography:</strong><br/>
                      • Body Text: MS Sans Serif, 8px<br/>
                      • Headings: MS Sans Serif, 10px<br/>
                      • Title Bar: MS Sans Serif, 8px<br/>
                      • Buttons: MS Sans Serif, 8px
                    </div>
                  </div>
                )}
                {activeTab === 'developer' && (
                  <div>
                    <h3 style={{ margin: "0 0 6px 0", fontSize: "10px" }}>⚙️ Developer Information</h3>
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Tech Stack:</strong><br/>
                      • React 19.1.1 with Vite<br/>
                      • MS Sans Serif, 8px typography<br/>
                      • Authentic Windows 95 colors (#d4d0c8, #c0c0c0, #808080)
                    </div>
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Architecture:</strong><br/>
                      • Component-based React architecture<br/>
                      • Local storage for data persistence<br/>
                      • No external dependencies for core functionality
                    </div>
                    <div style={{ marginBottom: "6px" }}>
                      <strong>Design System:</strong><br/>
                      • Microsoft Windows 95 Guidelines compliance<br/>
                      • Inset/outset border effects<br/>
                      • 8px font size throughout
                    </div>
                    <div>
                      <strong>Version:</strong> 1.0.0<br/>
                      <strong>Build:</strong> Vite development server<br/>
                      <strong>Browser Support:</strong> Modern browsers with CSS3 support
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
            <MenuBar 
              activeView={activeView}
              setActiveView={setActiveView}
              saveSliderPositions={saveSliderPositions}
              recallSliderPositions={recallSliderPositions}
              hasSavedPositions={hasSavedPositions()}
              undoSliderChange={undoSliderChange}
              hasUndoAvailable={previousSliderValues !== null}
              resetAllSliders={() => setSliderValues({
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
              })}
            />
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

      {/* Taskbar */}
      <Taskbar onOpenWindow={openWindow} />
    </div>
  );
}

export default App;
