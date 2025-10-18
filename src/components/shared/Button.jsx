import React from 'react';
import { colors, fontSize, spacing, borderRadius, transitions } from '../../styles/tokens';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  loading = false,
  ...props 
}) => {
  const variants = {
    primary: {
      background: colors.primary,
      color: colors.white,
      hoverBg: colors.primaryHover
    },
    success: {
      background: colors.success,
      color: colors.white,
      hoverBg: '#2fb350'
    },
    secondary: {
      background: colors.backgroundDark,
      color: colors.primary,
      hoverBg: colors.border
    }
  };

  const sizes = {
    small: {
      fontSize: fontSize.sm,
      padding: `${spacing.xs} ${spacing.md}`
    },
    medium: {
      fontSize: fontSize.base,
      padding: `${spacing.sm} ${spacing.xl}`
    },
    large: {
      fontSize: fontSize.lg,
      padding: `${spacing.md} 14px`
    }
  };

  const style = variants[variant];
  const sizeStyle = sizes[size];

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        ...sizeStyle,
        background: loading ? variants.success.background : style.background,
        color: style.color,
        border: 'none',
        borderRadius: borderRadius.lg,
        cursor: disabled || loading ? 'default' : 'pointer',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        transition: 'all 0.3s ease',
        ...props.style
      }}
      onMouseOver={(e) => !disabled && !loading && (e.currentTarget.style.background = style.hoverBg)}
      onMouseOut={(e) => !disabled && !loading && (e.currentTarget.style.background = style.background)}
      {...props}
    >
      {loading && (
        <div style={{
          width: '8px',
          height: '8px',
          border: '2px solid #ffffff',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          animation: 'spin 0.6s linear infinite'
        }} />
      )}
      <span>{loading ? 'Processing...' : children}</span>
    </button>
  );
};

export default Button;

