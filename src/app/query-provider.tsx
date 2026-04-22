import { handleGlobalError } from '@shared/lib/http/error-handler.ts';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { ReactNode } from 'react';

interface QueryProviderProps {
  children: ReactNode;
}
export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      handleGlobalError(error, { queryKey: query.queryKey });
    },
  }),

  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (mutation.options.onError) return;
      handleGlobalError(error, { mutationKey: mutation.options.mutationKey });
    },
  }),

  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60,
    },
  },
});

export const QueryProvider = ({ children }: QueryProviderProps) => (
  <QueryClientProvider client={queryClient}>
    {children}
    {import.meta.env.DEV && (
      <ReactQueryDevtools initialIsOpen={false} buttonPosition='bottom-left' />
    )}
  </QueryClientProvider>
);
