import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Connect to emulators in development
if (import.meta.env.DEV) {
  try {
    connectAuthEmulator(auth, 'http://localhost:9099');
    connectFirestoreEmulator(db, 'localhost', 8080);
    connectStorageEmulator(storage, 'localhost', 9199);
  } catch (error) {
    // Emulators already connected
  }
}

export default app;

// Types for Firestore documents
export interface UserDocument {
  id: string;
  githubId: string;
  username: string;
  email: string;
  avatarUrl: string;
  createdAt: Date;
  updatedAt: Date;
  credits: number;
}

export interface ProjectDocument {
  id: string;
  userId: string;
  name: string;
  description: string;
  githubUrl: string;
  owner: string;
  repo: string;
  isPrivate: boolean;
  stars: number;
  forks: number;
  issues: number;
  language: string;
  lastUpdated: Date;
  createdAt: Date;
}

export interface ChatMessageDocument {
  id: string;
  projectId: string;
  userId: string;
  isUser: boolean;
  content: string;
  timestamp: Date;
  sources?: string[];
  codeSnippets?: string[];
}

export interface MeetingDocument {
  id: string;
  userId: string;
  projectId?: string;
  title: string;
  date: Date;
  duration: string;
  participants: string[];
  summary: string;
  tags: string[];
  transcript?: {
    segments: {
      id: string;
      speaker: string;
      text: string;
      timestamp: string;
    }[];
  };
  actionItems?: string[];
  createdAt: Date;
}