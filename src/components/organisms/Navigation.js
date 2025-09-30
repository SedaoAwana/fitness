import React, { memo, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../atoms/Button';
import { colors, spacing, typography } from '../../design-tokens';

const Navigation = memo(() => {
  const { user, signOut } = useAuth();
  const location = useLocation();

  const navItems = useMemo(() => [
    { path: '/dashboard', label: 'Dashboard', icon: '🏠' },
    { path: '/workouts', label: 'Workouts', icon: '💪' },
    { path: '/progress', label: 'Progress', icon: '📸' },
    { path: '/reports', label: 'Reports', icon: '📊' },
    { path: '/profile', label: 'Profile', icon: '👤' },
  ], []);

  const handleSignOut = async () => {
    await signOut();
  };

  const containerStyles = {
    width: '250px',
    backgroundColor: colors.background.secondary,
    borderRight: `1px solid ${colors.border.primary}`,
    padding: spacing.lg,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  };

  const brandStyles = {
    marginBottom: spacing.xl,
    textAlign: 'center',
  };

  const brandTitleStyles = {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    margin: 0,
  };

  const navLinksStyles = {
    flex: 1,
    marginBottom: spacing.xl,
  };

  const navLinkStyles = {
    display: 'flex',
    alignItems: 'center',
    padding: `${spacing.md} ${spacing.sm}`,
    margin: `${spacing.xs} 0`,
    textDecoration: 'none',
    color: colors.text.secondary,
    borderRadius: spacing.sm,
    transition: 'all 0.2s ease',
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
  };

  const activeNavLinkStyles = {
    ...navLinkStyles,
    backgroundColor: colors.primary[500],
    color: colors.text.inverse,
  };

  const navIconStyles = {
    marginRight: spacing.sm,
    fontSize: typography.fontSize.lg,
  };

  const navUserStyles = {
    borderTop: `1px solid ${colors.border.primary}`,
    paddingTop: spacing.lg,
  };

  const userInfoStyles = {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: spacing.md,
    textAlign: 'center',
  };

  return (
    <nav style={containerStyles}>
      <div style={brandStyles}>
        <h2 style={brandTitleStyles}>🏋️‍♀️ Fitness App</h2>
      </div>
      
      <div style={navLinksStyles}>
        {navItems.map(item => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              style={isActive ? activeNavLinkStyles : navLinkStyles}
            >
              <span style={navIconStyles}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </div>
      
      <div style={navUserStyles}>
        <div style={userInfoStyles}>
          Welcome, {user?.email}
        </div>
        <Button 
          onClick={handleSignOut} 
          variant="secondary"
          style={{ width: '100%' }}
        >
          Sign Out
        </Button>
      </div>
    </nav>
  );
});

Navigation.displayName = 'Navigation';

export default Navigation;
