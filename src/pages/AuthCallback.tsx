import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AuthCallback() {
  const navigate = useNavigate();
  const checkAuth = useAuthStore(state => state.checkAuth);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Wait for auth state to settle
        await new Promise(resolve => setTimeout(resolve, 1500));
        await checkAuth();
        navigate('/dashboard');
      } catch (error) {
        console.error('Auth callback error:', error);
        toast.error('Authentication failed');
        navigate('/');
      }
    };

    handleAuthCallback();
  }, [checkAuth, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-dark">
      <div className="text-center">
        <Loader2 className="h-12 w-12 text-primary-500 animate-spin mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-white mb-2">
          Completing Authentication
        </h2>
        <p className="text-gray-400">
          Please wait while we set up your account...
        </p>
      </div>
    </div>
  );
}