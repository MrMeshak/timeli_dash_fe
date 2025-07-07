import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link } from '@tanstack/react-router';
import PasswordForgotForm from './passwordForgotForm';

export default function PasswordForgotCard() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Forgot Password</CardTitle>
        <CardDescription>
          We'll send you an email to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PasswordForgotForm />
      </CardContent>
      <CardFooter>
        <p className="text-muted-foreground text-sm">
          Go to{' '}
          <Link
            to="/auth/login"
            className="text-foreground font-primary font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
