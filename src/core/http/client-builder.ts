import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import * as v from 'valibot';

export const createHttpClient = (http: AxiosInstance) => {
  return {
    get: async <TOutput>(
      url: string,
      schema: v.BaseSchema<unknown, TOutput, v.BaseIssue<unknown>>,
      config?: AxiosRequestConfig,
    ) => {
      const response = await http.get(url, config);
      return v.parse(schema, response.data);
    },

    post: async <TInput, TOutput>(
      url: string,
      body: TInput,
      schema: v.BaseSchema<unknown, TOutput, v.BaseIssue<unknown>>,
      config?: AxiosRequestConfig,
    ) => {
      const response = await http.post(url, body, config);
      return v.parse(schema, response.data);
    },

    put: async <TInput, TOutput>(
      url: string,
      body: TInput,
      schema: v.BaseSchema<unknown, TOutput, v.BaseIssue<unknown>>,
      config?: AxiosRequestConfig,
    ) => {
      const response = await http.put(url, body, config);
      return v.parse(schema, response.data);
    },

    delete: async <TOutput>(
      url: string,
      schema: v.BaseSchema<unknown, TOutput, v.BaseIssue<unknown>>,
      config?: AxiosRequestConfig,
    ) => {
      const response = await http.delete(url, config);
      return v.parse(schema, response.data);
    },
  };
};
