import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { colors, spacing, typography } from '../design-tokens';

const RouteGuard = ({ children, requireOnboarding = false }) => {
  const { user, userProfile, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background.primary,
        fontFamily: typography.fontFamily.primary,
      }}>
        <div style={{
          textAlign: 'center',
          color: colors.neutral[500],
        }}>
          <div style={{
            fontSize: typography.fontSize['4xl'],
            marginBottom: spacing.md,
          }}>
            🏋️‍♀️
          </div>
          <div style={{
            fontSize: typography.fontSize.lg,
            fontWeight: typography.fontWeight.medium,
          }}>
            Loading...
          </div>
        </div>
      </div>
    );
  }

  // Redirect to signin if not authenticated
  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // If onboarding is required but not completed, redirect to onboarding
  if (requireOnboarding && !userProfile?.onboarding_complete) {
    return <Navigate to="/onboarding" replace />;
  }

  // If user is on onboarding but has already completed it, redirect to dashboard
  if (location.pathname === '/onboarding' && userProfile?.onboarding_complete) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RouteGuard;
