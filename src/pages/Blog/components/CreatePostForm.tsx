import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../../hooks/useAuth';
import { supabase } from '../../../lib/supabase';

const postSchema = z.object({
  title: z.string().min(5, 'El título debe tener al menos 5 caracteres'),
  content: z.string().min(20, 'El contenido debe tener al menos 20 caracteres')
});

type PostForm = z.infer<typeof postSchema>;

interface Props {
  onPostCreated: () => void;
}

export function CreatePostForm({ onPostCreated }: Props) {
  const { user } = useAuth();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<PostForm>({
    resolver: zodResolver(postSchema)
  });

  const onSubmit = async (data: PostForm) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .insert({
          title: data.title,
          content: data.content,
          author_id: user.id
        });

      if (error) throw error;
      reset();
      onPostCreated();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          {...register('title')}
          placeholder="Título de tu publicación"
          className="w-full rounded-lg border-gray-300 shadow-sm"
        />
        {errors.title && (
          <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <textarea
          {...register('content')}
          placeholder="Comparte tu experiencia..."
          rows={4}
          className="w-full rounded-lg border-gray-300 shadow-sm"
        />
        {errors.content && (
          <p className="text-red-600 text-sm mt-1">{errors.content.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
      >
        Publicar
      </button>
    </form>
  );
}