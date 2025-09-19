import React, { useState } from 'react';
import { colors, spacing, typography } from '../design-tokens';
import Select from '../components/atoms/Select';

const MonthlyReports = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

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

  const filterStyles = {
    backgroundColor: colors.background.secondary,
    border: `1px solid ${colors.border.primary}`,
    borderRadius: spacing.md,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  };

  const statsGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: spacing.lg,
    marginBottom: spacing.xl,
  };

  const statCardStyles = {
    backgroundColor: colors.background.secondary,
    border: `1px solid ${colors.border.primary}`,
    borderRadius: spacing.md,
    padding: spacing.lg,
    textAlign: 'center',
  };

  const statValueStyles = {
    fontSize: typography.fontSize['3xl'],
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

  const chartPlaceholderStyles = {
    backgroundColor: colors.background.secondary,
    border: `1px solid ${colors.border.primary}`,
    borderRadius: spacing.md,
    padding: spacing.xl,
    textAlign: 'center',
    color: colors.text.secondary,
  };

  const generateMonthOptions = () => {
    const options = [];
    const currentDate = new Date();
    
    for (let i = 0; i < 12; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const value = date.toISOString().slice(0, 7);
      const label = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
      options.push({ value, label });
    }
    
    return options;
  };

  const mockStats = {
    totalWorkouts: 12,
    totalDuration: 720,
    averageWorkoutDuration: 60,
    mostActiveDay: 'Tuesday',
    favoriteExercise: 'Push-ups',
    progressPhotos: 4,
    consistency: 85,
  };

  return (
    <div style={containerStyles}>
      <div style={headerStyles}>
        <h1 style={titleStyles}>Monthly Reports</h1>
        <p style={subtitleStyles}>
          Track your progress and analyze your fitness journey with detailed monthly reports.
        </p>
      </div>

      <div style={filterStyles}>
        <h3 style={{ marginBottom: spacing.lg, color: colors.text.primary }}>
          Select Month
        </h3>
        <Select
          label="Month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          options={generateMonthOptions()}
        />
      </div>

      <div style={statsGridStyles}>
        <div style={statCardStyles}>
          <div style={statValueStyles}>{mockStats.totalWorkouts}</div>
          <div style={statLabelStyles}>Total Workouts</div>
        </div>
        
        <div style={statCardStyles}>
          <div style={statValueStyles}>{mockStats.totalDuration}</div>
          <div style={statLabelStyles}>Total Minutes</div>
        </div>
        
        <div style={statCardStyles}>
          <div style={statValueStyles}>{mockStats.averageWorkoutDuration}</div>
          <div style={statLabelStyles}>Avg Duration (min)</div>
        </div>
        
        <div style={statCardStyles}>
          <div style={statValueStyles}>{mockStats.consistency}%</div>
          <div style={statLabelStyles}>Consistency</div>
        </div>
      </div>

      <div style={chartPlaceholderStyles}>
        <div style={{ fontSize: typography.fontSize['2xl'], marginBottom: spacing.md }}>
          📊
        </div>
        <h3 style={{ marginBottom: spacing.md, color: colors.text.primary }}>
          Workout Frequency Chart
        </h3>
        <p>Chart visualization will be implemented here</p>
        <p style={{ fontSize: typography.fontSize.sm, marginTop: spacing.md }}>
          Most active day: {mockStats.mostActiveDay} | Favorite exercise: {mockStats.favoriteExercise}
        </p>
      </div>

      <div style={{ ...chartPlaceholderStyles, marginTop: spacing.lg }}>
        <div style={{ fontSize: typography.fontSize['2xl'], marginBottom: spacing.md }}>
          📈
        </div>
        <h3 style={{ marginBottom: spacing.md, color: colors.text.primary }}>
          Progress Summary
        </h3>
        <p>Progress tracking and insights will be displayed here</p>
        <p style={{ fontSize: typography.fontSize.sm, marginTop: spacing.md }}>
          Progress photos this month: {mockStats.progressPhotos}
        </p>
      </div>
    </div>
  );
};

export default MonthlyReports;
