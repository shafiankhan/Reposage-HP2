/*
  # Create users table and authentication setup

  1. New Tables
    - `users`
      - `id` (uuid, primary key) - matches auth.users id
      - `github_id` (text, unique) - GitHub user ID
      - `username` (text) - GitHub username
      - `email` (text) - User's email
      - `avatar_url` (text) - GitHub avatar URL
      - `created_at` (timestamp) - Account creation date
      - `updated_at` (timestamp) - Last update timestamp
      - `credits` (integer) - Available credits

  2. Security
    - Enable RLS on users table
    - Add policies for authenticated users to:
      - Read their own data
      - Update their own data
*/

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

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

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

-- Trigger to automatically create user record
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();