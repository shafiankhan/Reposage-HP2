import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Github, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="w-full max-w-md bg-gray-900 p-6 rounded-xl border border-gray-800">
      <h2 className="text-xl font-semibold text-center mb-6">Get Started with RepoSage</h2>
      
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

      <p className="text-sm text-gray-400 text-center">
        Sign in with your GitHub account to access your repositories and start using RepoSage.
      </p>
    </div>
  );
}