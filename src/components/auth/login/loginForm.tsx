import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { Link, useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { authService } from '@/services/authService';
import { AxiosError } from 'axios';
import { setPermissions } from '@/store/permissionsStore';

const loginFormSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
  password: z.string().min(1, 'Required'),
});

type LoginFormSchema = z.infer<typeof loginFormSchema>;

export default function LoginForm() {
  const navigate = useNavigate({ from: '/auth/login' });

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (loginData) => {
      setPermissions(loginData.permissions);
      navigate({ to: '/' });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 403) {
          setError('root', {
            message: 'Invalid credentials',
          });
          return;
        }
      }
      setError('root', { message: 'Oops, something went wrong' });
    },
  });

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    formState: { errors },
    setError,
  } = form;

  const onSubmit = (values: LoginFormSchema) => {
    loginMutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex min-w-80 flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage className="font-light" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex justify-between">
                Password{' '}
                <span>
                  <Link
                    to="/auth/passwordForgot"
                    className="text-muted-foreground text-xs font-light hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </span>
              </FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage className="font-light" />
            </FormItem>
          )}
        />

        <div className="mt-4 flex flex-col gap-4">
          <Button>Login</Button>
          {errors.root && (
            <Alert className="bg-tmaroon-muted border-tmaroon-border">
              <AlertDescription className="text-tmaroon-muted-foreground">
                {errors.root.message}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </form>
    </Form>
  );
}
