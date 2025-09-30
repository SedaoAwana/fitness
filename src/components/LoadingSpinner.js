import React from 'react';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  const containerStyles = {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };

  const contentStyles = {
    textAlign: 'center',
    color: '#7f8c8d',
  };

  const spinnerStyles = {
    fontSize: '48px',
    marginBottom: '16px',
    animation: 'spin 1s linear infinite',
  };

  const textStyles = {
    fontSize: '18px',
    fontWeight: '500',
  };

  return (
    <div style={containerStyles}>
      <div style={contentStyles}>
        <div style={spinnerStyles}>🏋️‍♀️</div>
        <div style={textStyles}>{message}</div>
      </div>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
