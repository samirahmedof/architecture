import { valibotResolver } from '@hookform/resolvers/valibot';
import { Button, Form, FormField, Input } from '@packages';
import { useCreatePostMutation, useUpdatePostMutation } from '@pages/post/data/post.mutations.ts';
import { postQueries } from '@pages/post/data/post.queries.ts';
import { PostFormSchema, toPostDto, toPostUpdateDto } from '@pages/post/model/post.schemas';
import type { CreatePostModel } from '@pages/post/model/post.types.ts';
import { ContentWrapper } from '@shared/ui/content-wrapper/content-wrapper.tsx';
import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const PostDetailPage = () => {
  const params = useParams({ strict: false });
  const isEditMode = !!params.postId;
  const postId = params.postId ? Number(params.postId) : undefined;
  const createMutation = useCreatePostMutation();
  const updateMutation = useUpdatePostMutation();

  const { data: routeData } = useQuery({
    ...postQueries.detail(postId ?? -1),
    enabled: isEditMode,
    staleTime: 10 * 1000,
  });

  const methods = useForm<CreatePostModel>({
    resolver: valibotResolver(PostFormSchema),
    defaultValues: {
      title: '',
      description: '',
    },
    values: routeData ? { ...routeData } : undefined,
  });

  const onSubmit = (data: CreatePostModel) => {
    if (isEditMode && postId) {
      const payload = toPostUpdateDto({ ...data, id: postId });
      updateMutation.mutate(payload, {
        onSuccess: () => {
          console.log('Successfully updated post');
          toast.success('Successfully UPDATED post');
        },
      });
    } else {
      createMutation.mutate(toPostDto(data), {
        onSuccess: () => {
          console.log('Successfully UPDATED post');
          toast.success('Successfully CREATED post');
          methods.reset();
        },
      });
    }
  };

  return (
    <ContentWrapper>
      <Form methods={methods} onSubmit={onSubmit} className="space-y-4">
        <FormField name="title" label="Başlıq">
          <Input
            placeholder="Məqalə başlığı..."
            {...methods.register('title')}
            isError={!!methods.formState.errors.title}
          />
        </FormField>

        <FormField name="description" label="Mətn">
          <Input
            placeholder="Məzmunu daxil edin..."
            {...methods.register('description')}
            isError={!!methods.formState.errors.description}
          />
        </FormField>

        <Button type="submit" isLoading={updateMutation.isPending || createMutation.isPending}>
          Paylaş
        </Button>
      </Form>
    </ContentWrapper>
  );
};
export default PostDetailPage;
