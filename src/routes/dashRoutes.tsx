import { createRoute } from '@tanstack/react-router';
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
  component: DashPage,
});

export const dashRouteTree = dashRoute.addChildren([dashIndexRoute]);
