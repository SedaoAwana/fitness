import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors, spacing, typography } from '../design-tokens';

const EmailVerificationSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to signin after 3 seconds
    const timer = setTimeout(() => {
      navigate('/signin');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const containerStyles = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
    padding: spacing.lg,
  };

  const cardStyles = {
    textAlign: 'center',
    padding: spacing.xxl,
    backgroundColor: colors.background.secondary,
    borderRadius: '12px',
    border: `1px solid ${colors.success[200]}`,
    maxWidth: '400px',
    width: '100%',
  };

  return (
    <div style={containerStyles}>
      <div style={cardStyles}>
        <div style={{
          fontSize: typography.fontSize['6xl'],
          marginBottom: spacing.lg,
        }}>
          ✅
        </div>
        <h1 style={{
          fontSize: typography.fontSize['3xl'],
          fontWeight: typography.fontWeight.bold,
          marginBottom: spacing.md,
          color: colors.text.primary,
        }}>
          Email Verified!
        </h1>
        <p style={{
          fontSize: typography.fontSize.base,
          color: colors.text.secondary,
          marginBottom: spacing.lg,
          lineHeight: 1.6,
        }}>
          Your email has been successfully verified. You can now sign in to your account.
        </p>
        <p style={{
          fontSize: typography.fontSize.sm,
          color: colors.text.tertiary,
        }}>
          Redirecting to sign in page...
        </p>
      </div>
    </div>
  );
};

export default EmailVerificationSuccess;
