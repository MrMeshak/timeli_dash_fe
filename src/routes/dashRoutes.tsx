import { createRoute, redirect } from '@tanstack/react-router';
import AppLayout from '@/components/layout/appLayout';
import { rootRoute } from './routes';
import DashPage from '@/app/dash/dashPage';

export const dashRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'dashboard',
  component: AppLayout,
});

export const dashIndexRoute = createRoute({
  getParentRoute: () => dashRoute,
  path: '/',
  beforeLoad: ({ context }) => {
    if (!context.authContext.isAuthenticated) {
      throw redirect({ to: '/auth/login' });
    }
  },
  component: DashPage,
});

export const dashRouteTree = dashRoute.addChildren([dashIndexRoute]);
