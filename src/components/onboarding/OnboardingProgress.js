import React from 'react';
import { useLocation } from 'react-router-dom';
import { colors, spacing, typography } from '../../design-tokens';

const OnboardingProgress = () => {
  const location = useLocation();
  
  const steps = [
    { path: 'welcome', label: 'Welcome' },
    { path: 'basic-info', label: 'Basic Info' },
    { path: 'physical-info', label: 'Physical Info' },
    { path: 'lifestyle', label: 'Lifestyle' },
    { path: 'workout-preferences', label: 'Workout' },
    { path: 'goals', label: 'Goals' },
    { path: 'photo', label: 'Photo' },
    { path: 'complete', label: 'Complete' },
  ];

  const getCurrentStepIndex = () => {
    const currentPath = location.pathname.split('/').pop();
    return steps.findIndex(step => step.path === currentPath);
  };

  const currentStepIndex = getCurrentStepIndex();
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const containerStyles = {
    marginBottom: spacing.xl,
  };

  const progressBarStyles = {
    width: '100%',
    height: '8px',
    backgroundColor: colors.border.light,
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: spacing.sm,
  };

  const progressFillStyles = {
    height: '100%',
    backgroundColor: colors.primary[500],
    width: `${progress}%`,
    transition: 'width 0.3s ease',
  };

  const stepTextStyles = {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    textAlign: 'center',
  };

  return (
    <div style={containerStyles}>
      <div style={progressBarStyles}>
        <div style={progressFillStyles} />
      </div>
      <div style={stepTextStyles}>
        Step {currentStepIndex + 1} of {steps.length}: {steps[currentStepIndex]?.label}
      </div>
    </div>
  );
};

export default OnboardingProgress;
