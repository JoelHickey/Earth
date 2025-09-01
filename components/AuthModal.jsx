import React, { useState } from 'react';
import { auth } from '../utils/supabase';

const AuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    modal: {
      width: '400px',
      background: '#d4d0c8',
      borderTop: '2px solid #ffffff',
      borderLeft: '2px solid #ffffff',
      borderBottom: '2px solid #808080',
      borderRight: '2px solid #808080',
      fontFamily: "'MS Sans Serif', Arial, sans-serif"
    },
    header: {
      background: 'linear-gradient(90deg, #000080 0%, #1084d0 100%)',
      color: '#ffffff',
      padding: '4px 8px',
      fontSize: '12px',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    closeButton: {
      width: '16px',
      height: '14px',
      background: '#d4d0c8',
      borderTop: '1px solid #ffffff',
      borderLeft: '1px solid #ffffff',
      borderBottom: '1px solid #808080',
      borderRight: '1px solid #808080',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '10px',
      fontFamily: "'MS Sans Serif', Arial, sans-serif",
      color: '#000000',
      padding: '0',
      lineHeight: '1',
      fontWeight: 'bold'
    },
    content: {
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px'
    },
    label: {
      fontSize: '10px',
      fontFamily: "'MS Sans Serif', Arial, sans-serif",
      color: '#000000'
    },
    input: {
      height: '20px',
      fontSize: '10px',
      fontFamily: "'MS Sans Serif', Arial, sans-serif",
      borderTop: '1px solid #808080',
      borderLeft: '1px solid #808080',
      borderBottom: '1px solid #ffffff',
      borderRight: '1px solid #ffffff',
      background: '#ffffff',
      padding: '2px 4px'
    },
    button: {
      height: '24px',
      background: '#d4d0c8',
      borderTop: '2px solid #ffffff',
      borderLeft: '2px solid #ffffff',
      borderBottom: '2px solid #808080',
      borderRight: '2px solid #808080',
      fontSize: '10px',
      fontFamily: "'MS Sans Serif', Arial, sans-serif",
      cursor: 'pointer',
      padding: '0 8px'
    },
    buttonRow: {
      display: 'flex',
      gap: '8px',
      justifyContent: 'flex-end'
    },
    error: {
      fontSize: '10px',
      fontFamily: "'MS Sans Serif', Arial, sans-serif",
      color: '#ff0000',
      textAlign: 'center'
    },
    toggleText: {
      fontSize: '10px',
      fontFamily: "'MS Sans Serif', Arial, sans-serif",
      color: '#000080',
      cursor: 'pointer',
      textAlign: 'center',
      textDecoration: 'underline'
    }
  };

  const handleCloseButtonMouseDown = (e) => {
    e.target.style.borderTop = '1px solid #808080';
    e.target.style.borderLeft = '1px solid #808080';
    e.target.style.borderBottom = '1px solid #ffffff';
    e.target.style.borderRight = '1px solid #ffffff';
  };

  const handleCloseButtonMouseUp = (e) => {
    e.target.style.borderTop = '1px solid #ffffff';
    e.target.style.borderLeft = '1px solid #ffffff';
    e.target.style.borderBottom = '1px solid #808080';
    e.target.style.borderRight = '1px solid #808080';
  };

  const handleButtonMouseDown = (e) => {
    e.target.style.borderTop = '2px solid #808080';
    e.target.style.borderLeft = '2px solid #808080';
    e.target.style.borderBottom = '2px solid #ffffff';
    e.target.style.borderRight = '2px solid #ffffff';
  };

  const handleButtonMouseUp = (e) => {
    e.target.style.borderTop = '2px solid #ffffff';
    e.target.style.borderLeft = '2px solid #ffffff';
    e.target.style.borderBottom = '2px solid #808080';
    e.target.style.borderRight = '2px solid #808080';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = isSignUp 
        ? await auth.signUp(email, password)
        : await auth.signIn(email, password);

      if (error) {
        setError(error.message);
      } else {
        onAuthSuccess(data.user);
        onClose();
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  console.log('AuthModal render - isOpen:', isOpen);
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <span>{isSignUp ? 'Sign Up' : 'Sign In'}</span>
          <button
            style={styles.closeButton}
            onClick={onClose}
            onMouseDown={handleCloseButtonMouseDown}
            onMouseUp={handleCloseButtonMouseUp}
          >
            ✕
          </button>
        </div>
        
        <div style={styles.content}>
          <form onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                required
              />
            </div>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                required
              />
            </div>

            {error && <div style={styles.error}>{error}</div>}

            <div style={styles.buttonRow}>
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                style={styles.button}
                onMouseDown={handleButtonMouseDown}
                onMouseUp={handleButtonMouseUp}
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
              <button
                type="submit"
                disabled={loading}
                style={styles.button}
                onMouseDown={handleButtonMouseDown}
                onMouseUp={handleButtonMouseUp}
              >
                {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
