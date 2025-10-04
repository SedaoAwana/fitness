import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [localFormData, setLocalFormData] = useState(null);

  useEffect(() => {
    // Set a short timeout to prevent infinite loading
    const loadingTimeout = setTimeout(() => {
      console.log('⏰ Loading timeout (5s) - forcing loading to false');
      setLoading(false);
    }, 5000);

    // Check for existing session on app load
    const checkUser = async () => {
      try {
        console.log('🔍 Checking for existing user session...');
        const currentUser = await AuthService.getCurrentUser();
        console.log('🔍 Current user:', currentUser);
        
        if (currentUser) {
          setUser(currentUser);
          // Load user profile
          console.log('🔍 Loading user profile...');
          const profile = await AuthService.getUserProfile(currentUser.id);
          console.log('🔍 User profile loaded:', profile);
          setUserProfile(profile);
          
          // If no profile exists, redirect to onboarding
          if (!profile) {
            console.log('🔍 No profile found, redirecting to onboarding');
            setTimeout(() => {
              navigate('/onboarding');
            }, 100);
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        console.log('🔍 Auth check complete, setting loading to false');
        clearTimeout(loadingTimeout);
        setLoading(false);
      }
    };

    checkUser();

    // Add a fallback check after a short delay
    const fallbackCheck = setTimeout(async () => {
      if (loading) {
        console.log('🔄 Fallback auth check - loading still true');
        const currentUser = await AuthService.getCurrentUser();
        if (currentUser && !user) {
          console.log('🔄 Fallback: Setting user from fallback check');
          setUser(currentUser);
          const profile = await AuthService.getUserProfile(currentUser.id);
          setUserProfile(profile);
        }
        setLoading(false);
      }
    }, 2000); // 2 second fallback

    // Listen for auth state changes
    const { data: { subscription } } = AuthService.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 Auth state change:', event, session?.user?.id);
        
        if (session?.user) {
          setUser(session.user);
          try {
            const profile = await AuthService.getUserProfile(session.user.id);
            console.log('🔄 Profile loaded in auth change:', profile);
            setUserProfile(profile);
            
            // If no profile exists, redirect to onboarding
            if (!profile) {
              console.log('🔄 No profile found in auth change, redirecting to onboarding');
              setTimeout(() => {
                navigate('/onboarding');
              }, 100);
            }
          } catch (error) {
            console.error('🔄 Error loading profile in auth change:', error);
            setUserProfile(null);
            // Redirect to onboarding if profile loading fails
            setTimeout(() => {
              navigate('/onboarding');
            }, 100);
          }
        } else {
          setUser(null);
          setUserProfile(null);
        }
        setLoading(false);
      }
    );

    return () => {
      clearTimeout(loadingTimeout);
      clearTimeout(fallbackCheck);
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email, password, fullName) => {
    try {
      const result = await AuthService.signUp(email, password, fullName);
      if (result.success) {
        if (result.needsEmailVerification) {
          // User needs to verify email first
          return { 
            success: true, 
            needsEmailVerification: true,
            message: 'Please check your email and click the verification link to complete your registration.'
          };
        } else {
          setUser(result.user);
          // Migrate local data if exists
          if (localFormData) {
            await migrateLocalData(result.user.id);
          }
          
          // New users always go to onboarding
          navigate('/onboarding');
        }
      }
      return result;
    } catch (error) {
      console.error('Sign up failed:', error);
      return { success: false, error: 'Sign up failed' };
    }
  };

  const signIn = async (email, password) => {
    try {
      console.log('🔐 Starting sign in process...');
      const result = await AuthService.signIn(email, password);
      console.log('🔐 Sign in result:', result);
      
      if (result.success) {
        console.log('🔐 Setting user:', result.user);
        setUser(result.user);
        
        console.log('🔐 Fetching user profile...');
        const profile = await AuthService.getUserProfile(result.user.id);
        console.log('🔐 User profile:', profile);
        setUserProfile(profile);
        
        // Navigate based on onboarding status
        if (!profile?.onboarding_complete) {
          console.log('🔐 Redirecting to onboarding (profile not complete)');
          navigate('/onboarding');
        } else {
          console.log('🔐 Redirecting to dashboard (profile complete)');
          navigate('/dashboard');
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
      console.log('🚪 Starting sign out process...');
      
      // Clear local state first
      setUser(null);
      setUserProfile(null);
      setLocalFormData(null);
      
      // Clear localStorage
      localStorage.removeItem('onboarding_basic_info');
      localStorage.removeItem('onboarding_physical_info');
      localStorage.removeItem('onboarding_lifestyle');
      localStorage.removeItem('onboarding_workout_preferences');
      localStorage.removeItem('onboarding_goals');
      localStorage.removeItem('fitnessFormProgress');
      localStorage.removeItem('onboarding_complete');
      
      console.log('🚪 Cleared local state and localStorage');
      
      // Sign out from Supabase
      const result = await AuthService.signOut();
      console.log('🚪 Supabase sign out result:', result);
      
      // Force redirect to sign in page
      navigate('/signin');
      
      return result;
    } catch (error) {
      console.error('Sign out failed:', error);
      // Even if sign out fails, clear local state and redirect
      setUser(null);
      setUserProfile(null);
      setLocalFormData(null);
      navigate('/signin');
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

  const updateUserProfile = async () => {
    if (user) {
      try {
        console.log('🔄 Updating user profile in context...');
        const profile = await AuthService.getUserProfile(user.id);
        setUserProfile(profile);
        console.log('🔄 User profile updated:', profile);
      } catch (error) {
        console.error('Failed to update user profile:', error);
      }
    }
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
    updateUserProfile,
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
