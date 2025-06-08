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
      // Wait for auth state to settle
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      if (!session) throw new Error('No session found');

      await get().checkAuth();
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
        let { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .maybeSingle(); // Use maybeSingle to avoid errors when no rows found

        let finalUserData = userData;

        // If user doesn't exist, create them
        if (!userData) {
          console.log('Creating new user record for:', session.user.email);
          
          const newUser = {
            id: session.user.id,
            github_id: session.user.user_metadata?.user_name || 
                      session.user.user_metadata?.preferred_username || 
                      session.user.user_metadata?.sub || 
                      session.user.email?.split('@')[0] || 
                      'user-' + Date.now(),
            username: session.user.user_metadata?.full_name || 
                     session.user.user_metadata?.name ||
                     session.user.user_metadata?.user_name || 
                     session.user.user_metadata?.preferred_username || 
                     session.user.email?.split('@')[0] || 
                     'User',
            email: session.user.email || '',
            avatar_url: session.user.user_metadata?.avatar_url || 
                       `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
            credits: 1000
          };

          const { data: createdUser, error: createError } = await supabase
            .from('users')
            .insert([newUser])
            .select()
            .single();

          if (createError) {
            console.warn('Failed to create user record:', createError);
            // Continue with fallback user data
            finalUserData = {
              id: session.user.id,
              email: session.user.email || '',
              username: newUser.username,
              avatar_url: newUser.avatar_url,
              credits: 1000,
              github_id: newUser.github_id,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            };
          } else {
            finalUserData = createdUser;
            console.log('User record created successfully');
          }
        } else if (userError) {
          console.warn('User fetch error:', userError);
          // Continue with fallback user data
          finalUserData = {
            id: session.user.id,
            email: session.user.email || '',
            username: session.user.user_metadata?.full_name || 
                     session.user.user_metadata?.name ||
                     session.user.email?.split('@')[0] || 
                     'User',
            avatar_url: session.user.user_metadata?.avatar_url || 
                       `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
            credits: 1000,
            github_id: session.user.user_metadata?.user_name || 'user-' + Date.now(),
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
          isAuthenticated: true,
          loading: false
        });
      } else {
        set({ user: null, isAuthenticated: false, loading: false });
      }
    } catch (error) {
      console.error('Auth check error:', error);
      set({ user: null, isAuthenticated: false, loading: false });
    }
  }
}));