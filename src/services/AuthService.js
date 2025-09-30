import { supabase } from '../lib/supabase';

class AuthService {
  async signUp(email, password, fullName) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { 
            full_name: fullName,
            email: email
          },
          emailRedirectTo: `${window.location.origin}/email-verified`
        }
      });
      
      if (error) throw error;
      
      // User profile is automatically created by database trigger
      // No need to manually create it
      
      return { 
        success: true, 
        user: data.user,
        needsEmailVerification: !data.user?.email_confirmed_at
      };
    } catch (error) {
      console.error('Sign up error:', error);
      return { success: false, error: this.handleAuthError(error) };
    }
  }

  async signIn(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      return { success: true, user: data.user };
    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, error: this.handleAuthError(error) };
    }
  }

  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error);
      return { success: false, error: 'Failed to sign out' };
    }
  }

  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      return user;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  async createUserProfile(userId, email, fullName) {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .insert([
          {
            id: userId,
            email: email,
            full_name: fullName
          }
        ]);
      
      if (error) throw error;
    } catch (error) {
      console.error('Create user profile error:', error);
      throw error;
    }
  }

  async getUserProfile(userId) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Get user profile error:', error);
      return null;
    }
  }

  handleAuthError(error) {
    switch (error.message) {
      case 'Invalid login credentials':
        return 'Invalid email or password';
      case 'Email not confirmed':
        return 'Please check your email and click the verification link to confirm your account';
      case 'User already registered':
        return 'An account with this email already exists';
      case 'Password should be at least 6 characters':
        return 'Password must be at least 6 characters long';
      case 'Unable to validate email address: invalid format':
        return 'Please enter a valid email address';
      case 'Signup requires a valid password':
        return 'Please enter a valid password';
      case 'User already registered':
        return 'An account with this email already exists. Please sign in instead.';
      default:
        return error.message || 'An error occurred. Please try again.';
    }
  }

  // Listen for auth state changes
  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback);
  }
}

export default new AuthService();
