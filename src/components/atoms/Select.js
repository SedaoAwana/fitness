import React from 'react';
import { colors, spacing, borderRadius, typography, transitions } from '../../design-tokens';

const Select = ({ 
  options = [],
  value,
  onChange,
  placeholder,
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
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    backgroundSize: '16px',
    paddingRight: '40px',
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
    <select
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      style={baseStyles}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...props}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
