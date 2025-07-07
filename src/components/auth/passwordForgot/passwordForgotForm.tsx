import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

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

const passwordForgotFormSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
});

type PasswordForgotFormSchema = z.infer<typeof passwordForgotFormSchema>;

export default function PasswordForgotForm() {
  const navigate = useNavigate();
  const passwordForgotMutation = useMutation({
    mutationFn: authService.passwordForgot,
    onSuccess: () => navigate({ to: '/auth/passwordForgotSuccess' }),
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          setError('root', error.response.data.message);
          return;
        }
        setError('root', { message: 'Oops, something went wrong' });
      }
    },
  });

  const form = useForm({
    resolver: zodResolver(passwordForgotFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const {
    formState: { errors },
    setError,
  } = form;

  const onSubmit = (values: PasswordForgotFormSchema) => {
    passwordForgotMutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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

        <div className="mt-4 flex flex-col gap-4">
          <Button>Send Email</Button>
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
