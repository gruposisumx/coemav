export type Profile = {
  id: string;
  full_name: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
};

export type Psychologist = {
  id: string;
  full_name: string;
  specialization: string | null;
  years_experience: number;
  image_url: string | null;
  created_at: string;
  updated_at: string;
};

export type Appointment = {
  id: string;
  user_id: string;
  psychologist_id: string;
  description: string | null;
  preferred_time: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

export type BlogPost = {
  id: string;
  author_id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};