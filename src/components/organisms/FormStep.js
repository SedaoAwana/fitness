import React from 'react';
import FormField from '../molecules/FormField';
import { colors, spacing, typography } from '../../design-tokens';

const FormStep = ({ 
  title,
  subtitle,
  fields = [],
  style,
  ...props 
}) => {
  const containerStyles = {
    padding: spacing.lg,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    ...style,
  };

  const headerStyles = {
    marginBottom: spacing.xxl,
    textAlign: 'center',
  };

  const titleStyles = {
    color: colors.neutral[900],
    marginBottom: spacing.sm,
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.primary,
  };

  const subtitleStyles = {
    color: colors.neutral[500],
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.primary,
  };

  const fieldsContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.lg,
  };

  return (
    <div style={containerStyles} {...props}>
      <div style={headerStyles}>
        <h2 style={titleStyles}>{title}</h2>
        <p style={subtitleStyles}>{subtitle}</p>
      </div>

      <div style={fieldsContainerStyles}>
        {fields.map((field, index) => (
          <FormField
            key={index}
            {...field}
          />
        ))}
      </div>
    </div>
  );
};

export default FormStep;
