import React from 'react';
import { Outlet } from 'react-router-dom';
import { colors, spacing } from '../design-tokens';

const OnboardingLayout = () => {
  const containerStyles = {
    minHeight: '100vh',
    backgroundColor: colors.background.primary,
    display: 'flex',
    flexDirection: 'column',
  };

  const headerStyles = {
    padding: spacing.lg,
    borderBottom: `1px solid ${colors.border.primary}`,
    backgroundColor: colors.background.secondary,
  };

  const brandStyles = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: colors.text.primary,
    margin: 0,
  };

  const contentStyles = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  };

  return (
    <div style={containerStyles}>
      <header style={headerStyles}>
        <h1 style={brandStyles}>🏋️‍♀️ Fitness App</h1>
      </header>
      <main style={contentStyles}>
        <Outlet />
      </main>
    </div>
  );
};

export default OnboardingLayout;
