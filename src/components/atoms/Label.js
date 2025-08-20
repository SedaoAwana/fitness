import React from 'react';
import { colors, spacing, typography } from '../../design-tokens';

const Label = ({ 
  children, 
  htmlFor,
  required = false,
  size = 'md',
  style,
  ...props 
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          fontSize: typography.fontSize.sm,
          marginBottom: spacing.xs,
        };
      case 'md':
        return {
          fontSize: typography.fontSize.base,
          marginBottom: spacing.sm,
        };
      case 'lg':
        return {
          fontSize: typography.fontSize.lg,
          marginBottom: spacing.md,
        };
      default:
        return {
          fontSize: typography.fontSize.base,
          marginBottom: spacing.sm,
        };
    }
  };

  const baseStyles = {
    display: 'block',
    fontFamily: typography.fontFamily.primary,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral[900],
    cursor: 'pointer',
    ...getSizeStyles(),
    ...style,
  };

  return (
    <label
      htmlFor={htmlFor}
      style={baseStyles}
      {...props}
    >
      {children}
      {required && <span style={{ color: colors.success[500] }}> *</span>}
    </label>
  );
};

export default Label;
