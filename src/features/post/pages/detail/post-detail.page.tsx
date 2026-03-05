import { NAMESPACES } from '@app/lang/i18n.config.ts';
import {
  type PostCreateModel,
  postQueries,
  useCreatePostMutation,
  usePostFormSchema,
  useUpdatePostMutation,
} from '@features/post';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { Button, ContentWrapper, Form, FormField, Input } from '@shared/ui';
import { logger } from '@shared/utils';
import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

const PostDetailPage = () => {
  const { t } = useTranslation(NAMESPACES.POST);
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
    logger.info('data', data);
    if (isEditMode && postId) {
      updateMutation.mutate(
        { ...data, id: postId },
        {
          onSuccess: () => {
            logger.error('Successfully updated post');
            toast.success(t('edit.success'));
          },
        },
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          console.log('Successfully CREATED post');
          toast.success(t('create.success'));
          methods.reset();
        },
      });
    }
  };

  return (
    <ContentWrapper>
      <Form methods={methods} onSubmit={onSubmit} className="space-y-4">
        <FormField name="title" label={t('title')}>
          <Input
            placeholder={t('placeholders.title')}
            {...methods.register('title')}
            isError={!!methods.formState.errors.title}
          />
        </FormField>

        <FormField name="description" label={t('description')}>
          <Input
            placeholder={t('placeholders.description')}
            {...methods.register('description')}
            isError={!!methods.formState.errors.description}
          />
        </FormField>

        <Button type="submit" isLoading={updateMutation.isPending || createMutation.isPending}>
          {t('actions.submit')}
        </Button>
      </Form>
    </ContentWrapper>
  );
};
export default PostDetailPage;
