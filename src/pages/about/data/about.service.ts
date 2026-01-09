import { ENDPOINTS } from '@core/config/endpoints.config.ts';
import { api } from '@core/http';
import { AboutModelSchema } from '@pages/about/model/about.schema';
import type { AboutModel } from '@pages/about/model/about.types.ts';
import * as v from 'valibot';

export const aboutService = {
  getAll: async (): Promise<AboutModel[]> => {
    const { data } = await api.get(ENDPOINTS.POSTS.LIST);
    return v.parse(v.array(AboutModelSchema), data);
  },
  getById: async (id: number): Promise<AboutModel> => {
    const { data } = await api.get(ENDPOINTS.POSTS.BY_ID(id));
    return v.parse(AboutModelSchema, data);
  },
  create: async (): Promise<AboutModel> => {
    const { data } = await api.post(ENDPOINTS.POSTS.LIST);
    return v.parse(AboutModelSchema, data);
  },
};
