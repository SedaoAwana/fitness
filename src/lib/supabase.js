import { createClient } from '@supabase/supabase-js';

console.log('ENV CHECK:', {
  url: process.env.REACT_APP_SUPABASE_URL,
  hasKey: !!process.env.REACT_APP_SUPABASE_ANON_KEY,
  urlLength: process.env.REACT_APP_SUPABASE_URL?.length,
  keyLength: process.env.REACT_APP_SUPABASE_ANON_KEY?.length
});

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Create a mock client if environment variables are missing (for development)
const supabase = (!supabaseUrl || !supabaseAnonKey) 
  ? (() => {
      console.warn('⚠️ Supabase environment variables not found. Using mock client for development.');
      console.warn('URL exists:', !!supabaseUrl, 'Key exists:', !!supabaseAnonKey);
      
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
  : (() => {
      console.log('✅ Using real Supabase client');
      return createClient(supabaseUrl, supabaseAnonKey);
    })();

export { supabase };
