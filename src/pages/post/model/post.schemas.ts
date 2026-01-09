import * as v from 'valibot';

const schema = v.object({
  userId: v.number(),
  id: v.number(),
  title: v.string(),
  body: v.string(),
});

export const PostModelSchema = v.pipe(
  schema,
  v.transform((input) => ({
    id: input.id,
    title: input.title.toUpperCase(),
    description: input.body,
    randNumber: Number(input.id) % 3 === 0,
  })),
);
