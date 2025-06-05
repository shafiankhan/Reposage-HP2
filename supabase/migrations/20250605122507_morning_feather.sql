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
      - `credits` (integer, default: 0)

  2. Security
    - Enable RLS on users table
    - Add policies for:
      - Users can read their own data
      - Users can update their own data
      - New users are created automatically via trigger
*/

-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  github_id text UNIQUE NOT NULL,
  username text NOT NULL,
  email text NOT NULL,
  avatar_url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  credits integer DEFAULT 0
);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own data"
  ON public.users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON public.users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (
    id,
    github_id,
    username,
    email,
    avatar_url
  )
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'sub',
    NEW.raw_user_meta_data->>'preferred_username',
    NEW.email,
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create user record
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();