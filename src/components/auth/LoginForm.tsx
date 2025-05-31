import { useState } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../../lib/supabase';
import { Github } from 'lucide-react';

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGitHubLogin = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <button
        onClick={handleGitHubLogin}
        disabled={isLoading}
        className="w-full btn-primary flex items-center justify-center gap-2 py-3"
      >
        <Github className="h-5 w-5" />
        {isLoading ? 'Connecting...' : 'Continue with GitHub'}
      </button>

      <div className="mt-6">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={[]}
          redirectTo={`${window.location.origin}/auth/callback`}
        />
      </div>
    </div>
  );
}