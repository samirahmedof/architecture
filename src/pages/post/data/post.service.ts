import { ENDPOINTS } from '@core/config/endpoints.config.ts';
import { api } from '@core/http';
import { PostModelSchema } from '@pages/post/model/post.schemas.ts';
import type { PostModel } from '@pages/post/model/post.types.ts';
import * as v from 'valibot';

export const postService = {
  getAll: async (): Promise<PostModel[]> => {
    const { data } = await api.get(ENDPOINTS.POSTS.LIST);
    return v.parse(v.array(PostModelSchema), data);
  },
  getById: async (id: number): Promise<PostModel> => {
    const { data } = await api.get(ENDPOINTS.POSTS.BY_ID(id));
    return v.parse(PostModelSchema, data);
  },
};
