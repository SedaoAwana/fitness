import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors, spacing, typography } from '../../design-tokens';
import Button from '../atoms/Button';
import Input from '../atoms/Input';

const PhysicalInfoStep = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    weight: '',
    height: '',
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

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    if (form.weight && form.height) {
      localStorage.setItem('onboarding_physical_info', JSON.stringify(form));
      navigate('/onboarding/lifestyle');
    }
  };

  const handleBack = () => {
    navigate('/onboarding/basic-info');
  };

  return (
    <div style={containerStyles}>
      <h1 style={titleStyles}>Physical Information</h1>
      <p style={subtitleStyles}>Help us understand your current state</p>
      
      <div style={formStyles}>
        <Input
          label="Weight (kg)"
          name="weight"
          type="number"
          value={form.weight}
          onChange={handleInputChange}
          placeholder="70"
        />
        
        <Input
          label="Height (cm)"
          name="height"
          type="number"
          value={form.height}
          onChange={handleInputChange}
          placeholder="175"
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

export default PhysicalInfoStep;
