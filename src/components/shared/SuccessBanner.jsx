import React from 'react';

const SuccessBanner = ({ 
  title = "Success",
  message,
  show = false
}) => {
  if (!show) return null;
  
  return (
    <div style={{
      padding: '8px 10px',
      background: '#d4edda',
      border: '1px solid #34c759',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      animation: 'slideDown 0.3s ease-out'
    }}>
      <div style={{ fontSize: '14px' }}>✓</div>
      <div>
        <div style={{ fontSize: '10px', fontWeight: '600', color: '#155724' }}>
          {title}
        </div>
        {message && (
          <div style={{ fontSize: '8px', color: '#155724', marginTop: '2px' }}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default SuccessBanner;

