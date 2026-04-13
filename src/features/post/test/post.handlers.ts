import { HttpResponse, http } from 'msw';
import { POST_ENDPOINTS } from '../api/post.endpoints.ts';
import { mockPosts } from './post.mocks.ts';

export const postHandlers = [
  http.get(`*${POST_ENDPOINTS.LIST}`, () => {
    return HttpResponse.json(mockPosts);
  }),
];
