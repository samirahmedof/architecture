import {createRouter} from '@tanstack/react-router';
import {Route as rootRoute} from './routes/root.route';
import {QueryClient} from '@tanstack/react-query';
import {homeRoute} from '@pages/home/home.route.ts';
import {aboutRoute} from '@pages/about/about.route.ts';
import {loginRoute} from '@pages/login/login.route.ts';

const routeTree = rootRoute.addChildren([
    homeRoute,
    aboutRoute,
    loginRoute,
]);


export const createRouterWithContext = (queryClient: QueryClient) =>
    createRouter({
        routeTree,
        defaultPreload: 'intent',
        // Context-ə ötürürük
        context: {
            queryClient,
        },
    });

declare module '@tanstack/react-router' {
    interface Register {
        router: ReturnType<typeof createRouterWithContext>;
    }
}