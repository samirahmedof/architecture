import { postKeys } from '@features/post/api/post.keys.ts';
import { postService } from '@features/post/api/post.service.ts';
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
