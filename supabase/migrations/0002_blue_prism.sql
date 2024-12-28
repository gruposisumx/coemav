/*
  # Initial Schema Setup

  1. Tables
    - professionals
    - blog_posts
    - comments
    - resources
    - events
    - contact_requests

  2. Security
    - Enable RLS on all tables
    - Add policies for public and authenticated access
*/

-- Professionals table
CREATE TABLE IF NOT EXISTS professionals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  image_url text NOT NULL,
  bio text NOT NULL,
  years_experience integer NOT NULL,
  specialties text[] NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  author_id uuid REFERENCES auth.users(id),
  likes_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Resources table
CREATE TABLE IF NOT EXISTS resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  type text NOT NULL CHECK (type IN ('pdf', 'audio', 'image', 'video')),
  url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  event_date timestamptz NOT NULL,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public professionals are viewable by everyone" 
ON professionals FOR SELECT USING (true);

CREATE POLICY "Blog posts are viewable by everyone" 
ON blog_posts FOR SELECT USING (true);

CREATE POLICY "Users can create blog posts" 
ON blog_posts FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Resources are viewable by everyone" 
ON resources FOR SELECT USING (true);

CREATE POLICY "Events are viewable by everyone" 
ON events FOR SELECT USING (true);

-- Insert initial data
INSERT INTO professionals (name, image_url, bio, years_experience, specialties) VALUES
(
  'Dra. María González',
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
  'Especialista en trauma y recuperación emocional.',
  15,
  ARRAY['Trauma', 'Ansiedad', 'Depresión']
);

INSERT INTO resources (title, description, type, url) VALUES
(
  'Guía de Autoayuda',
  'Recursos prácticos para el manejo del estrés y la ansiedad',
  'pdf',
  'https://example.com/guia.pdf'
);

INSERT INTO events (title, description, location, event_date, image_url) VALUES
(
  'Taller de Empoderamiento',
  'Aprende herramientas prácticas para fortalecer tu autoestima',
  'Centro Comunitario',
  NOW() + interval '7 days',
  'https://images.unsplash.com/photo-1528605105345-5344ea20e269?auto=format&fit=crop&q=80&w=400'
);