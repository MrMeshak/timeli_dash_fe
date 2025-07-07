import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

export function PasswordResetSuccessCard() {
  return (
    <Card className="flex w-full max-w-[30rem]">
      <CardHeader>
        <CardTitle>Success!</CardTitle>
        <CardDescription>
          Congratulations, your password has been successfully reset
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
