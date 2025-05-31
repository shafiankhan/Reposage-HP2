import { create } from 'zustand';
import { AuthService } from '../services/auth';
import { githubService } from '../services/github';

interface User {
  login: string;
  avatar_url: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: () => void;
  handleCallback: (code: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  login: () => {
    AuthService.initiateGitHubLogin();
  },

  handleCallback: async (code: string) => {
    set({ loading: true, error: null });
    try {
      const token = await AuthService.handleCallback(code);
      const user = await AuthService.getCurrentUser(token);
      githubService.setToken(token);
      set({ user, isAuthenticated: true, loading: false });
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Authentication failed'
      });
      throw error;
    }
  },

  logout: () => {
    AuthService.logout();
    githubService.setToken(undefined);
    set({ user: null, isAuthenticated: false });
  },

  checkAuth: async () => {
    const token = AuthService.getToken();
    if (!token) {
      set({ isAuthenticated: false });
      return;
    }

    set({ loading: true });
    try {
      const user = await AuthService.getCurrentUser(token);
      githubService.setToken(token);
      set({ user, isAuthenticated: true, loading: false });
    } catch (error) {
      AuthService.logout();
      set({ user: null, isAuthenticated: false, loading: false });
    }
  }
}));