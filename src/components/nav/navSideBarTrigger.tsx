import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { Button } from '../ui/button';
import { ComponentProps } from 'react';
import { useSidebar } from '../ui/sidebar';
import { cn } from '@/lib/utils';

export default function NavSidebarTrigger({
  className,
  onClick,
  ...props
}: ComponentProps<typeof Button>) {
  const { isMobile, open, toggleSidebar } = useSidebar();

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="outline"
      className={className}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      {isMobile ? (
        <Menu className="size-6" />
      ) : open ? (
        <ChevronLeft className="size-6" />
      ) : (
        <ChevronRight className="size-6" />
      )}
    </Button>
  );
}
