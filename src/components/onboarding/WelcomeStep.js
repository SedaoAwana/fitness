import React from 'react';
import { useNavigate } from 'react-router-dom';
import { colors, spacing, typography } from '../../design-tokens';
import Button from '../atoms/Button';

const WelcomeStep = () => {
  const navigate = useNavigate();

  const containerStyles = {
    textAlign: 'center',
    padding: spacing.xl,
  };

  const iconStyles = {
    fontSize: typography.fontSize['6xl'],
    marginBottom: spacing.lg,
  };

  const titleStyles = {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  };

  const subtitleStyles = {
    fontSize: typography.fontSize.lg,
    color: colors.text.secondary,
    marginBottom: spacing.xl,
    lineHeight: 1.6,
  };

  const buttonStyles = {
    minWidth: '200px',
  };

  const handleGetStarted = () => {
    navigate('/onboarding/basic-info');
  };

  return (
    <div style={containerStyles}>
      <div style={iconStyles}>🏋️‍♀️</div>
      <h1 style={titleStyles}>Welcome to Your Fitness Journey!</h1>
      <p style={subtitleStyles}>
        Let's create your personalized fitness plan. This will only take a few minutes 
        and will help us understand your goals, preferences, and current fitness level.
      </p>
      <Button onClick={handleGetStarted} style={buttonStyles}>
        Get Started
      </Button>
    </div>
  );
};

export default WelcomeStep;
