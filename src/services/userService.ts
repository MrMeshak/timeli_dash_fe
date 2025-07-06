import { httpClient } from './axios';

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

async function fetchUserData(): Promise<UserData> {
  return {
    id: '0fcd04d2-886d-4a4d-9dcd-006d58ebf3eb',
    firstName: 'Meshak',
    lastName: 'Bain',
    email: 'email@email.com',
  };
}

export const userService = {
  fetchUserData,
};
