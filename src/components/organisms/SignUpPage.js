import React, { useState } from 'react';
import AuthForm from '../molecules/AuthForm';
import Button from '../atoms/Button';
import { useAuth } from '../../contexts/AuthContext';
import { colors, spacing, typography } from '../../design-tokens';

const SignUpPage = ({ onSwitchToSignIn, style, ...props }) => {
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await signUp(formData.email, formData.password, formData.fullName);
      
      if (!result.success) {
        setError(result.error);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const containerStyles = {
    padding: spacing.lg,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
    ...style,
  };

  const formContainerStyles = {
    width: '100%',
    maxWidth: '400px',
  };

  const switchTextStyles = {
    textAlign: 'center',
    marginTop: spacing.lg,
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.primary,
  };

  const linkStyles = {
    color: colors.primary[500],
    textDecoration: 'none',
    fontWeight: typography.fontWeight.semibold,
    cursor: 'pointer',
  };

  return (
    <div style={containerStyles} {...props}>
      <div style={formContainerStyles}>
        <AuthForm
          type="signup"
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
        />
        
        <div style={switchTextStyles}>
          Already have an account?{' '}
          <span 
            style={linkStyles}
            onClick={onSwitchToSignIn}
          >
            Sign in here
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
