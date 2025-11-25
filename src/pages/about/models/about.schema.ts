import * as v from 'valibot';

export const AboutResponseSchema = v.object({
    userId: v.number(),
    id: v.number(),
    title: v.string(),
    body: v.string(),
});

export const AboutModelSchema = v.pipe(
    AboutResponseSchema,
    v.transform((input) => ({
        id: input.id,
        header: input.title.toUpperCase(),
        description: input.body,
    }))
);

// TypeScript tipini çıxarırıq
export type AboutModel = v.InferOutput<typeof AboutModelSchema>;