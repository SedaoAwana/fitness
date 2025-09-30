import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const containerStyles = {
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        padding: '20px',
      };

      const errorCardStyles = {
        backgroundColor: '#f8f9fa',
        border: '1px solid #e9ecef',
        borderRadius: '12px',
        padding: '30px',
        textAlign: 'center',
        maxWidth: '500px',
        width: '100%',
      };

      const iconStyles = {
        fontSize: '48px',
        marginBottom: '20px',
      };

      const titleStyles = {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: '16px',
      };

      const messageStyles = {
        fontSize: '16px',
        color: '#7f8c8d',
        marginBottom: '20px',
        lineHeight: 1.6,
      };

      const buttonStyles = {
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '16px 24px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      };

      return (
        <div style={containerStyles}>
          <div style={errorCardStyles}>
            <div style={iconStyles}>⚠️</div>
            <h1 style={titleStyles}>Something went wrong</h1>
            <p style={messageStyles}>
              We're sorry, but something unexpected happened. Please try refreshing the page or contact support if the problem persists.
            </p>
            <button
              style={buttonStyles}
              onClick={() => window.location.reload()}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#2980b9';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#3498db';
              }}
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
