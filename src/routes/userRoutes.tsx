import { z } from 'zod';
import { zodValidator } from '@tanstack/zod-adapter';
import { createRoute, redirect } from '@tanstack/react-router';
import { rootRoute } from './routes';
import AppLayout from '@/components/layout/appLayout';
import UserDetailsPage from '@/app/user/userDetailPage';
import { UserStatus } from '@/shared/enums';
import UserTablePage from '@/app/user/userTablePage';

export const userRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'user',
  component: AppLayout,
});

export const userIndexRoute = createRoute({
  getParentRoute: () => userRoute,
  path: '/',
  beforeLoad: () => {
    throw redirect({ to: 'userTable' });
  },
});

const userTableSearchSchema = z.object({
  pageIndex: z.number().int().nonnegative().catch(0),
  pageSize: z.number().int().min(1).max(100).catch(50),
  searchTerm: z.string().optional().catch(undefined),
  fRole: z.string().optional().catch(undefined),
  fStatus: z
    .enum(['', ...Object.values(UserStatus)])
    .optional()
    .catch(''),
});

export type UserSearchSchema = z.infer<typeof userTableSearchSchema>;

export const userTableRoute = createRoute({
  getParentRoute: () => userRoute,
  path: 'userTable',
  validateSearch: zodValidator(userTableSearchSchema),
  beforeLoad: ({ context }) => {
    if (!context.authContext.isAuthenticated) {
      return redirect({ to: '/auth/login' });
    }
  },
  loaderDeps: ({ search }) => ({ search }),
  loader: ({ deps: { search } }) => {
    return { search };
  },
  component: UserTablePage,
});

export const userDetailRoute = createRoute({
  getParentRoute: () => userRoute,
  path: 'userDetail/$id',
  component: UserDetailsPage,
});

export const userRouteTree = userRoute.addChildren([
  userIndexRoute,
  userTableRoute,
  userDetailRoute,
]);
