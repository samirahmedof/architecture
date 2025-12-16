import { ENDPOINTS } from '@core/config/endpoints.config.ts';
import { api } from '@core/http';
import { type AboutModel, AboutModelSchema } from '@pages/about/model/about.schema';
import * as v from 'valibot';

export const aboutService = {
  getAll: async (): Promise<AboutModel[]> => {
    const { data } = await api.get(ENDPOINTS.POSTS.LIST);
    return [...data];
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
