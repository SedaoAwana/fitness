import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService from '../services/AuthService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [localFormData, setLocalFormData] = useState(null);

  useEffect(() => {
    // Check for existing session on app load
    const checkUser = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          // Load user profile
          const profile = await AuthService.getUserProfile(currentUser.id);
          setUserProfile(profile);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Listen for auth state changes
    const { data: { subscription } } = AuthService.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          const profile = await AuthService.getUserProfile(session.user.id);
          setUserProfile(profile);
        } else {
          setUser(null);
          setUserProfile(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email, password, fullName) => {
    try {
      const result = await AuthService.signUp(email, password, fullName);
      if (result.success) {
        setUser(result.user);
        // Migrate local data if exists
        if (localFormData) {
          await migrateLocalData(result.user.id);
        }
        
        // New users always go to onboarding
        window.location.href = '/onboarding';
      }
      return result;
    } catch (error) {
      console.error('Sign up failed:', error);
      return { success: false, error: 'Sign up failed' };
    }
  };

  const signIn = async (email, password) => {
    try {
      const result = await AuthService.signIn(email, password);
      if (result.success) {
        setUser(result.user);
        const profile = await AuthService.getUserProfile(result.user.id);
        setUserProfile(profile);
        
        // Navigate based on onboarding status
        if (!profile?.onboarding_complete) {
          window.location.href = '/onboarding';
        } else {
          window.location.href = '/dashboard';
        }
      }
      return result;
    } catch (error) {
      console.error('Sign in failed:', error);
      return { success: false, error: 'Sign in failed' };
    }
  };

  const signOut = async () => {
    try {
      const result = await AuthService.signOut();
      if (result.success) {
        setUser(null);
        setUserProfile(null);
        setLocalFormData(null);
      }
      return result;
    } catch (error) {
      console.error('Sign out failed:', error);
      return { success: false, error: 'Sign out failed' };
    }
  };

  const saveLocalFormData = (formData) => {
    setLocalFormData(formData);
    localStorage.setItem('fitnessFormProgress', JSON.stringify(formData));
  };

  const migrateLocalData = async (userId) => {
    // Temporarily disabled to avoid circular dependency
    console.log('Local data migration disabled for now');
  };

  const value = {
    user,
    userProfile,
    loading,
    localFormData,
    signUp,
    signIn,
    signOut,
    saveLocalFormData,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
