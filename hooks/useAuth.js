import { useState, useEffect } from 'react';
import { auth } from '../utils/supabase';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSupabaseConfigured, setIsSupabaseConfigured] = useState(false);

  useEffect(() => {
    // Check if Supabase is configured
    const checkSupabaseConfig = () => {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      console.log('Supabase URL:', supabaseUrl);
      console.log('Supabase Key exists:', !!supabaseKey);
      
      // Check if we have valid credentials (not placeholder values)
      const configured = !!(supabaseUrl && supabaseKey && 
        supabaseUrl !== 'https://your-project-id.supabase.co' && 
        supabaseKey !== 'your_anon_public_key_here');
      
      console.log('Supabase configured:', configured);
      setIsSupabaseConfigured(configured);
      
      if (!configured) {
        // If not configured, skip auth and show app directly
        setLoading(false);
        return;
      }
    };

    checkSupabaseConfig();

    // Only proceed with auth if Supabase is configured
    if (isSupabaseConfigured) {
      // Get initial user
      const getInitialUser = async () => {
        try {
          const currentUser = await auth.getCurrentUser();
          setUser(currentUser);
        } catch (error) {
          console.error('Error getting initial user:', error);
        } finally {
          setLoading(false);
        }
      };

      getInitialUser();

      // Listen for auth state changes
      const { data: { subscription } } = auth.onAuthStateChange((event, session) => {
        setUser(session?.user || null);
        setLoading(false);
      });

      return () => subscription.unsubscribe();
    }
  }, [isSupabaseConfigured]);

  const signIn = async (email, password) => {
    const { data, error } = await auth.signIn(email, password);
    if (error) throw error;
    return data;
  };

  const signUp = async (email, password) => {
    const { data, error } = await auth.signUp(email, password);
    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    const { error } = await auth.signOut();
    if (error) throw error;
  };

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!user,
    isSupabaseConfigured
  };
};
