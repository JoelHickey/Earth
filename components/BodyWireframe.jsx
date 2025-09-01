import React, { useState } from 'react';

const BodyWireframe = ({ isAuthenticated, user, onSignIn, onSignUp, onSignOut }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const styles = {
    container: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: '8px',
      background: '#d4d0c8',
      fontFamily: "'MS Sans Serif', sans-serif"
    },








    authSection: {
      marginBottom: '8px',
      padding: '4px',
      background: '#d4d0c8',
      fontSize: '10px',
      fontFamily: "'MS Sans Serif', sans-serif"
    },
    inputGroup: {
      marginBottom: '6px',
      textAlign: 'left'
    },
    inputLabel: {
      fontSize: '9px',
      fontWeight: 'normal',
      marginBottom: '2px',
      color: '#000000',
      fontFamily: "'MS Sans Serif', sans-serif"
    },
    input: {
      width: '100%',
      height: '18px',
      fontSize: '10px',
      fontFamily: "'MS Sans Serif', sans-serif",
      border: '2px inset #c0c0c0',
      background: '#ffffff',
      padding: '1px 4px',
      boxSizing: 'border-box',
      boxShadow: 'inset 1px 1px #808080, inset -1px -1px #ffffff'
    },
    authTitle: {
      fontSize: '11px',
      fontWeight: 'bold',
      marginBottom: '6px',
      color: '#000000',
      alignSelf: 'flex-start',
      fontFamily: "'MS Sans Serif', sans-serif"
    },
    authInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px'
    },
    userEmail: {
      fontSize: '10px',
      color: '#000000',
      wordBreak: 'break-all',
      fontFamily: "'MS Sans Serif', sans-serif"
    },
    authButtons: {
      display: 'flex',
      flexDirection: 'row',
      gap: '4px',
      justifyContent: 'flex-end'
    },
    authButton: {
      height: '16px',
      background: '#d4d0c8',
      borderTop: '2px solid #ffffff',
      borderLeft: '2px solid #ffffff',
      borderBottom: '2px solid #808080',
      borderRight: '2px solid #808080',
      fontSize: '10px',
      fontFamily: "'MS Sans Serif', sans-serif",
      cursor: 'pointer',
      padding: '0 6px',
      fontWeight: 'normal',
      minWidth: '50px'
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
              />
            </div>
            <div style={styles.inputGroup}>
              <div style={styles.inputLabel}>Password:</div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.authButtons}>
              <button
                style={styles.authButton}
                onClick={() => onSignIn(username, password)}
                onMouseDown={handleButtonMouseDown}
                onMouseUp={handleButtonMouseUp}
              >
                Sign In
              </button>
              <button
                style={styles.authButton}
                onClick={() => onSignUp(username, password)}
                onMouseDown={handleButtonMouseDown}
                onMouseUp={handleButtonMouseUp}
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </div>


    </div>
  );
};

export default BodyWireframe;
