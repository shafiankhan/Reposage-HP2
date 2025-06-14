import { create } from 'zustand';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GithubAuthProvider,
  User
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { firebaseService } from '../services/firebase';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  signupWithEmail: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  login: async () => {
    try {
      const provider = new GithubAuthProvider();
      provider.addScope('repo');
      provider.addScope('user:email');
      provider.addScope('read:org');
      
      const result = await signInWithPopup(auth, provider);
      
      // Create or update user document in Firestore
      const existingUser = await firebaseService.getUserByAuthId(result.user.uid);
      if (!existingUser) {
        await firebaseService.createUser({
          githubId: result.user.providerData[0]?.uid || result.user.uid,
          username: result.user.displayName || result.user.email?.split('@')[0] || 'User',
          email: result.user.email || '',
          avatarUrl: result.user.photoURL || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
          credits: 1000
        });
      }
    } catch (error) {
      console.error('GitHub OAuth error:', error);
      throw error;
    }
  },

  loginWithEmail: async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      // Ensure user document exists
      const existingUser = await firebaseService.getUserByAuthId(result.user.uid);
      if (!existingUser) {
        await firebaseService.createUser({
          githubId: result.user.uid,
          username: result.user.displayName || result.user.email?.split('@')[0] || 'User',
          email: result.user.email || '',
          avatarUrl: result.user.photoURL || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
          credits: 1000
        });
      }
    } catch (error) {
      console.error('Email login error:', error);
      throw error;
    }
  },

  signupWithEmail: async (email: string, password: string, name: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create user document in Firestore
      await firebaseService.createUser({
        githubId: result.user.uid,
        username: name,
        email: result.user.email || '',
        avatarUrl: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
        credits: 1000
      });
    } catch (error) {
      console.error('Email signup error:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  initialize: () => {
    onAuthStateChanged(auth, (user) => {
      set({ 
        user, 
        isAuthenticated: !!user, 
        isLoading: false 
      });
    });
  }
}));