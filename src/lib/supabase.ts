import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper function to check if Supabase is configured
export async function checkSupabaseConnection() {
  try {
    const { data, error } = await supabase
      .from('professionals')
      .select('id')
      .limit(1);
    
    if (error) throw error;
    return !!data;
  } catch (error) {
    console.error('Supabase connection error:', error);
    return false;
  }
}