import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for database documents
export interface UserDocument {
  id: string;
  github_id: string;
  username: string;
  email: string;
  avatar_url: string;
  created_at: string;
  updated_at: string;
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