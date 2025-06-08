import { useState } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../../lib/supabase';
import { Github, Loader2, User } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoLoading, setIsDemoLoading] = useState(false);

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
      // Create a demo user account
      const demoEmail = 'demo@reposage.com';
      const demoPassword = 'demo123456';
      
      // Try to sign in first
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: demoEmail,
        password: demoPassword,
      });

      if (signInError && signInError.message.includes('Invalid login credentials')) {
        // If demo user doesn't exist, create it
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: demoEmail,
          password: demoPassword,
          options: {
            data: {
              user_name: 'demo-user',
              full_name: 'Demo User',
              avatar_url: 'https://i.pravatar.cc/150?img=1',
              github_id: 'demo-user-123'
            }
          }
        });

        if (signUpError) throw signUpError;
        
        toast.success('Demo account created! Please check your email to confirm (or wait a moment for auto-login)');
        
        // Try to sign in again after a short delay
        setTimeout(async () => {
          const { error: retryError } = await supabase.auth.signInWithPassword({
            email: demoEmail,
            password: demoPassword,
          });
          
          if (!retryError) {
            toast.success('Demo account logged in!');
          }
        }, 2000);
        
      } else if (signInError) {
        throw signInError;
      } else {
        toast.success('Logged in with demo account!');
      }
      
    } catch (error) {
      console.error('Demo login error:', error);
      toast.error('Failed to access demo account');
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
            Setting up Demo...
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