import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './organisms/Navigation';
import { colors } from '../design-tokens';

const Layout = () => {
  const containerStyles = {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: colors.background.primary,
  };

  const mainContentStyles = {
    flex: 1,
    padding: '2rem',
    overflowY: 'auto',
    backgroundColor: colors.background.primary,
  };

  return (
    <div style={containerStyles}>
      <Navigation />
      <main style={mainContentStyles}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
