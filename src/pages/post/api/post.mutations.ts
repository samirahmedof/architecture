import { postKeys } from '@pages/post/api/post.keys.ts';
import { postService } from '@pages/post/api/post.service.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
