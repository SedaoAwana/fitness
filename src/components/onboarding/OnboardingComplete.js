import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors, spacing, typography } from '../../design-tokens';
import Button from '../atoms/Button';
import { useAuth } from '../../contexts/AuthContext';
import FitnessDataService from '../../services/FitnessDataService';

const OnboardingComplete = () => {
  const navigate = useNavigate();
  const { user, updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const collectOnboardingData = () => {
    const basicInfo = JSON.parse(localStorage.getItem('onboarding_basic_info') || '{}');
    const physicalInfo = JSON.parse(localStorage.getItem('onboarding_physical_info') || '{}');
    const lifestyle = JSON.parse(localStorage.getItem('onboarding_lifestyle') || '{}');
    const workoutPreferences = JSON.parse(localStorage.getItem('onboarding_workout_preferences') || '{}');
    const goals = JSON.parse(localStorage.getItem('onboarding_goals') || '{}');

    return {
      ...basicInfo,
      ...physicalInfo,
      ...lifestyle,
      ...workoutPreferences,
      ...goals,
    };
  };

  const handleGoToDashboard = async () => {
    if (!user) {
      setError('User not authenticated');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Collect all onboarding data
      const onboardingData = collectOnboardingData();
      
      // Calculate BMI if we have height and weight
      let bmi = null;
      if (onboardingData.height && onboardingData.weight) {
        const heightInMeters = onboardingData.height / 100;
        bmi = (onboardingData.weight / (heightInMeters * heightInMeters)).toFixed(1);
      }

      // Create comprehensive user profile
      const userProfile = {
        user_id: user.id,
        full_name: onboardingData.name,
        age: parseInt(onboardingData.age),
        gender: onboardingData.gender,
        height: parseInt(onboardingData.height),
        weight: parseFloat(onboardingData.weight),
        body_shape: onboardingData.bodyShape,
        activity_level: onboardingData.activityLevel,
        work_situation: onboardingData.workSituation,
        eating_habits: onboardingData.eatingHabits,
        workout_location: onboardingData.workoutLocation,
        workout_frequency: parseInt(onboardingData.workoutFrequency),
        workout_duration: parseInt(onboardingData.workoutDuration),
        experience_level: onboardingData.experienceLevel,
        available_equipment: onboardingData.availableEquipment || [],
        primary_goal: onboardingData.primaryGoal,
        secondary_goals: onboardingData.secondaryGoals || [],
        target_weight: onboardingData.targetWeight ? parseFloat(onboardingData.targetWeight) : null,
        timeline: onboardingData.timeline,
        motivation: onboardingData.motivation,
        bmi: bmi,
        onboarding_complete: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Save to Supabase
      const result = await FitnessDataService.createUserProfile(userProfile);
      
      if (result.success) {
        // Update local context
        await updateUserProfile();
        
        // Clear onboarding data from localStorage
        localStorage.removeItem('onboarding_basic_info');
        localStorage.removeItem('onboarding_physical_info');
        localStorage.removeItem('onboarding_lifestyle');
        localStorage.removeItem('onboarding_workout_preferences');
        localStorage.removeItem('onboarding_goals');
        
        // Navigate to dashboard
        navigate('/dashboard');
      } else {
        setError(result.error || 'Failed to save profile');
      }
    } catch (err) {
      console.error('Error completing onboarding:', err);
      setError('An error occurred while saving your profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyles}>
      <div style={iconStyles}>🎉</div>
      <h1 style={titleStyles}>Welcome to Your Fitness Journey!</h1>
      <p style={subtitleStyles}>
        Great! We've set up your personalized fitness profile. 
        You're now ready to start tracking your workouts and progress.
      </p>
      
      {error && (
        <div style={{
          backgroundColor: colors.error.light,
          color: colors.error.dark,
          padding: spacing.md,
          borderRadius: spacing.sm,
          marginBottom: spacing.lg,
          fontSize: typography.fontSize.sm,
        }}>
          {error}
        </div>
      )}
      
      <Button 
        onClick={handleGoToDashboard} 
        style={buttonStyles}
        loading={loading}
        disabled={loading}
      >
        {loading ? 'Saving Profile...' : 'Go to Dashboard'}
      </Button>
    </div>
  );
};

export default OnboardingComplete;
