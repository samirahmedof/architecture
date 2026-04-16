import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postKeys } from './post.keys.ts';
import { postService } from './post.service.ts';

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postService.create,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },
  });
};

export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postService.update,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: postKeys.lists() });
      await queryClient.invalidateQueries({ queryKey: postKeys.detail(data.id) });
    },
  });
};
