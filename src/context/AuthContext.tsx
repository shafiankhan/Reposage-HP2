import { createContext, useContext, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../stores/authStore';
import toast from 'react-hot-toast';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { user, isAuthenticated, login, logout, checkAuth } = useAuthStore();

  useEffect(() => {
    // Initial auth check
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state change:', event, session?.user?.email);
      
      if (event === 'SIGNED_IN' && session) {
        try {
          await checkAuth();
          toast.success('Successfully signed in!');
          // Small delay to ensure state is updated
          setTimeout(() => {
            navigate('/dashboard');
          }, 100);
        } catch (error) {
          console.error('Error during sign in:', error);
          toast.error('Sign in successful but failed to load user data');
        }
      } else if (event === 'SIGNED_OUT') {
        logout();
        toast.success('Successfully signed out');
        navigate('/');
      } else if (event === 'TOKEN_REFRESHED') {
        await checkAuth();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [checkAuth, logout, navigate]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}