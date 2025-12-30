import * as v from 'valibot';

const schema = v.object({
  userId: v.number(),
  id: v.number(),
  title: v.string(),
  body: v.string(),
});

export const AboutModelSchema = v.pipe(
  schema,
  v.transform((input) => ({
    id: input.id,
    header: input.title.toUpperCase(),
    description: input.body,
  })),
);


export const UserCreateSchema = v.object({
  name: v.pipe(v.string(), v.minLength(3, 'Ad qısadır')),
  email: v.pipe(v.string(), v.email('Email səhvdir')),

  city: v.pipe(v.string(), v.minLength(1, 'Şəhər seçin')),
  companyName: v.pipe(v.string(), v.minLength(1, 'Şirkət adı vacibdir')),
  avatar: v.optional(v.instance(File)),
});

