import React from 'react';
import { colors, spacing, borderRadius, typography, shadows, transitions } from '../../design-tokens';

const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  disabled = false,
  fullWidth = false,
  onClick,
  onTouchStart,
  onTouchEnd,
  style,
  ...props 
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: disabled ? colors.secondary[400] : colors.primary[500],
          color: 'white',
          boxShadow: disabled ? 'none' : shadows.primary,
        };
      case 'secondary':
        return {
          backgroundColor: disabled ? colors.secondary[400] : colors.secondary[500],
          color: 'white',
        };
      case 'success':
        return {
          backgroundColor: disabled ? colors.secondary[400] : colors.success[500],
          color: 'white',
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: colors.primary[500],
          border: `2px solid ${colors.primary[500]}`,
        };
      default:
        return {
          backgroundColor: disabled ? colors.secondary[400] : colors.primary[500],
          color: 'white',
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          padding: `${spacing.sm} ${spacing.md}`,
          fontSize: typography.fontSize.sm,
          minHeight: '40px',
        };
      case 'md':
        return {
          padding: `${spacing.md} ${spacing.xl}`,
          fontSize: typography.fontSize.base,
          minHeight: '48px',
        };
      case 'lg':
        return {
          padding: `${spacing.lg} ${spacing.xxl}`,
          fontSize: typography.fontSize.lg,
          minHeight: '56px',
        };
      default:
        return {
          padding: `${spacing.md} ${spacing.xl}`,
          fontSize: typography.fontSize.base,
          minHeight: '48px',
        };
    }
  };

  const baseStyles = {
    border: 'none',
    borderRadius: borderRadius.md,
    fontFamily: typography.fontFamily.primary,
    fontWeight: typography.fontWeight.semibold,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: transitions.normal,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    width: fullWidth ? '100%' : 'auto',
    ...getVariantStyles(),
    ...getSizeStyles(),
    ...style,
  };

  const handleTouchStart = (e) => {
    if (!disabled && onTouchStart) {
      onTouchStart(e);
    } else if (!disabled) {
      e.target.style.transform = 'scale(0.98)';
    }
  };

  const handleTouchEnd = (e) => {
    if (!disabled && onTouchEnd) {
      onTouchEnd(e);
    } else if (!disabled) {
      e.target.style.transform = 'scale(1)';
    }
  };

  const handleMouseOver = (e) => {
    if (!disabled && variant === 'primary') {
      e.target.style.boxShadow = shadows.primaryHover;
      e.target.style.transform = 'translateY(-1px)';
    }
  };

  const handleMouseOut = (e) => {
    if (!disabled && variant === 'primary') {
      e.target.style.boxShadow = shadows.primary;
      e.target.style.transform = 'translateY(0)';
    }
  };

  return (
    <button
      style={baseStyles}
      onClick={onClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
