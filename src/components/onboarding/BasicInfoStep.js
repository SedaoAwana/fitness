import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors, spacing, typography } from '../../design-tokens';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Select from '../atoms/Select';

const BasicInfoStep = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: '',
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

  const genderOptions = [
    { value: '', label: 'Select gender' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
  ];

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    if (form.name && form.age && form.gender) {
      // Save to localStorage or context
      localStorage.setItem('onboarding_basic_info', JSON.stringify(form));
      navigate('/onboarding/physical-info');
    }
  };

  const handleBack = () => {
    navigate('/onboarding/welcome');
  };

  return (
    <div style={containerStyles}>
      <h1 style={titleStyles}>About You</h1>
      <p style={subtitleStyles}>Tell us about yourself</p>
      
      <div style={formStyles}>
        <Input
          label="Full Name"
          name="name"
          value={form.name}
          onChange={handleInputChange}
          placeholder="Enter your full name"
        />
        
        <Input
          label="Age"
          name="age"
          type="number"
          value={form.age}
          onChange={handleInputChange}
          placeholder="25"
        />
        
        <Select
          label="Gender"
          name="gender"
          value={form.gender}
          onChange={handleInputChange}
          options={genderOptions}
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

export default BasicInfoStep;
