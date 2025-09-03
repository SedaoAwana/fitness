import React from 'react';
import Button from '../atoms/Button';
import StepIndicator from '../molecules/StepIndicator';
import { colors, spacing, shadows, zIndex } from '../../design-tokens';

const StepNavigation = ({ 
  onBack,
  onNext,
  canProceed = true,
  currentStep,
  totalSteps,
  nextButtonText = 'Continue',
  disabled = false,
  style,
  ...props 
}) => {
  const containerStyles = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.background.primary,
    borderTop: `1px solid ${colors.border.light}`,
    boxShadow: shadows.lg,
    zIndex: zIndex.fixed,
    ...style,
  };

  return (
    <div style={containerStyles} {...props}>
      <Button
        variant="secondary"
        size="md"
        onClick={onBack}
        disabled={disabled}
      >
        ← Back
      </Button>
      
      <StepIndicator
        currentStep={currentStep}
        totalSteps={totalSteps}
      />
      
      <Button
        variant={canProceed ? 'success' : 'secondary'}
        size="md"
        onClick={onNext}
        disabled={!canProceed || disabled}
      >
        {nextButtonText}
      </Button>
    </div>
  );
};

export default StepNavigation;
