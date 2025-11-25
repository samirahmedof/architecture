import {createRoute} from '@tanstack/react-router';
import {Route as RootRoute} from '@app/routes/root.route.tsx';
import HomePage from '@pages/home/home.page.tsx';

export const homeRoute = createRoute({
    getParentRoute: () => RootRoute,
    path: '/',
    component: HomePage,
});