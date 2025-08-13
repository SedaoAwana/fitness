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
  });
  const [program, setProgram] = useState(null);

  // Simulate expert advice based on user input
  function generateProgram(data) {
    // Simple logic for demonstration
    let expert = '';
    if (data.gender === 'female') {
      if (data.workoutLocation === 'home') expert = 'Kayla Itsines';
      else expert = 'Alexia Clark';
    } else {
      if (data.workoutLocation === 'gym') expert = 'Brad Schoenfeld';
      else expert = 'Recharged Personal Training';
    }

    let plan = '';
    if (data.goal === 'lose fat') {
      plan = 'Focus on HIIT, full-body circuits, and a calorie deficit. 4-5 sessions/week.';
    } else if (data.goal === 'build muscle') {
      plan = 'Emphasize progressive overload, compound lifts, and protein intake. 3-5 sessions/week.';
    } else {
      plan = 'Mix cardio and resistance training, prioritize consistency and healthy habits.';
    }

    return {
      expert,
      plan,
      tips: [
        'Track your progress weekly.',
        'Stay hydrated and sleep well.',
        'Adjust nutrition to support your goal.',
      ],
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

  function handleSubmit(e) {
    e.preventDefault();
    const generated = generateProgram(form);
    setProgram(generated);
    setStep(3);
  }

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>Health & Fitness Improvement App</h1>
      {step === 1 && (
        <div>
          <h2>Step 1: Upload or Take a Photo</h2>
          <input type="file" accept="image/*" onChange={handlePhotoUpload} />
          {photo && <img src={photo} alt="User" style={{ width: 200, marginTop: 10 }} />}
          <br />
          <button onClick={() => setStep(2)} disabled={!photo}>
            Next
          </button>
        </div>
      )}
      {step === 2 && (
        <form onSubmit={handleSubmit}>
          <h2>Step 2: Enter Your Information</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            style={{ width: '100%', marginBottom: 8 }}
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            required
            style={{ width: '100%', marginBottom: 8 }}
          />
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            required
            style={{ width: '100%', marginBottom: 8 }}
          >
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input
            type="number"
            name="weight"
            placeholder="Weight (kg)"
            value={form.weight}
            onChange={handleChange}
            required
            style={{ width: '100%', marginBottom: 8 }}
          />
          <input
            type="number"
            name="height"
            placeholder="Height (cm)"
            value={form.height}
            onChange={handleChange}
            required
            style={{ width: '100%', marginBottom: 8 }}
          />
          <input
            type="text"
            name="workSituation"
            placeholder="Work Situation (e.g., desk job, active)"
            value={form.workSituation}
            onChange={handleChange}
            required
            style={{ width: '100%', marginBottom: 8 }}
          />
          <input
            type="text"
            name="eatingHabits"
            placeholder="Eating Habits (e.g., 3 meals, snacks, etc.)"
            value={form.eatingHabits}
            onChange={handleChange}
            required
            style={{ width: '100%', marginBottom: 8 }}
          />
          <input
            type="text"
            name="lifestyle"
            placeholder="Lifestyle (e.g., sedentary, active)"
            value={form.lifestyle}
            onChange={handleChange}
            required
            style={{ width: '100%', marginBottom: 8 }}
          />
          <select
            name="goal"
            value={form.goal}
            onChange={handleChange}
            required
            style={{ width: '100%', marginBottom: 8 }}
          >
            <option value="">Fitness Goal</option>
            <option value="lose fat">Lose Fat</option>
            <option value="build muscle">Build Muscle</option>
            <option value="improve health">Improve Health</option>
          </select>
          <select
            name="workoutLocation"
            value={form.workoutLocation}
            onChange={handleChange}
            required
            style={{ width: '100%', marginBottom: 8 }}
          >
            <option value="">Workout Location</option>
            <option value="home">Home</option>
            <option value="home gym">Home Gym</option>
            <option value="gym">Gym</option>
          </select>
          <button type="submit" style={{ marginTop: 10 }}>
            Get My Program
          </button>
        </form>
      )}
      {step === 3 && program && (
        <div>
          <h2>Your Personalized Program</h2>
          <p>
            <strong>Expert:</strong> {program.expert}
          </p>
          <p>
            <strong>Plan:</strong> {program.plan}
          </p>
          <ul>
            {program.tips.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
          <button onClick={() => setStep(1)} style={{ marginTop: 20 }}>
            Start Over
          </button>
        </div>
      )}
    </div>
  );
}

export default FitnessApp;
