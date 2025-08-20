import React, { useState, useEffect } from 'react';

function FitnessApp() {
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

  // Simulate expert advice based on user input
  function generateProgram(data) {
    // Enhanced logic for demonstration
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
      fields: ['name', 'age', 'gender']
    },
    {
      id: 'goals',
      title: 'Your Goals',
      subtitle: 'What do you want to achieve?',
      type: 'form',
      fields: ['goal', 'experienceLevel']
    },
    {
      id: 'measurements',
      title: 'Measurements',
      subtitle: 'Current stats',
      type: 'form',
      fields: ['weight', 'height']
    },
    {
      id: 'lifestyle',
      title: 'Lifestyle',
      subtitle: 'How you live & work',
      type: 'form',
      fields: ['workSituation', 'lifestyle', 'timeAvailable']
    },
    {
      id: 'preferences',
      title: 'Preferences',
      subtitle: 'Where & how you exercise',
      type: 'form',
      fields: ['workoutLocation', 'eatingHabits', 'injuries']
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
    return step.fields.every(field => form[field] && form[field].trim() !== '');
  }

  function canProceed() {
    return isStepComplete(steps[currentStep]);
  }

  // Mobile-optimized progress bar
  function renderProgressBar() {
    const progress = ((currentStep + 1) / steps.length) * 100;
    return (
      <div style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        backgroundColor: '#e9ecef',
        zIndex: 1000
      }}>
        <div style={{
          width: `${progress}%`,
          backgroundColor: '#3498db',
          height: '100%',
          transition: 'width 0.3s ease'
        }} />
      </div>
    );
  }

  // Engaging welcome screen with value proposition
  function renderWelcomeStep() {
    return (
      <div style={{ 
        padding: '20px', 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>🏋️‍♀️</div>
        <h1 style={{ 
          fontSize: '2rem', 
          color: '#2c3e50', 
          marginBottom: '15px',
          fontWeight: 'bold',
          lineHeight: '1.2'
        }}>
          Transform Your Fitness
        </h1>
        <p style={{ 
          fontSize: '1.1rem', 
          color: '#7f8c8d', 
          marginBottom: '30px',
          lineHeight: '1.5'
        }}>
          Get your personalized workout plan in just 3 minutes
        </p>
        
        <div style={{ marginBottom: '40px' }}>
          <div style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '20px', 
            borderRadius: '15px',
            border: '2px solid #e9ecef',
            marginBottom: '15px'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>🎯</div>
            <h3 style={{ margin: '0 0 10px 0', color: '#2c3e50', fontSize: '1.1rem' }}>Personalized Goals</h3>
            <p style={{ margin: 0, color: '#7f8c8d', fontSize: '14px' }}>
              Tailored to your specific objectives
            </p>
          </div>
          <div style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '20px', 
            borderRadius: '15px',
            border: '2px solid #e9ecef',
            marginBottom: '15px'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>💪</div>
            <h3 style={{ margin: '0 0 10px 0', color: '#2c3e50', fontSize: '1.1rem' }}>Expert Guidance</h3>
            <p style={{ margin: 0, color: '#7f8c8d', fontSize: '14px' }}>
              Based on proven fitness principles
            </p>
          </div>
          <div style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '20px', 
            borderRadius: '15px',
            border: '2px solid #e9ecef'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>📱</div>
            <h3 style={{ margin: '0 0 10px 0', color: '#2c3e50', fontSize: '1.1rem' }}>Mobile Optimized</h3>
            <p style={{ margin: 0, color: '#7f8c8d', fontSize: '14px' }}>
              Designed for your phone & tablet
            </p>
          </div>
        </div>

        <button 
          onClick={nextStep}
          style={{ 
            width: '100%',
            padding: '18px', 
            backgroundColor: '#3498db', 
            color: 'white', 
            border: 'none', 
            borderRadius: '15px', 
            fontSize: '18px',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 4px 15px rgba(52, 152, 219, 0.3)',
            transition: 'all 0.3s ease',
            minHeight: '56px' // Mobile touch target
          }}
          onTouchStart={(e) => {
            e.target.style.transform = 'scale(0.98)';
          }}
          onTouchEnd={(e) => {
            e.target.style.transform = 'scale(1)';
          }}
        >
          Start My Journey →
        </button>
      </div>
    );
  }

  // Progressive form steps with mobile-optimized fields
  function renderFormStep() {
    const step = steps[currentStep];
    const fieldConfigs = {
      name: { type: 'text', placeholder: 'Your full name', label: 'Name' },
      age: { type: 'tel', placeholder: 'Your age', label: 'Age' },
      gender: { 
        type: 'select', 
        options: [
          { value: '', label: 'Select gender' },
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
          { value: 'other', label: 'Other' }
        ],
        label: 'Gender'
      },
      goal: { 
        type: 'select', 
        options: [
          { value: '', label: 'What\'s your primary goal?' },
          { value: 'lose fat', label: 'Lose Fat' },
          { value: 'build muscle', label: 'Build Muscle' },
          { value: 'increase strength', label: 'Increase Strength' },
          { value: 'improve health', label: 'Improve Health' },
          { value: 'maintain fitness', label: 'Maintain Fitness' }
        ],
        label: 'Fitness Goal'
      },
      experienceLevel: { 
        type: 'select', 
        options: [
          { value: '', label: 'Select experience level' },
          { value: 'beginner', label: 'Beginner (0-6 months)' },
          { value: 'intermediate', label: 'Intermediate (6 months - 2 years)' },
          { value: 'advanced', label: 'Advanced (2+ years)' }
        ],
        label: 'Experience Level'
      },
      weight: { type: 'number', placeholder: 'Weight in kg', label: 'Current Weight' },
      height: { type: 'number', placeholder: 'Height in cm', label: 'Height' },
      workSituation: { type: 'text', placeholder: 'e.g., desk job, active job', label: 'Work Situation' },
      lifestyle: { type: 'text', placeholder: 'e.g., sedentary, active', label: 'Lifestyle' },
      timeAvailable: { 
        type: 'select', 
        options: [
          { value: '', label: 'Time per session?' },
          { value: '30min', label: '30 minutes' },
          { value: '45min', label: '45 minutes' },
          { value: '60min', label: '60 minutes' },
          { value: '90min', label: '90+ minutes' }
        ],
        label: 'Time Available'
      },
      workoutLocation: { 
        type: 'select', 
        options: [
          { value: '', label: 'Where will you work out?' },
          { value: 'home', label: 'Home (No equipment)' },
          { value: 'home gym', label: 'Home Gym' },
          { value: 'gym', label: 'Commercial Gym' },
          { value: 'outdoor', label: 'Outdoor' }
        ],
        label: 'Workout Location'
      },
      eatingHabits: { type: 'text', placeholder: 'e.g., 3 meals/day', label: 'Eating Habits' },
      injuries: { type: 'text', placeholder: 'Any injuries? (optional)', label: 'Injuries/Limitations' }
    };

    return (
      <div style={{ 
        padding: '20px', 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ 
            color: '#2c3e50', 
            marginBottom: '10px', 
            fontSize: '1.8rem',
            textAlign: 'center'
          }}>
            {step.title}
          </h2>
          <p style={{ 
            color: '#7f8c8d', 
            fontSize: '1rem',
            textAlign: 'center'
          }}>
            {step.subtitle}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {step.fields.map(fieldName => {
            const config = fieldConfigs[fieldName];
            return (
              <div key={fieldName}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: 'bold', 
                  color: '#2c3e50',
                  fontSize: '16px'
                }}>
                  {config.label}
                </label>
                {config.type === 'select' ? (
                  <select
                    name={fieldName}
                    value={form[fieldName]}
                    onChange={handleChange}
                    required
                    style={{ 
                      width: '100%', 
                      padding: '16px', 
                      border: '2px solid #e9ecef', 
                      borderRadius: '12px', 
                      fontSize: '16px',
                      backgroundColor: 'white',
                      transition: 'border-color 0.3s ease',
                      minHeight: '56px' // Mobile touch target
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#3498db'}
                    onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                  >
                    {config.options.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={config.type}
                    name={fieldName}
                    placeholder={config.placeholder}
                    value={form[fieldName]}
                    onChange={handleChange}
                    required={fieldName !== 'injuries'}
                    style={{ 
                      width: '100%', 
                      padding: '16px', 
                      border: '2px solid #e9ecef', 
                      borderRadius: '12px', 
                      fontSize: '16px',
                      backgroundColor: 'white',
                      transition: 'border-color 0.3s ease',
                      minHeight: '56px' // Mobile touch target
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#3498db'}
                    onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Mobile-optimized photo upload with camera integration
  function renderPhotoStep() {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '20px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>📸</div>
        <h2 style={{ 
          color: '#2c3e50', 
          marginBottom: '15px', 
          fontSize: '1.8rem' 
        }}>
          Add a Photo (Optional)
        </h2>
        <p style={{ 
          color: '#7f8c8d', 
          marginBottom: '30px', 
          fontSize: '1rem' 
        }}>
          This helps us better understand your starting point
        </p>
        
        <div style={{ marginBottom: '30px' }}>
          <input 
            type="file" 
            accept="image/*" 
            capture="environment"
            onChange={handlePhotoUpload}
            style={{ 
              marginBottom: '20px',
              width: '100%',
              padding: '16px',
              border: '2px dashed #bdc3c7',
              borderRadius: '12px',
              backgroundColor: '#f8f9fa'
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
                  borderRadius: '15px',
                  border: '3px solid #3498db',
                  boxShadow: '0 4px 15px rgba(52, 152, 219, 0.3)'
                }} 
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  // Celebratory results page with personalized plan
  function renderResultsStep() {
    return (
      <div style={{ 
        padding: '20px',
        minHeight: '100vh'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>🎉</div>
          <h2 style={{ 
            color: '#2c3e50', 
            marginBottom: '15px', 
            fontSize: '1.8rem' 
          }}>
            Your Personalized Plan
          </h2>
          <p style={{ 
            color: '#7f8c8d', 
            fontSize: '1rem' 
          }}>
            Here's your custom program designed just for you
          </p>
        </div>
        
        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '20px', 
          borderRadius: '15px', 
          marginBottom: '20px',
          border: '2px solid #e9ecef'
        }}>
          <h3 style={{ 
            color: '#2c3e50', 
            marginBottom: '15px', 
            fontSize: '1.3rem' 
          }}>
            🎯 Recommended Expert
          </h3>
          <p style={{ 
            fontSize: '18px', 
            fontWeight: 'bold', 
            color: '#3498db',
            margin: 0
          }}>
            {program.expert}
          </p>
        </div>

        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '20px', 
          borderRadius: '15px', 
          marginBottom: '20px',
          border: '2px solid #e9ecef'
        }}>
          <h3 style={{ 
            color: '#2c3e50', 
            marginBottom: '15px', 
            fontSize: '1.3rem' 
          }}>
            📋 Your Training Plan
          </h3>
          <p style={{ 
            fontSize: '16px', 
            lineHeight: '1.6', 
            marginBottom: '15px' 
          }}>
            {program.plan}
          </p>
          <p style={{ 
            fontSize: '18px', 
            fontWeight: 'bold', 
            color: '#27ae60',
            margin: 0
          }}>
            Frequency: {program.frequency}
          </p>
        </div>

        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '20px', 
          borderRadius: '15px', 
          marginBottom: '20px',
          border: '2px solid #e9ecef'
        }}>
          <h3 style={{ 
            color: '#2c3e50', 
            marginBottom: '15px', 
            fontSize: '1.3rem' 
          }}>
            💡 Key Tips for Success
          </h3>
          <ul style={{ 
            fontSize: '16px', 
            lineHeight: '1.6', 
            margin: 0, 
            paddingLeft: '20px' 
          }}>
            {program.tips.map((tip, idx) => (
              <li key={idx} style={{ marginBottom: '10px' }}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  // Dynamic step content rendering
  function renderStepContent() {
    const step = steps[currentStep];
    
    switch (step.type) {
      case 'welcome':
        return renderWelcomeStep();
      case 'form':
        return renderFormStep();
      case 'photo':
        return renderPhotoStep();
      case 'results':
        return renderResultsStep();
      default:
        return null;
    }
  }

  // Mobile-optimized navigation with touch feedback
  function renderNavigation() {
    const step = steps[currentStep];
    
    if (step.type === 'welcome') return null;
    
    return (
      <div style={{ 
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '20px',
        backgroundColor: 'white',
        borderTop: '1px solid #e9ecef',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.1)'
      }}>
        <button 
          onClick={prevStep}
          style={{ 
            padding: '16px 24px', 
            backgroundColor: '#95a5a6', 
            color: 'white', 
            border: 'none', 
            borderRadius: '12px', 
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            minHeight: '56px'
          }}
          onTouchStart={(e) => {
            e.target.style.transform = 'scale(0.98)';
          }}
          onTouchEnd={(e) => {
            e.target.style.transform = 'scale(1)';
          }}
        >
          ← Back
        </button>
        
        <div style={{ fontSize: '14px', color: '#7f8c8d' }}>
          {currentStep + 1} of {steps.length}
        </div>
        
        <button 
          onClick={nextStep}
          disabled={!canProceed()}
          style={{ 
            padding: '16px 24px', 
            backgroundColor: canProceed() ? '#27ae60' : '#bdc3c7',
            color: 'white', 
            border: 'none', 
            borderRadius: '12px', 
            fontSize: '16px',
            cursor: canProceed() ? 'pointer' : 'not-allowed',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
            minHeight: '56px'
          }}
          onTouchStart={(e) => {
            if (canProceed()) {
              e.target.style.transform = 'scale(0.98)';
            }
          }}
          onTouchEnd={(e) => {
            if (canProceed()) {
              e.target.style.transform = 'scale(1)';
            }
          }}
        >
          {currentStep === steps.length - 2 ? 'Get My Plan' : 'Continue'}
        </button>
      </div>
    );
  }

  return (
    <div style={{ 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: 'white',
      minHeight: '100vh',
      paddingBottom: '100px' // Space for fixed navigation
    }}>
      {renderProgressBar()}
      {renderStepContent()}
      {renderNavigation()}
    </div>
  );
}

export default FitnessApp;
