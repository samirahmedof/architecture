import { ENDPOINTS } from '@core/config/endpoints.config.ts';
import { api } from '@core/http';
import * as v from 'valibot';
import { toPostCreateModel, toPostModel, toPostUpdateModel } from '../model/post.mapper.ts';
import { PostDtoSchema } from '../model/post.schema.ts';
import type { PostCreateModel, PostModel, PostUpdateModel } from '../model/post.types.ts';

export const postService = {
  getAll: async (): Promise<PostModel[]> => {
    const dtos = await api.get(ENDPOINTS.POSTS.LIST, v.array(PostDtoSchema));
    return dtos.map(toPostModel);
  },

  getById: async (id: number): Promise<PostModel> => {
    const dto = await api.get(ENDPOINTS.POSTS.BY_ID(id), PostDtoSchema);
    return toPostModel(dto);
  },

  create: async (data: PostCreateModel): Promise<PostModel> => {
    const payload = toPostCreateModel(data);
    const dto = await api.post(ENDPOINTS.POSTS.LIST, payload, PostDtoSchema);
    return toPostModel(dto);
  },

  update: async (data: PostUpdateModel): Promise<PostModel> => {
    const payload = toPostUpdateModel(data);
    const dto = await api.post(ENDPOINTS.POSTS.LIST, payload, PostDtoSchema);
    return toPostModel(dto);
  },
};
