/*
  # User Management System

  1. New Tables
    - `users`
      - `id` (uuid, primary key, references auth.users)
      - `github_id` (text, unique)
      - `username` (text)
      - `email` (text)
      - `avatar_url` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `credits` (integer, default 1000)

  2. Security
    - Enable RLS on `users` table
    - Add policies for authenticated users to read/update their own data

  3. Functions & Triggers
    - Function to handle new user creation from auth.users
    - Trigger to automatically create user records
*/

-- Create users table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  github_id text UNIQUE NOT NULL,
  username text NOT NULL,
  email text NOT NULL,
  avatar_url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  credits integer DEFAULT 1000
);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DO $$
BEGIN
  -- Drop existing policies
  DROP POLICY IF EXISTS "Users can read own data" ON public.users;
  DROP POLICY IF EXISTS "Users can update own data" ON public.users;
  
  -- Create read policy
  CREATE POLICY "Users can read own data"
    ON public.users
    FOR SELECT
    TO authenticated
    USING (auth.uid() = id);

  -- Create update policy
  CREATE POLICY "Users can update own data"
    ON public.users
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);
END $$;

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, github_id, username, email, avatar_url)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'github_id', new.raw_user_meta_data->>'user_name', 'user-' || new.id::text),
    COALESCE(new.raw_user_meta_data->>'user_name', new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1), 'User'),
    COALESCE(new.email, ''),
    COALESCE(new.raw_user_meta_data->>'avatar_url', 'https://i.pravatar.cc/150?img=' || (abs(hashtext(new.id::text)) % 70 + 1)::text)
  );
  RETURN new;
EXCEPTION
  WHEN unique_violation THEN
    -- User already exists, just return
    RETURN new;
  WHEN OTHERS THEN
    -- Log error but don't fail the auth process
    RAISE WARNING 'Failed to create user record: %', SQLERRM;
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if it exists and recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();