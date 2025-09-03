import React from 'react';
import { colors, spacing, borderRadius, typography } from '../../design-tokens';

const ErrorMessage = ({ 
  message, 
  visible = true,
  style,
  ...props 
}) => {
  if (!visible || !message) return null;

  const containerStyles = {
    backgroundColor: '#fee2e2',
    border: `1px solid ${colors.success[200]}`,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...style,
  };

  const textStyles = {
    color: '#dc2626',
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.primary,
    margin: 0,
    textAlign: 'center',
  };

  return (
    <div style={containerStyles} {...props}>
      <p style={textStyles}>{message}</p>
    </div>
  );
};

export default ErrorMessage;
