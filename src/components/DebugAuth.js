import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const DebugAuth = () => {
  const { user, userProfile, loading, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleForceLogout = async () => {
    try {
      console.log('🧹 Force logout - clearing everything...');
      
      // Clear all localStorage
      localStorage.clear();
      
      // Sign out from Supabase
      await supabase.auth.signOut();
      
      // Reload the page to clear all state
      window.location.reload();
    } catch (error) {
      console.error('Force logout failed:', error);
      // Still reload the page
      window.location.reload();
    }
  };

  const handleForceLoad = () => {
    console.log('🚀 Force load - setting loading to false');
    // This will trigger a re-render and should get you unstuck
    window.location.reload();
  };

  const handleGoToOnboarding = () => {
    console.log('🎯 Manually navigating to onboarding');
    navigate('/onboarding');
  };

  const containerStyles = {
    position: 'fixed',
    top: '10px',
    right: '10px',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    fontSize: '12px',
    fontFamily: 'monospace',
    maxWidth: '300px',
    zIndex: 9999,
  };

  const titleStyles = {
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#333',
  };

  const itemStyles = {
    marginBottom: '4px',
    wordBreak: 'break-all',
  };

  return (
    <div style={containerStyles}>
      <div style={titleStyles}>🔍 Auth Debug</div>
      <div style={itemStyles}>
        <strong>Loading:</strong> {loading ? 'true' : 'false'}
      </div>
      <div style={itemStyles}>
        <strong>User:</strong> {user ? user.id : 'null'}
      </div>
      <div style={itemStyles}>
        <strong>User Email:</strong> {user?.email || 'null'}
      </div>
      <div style={itemStyles}>
        <strong>Profile:</strong> {userProfile ? 'exists' : 'null'}
      </div>
      <div style={itemStyles}>
        <strong>Onboarding Complete:</strong> {userProfile?.onboarding_complete ? 'true' : 'false'}
      </div>
      <div style={itemStyles}>
        <strong>Current Route:</strong> {location.pathname}
      </div>
      <div style={{ marginTop: '8px', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
        <button 
          onClick={signOut}
          style={{
            padding: '4px 8px',
            fontSize: '10px',
            backgroundColor: '#ff6b6b',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
        <button 
          onClick={handleForceLogout}
          style={{
            padding: '4px 8px',
            fontSize: '10px',
            backgroundColor: '#ff4757',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Force Logout
        </button>
        <button 
          onClick={handleForceLoad}
          style={{
            padding: '4px 8px',
            fontSize: '10px',
            backgroundColor: '#2ed573',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Force Load
        </button>
        <button 
          onClick={handleGoToOnboarding}
          style={{
            padding: '4px 8px',
            fontSize: '10px',
            backgroundColor: '#3742fa',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Go to Onboarding
        </button>
      </div>
    </div>
  );
};

export default DebugAuth;
