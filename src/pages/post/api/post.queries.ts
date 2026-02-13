import { postKeys } from '@pages/post/api/post.keys.ts';
import { postService } from '@pages/post/api/post.service.ts';
import { queryOptions } from '@tanstack/react-query';

export const postQueries = {
  list: () =>
    queryOptions({
      queryKey: postKeys.lists(),
      queryFn: postService.getAll,
    }),
  detail: (id: number) =>
    queryOptions({
      queryKey: postKeys.detail(id),
      queryFn: () => postService.getById(id),
    }),
};
