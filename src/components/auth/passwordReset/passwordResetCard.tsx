import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import PasswordResetForm from './passwordResetForm';

export default function PasswordResetCard() {
  return (
    <Card className="m-4 flex w-full max-w-96">
      <CardHeader>
        <CardTitle>Reset</CardTitle>
        <CardDescription>Reset your password</CardDescription>
      </CardHeader>
      <CardContent>
        <PasswordResetForm />
      </CardContent>
    </Card>
  );
}
