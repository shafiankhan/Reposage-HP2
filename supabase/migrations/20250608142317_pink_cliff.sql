/*
  # Create users table and security policies

  1. New Tables
    - `users`
      - `id` (uuid, primary key, references auth.users)
      - `github_id` (text, unique)
      - `username` (text)
      - `email` (text)
      - `avatar_url` (text)
      - `created_at` (timestamptz, default: now())
      - `updated_at` (timestamptz, default: now())
      - `credits` (integer, default: 1000)

  2. Security
    - Enable RLS on users table
    - Add policies for:
      - Users can read their own data
      - Users can update their own data
      - New users are created automatically via trigger

  3. Changes
    - Fixed duplicate policy creation errors
    - Added proper conditional checks for all database objects
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

-- Create policies only if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'users' 
    AND policyname = 'Users can read own data'
  ) THEN
    CREATE POLICY "Users can read own data"
      ON public.users
      FOR SELECT
      TO authenticated
      USING (auth.uid() = id);
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'users' 
    AND policyname = 'Users can update own data'
  ) THEN
    CREATE POLICY "Users can update own data"
      ON public.users
      FOR UPDATE
      TO authenticated
      USING (auth.uid() = id)
      WITH CHECK (auth.uid() = id);
  END IF;
END $$;

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, github_id, username, email, avatar_url)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'github_id',
    new.raw_user_meta_data->>'user_name',
    new.email,
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if it exists, then create new one
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();