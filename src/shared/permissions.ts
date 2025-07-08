export const Permission = {
  //General

  //User
  READ_USER_TABLE: 2n ** 20n,
} as const;
type Permission = (typeof Permission)[keyof typeof Permission];

export const PermissionDerived = {
  VIEW_USER_PAGE: Permission.READ_USER_TABLE,
} as const;
type PermissionDerived =
  (typeof PermissionDerived)[keyof typeof PermissionDerived];
