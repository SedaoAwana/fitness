import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import FitnessAppAtomic from './FitnessAppAtomic';
import AuthPage from './pages/AuthPage';
import { colors, spacing, typography } from '../design-tokens';

const AppContent = () => {
  const { user, loading, isAuthenticated } = useAuth();

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
          <p>Loading your fitness journey...</p>
        </div>
      </div>
    );
  }

  // Show authentication page if user is not authenticated
  if (!isAuthenticated) {
    return <AuthPage />;
  }

  // Show main fitness app if user is authenticated
  return <FitnessAppAtomic />;
};

export default AppContent;
