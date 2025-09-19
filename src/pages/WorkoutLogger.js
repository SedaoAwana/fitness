import React, { useState } from 'react';
import { colors, spacing, typography } from '../design-tokens';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';
import Select from '../components/atoms/Select';

const WorkoutLogger = () => {
  const [workouts, setWorkouts] = useState([]);
  const [newWorkout, setNewWorkout] = useState({
    name: '',
    date: new Date().toISOString().split('T')[0],
    duration: '',
    exercises: [],
  });

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

  const formStyles = {
    backgroundColor: colors.background.secondary,
    border: `1px solid ${colors.border.primary}`,
    borderRadius: spacing.md,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  };

  const formRowStyles = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: spacing.md,
    marginBottom: spacing.md,
  };

  const workoutListStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
  };

  const workoutCardStyles = {
    backgroundColor: colors.background.secondary,
    border: `1px solid ${colors.border.primary}`,
    borderRadius: spacing.md,
    padding: spacing.lg,
  };

  const handleInputChange = (e) => {
    setNewWorkout({
      ...newWorkout,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddWorkout = () => {
    if (newWorkout.name && newWorkout.date) {
      setWorkouts([...workouts, { ...newWorkout, id: Date.now() }]);
      setNewWorkout({
        name: '',
        date: new Date().toISOString().split('T')[0],
        duration: '',
        exercises: [],
      });
    }
  };

  return (
    <div style={containerStyles}>
      <div style={headerStyles}>
        <h1 style={titleStyles}>Workout Logger</h1>
        <p style={subtitleStyles}>
          Track your workouts and monitor your progress over time.
        </p>
      </div>

      <div style={formStyles}>
        <h3 style={{ marginBottom: spacing.lg, color: colors.text.primary }}>
          Add New Workout
        </h3>
        
        <div style={formRowStyles}>
          <Input
            label="Workout Name"
            name="name"
            value={newWorkout.name}
            onChange={handleInputChange}
            placeholder="e.g., Upper Body Strength"
          />
          <Input
            label="Date"
            name="date"
            type="date"
            value={newWorkout.date}
            onChange={handleInputChange}
          />
        </div>
        
        <div style={formRowStyles}>
          <Input
            label="Duration (minutes)"
            name="duration"
            type="number"
            value={newWorkout.duration}
            onChange={handleInputChange}
            placeholder="60"
          />
          <div style={{ display: 'flex', alignItems: 'end' }}>
            <Button onClick={handleAddWorkout} style={{ width: '100%' }}>
              Add Workout
            </Button>
          </div>
        </div>
      </div>

      <div style={workoutListStyles}>
        <h3 style={{ marginBottom: spacing.lg, color: colors.text.primary }}>
          Recent Workouts
        </h3>
        
        {workouts.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: spacing.xl,
            color: colors.text.secondary,
          }}>
            <div style={{ fontSize: typography.fontSize['2xl'], marginBottom: spacing.md }}>
              💪
            </div>
            <p>No workouts logged yet. Start by adding your first workout!</p>
          </div>
        ) : (
          workouts.map((workout) => (
            <div key={workout.id} style={workoutCardStyles}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: spacing.sm,
              }}>
                <h4 style={{
                  fontSize: typography.fontSize.lg,
                  fontWeight: typography.fontWeight.semibold,
                  color: colors.text.primary,
                  margin: 0,
                }}>
                  {workout.name}
                </h4>
                <span style={{
                  fontSize: typography.fontSize.sm,
                  color: colors.text.secondary,
                }}>
                  {new Date(workout.date).toLocaleDateString()}
                </span>
              </div>
              {workout.duration && (
                <p style={{
                  fontSize: typography.fontSize.sm,
                  color: colors.text.secondary,
                  margin: 0,
                }}>
                  Duration: {workout.duration} minutes
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WorkoutLogger;
