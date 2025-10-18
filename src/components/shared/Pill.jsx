import React from 'react';

const Pill = ({ 
  children, 
  onClick, 
  selected = false,
  size = 'medium',
  ...props 
}) => {
  const sizes = {
    small: {
      fontSize: '7px',
      padding: '2px 5px',
      borderRadius: '8px'
    },
    medium: {
      fontSize: '9px',
      padding: '3px 7px',
      borderRadius: '10px'
    }
  };

  const sizeStyle = sizes[size];

  return (
    <button
      onClick={onClick}
      style={{
        ...sizeStyle,
        background: selected ? '#667eea' : '#f5f5f7',
        border: selected ? '1px solid #667eea' : '1px solid #e0e0e0',
        color: selected ? '#ffffff' : size === 'small' ? '#6e6e73' : '#667eea',
        cursor: 'pointer',
        fontWeight: selected ? '600' : '500',
        transition: 'all 0.2s ease',
        ...props.style
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Pill;

