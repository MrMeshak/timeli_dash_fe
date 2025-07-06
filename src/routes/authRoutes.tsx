import { createRoute, notFound } from '@tanstack/react-router';
import { rootRoute } from './routes';

export const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'auth',
});

export const authIndexRoute = createRoute({
  getParentRoute: () => authRoute,
  path: '/',
  beforeLoad: () => {
    throw notFound();
  },
});

export const authRouteTree = authRoute.addChildren([authIndexRoute]);
