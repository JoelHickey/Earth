import React, { useState } from 'react';

const BodyWireframe = ({ isAuthenticated, user, onSignIn, onSignUp, onSignOut }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authMode, setAuthMode] = useState('signin'); // 'signin' or 'signup'
  const styles = {
    container: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: '8px',
      background: '#d4d0c8',
      fontFamily: "'MS Sans Serif', Arial, sans-serif"
    },
    title: {
      fontSize: '10px',
      fontWeight: 'bold',
      marginBottom: '8px',
      color: '#000000',
      alignSelf: 'center'
    },
    bodyContainer: {
      position: 'relative',
      width: '120px',
      height: '200px',
      background: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center'
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
      background: '#d4d0c8',
      fontSize: '8px',
      minHeight: '40px',
      width: '100%'
    },
    authSection: {
      marginBottom: '8px',
      padding: '4px',
      background: '#d4d0c8',
      fontSize: '8px'
    },
    inputGroup: {
      marginBottom: '4px',
      textAlign: 'left'
    },
    inputLabel: {
      fontSize: '8px',
      fontWeight: 'bold',
      marginBottom: '1px',
      color: '#000000'
    },
    input: {
      width: '100%',
      height: '16px',
      fontSize: '8px',
      fontFamily: "'MS Sans Serif', Arial, sans-serif",
      borderTop: '1px solid #808080',
      borderLeft: '1px solid #808080',
      borderBottom: '1px solid #ffffff',
      borderRight: '1px solid #ffffff',
      background: '#ffffff',
      padding: '1px 2px',
      boxSizing: 'border-box'
    },
    authTitle: {
      fontSize: '9px',
      fontWeight: 'bold',
      marginBottom: '4px',
      color: '#000000',
      alignSelf: 'flex-start'
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
      gap: '2px',
      alignItems: 'flex-start'
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
          <div>
            <div style={styles.inputGroup}>
              <div style={styles.inputLabel}>Username:</div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={styles.input}
                placeholder="Enter username"
              />
            </div>
            <div style={styles.inputGroup}>
              <div style={styles.inputLabel}>Password:</div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                placeholder="Enter password"
              />
            </div>
            <div style={styles.authButtons}>
              <button
                style={styles.authButton}
                onClick={() => {
                  if (authMode === 'signin') {
                    onSignIn(username, password);
                  } else {
                    onSignUp(username, password);
                  }
                }}
                onMouseDown={handleButtonMouseDown}
                onMouseUp={handleButtonMouseUp}
              >
                {authMode === 'signin' ? 'Sign In' : 'Sign Up'}
              </button>
              <button
                style={styles.authButton}
                onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
                onMouseDown={handleButtonMouseDown}
                onMouseUp={handleButtonMouseUp}
              >
                {authMode === 'signin' ? 'Switch to Sign Up' : 'Switch to Sign In'}
              </button>
            </div>
          </div>
        )}
      </div>


    </div>
  );
};

export default BodyWireframe;
