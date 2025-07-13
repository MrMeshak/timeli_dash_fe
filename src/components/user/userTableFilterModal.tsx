import { ReactNode, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import UserTableFilterFormWithData from './userTableFilterFormWithData';

export interface UserTableFilterModalProps {
  children: ReactNode;
}

export default function UserTableFilterModal({
  children,
}: UserTableFilterModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filters</DialogTitle>
        </DialogHeader>
        <UserTableFilterFormWithData onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
