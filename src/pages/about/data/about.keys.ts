export const aboutKeys = {
  all: ['about'] as const,
  lists: () => [...aboutKeys.all, 'list'] as const,
  details: () => [...aboutKeys.all, 'detail'] as const,
  detail: (id: number) => [...aboutKeys.details(), id] as const,
};
