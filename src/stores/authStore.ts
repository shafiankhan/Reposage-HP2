import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { supabaseService } from '../services/supabase';
import type { UserDocument } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

interface AuthState {
  user: UserDocument | null;
  authUser: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  signupWithEmail: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  authUser: null,
  isLoading: true,
  isAuthenticated: false,

  login: async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          scopes: 'repo user:email read:org'
        }
      });

      if (error) throw error;

      // The user will be handled by the auth state change listener
    } catch (error) {
      console.error('GitHub OAuth error:', error);
      throw error;
    }
  },

  loginWithEmail: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      // The user will be handled by the auth state change listener
    } catch (error) {
      console.error('Email login error:', error);
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
            username: name
          }
        }
      });

      if (error) throw error;

      // The user will be handled by the auth state change listener
    } catch (error) {
      console.error('Email signup error:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  initialize: () => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        handleAuthUser(session.user);
      } else {
        set({ 
          user: null, 
          authUser: null,
          isAuthenticated: false, 
          isLoading: false 
        });
      }
    });

    // Listen for auth changes
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await handleAuthUser(session.user);
      } else {
        set({ 
          user: null, 
          authUser: null,
          isAuthenticated: false, 
          isLoading: false 
        });
      }
    });

    async function handleAuthUser(authUser: User) {
      try {
        set({ authUser, isLoading: true });

        // Try to get existing user from database
        let user = await supabaseService.getUserByAuthId(authUser.id);

        // If user doesn't exist, create them
        if (!user) {
          const userData = {
            github_id: authUser.user_metadata?.provider_id || authUser.id,
            username: authUser.user_metadata?.user_name || 
                     authUser.user_metadata?.username || 
                     authUser.email?.split('@')[0] || 
                     'User',
            email: authUser.email || '',
            avatar_url: authUser.user_metadata?.avatar_url || 
                       `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
            credits: 1000
          };

          user = await supabaseService.createUser(userData);
        }

        set({ 
          user, 
          authUser,
          isAuthenticated: true, 
          isLoading: false 
        });
      } catch (error) {
        console.error('Error handling auth user:', error);
        set({ 
          user: null, 
          authUser: null,
          isAuthenticated: false, 
          isLoading: false 
        });
      }
    }
  }
}));