import { api } from '@shared/lib/http/client.ts';
import * as v from 'valibot';
import { PostDtoSchema } from '../model/post.dto.ts';
import { toPostCreateModel, toPostModel, toPostUpdateModel } from '../model/post.mapper.ts';
import type { PostCreateModel, PostModel, PostUpdateModel } from '../model/post.types.ts';
import { POST_ENDPOINTS } from './post.endpoints.ts';

export const postService = {
  getAll: async (): Promise<PostModel[]> => {
    const dtos = await api.get(POST_ENDPOINTS.LIST).json(v.array(PostDtoSchema));
    return dtos.map(toPostModel);
  },

  getById: async (id: number): Promise<PostModel> => {
    const dto = await api.get(POST_ENDPOINTS.BY_ID(id)).json(PostDtoSchema);
    return toPostModel(dto);
  },

  create: async (data: PostCreateModel): Promise<PostModel> => {
    const payload = toPostCreateModel(data);
    const dto = await api.post(POST_ENDPOINTS.LIST, { json: payload }).json(PostDtoSchema);
    return toPostModel(dto);
  },

  update: async (data: PostUpdateModel): Promise<PostModel> => {
    const payload = toPostUpdateModel(data);
    const dto = await api.put(POST_ENDPOINTS.BY_ID(data.id), { json: payload }).json(PostDtoSchema);
    return toPostModel(dto);
  },
};
