import { httpClient } from './axios';

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

async function fetchUserData(): Promise<UserData> {
  return (await httpClient.get<UserData>('/api/user/info')).data;
}

export const userService = {
  fetchUserData,
};
