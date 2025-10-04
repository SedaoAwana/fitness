import React from 'react';
import { useNavigate } from 'react-router-dom';
import { colors, spacing, typography } from '../../design-tokens';
import Button from '../atoms/Button';

const WelcomeStep = () => {
  const navigate = useNavigate();
  
  console.log('🎯 WelcomeStep component rendering');

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
    <div style={{
      textAlign: 'center',
      padding: '40px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      border: '2px solid #007bff'
    }}>
      <div style={{ 
        backgroundColor: 'green', 
        color: 'white', 
        padding: '10px', 
        marginBottom: '20px',
        borderRadius: '4px'
      }}>
        DEBUG: WelcomeStep is rendering
      </div>
      <div style={{ fontSize: '48px', marginBottom: '20px' }}>🏋️‍♀️</div>
      <h1 style={{ 
        fontSize: '32px', 
        fontWeight: 'bold', 
        color: '#2c3e50', 
        marginBottom: '16px' 
      }}>
        Welcome to Your Fitness Journey!
      </h1>
      <p style={{ 
        fontSize: '18px', 
        color: '#7f8c8d', 
        marginBottom: '30px', 
        lineHeight: 1.6 
      }}>
        Let's create your personalized fitness plan. This will only take a few minutes 
        and will help us understand your goals, preferences, and current fitness level.
      </p>
      <button 
        onClick={handleGetStarted}
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '16px 32px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          minWidth: '200px'
        }}
      >
        Get Started
      </button>
    </div>
  );
};

export default WelcomeStep;
