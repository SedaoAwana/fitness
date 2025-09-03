import React from 'react';

const TestComponent = () => {
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f0f0f0', 
      textAlign: 'center',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>
        🏋️‍♀️ Fitness App Test
      </h1>
      <p style={{ color: '#666', fontSize: '18px' }}>
        If you can see this, React is working!
      </p>
      <div style={{ 
        marginTop: '20px', 
        padding: '10px', 
        backgroundColor: '#4CAF50', 
        color: 'white',
        borderRadius: '5px'
      }}>
        ✅ App is loading successfully
      </div>
    </div>
  );
};

export default TestComponent;

