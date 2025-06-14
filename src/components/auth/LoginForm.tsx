import { useState } from 'react';
import { Github, Loader2, User, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoLoading, setIsDemoLoading] = useState(false);
  const [isEmailMode, setIsEmailMode] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  const navigate = useNavigate();
  const { login, loginWithEmail, signupWithEmail } = useAuthStore();

  const handleGitHubLogin = async () => {
    setIsLoading(true);
    try {
      await login();
      toast.success('Redirecting to GitHub...');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to connect with GitHub');
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (isSignup) {
        await signupWithEmail(email, password, name);
        toast.success('Account created successfully!');
      } else {
        await loginWithEmail(email, password);
        toast.success('Successfully signed in!');
      }
      navigate('/dashboard', { replace: true });
    } catch (error: any) {
      console.error('Email auth error:', error);
      toast.error(error.message || (isSignup ? 'Failed to create account' : 'Failed to sign in'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsDemoLoading(true);
    try {
      await loginWithEmail('demo@reposage.com', 'demo123456');
      toast.success('Logged in with demo account!');
      navigate('/dashboard', { replace: true });
    } catch (error: any) {
      // If demo account doesn't exist, create it
      try {
        await signupWithEmail('demo@reposage.com', 'demo123456', 'Demo User');
        toast.success('Demo account created! Redirecting to dashboard...');
        navigate('/dashboard', { replace: true });
      } catch (signupError: any) {
        console.error('Demo login error:', signupError);
        toast.error('Failed to access demo account: ' + (signupError.message || 'Unknown error'));
      }
    } finally {
      setIsDemoLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-gray-900 p-6 rounded-xl border border-gray-800">
      <h2 className="text-xl font-semibold text-center mb-6">Get Started with RepoSage</h2>
      
      {!isEmailMode ? (
        <>
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

          <button
            onClick={() => setIsEmailMode(true)}
            className="w-full flex items-center justify-center gap-2 py-3 btn-outline"
          >
            <Mail className="h-5 w-5" />
            Use Email Instead
          </button>
        </>
      ) : (
        <form onSubmit={handleEmailAuth} className="space-y-4">
          {isSignup && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2"
                required
              />
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2"
              required
              minLength={6}
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary py-3"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                {isSignup ? 'Creating Account...' : 'Signing In...'}
              </>
            ) : (
              isSignup ? 'Create Account' : 'Sign In'
            )}
          </button>
          
          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsSignup(!isSignup)}
              className="text-sm text-primary-400 hover:text-primary-300"
            >
              {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
          
          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsEmailMode(false)}
              className="text-sm text-gray-400 hover:text-gray-300"
            >
              ← Back to other options
            </button>
          </div>
        </form>
      )}
    </div>
  );
}