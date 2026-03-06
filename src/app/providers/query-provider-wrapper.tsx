import { QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { queryClient } from '../http/error-handler.ts';

interface QueryProviderProps {
  children: ReactNode;
}

export const QueryProviderWrapper = ({ children }: QueryProviderProps) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
