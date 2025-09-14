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
  const [cortisolLevel] = useState(3); // Default cortisol level
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
  
  // Design system state
  const [activeTab, setActiveTab] = useState('design');
  const [activeSubTab, setActiveSubTab] = useState('foundation');

  const handleSliderChange = (name, value) => {
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
      
      case 'design':
        return (
          <div style={{ padding: "8px", width: "100%", height: "300px", display: "flex", alignItems: "flex-start", justifyContent: "flex-start", overflow: "auto" }}>
            <div style={{ width: "100%", background: "#d4d0c8", border: "2px inset #c0c0c0", padding: "8px" }}>
              {/* Windows 95 Style Tabs */}
              <div style={{
                display: "flex",
                background: "#c0c0c0",
                borderBottom: "1px solid #808080",
                marginBottom: "8px"
              }}>
                <button
                  onClick={() => setActiveTab('mission')}
                  style={{
                    background: activeTab === 'mission' ? "#d4d0c8" : "#c0c0c0",
                    border: "1px outset #c0c0c0",
                    borderBottom: activeTab === 'mission' ? "1px solid #d4d0c8" : "1px solid #808080",
                    padding: "4px 12px",
                    fontSize: "8px",
                    fontFamily: "'MS Sans Serif', sans-serif",
                    cursor: "pointer",
                    marginRight: "2px"
                  }}
                >
                  Company Mission & Purpose
                </button>
                <button
                  onClick={() => setActiveTab('business')}
                  style={{
                    background: activeTab === 'business' ? "#d4d0c8" : "#c0c0c0",
                    border: "1px outset #c0c0c0",
                    borderBottom: activeTab === 'business' ? "1px solid #d4d0c8" : "1px solid #808080",
                    padding: "4px 12px",
                    fontSize: "8px",
                    fontFamily: "'MS Sans Serif', sans-serif",
                    cursor: "pointer",
                    marginRight: "2px"
                  }}
                >
                  Business Strategy
                </button>
                <button
                  onClick={() => setActiveTab('portfolio')}
                  style={{
                    background: activeTab === 'portfolio' ? "#d4d0c8" : "#c0c0c0",
                    border: "1px outset #c0c0c0",
                    borderBottom: activeTab === 'portfolio' ? "1px solid #d4d0c8" : "1px solid #808080",
                    padding: "4px 12px",
                    fontSize: "8px",
                    fontFamily: "'MS Sans Serif', sans-serif",
                    cursor: "pointer",
                    marginRight: "2px"
                  }}
                >
                  Program Strategy
                </button>
                <button
                  onClick={() => setActiveTab('vision')}
                  style={{
                    background: activeTab === 'vision' ? "#d4d0c8" : "#c0c0c0",
                    border: "1px outset #c0c0c0",
                    borderBottom: activeTab === 'vision' ? "1px solid #d4d0c8" : "1px solid #808080",
                    padding: "4px 12px",
                    fontSize: "8px",
                    fontFamily: "'MS Sans Serif', sans-serif",
                    cursor: "pointer",
                    marginRight: "2px"
                  }}
                >
                  Product Vision
                </button>
                <button
                  onClick={() => setActiveTab('requirements')}
                  style={{
                    background: activeTab === 'requirements' ? "#d4d0c8" : "#c0c0c0",
                    border: "1px outset #c0c0c0",
                    borderBottom: activeTab === 'requirements' ? "1px solid #d4d0c8" : "1px solid #808080",
                    padding: "4px 12px",
                    fontSize: "8px",
                    fontFamily: "'MS Sans Serif', sans-serif",
                    cursor: "pointer",
                    marginRight: "2px"
                  }}
                >
                  Product Requirements
                </button>
                <button
                  onClick={() => setActiveTab('design')}
                  style={{
                    background: activeTab === 'design' ? "#d4d0c8" : "#c0c0c0",
                    border: "1px outset #c0c0c0",
                    borderBottom: activeTab === 'design' ? "1px solid #d4d0c8" : "1px solid #808080",
                    padding: "4px 12px",
                    fontSize: "8px",
                    fontFamily: "'MS Sans Serif', sans-serif",
                    cursor: "pointer",
                    marginRight: "2px"
                  }}
                >
                  Design Guide
                </button>
                <button
                  onClick={() => setActiveTab('dev')}
                  style={{
                    background: activeTab === 'dev' ? "#d4d0c8" : "#c0c0c0",
                    border: "1px outset #c0c0c0",
                    borderBottom: activeTab === 'dev' ? "1px solid #d4d0c8" : "1px solid #808080",
                    padding: "4px 12px",
                    fontSize: "8px",
                    fontFamily: "'MS Sans Serif', sans-serif",
                    cursor: "pointer"
                  }}
                >
                  Developer Specs
                </button>
              </div>

              {/* Design System Content */}
              {activeTab === 'portfolio' && (
                <div style={{ fontSize: "8px", fontFamily: "'MS Sans Serif', sans-serif" }}>
                  <h3 style={{ margin: "0 0 8px 0", fontSize: "10px" }}>📋 Program Strategy</h3>
                  
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Resource Allocation Strategy:</strong><br/>
                    • 70% Mental Health Monitor (core product)<br/>
                    • 20% Enterprise Wellness Platform (expansion)<br/>
                    • 10% Research & Development (innovation)
                  </div>
                  
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Product Portfolio Priorities:</strong><br/>
                    • Phase 1: Individual mental health tracking (current)<br/>
                    • Phase 2: Family/group wellness monitoring<br/>
                    • Phase 3: Healthcare provider integration<br/>
                    • Phase 4: Corporate wellness solutions
                  </div>
                  
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Cross-Product Dependencies:</strong><br/>
                    • Core tracking engine shared across all products<br/>
                    • Privacy framework extends to enterprise features<br/>
                    • Windows 95 design system maintains consistency<br/>
                    • Data export/import standards for interoperability
                  </div>
                  
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Program Timeline:</strong><br/>
                    • Q1-Q2: Core product stabilization and user feedback<br/>
                    • Q3-Q4: Enterprise features and API development<br/>
                    • Year 2: Healthcare provider partnerships<br/>
                    • Year 3: Corporate wellness platform launch
                  </div>
                  
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Success Criteria:</strong><br/>
                    • Individual product: 10K+ active users<br/>
                    • Enterprise product: 50+ organizations<br/>
                    • Healthcare integration: 5+ provider partnerships<br/>
                    • Revenue diversification: 40% enterprise, 60% individual
                  </div>
                  
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Risk Management:</strong><br/>
                    • Diversified product portfolio reduces single-point failure<br/>
                    • Shared infrastructure reduces development costs<br/>
                    • Multiple revenue streams provide stability<br/>
                    • Regulatory compliance framework scales across products
                  </div>
                </div>
              )}

              {activeTab === 'requirements' && (
                <div style={{ fontSize: "8px", fontFamily: "'MS Sans Serif', sans-serif" }}>
                  <h3 style={{ margin: "0 0 8px 0", fontSize: "10px" }}>📋 Product Requirements</h3>
                  
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Core Functional Requirements:</strong><br/>
                    • Sleep quality and duration tracking with visual sliders<br/>
                    • Medication and supplement monitoring (Zoloft, vitamins, etc.)<br/>
                    • Emotional state assessment (happiness, anxiety, stress, etc.)<br/>
                    • Environmental factor tracking (noise, lighting, temperature)<br/>
                    • Timeline-based event logging and history<br/>
                    • Local data storage with privacy-first approach
                  </div>
                  
                  <div style={{ marginBottom: "8px" }}>
                    <strong>User Experience Requirements:</strong><br/>
                    • Windows 95 aesthetic with authentic visual design<br/>
                    • Intuitive slider-based input system<br/>
                    • Offline-first functionality (no internet required)<br/>
                    • Responsive design for desktop and mobile<br/>
                    • Accessibility compliance (keyboard navigation, screen readers)<br/>
                    • Consistent 8px font sizing throughout interface
                  </div>
                  
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Technical Requirements:</strong><br/>
                    • React.js frontend with Vite build system<br/>
                    • Local storage for data persistence<br/>
                    • Cross-browser compatibility (Chrome, Firefox, Safari)<br/>
                    • Performance: &lt; 2 second load time<br/>
                    • Data export/import functionality<br/>
                    • No external API dependencies for core features
                  </div>
                  
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Security & Privacy Requirements:</strong><br/>
                    • All data stored locally on user's device<br/>
                    • No data transmission to external servers<br/>
                    • User controls data export and deletion<br/>
                    • No tracking or analytics collection<br/>
                    • GDPR and HIPAA compliance considerations<br/>
                    • Secure data encryption at rest
                  </div>
                  
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Performance Requirements:</strong><br/>
                    • App loads in &lt; 2 seconds on standard hardware<br/>
                    • Smooth slider interactions with &lt; 100ms response time<br/>
                    • Support for 1000+ timeline events without degradation<br/>
                    • Memory usage &lt; 50MB for typical usage<br/>
                    • Works offline with full functionality<br/>
                    • Graceful degradation on older browsers
                  </div>
                  
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Quality Requirements:</strong><br/>
                    • Zero data loss during normal operation<br/>
                    • Consistent Windows 95 visual styling<br/>
                    • Cross-platform compatibility<br/>
                    • Error handling with user-friendly messages<br/>
                    • Regular automated testing coverage<br/>
                    • Documentation for all user-facing features
                  </div>
                </div>
              )}

              {activeTab === 'design' && (
                <div style={{ fontSize: "8px", fontFamily: "'MS Sans Serif', sans-serif" }}>
                  <h3 style={{ margin: "0 0 8px 0", fontSize: "10px" }}>🎨 Windows 95 Design System</h3>
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Colors:</strong><br/>
                    • Background: #d4d0c8<br/>
                    • Light Grey: #c0c0c0<br/>
                    • Dark Grey: #808080<br/>
                    • White: #ffffff<br/>
                    • Black: #000000
                  </div>
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Typography:</strong><br/>
                    • Font: MS Sans Serif<br/>
                    • Sizes: 8px, 9px, 10px, 11px, 12px
                  </div>
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Components:</strong><br/>
                    • Buttons: 2px outset/inset borders<br/>
                    • Windows: 2px outset borders<br/>
                    • Title bars: 19px height<br/>
                    • Status bars: 22px height
                  </div>
                </div>
              )}

              {activeTab === 'mission' && (
                <div style={{ fontSize: "8px", fontFamily: "'MS Sans Serif', sans-serif" }}>
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Why We Exist:</strong><br/>
                    Current mental health apps prioritize data collection over user benefit, 
                    use addictive design patterns, and often fail to respect user privacy. 
                    We believe there's a better way: technology that genuinely helps people 
                    understand themselves while keeping their data secure and local.
                  </div>
                  
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Company Mission:</strong><br/>
                    To democratize mental health awareness by creating technology that 
                    makes wellness tracking accessible, private, and genuinely helpful 
                    for everyone, regardless of their technical expertise or financial means.
                  </div>
                  
                  <div style={{ marginBottom: "8px" }}>
                    <strong>North Star:</strong><br/>
                    A world where mental health awareness is as common as physical fitness 
                    tracking, where people have the tools and knowledge to maintain their 
                    wellbeing proactively, and where technology serves as a genuine ally 
                    in mental health rather than a source of anxiety or exploitation.
                  </div>
                  
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Organizational Purpose:</strong><br/>
                    We exist to bridge the gap between modern mental health science 
                    and everyday people who need simple, reliable tools to understand 
                    and improve their wellbeing without compromising their privacy.
                  </div>
                  
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Long-Term Ambition:</strong><br/>
                    To become the most trusted name in private mental health technology, 
                    empowering millions of people worldwide to take control of their 
                    mental wellness through intuitive, secure, and scientifically-backed tools.
                  </div>
                  
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Core Beliefs:</strong><br/>
                    • Mental health is a fundamental human right<br/>
                    • Privacy should never be compromised for convenience<br/>
                    • Technology should serve people, not exploit them<br/>
                    • Simple solutions are often the most powerful<br/>
                    • Everyone deserves access to quality mental health tools
                  </div>
                  
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Why We Exist:</strong><br/>
                    Current mental health apps prioritize data collection over user benefit, 
                    use addictive design patterns, and often fail to respect user privacy. 
                    We believe there's a better way: technology that genuinely helps people 
                    understand themselves while keeping their data secure and local.
                  </div>
                  
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Impact Vision:</strong><br/>
                    In 10 years, we envision a world where mental health awareness is 
                    as common as physical fitness tracking, where people have the tools 
                    and knowledge to maintain their wellbeing proactively, and where 
                    technology serves as a genuine ally in mental health rather than 
                    a source of anxiety or exploitation.
                  </div>
                </div>
              )}

              {activeTab === 'business' && (
                <div style={{ fontSize: "8px", fontFamily: "'MS Sans Serif', sans-serif" }}>
                  <h3 style={{ margin: "0 0 8px 0", fontSize: "10px" }}>🏢 Corporate / Business Strategy</h3>
                  
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Multi-Year Business Goals:</strong><br/>
                    • Establish market presence in mental health tech (Year 1-2)<br/>
                    • Achieve sustainable revenue through premium features (Year 2-3)<br/>
                    • Expand to enterprise wellness programs (Year 3-4)<br/>
                    • Build strategic partnerships with healthcare providers (Year 4-5)
                  </div>
                  
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Market Strategy:</strong><br/>
                    • Target underserved niche: privacy-focused mental health tools<br/>
                    • Differentiate through nostalgic UX and offline-first approach<br/>
                    • Focus on organic growth and word-of-mouth marketing<br/>
                    • Position as premium alternative to data-hungry wellness apps
                  </div>
                  
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Revenue Model:</strong><br/>
                    • Freemium: Basic tracking free, advanced analytics paid<br/>
                    • Enterprise: Team wellness dashboards and reporting<br/>
                    • Partnerships: White-label solutions for healthcare providers<br/>
                    • Data insights: Anonymized aggregate trends (with consent)
                  </div>
                  
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Growth Targets:</strong><br/>
                    • Year 1: 1,000 active users, $0 revenue (validation)<br/>
                    • Year 2: 10,000 users, $50K ARR (monetization)<br/>
                    • Year 3: 50,000 users, $500K ARR (scale)<br/>
                    • Year 4: 200,000 users, $2M ARR (expansion)
                  </div>
                  
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Risk Tolerance:</strong><br/>
                    • Conservative approach to user data and privacy<br/>
                    • Moderate risk on feature development<br/>
                    • High risk tolerance for innovative UX approaches<br/>
                    • Low risk tolerance for regulatory compliance
                  </div>
                  
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Resource Allocation:</strong><br/>
                    • 60% Product development and user experience<br/>
                    • 20% Marketing and user acquisition<br/>
                    • 15% Infrastructure and security<br/>
                    • 5% Legal and compliance
                  </div>
                </div>
              )}

              {activeTab === 'vision' && (
                <div style={{ fontSize: "8px", fontFamily: "'MS Sans Serif', sans-serif" }}>
                  <h3 style={{ margin: "0 0 8px 0", fontSize: "10px" }}>🎯 Product Vision & Strategy</h3>
                  
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Mission:</strong><br/>
                    Empower individuals to take control of their mental health through intuitive, 
                    nostalgic technology that makes wellness tracking accessible and engaging.
                  </div>
                  
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Vision:</strong><br/>
                    A mental health monitoring platform that combines the simplicity and 
                    reliability of Windows 95 with modern wellness science, creating a 
                    trusted companion for daily mental health management.
                  </div>
                  
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Core Values:</strong><br/>
                    • Simplicity: Easy-to-use interface that doesn't overwhelm<br/>
                    • Reliability: Consistent, predictable functionality<br/>
                    • Privacy: User data stays local and secure<br/>
                    • Accessibility: Works for users of all technical levels<br/>
                    • Nostalgia: Familiar, comforting design language
                  </div>
                  
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Target Users:</strong><br/>
                    • Mental health enthusiasts seeking better self-awareness<br/>
                    • Individuals managing anxiety, depression, or stress<br/>
                    • People who prefer simple, distraction-free tools<br/>
                    • Users who value privacy and local data storage<br/>
                    • Anyone who appreciates retro computing aesthetics
                  </div>
                  
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Key Features:</strong><br/>
                    • Sleep quality and duration tracking<br/>
                    • Medication and supplement monitoring<br/>
                    • Emotional state assessment<br/>
                    • Environmental factor awareness<br/>
                    • Timeline-based event logging<br/>
                    • Offline-first data storage
                  </div>
                  
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Success Metrics:</strong><br/>
                    • Daily active usage<br/>
                    • Data consistency and completeness<br/>
                    • User-reported mental health improvements<br/>
                    • Feature adoption rates<br/>
                    • User retention and engagement
                  </div>
                </div>
              )}

              {activeTab === 'dev' && (
                <div style={{ fontSize: "8px", fontFamily: "'MS Sans Serif', sans-serif" }}>
                  <h3 style={{ margin: "0 0 8px 0", fontSize: "10px" }}>⚙️ Developer Specifications</h3>
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Window Structure:</strong><br/>
                    • Main Window: 1000px × 300px<br/>
                    • Header: 19px height<br/>
                    • Toolbar: Auto height<br/>
                    • Content: 300px height<br/>
                    • Status Bar: 22px height
                  </div>
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Components:</strong><br/>
                    • Sliders: 55px width, 150px height<br/>
                    • Buttons: 32px × 28px<br/>
                    • Inputs: 40px width, 16px height
                  </div>
                  <div style={{ marginBottom: "8px" }}>
                    <strong>Layout:</strong><br/>
                    • Flexbox with Windows 95 styling<br/>
                    • Consistent 2px gaps<br/>
                    • Overflow: auto for scrolling
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  // Styles matching original
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
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "16px"
    }}>
      <div style={styles.mainWindow}>
        <Header />
        <Toolbar 
          activeView={activeView}
          setActiveView={setActiveView}
          outputValue={outputValue}
          bloodSugar={bloodSugar}
          getBloodSugarStatus={getBloodSugarStatus}
          saveSliderPositions={saveSliderPositions}
          recallSliderPositions={recallSliderPositions}
          hasSavedPositions={hasSavedPositions()}
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
  );
}

export default App;