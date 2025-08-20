import React from 'react';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import { colors, spacing, typography, borderRadius, shadows } from '../../design-tokens';

const WelcomeScreen = ({ 
  onStart,
  style,
  ...props 
}) => {
  const containerStyles = {
    padding: spacing.lg,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    ...style,
  };

  const iconStyles = {
    fontSize: typography.fontSize['4xl'],
    marginBottom: spacing.lg,
  };

  const titleStyles = {
    fontSize: typography.fontSize['3xl'],
    color: colors.neutral[900],
    marginBottom: spacing.md,
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.tight,
    fontFamily: typography.fontFamily.primary,
  };

  const subtitleStyles = {
    fontSize: typography.fontSize.lg,
    color: colors.neutral[500],
    marginBottom: spacing.xxxl,
    lineHeight: typography.lineHeight.normal,
    fontFamily: typography.fontFamily.primary,
  };

  const benefitsContainerStyles = {
    marginBottom: spacing.xxxl,
  };

  const benefitCardStyles = {
    backgroundColor: colors.background.secondary,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    border: `2px solid ${colors.border.light}`,
    marginBottom: spacing.md,
  };

  const benefitIconStyles = {
    fontSize: typography.fontSize['2xl'],
    marginBottom: spacing.sm,
  };

  const benefitTitleStyles = {
    margin: `0 0 ${spacing.sm} 0`,
    color: colors.neutral[900],
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    fontFamily: typography.fontFamily.primary,
  };

  const benefitDescriptionStyles = {
    margin: 0,
    color: colors.neutral[500],
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.primary,
  };

  const benefits = [
    {
      icon: '🎯',
      title: 'Personalized Goals',
      description: 'Tailored to your specific objectives'
    },
    {
      icon: '💪',
      title: 'Expert Guidance',
      description: 'Based on proven fitness principles'
    },
    {
      icon: '📱',
      title: 'Mobile Optimized',
      description: 'Designed for your phone & tablet'
    }
  ];

  return (
    <div style={containerStyles} {...props}>
      <div style={iconStyles}>🏋️‍♀️</div>
      
      <h1 style={titleStyles}>
        Transform Your Fitness
      </h1>
      
      <p style={subtitleStyles}>
        Get your personalized workout plan in just 3 minutes
      </p>
      
      <div style={benefitsContainerStyles}>
        {benefits.map((benefit, index) => (
          <div key={index} style={benefitCardStyles}>
            <div style={benefitIconStyles}>{benefit.icon}</div>
            <h3 style={benefitTitleStyles}>{benefit.title}</h3>
            <p style={benefitDescriptionStyles}>{benefit.description}</p>
          </div>
        ))}
      </div>

      <Button
        variant="primary"
        size="lg"
        fullWidth
        onClick={onStart}
      >
        Start My Journey →
      </Button>
    </div>
  );
};

export default WelcomeScreen;
