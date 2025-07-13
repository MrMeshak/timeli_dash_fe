import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { userIndexRoute } from '@/routes/userRoutes';

import { Form, FormField, FormItem, FormLabel } from '../ui/form';
import { Button } from '../ui/button';
import { formatUserStatus, UserStatus } from '@/shared/enums';
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select';
import { UserMetaData } from '@/services/userService';

const userTableFilterFormSchema = z.object({
  fRole: z.string(),
  fStatus: z.enum(['', ...Object.values(UserStatus)]),
});

type UserTableFilterFormSchema = z.infer<typeof userTableFilterFormSchema>;

export interface UserTableFilterFormProps {
  data: UserMetaData;
  onSuccess?: (values: UserTableFilterFormSchema) => void;
}

export default function UserTableFilterForm({
  data,
  onSuccess,
}: UserTableFilterFormProps) {
  const navigate = userIndexRoute.useNavigate();
  const search = userIndexRoute.useSearch();

  const form = useForm<UserTableFilterFormSchema>({
    resolver: zodResolver(userTableFilterFormSchema),
    defaultValues: {
      fRole: search.fRole || '',
      fStatus: search.fStatus || '',
    },
  });

  const onSubmit = (values: UserTableFilterFormSchema) => {
    onSuccess?.(values);
    navigate({
      search: (search) => ({
        ...search,
        fRole: values.fRole || undefined,
        fStatus: values.fStatus || undefined,
      }),
    });
  };

  const onClear = () => {
    form.reset({
      fRole: '',
      fStatus: '',
    });
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
          <FormField
            key={'fRole-field-' + form.watch('fRole')}
            control={form.control}
            name="fRole"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground text-base">
                  Role
                </FormLabel>
                <Select
                  onValueChange={(v) =>
                    v === '__none__' ? field.onChange('') : field.onChange(v)
                  }
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <span>
                      {field.value &&
                        data.roles.find((r) => r.name === field.value)?.label}
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__none__" className="h-8"></SelectItem>
                    {data.roles.map((r) => (
                      <SelectItem key={r.name} value={r.name}>
                        {r.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                  {}
                </Select>
              </FormItem>
            )}
          />

          <FormField
            key={'fStatus-field-' + form.watch('fStatus')}
            control={form.control}
            name="fStatus"
            render={({ field }) => (
              <FormItem className="mb-4 flex flex-col">
                <FormLabel className="text-muted-foreground text-base">
                  Status
                </FormLabel>
                <Select
                  onValueChange={(v) =>
                    v === '__none__' ? field.onChange('') : field.onChange(v)
                  }
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <span>{field.value && formatUserStatus(field.value)}</span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__none__" className="h-8"></SelectItem>
                    {Object.values(UserStatus).map((s) => (
                      <SelectItem key={s} value={s}>
                        {formatUserStatus(s)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <div className="flex justify-between gap-2">
            <Button type="button" variant="ghost" onClick={onClear}>
              Clear Filters
            </Button>
            <Button type="submit">Apply</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
