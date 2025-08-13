import React, { useState, useEffect } from 'react';

// Exercise library data
const exerciseLibrary = {
  cardio: [
    { id: 'running', name: 'Running', category: 'cardio', difficulty: 'beginner' },
    { id: 'cycling', name: 'Cycling', category: 'cardio', difficulty: 'beginner' },
    { id: 'jumping_jacks', name: 'Jumping Jacks', category: 'cardio', difficulty: 'beginner' },
    { id: 'burpees', name: 'Burpees', category: 'cardio', difficulty: 'intermediate' },
    { id: 'mountain_climbers', name: 'Mountain Climbers', category: 'cardio', difficulty: 'beginner' }
  ],
  strength: [
    { id: 'pushups', name: 'Push-ups', category: 'strength', difficulty: 'beginner' },
    { id: 'squats', name: 'Squats', category: 'strength', difficulty: 'beginner' },
    { id: 'lunges', name: 'Lunges', category: 'strength', difficulty: 'beginner' },
    { id: 'plank', name: 'Plank', category: 'strength', difficulty: 'beginner' },
    { id: 'deadlift', name: 'Deadlift', category: 'strength', difficulty: 'intermediate' },
    { id: 'bench_press', name: 'Bench Press', category: 'strength', difficulty: 'intermediate' },
    { id: 'pullups', name: 'Pull-ups', category: 'strength', difficulty: 'intermediate' }
  ],
  flexibility: [
    { id: 'stretching', name: 'Stretching', category: 'flexibility', difficulty: 'beginner' },
    { id: 'yoga', name: 'Yoga', category: 'flexibility', difficulty: 'beginner' },
    { id: 'foam_rolling', name: 'Foam Rolling', category: 'flexibility', difficulty: 'beginner' }
  ]
};

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
  const [currentView, setCurrentView] = useState('dashboard'); // dashboard, workout, photos, reports
  const [progressPhotos, setProgressPhotos] = useState([]);
  const [workoutLogs, setWorkoutLogs] = useState([]);
  const [measurements, setMeasurements] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [currentWorkout, setCurrentWorkout] = useState({
    date: new Date().toISOString().split('T')[0],
    exercises: [],
    duration: 0,
    notes: ''
  });

  // Initialize with sample data for demonstration
  useEffect(() => {
    if (program) {
      // Add sample progress data
      const sampleMeasurements = [
        { date: '2024-01-01', weight: 75, bodyFat: 20, notes: 'Starting point' },
        { date: '2024-01-15', weight: 74, bodyFat: 19, notes: '2 weeks in' },
        { date: '2024-01-30', weight: 73, bodyFat: 18, notes: '1 month progress' }
      ];
      setMeasurements(sampleMeasurements);

      const sampleWorkouts = [
        {
          date: '2024-01-15',
          exercises: [
            { name: 'Push-ups', sets: 3, reps: 10, weight: 0 },
            { name: 'Squats', sets: 3, reps: 15, weight: 0 }
          ],
          duration: 30,
          notes: 'Good energy today'
        },
        {
          date: '2024-01-17',
          exercises: [
            { name: 'Running', sets: 1, reps: 0, weight: 0, duration: 20 }
          ],
          duration: 20,
          notes: 'Cardio day'
        }
      ];
      setWorkoutLogs(sampleWorkouts);
    }
  }, [program]);

  // Simulate expert advice based on user input
  function generateProgram(data) {
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

  function handleProgressPhotoUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const newPhoto = {
        id: Date.now(),
        url: URL.createObjectURL(file),
        date: new Date().toISOString().split('T')[0],
        notes: ''
      };
      setProgressPhotos([...progressPhotos, newPhoto]);
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

  function addExerciseToWorkout(exercise) {
    const exerciseEntry = {
      name: exercise.name,
      sets: 3,
      reps: 10,
      weight: 0,
      duration: 0
    };
    setCurrentWorkout({
      ...currentWorkout,
      exercises: [...currentWorkout.exercises, exerciseEntry]
    });
  }

  function saveWorkout() {
    if (currentWorkout.exercises.length > 0) {
      setWorkoutLogs([...workoutLogs, currentWorkout]);
      setCurrentWorkout({
        date: new Date().toISOString().split('T')[0],
        exercises: [],
        duration: 0,
        notes: ''
      });
      alert('Workout saved successfully!');
    }
  }

  function addMeasurement() {
    const newMeasurement = {
      date: new Date().toISOString().split('T')[0],
      weight: 0,
      bodyFat: 0,
      notes: ''
    };
    setMeasurements([...measurements, newMeasurement]);
  }

  // Calculate progress metrics
  const totalWorkouts = workoutLogs.length;
  const thisMonthWorkouts = workoutLogs.filter(w => 
    new Date(w.date).getMonth() === new Date().getMonth()
  ).length;
  const weightChange = measurements.length > 1 ? 
    measurements[measurements.length - 1].weight - measurements[0].weight : 0;

  // Dashboard Component
  function Dashboard() {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Dashboard</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          <div style={{ background: '#f0f0f0', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            <h3>Total Workouts</h3>
            <p style={{ fontSize: '2em', margin: '0' }}>{totalWorkouts}</p>
          </div>
          <div style={{ background: '#f0f0f0', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            <h3>This Month</h3>
            <p style={{ fontSize: '2em', margin: '0' }}>{thisMonthWorkouts}</p>
          </div>
          <div style={{ background: '#f0f0f0', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            <h3>Weight Change</h3>
            <p style={{ fontSize: '2em', margin: '0', color: weightChange < 0 ? 'green' : weightChange > 0 ? 'red' : 'black' }}>
              {weightChange > 0 ? '+' : ''}{weightChange}kg
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <h3>Recent Workouts</h3>
            {workoutLogs.slice(-3).reverse().map((workout, index) => (
              <div key={index} style={{ background: 'white', padding: '10px', margin: '5px 0', borderRadius: '5px', border: '1px solid #ddd' }}>
                <strong>{workout.date}</strong> - {workout.exercises.length} exercises ({workout.duration} min)
              </div>
            ))}
          </div>
          <div>
            <h3>Progress Photos</h3>
            {progressPhotos.slice(-3).reverse().map((photo, index) => (
              <div key={photo.id} style={{ background: 'white', padding: '10px', margin: '5px 0', borderRadius: '5px', border: '1px solid #ddd' }}>
                <img src={photo.url} alt="Progress" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }} />
                <span style={{ marginLeft: '10px' }}>{photo.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Workout Logger Component
  function WorkoutLogger() {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Workout Logger</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
          <div>
            <h3>Exercise Library</h3>
            {Object.entries(exerciseLibrary).map(([category, exercises]) => (
              <div key={category} style={{ marginBottom: '20px' }}>
                <h4 style={{ textTransform: 'capitalize' }}>{category}</h4>
                {exercises.map(exercise => (
                  <button
                    key={exercise.id}
                    onClick={() => addExerciseToWorkout(exercise)}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '8px',
                      margin: '2px 0',
                      border: '1px solid #ddd',
                      background: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    {exercise.name}
                  </button>
                ))}
              </div>
            ))}
          </div>
          
          <div>
            <h3>Current Workout</h3>
            <div style={{ marginBottom: '10px' }}>
              <label>Date: </label>
              <input
                type="date"
                value={currentWorkout.date}
                onChange={(e) => setCurrentWorkout({...currentWorkout, date: e.target.value})}
                style={{ marginLeft: '10px' }}
              />
            </div>
            
            {currentWorkout.exercises.map((exercise, index) => (
              <div key={index} style={{ background: 'white', padding: '10px', margin: '5px 0', borderRadius: '5px', border: '1px solid #ddd' }}>
                <strong>{exercise.name}</strong>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginTop: '5px' }}>
                  <input
                    type="number"
                    placeholder="Sets"
                    value={exercise.sets}
                    onChange={(e) => {
                      const updatedExercises = [...currentWorkout.exercises];
                      updatedExercises[index].sets = parseInt(e.target.value) || 0;
                      setCurrentWorkout({...currentWorkout, exercises: updatedExercises});
                    }}
                    style={{ width: '100%' }}
                  />
                  <input
                    type="number"
                    placeholder="Reps"
                    value={exercise.reps}
                    onChange={(e) => {
                      const updatedExercises = [...currentWorkout.exercises];
                      updatedExercises[index].reps = parseInt(e.target.value) || 0;
                      setCurrentWorkout({...currentWorkout, exercises: updatedExercises});
                    }}
                    style={{ width: '100%' }}
                  />
                  <input
                    type="number"
                    placeholder="Weight (kg)"
                    value={exercise.weight}
                    onChange={(e) => {
                      const updatedExercises = [...currentWorkout.exercises];
                      updatedExercises[index].weight = parseInt(e.target.value) || 0;
                      setCurrentWorkout({...currentWorkout, exercises: updatedExercises});
                    }}
                    style={{ width: '100%' }}
                  />
                  <button
                    onClick={() => {
                      const updatedExercises = currentWorkout.exercises.filter((_, i) => i !== index);
                      setCurrentWorkout({...currentWorkout, exercises: updatedExercises});
                    }}
                    style={{ background: 'red', color: 'white', border: 'none', padding: '5px' }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            
            <div style={{ marginTop: '20px' }}>
              <textarea
                placeholder="Workout notes..."
                value={currentWorkout.notes}
                onChange={(e) => setCurrentWorkout({...currentWorkout, notes: e.target.value})}
                style={{ width: '100%', height: '60px', marginBottom: '10px' }}
              />
              <button
                onClick={saveWorkout}
                disabled={currentWorkout.exercises.length === 0}
                style={{
                  background: currentWorkout.exercises.length === 0 ? '#ccc' : '#007bff',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  cursor: currentWorkout.exercises.length === 0 ? 'not-allowed' : 'pointer'
                }}
              >
                Save Workout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Progress Photos Component
  function ProgressPhotos() {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Progress Photos</h2>
        
        <div style={{ marginBottom: '20px' }}>
          <input
            type="file"
            accept="image/*"
            onChange={handleProgressPhotoUpload}
            style={{ marginBottom: '10px' }}
          />
          <p>Upload a new progress photo</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
          {progressPhotos.map((photo) => (
            <div key={photo.id} style={{ background: 'white', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}>
              <img
                src={photo.url}
                alt="Progress"
                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px', marginBottom: '10px' }}
              />
              <p><strong>Date:</strong> {photo.date}</p>
              <textarea
                placeholder="Add notes..."
                value={photo.notes}
                onChange={(e) => {
                  const updatedPhotos = progressPhotos.map(p => 
                    p.id === photo.id ? {...p, notes: e.target.value} : p
                  );
                  setProgressPhotos(updatedPhotos);
                }}
                style={{ width: '100%', height: '60px' }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Monthly Reports Component
  function MonthlyReports() {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const monthWorkouts = workoutLogs.filter(w => {
      const workoutDate = new Date(w.date);
      return workoutDate.getMonth() === currentMonth && workoutDate.getFullYear() === currentYear;
    });
    
    const monthPhotos = progressPhotos.filter(p => {
      const photoDate = new Date(p.date);
      return photoDate.getMonth() === currentMonth && photoDate.getFullYear() === currentYear;
    });
    
    const totalWorkoutTime = monthWorkouts.reduce((total, workout) => total + workout.duration, 0);
    const averageWorkoutDuration = monthWorkouts.length > 0 ? totalWorkoutTime / monthWorkouts.length : 0;
    
    return (
      <div style={{ padding: '20px' }}>
        <h2>Monthly Progress Report</h2>
        <h3>{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          <div style={{ background: '#f0f0f0', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            <h4>Workouts Completed</h4>
            <p style={{ fontSize: '2em', margin: '0' }}>{monthWorkouts.length}</p>
          </div>
          <div style={{ background: '#f0f0f0', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            <h4>Total Time</h4>
            <p style={{ fontSize: '2em', margin: '0' }}>{totalWorkoutTime} min</p>
          </div>
          <div style={{ background: '#f0f0f0', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            <h4>Avg Duration</h4>
            <p style={{ fontSize: '2em', margin: '0' }}>{Math.round(averageWorkoutDuration)} min</p>
          </div>
          <div style={{ background: '#f0f0f0', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            <h4>Progress Photos</h4>
            <p style={{ fontSize: '2em', margin: '0' }}>{monthPhotos.length}</p>
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <h3>Most Common Exercises</h3>
            {(() => {
              const exerciseCounts = {};
              monthWorkouts.forEach(workout => {
                workout.exercises.forEach(exercise => {
                  exerciseCounts[exercise.name] = (exerciseCounts[exercise.name] || 0) + 1;
                });
              });
              const sortedExercises = Object.entries(exerciseCounts)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 5);
              
              return sortedExercises.map(([exercise, count]) => (
                <div key={exercise} style={{ background: 'white', padding: '10px', margin: '5px 0', borderRadius: '5px', border: '1px solid #ddd' }}>
                  {exercise}: {count} times
                </div>
              ));
            })()}
          </div>
          
          <div>
            <h3>Workout Consistency</h3>
            <div style={{ background: 'white', padding: '15px', borderRadius: '8px', border: '1px solid #ddd' }}>
              <p><strong>Workout Frequency:</strong> {monthWorkouts.length} times this month</p>
              <p><strong>Consistency Score:</strong> {Math.round((monthWorkouts.length / 30) * 100)}%</p>
              <p><strong>Recommendation:</strong> {
                monthWorkouts.length >= 12 ? 'Excellent consistency!' :
                monthWorkouts.length >= 8 ? 'Good progress, keep it up!' :
                monthWorkouts.length >= 4 ? 'Getting started, try to increase frequency' :
                'Consider starting with 2-3 workouts per week'
              }</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', fontFamily: 'sans-serif' }}>
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
          
          {/* Navigation Menu */}
          <div style={{ 
            display: 'flex', 
            gap: '10px', 
            marginTop: '20px', 
            padding: '10px', 
            background: '#f8f9fa', 
            borderRadius: '8px' 
          }}>
            <button
              onClick={() => setCurrentView('dashboard')}
              style={{
                background: currentView === 'dashboard' ? '#007bff' : '#6c757d',
                color: 'white',
                border: 'none',
                padding: '10px 15px',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Dashboard
            </button>
            <button
              onClick={() => setCurrentView('workout')}
              style={{
                background: currentView === 'workout' ? '#007bff' : '#6c757d',
                color: 'white',
                border: 'none',
                padding: '10px 15px',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Workout Logger
            </button>
            <button
              onClick={() => setCurrentView('photos')}
              style={{
                background: currentView === 'photos' ? '#007bff' : '#6c757d',
                color: 'white',
                border: 'none',
                padding: '10px 15px',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Progress Photos
            </button>
            <button
              onClick={() => setCurrentView('reports')}
              style={{
                background: currentView === 'reports' ? '#007bff' : '#6c757d',
                color: 'white',
                border: 'none',
                padding: '10px 15px',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Monthly Reports
            </button>
          </div>
          
          {/* Content Area */}
          <div style={{ marginTop: '20px' }}>
            {currentView === 'dashboard' && <Dashboard />}
            {currentView === 'workout' && <WorkoutLogger />}
            {currentView === 'photos' && <ProgressPhotos />}
            {currentView === 'reports' && <MonthlyReports />}
          </div>
          
          <button onClick={() => setStep(1)} style={{ marginTop: 20 }}>
            Start Over
          </button>
        </div>
      )}
    </div>
  );
}

export default FitnessApp;
