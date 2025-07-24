export const Permission = {
  //General

  //User
  READ_USER_META: 1n << 20n,
  READ_USER_TABLE: 1n << 21n,
} as const;
type Permission = (typeof Permission)[keyof typeof Permission];

export const PermissionDerived = {
  VIEW_USER_PAGE: Permission.READ_USER_TABLE,
} as const;
type PermissionDerived =
  (typeof PermissionDerived)[keyof typeof PermissionDerived];
