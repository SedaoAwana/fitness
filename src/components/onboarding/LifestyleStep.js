import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors, spacing, typography } from '../../design-tokens';
import Button from '../atoms/Button';
import Select from '../atoms/Select';

const LifestyleStep = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    activityLevel: '',
    workSituation: '',
    eatingHabits: '',
  });

  const containerStyles = {
    maxWidth: '500px',
    margin: '0 auto',
  };

  const titleStyles = {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  };

  const subtitleStyles = {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    marginBottom: spacing.xl,
    textAlign: 'center',
  };

  const formStyles = {
    backgroundColor: colors.background.secondary,
    border: `1px solid ${colors.border.primary}`,
    borderRadius: spacing.md,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  };

  const buttonContainerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    gap: spacing.md,
  };

  const activityLevelOptions = [
    { value: '', label: 'Select activity level' },
    { value: 'sedentary', label: 'Sedentary (Little to no exercise)' },
    { value: 'light', label: 'Light (Light exercise 1-3 days/week)' },
    { value: 'moderate', label: 'Moderate (Moderate exercise 3-5 days/week)' },
    { value: 'active', label: 'Active (Heavy exercise 6-7 days/week)' },
    { value: 'very_active', label: 'Very Active (Very heavy exercise, physical job)' },
  ];

  const workSituationOptions = [
    { value: '', label: 'Select work situation' },
    { value: 'desk_job', label: 'Desk Job (Mostly sitting)' },
    { value: 'standing', label: 'Standing Job (On feet most of the day)' },
    { value: 'physical', label: 'Physical Job (Manual labor)' },
    { value: 'mixed', label: 'Mixed (Sitting and moving)' },
    { value: 'remote', label: 'Remote Work (Work from home)' },
  ];

  const eatingHabitsOptions = [
    { value: '', label: 'Select eating habits' },
    { value: 'regular', label: 'Regular (3 meals a day)' },
    { value: 'irregular', label: 'Irregular (Skip meals often)' },
    { value: 'snacking', label: 'Snacking (Frequent small meals)' },
    { value: 'intermittent', label: 'Intermittent Fasting' },
    { value: 'meal_prep', label: 'Meal Prep (Pre-planned meals)' },
  ];

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    if (form.activityLevel && form.workSituation && form.eatingHabits) {
      localStorage.setItem('onboarding_lifestyle', JSON.stringify(form));
      navigate('/onboarding/workout-preferences');
    }
  };

  const handleBack = () => {
    navigate('/onboarding/physical-info');
  };

  return (
    <div style={containerStyles}>
      <h1 style={titleStyles}>Lifestyle & Habits</h1>
      <p style={subtitleStyles}>Tell us about your daily routine</p>
      
      <div style={formStyles}>
        <Select
          label="Current Activity Level"
          name="activityLevel"
          value={form.activityLevel}
          onChange={handleInputChange}
          options={activityLevelOptions}
        />
        
        <Select
          label="Work Situation"
          name="workSituation"
          value={form.workSituation}
          onChange={handleInputChange}
          options={workSituationOptions}
        />
        
        <Select
          label="Eating Habits"
          name="eatingHabits"
          value={form.eatingHabits}
          onChange={handleInputChange}
          options={eatingHabitsOptions}
        />
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

export default LifestyleStep;
