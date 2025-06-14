import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDXxj7umX5ucd6KqewKdwCeN7Hi1nAULYc",
  authDomain: "reposages.firebaseapp.com",
  projectId: "reposages",
  storageBucket: "reposages.firebasestorage.app",
  messagingSenderId: "263017033337",
  appId: "1:263017033337:web:5311c12bda39136a2eeea8",
  measurementId: "G-32S3SLJ5Y7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;

// Types for Firestore documents
export interface UserDocument {
  id: string;
  githubId?: string;
  username: string;
  email: string;
  avatarUrl: string;
  credits: number;
  createdAt: Date;
  updatedAt: Date;
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