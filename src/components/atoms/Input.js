import React from 'react';
import { colors, spacing, borderRadius, typography, transitions } from '../../design-tokens';

const Input = ({ 
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  fullWidth = true,
  size = 'md',
  style,
  ...props 
}) => {
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
          padding: spacing.md,
          fontSize: typography.fontSize.base,
          minHeight: '48px',
        };
      case 'lg':
        return {
          padding: spacing.lg,
          fontSize: typography.fontSize.lg,
          minHeight: '56px',
        };
      default:
        return {
          padding: spacing.md,
          fontSize: typography.fontSize.base,
          minHeight: '48px',
        };
    }
  };

  const baseStyles = {
    width: fullWidth ? '100%' : 'auto',
    border: `2px solid ${colors.border.light}`,
    borderRadius: borderRadius.md,
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.base,
    backgroundColor: colors.background.primary,
    color: colors.neutral[900],
    transition: transitions.normal,
    outline: 'none',
    cursor: disabled ? 'not-allowed' : 'text',
    opacity: disabled ? 0.6 : 1,
    ...getSizeStyles(),
    ...style,
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = colors.primary[500];
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = colors.border.light;
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      style={baseStyles}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...props}
    />
  );
};

export default Input;
