import React, { useState } from 'react';

const LoginDialog = ({ isOpen, onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      onLogin(username, password);
      setUsername('');
      setPassword('');
    }
  };

  const handleCancel = () => {
    onClose();
    setUsername('');
    setPassword('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (!isOpen) return null;

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    dialog: {
      background: '#d4d0c8',
      borderTop: '2px solid #ffffff',
      borderLeft: '2px solid #ffffff',
      borderBottom: '2px solid #808080',
      borderRight: '2px solid #808080',
      padding: '8px',
      minWidth: '300px',
      boxShadow: 'none'
    },
    titleBar: {
      background: '#000080',
      color: '#ffffff',
      padding: '2px 4px',
      fontSize: '8pt',
      fontFamily: "'MS Sans Serif', sans-serif",
      fontWeight: 'bold',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px',
      height: '20px',
      boxSizing: 'border-box'
    },
    closeButton: {
      background: '#d4d0c8',
      borderTop: '1px solid #ffffff',
      borderLeft: '1px solid #ffffff',
      borderBottom: '1px solid #808080',
      borderRight: '1px solid #808080',
      color: '#000000',
      fontSize: '8pt',
      width: '16px',
      height: '14px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    fieldGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2px'
    },
    label: {
      fontSize: '8pt',
      fontFamily: "'MS Sans Serif', sans-serif",
      color: '#000000',
      fontWeight: 'normal'
    },
    input: {
      height: '20px',
      fontSize: '8pt',
      fontFamily: "'MS Sans Serif', sans-serif",
      background: '#ffffff',
      borderTop: '2px solid #808080',
      borderLeft: '2px solid #808080',
      borderBottom: '2px solid #ffffff',
      borderRight: '2px solid #ffffff',
      padding: '0 4px',
      color: '#000000',
      boxSizing: 'border-box'
    },
    buttonRow: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '4px',
      marginTop: '8px'
    },
    button: {
      height: '22px',
      fontSize: '8pt',
      fontFamily: "'MS Sans Serif', sans-serif",
      background: '#d4d0c8',
      borderTop: '2px solid #ffffff',
      borderLeft: '2px solid #ffffff',
      borderBottom: '2px solid #808080',
      borderRight: '2px solid #808080',
      cursor: 'pointer',
      color: '#000000',
      padding: '0 12px',
      minWidth: '60px'
    },
    okButton: {
      background: '#d4d0c8',
      fontWeight: 'bold'
    }
  };

  return (
    <div style={styles.overlay} onClick={handleCancel}>
      <div style={styles.dialog} onClick={(e) => e.stopPropagation()} onKeyDown={handleKeyDown}>
        <div style={styles.titleBar}>
          <span>User Login</span>
          <button style={styles.closeButton} onClick={handleCancel}>
            ×
          </button>
        </div>
        
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Username:</label>
            <input
              type="text"
              style={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
          </div>
          
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Password:</label>
            <input
              type="password"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <div style={styles.buttonRow}>
            <button
              type="button"
              style={styles.button}
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{...styles.button, ...styles.okButton}}
            >
              OK
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginDialog;

