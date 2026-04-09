import { queryClient } from '@shared/lib/query-error-handler.ts';
import { QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';

interface QueryProviderProps {
  children: ReactNode;
}

export const QueryProvider = ({ children }: QueryProviderProps) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
