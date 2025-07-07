import z from 'zod';
import { createRoute, notFound } from '@tanstack/react-router';
import { rootRoute } from './routes';
import LoginPage from '@/app/auth/loginPage';
import PasswordForgotPage from '@/app/auth/passwordForgotPage';
import PasswordResetPage from '@/app/auth/passwordResetPage';
import PasswordForgotSuccessPage from '@/app/auth/passwordForgotSuccessPage';
import PasswordResetSuccessPage from '@/app/auth/passwordResetSuccessPage';

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

export const authPasswordForgotRoute = createRoute({
  getParentRoute: () => authRoute,
  path: 'passwordForgot',
  component: PasswordForgotPage,
});

export const authPasswordForgotSuccessRoute = createRoute({
  getParentRoute: () => authRoute,
  path: 'passwordForgotSuccess',
  component: PasswordForgotSuccessPage,
});

export const passwordResetSearchSchema = z.object({
  token: z.string().jwt().catch(''),
});

export const authPasswordResetRoute = createRoute({
  getParentRoute: () => authRoute,
  path: 'passwordReset',
  validateSearch: passwordResetSearchSchema,
  loaderDeps: ({ search }) => search,
  loader: ({ deps: search }) => {
    if (!search.token) {
      throw notFound();
    }
    return {
      search: {
        token: search.token,
      },
    };
  },
  component: PasswordResetPage,
});

export const authPasswordResetSuccessRoute = createRoute({
  getParentRoute: () => authRoute,
  path: 'passwordResetSuccess',
  component: PasswordResetSuccessPage,
});

export const authRouteTree = authRoute.addChildren([
  authIndexRoute,
  authLoginRoute,
  authPasswordForgotRoute,
  authPasswordForgotSuccessRoute,
  authPasswordResetRoute,
  authPasswordResetSuccessRoute,
]);
