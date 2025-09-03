import React, { useState } from 'react';
import SignInPage from '../organisms/SignInPage';
import SignUpPage from '../organisms/SignUpPage';
import { colors, spacing } from '../../design-tokens';

const AuthPage = ({ style, ...props }) => {
  const [authMode, setAuthMode] = useState('signin'); // 'signin' or 'signup'

  const containerStyles = {
    minHeight: '100vh',
    backgroundColor: colors.background.primary,
    ...style,
  };

  const handleSwitchToSignUp = () => {
    setAuthMode('signup');
  };

  const handleSwitchToSignIn = () => {
    setAuthMode('signin');
  };

  return (
    <div style={containerStyles} {...props}>
      {authMode === 'signin' ? (
        <SignInPage onSwitchToSignUp={handleSwitchToSignUp} />
      ) : (
        <SignUpPage onSwitchToSignIn={handleSwitchToSignIn} />
      )}
    </div>
  );
};

export default AuthPage;
