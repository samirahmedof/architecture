import type { PostModelSchema } from '@pages/post/model/post.schemas.ts';
import type * as v from 'valibot';

export type PostModel = v.InferOutput<typeof PostModelSchema>;
