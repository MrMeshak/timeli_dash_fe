import { Link, useNavigate } from '@tanstack/react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { removePermissions } from '@/store/permissionsStore';
import { authService } from '@/services/authService';

import { LogOut, Settings } from 'lucide-react';
import { UserMeData } from '@/services/userService';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu';

export interface NavUserProps {
  data: UserMeData;
}

export default function NavUser({ data }: NavUserProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      removePermissions();
      queryClient.clear();
      navigate({ to: '/auth/login', replace: true });
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-transparent text-xs">
              {data.firstName[0].toUpperCase()}
              {data.lastName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mx-2 mt-4">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-2">
            <p className="text-sm leading-none font-medium">
              {data.firstName + ' ' + data.lastName}
            </p>
            <p className="text-muted-foreground text-xs leading-none">
              {data.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="hover:cursor-pointer">
          <Link to="/" className="flex items-center">
            <Settings />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="hover:cursor-pointer"
          onClick={() => logoutMutation.mutate()}
        >
          <LogOut />
          logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
