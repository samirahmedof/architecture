import type { PostFormSchema, PostSchema } from '@pages/post/model/post.schemas.ts';
import type * as v from 'valibot';

export type PostModel = v.InferOutput<typeof PostSchema>;
export type PostResponseModel = v.InferInput<typeof PostSchema>;
export type CreatePostModel = v.InferInput<typeof PostFormSchema>;
export type UpdatePostModel = CreatePostModel & { id: number };
