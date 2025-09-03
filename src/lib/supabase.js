import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a mock client if environment variables are missing (for development)
const supabase = (!supabaseUrl || !supabaseAnonKey) 
  ? (() => {
      console.warn('⚠️ Supabase environment variables not found. Using mock client for development.');
      
      // Create a mock client that won't crash the app
      return {
        auth: {
          getUser: async () => ({ data: { user: null }, error: null }),
          signUp: async () => ({ data: { user: null }, error: { message: 'Please set up Supabase environment variables' } }),
          signInWithPassword: async () => ({ data: { user: null }, error: { message: 'Please set up Supabase environment variables' } }),
          signOut: async () => ({ error: null }),
          onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
        },
        from: () => ({
          select: () => ({ eq: () => ({ single: () => ({ data: null, error: null }) }) }),
          insert: () => ({ select: () => ({ single: () => ({ data: null, error: null }) }) }),
          update: () => ({ eq: () => ({ select: () => ({ single: () => ({ data: null, error: null }) }) }) }),
          delete: () => ({ eq: () => ({ error: null }) })
        }),
        storage: {
          from: () => ({
            upload: () => ({ data: null, error: null }),
            getPublicUrl: () => ({ data: { publicUrl: '' } })
          })
        }
      };
    })()
  : createClient(supabaseUrl, supabaseAnonKey);

export { supabase };
