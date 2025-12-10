import { authLayoutRoute } from '@app/layouts/auth/auth.route.tsx';
import { PATHS } from '@app/router/paths.router.ts';
import LoginPage from '@pages/login/login.page.tsx';
import { createRoute } from '@tanstack/react-router';

export const loginRoute = createRoute({
	getParentRoute: () => authLayoutRoute,
	path: PATHS.LOGIN,
	component: LoginPage,
});
