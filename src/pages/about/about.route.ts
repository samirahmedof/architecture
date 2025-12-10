import { publicLayoutRoute } from '@app/layouts/public/public.route.tsx';
import { PATHS } from '@app/router/paths.router.ts';
import { aboutQueryOptions } from '@pages/about/api/about.api.ts';
import { createRoute } from '@tanstack/react-router';
import AboutPage from './about.page.tsx';

export const aboutRoute = createRoute({
	getParentRoute: () => publicLayoutRoute,
	path: PATHS.ABOUT,
	component: AboutPage,
	// TanStack Router-in sehri: Səhifə açılmamış datanı yükləməyə başlayır
	loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(aboutQueryOptions),
});
