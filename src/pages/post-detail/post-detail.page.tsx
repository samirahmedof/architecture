import { valibotResolver } from '@hookform/resolvers/valibot';
import { Button, Form, FormField, Input } from '@packages';
import { useCreatePostMutation, useUpdatePostMutation } from '@pages/post/api/post.mutations.ts';
import { postQueries } from '@pages/post/api/post.queries.ts';
import type { PostCreateModel } from '@pages/post/domain/post.model.ts';
import { usePostFormSchema } from '@pages/post/domain/post.schema.ts';
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
  const schema = usePostFormSchema();

  const { data: routeData } = useQuery({
    ...postQueries.detail(postId ?? -1),
    enabled: isEditMode,
    staleTime: 10 * 1000,
  });

  const methods = useForm<PostCreateModel>({
    resolver: valibotResolver(schema),
    defaultValues: {
      title: '',
      description: '',
    },
    values: routeData ? { ...routeData } : undefined,
  });

  const onSubmit = (data: PostCreateModel) => {
    console.log(data);
    if (isEditMode && postId) {
      updateMutation.mutate(
        { ...data, id: postId },
        {
          onSuccess: () => {
            console.log('Successfully updated post');
            toast.success('Successfully UPDATED post');
          },
        },
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          console.log('Successfully CREATED post');
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
