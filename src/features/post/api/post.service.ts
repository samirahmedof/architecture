import { api } from '@shared/lib/http/base-instance.ts';
import * as v from 'valibot';
import { PostDtoSchema } from '../model/post.dto.ts';
import { toPostCreateModel, toPostModel, toPostUpdateModel } from '../model/post.mapper.ts';
import type { PostCreateModel, PostTypes, PostUpdateModel } from '../model/post.types.ts';
import { POST_ENDPOINTS } from './post.endpoints.ts';

export const postService = {
  getAll: async (): Promise<PostTypes[]> => {
    const dtos = await api.get(POST_ENDPOINTS.LIST, v.array(PostDtoSchema));
    return dtos.map(toPostModel);
  },

  getById: async (id: number): Promise<PostTypes> => {
    const dto = await api.get(POST_ENDPOINTS.BY_ID(id), PostDtoSchema);
    return toPostModel(dto);
  },

  create: async (data: PostCreateModel): Promise<PostTypes> => {
    const payload = toPostCreateModel(data);
    const dto = await api.post(POST_ENDPOINTS.LIST, payload, PostDtoSchema);
    return toPostModel(dto);
  },

  update: async (data: PostUpdateModel): Promise<PostTypes> => {
    const payload = toPostUpdateModel(data);
    const dto = await api.post(POST_ENDPOINTS.LIST, payload, PostDtoSchema);
    return toPostModel(dto);
  },
};
