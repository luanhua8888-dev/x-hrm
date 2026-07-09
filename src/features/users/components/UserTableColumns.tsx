import { ColumnDef } from '@tanstack/react-table';
import { Link } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import { User } from '@/types/user/user';

export const userTableColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'username',
    header: 'Username',
    cell: ({ row }) => (
      <Link className="font-medium text-slate-900 hover:underline" to={`/users/${row.original.id}`}>
        {row.original.username}
      </Link>
    ),
  },
  {
    accessorKey: 'fullName',
    header: 'Full name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <Badge>{row.original.status}</Badge>,
  },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  },
];
