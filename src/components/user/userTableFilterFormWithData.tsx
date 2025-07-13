import { fetchUserMetaData } from '@/services/userService';
import { useQuery } from '@tanstack/react-query';
import UserTableFilterForm, {
  UserTableFilterFormProps,
} from './userTableFilterForm';

export default function UserTableFilterFormWithData(
  props: Omit<UserTableFilterFormProps, 'data'>,
) {
  const userMetaQuery = useQuery({
    queryKey: ['user', 'meta'],
    queryFn: fetchUserMetaData,
    staleTime: 1000 * 60 * 5,
  });

  if (userMetaQuery.isLoading) {
    <UserTableFilterForm
      data={{
        roles: [],
      }}
      {...props}
    />;
    return;
  }

  if (userMetaQuery.isError) {
    return;
  }

  const userMetaData = userMetaQuery.data;
  return userMetaData && <UserTableFilterForm data={userMetaData} {...props} />;
}
