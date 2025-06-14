import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  signupWithEmail: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,

  login: async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) {
        console.error('GitHub OAuth error:', error);
        throw error;
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  loginWithEmail: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error('Email login error:', error);
        throw error;
      }
      
      set({ user: data.user });
    } catch (error) {
      console.error('Login with email failed:', error);
      // Re-throw with more context
      if (error instanceof Error && error.message.includes('Failed to fetch')) {
        throw new Error('Unable to connect to authentication service. Please check your internet connection and try again.');
      }
      throw error;
    }
  },

  signupWithEmail: async (email: string, password: string, name: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            username: name.toLowerCase().replace(/\s+/g, '_')
          }
        }
      });
      
      if (error) {
        console.error('Email signup error:', error);
        throw error;
      }
      
      set({ user: data.user });
    } catch (error) {
      console.error('Signup with email failed:', error);
      // Re-throw with more context
      if (error instanceof Error && error.message.includes('Failed to fetch')) {
        throw new Error('Unable to connect to authentication service. Please check your internet connection and try again.');
      }
      throw error;
    }
  },

  logout: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
        throw error;
      }
      set({ user: null });
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  },

  initialize: async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Session retrieval error:', error);
        set({ isLoading: false });
        return;
      }
      
      set({ user: session?.user ?? null, isLoading: false });

      // Listen for auth changes
      supabase.auth.onAuthStateChange((event, session) => {
        console.log('Auth state changed:', event);
        set({ user: session?.user ?? null, isLoading: false });
      });
    } catch (error) {
      console.error('Auth initialization error:', error);
      set({ isLoading: false });
    }
  }
}));