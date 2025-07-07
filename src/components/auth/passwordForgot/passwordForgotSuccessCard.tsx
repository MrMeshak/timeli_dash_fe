import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

export default function PasswordForgotSuccessCard() {
  return (
    <Card className="flex w-full max-w-[30rem]">
      <CardHeader>
        <CardTitle>Success!</CardTitle>
        <CardDescription>
          An email has been sent to reset your password
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
