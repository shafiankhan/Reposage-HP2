import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const handleCallback = useAuthStore(state => state.handleCallback);

  useEffect(() => {
    const code = searchParams.get('code');
    if (!code) {
      toast.error('Authentication failed');
      navigate('/');
      return;
    }

    handleCallback(code)
      .then(() => {
        toast.success('Successfully connected to GitHub');
        navigate('/dashboard');
      })
      .catch((error) => {
        toast.error(error.message);
        navigate('/');
      });
  }, [searchParams, handleCallback, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-dark">
      <div className="text-center">
        <Loader2 className="h-12 w-12 text-primary-500 animate-spin mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-white mb-2">
          Connecting to GitHub
        </h2>
        <p className="text-gray-400">
          Please wait while we complete the authentication...
        </p>
      </div>
    </div>
  );
}