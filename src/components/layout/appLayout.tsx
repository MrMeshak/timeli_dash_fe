import { Outlet } from '@tanstack/react-router';
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar';
import NavSidebar from '../nav/navSidebar';

export default function AppLayout() {
  return (
    <SidebarProvider defaultOpen={false}>
      <NavSidebar />
      <main className="relative w-full">
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
