import { ComponentProps } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Link, useLocation } from '@tanstack/react-router';
import { HandMetal } from 'lucide-react';
import NavMain from './navMain';
import { getNavMenuData } from '@/lib/navUtils';
import { cn } from '@/lib/utils';

export default function NavSidebar({
  ...props
}: ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const data = getNavMenuData(location.pathname);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-sidebar-border relative flex items-center justify-center border-b-1 p-4">
        <Link to="/">
          <HandMetal className="w-5" />
        </Link>
      </SidebarHeader>
      <SidebarContent className="py-2">
        <NavMain items={data.main} />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
