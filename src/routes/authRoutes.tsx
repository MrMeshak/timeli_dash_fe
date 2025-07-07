import { createRoute, notFound } from '@tanstack/react-router';
import { rootRoute } from './routes';
import LoginPage from '@/app/auth/loginPage';

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

export const authLoginRoute = createRoute({
  getParentRoute: () => authRoute,
  path: 'login',
  component: LoginPage,
});

export const authRouteTree = authRoute.addChildren([
  authIndexRoute,
  authLoginRoute,
]);
