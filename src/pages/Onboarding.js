import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
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

  return (
    <div style={containerStyles}>
      <div style={contentStyles}>
        <Routes>
          <Route index element={<Navigate to="welcome" replace />} />
          <Route path="welcome" element={<WelcomeStep />} />
          <Route path="basic-info" element={<BasicInfoStep />} />
          <Route path="physical-info" element={<PhysicalInfoStep />} />
          <Route path="lifestyle" element={<LifestyleStep />} />
          <Route path="workout-preferences" element={<WorkoutPreferencesStep />} />
          <Route path="goals" element={<GoalsStep />} />
          <Route path="photo" element={<PhotoStep />} />
          <Route path="complete" element={<OnboardingComplete />} />
        </Routes>
      </div>
    </div>
  );
};

export default Onboarding;
