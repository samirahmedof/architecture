import * as v from 'valibot';

export const PostDtoSchema = v.object({
  userId: v.optional(v.number()),
  id: v.number(),
  title: v.string(),
  body: v.string(),
});

export type PostDto = v.InferOutput<typeof PostDtoSchema>;
