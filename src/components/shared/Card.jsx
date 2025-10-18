import React from 'react';

const Card = ({ 
  children, 
  onClick,
  hoverable = true,
  compact = false,
  ...props 
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        padding: compact ? '4px 5px' : '8px 10px',
        background: '#fafafa',
        border: '1px solid #e0e0e0',
        borderRadius: compact ? '3px' : '6px',
        marginBottom: compact ? '2px' : '6px',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.15s',
        position: 'relative',
        ...props.style
      }}
      onMouseOver={(e) => {
        if (hoverable) {
          e.currentTarget.style.borderColor = '#667eea';
        }
      }}
      onMouseOut={(e) => {
        if (hoverable) {
          e.currentTarget.style.borderColor = '#e0e0e0';
        }
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;

