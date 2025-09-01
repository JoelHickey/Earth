import React from 'react';

const BodyWireframe = ({ selectedArea, onAreaClick, isAuthenticated, user, onSignIn, onSignUp, onSignOut }) => {
  const styles = {
    container: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '8px',
      background: '#d4d0c8',
      fontFamily: "'MS Sans Serif', Arial, sans-serif"
    },
    title: {
      fontSize: '10px',
      fontWeight: 'bold',
      marginBottom: '8px',
      color: '#000000'
    },
    bodyContainer: {
      position: 'relative',
      width: '120px',
      height: '200px',
      border: '1px solid #808080',
      background: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    bodyOutline: {
      position: 'relative',
      width: '80px',
      height: '160px'
    },
    head: {
      position: 'absolute',
      top: '0',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '30px',
      height: '30px',
      border: '2px solid #000000',
      borderRadius: '50%',
      cursor: 'pointer',
      background: selectedArea === 'head' ? '#c0c0c0' : 'transparent'
    },
    torso: {
      position: 'absolute',
      top: '30px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '40px',
      height: '60px',
      border: '2px solid #000000',
      cursor: 'pointer',
      background: selectedArea === 'torso' ? '#c0c0c0' : 'transparent'
    },
    leftArm: {
      position: 'absolute',
      top: '35px',
      left: '10px',
      width: '15px',
      height: '40px',
      border: '2px solid #000000',
      cursor: 'pointer',
      background: selectedArea === 'leftArm' ? '#c0c0c0' : 'transparent'
    },
    rightArm: {
      position: 'absolute',
      top: '35px',
      right: '10px',
      width: '15px',
      height: '40px',
      border: '2px solid #000000',
      cursor: 'pointer',
      background: selectedArea === 'rightArm' ? '#c0c0c0' : 'transparent'
    },
    leftLeg: {
      position: 'absolute',
      bottom: '0',
      left: '15px',
      width: '15px',
      height: '50px',
      border: '2px solid #000000',
      cursor: 'pointer',
      background: selectedArea === 'leftLeg' ? '#c0c0c0' : 'transparent'
    },
    rightLeg: {
      position: 'absolute',
      bottom: '0',
      right: '15px',
      width: '15px',
      height: '50px',
      border: '2px solid #000000',
      cursor: 'pointer',
      background: selectedArea === 'rightLeg' ? '#c0c0c0' : 'transparent'
    },
    areaLabel: {
      position: 'absolute',
      fontSize: '8px',
      fontWeight: 'bold',
      color: '#000000',
      textAlign: 'center',
      width: '100%'
    },
    infoPanel: {
      marginTop: '8px',
      padding: '4px',
      border: '1px solid #808080',
      background: '#ffffff',
      fontSize: '8px',
      minHeight: '40px',
      width: '100%'
    },
    authSection: {
      marginBottom: '8px',
      padding: '4px',
      border: '1px solid #808080',
      background: '#ffffff',
      fontSize: '8px'
    },
    authTitle: {
      fontSize: '9px',
      fontWeight: 'bold',
      marginBottom: '4px',
      color: '#000000'
    },
    authInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px'
    },
    userEmail: {
      fontSize: '8px',
      color: '#000000',
      wordBreak: 'break-all'
    },
    authButtons: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2px'
    },
    authButton: {
      height: '18px',
      background: '#d4d0c8',
      borderTop: '2px solid #ffffff',
      borderLeft: '2px solid #ffffff',
      borderBottom: '2px solid #808080',
      borderRight: '2px solid #808080',
      fontSize: '8px',
      fontFamily: "'MS Sans Serif', Arial, sans-serif",
      cursor: 'pointer',
      padding: '0 4px',
      fontWeight: 'bold'
    },
    separator: {
      height: '1px',
      background: '#808080',
      margin: '8px 0'
    }
  };

  const bodyAreas = [
    { id: 'head', label: 'Head', description: 'Mental clarity, focus, headaches' },
    { id: 'torso', label: 'Torso', description: 'Breathing, heart rate, digestion' },
    { id: 'leftArm', label: 'Left Arm', description: 'Tension, pain, circulation' },
    { id: 'rightArm', label: 'Right Arm', description: 'Tension, pain, circulation' },
    { id: 'leftLeg', label: 'Left Leg', description: 'Energy, pain, circulation' },
    { id: 'rightLeg', label: 'Right Leg', description: 'Energy, pain, circulation' }
  ];

  const selectedAreaInfo = bodyAreas.find(area => area.id === selectedArea);

  const handleButtonMouseDown = (e) => {
    e.target.style.borderTop = "2px solid #808080";
    e.target.style.borderLeft = "2px solid #808080";
    e.target.style.borderBottom = "2px solid #ffffff";
    e.target.style.borderRight = "2px solid #ffffff";
  };

  const handleButtonMouseUp = (e) => {
    e.target.style.borderTop = "2px solid #ffffff";
    e.target.style.borderLeft = "2px solid #ffffff";
    e.target.style.borderBottom = "2px solid #808080";
    e.target.style.borderRight = "2px solid #808080";
  };

  return (
    <div style={styles.container}>
      {/* Authentication Section */}
      <div style={styles.authSection}>
        <div style={styles.authTitle}>User Account</div>
        {isAuthenticated ? (
          <div style={styles.authInfo}>
            <div style={styles.userEmail}>{user?.email || 'User'}</div>
            <button
              style={styles.authButton}
              onClick={onSignOut}
              onMouseDown={handleButtonMouseDown}
              onMouseUp={handleButtonMouseUp}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div style={styles.authButtons}>
            <button
              style={styles.authButton}
              onClick={onSignIn}
              onMouseDown={handleButtonMouseDown}
              onMouseUp={handleButtonMouseUp}
            >
              Sign In
            </button>
            <button
              style={styles.authButton}
              onClick={onSignUp}
              onMouseDown={handleButtonMouseDown}
              onMouseUp={handleButtonMouseUp}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>

      <div style={styles.separator} />

      <div style={styles.title}>Body Monitor</div>
      
      <div style={styles.bodyContainer}>
        <div style={styles.bodyOutline}>
          <div 
            style={styles.head}
            onClick={() => onAreaClick('head')}
          >
            <div style={{...styles.areaLabel, top: '8px'}}>H</div>
          </div>
          
          <div 
            style={styles.torso}
            onClick={() => onAreaClick('torso')}
          >
            <div style={{...styles.areaLabel, top: '25px'}}>T</div>
          </div>
          
          <div 
            style={styles.leftArm}
            onClick={() => onAreaClick('leftArm')}
          >
            <div style={{...styles.areaLabel, top: '15px'}}>LA</div>
          </div>
          
          <div 
            style={styles.rightArm}
            onClick={() => onAreaClick('rightArm')}
          >
            <div style={{...styles.areaLabel, top: '15px'}}>RA</div>
          </div>
          
          <div 
            style={styles.leftLeg}
            onClick={() => onAreaClick('leftLeg')}
          >
            <div style={{...styles.areaLabel, top: '35px'}}>LL</div>
          </div>
          
          <div 
            style={styles.rightLeg}
            onClick={() => onAreaClick('rightLeg')}
          >
            <div style={{...styles.areaLabel, top: '35px'}}>RL</div>
          </div>
        </div>
      </div>
      
      <div style={styles.infoPanel}>
        {selectedAreaInfo ? (
          <div>
            <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>
              {selectedAreaInfo.label}
            </div>
            <div style={{ fontSize: '7px', lineHeight: '1.2' }}>
              {selectedAreaInfo.description}
            </div>
          </div>
        ) : (
          <div style={{ fontSize: '7px', color: '#666' }}>
            Click on a body area to monitor
          </div>
        )}
      </div>
    </div>
  );
};

export default BodyWireframe;
