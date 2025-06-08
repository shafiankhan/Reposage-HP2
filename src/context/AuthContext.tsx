import { createContext, useContext, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();
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
          
          // Always redirect to dashboard after successful sign in
          setTimeout(() => {
            navigate('/dashboard', { replace: true });
          }, 500);
        } catch (error) {
          console.error('Error during sign in:', error);
          toast.error('Sign in successful but failed to load user data');
          // Still redirect to dashboard even if user data loading fails
          setTimeout(() => {
            navigate('/dashboard', { replace: true });
          }, 1000);
        }
      } else if (event === 'SIGNED_OUT') {
        logout();
        toast.success('Successfully signed out');
        navigate('/', { replace: true });
      } else if (event === 'TOKEN_REFRESHED') {
        await checkAuth();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [checkAuth, logout, navigate]);

  // Redirect authenticated users away from landing page
  useEffect(() => {
    if (isAuthenticated && location.pathname === '/') {
      console.log('Redirecting authenticated user to dashboard');
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, location.pathname, navigate]);

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