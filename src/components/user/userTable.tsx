import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { UserTableData } from '@/services/userService';
import { Link } from '@tanstack/react-router';
import { userIndexRoute } from '@/routes/userRoutes';
import { Badge } from '../ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { PaginationLink } from '../ui/pagination';
import { formatUserStatus, UserStatus } from '@/shared/enums';

function generateColumns() {
  const ch = createColumnHelper<UserTableData['rowData'][number]>();

  return [
    ch.accessor('user', {
      header: 'User',
      cell: (info) => {
        const user = info.getValue();
        return (
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-muted-foreground border bg-transparent text-sm">
                {user.firstName[0].toUpperCase()}
                {user.lastName[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{`${user.firstName} ${user.lastName}`}</p>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>
        );
      },
    }),
    ch.accessor('role', {
      header: 'Role',
      cell: (info) => {
        const role = info.getValue();
        switch (role.color) {
          case 'PRIMARY':
            return <Badge>{role.label}</Badge>;
          case 'SECONDARY':
            return <Badge variant="secondary">{role.label}</Badge>;
          case 'PURPLE':
            return <Badge variant="purple">{role.label}</Badge>;
          case 'SLATE':
            return <Badge variant="slate">{role.label}</Badge>;
          case 'MAROON':
            return <Badge variant="maroon">{role.label}</Badge>;
          case 'BROWN':
            return <Badge variant="brown">{role.label}</Badge>;
          case 'GOLD':
            return <Badge variant="gold">{role.label}</Badge>;
          case 'GREEN':
            return <Badge variant="green">{role.label}</Badge>;
          default:
            return <Badge variant="secondary">{role.label}</Badge>;
        }
      },
    }),
    ch.accessor('user.status', {
      header: 'Status',
      cell: (info) => {
        const status = info.getValue();
        switch (status) {
          case UserStatus.ACTIVE:
            return <Badge variant="green">{formatUserStatus(status)}</Badge>;
          case UserStatus.SUSPENDED:
            return <Badge variant="grey">{formatUserStatus(status)}</Badge>;
          case UserStatus.PENDING:
            return <Badge variant="gold">{formatUserStatus(status)}</Badge>;
        }
      },
    }),
    ch.display({
      id: 'actions',
      cell: (info) => {
        const user = info.row.original.user;
        return (
          <Link to="/user/$id" params={{ id: user.id }}>
            <Button variant="secondary">
              <ChevronRight />
            </Button>
          </Link>
        );
      },
    }),
  ];
}

export interface UserTableProps {
  data: UserTableData;
}

export default function UserTable({ data }: UserTableProps) {
  const navigate = userIndexRoute.useNavigate();
  const { search } = userIndexRoute.useLoaderData();
  const columns = generateColumns();
  const table = useReactTable({
    data: data.rowData,
    columns: columns,
    rowCount: data.rowCount,
    state: {
      pagination: {
        pageIndex: search.pageIndex,
        pageSize: search.pageSize,
      },
    },
    manualFiltering: true,
    manualSorting: true,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="bg-card rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="last:z[1] last:bg-card last:sticky last:right-0 last:w-10 last:rounded-md"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results
              </TableCell>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            navigate({
              search: (search) => ({
                ...search,
                pageIndex: search.pageIndex - 1,
              }),
            })
          }
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft />
        </Button>
        <PaginationLink
          isActive
          className="border- flex aspect-square h-9 items-center justify-center rounded-md"
        >
          {search.pageIndex + 1}
        </PaginationLink>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            navigate({
              search: (search) => ({
                ...search,
                pageIndex: search.pageIndex + 1,
              }),
            })
          }
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight />
        </Button>
      </div>
    </>
  );
}
