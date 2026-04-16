import { render, screen } from '@testing-library/react';
import type { JSX } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { RootLayout } from './root.layout.tsx';

vi.mock('@shared/lib/monitoring/sentry.ts', () => ({
  addSentryBreadcrumb: vi.fn(),
  syncSentryUser: vi.fn(),
  captureException: vi.fn(),
}));

vi.mock('@shared/store/auth.store.ts', () => ({
  useAuthStore: (selector: (state: { accessToken: string | null }) => unknown) =>
    selector({ accessToken: null }),
}));

vi.mock('@shared/ui', () => ({
  Loader: () => <div>loader</div>,
  ErrorFallback: () => <div>error</div>,
}));

vi.mock('@shared/config/env.config.ts', () => ({
  ENV: { IS_DEV: false },
}));

vi.mock('@tanstack/react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@tanstack/react-router')>();
  return {
    ...actual,
    Outlet: () => <div>outlet</div>,
    useRouterState: vi.fn(() => ({ location: { pathname: '/' } })),
  };
});

vi.mock('@tanstack/react-query', () => ({
  QueryErrorResetBoundary: ({
    children,
  }: {
    children: (props: { reset: () => void }) => JSX.Element;
  }) => children({ reset: vi.fn() }),
}));

vi.mock('@tanstack/react-router-devtools', () => ({
  TanStackRouterDevtools: () => null,
}));

describe('RootLayout', () => {
  it('renders without crashing', () => {
    render(<RootLayout />);
    // expect(screen.getByText('loader')).toBeInTheDocument();
    expect(screen.getByText('outlet')).toBeInTheDocument();
  });
});
