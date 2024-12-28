import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { BlogPost } from './components/BlogPost';
import { CreatePostForm } from './components/CreatePostForm';
import { useSupabaseQuery } from '../../hooks/useSupabaseQuery';
import type { Database } from '../../types/supabase';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

export function BlogPage() {
  const { user } = useAuth();
  const { data: posts, loading, refetch } = useSupabaseQuery<BlogPost>('blog_posts', {
    orderBy: { column: 'created_at', ascending: false }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-purple-900 mb-8">Blog Comunitario</h1>
      
      {user && (
        <div className="mb-8">
          <CreatePostForm onPostCreated={refetch} />
        </div>
      )}

      <div className="space-y-8">
        {loading ? (
          <p>Cargando publicaciones...</p>
        ) : (
          posts?.map((post) => (
            <BlogPost key={post.id} post={post} />
          ))
        )}
      </div>
    </div>
  );
}