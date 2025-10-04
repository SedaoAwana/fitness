import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors, spacing, typography } from '../../design-tokens';
import Button from '../atoms/Button';
import Select from '../atoms/Select';

const WorkoutPreferencesStep = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    workoutLocation: '',
    workoutFrequency: '',
    workoutDuration: '',
    experienceLevel: '',
    availableEquipment: [],
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

  const workoutLocationOptions = [
    { value: '', label: 'Select workout location' },
    { value: 'home', label: 'Home (No equipment)' },
    { value: 'home_gym', label: 'Home Gym (Basic equipment)' },
    { value: 'gym', label: 'Commercial Gym' },
    { value: 'outdoor', label: 'Outdoor (Park, running)' },
    { value: 'classes', label: 'Group Classes' },
    { value: 'mixed', label: 'Mixed (Multiple locations)' },
  ];

  const workoutFrequencyOptions = [
    { value: '', label: 'Select workout frequency' },
    { value: '2', label: '2 days per week' },
    { value: '3', label: '3 days per week' },
    { value: '4', label: '4 days per week' },
    { value: '5', label: '5 days per week' },
    { value: '6', label: '6 days per week' },
    { value: '7', label: '7 days per week' },
  ];

  const workoutDurationOptions = [
    { value: '', label: 'Select workout duration' },
    { value: '15', label: '15 minutes' },
    { value: '30', label: '30 minutes' },
    { value: '45', label: '45 minutes' },
    { value: '60', label: '1 hour' },
    { value: '90', label: '1.5 hours' },
    { value: '120', label: '2+ hours' },
  ];

  const experienceLevelOptions = [
    { value: '', label: 'Select experience level' },
    { value: 'beginner', label: 'Beginner (New to fitness)' },
    { value: 'intermediate', label: 'Intermediate (Some experience)' },
    { value: 'advanced', label: 'Advanced (Very experienced)' },
  ];

  const equipmentOptions = [
    { value: 'dumbbells', label: 'Dumbbells' },
    { value: 'barbell', label: 'Barbell' },
    { value: 'kettlebell', label: 'Kettlebell' },
    { value: 'resistance_bands', label: 'Resistance Bands' },
    { value: 'yoga_mat', label: 'Yoga Mat' },
    { value: 'pull_up_bar', label: 'Pull-up Bar' },
    { value: 'treadmill', label: 'Treadmill' },
    { value: 'bike', label: 'Exercise Bike' },
    { value: 'none', label: 'No Equipment' },
  ];

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleEquipmentChange = (equipment) => {
    setForm(prev => ({
      ...prev,
      availableEquipment: prev.availableEquipment.includes(equipment)
        ? prev.availableEquipment.filter(item => item !== equipment)
        : [...prev.availableEquipment, equipment]
    }));
  };

  const handleNext = () => {
    if (form.workoutLocation && form.workoutFrequency && form.workoutDuration && form.experienceLevel) {
      localStorage.setItem('onboarding_workout_preferences', JSON.stringify(form));
      navigate('/onboarding/goals');
    }
  };

  const handleBack = () => {
    navigate('/onboarding/lifestyle');
  };

  const equipmentGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: spacing.sm,
    marginTop: spacing.sm,
  };

  const equipmentButtonStyles = (isSelected) => ({
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
      <h1 style={titleStyles}>Workout Preferences</h1>
      <p style={subtitleStyles}>How do you like to exercise?</p>
      
      <div style={formStyles}>
        <Select
          label="Where do you prefer to workout?"
          name="workoutLocation"
          value={form.workoutLocation}
          onChange={handleInputChange}
          options={workoutLocationOptions}
        />
        
        <Select
          label="How many days per week?"
          name="workoutFrequency"
          value={form.workoutFrequency}
          onChange={handleInputChange}
          options={workoutFrequencyOptions}
        />
        
        <Select
          label="How long per session?"
          name="workoutDuration"
          value={form.workoutDuration}
          onChange={handleInputChange}
          options={workoutDurationOptions}
        />
        
        <Select
          label="Experience Level"
          name="experienceLevel"
          value={form.experienceLevel}
          onChange={handleInputChange}
          options={experienceLevelOptions}
        />
        
        <div>
          <label style={{
            display: 'block',
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.medium,
            color: colors.text.primary,
            marginBottom: spacing.xs,
          }}>
            Available Equipment (Select all that apply)
          </label>
          <div style={equipmentGridStyles}>
            {equipmentOptions.map(equipment => (
              <div
                key={equipment.value}
                style={equipmentButtonStyles(form.availableEquipment.includes(equipment.value))}
                onClick={() => handleEquipmentChange(equipment.value)}
              >
                {equipment.label}
              </div>
            ))}
          </div>
        </div>
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

export default WorkoutPreferencesStep;
