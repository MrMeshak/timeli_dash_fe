import AppLayout from '@/components/layout/appLayout';
import { rootRoute } from './routes';
import { createRoute, redirect } from '@tanstack/react-router';
import UserPage from '@/app/user/userPage';

export const userRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'user',
  component: AppLayout,
});

export const userIndexRoute = createRoute({
  getParentRoute: () => userRoute,
  path: '/',
  beforeLoad: ({ context }) => {
    if (!context.authContext.isAuthenticated) {
      return redirect({ to: '/auth/login' });
    }
  },
  component: UserPage,
});

export const userRouteTree = userRoute.addChildren([userIndexRoute]);
