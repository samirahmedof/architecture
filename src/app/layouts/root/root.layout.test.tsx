// import { render, screen } from '@testing-library/react';
// import type { JSX } from 'react';
// import { describe, expect, it, vi } from 'vitest';
// import RootLayout from './root.layout.tsx';
//
// vi.mock('@app/monitoring', () => ({
//   useSentryRouterTracking: () => {},
//   syncSentryUser: () => {},
// }));
//
// vi.mock('@shared/ui', () => ({
//   Loader: () => <div>loader</div>,
//   MainErrorFallback: () => <div>error</div>,
// }));
//
// vi.mock('@shared/config', () => ({
//   ENV: { IS_DEV: false },
// }));
//
// vi.mock('@tanstack/react-router', () => ({
//   Outlet: () => <div>outlet</div>,
// }));
//
// vi.mock('@tanstack/react-query', () => ({
//   QueryErrorResetBoundary: ({
//     children,
//   }: {
//     children: (props: { reset: () => void }) => JSX.Element;
//   }) => children({ reset: () => {} }),
// }));
//
// vi.mock('@tanstack/react-router-devtools', () => ({
//   TanStackRouterDevtools: () => null,
// }));
//
// describe('RootLayout', () => {
//   it('renders without crashing', () => {
//     render(<RootLayout />);
//     expect(screen.getByText('loader')).toBeInTheDocument();
//     expect(screen.getByText('outlet')).toBeInTheDocument();
//   });
// });
