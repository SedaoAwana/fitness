import React from 'react';
import { colors, typography } from '../../design-tokens';

const StepIndicator = ({ 
  currentStep,
  totalSteps,
  style,
  ...props 
}) => {
  const containerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.sm,
    color: colors.neutral[500],
    ...style,
  };

  return (
    <div style={containerStyles} {...props}>
      {currentStep + 1} of {totalSteps}
    </div>
  );
};

export default StepIndicator;
