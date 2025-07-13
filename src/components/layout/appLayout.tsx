import { Outlet } from '@tanstack/react-router';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../ui/sidebar';
import NavSidebar from '../nav/navSidebar';

export default function AppLayout() {
  return (
    <SidebarProvider defaultOpen={false}>
      <NavSidebar />
      <SidebarInset>
        <main className="relative w-full">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
