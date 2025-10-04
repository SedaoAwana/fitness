import React from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { colors, spacing, typography } from '../design-tokens';

// Import onboarding step components (we'll create these)
import WelcomeStep from '../components/onboarding/WelcomeStep';
import BasicInfoStep from '../components/onboarding/BasicInfoStep';
import PhysicalInfoStep from '../components/onboarding/PhysicalInfoStep';
import LifestyleStep from '../components/onboarding/LifestyleStep';
import WorkoutPreferencesStep from '../components/onboarding/WorkoutPreferencesStep';
import GoalsStep from '../components/onboarding/GoalsStep';
import PhotoStep from '../components/onboarding/PhotoStep';
import OnboardingComplete from '../components/onboarding/OnboardingComplete';

const Onboarding = () => {
  const { userProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  console.log('🎯 Onboarding component loaded, current path:', location.pathname);

  const containerStyles = {
    minHeight: '100vh',
    backgroundColor: colors.background.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const contentStyles = {
    maxWidth: '600px',
    width: '100%',
    padding: spacing.lg,
  };

  // Redirect to dashboard if onboarding is complete
  if (userProfile?.onboarding_complete) {
    return <Navigate to="/dashboard" replace />;
  }

  // Simple fallback - show WelcomeStep directly for now
  console.log('🎯 Rendering onboarding content');
  
  // Force a simple test first
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'yellow',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'red',
        color: 'white',
        padding: '40px',
        borderRadius: '8px',
        textAlign: 'center',
        fontSize: '24px',
        fontWeight: 'bold'
      }}>
        🚨 ONBOARDING PAGE IS LOADING! 🚨
        <br />
        <br />
        If you can see this, the component is working!
        <br />
        <br />
        <button 
          onClick={() => console.log('Button clicked!')}
          style={{
            backgroundColor: 'blue',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Test Button
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
