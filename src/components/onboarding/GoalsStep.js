import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors, spacing, typography } from '../../design-tokens';
import Button from '../atoms/Button';
import Select from '../atoms/Select';
import Input from '../atoms/Input';

const GoalsStep = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    primaryGoal: '',
    secondaryGoals: [],
    targetWeight: '',
    timeline: '',
    motivation: '',
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

  const primaryGoalOptions = [
    { value: '', label: 'Select your primary goal' },
    { value: 'lose_fat', label: 'Lose Fat' },
    { value: 'build_muscle', label: 'Build Muscle' },
    { value: 'increase_strength', label: 'Increase Strength' },
    { value: 'improve_endurance', label: 'Improve Endurance' },
    { value: 'maintain_fitness', label: 'Maintain Fitness' },
    { value: 'athletic_performance', label: 'Athletic Performance' },
    { value: 'rehabilitation', label: 'Rehabilitation' },
  ];

  const secondaryGoalOptions = [
    { value: 'flexibility', label: 'Improve Flexibility' },
    { value: 'balance', label: 'Better Balance' },
    { value: 'stress_relief', label: 'Stress Relief' },
    { value: 'energy', label: 'More Energy' },
    { value: 'confidence', label: 'Build Confidence' },
    { value: 'sleep', label: 'Better Sleep' },
    { value: 'mobility', label: 'Improve Mobility' },
    { value: 'posture', label: 'Better Posture' },
  ];

  const timelineOptions = [
    { value: '', label: 'Select timeline' },
    { value: '1_month', label: '1 Month' },
    { value: '3_months', label: '3 Months' },
    { value: '6_months', label: '6 Months' },
    { value: '1_year', label: '1 Year' },
    { value: 'long_term', label: 'Long-term Lifestyle' },
  ];

  const motivationOptions = [
    { value: '', label: 'Select your main motivation' },
    { value: 'health', label: 'Health & Longevity' },
    { value: 'appearance', label: 'Physical Appearance' },
    { value: 'confidence', label: 'Self-Confidence' },
    { value: 'energy', label: 'More Energy' },
    { value: 'stress', label: 'Stress Relief' },
    { value: 'social', label: 'Social Reasons' },
    { value: 'challenge', label: 'Personal Challenge' },
  ];

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSecondaryGoalChange = (goal) => {
    setForm(prev => ({
      ...prev,
      secondaryGoals: prev.secondaryGoals.includes(goal)
        ? prev.secondaryGoals.filter(item => item !== goal)
        : [...prev.secondaryGoals, goal]
    }));
  };

  const handleNext = () => {
    if (form.primaryGoal && form.timeline && form.motivation) {
      localStorage.setItem('onboarding_goals', JSON.stringify(form));
      navigate('/onboarding/photo');
    }
  };

  const handleBack = () => {
    navigate('/onboarding/workout-preferences');
  };

  const goalGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: spacing.sm,
    marginTop: spacing.sm,
  };

  const goalButtonStyles = (isSelected) => ({
    padding: spacing.sm,
    border: `2px solid ${isSelected ? colors.primary[500] : colors.border.primary}`,
    borderRadius: spacing.sm,
    backgroundColor: isSelected ? colors.primary[50] : colors.background.primary,
    color: isSelected ? colors.primary[700] : colors.text.primary,
    cursor: 'pointer',
    fontSize: typography.fontSize.sm,
    textAlign: 'center',
    transition: 'all 0.2s ease',
  });

  return (
    <div style={containerStyles}>
      <h1 style={titleStyles}>Your Goals</h1>
      <p style={subtitleStyles}>What do you want to achieve?</p>
      
      <div style={formStyles}>
        <Select
          label="Primary Goal"
          name="primaryGoal"
          value={form.primaryGoal}
          onChange={handleInputChange}
          options={primaryGoalOptions}
        />
        
        {form.primaryGoal === 'lose_fat' && (
          <Input
            label="Target Weight (kg)"
            name="targetWeight"
            type="number"
            value={form.targetWeight}
            onChange={handleInputChange}
            placeholder="65"
          />
        )}
        
        <div>
          <label style={{
            display: 'block',
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.medium,
            color: colors.text.primary,
            marginBottom: spacing.xs,
          }}>
            Secondary Goals (Select all that apply)
          </label>
          <div style={goalGridStyles}>
            {secondaryGoalOptions.map(goal => (
              <div
                key={goal.value}
                style={goalButtonStyles(form.secondaryGoals.includes(goal.value))}
                onClick={() => handleSecondaryGoalChange(goal.value)}
              >
                {goal.label}
              </div>
            ))}
          </div>
        </div>
        
        <Select
          label="Timeline"
          name="timeline"
          value={form.timeline}
          onChange={handleInputChange}
          options={timelineOptions}
        />
        
        <Select
          label="Main Motivation"
          name="motivation"
          value={form.motivation}
          onChange={handleInputChange}
          options={motivationOptions}
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

export default GoalsStep;
