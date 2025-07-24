import { httpClient } from './axios';
import { ThemeColor, UserStatus } from '@/shared/enums';

export interface UserMeData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

async function fetchUserMeData(): Promise<UserMeData> {
  return (await httpClient.get<UserMeData>('/api/user/me')).data;
}

export interface UserMetaData {
  roles: {
    id: string;
    name: string;
    label: string;
    color: ThemeColor;
  }[];
}

export async function fetchUserMetaData(): Promise<UserMetaData> {
  return {
    roles: [
      {
        id: '',
        name: 'user',
        label: 'User',
        color: 'SLATE',
      },
      {
        id: '',
        name: 'coach',
        label: 'Coach',
        color: 'GOLD',
      },
      {
        id: '',
        name: 'member',
        label: 'Member',
        color: 'PURPLE',
      },
    ],
  };
}

export interface UserTablePayload {
  pageIndex: number;
  pageSize: number;
  searchTerm?: string;
  fRole?: string;
  fStatus?: string;
}

export interface UserTableData {
  rowCount: number;
  rowData: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    status: UserStatus;
    role: {
      id: string;
      name: string;
      label: string;
      color: ThemeColor;
    };
  }[];
}

export async function fetchUserTableData(
  payload: UserTablePayload,
): Promise<UserTableData> {
  return (await httpClient.post<UserTableData>('api/user/userTable', payload))
    .data;
}

export const userService = {
  fetchUserMeData,
  fetchUserTableData,
};
