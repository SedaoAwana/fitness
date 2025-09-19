import React from 'react';
import { useNavigate } from 'react-router-dom';
import { colors, spacing, typography } from '../../design-tokens';
import Button from '../atoms/Button';

const OnboardingComplete = () => {
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

  const handleGoToDashboard = () => {
    // Mark onboarding as complete
    localStorage.setItem('onboarding_complete', 'true');
    navigate('/dashboard');
  };

  return (
    <div style={containerStyles}>
      <div style={iconStyles}>🎉</div>
      <h1 style={titleStyles}>Welcome to Your Fitness Journey!</h1>
      <p style={subtitleStyles}>
        Great! We've set up your personalized fitness profile. 
        You're now ready to start tracking your workouts and progress.
      </p>
      <Button onClick={handleGoToDashboard} style={buttonStyles}>
        Go to Dashboard
      </Button>
    </div>
  );
};

export default OnboardingComplete;
