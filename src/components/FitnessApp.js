import React, { useState } from 'react';

function FitnessApp() {
  const [step, setStep] = useState(1);
  const [photo, setPhoto] = useState(null);
  const [form, setForm] = useState({
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
  });
  const [program, setProgram] = useState(null);

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

  function handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    setStep(2);
  }

  function handlePhotoSubmit() {
    const generated = generateProgram(form);
    setProgram(generated);
    setStep(3);
  }

  function isFormComplete() {
    const requiredFields = ['name', 'age', 'gender', 'weight', 'height', 'goal', 'workoutLocation', 'experienceLevel', 'timeAvailable'];
    return requiredFields.every(field => form[field] && form[field].trim() !== '');
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', fontFamily: 'sans-serif', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '30px' }}>
        🏋️‍♀️ Personalized Fitness Program
      </h1>
      
      {step === 1 && (
        <div>
          <h2 style={{ color: '#34495e', marginBottom: '20px' }}>Step 1: Tell Us About Yourself</h2>
          <p style={{ color: '#7f8c8d', marginBottom: '25px' }}>
            Fill out this form to get your personalized fitness program tailored to your goals and lifestyle.
          </p>
          
          <form onSubmit={handleFormSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
                style={{ padding: '12px', border: '1px solid #bdc3c7', borderRadius: '5px', fontSize: '16px' }}
              />
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={form.age}
                onChange={handleChange}
                required
                style={{ padding: '12px', border: '1px solid #bdc3c7', borderRadius: '5px', fontSize: '16px' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                required
                style={{ padding: '12px', border: '1px solid #bdc3c7', borderRadius: '5px', fontSize: '16px' }}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <select
                name="experienceLevel"
                value={form.experienceLevel}
                onChange={handleChange}
                required
                style={{ padding: '12px', border: '1px solid #bdc3c7', borderRadius: '5px', fontSize: '16px' }}
              >
                <option value="">Experience Level</option>
                <option value="beginner">Beginner (0-6 months)</option>
                <option value="intermediate">Intermediate (6 months - 2 years)</option>
                <option value="advanced">Advanced (2+ years)</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
              <input
                type="number"
                name="weight"
                placeholder="Weight (kg)"
                value={form.weight}
                onChange={handleChange}
                required
                style={{ padding: '12px', border: '1px solid #bdc3c7', borderRadius: '5px', fontSize: '16px' }}
              />
              <input
                type="number"
                name="height"
                placeholder="Height (cm)"
                value={form.height}
                onChange={handleChange}
                required
                style={{ padding: '12px', border: '1px solid #bdc3c7', borderRadius: '5px', fontSize: '16px' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <select
                name="goal"
                value={form.goal}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '12px', border: '1px solid #bdc3c7', borderRadius: '5px', fontSize: '16px' }}
              >
                <option value="">What's your primary fitness goal?</option>
                <option value="lose fat">Lose Fat</option>
                <option value="build muscle">Build Muscle</option>
                <option value="increase strength">Increase Strength</option>
                <option value="improve health">Improve Overall Health</option>
                <option value="maintain fitness">Maintain Current Fitness</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
              <select
                name="workoutLocation"
                value={form.workoutLocation}
                onChange={handleChange}
                required
                style={{ padding: '12px', border: '1px solid #bdc3c7', borderRadius: '5px', fontSize: '16px' }}
              >
                <option value="">Where will you work out?</option>
                <option value="home">Home (No equipment)</option>
                <option value="home gym">Home Gym (Some equipment)</option>
                <option value="gym">Commercial Gym</option>
                <option value="outdoor">Outdoor</option>
              </select>
              <select
                name="timeAvailable"
                value={form.timeAvailable}
                onChange={handleChange}
                required
                style={{ padding: '12px', border: '1px solid #bdc3c7', borderRadius: '5px', fontSize: '16px' }}
              >
                <option value="">Time available per session</option>
                <option value="30min">30 minutes</option>
                <option value="45min">45 minutes</option>
                <option value="60min">60 minutes</option>
                <option value="90min">90+ minutes</option>
              </select>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <input
                type="text"
                name="workSituation"
                placeholder="Work Situation (e.g., desk job, active job, student)"
                value={form.workSituation}
                onChange={handleChange}
                style={{ width: '100%', padding: '12px', border: '1px solid #bdc3c7', borderRadius: '5px', fontSize: '16px' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <input
                type="text"
                name="eatingHabits"
                placeholder="Current Eating Habits (e.g., 3 meals/day, intermittent fasting, etc.)"
                value={form.eatingHabits}
                onChange={handleChange}
                style={{ width: '100%', padding: '12px', border: '1px solid #bdc3c7', borderRadius: '5px', fontSize: '16px' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <input
                type="text"
                name="lifestyle"
                placeholder="Lifestyle (e.g., sedentary, moderately active, very active)"
                value={form.lifestyle}
                onChange={handleChange}
                style={{ width: '100%', padding: '12px', border: '1px solid #bdc3c7', borderRadius: '5px', fontSize: '16px' }}
              />
            </div>

            <div style={{ marginBottom: '25px' }}>
              <input
                type="text"
                name="injuries"
                placeholder="Any injuries or limitations? (optional)"
                value={form.injuries}
                onChange={handleChange}
                style={{ width: '100%', padding: '12px', border: '1px solid #bdc3c7', borderRadius: '5px', fontSize: '16px' }}
              />
            </div>

            <button 
              type="submit" 
              disabled={!isFormComplete()}
              style={{ 
                width: '100%', 
                padding: '15px', 
                backgroundColor: isFormComplete() ? '#3498db' : '#bdc3c7',
                color: 'white', 
                border: 'none', 
                borderRadius: '5px', 
                fontSize: '18px', 
                cursor: isFormComplete() ? 'pointer' : 'not-allowed',
                fontWeight: 'bold'
              }}
            >
              Continue to Photo Upload (Optional)
            </button>
          </form>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 style={{ color: '#34495e', marginBottom: '20px' }}>Step 2: Upload a Photo (Optional)</h2>
          <p style={{ color: '#7f8c8d', marginBottom: '25px' }}>
            Upload a photo to help us better understand your current fitness level and body composition.
          </p>
          
          <div style={{ textAlign: 'center', marginBottom: '25px' }}>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handlePhotoUpload}
              style={{ marginBottom: '15px' }}
            />
            {photo && (
              <div>
                <img 
                  src={photo} 
                  alt="User" 
                  style={{ 
                    width: 200, 
                    height: 200, 
                    objectFit: 'cover',
                    borderRadius: '10px',
                    border: '3px solid #3498db'
                  }} 
                />
              </div>
            )}
          </div>
          
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <button 
              onClick={() => setStep(1)}
              style={{ 
                padding: '12px 24px', 
                backgroundColor: '#95a5a6', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px', 
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              Back
            </button>
            <button 
              onClick={handlePhotoSubmit}
              style={{ 
                padding: '12px 24px', 
                backgroundColor: '#27ae60', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px', 
                fontSize: '16px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Generate My Program
            </button>
          </div>
        </div>
      )}

      {step === 3 && program && (
        <div>
          <h2 style={{ color: '#34495e', marginBottom: '20px', textAlign: 'center' }}>Your Personalized Fitness Program</h2>
          
          <div style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '25px', 
            borderRadius: '10px', 
            marginBottom: '25px',
            border: '2px solid #e9ecef'
          }}>
            <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>🎯 Recommended Expert</h3>
            <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#3498db' }}>{program.expert}</p>
          </div>

          <div style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '25px', 
            borderRadius: '10px', 
            marginBottom: '25px',
            border: '2px solid #e9ecef'
          }}>
            <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>📋 Your Training Plan</h3>
            <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '10px' }}>{program.plan}</p>
            <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#27ae60' }}>
              Frequency: {program.frequency}
            </p>
          </div>

          <div style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '25px', 
            borderRadius: '10px', 
            marginBottom: '25px',
            border: '2px solid #e9ecef'
          }}>
            <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>💡 Key Tips for Success</h3>
            <ul style={{ fontSize: '16px', lineHeight: '1.8' }}>
              {program.tips.map((tip, idx) => (
                <li key={idx} style={{ marginBottom: '8px' }}>{tip}</li>
              ))}
            </ul>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button 
              onClick={() => {
                setStep(1);
                setPhoto(null);
                setProgram(null);
                setForm({
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
                });
              }}
              style={{ 
                padding: '15px 30px', 
                backgroundColor: '#3498db', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px', 
                fontSize: '16px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Start Over
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FitnessApp;
