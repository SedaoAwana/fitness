import React, { useState, useEffect } from 'react';
import ProgressBar from './molecules/ProgressBar';
import WelcomeScreen from './organisms/WelcomeScreen';
import FormStep from './organisms/FormStep';
import StepNavigation from './organisms/StepNavigation';
import Button from './atoms/Button';
import { colors, spacing, typography, borderRadius, shadows } from '../design-tokens';

const FitnessAppAtomic = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [photo, setPhoto] = useState(null);
  const [form, setForm] = useState(() => {
    // Load saved progress from localStorage for mobile persistence
    const saved = localStorage.getItem('fitnessFormProgress');
    return saved ? JSON.parse(saved) : {
      name: '',
      age: '',
      gender: '',
      weight: '',
      height: '',
      workSituation: '',
      eatingHabits: '',
      lifestyle: '',
      goal: '',
      workoutLocation: '',
      experienceLevel: '',
      timeAvailable: '',
      injuries: '',
    };
  });
  const [program, setProgram] = useState(null);

  // Auto-save form progress for mobile users
  useEffect(() => {
    localStorage.setItem('fitnessFormProgress', JSON.stringify(form));
  }, [form]);

  // Define mobile-optimized steps for progressive disclosure
  const steps = [
    {
      id: 'welcome',
      title: 'Your Fitness Journey',
      subtitle: 'Get your personalized plan in 3 minutes',
      type: 'welcome'
    },
    {
      id: 'basic-info',
      title: 'About You',
      subtitle: 'Basic information',
      type: 'form',
      fields: [
        {
          name: 'name',
          label: 'Name',
          type: 'text',
          placeholder: 'Your full name',
          required: true,
        },
        {
          name: 'age',
          label: 'Age',
          type: 'tel',
          placeholder: 'Your age',
          required: true,
        },
        {
          name: 'gender',
          label: 'Gender',
          type: 'select',
          placeholder: 'Select gender',
          required: true,
          options: [
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'other', label: 'Other' }
          ],
        }
      ]
    },
    {
      id: 'goals',
      title: 'Your Goals',
      subtitle: 'What do you want to achieve?',
      type: 'form',
      fields: [
        {
          name: 'goal',
          label: 'Fitness Goal',
          type: 'select',
          placeholder: 'What\'s your primary goal?',
          required: true,
          options: [
            { value: 'lose fat', label: 'Lose Fat' },
            { value: 'build muscle', label: 'Build Muscle' },
            { value: 'increase strength', label: 'Increase Strength' },
            { value: 'improve health', label: 'Improve Health' },
            { value: 'maintain fitness', label: 'Maintain Fitness' }
          ],
        },
        {
          name: 'experienceLevel',
          label: 'Experience Level',
          type: 'select',
          placeholder: 'Select experience level',
          required: true,
          options: [
            { value: 'beginner', label: 'Beginner (0-6 months)' },
            { value: 'intermediate', label: 'Intermediate (6 months - 2 years)' },
            { value: 'advanced', label: 'Advanced (2+ years)' }
          ],
        }
      ]
    },
    {
      id: 'measurements',
      title: 'Measurements',
      subtitle: 'Current stats',
      type: 'form',
      fields: [
        {
          name: 'weight',
          label: 'Current Weight',
          type: 'number',
          placeholder: 'Weight in kg',
          required: true,
        },
        {
          name: 'height',
          label: 'Height',
          type: 'number',
          placeholder: 'Height in cm',
          required: true,
        }
      ]
    },
    {
      id: 'lifestyle',
      title: 'Lifestyle',
      subtitle: 'How you live & work',
      type: 'form',
      fields: [
        {
          name: 'workSituation',
          label: 'Work Situation',
          type: 'text',
          placeholder: 'e.g., desk job, active job',
          required: false,
        },
        {
          name: 'lifestyle',
          label: 'Lifestyle',
          type: 'text',
          placeholder: 'e.g., sedentary, active',
          required: false,
        },
        {
          name: 'timeAvailable',
          label: 'Time Available',
          type: 'select',
          placeholder: 'Time per session?',
          required: true,
          options: [
            { value: '30min', label: '30 minutes' },
            { value: '45min', label: '45 minutes' },
            { value: '60min', label: '60 minutes' },
            { value: '90min', label: '90+ minutes' }
          ],
        }
      ]
    },
    {
      id: 'preferences',
      title: 'Preferences',
      subtitle: 'Where & how you exercise',
      type: 'form',
      fields: [
        {
          name: 'workoutLocation',
          label: 'Workout Location',
          type: 'select',
          placeholder: 'Where will you work out?',
          required: true,
          options: [
            { value: 'home', label: 'Home (No equipment)' },
            { value: 'home gym', label: 'Home Gym' },
            { value: 'gym', label: 'Commercial Gym' },
            { value: 'outdoor', label: 'Outdoor' }
          ],
        },
        {
          name: 'eatingHabits',
          label: 'Eating Habits',
          type: 'text',
          placeholder: 'e.g., 3 meals/day',
          required: false,
        },
        {
          name: 'injuries',
          label: 'Injuries/Limitations',
          type: 'text',
          placeholder: 'Any injuries? (optional)',
          required: false,
        }
      ]
    },
    {
      id: 'photo',
      title: 'Photo (Optional)',
      subtitle: 'Help us understand your starting point',
      type: 'photo'
    },
    {
      id: 'results',
      title: 'Your Plan',
      subtitle: 'Personalized fitness program',
      type: 'results'
    }
  ];

  // Simulate expert advice based on user input
  function generateProgram(data) {
    let expert = '';
    if (data.gender === 'female') {
      if (data.workoutLocation === 'home') expert = 'Kayla Itsines';
      else if (data.workoutLocation === 'gym') expert = 'Alexia Clark';
      else expert = 'Stephanie Buttermore';
    } else {
      if (data.workoutLocation === 'gym') expert = 'Brad Schoenfeld';
      else if (data.workoutLocation === 'home') expert = 'Recharged Personal Training';
      else expert = 'Jeff Nippard';
    }

    let plan = '';
    let frequency = '';
    
    if (data.goal === 'lose fat') {
      plan = 'Focus on HIIT, full-body circuits, and a calorie deficit. Include both cardio and strength training.';
      frequency = data.timeAvailable === '30min' ? '5-6 sessions/week' : '4-5 sessions/week';
    } else if (data.goal === 'build muscle') {
      plan = 'Emphasize progressive overload, compound lifts, and adequate protein intake. Focus on proper form and recovery.';
      frequency = data.experienceLevel === 'beginner' ? '3-4 sessions/week' : '4-5 sessions/week';
    } else if (data.goal === 'improve health') {
      plan = 'Mix cardio and resistance training, prioritize consistency and healthy habits. Include flexibility work.';
      frequency = '3-4 sessions/week';
    } else if (data.goal === 'increase strength') {
      plan = 'Focus on compound movements, progressive overload, and adequate rest between sets.';
      frequency = '3-4 sessions/week';
    }

    let tips = [
      'Track your progress weekly.',
      'Stay hydrated and aim for 7-9 hours of sleep.',
      'Adjust nutrition to support your goal.',
    ];

    if (data.injuries) {
      tips.push('Consult with a physical therapist about your injuries before starting.');
    }

    if (data.experienceLevel === 'beginner') {
      tips.push('Start slow and focus on proper form over intensity.');
    }

    return {
      expert,
      plan,
      frequency,
      tips,
    };
  }

  function handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (file) {
      // Optimize image for mobile performance
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          // Resize to max 800px for mobile performance
          const maxSize = 800;
          let { width, height } = img;
          if (width > height) {
            if (width > maxSize) {
              height = (height * maxSize) / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width = (width * maxSize) / height;
              height = maxSize;
            }
          }
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          setPhoto(canvas.toDataURL('image/jpeg', 0.8));
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function nextStep() {
    if (currentStep === steps.length - 2) { // Photo step
      const generated = generateProgram(form);
      setProgram(generated);
    }
    setCurrentStep(currentStep + 1);
  }

  function prevStep() {
    setCurrentStep(currentStep - 1);
  }

  function isStepComplete(step) {
    if (step.type === 'welcome' || step.type === 'photo' || step.type === 'results') return true;
    return step.fields.every(field => {
      if (!field.required) return true;
      return form[field.name] && form[field.name].trim() !== '';
    });
  }

  function canProceed() {
    return isStepComplete(steps[currentStep]);
  }

  function renderPhotoStep() {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: spacing.lg,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <div style={{ fontSize: typography.fontSize['4xl'], marginBottom: spacing.lg }}>📸</div>
        <h2 style={{ 
          color: colors.neutral[900], 
          marginBottom: spacing.md, 
          fontSize: typography.fontSize['2xl'],
          fontFamily: typography.fontFamily.primary,
          fontWeight: typography.fontWeight.bold
        }}>
          Add a Photo (Optional)
        </h2>
        <p style={{ 
          color: colors.neutral[500], 
          marginBottom: spacing.xxl, 
          fontSize: typography.fontSize.base,
          fontFamily: typography.fontFamily.primary
        }}>
          This helps us better understand your starting point
        </p>
        
        <div style={{ marginBottom: spacing.xxl }}>
          <input 
            type="file" 
            accept="image/*" 
            capture="environment"
            onChange={handlePhotoUpload}
            style={{ 
              marginBottom: spacing.lg,
              width: '100%',
              padding: spacing.md,
              border: `2px dashed ${colors.border.medium}`,
              borderRadius: borderRadius.md,
              backgroundColor: colors.background.secondary
            }}
          />
          {photo && (
            <div>
              <img 
                src={photo} 
                alt="User" 
                style={{ 
                  width: '100%',
                  maxWidth: '300px',
                  height: 'auto',
                  borderRadius: borderRadius.lg,
                  border: `3px solid ${colors.primary[500]}`,
                  boxShadow: shadows.primary
                }} 
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  function renderResultsStep() {
    return (
      <div style={{ 
        padding: spacing.lg,
        minHeight: '100vh'
      }}>
        <div style={{ textAlign: 'center', marginBottom: spacing.xxxl }}>
          <div style={{ fontSize: typography.fontSize['4xl'], marginBottom: spacing.lg }}>🎉</div>
          <h2 style={{ 
            color: colors.neutral[900], 
            marginBottom: spacing.md, 
            fontSize: typography.fontSize['2xl'],
            fontFamily: typography.fontFamily.primary,
            fontWeight: typography.fontWeight.bold
          }}>
            Your Personalized Plan
          </h2>
          <p style={{ 
            color: colors.neutral[500], 
            fontSize: typography.fontSize.base,
            fontFamily: typography.fontFamily.primary
          }}>
            Here's your custom program designed just for you
          </p>
        </div>
        
        <div style={{ 
          backgroundColor: colors.background.secondary, 
          padding: spacing.lg, 
          borderRadius: borderRadius.lg, 
          marginBottom: spacing.lg,
          border: `2px solid ${colors.border.light}`
        }}>
          <h3 style={{ 
            color: colors.neutral[900], 
            marginBottom: spacing.md, 
            fontSize: typography.fontSize.lg,
            fontFamily: typography.fontFamily.primary,
            fontWeight: typography.fontWeight.semibold
          }}>
            🎯 Recommended Expert
          </h3>
          <p style={{ 
            fontSize: typography.fontSize.lg, 
            fontWeight: typography.fontWeight.bold, 
            color: colors.primary[500],
            margin: 0,
            fontFamily: typography.fontFamily.primary
          }}>
            {program.expert}
          </p>
        </div>

        <div style={{ 
          backgroundColor: colors.background.secondary, 
          padding: spacing.lg, 
          borderRadius: borderRadius.lg, 
          marginBottom: spacing.lg,
          border: `2px solid ${colors.border.light}`
        }}>
          <h3 style={{ 
            color: colors.neutral[900], 
            marginBottom: spacing.md, 
            fontSize: typography.fontSize.lg,
            fontFamily: typography.fontFamily.primary,
            fontWeight: typography.fontWeight.semibold
          }}>
            📋 Your Training Plan
          </h3>
          <p style={{ 
            fontSize: typography.fontSize.base, 
            lineHeight: typography.lineHeight.relaxed, 
            marginBottom: spacing.md,
            fontFamily: typography.fontFamily.primary
          }}>
            {program.plan}
          </p>
          <p style={{ 
            fontSize: typography.fontSize.lg, 
            fontWeight: typography.fontWeight.bold, 
            color: colors.success[500],
            margin: 0,
            fontFamily: typography.fontFamily.primary
          }}>
            Frequency: {program.frequency}
          </p>
        </div>

        <div style={{ 
          backgroundColor: colors.background.secondary, 
          padding: spacing.lg, 
          borderRadius: borderRadius.lg, 
          marginBottom: spacing.lg,
          border: `2px solid ${colors.border.light}`
        }}>
          <h3 style={{ 
            color: colors.neutral[900], 
            marginBottom: spacing.md, 
            fontSize: typography.fontSize.lg,
            fontFamily: typography.fontFamily.primary,
            fontWeight: typography.fontWeight.semibold
          }}>
            💡 Key Tips for Success
          </h3>
          <ul style={{ 
            fontSize: typography.fontSize.base, 
            lineHeight: typography.lineHeight.relaxed, 
            margin: 0, 
            paddingLeft: spacing.lg,
            fontFamily: typography.fontFamily.primary
          }}>
            {program.tips.map((tip, idx) => (
              <li key={idx} style={{ marginBottom: spacing.sm }}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  function renderStepContent() {
    const step = steps[currentStep];
    
    switch (step.type) {
      case 'welcome':
        return <WelcomeScreen onStart={nextStep} />;
      case 'form':
        return (
          <FormStep
            title={step.title}
            subtitle={step.subtitle}
            fields={step.fields.map(field => ({
              ...field,
              value: form[field.name],
              onChange: handleChange,
            }))}
          />
        );
      case 'photo':
        return renderPhotoStep();
      case 'results':
        return renderResultsStep();
      default:
        return null;
    }
  }

  const progress = ((currentStep + 1) / steps.length) * 100;
  const step = steps[currentStep];

  return (
    <div style={{ 
      fontFamily: typography.fontFamily.primary,
      backgroundColor: colors.background.primary,
      minHeight: '100vh',
      paddingBottom: '100px' // Space for fixed navigation
    }}>
      <ProgressBar progress={progress} />
      {renderStepContent()}
      {step.type !== 'welcome' && (
        <StepNavigation
          onBack={prevStep}
          onNext={nextStep}
          canProceed={canProceed()}
          currentStep={currentStep}
          totalSteps={steps.length}
          nextButtonText={currentStep === steps.length - 2 ? 'Get My Plan' : 'Continue'}
        />
      )}
    </div>
  );
};

export default FitnessAppAtomic;
