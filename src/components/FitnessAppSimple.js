import React, { useState, useEffect } from 'react';
import { colors, spacing, typography } from '../design-tokens';
import Button from './atoms/Button';
import Input from './atoms/Input';
import Select from './atoms/Select';
import FormField from './molecules/FormField';
import WelcomeScreen from './organisms/WelcomeScreen';
import FormStep from './organisms/FormStep';
import StepNavigation from './organisms/StepNavigation';

const FitnessAppSimple = () => {
  const [currentStep, setCurrentStep] = useState(0);
  // Add authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState('signin'); // 'signin' or 'signup'
  const [authForm, setAuthForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: '',
    weight: '',
    height: '',
    work_situation: '',
    eating_habits: '',
    lifestyle: '',
    goal: '',
    workout_location: '',
    experience_level: '',
    time_available: '',
    injuries: '',
    photo: null,
  });

  const steps = [
    {
      id: 'welcome',
      title: 'Welcome to Your Fitness Journey',
      subtitle: 'Get your personalized plan in just a few minutes',
    },
    {
      id: 'basic-info',
      title: 'About You',
      subtitle: 'Tell us about yourself',
    },
    {
      id: 'physical-info',
      title: 'Physical Information',
      subtitle: 'Help us understand your current state',
    },
    {
      id: 'lifestyle',
      title: 'Lifestyle & Habits',
      subtitle: 'Tell us about your daily routine',
    },
    {
      id: 'workout-preferences',
      title: 'Workout Preferences',
      subtitle: 'How do you like to exercise?',
    },
    {
      id: 'goals',
      title: 'Your Goals',
      subtitle: 'What do you want to achieve?',
    },
    {
      id: 'photo',
      title: 'Add a Photo (Optional)',
      subtitle: 'Help us track your progress',
    },
  ];

  // Load form data from localStorage on component mount
  useEffect(() => {
    const savedForm = localStorage.getItem('fitnessFormProgress');
    if (savedForm) {
      try {
        setForm(JSON.parse(savedForm));
      } catch (error) {
        console.error('Error loading saved form data:', error);
      }
    }
  }, []);

  // Save form data to localStorage whenever form changes
  useEffect(() => {
    localStorage.setItem('fitnessFormProgress', JSON.stringify(form));
  }, [form]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, photo: file });
    }
  };

  // Add authentication handlers
  const handleAuthChange = (e) => {
    setAuthForm({ ...authForm, [e.target.name]: e.target.value });
    setAuthError(''); // Clear error when user types
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError('');

    try {
      if (authMode === 'signup') {
        // Validate signup
        if (authForm.password !== authForm.confirmPassword) {
          setAuthError('Passwords do not match');
          return;
        }
        if (authForm.password.length < 6) {
          setAuthError('Password must be at least 6 characters');
          return;
        }
        
        // Simulate signup (we'll replace this with Supabase later)
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Signing up:', authForm.email);
        
        // For now, just authenticate the user
        setIsAuthenticated(true);
        localStorage.setItem('fitnessAuth', JSON.stringify({
          isAuthenticated: true,
          user: { email: authForm.email, fullName: authForm.fullName }
        }));
        
      } else {
        // Simulate signin (we'll replace this with Supabase later)
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Signing in:', authForm.email);
        
        // For now, just authenticate the user
        setIsAuthenticated(true);
        localStorage.setItem('fitnessAuth', JSON.stringify({
          isAuthenticated: true,
          user: { email: authForm.email }
        }));
      }
    } catch (error) {
      setAuthError('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setForm({
      name: '',
      age: '',
      gender: '',
      weight: '',
      height: '',
      work_situation: '',
      eating_habits: '',
      lifestyle: '',
      goal: '',
      workout_location: '',
      experience_level: '',
      time_available: '',
      injuries: '',
      photo: null,
    });
    localStorage.removeItem('fitnessAuth');
    localStorage.removeItem('fitnessFormProgress');
    setCurrentStep(0);
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Add authentication screen render
  if (!isAuthenticated) {
    return (
      <div style={{
        fontFamily: typography.fontFamily.primary,
        backgroundColor: colors.background.primary,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.lg
      }}>
        <div style={{
          backgroundColor: colors.background.secondary,
          padding: spacing.xl,
          borderRadius: spacing.md,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          maxWidth: '400px',
          width: '100%'
        }}>
          <div style={{ textAlign: 'center', marginBottom: spacing.xl }}>
            <div style={{ fontSize: '3rem', marginBottom: spacing.md }}>🏋️‍♀️</div>
            <h1 style={{
              color: colors.neutral[900],
              marginBottom: spacing.sm,
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              {authMode === 'signup' ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p style={{
              color: colors.neutral[500],
              fontSize: '0.9rem'
            }}>
              {authMode === 'signup' 
                ? 'Start your fitness journey today' 
                : 'Sign in to continue your progress'
              }
            </p>
          </div>

          <form onSubmit={handleAuth}>
            {authMode === 'signup' && (
              <FormField
                label="Full Name"
                type="text"
                name="fullName"
                value={authForm.fullName}
                onChange={handleAuthChange}
                placeholder="Enter your full name"
                required={true}
                style={{ marginBottom: spacing.md }}
              />
            )}
            
            <FormField
              label="Email"
              type="email"
              name="email"
              value={authForm.email}
              onChange={handleAuthChange}
              placeholder="Enter your email"
              required={true}
              style={{ marginBottom: spacing.md }}
            />
            
            <FormField
              label="Password"
              type="password"
              name="password"
              value={authForm.password}
              onChange={handleAuthChange}
              placeholder="Enter your password"
              required={true}
              style={{ marginBottom: spacing.md }}
            />
            
            {authMode === 'signup' && (
              <FormField
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={authForm.confirmPassword}
                onChange={handleAuthChange}
                placeholder="Confirm your password"
                required={true}
                style={{ marginBottom: spacing.md }}
              />
            )}

            {authError && (
              <div style={{
                color: colors.error.primary,
                backgroundColor: colors.error.background,
                padding: spacing.sm,
                borderRadius: spacing.xs,
                marginBottom: spacing.md,
                fontSize: '0.9rem',
                textAlign: 'center'
              }}>
                {authError}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isLoading}
              style={{ width: '100%', marginBottom: spacing.md }}
            >
              {isLoading ? 'Loading...' : (authMode === 'signup' ? 'Create Account' : 'Sign In')}
            </Button>

            <div style={{ textAlign: 'center' }}>
              <button
                type="button"
                onClick={() => {
                  setAuthMode(authMode === 'signup' ? 'signin' : 'signup');
                  setAuthError('');
                  setAuthForm({ email: '', password: '', confirmPassword: '', fullName: '' });
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: colors.primary[600],
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  textDecoration: 'underline'
                }}
              >
                {authMode === 'signup' 
                  ? 'Already have an account? Sign in' 
                  : "Don't have an account? Sign up"
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    const step = steps[currentStep];
    
    switch (currentStep) {
      case 0: // Welcome
        return <WelcomeScreen onStart={nextStep} />;

      case 1: // Basic Info
        return (
          <>
            <FormStep
              title={step.title}
              subtitle={step.subtitle}
              fields={[
                {
                  label: "Name",
                  type: "text",
                  name: "name",
                  value: form.name,
                  onChange: handleChange,
                  placeholder: "Your full name",
                  required: true,
                },
                {
                  label: "Age",
                  type: "number",
                  name: "age",
                  value: form.age,
                  onChange: handleChange,
                  placeholder: "Your age",
                  required: true,
                },
                {
                  label: "Gender",
                  type: "select",
                  name: "gender",
                  value: form.gender,
                  onChange: handleChange,
                  placeholder: "Select your gender",
                  options: [
                    { value: 'male', label: 'Male' },
                    { value: 'female', label: 'Female' },
                    { value: 'other', label: 'Other' }
                  ],
                  required: true,
                }
              ]}
            />
            <StepNavigation
              onBack={prevStep}
              onNext={nextStep}
              canProceed={form.name && form.age && form.gender}
              currentStep={currentStep}
              totalSteps={steps.length}
              nextButtonText="Continue"
            />
          </>
        );

      case 2: // Physical Info
        return (
          <>
            <FormStep
              title={step.title}
              subtitle={step.subtitle}
              fields={[
                {
                  label: "Weight (kg)",
                  type: "number",
                  name: "weight",
                  value: form.weight,
                  onChange: handleChange,
                  placeholder: "Your weight in kg",
                  required: true,
                },
                {
                  label: "Height (cm)",
                  type: "number",
                  name: "height",
                  value: form.height,
                  onChange: handleChange,
                  placeholder: "Your height in cm",
                  required: true,
                }
              ]}
            />
            <StepNavigation
              onBack={prevStep}
              onNext={nextStep}
              canProceed={form.weight && form.height}
              currentStep={currentStep}
              totalSteps={steps.length}
              nextButtonText="Continue"
            />
          </>
        );

      case 3: // Lifestyle
        return (
          <>
            <FormStep
              title={step.title}
              subtitle={step.subtitle}
              fields={[
                {
                  label: "Work Situation",
                  type: "select",
                  name: "work_situation",
                  value: form.work_situation,
                  onChange: handleChange,
                  placeholder: "Select your work situation",
                  options: [
                    { value: 'sedentary', label: 'Mostly sitting (office job)' },
                    { value: 'light_activity', label: 'Light activity (teacher, retail)' },
                    { value: 'moderate_activity', label: 'Moderate activity (nurse, construction)' },
                    { value: 'very_active', label: 'Very active (athlete, manual labor)' }
                  ],
                  required: true,
                },
                {
                  label: "Eating Habits",
                  type: "select",
                  name: "eating_habits",
                  value: form.eating_habits,
                  onChange: handleChange,
                  placeholder: "Select your eating habits",
                  options: [
                    { value: 'very_healthy', label: 'Very healthy (meal prep, tracking)' },
                    { value: 'mostly_healthy', label: 'Mostly healthy (home cooking)' },
                    { value: 'sometimes_healthy', label: 'Sometimes healthy (mix of home and takeout)' },
                    { value: 'struggles_with_diet', label: 'Struggles with diet (mostly takeout)' }
                  ],
                  required: true,
                },
                {
                  label: "Lifestyle",
                  type: "select",
                  name: "lifestyle",
                  value: form.lifestyle,
                  onChange: handleChange,
                  placeholder: "Select your lifestyle",
                  options: [
                    { value: 'very_active', label: 'Very active (exercise 5+ times/week)' },
                    { value: 'moderately_active', label: 'Moderately active (exercise 2-4 times/week)' },
                    { value: 'lightly_active', label: 'Lightly active (exercise 1-2 times/week)' },
                    { value: 'sedentary', label: 'Sedentary (little to no exercise)' }
                  ],
                  required: true,
                }
              ]}
            />
            <StepNavigation
              onBack={prevStep}
              onNext={nextStep}
              canProceed={form.work_situation && form.eating_habits && form.lifestyle}
              currentStep={currentStep}
              totalSteps={steps.length}
              nextButtonText="Continue"
            />
          </>
        );

      case 4: // Workout Preferences
        return (
          <>
            <FormStep
              title={step.title}
              subtitle={step.subtitle}
              fields={[
                {
                  label: "Workout Location",
                  type: "select",
                  name: "workout_location",
                  value: form.workout_location,
                  onChange: handleChange,
                  placeholder: "Where do you prefer to work out?",
                  options: [
                    { value: 'home', label: 'At home (no equipment)' },
                    { value: 'home_gym', label: 'At home (with equipment)' },
                    { value: 'gym', label: 'At a gym' },
                    { value: 'outdoor', label: 'Outdoors' }
                  ],
                  required: true,
                },
                {
                  label: "Experience Level",
                  type: "select",
                  name: "experience_level",
                  value: form.experience_level,
                  onChange: handleChange,
                  placeholder: "What's your fitness experience?",
                  options: [
                    { value: 'beginner', label: 'Beginner (0-6 months)' },
                    { value: 'intermediate', label: 'Intermediate (6 months - 2 years)' },
                    { value: 'advanced', label: 'Advanced (2+ years)' }
                  ],
                  required: true,
                },
                {
                  label: "Time Available",
                  type: "select",
                  name: "time_available",
                  value: form.time_available,
                  onChange: handleChange,
                  placeholder: "How much time can you dedicate?",
                  options: [
                    { value: '30min', label: '30 minutes' },
                    { value: '45min', label: '45 minutes' },
                    { value: '60min', label: '60 minutes' },
                    { value: '90min', label: '90 minutes' }
                  ],
                  required: true,
                },
                {
                  label: "Injuries or Limitations",
                  type: "text",
                  name: "injuries",
                  value: form.injuries,
                  onChange: handleChange,
                  placeholder: "Any injuries or physical limitations? (optional)",
                  required: false,
                }
              ]}
            />
            <StepNavigation
              onBack={prevStep}
              onNext={nextStep}
              canProceed={form.workout_location && form.experience_level && form.time_available}
              currentStep={currentStep}
              totalSteps={steps.length}
              nextButtonText="Continue"
            />
          </>
        );

      case 5: // Goals
        return (
          <>
            <FormStep
              title={step.title}
              subtitle={step.subtitle}
              fields={[
                {
                  label: "What's your primary goal?",
                  type: "select",
                  name: "goal",
                  value: form.goal,
                  onChange: handleChange,
                  placeholder: "Select your goal",
                  options: [
                    { value: 'lose fat', label: 'Lose Fat' },
                    { value: 'build muscle', label: 'Build Muscle' },
                    { value: 'increase strength', label: 'Increase Strength' },
                    { value: 'improve health', label: 'Improve Health' },
                    { value: 'maintain fitness', label: 'Maintain Fitness' }
                  ],
                  required: true,
                }
              ]}
            />
            <StepNavigation
              onBack={prevStep}
              onNext={nextStep}
              canProceed={form.goal}
              currentStep={currentStep}
              totalSteps={steps.length}
              nextButtonText="Continue"
            />
          </>
        );

      case 6: // Photo Upload
        return (
          <>
            <FormStep
              title={step.title}
              subtitle={step.subtitle}
              fields={[
                {
                  label: "Upload Progress Photo",
                  type: "file",
                  name: "photo",
                  onChange: handlePhotoChange,
                  accept: "image/*",
                  required: false,
                }
              ]}
            />
            <StepNavigation
              onBack={prevStep}
              onNext={nextStep}
              canProceed={true} // Photo is optional
              currentStep={currentStep}
              totalSteps={steps.length}
              nextButtonText="Generate My Plan"
            />
          </>
        );

      default:
        return (
          <div style={{
            textAlign: 'center',
            padding: spacing.lg,
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: colors.background.primary,
          }}>
            <div style={{ fontSize: '4rem', marginBottom: spacing.lg }}>🎉</div>
            <h1 style={{
              color: colors.neutral[900],
              marginBottom: spacing.md,
              fontSize: '2rem',
              fontFamily: typography.fontFamily.primary,
              fontWeight: 'bold'
            }}>
              Plan Generated!
            </h1>
            <p style={{
              color: colors.neutral[500],
              fontSize: '1.1rem',
              marginBottom: spacing.xxl,
              fontFamily: typography.fontFamily.primary
            }}>
              Your personalized fitness plan is ready!
            </p>
            <div style={{ marginBottom: spacing.lg }}>
              <h3 style={{ color: colors.neutral[700], marginBottom: spacing.sm }}>Your Plan Summary:</h3>
              <div style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto' }}>
                <p><strong>Goal:</strong> {form.goal}</p>
                <p><strong>Workout Location:</strong> {form.workout_location}</p>
                <p><strong>Time Available:</strong> {form.time_available}</p>
                <p><strong>Experience Level:</strong> {form.experience_level}</p>
              </div>
            </div>
            <Button
              onClick={handleSignOut}
              variant="primary"
              size="lg"
            >
              Sign Out & Start Over
            </Button>
          </div>
        );
    }
  };

  return (
    <div style={{
      fontFamily: typography.fontFamily.primary,
      backgroundColor: colors.background.primary,
      minHeight: '100vh'
    }}>
      {/* Header with user info and sign out */}
      <div style={{
        backgroundColor: colors.background.secondary,
        padding: spacing.md,
        borderBottom: `1px solid ${colors.neutral[200]}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: colors.neutral[700] }}>
          🏋️‍♀️ Fitness App
        </div>
        <Button
          onClick={handleSignOut}
          variant="secondary"
          size="sm"
        >
          Sign Out
        </Button>
      </div>
      
      {renderStep()}
    </div>
  );
};

export default FitnessAppSimple;
