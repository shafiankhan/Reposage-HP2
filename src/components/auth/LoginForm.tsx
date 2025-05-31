import { useState } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../../lib/supabase';
import { Github, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGitHubLogin = async () => {
    setIsLoading(true);
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
      console.error('Error:', error);
      toast.error('Failed to connect with GitHub');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-gray-900 p-6 rounded-xl border border-gray-800">
      <h2 className="text-xl font-semibold text-center mb-6">Get Started with RepoSage</h2>
      
      <button
        onClick={handleGitHubLogin}
        disabled={isLoading}
        className="w-full btn-primary flex items-center justify-center gap-2 py-3 mb-6"
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
          <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
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
          }
        }}
        theme="dark"
        providers={[]}
        redirectTo={`${window.location.origin}/auth/callback`}
      />
    </div>
  );
}