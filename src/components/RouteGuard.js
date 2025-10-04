import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { colors, spacing, typography } from '../design-tokens';

const RouteGuard = ({ children, requireOnboarding = false }) => {
  const { user, userProfile, loading } = useAuth();
  const location = useLocation();

  console.log('🛡️ RouteGuard:', {
    pathname: location.pathname,
    requireOnboarding,
    user: user?.id,
    userProfile: userProfile ? 'exists' : 'null',
    onboardingComplete: userProfile?.onboarding_complete,
    loading
  });

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
          color: colors.text.secondary,
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
  if (requireOnboarding && (!userProfile || !userProfile.onboarding_complete)) {
    console.log('🛡️ Redirecting to onboarding - profile missing or incomplete');
    return <Navigate to="/onboarding" replace />;
  }

  // If user is on onboarding but has already completed it, redirect to dashboard
  if (location.pathname === '/onboarding' && userProfile?.onboarding_complete) {
    return <Navigate to="/dashboard" replace />;
  }

  // If user has no profile at all, redirect to onboarding (except if already on onboarding)
  if (!userProfile && !location.pathname.startsWith('/onboarding')) {
    console.log('🛡️ No profile found, redirecting to onboarding');
    return <Navigate to="/onboarding" replace />;
  }

  return children;
};

export default RouteGuard;
