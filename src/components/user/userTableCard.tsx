import { Card, CardContent, CardHeader } from '../ui/card';
import UserTableSearchBar from './userTableSearchBar';
import UserTableWithData from './userTableWithData';

export default function UserTableCard() {
  return (
    <Card className="bg-background border-none shadow-none">
      <CardHeader>
        <UserTableSearchBar />
      </CardHeader>
      <CardContent>
        <UserTableWithData />
      </CardContent>
    </Card>
  );
}
