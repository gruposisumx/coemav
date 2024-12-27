/*
  # Initial Schema Setup for COEMAV Platform

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `full_name` (text)
      - `phone` (text)
      - `created_at` (timestamp with time zone)
      - `updated_at` (timestamp with time zone)
    
    - `appointments`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `psychologist_id` (uuid, references psychologists)
      - `description` (text)
      - `preferred_time` (text)
      - `status` (text)
      - `created_at` (timestamp with time zone)
      - `updated_at` (timestamp with time zone)
    
    - `psychologists`
      - `id` (uuid, primary key)
      - `full_name` (text)
      - `specialization` (text)
      - `years_experience` (integer)
      - `image_url` (text)
      - `created_at` (timestamp with time zone)
      - `updated_at` (timestamp with time zone)
    
    - `blog_posts`
      - `id` (uuid, primary key)
      - `author_id` (uuid, references profiles)
      - `title` (text)
      - `content` (text)
      - `created_at` (timestamp with time zone)
      - `updated_at` (timestamp with time zone)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name text,
  phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create psychologists table
CREATE TABLE IF NOT EXISTS psychologists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  specialization text,
  years_experience integer DEFAULT 0,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles ON DELETE CASCADE NOT NULL,
  psychologist_id uuid REFERENCES psychologists ON DELETE CASCADE NOT NULL,
  description text,
  preferred_time text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id uuid REFERENCES profiles ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE psychologists ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Psychologists policies
CREATE POLICY "Anyone can view psychologists"
  ON psychologists FOR SELECT
  TO authenticated
  USING (true);

-- Appointments policies
CREATE POLICY "Users can view their own appointments"
  ON appointments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own appointments"
  ON appointments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own appointments"
  ON appointments FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Blog posts policies
CREATE POLICY "Anyone can view blog posts"
  ON blog_posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create blog posts"
  ON blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their own posts"
  ON blog_posts FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id);