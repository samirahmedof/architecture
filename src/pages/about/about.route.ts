import { publicLayoutRoute } from '@app/layouts/public/public.route.tsx';
import { PATHS } from '@app/router/paths.router.ts';
import { aboutQueries } from '@pages/about/data/about.queries.ts';
import { createRoute } from '@tanstack/react-router';
import AboutPage from './about.page.tsx';

export const aboutRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: PATHS.ABOUT,
  component: AboutPage,
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(aboutQueries.detail(1)),
});
