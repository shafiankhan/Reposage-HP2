import { useState } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../../lib/supabase';
import { Github, Loader2, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../stores/authStore';

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoLoading, setIsDemoLoading] = useState(false);
  const checkAuth = useAuthStore(state => state.checkAuth);

  const handleGitHubLogin = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          scopes: 'repo user:email read:org'
        }
      });
      
      if (error) throw error;
      if (!data.url) throw new Error('No OAuth URL returned');
      
      window.location.href = data.url;
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to connect with GitHub');
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsDemoLoading(true);
    try {
      // Create a unique demo user to avoid conflicts
      const timestamp = Date.now();
      const demoEmail = `demo-${timestamp}@reposage.com`;
      const demoPassword = 'demo123456';
      
      // Create demo user account
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: demoEmail,
        password: demoPassword,
        options: {
          emailRedirectTo: undefined, // Skip email confirmation
          data: {
            user_name: `demo-user-${timestamp}`,
            full_name: 'Demo User',
            avatar_url: 'https://i.pravatar.cc/150?img=1',
            github_id: `demo-user-${timestamp}`
          }
        }
      });

      if (signUpError) {
        console.error('Demo signup error:', signUpError);
        // If signup fails, try with existing demo account
        const fallbackEmail = 'demo@reposage.com';
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email: fallbackEmail,
          password: demoPassword,
        });
        
        if (signInError) {
          // If sign-in fails due to invalid credentials or user not found, create the fallback account
          if (signInError.message.includes('Invalid login credentials') || signInError.message.includes('User not found')) {
            const { data: fallbackSignUpData, error: fallbackSignUpError } = await supabase.auth.signUp({
              email: fallbackEmail,
              password: demoPassword,
              options: {
                emailRedirectTo: undefined, // Skip email confirmation
                data: {
                  user_name: 'demo-user',
                  full_name: 'Demo User',
                  avatar_url: 'https://i.pravatar.cc/150?img=1',
                  github_id: 'demo-user'
                }
              }
            });
            
            if (fallbackSignUpError) {
              throw new Error('Failed to create fallback demo account');
            }
            
            toast.success('Demo account created and logged in!');
            
            // Wait a moment for auth state to update
            setTimeout(async () => {
              await checkAuth();
              window.location.href = '/dashboard';
            }, 1000);
          } else {
            throw new Error('Failed to access demo account');
          }
        } else {
          toast.success('Logged in with demo account!');
        }
      } else {
        // If signup successful, the user should be automatically signed in
        toast.success('Demo account created and logged in!');
        
        // Wait a moment for auth state to update
        setTimeout(async () => {
          await checkAuth();
          window.location.href = '/dashboard';
        }, 1000);
      }
      
    } catch (error) {
      console.error('Demo login error:', error);
      toast.error('Failed to access demo account. Please try email signup instead.');
    } finally {
      setIsDemoLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-gray-900 p-6 rounded-xl border border-gray-800">
      <h2 className="text-xl font-semibold text-center mb-6">Get Started with RepoSage</h2>
      
      <button
        onClick={handleDemoLogin}
        disabled={isDemoLoading}
        className="w-full flex items-center justify-center gap-2 py-3 mb-4 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors disabled:opacity-50"
      >
        {isDemoLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Creating Demo Account...
          </>
        ) : (
          <>
            <User className="h-5 w-5" />
            Try Demo Account
          </>
        )}
      </button>
      
      <button
        onClick={handleGitHubLogin}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 py-3 mb-6 btn-primary"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Connecting...
          </>
        ) : (
          <>
            <Github className="h-5 w-5" />
            Continue with GitHub
          </>
        )}
      </button>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gray-900 text-gray-400">Or continue with email</span>
        </div>
      </div>

      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#2563eb',
                brandAccent: '#1d4ed8'
              }
            }
          },
          className: {
            container: 'supabase-auth-container',
            button: 'supabase-auth-button',
            input: 'supabase-auth-input'
          }
        }}
        theme="dark"
        providers={[]}
        redirectTo={`${window.location.origin}/auth/callback`}
      />
    </div>
  );
}