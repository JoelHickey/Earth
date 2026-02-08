import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  loading = false,
  ...props 
}) => {
  const sizes = {
    small: {
      padding: "1px 6px"
    },
    medium: {
      padding: "2px 8px"
    },
    large: {
      padding: "3px 10px"
    }
  };

  const sizeStyle = sizes[size] || sizes.medium;

  const normalBorder = {
    borderTop: "2px solid #ffffff",
    borderLeft: "2px solid #ffffff",
    borderBottom: "2px solid #808080",
    borderRight: "2px solid #808080"
  };

  const pressedBorder = {
    borderTop: "2px solid #808080",
    borderLeft: "2px solid #808080",
    borderBottom: "2px solid #ffffff",
    borderRight: "2px solid #ffffff"
  };

  const disabledBorder = {
    borderTop: "2px solid #c0c0c0",
    borderLeft: "2px solid #c0c0c0",
    borderBottom: "2px solid #c0c0c0",
    borderRight: "2px solid #c0c0c0"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        ...sizeStyle,
        background: "#d4d0c8",
        color: disabled || loading ? "#808080" : "#000000",
        ...(disabled || loading ? disabledBorder : normalBorder),
        borderRadius: "0",
        cursor: disabled || loading ? 'default' : 'pointer',
        fontWeight: 'normal',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        fontFamily: "'MS Sans Serif', sans-serif",
        fontSize: "8pt",
        ...props.style
      }}
      onMouseDown={(e) => {
        if (!disabled && !loading) {
          Object.assign(e.currentTarget.style, pressedBorder);
        }
      }}
      onMouseUp={(e) => {
        if (!disabled && !loading) {
          Object.assign(e.currentTarget.style, normalBorder);
        }
      }}
      {...props}
    >
      {loading && (
        <div style={{
          width: '8px',
          height: '8px',
          border: '2px solid #808080',
          borderTopColor: '#ffffff',
          borderRadius: '0',
          animation: 'spin 0.6s linear infinite'
        }} />
      )}
      <span>{loading ? 'Processing...' : children}</span>
    </button>
  );
};

export default Button;

