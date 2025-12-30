import * as v from 'valibot';
import {AboutModelSchema, UserCreateSchema} from '@pages/about/model/about.schema.ts';

export type AboutModel = v.InferOutput<typeof AboutModelSchema>;
export type UserCreateForm = v.InferOutput<typeof UserCreateSchema>;

export interface About {
    name: string;
    email: string;
}