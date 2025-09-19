import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { colors, spacing, typography } from '../design-tokens';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

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

  if (!user) {
    // Redirect to signin page with return url
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
