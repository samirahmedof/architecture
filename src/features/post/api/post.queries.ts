import { queryOptions } from '@tanstack/react-query';
import { postKeys } from './post.keys.ts';
import { postService } from './post.service.ts';

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
