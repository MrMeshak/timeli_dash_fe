import { usePermissionStore } from '@/store/permissionsStore';

export interface IAuthContext {
  isAuthenticated: boolean;
  permissions: bigint;
}

export function useAuthContext() {
  const permissionStr = usePermissionStore();

  if (!permissionStr) {
    return {
      isAuthenticated: false,
      permissions: BigInt(0),
    };
  }
  try {
    const permissions = BigInt(permissionStr);
    return {
      isAuthenticated: !!permissions,
      permissions,
    };
  } catch {
    return {
      isAuthenticated: false,
      permissions: BigInt(0),
    };
  }
}
