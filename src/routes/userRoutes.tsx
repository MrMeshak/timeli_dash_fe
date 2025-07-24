import { z } from 'zod';
import { zodValidator } from '@tanstack/zod-adapter';
import { createRoute, redirect } from '@tanstack/react-router';
import { rootRoute } from './routes';
import AppLayout from '@/components/layout/appLayout';
import UserPage from '@/app/user/userPage';
import UserDetailsPage from '@/app/user/userDetailPage';
import { UserStatus } from '@/shared/enums';

export const userRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'user',
  component: AppLayout,
});

const userSearchSchema = z.object({
  pageIndex: z.number().int().nonnegative().catch(0),
  pageSize: z.number().int().min(1).max(100).catch(50),
  searchTerm: z.string().optional().catch(undefined),
  fRole: z.string().optional().catch(undefined),
  fStatus: z
    .enum(['', ...Object.values(UserStatus)])
    .optional()
    .catch(''),
});

export type UserSearchSchema = z.infer<typeof userSearchSchema>;

export const userIndexRoute = createRoute({
  getParentRoute: () => userRoute,
  path: '/',
  validateSearch: zodValidator(userSearchSchema),
  beforeLoad: ({ context }) => {
    if (!context.authContext.isAuthenticated) {
      return redirect({ to: '/auth/login' });
    }
  },
  loaderDeps: ({ search }) => ({ search }),
  loader: ({ deps: { search } }) => {
    return { search };
  },
  component: UserPage,
});

export const userDetailRoute = createRoute({
  getParentRoute: () => userRoute,
  path: '$id',
  component: UserDetailsPage,
});

export const userRouteTree = userRoute.addChildren([
  userIndexRoute,
  userDetailRoute,
]);
