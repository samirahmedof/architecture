import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import PostDetailPage from './post-detail.page.tsx';

vi.mock('@features/post', () => ({
  useCreatePostMutation: () => ({ mutate: vi.fn(), isPending: false }),
  useUpdatePostMutation: () => ({ mutate: vi.fn(), isPending: false }),
  usePostFormSchema: () => ({}),
  postQueries: {
    detail: () => ({
      queryKey: ['post', 1],
      queryFn: () => ({ id: 1, title: 't', description: 'd' }),
    }),
  },
}));

vi.mock('@tanstack/react-router', () => ({
  useParams: () => ({ postId: '1' }),
}));

vi.mock('react-i18next', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-i18next')>();
  return {
    ...actual,
    useTranslation: () => ({
      t: (key: string) => key,
    }),
  };
});

describe('PostDetailPage', () => {
  it('renders submit button', () => {
    const client = new QueryClient();

    render(
      <QueryClientProvider client={client}>
        <PostDetailPage />
      </QueryClientProvider>,
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
