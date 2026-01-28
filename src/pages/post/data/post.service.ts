import { ENDPOINTS } from '@core/config/endpoints.config.ts';
import { api } from '@core/http';
import { PostSchema } from '@pages/post/model/post.schemas.ts';
import type { PostModel, PostResponseModel } from '@pages/post/model/post.types.ts';
import * as v from 'valibot';

export const postService = {
  getAll: async (): Promise<PostModel[]> => api.get(ENDPOINTS.POSTS.LIST, v.array(PostSchema)),

  getById: async (id: number): Promise<PostModel> => api.get(ENDPOINTS.POSTS.BY_ID(id), PostSchema),

  create: async (payload: PostResponseModel): Promise<PostModel> =>
    api.post(ENDPOINTS.POSTS.LIST, payload, PostSchema),

  update: async (payload: PostResponseModel): Promise<PostModel> =>
    api.post(ENDPOINTS.POSTS.LIST, payload, PostSchema),
};
