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
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: '',
    goal: '',
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
      id: 'goals',
      title: 'Your Goals',
      subtitle: 'What do you want to achieve?',
    },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

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
                }
              ]}
            />
            <StepNavigation
              onBack={prevStep}
              onNext={nextStep}
              canProceed={form.name && form.age}
              currentStep={currentStep}
              totalSteps={steps.length}
              nextButtonText="Continue"
            />
          </>
        );

      case 2: // Goals
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
                    { value: 'improve health', label: 'Improve Health' }
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
              nextButtonText="Get My Plan"
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
            <Button
              onClick={() => setCurrentStep(0)}
              variant="primary"
              size="lg"
            >
              Start Over
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
      {renderStep()}
    </div>
  );
};

export default FitnessAppSimple;
