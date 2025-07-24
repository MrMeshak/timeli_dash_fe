import { userTableRoute } from '@/routes/userRoutes';
import { userService } from '@/services/userService';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import UserTable from './userTable';
import { Loader2Icon } from 'lucide-react';

export default function UserTableWithData() {
  const search = userTableRoute.useSearch();
  const userTableQuery = useQuery({
    queryKey: ['user', 'table', { ...search }],
    queryFn: () => userService.fetchUserTableData({ ...search }),
    placeholderData: keepPreviousData,
  });

  if (userTableQuery.isLoading) {
    return (
      <div className="flex h-[30rem] items-center justify-center">
        <Loader2Icon className="h-20 w-20 animate-spin" />
      </div>
    );
  }

  if (userTableQuery.isError) {
    return;
  }

  const userTableData = userTableQuery.data;

  return userTableData && <UserTable data={userTableData} />;
}
