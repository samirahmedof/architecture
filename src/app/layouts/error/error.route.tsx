import ErrorLayout from '@app/layouts/error/error.layout.tsx';
import { PATHS } from '@app/router/paths.router.ts';
import { rootRouter } from '@app/router/root.router.ts';
import { createRoute } from '@tanstack/react-router';

export const errorLayoutRoute = createRoute({
	getParentRoute: () => rootRouter,
	id: PATHS.ERROR,
	component: ErrorLayout,
});
