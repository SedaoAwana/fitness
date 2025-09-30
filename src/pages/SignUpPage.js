import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '../components/molecules/AuthForm';
import Button from '../components/atoms/Button';
import { useAuth } from '../contexts/AuthContext';
import { colors, spacing, typography } from '../design-tokens';

const SignUpPage = ({ style, ...props }) => {
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await signUp(formData.email, formData.password, formData.fullName);
      
      if (!result.success) {
        setError(result.error);
      } else if (result.needsEmailVerification) {
        // Show success message for email verification
        setError(null);
        setShowVerificationMessage(true);
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

  if (showVerificationMessage) {
    return (
      <div style={containerStyles} {...props}>
        <div style={formContainerStyles}>
          <div style={{
            textAlign: 'center',
            padding: spacing.xl,
            backgroundColor: colors.background.secondary,
            borderRadius: '8px',
            border: `1px solid ${colors.primary[200]}`,
          }}>
            <div style={{
              fontSize: typography.fontSize['4xl'],
              marginBottom: spacing.lg,
            }}>
              📧
            </div>
            <h2 style={{
              fontSize: typography.fontSize['2xl'],
              fontWeight: typography.fontWeight.bold,
              marginBottom: spacing.md,
              color: colors.text.primary,
            }}>
              Check Your Email
            </h2>
            <p style={{
              fontSize: typography.fontSize.base,
              color: colors.text.secondary,
              marginBottom: spacing.lg,
              lineHeight: 1.6,
            }}>
              We've sent you a verification link. Please check your email and click the link to complete your registration.
            </p>
            <p style={{
              fontSize: typography.fontSize.sm,
              color: colors.text.tertiary,
              marginBottom: spacing.xl,
            }}>
              After verification, you'll be redirected to sign in.
            </p>
            <Button
              variant="secondary"
              onClick={() => setShowVerificationMessage(false)}
            >
              Back to Sign Up
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
          <Link 
            to="/signin"
            style={linkStyles}
          >
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
