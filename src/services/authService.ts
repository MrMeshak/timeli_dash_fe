import { removePermissions } from '@/store/permissionsStore';
import { httpClient } from './axios';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginData {
  permissions: string;
}

async function login(payload: LoginPayload) {
  return (await httpClient.post<LoginData>('api/auth/mlogin', payload)).data;
}

async function logout() {
  return (await httpClient.post('api/auth/logout')).data;
}

export interface PasswordForgotPayload {
  email: string;
}

async function passwordForgot(payload: PasswordForgotPayload) {
  return (await httpClient.post('api/auth/passwordForgot', payload)).data;
}

export interface PasswordResetPayload {
  token: string;
  password: string;
}

async function passwordReset(payload: PasswordResetPayload) {
  return (await httpClient.post('api/auth/passwordReset', payload)).data;
}

export const authService = {
  login,
  logout,
  passwordForgot,
  passwordReset,
};
