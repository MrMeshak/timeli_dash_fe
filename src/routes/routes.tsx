import {
  createRootRouteWithContext,
  createRoute,
  Outlet,
  redirect,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import type { QueryClient } from '@tanstack/react-query';
import { authRouteTree } from './authRoutes';
import { dashRouteTree } from './dashRoutes';

export interface RouterContext {
  queryClient: QueryClient;
}

export const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    throw redirect({
      to: '/dashboard',
    });
  },
});

export const routeTree = rootRoute.addChildren([
  homeRoute,
  authRouteTree,
  dashRouteTree,
]);
