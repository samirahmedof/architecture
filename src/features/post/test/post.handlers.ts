import { mockPosts } from '@features/post/test/post.mocks.ts';
import { ENDPOINTS } from '@shared/config/endpoints.config.ts';
import { HttpResponse, http } from 'msw';

export const postHandlers = [
  http.get(`*${ENDPOINTS.POSTS.LIST}`, () => {
    return HttpResponse.json(mockPosts);
  }),

  http.get(`*${ENDPOINTS.POSTS.LIST}`, () => {
    return HttpResponse.json([]);
  }),
];
