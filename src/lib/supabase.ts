import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
      projects: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string
          github_url: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description: string
          github_url: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string
          github_url?: string
          created_at?: string
          updated_at?: string
        }
      }
      chat_messages: {
        Row: {
          id: string
          project_id: string
          user_id: string
          content: string
          is_ai: boolean
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          user_id: string
          content: string
          is_ai: boolean
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          user_id?: string
          content?: string
          is_ai?: boolean
          created_at?: string
        }
      }
      meetings: {
        Row: {
          id: string
          project_id: string
          title: string
          summary: string
          duration: number
          recording_url: string
          transcript: Json
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          title: string
          summary: string
          duration: number
          recording_url: string
          transcript?: Json
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          title?: string
          summary?: string
          duration?: number
          recording_url?: string
          transcript?: Json
          created_at?: string
        }
      }
    }
  }
}