export const UserStatus = {
  ACTIVE: 'ACTIVE',
  PENDING: 'PENDING',
  SUSPENDED: 'SUSPENDED',
} as const;
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];

export function formatUserStatus(s: UserStatus) {
  const statusLabels: Record<UserStatus, string> = {
    [UserStatus.ACTIVE]: 'Active',
    [UserStatus.PENDING]: 'Pending',
    [UserStatus.SUSPENDED]: 'Suspended',
  };
  return statusLabels[s];
}

export const ThemeColor = {
  ZINC: 'ZINC',
  SLATE: 'SLATE',
  PURPLE: 'PURPLE',
  MAROON: 'MAROON',
  BROWN: 'BROWN',
  GOLD: 'GOLD',
  GREEN: 'GREEN',
} as const;
export type ThemeColor = (typeof ThemeColor)[keyof typeof ThemeColor];
