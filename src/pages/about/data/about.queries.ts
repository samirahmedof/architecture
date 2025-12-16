import { aboutService } from '@pages/about/data/about.service.ts';
import { queryOptions } from '@tanstack/react-query';
import { aboutKeys } from './about.keys';

export const aboutQueries = {
  list: () =>
    queryOptions({
      queryKey: aboutKeys.details(),
      queryFn: aboutService.getAll,
    }),
  detail: (id: number) =>
    queryOptions({
      queryKey: aboutKeys.detail(id),
      queryFn: () => aboutService.getById(id),
    }),
};
