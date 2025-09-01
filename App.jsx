import React, { useState } from 'react';
import Slider from './components/Slider';
import Divider from './components/Divider';
import CheckboxGroup from './components/CheckboxGroup';
import Timeline from './components/Timeline';
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import StatusBar from './components/StatusBar';
import AuthModal from './components/AuthModal';
import { useSliderDrag } from './hooks/useSliderDrag';
import { useAppState } from './utils/stateManager';
import { useAuth } from './hooks/useAuth';
import { INPUT_SLIDERS, EMOTION_SLIDERS } from './utils/constants';

function Default() {
  const { user, loading, signOut, isAuthenticated, isSupabaseConfigured } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('signin'); // 'signin' or 'signup'
  
  const {
    sliderValues,
    updateSlider,
    environmentCheckboxes,
    updateEnvironmentCheckbox,
    timelineEvents,
    addTimelineEvent,
    deleteTimelineEvent,
    activeView,
    setActiveView,
    outputValue
  } = useAppState();

  const handleSliderMouseDown = useSliderDrag();

  // Styles
  const styles = {
    mainWindow: {
      width: "700px",
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
      minHeight: "300px",
      width: "100%",
      flexShrink: 0,
      overflow: "hidden"
    }
  };



  // Checkbox configurations
  const environmentCheckboxConfig = [
    { name: 'noise', label: 'Noise', checked: environmentCheckboxes.noise, onChange: (checked) => updateEnvironmentCheckbox('noise', checked) },
    { name: 'lighting', label: 'Lighting', checked: environmentCheckboxes.lighting, onChange: (checked) => updateEnvironmentCheckbox('lighting', checked) },
    { name: 'temperature', label: 'Temperature', checked: environmentCheckboxes.temperature, onChange: (checked) => updateEnvironmentCheckbox('temperature', checked) },
    { name: 'crowding', label: 'Crowding', checked: environmentCheckboxes.crowding, onChange: (checked) => updateEnvironmentCheckbox('crowding', checked) },
    { name: 'airQuality', label: 'Air Quality', checked: environmentCheckboxes.airQuality, onChange: (checked) => updateEnvironmentCheckbox('airQuality', checked) },
    { name: 'cleanliness', label: 'Cleanliness', checked: environmentCheckboxes.cleanliness, onChange: (checked) => updateEnvironmentCheckbox('cleanliness', checked) }
  ];

  // Render slider row
  const renderSliderRow = (sliders, align = "center") => (
    <div style={{ 
      display: "flex", 
      gap: "2px", 
      justifyContent: align, 
      alignItems: "flex-start",
      width: "100%",
      maxWidth: "100%",
      position: "relative",
      minHeight: "220px",
      overflow: "hidden"
    }}>
      {sliders.map((slider, index) => (
        <React.Fragment key={slider.name}>
          <Slider
            value={sliderValues[slider.name]}
            onChange={(value) => updateSlider(slider.name, value)}
            onMouseDown={handleSliderMouseDown}
            label={slider.label}
          />
          {index < sliders.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </div>
  );

  // Render view content
  const renderViewContent = () => {
    switch (activeView) {
      case 'inputs':
        return (
          <div style={{ padding: "8px", width: "100%", height: "300px", display: "flex", alignItems: "flex-start", justifyContent: "flex-start", overflow: "hidden" }}>
            {renderSliderRow(INPUT_SLIDERS, "flex-start")}
          </div>
        );
      
      case 'emotions':
        return (
          <div style={{ padding: "8px", width: "100%", height: "300px", display: "flex", alignItems: "flex-start", justifyContent: "flex-start", overflow: "hidden" }}>
            {renderSliderRow(EMOTION_SLIDERS, "flex-start")}
          </div>
        );
      
      case 'environment':
        return (
          <div style={{ padding: "8px", width: "100%", height: "300px", display: "flex", alignItems: "flex-start", justifyContent: "flex-start", overflow: "hidden" }}>
            <CheckboxGroup checkboxes={environmentCheckboxConfig} columns={3} />
          </div>
        );
      
      case 'timeline':
        return (
          <div style={{ padding: "8px", width: "100%", height: "300px", display: "flex", alignItems: "flex-start", justifyContent: "flex-start", overflow: "hidden" }}>
            <Timeline 
              events={timelineEvents}
              onAddEvent={addTimelineEvent}
              onDeleteEvent={deleteTimelineEvent}
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  const handleAuthSuccess = (user) => {
    console.log('User authenticated:', user);
    setShowAuthModal(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Show loading screen while checking auth
  if (loading) {
    return (
      <div style={{
        width: "700px",
        height: "400px",
        background: "#d4d0c8",
        borderTop: "2px solid #ffffff",
        borderLeft: "2px solid #ffffff",
        borderBottom: "2px solid #808080",
        borderRight: "2px solid #808080",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'MS Sans Serif', Arial, sans-serif",
        fontSize: "12px"
      }}>
        Loading...
      </div>
    );
  }



  return (
    <div style={styles.mainWindow}>
      <Header />
      
      <Toolbar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        outputValue={outputValue}
      />
      
      {/* Separator between toolbar and content */}
      <div style={{ 
        height: "1px", 
        background: "#808080",
        margin: "0 4px"
      }} />

      {/* Main Content */}
      <div style={styles.mainContent}>
        {renderViewContent()}
      </div>

      <StatusBar 
        isAuthenticated={isAuthenticated} 
        user={user} 
        onSignIn={() => {
          setAuthMode('signin');
          setShowAuthModal(true);
        }}
        onSignUp={() => {
          setAuthMode('signup');
          setShowAuthModal(true);
        }}
        onSignOut={isSupabaseConfigured ? handleSignOut : null}
      />
      

      
                <AuthModal
            isOpen={showAuthModal}
            onClose={() => {
              console.log('Auth modal closing');
              setShowAuthModal(false);
            }}
            onAuthSuccess={handleAuthSuccess}
            initialMode={authMode}
          />
    </div>
  );
}

function App() {
  return (
    <div style={{ 
      background: "#008080", 
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "16px"
    }}>
      <Default />
    </div>
  );
}

export default App;
