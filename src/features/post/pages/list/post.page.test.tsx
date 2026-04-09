import { ENDPOINTS } from '@shared/config/endpoints.config.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { server } from '@testing/server.ts';
import { render, screen } from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { type ReactNode, Suspense } from 'react';
import { describe, expect, it, vi } from 'vitest';
import PostPage from './post.page.tsx';

// 2. Query Client Helper
// Hər test üçün təmiz bir Client yaradırıq.
// retry: false vacibdir, yoxsa xəta olanda test sonsuzluğa düşər.
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

// 3. Wrapper Component
// useSuspenseQuery işləməsi üçün Suspense mütləqdir!
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
describe('PostPage Integration Test', () => {
  it('render olanda cədvəldə postları göstərir', async () => {
    // 1. Render edirik
    renderWithClient(<PostPage />);

    // 2. Loading vəziyyətini yoxlayırıq (Suspense fallback)
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // 3. Data gələndən sonranı yoxlayırıq
    // findByText - asinxrondur, elementin DOM-a düşməsini gözləyir
    const firstPostTitle = await screen.findByText(/TEST title/i);
    const firstPostDesc = await screen.findByText(/TEST body/i);

    expect(firstPostTitle).toBeInTheDocument();
    expect(firstPostDesc).toBeInTheDocument();

    // 4. İkinci sətrin də gəldiyini yoxlayaq
    expect(await screen.findByText(/qui est esse-TEST/i)).toBeInTheDocument();
  });

  // Əlavə test: Boş gələrsə nə baş verir?
  it('data boş olanda cədvəl boş render olunur', async () => {
    // Bu test üçün API cavabını dəyişirik (override)
    server.use(
      http.get(`*${ENDPOINTS.POSTS.LIST}`, () => {
        return HttpResponse.json([]);
      }),
    );

    renderWithClient(<PostPage />);

    // Gözləyirik ki, loading getsin və cədvəl boş olsun
    // (Table komponentinin boş olanda nə göstərdiyindən asılıdır, məsələn "No Data")
    // Amma ən azı başlıqlar görünməlidir
    expect(await screen.findByText(/title/i)).toBeInTheDocument();

    // Post 1 artıq olmamalıdır
    expect(screen.queryByText(/TEST title/i)).not.toBeInTheDocument();
  });
});
