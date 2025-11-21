"use client"
"use no memo"

import { useMemo, useState } from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { ColumnDef, getCoreRowModel, getSortedRowModel, SortingState, useReactTable, flexRender } from "@tanstack/react-table";
import { OrderDirection, UsersOrderField, GetUsersPagedQuery } from "@/graphql/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";

const GET_USERS_PAGED = gql`
  query GetUsersPaged($filter: UsersFilterInput, $pagination: PaginationInput, $orderBy: [UsersOrderByInput!]) {
    users(filter: $filter, pagination: $pagination, orderBy: $orderBy) {
      id
      name
      email
      createdAt
    }
    usersCount(filter: $filter)
  }
`;

type RowUser = { id: string; name?: string | null; email: string; createdAt: string };

export default function UsersShadcnPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sorting, setSorting] = useState<SortingState>([{ id: "createdAt", desc: true }]);

  const orderField = useMemo<UsersOrderField>(() => {
    const primary = sorting[0]?.id || "createdAt";
    if (primary === "name") return UsersOrderField.Name;
    if (primary === "email") return UsersOrderField.Email;
    return UsersOrderField.CreatedAt;
  }, [sorting]);
  const orderDirection = useMemo<OrderDirection>(() => (sorting[0]?.desc ? OrderDirection.Desc : OrderDirection.Asc), [sorting]);

  const { data, loading, refetch } = useQuery<GetUsersPagedQuery>(GET_USERS_PAGED, {
    variables: {
      filter: { searchTerm: search || undefined },
      pagination: { limit: pageSize, offset: page * pageSize },
      orderBy: [{ field: orderField, direction: orderDirection }],
    },
    fetchPolicy: "cache-and-network",
  });

  const users: RowUser[] = Array.isArray(data?.users) ? data!.users : [];
  const total = Number(data?.usersCount || 0);
  const totalPages = Math.max(Math.ceil(total / pageSize), 1);

  const columns = useMemo<ColumnDef<RowUser>[]>(() => [
    { accessorKey: "email", header: "Email" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "createdAt", header: "Created", cell: ({ getValue }) => new Date(String(getValue())).toLocaleString() },
  ], []);

  const table = useReactTable({
    data: users,
    columns,
    state: { sorting },
    onSortingChange: (updater) => {
      const next = typeof updater === "function" ? updater(sorting) : updater;
      setSorting(next);
      const primary = next[0];
      const of = primary?.id === "name" ? UsersOrderField.Name : primary?.id === "email" ? UsersOrderField.Email : UsersOrderField.CreatedAt;
      const od = primary?.desc ? OrderDirection.Desc : OrderDirection.Asc;
      refetch({
        filter: { searchTerm: search || undefined },
        pagination: { limit: pageSize, offset: 0 },
        orderBy: [{ field: of, direction: od }],
      });
      setPage(0);
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true,
  });

  const handlePageSizeChange = (value: string) => {
    const size = Number(value);
    setPage(0);
    setPageSize(size);
    refetch({
      filter: { searchTerm: search || undefined },
      pagination: { limit: size, offset: 0 },
      orderBy: [{ field: orderField, direction: orderDirection }],
    });
  };

  const handleSearchChange = (value: string) => {
    setPage(0);
    setSearch(value);
    refetch({
      filter: { searchTerm: value || undefined },
      pagination: { limit: pageSize, offset: 0 },
      orderBy: [{ field: orderField, direction: orderDirection }],
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#202223]">Users (shadcn Data Table)</h1>
          <p className="mt-1 text-sm text-[#637381]">Sortable, paginated table backed by Apollo Client.</p>
        </div>
      </div>

      <Card className="border-[#DFE3E8]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm text-[#637381]">Controls</CardTitle>
            <div className="flex items-center gap-2">
              <Input value={search} onChange={(e) => handleSearchChange(e.target.value)} placeholder="Search by name or email" />
              <Select value={String(pageSize)} onValueChange={handlePageSizeChange}>
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="Page size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading && <p className="text-sm text-[#637381]">Loading users…</p>}
          {!loading && users.length === 0 && (
            <p className="text-sm text-[#637381]">No users found.</p>
          )}
          {!loading && users.length > 0 && (
            <div className="rounded border border-[#DFE3E8] bg-white">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((hg) => (
                    <TableRow key={hg.id}>
                      {hg.headers.map((header) => (
                        <TableHead key={header.id}>
                          {header.isPlaceholder ? null : (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="px-0 text-[#202223] hover:underline"
                              onClick={header.column.getToggleSortingHandler()}
                            >
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                          )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-xs text-[#637381]">Page {page + 1} of {totalPages} • {total} total</div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                disabled={page === 0}
                onClick={() => {
                  const next = Math.max(page - 1, 0);
                  setPage(next);
                  refetch({
                    filter: { searchTerm: search || undefined },
                    pagination: { limit: pageSize, offset: next * pageSize },
                    orderBy: [{ field: orderField, direction: orderDirection }],
                  });
                }}
              >
                Prev
              </Button>
              <Button
                variant="ghost"
                size="sm"
                disabled={page + 1 >= totalPages}
                onClick={() => {
                  const next = Math.min(page + 1, totalPages - 1);
                  setPage(next);
                  refetch({
                    filter: { searchTerm: search || undefined },
                    pagination: { limit: pageSize, offset: next * pageSize },
                    orderBy: [{ field: orderField, direction: orderDirection }],
                  });
                }}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}