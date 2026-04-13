import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { server } from '@testing/server.ts';
import { render, screen } from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { type ReactNode, Suspense } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { POST_ENDPOINTS } from '../../api/post.endpoints.ts';
import { postHandlers } from '../../test/post.handlers.ts';
import PostPage from './post.page.tsx';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const renderWithClient = (ui: ReactNode) => {
  const testQueryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={testQueryClient}>
      <Suspense fallback={<div>Loading...</div>}>{ui}</Suspense>
    </QueryClientProvider>,
  );
};

vi.mock('react-i18next', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-i18next')>();

  return {
    ...actual,
    useTranslation: () => ({
      t: (key: string) => key,
    }),
  };
});

beforeEach(() => {
  server.use(...postHandlers);
});

describe('PostPage Integration Test', () => {
  it('render olanda cədvəldə postları göstərir', async () => {
    renderWithClient(<PostPage />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    const firstPostTitle = await screen.findByText(/TEST title/i);
    const firstPostDesc = await screen.findByText(/TEST body/i);

    expect(firstPostTitle).toBeInTheDocument();
    expect(firstPostDesc).toBeInTheDocument();

    expect(await screen.findByText(/qui est esse-TEST/i)).toBeInTheDocument();
  });

  it('data boş olanda cədvəl boş render olunur', async () => {
    server.use(
      http.get(`*${POST_ENDPOINTS.LIST}`, () => {
        return HttpResponse.json([]);
      }),
    );

    renderWithClient(<PostPage />);

    expect(await screen.findByText(/title/i)).toBeInTheDocument();

    expect(screen.queryByText(/TEST title/i)).not.toBeInTheDocument();
  });
});
