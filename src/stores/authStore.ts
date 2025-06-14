import { create } from 'zustand';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GithubAuthProvider,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { firebaseService } from '../services/firebase';
import type { UserDocument } from '../lib/firebase';

interface AuthState {
  user: UserDocument | null;
  firebaseUser: User | null;
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
  firebaseUser: null,
  isLoading: true,
  isAuthenticated: false,

  login: async () => {
    try {
      const provider = new GithubAuthProvider();
      provider.addScope('repo');
      provider.addScope('user:email');
      provider.addScope('read:org');
      
      const result = await signInWithPopup(auth, provider);
      // User will be handled by the auth state change listener
    } catch (error) {
      console.error('GitHub OAuth error:', error);
      throw error;
    }
  },

  loginWithEmail: async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      // User will be handled by the auth state change listener
    } catch (error) {
      console.error('Email login error:', error);
      throw error;
    }
  },

  signupWithEmail: async (email: string, password: string, name: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create user document in Firestore
      const userData = {
        username: name,
        email: email,
        avatarUrl: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
        credits: 1000
      };
      
      await firebaseService.createUser(userData);
      
      // User will be handled by the auth state change listener
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
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          set({ firebaseUser, isLoading: true });

          // Try to get existing user from Firestore
          let user = await firebaseService.getUserByEmail(firebaseUser.email!);

          // If user doesn't exist, create them
          if (!user) {
            const userData = {
              githubId: firebaseUser.providerData[0]?.uid,
              username: firebaseUser.displayName || 
                       firebaseUser.email?.split('@')[0] || 
                       'User',
              email: firebaseUser.email!,
              avatarUrl: firebaseUser.photoURL || 
                        `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
              credits: 1000
            };

            const userId = await firebaseService.createUser(userData);
            user = await firebaseService.getUser(userId);
          }

          set({ 
            user, 
            firebaseUser,
            isAuthenticated: true, 
            isLoading: false 
          });
        } catch (error) {
          console.error('Error handling auth user:', error);
          set({ 
            user: null, 
            firebaseUser: null,
            isAuthenticated: false, 
            isLoading: false 
          });
        }
      } else {
        set({ 
          user: null, 
          firebaseUser: null,
          isAuthenticated: false, 
          isLoading: false 
        });
      }
    });
  }
}));