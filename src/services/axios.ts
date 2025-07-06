import axios from 'axios';
import { removePermissions } from '@/store/permissionsStore';

export const httpClient = axios.create({
  baseURL: '/',
  timeout: 7000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response.status === 401) {
      removePermissions();
      window.location.href = '/auth/login';
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);
