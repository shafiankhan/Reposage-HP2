import { create } from 'zustand';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GithubAuthProvider,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { firebaseService } from '../services/firebase';

interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl: string;
  credits: number;
  plan: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  signupWithEmail: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  login: async () => {
    set({ loading: true, error: null });
    try {
      const provider = new GithubAuthProvider();
      provider.addScope('repo');
      provider.addScope('user:email');
      provider.addScope('read:org');
      
      const result = await signInWithPopup(auth, provider);
      const credential = GithubAuthProvider.credentialFromResult(result);
      
      if (result.user) {
        await get().createOrUpdateUser(result.user, credential?.accessToken);
      }
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Login failed' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  loginWithEmail: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (result.user) {
        await get().createOrUpdateUser(result.user);
      }
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Login failed' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  signupWithEmail: async (email: string, password: string, name: string) => {
    set({ loading: true, error: null });
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      if (result.user) {
        await get().createOrUpdateUser(result.user, undefined, name);
      }
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Signup failed' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Logout failed' });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ loading: true });
    
    return new Promise<void>((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        try {
          if (firebaseUser) {
            await get().createOrUpdateUser(firebaseUser);
          } else {
            set({ user: null, isAuthenticated: false, loading: false });
          }
        } catch (error) {
          console.error('Auth check error:', error);
          set({ user: null, isAuthenticated: false, loading: false });
        }
        unsubscribe();
        resolve();
      });
    });
  },

  // Helper method to create or update user
  createOrUpdateUser: async (firebaseUser: FirebaseUser, githubToken?: string, displayName?: string) => {
    try {
      let userData = await firebaseService.getUserByAuthId(firebaseUser.uid);
      
      if (!userData) {
        // Create new user
        const newUserData = {
          authId: firebaseUser.uid,
          githubId: firebaseUser.providerData[0]?.uid || firebaseUser.uid,
          username: displayName || 
                   firebaseUser.displayName || 
                   firebaseUser.email?.split('@')[0] || 
                   'User',
          email: firebaseUser.email || '',
          avatarUrl: firebaseUser.photoURL || 
                    `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
          credits: 1000
        };
        
        const userId = await firebaseService.createUser(newUserData);
        userData = { id: userId, ...newUserData, createdAt: new Date(), updatedAt: new Date() };
      } else {
        // Update existing user
        await firebaseService.updateUser(userData.id, {
          email: firebaseUser.email || userData.email,
          avatarUrl: firebaseUser.photoURL || userData.avatarUrl,
          username: displayName || firebaseUser.displayName || userData.username
        });
      }

      set({
        user: {
          id: userData.id,
          email: userData.email,
          name: userData.username,
          avatarUrl: userData.avatarUrl,
          credits: userData.credits,
          plan: 'free'
        },
        isAuthenticated: true,
        loading: false
      });
    } catch (error) {
      console.error('Error creating/updating user:', error);
      set({ loading: false });
      throw error;
    }
  }
}));