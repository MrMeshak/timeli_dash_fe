import z from 'zod';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormControl, FormItem } from '@/components/ui/form';
import { Button } from '../ui/button';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '../ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { userIndexRoute } from '@/routes/userRoutes';
import UserTableFilterModal from './userTableFilterModal';

const userTableSearchBarFormSchema = z.object({
  searchTerm: z.string(),
});

type UserTableSearchBarFormSchema = z.infer<
  typeof userTableSearchBarFormSchema
>;

export default function UserTableSearchBar() {
  const navigate = userIndexRoute.useNavigate();
  const search = userIndexRoute.useSearch();
  const form = useForm<UserTableSearchBarFormSchema>({
    resolver: zodResolver(userTableSearchBarFormSchema),
    defaultValues: {
      searchTerm: search.searchTerm || '',
    },
  });

  const onSubmit = (values: UserTableSearchBarFormSchema) => {
    navigate({
      search: (search) => ({
        ...search,
        searchTerm: values.searchTerm ? values.searchTerm : undefined,
      }),
    });
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center gap-2"
        >
          <FormField
            control={form.control}
            name="searchTerm"
            render={({ field }) => (
              <FormItem className="w-full max-w-md">
                <FormControl>
                  <Input placeholder="Search by name or email" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex gap-2">
            <Button variant="secondary">
              <Search className="text-muted-foreground h-5 w-5" />
            </Button>
            <UserTableFilterModal>
              <Button variant="secondary" className="text-muted-foreground">
                <SlidersHorizontal />
              </Button>
            </UserTableFilterModal>
            {/*   <InventoryTableFilterModal> */}
            {/*     <Button variant="secondary" className="relative"> */}
            {/*       {numFilters ? ( */}
            {/*         <div className="text-muted-foreground absolute top-0 right-0 h-6 w-6 translate-x-1/3 -translate-y-1/3 rounded-full bg-slate-300 align-top text-xs leading-[1.45rem] dark:bg-slate-600"> */}
            {/*           {numFilters} */}
            {/*         </div> */}
            {/*       ) : null} */}
            {/**/}
            {/*       <SlidersHorizontal className="text-muted-foreground h-5 w-5" /> */}
            {/*     </Button> */}
            {/*   </InventoryTableFilterModal> */}
          </div>
        </form>
      </Form>
    </div>
  );
}
