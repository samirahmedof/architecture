import {createRoute} from '@tanstack/react-router';
import {Route as RootRoute} from '@app/routes/root.route.tsx';
import {aboutQueryOptions} from '@pages/about/api/about.api.ts';
import AboutPage from './about.page.tsx';

export const aboutRoute = createRoute({
    getParentRoute: () => RootRoute,
    path: '/about',
    component: AboutPage,
    // TanStack Router-in sehri: Səhifə açılmamış datanı yükləməyə başlayır
    loader: ({context: {queryClient}}) =>
        queryClient.ensureQueryData(aboutQueryOptions),
});