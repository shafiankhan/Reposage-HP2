import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl: string;
  credits: number;
  plan: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: () => Promise<void>;
  handleCallback: (code: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  login: async () => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          scopes: 'repo user:email read:org'
        }
      });
      if (error) throw error;
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Login failed' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  handleCallback: async () => {
    set({ loading: true, error: null });
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      if (!session) throw new Error('No session found');

      // Try to fetch existing user
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single();

      let finalUserData = userData;

      // If user doesn't exist, create them
      if (userError && userError.code === 'PGRST116') {
        const newUser = {
          id: session.user.id,
          github_id: session.user.user_metadata?.user_name || session.user.user_metadata?.preferred_username || session.user.user_metadata?.sub || '',
          username: session.user.user_metadata?.full_name || session.user.user_metadata?.user_name || session.user.user_metadata?.preferred_username || session.user.email?.split('@')[0] || 'User',
          email: session.user.email || '',
          avatar_url: session.user.user_metadata?.avatar_url || 'https://i.pravatar.cc/150?img=1',
          credits: 1000
        };

        const { data: createdUser, error: createError } = await supabase
          .from('users')
          .insert([newUser])
          .select()
          .single();

        if (createError) throw createError;
        finalUserData = createdUser;
      } else if (userError) {
        throw userError;
      }

      set({
        user: {
          id: finalUserData.id,
          email: finalUserData.email,
          name: finalUserData.username,
          avatarUrl: finalUserData.avatar_url,
          credits: finalUserData.credits,
          plan: 'free'
        },
        isAuthenticated: true,
        loading: false
      });
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Authentication failed'
      });
      throw error;
    }
  },

  logout: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Logout failed' });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ loading: true });
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      
      if (session?.user) {
        // Try to fetch existing user
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();

        let finalUserData = userData;

        // If user doesn't exist, create them
        if (userError && userError.code === 'PGRST116') {
          const newUser = {
            id: session.user.id,
            github_id: session.user.user_metadata?.user_name || session.user.user_metadata?.preferred_username || session.user.user_metadata?.sub || 'demo-user',
            username: session.user.user_metadata?.full_name || session.user.user_metadata?.user_name || session.user.user_metadata?.preferred_username || session.user.email?.split('@')[0] || 'User',
            email: session.user.email || '',
            avatar_url: session.user.user_metadata?.avatar_url || 'https://i.pravatar.cc/150?img=1',
            credits: 1000
          };

          const { data: createdUser, error: createError } = await supabase
            .from('users')
            .insert([newUser])
            .select()
            .single();

          if (createError) {
            console.warn('Failed to create user record:', createError);
            // Continue with session data if user creation fails
            finalUserData = {
              id: session.user.id,
              email: session.user.email || '',
              username: session.user.user_metadata?.full_name || 'User',
              avatar_url: session.user.user_metadata?.avatar_url || 'https://i.pravatar.cc/150?img=1',
              credits: 1000,
              github_id: session.user.user_metadata?.user_name || 'demo-user',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            };
          } else {
            finalUserData = createdUser;
          }
        } else if (userError) {
          console.warn('User fetch error:', userError);
          // Continue with session data if user fetch fails
          finalUserData = {
            id: session.user.id,
            email: session.user.email || '',
            username: session.user.user_metadata?.full_name || 'User',
            avatar_url: session.user.user_metadata?.avatar_url || 'https://i.pravatar.cc/150?img=1',
            credits: 1000,
            github_id: session.user.user_metadata?.user_name || 'demo-user',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };
        }

        set({
          user: {
            id: finalUserData.id,
            email: finalUserData.email,
            name: finalUserData.username,
            avatarUrl: finalUserData.avatar_url,
            credits: finalUserData.credits,
            plan: 'free'
          },
          isAuthenticated: true
        });
      } else {
        set({ user: null, isAuthenticated: false });
      }
    } catch (error) {
      console.error('Auth check error:', error);
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ loading: false });
    }
  }
}));