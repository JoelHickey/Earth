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








    authSection: {
      marginBottom: '8px',
      padding: '4px',
      background: '#d4d0c8',
      fontSize: '8px'
    },
    inputGroup: {
      marginBottom: '6px',
      textAlign: 'left'
    },
    inputLabel: {
      fontSize: '9px',
      fontWeight: 'bold',
      marginBottom: '2px',
      color: '#000000'
    },
    input: {
      width: '100%',
      height: '18px',
      fontSize: '9px',
      fontFamily: "'MS Sans Serif', Arial, sans-serif",
      borderTop: '1px solid #808080',
      borderLeft: '1px solid #808080',
      borderBottom: '1px solid #ffffff',
      borderRight: '1px solid #ffffff',
      background: '#ffffff',
      padding: '2px 3px',
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
      gap: '4px',
      alignItems: 'flex-start'
    },
    authButton: {
      height: '20px',
      background: '#d4d0c8',
      borderTop: '2px solid #ffffff',
      borderLeft: '2px solid #ffffff',
      borderBottom: '2px solid #808080',
      borderRight: '2px solid #808080',
      fontSize: '9px',
      fontFamily: "'MS Sans Serif', Arial, sans-serif",
      cursor: 'pointer',
      padding: '0 6px',
      fontWeight: 'bold'
    },

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
