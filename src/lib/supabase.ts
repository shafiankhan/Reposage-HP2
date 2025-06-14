import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug logging to help identify configuration issues
console.log('Supabase URL:', supabaseUrl ? 'Set' : 'Missing');
console.log('Supabase Anon Key:', supabaseAnonKey ? 'Set' : 'Missing');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables:');
  console.error('VITE_SUPABASE_URL:', supabaseUrl);
  console.error('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? '[REDACTED]' : 'undefined');
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

// Validate URL format
try {
  new URL(supabaseUrl);
} catch (error) {
  console.error('Invalid Supabase URL format:', supabaseUrl);
  throw new Error('Invalid Supabase URL format. Please check your VITE_SUPABASE_URL in .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js-web'
    }
  }
});

// Test connection on initialization
supabase.auth.getSession().catch((error) => {
  console.error('Supabase connection test failed:', error);
  console.error('Please verify:');
  console.error('1. Your Supabase project is running');
  console.error('2. VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are correct');
  console.error('3. Your network can reach the Supabase URL');
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