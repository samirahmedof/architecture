import type { AboutModelSchema, UserCreateSchema } from '@pages/about/model/about.schema.ts';
import type * as v from 'valibot';

export type AboutModel = v.InferOutput<typeof AboutModelSchema>;
export type UserCreateForm = v.InferOutput<typeof UserCreateSchema>;

export interface About {
  name: string;
  email: string;
}
