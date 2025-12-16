import { aboutKeys } from '@pages/about/data/about.keys.ts';
import { aboutService } from '@pages/about/data/about.service.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateAboutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: aboutService.create,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: aboutKeys.lists() });
    },
  });
};
