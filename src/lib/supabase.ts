import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface UserDocument {
  id: string;
  github_id: string;
  username: string;
  email: string;
  avatar_url: string;
  credits: number;
  created_at?: string;
  updated_at?: string;
}

export interface ProjectDocument {
  id: string;
  user_id: string;
  name: string;
  description: string;
  github_url: string;
  owner: string;
  repo: string;
  is_private: boolean;
  stars: number;
  forks: number;
  issues: number;
  language: string;
  last_updated: string;
  created_at?: string;
  updated_at?: string;
}