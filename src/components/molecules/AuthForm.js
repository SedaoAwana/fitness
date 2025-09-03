import React, { useState } from 'react';
import FormField from './FormField';
import Button from '../atoms/Button';
import ErrorMessage from '../atoms/ErrorMessage';
import { spacing, typography } from '../../design-tokens';

const AuthForm = ({ 
  type = 'signin', // 'signin' or 'signup'
  onSubmit,
  loading = false,
  error = null,
  style,
  ...props 
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
  });
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    // Full name validation for signup
    if (type === 'signup' && !formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const submitData = type === 'signup' 
      ? { email: formData.email, password: formData.password, fullName: formData.fullName }
      : { email: formData.email, password: formData.password };

    await onSubmit(submitData);
  };

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.lg,
    width: '100%',
    ...style,
  };

  const titleStyles = {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    textAlign: 'center',
    marginBottom: spacing.md,
    fontFamily: typography.fontFamily.primary,
  };

  const subtitleStyles = {
    fontSize: typography.fontSize.base,
    textAlign: 'center',
    marginBottom: spacing.xxl,
    fontFamily: typography.fontFamily.primary,
  };

  return (
    <form onSubmit={handleSubmit} style={containerStyles} {...props}>
      <h2 style={titleStyles}>
        {type === 'signup' ? 'Create Account' : 'Welcome Back'}
      </h2>
      <p style={subtitleStyles}>
        {type === 'signup' 
          ? 'Join us to save your fitness journey' 
          : 'Sign in to continue your fitness journey'
        }
      </p>

      <ErrorMessage message={error} visible={!!error} />

      {type === 'signup' && (
        <FormField
          name="fullName"
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={handleChange}
          required
          error={validationErrors.fullName}
        />
      )}

      <FormField
        name="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        required
        error={validationErrors.email}
      />

      <FormField
        name="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
        required
        error={validationErrors.password}
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        disabled={loading}
      >
        {loading 
          ? 'Loading...' 
          : (type === 'signup' ? 'Create Account' : 'Sign In')
        }
      </Button>
    </form>
  );
};

export default AuthForm;
