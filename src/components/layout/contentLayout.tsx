import { ReactNode } from 'react';
import Navbar from '../nav/navbar';

interface ContentLayoutProps {
  title: string;
  children: ReactNode;
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <div>
      <Navbar title={title} />
      <div className="container m-auto px-4 pt-8 pb-8">{children}</div>
    </div>
  );
}
