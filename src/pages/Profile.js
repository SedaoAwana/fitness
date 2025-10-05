import React, { useState } from 'react';
import { colors, spacing, typography } from '../design-tokens';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';
import Select from '../components/atoms/Select';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { user, userProfile } = useAuth();
  const [profile, setProfile] = useState({
    name: userProfile?.full_name || user?.email || '',
    age: userProfile?.age || '',
    gender: userProfile?.gender || '',
    weight: userProfile?.weight || '',
    height: userProfile?.height || '',
    goal: userProfile?.goal || '',
    experience_level: userProfile?.experience_level || '',
    workout_location: userProfile?.workout_location || '',
    time_available: userProfile?.time_available || '',
  });

  const containerStyles = {
    maxWidth: '800px',
    margin: '0 auto',
  };

  const headerStyles = {
    marginBottom: spacing.xl,
  };

  const titleStyles = {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  };

  const subtitleStyles = {
    fontSize: typography.fontSize.lg,
    color: colors.text.secondary,
  };

  const formStyles = {
    backgroundColor: colors.background.secondary,
    border: `1px solid ${colors.border.primary}`,
    borderRadius: spacing.md,
    padding: spacing.lg,
  };

  const formRowStyles = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: spacing.md,
    marginBottom: spacing.md,
  };

  const sectionStyles = {
    marginBottom: spacing.xl,
  };

  const sectionTitleStyles = {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: spacing.lg,
    paddingBottom: spacing.sm,
    borderBottom: `1px solid ${colors.border.primary}`,
  };

  const handleInputChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveProfile = () => {
    // TODO: Implement profile saving logic
    console.log('Saving profile:', profile);
    alert('Profile saved successfully!');
  };

  const genderOptions = [
    { value: '', label: 'Select gender' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
  ];

  const goalOptions = [
    { value: '', label: 'Select goal' },
    { value: 'weight_loss', label: 'Weight Loss' },
    { value: 'muscle_gain', label: 'Muscle Gain' },
    { value: 'strength', label: 'Strength' },
    { value: 'endurance', label: 'Endurance' },
    { value: 'general_fitness', label: 'General Fitness' },
  ];

  const experienceOptions = [
    { value: '', label: 'Select experience level' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
  ];

  const locationOptions = [
    { value: '', label: 'Select workout location' },
    { value: 'home', label: 'Home' },
    { value: 'gym', label: 'Gym' },
    { value: 'outdoor', label: 'Outdoor' },
    { value: 'mixed', label: 'Mixed' },
  ];

  const timeOptions = [
    { value: '', label: 'Select available time' },
    { value: '15-30', label: '15-30 minutes' },
    { value: '30-45', label: '30-45 minutes' },
    { value: '45-60', label: '45-60 minutes' },
    { value: '60+', label: '60+ minutes' },
  ];

  return (
    <div style={containerStyles}>
      <div style={headerStyles}>
        <h1 style={titleStyles}>Profile & Settings</h1>
        <p style={subtitleStyles}>
          Manage your profile information and app preferences.
        </p>
      </div>

      <div style={formStyles}>
        <div style={sectionStyles}>
          <h3 style={sectionTitleStyles}>Personal Information</h3>
          
          <div style={formRowStyles}>
            <Input
              label="Full Name"
              name="name"
              value={profile.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
            />
            <Input
              label="Age"
              name="age"
              type="number"
              value={profile.age}
              onChange={handleInputChange}
              placeholder="Age"
            />
          </div>
          
          <div style={formRowStyles}>
            <Select
              label="Gender"
              name="gender"
              value={profile.gender}
              onChange={handleInputChange}
              options={genderOptions}
            />
            <Select
              label="Primary Goal"
              name="goal"
              value={profile.goal}
              onChange={handleInputChange}
              options={goalOptions}
            />
          </div>
        </div>

        <div style={sectionStyles}>
          <h3 style={sectionTitleStyles}>Physical Information</h3>
          
          <div style={formRowStyles}>
            <Input
              label="Weight (kg)"
              name="weight"
              type="number"
              value={profile.weight}
              onChange={handleInputChange}
              placeholder="weight in kg"
            />
            <Input
              label="Height (cm)"
              name="height"
              type="number"
              value={profile.height}
              onChange={handleInputChange}
              placeholder="height in cm"
            />
          </div>
        </div>

        <div style={sectionStyles}>
          <h3 style={sectionTitleStyles}>Workout Preferences</h3>
          
          <div style={formRowStyles}>
            <Select
              label="Experience Level"
              name="experience_level"
              value={profile.experience_level}
              onChange={handleInputChange}
              options={experienceOptions}
            />
            <Select
              label="Workout Location"
              name="workout_location"
              value={profile.workout_location}
              onChange={handleInputChange}
              options={locationOptions}
            />
          </div>
          
          <div style={{ marginBottom: spacing.md }}>
            <Select
              label="Time Available per Session"
              name="time_available"
              value={profile.time_available}
              onChange={handleInputChange}
              options={timeOptions}
            />
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: spacing.xl }}>
          <Button onClick={handleSaveProfile} style={{ minWidth: '200px' }}>
            Save Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
