import { httpClient } from './axios';
import { Color, UserStatus } from '@/shared/enums';

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
    color: Color;
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
}

export interface UserTableData {
  rowCount: number;
  rowData: {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      status: UserStatus;
    };
    role: {
      id: string;
      name: string;
      label: string;
      color: Color;
    };
  }[];
}

export async function fetchUserTableData(
  _payload: UserTablePayload,
): Promise<UserTableData> {
  return {
    rowCount: 1,
    rowData: [
      {
        user: {
          id: 'eb19b801-eba7-4af2-be90-b239b8190649',
          firstName: 'Meshak',
          lastName: 'Bain',
          email: 'testtesttesttest@gmail.com',
          status: 'ACTIVE',
        },
        role: {
          id: 'ae93ce6c-43ef-4352-bb49-a609ed173c3d',
          name: 'COACH',
          label: 'Coach',
          color: 'GOLD',
        },
      },
      {
        user: {
          id: 'eb19b801-eba7-4af2-be90-b239b8190649',
          firstName: 'Michael',
          lastName: 'Bain',
          email: 'test@gmail.com',
          status: 'SUSPENDED',
        },
        role: {
          id: 'ae93ce6c-43ef-4352-bb49-a609ed173c3d',
          name: 'USER',
          label: 'User',
          color: 'SLATE',
        },
      },
      {
        user: {
          id: 'eb19b801-eba7-4af2-be90-b239b8190649',
          firstName: 'Michael',
          lastName: 'Bain',
          email: 'test@gmail.com',
          status: 'ACTIVE',
        },
        role: {
          id: 'ae93ce6c-43ef-4352-bb49-a609ed173c3d',
          name: 'Member',
          label: 'Member',
          color: 'PURPLE',
        },
      },
    ],
  };
}

export const userService = {
  fetchUserMeData,
  fetchUserTableData,
};
