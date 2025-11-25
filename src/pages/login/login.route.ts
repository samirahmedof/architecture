import {createRoute} from '@tanstack/react-router';
import {Route as RootRoute} from '@app/routes/root.route.tsx';
import LoginPage from '@pages/login/login.page.tsx';

export const loginRoute = createRoute({
    getParentRoute: () => RootRoute,
    path: '/login',
    component: LoginPage,
});