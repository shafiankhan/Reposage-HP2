import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
});

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          github_id: string
          username: string
          email: string
          avatar_url: string
          created_at: string
          updated_at: string
          credits: number
        }
        Insert: {
          id?: string
          github_id: string
          username: string
          email: string
          avatar_url: string
          created_at?: string
          updated_at?: string
          credits?: number
        }
        Update: {
          id?: string
          github_id?: string
          username?: string
          email?: string
          avatar_url?: string
          created_at?: string
          updated_at?: string
          credits?: number
        }
      }
    }
  }
}