import { AuthContext } from '@/hooks/useAuthContext';
import { HomeIcon, LayoutGrid, LucideIcon, Users2 } from 'lucide-react';

export interface NavMenuItem {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
    isActive?: boolean;
  }[];
}

export interface NavMenuData {
  main: NavMenuItem[];
}

export function getNavMenuData(pathName: string) {
  return {
    main: [
      {
        title: 'Dashboard',
        url: '/dashboard',
        icon: HomeIcon,
        isActive: pathName.startsWith('/dashboard'),
      },
      {
        title: 'Users',
        url: '/user/userTable',
        icon: Users2,
        isActive: pathName.startsWith('/user'),
      },
      {
        title: 'Bookings',
        url: '/bookings',
        icon: LayoutGrid,
      },
    ],
  };
}
