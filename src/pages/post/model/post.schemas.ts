import type { CreatePostModel, UpdatePostModel } from '@pages/post/model/post.types.ts';
import * as v from 'valibot';

const schema = v.object({
  userId: v.optional(v.number()),
  id: v.number(),
  title: v.string(),
  body: v.string(),
});

export const PostSchema = v.pipe(
  schema,
  v.transform((input) => ({
    id: input.id,
    title: input.title.toUpperCase(),
    description: input.body,
    randNumber: Number(input.id) % 3 === 0,
  })),
);

export const toPostDto = (data: CreatePostModel) => ({
  title: data.title,
  body: data.description,
});

export const toPostUpdateDto = (data: UpdatePostModel) => ({
  title: data.title,
  body: data.description,
  id: data.id,
});

export const PostFormSchema = v.object({
  title: v.pipe(v.string('Başlıq mütləqdir'), v.minLength(3, 'Başlıq ən az 3 simvol olmalıdır')),
  description: v.pipe(
    v.string('Məzmun mütləqdir'),
    v.minLength(3, 'Məzmun çox qısadır, ən az 3 simvol yazın'),
  ),
});
