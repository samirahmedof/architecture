export const postKeys = {
  all: ['post'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  detail: (id: number) => [...postKeys.all, 'detail', id] as const,
};
// post, list
// post, detail
// post, detail, key
