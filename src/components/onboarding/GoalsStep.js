import React from 'react';
import { useNavigate } from 'react-router-dom';
import { colors, spacing, typography } from '../../design-tokens';
import Button from '../atoms/Button';

const GoalsStep = () => {
  const navigate = useNavigate();

  const containerStyles = {
    maxWidth: '500px',
    margin: '0 auto',
    textAlign: 'center',
  };

  const titleStyles = {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  };

  const subtitleStyles = {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    marginBottom: spacing.xl,
  };

  const buttonContainerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    gap: spacing.md,
  };

  const handleNext = () => {
    navigate('/onboarding/photo');
  };

  const handleBack = () => {
    navigate('/onboarding/workout-preferences');
  };

  return (
    <div style={containerStyles}>
      <h1 style={titleStyles}>Your Goals</h1>
      <p style={subtitleStyles}>What do you want to achieve?</p>
      
      <div style={{ marginBottom: spacing.xl }}>
        <p>Goal selection will be implemented here</p>
      </div>
      
      <div style={buttonContainerStyles}>
        <Button onClick={handleBack} variant="secondary">
          Back
        </Button>
        <Button onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default GoalsStep;
