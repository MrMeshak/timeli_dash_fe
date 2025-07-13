import { ContentLayout } from '@/components/layout/contentLayout';
import UserTableCard from '@/components/user/userTableCard';

export default function UserPage() {
  return (
    <ContentLayout title="Users">
      <UserTableCard />
    </ContentLayout>
  );
}
