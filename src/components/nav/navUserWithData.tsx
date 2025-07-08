import { useQuery } from '@tanstack/react-query';
import NavUser from './navUser';
import { userService } from '@/services/userService';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function NavUserWithData() {
  const userInfoQuery = useQuery({
    queryKey: ['user', 'me'],
    queryFn: userService.fetchUserMeData,
    staleTime: Infinity,
  });

  if (userInfoQuery.isLoading) {
    return (
      <Button disabled variant="outline" className="h-8 w-8 rounded-full">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-transparent"></AvatarFallback>
        </Avatar>
      </Button>
    );
  }

  if (userInfoQuery.isError) {
    return (
      <Button disabled variant="outline" className="h-8 w-8 rounded-full">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-transparent">Er</AvatarFallback>
        </Avatar>
      </Button>
    );
  }

  const userData = userInfoQuery.data;
  return userData && <NavUser data={userData} />;
}
