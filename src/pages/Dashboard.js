import React from 'react';
import { Link } from 'react-router-dom';
import { colors, spacing, typography } from '../design-tokens';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { userProfile } = useAuth();

  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const headerStyles = {
    marginBottom: spacing.xl,
  };

  const titleStyles = {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  };

  const subtitleStyles = {
    fontSize: typography.fontSize.lg,
    color: colors.text.secondary,
  };

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: spacing.lg,
    marginBottom: spacing.xl,
  };

  const cardStyles = {
    backgroundColor: colors.background.secondary,
    border: `1px solid ${colors.border.primary}`,
    borderRadius: spacing.md,
    padding: spacing.lg,
    textDecoration: 'none',
    color: 'inherit',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
  };

  const cardHoverStyles = {
    ...cardStyles,
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  };

  const cardIconStyles = {
    fontSize: typography.fontSize['2xl'],
    marginBottom: spacing.md,
  };

  const cardTitleStyles = {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  };

  const cardDescriptionStyles = {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    lineHeight: 1.5,
  };

  const statsGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: spacing.md,
    marginTop: spacing.xl,
  };

  const statCardStyles = {
    backgroundColor: colors.background.secondary,
    border: `1px solid ${colors.border.primary}`,
    borderRadius: spacing.md,
    padding: spacing.lg,
    textAlign: 'center',
  };

  const statValueStyles = {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.primary[500],
    marginBottom: spacing.xs,
  };

  const statLabelStyles = {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  };

  const dashboardCards = [
    {
      path: '/workouts',
      icon: '💪',
      title: 'Workout Logger',
      description: 'Log your workouts, track exercises, and monitor your progress over time.',
    },
    {
      path: '/progress',
      icon: '📸',
      title: 'Progress Photos',
      description: 'Upload and track your progress photos to visualize your transformation.',
    },
    {
      path: '/reports',
      icon: '📊',
      title: 'Monthly Reports',
      description: 'View comprehensive reports of your fitness journey and achievements.',
    },
    {
      path: '/profile',
      icon: '👤',
      title: 'Profile & Settings',
      description: 'Manage your profile information and app preferences.',
    },
  ];

  const stats = [
    { label: 'Total Workouts', value: '0' },
    { label: 'This Month', value: '0' },
    { label: 'Progress Photos', value: '0' },
    { label: 'Days Active', value: '0' },
  ];

  return (
    <div style={containerStyles}>
      <div style={headerStyles}>
        <h1 style={titleStyles}>Welcome back!</h1>
        <p style={subtitleStyles}>
          Ready to continue your fitness journey? Let's make today count.
        </p>
      </div>

      <div style={gridStyles}>
        {dashboardCards.map((card) => (
          <Link
            key={card.path}
            to={card.path}
            style={cardStyles}
            onMouseEnter={(e) => {
              Object.assign(e.target.style, cardHoverStyles);
            }}
            onMouseLeave={(e) => {
              Object.assign(e.target.style, cardStyles);
            }}
          >
            <div style={cardIconStyles}>{card.icon}</div>
            <h3 style={cardTitleStyles}>{card.title}</h3>
            <p style={cardDescriptionStyles}>{card.description}</p>
          </Link>
        ))}
      </div>

      <div style={statsGridStyles}>
        {stats.map((stat) => (
          <div key={stat.label} style={statCardStyles}>
            <div style={statValueStyles}>{stat.value}</div>
            <div style={statLabelStyles}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
