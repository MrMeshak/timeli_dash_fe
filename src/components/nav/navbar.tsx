import NavUserWithData from './navUserWithData';
import NavSidebarTrigger from './navSideBarTrigger';
import NavThemeToggle from './navThemeToggle';

export interface INavbarProps {
  title: string;
}

export default function Navbar({ title }: INavbarProps) {
  return (
    <header className="bg-sidebar sticky top-0 z-10 w-full border-b-1">
      <div className="flex h-14 items-center">
        <div className="flex items-center gap-6">
          <div className="border-r-sidebar-border h-14 border-r-1">
            <NavSidebarTrigger
              variant="ghost"
              className="h-full w-14 rounded-none"
            />
          </div>
          <div className="flex h-full items-center">
            <h1 className="font-bold">{title}</h1>
          </div>
        </div>
        <div className="flex h-full flex-1 items-center justify-end space-x-2 px-4">
          <NavThemeToggle />
          <NavUserWithData />
        </div>
      </div>
    </header>
  );
}
