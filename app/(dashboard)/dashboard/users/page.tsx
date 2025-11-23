"use client"

import { useState } from "react";
import { gql } from "@apollo/client";
import { useUserFriendlyName } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { DataTableSorter } from "@/components/refine-ui/data-table/data-table-sorter";
import { DataTableFilterDropdownDateRangePicker, DataTableFilterDropdownText } from "@/components/refine-ui/data-table/data-table-filter";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const USERS_LIST_QUERY = gql`
  query GetUsersRefine($filter: UsersFilterInput, $pagination: PaginationInput, $orderBy: [UsersOrderByInput!]) {
    users(filter: $filter, pagination: $pagination, orderBy: $orderBy) {
      id
      name
      email
      createdAt
    }
    usersCount(filter: $filter)
  }
`;

import JsonView from "@uiw/react-json-view";
import { ListView, ListViewHeader } from "@/components/refine-ui/views/list-view";
import { Sort } from "@/components/table/sort";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoreVertical, Trash2, Pencil } from "lucide-react";
import { useMutation } from "@apollo/client/react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

type RowUser = { id: string; name?: string | null; email: string; createdAt: string };

function UsersListRefine() {
  const [search, setSearch] = useState("");
  useUserFriendlyName();
  const DELETE_USER_MUTATION = gql`
    mutation DeleteUser($id: ID!) { deleteUser(id: $id) }
  `;
  const [deleteUser] = useMutation(DELETE_USER_MUTATION);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  
  // function bulkDeleteAction<TData>(
  //   table: Table<TData>,
  //   onDelete: (selected: TData[]) => void,
  // ) {
  //   const count = table.getSelectedRowModel().rows.length;
  //   const label = `Delete Selected (${count}) ${friendly(
  //     "Row",
  //     count > 1 ? "plural" : "singular",
  //   )}`;

  //   return {
  //     label,
  //     onClick: () => {
  //       const selected = table
  //         .getSelectedRowModel()
  //         .rows.map((r) => r.original as TData);
  //       onDelete(selected);
  //     },
  //   };
  // }
  
  const columns: ColumnDef<RowUser>[] = [
    {
      id: "email",
      accessorKey: "email",
      header: ({ column, ...props }) => (
        <div className="flex items-center gap-1">
          <span>Email</span>
          <DataTableSorter column={column} {...props} />
        </div>
      ),
    },
    {
      id: "name",
      accessorKey: "name",
      header: ({ column, table, ...props }) => (
        <div className="flex items-center gap-1">
          <span>Name</span>
          <Sort column={column} {...props} />
          <div>
            <DataTableFilterDropdownText
              defaultOperator="contains"
              column={column}
              table={table}
              placeholder="Filter name"
            />
          </div>
        </div>
      ),
    },
    {
      id: "createdAt",
      accessorKey: "createdAt",
      header: ({ column, ...props }) => (
        <div className="flex items-center gap-1">
          <span>Created</span>
          <DataTableSorter column={column} {...props} />
          <div>
            <DataTableFilterDropdownDateRangePicker
              defaultOperator="between"
              column={column}
            />
          </div>
        </div>
      ),
      cell: ({ getValue }) => new Date(String(getValue())).toLocaleString(),
    },
    {
      id: "actions",
      header: () => <span>Actions</span>,
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/users/${row.original.id}/edit`} className="flex items-center gap-2">
                <Pencil className="h-4 w-4" />
                <span>Edit</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => { setConfirmId(row.original.id); setConfirmOpen(true); }}
              className="text-red-600 focus:text-red-600"
            >
              <div className="flex items-center gap-2">
                <Trash2 className="h-4 w-4" />
                <span>Delete</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      size: 100,
    },
  ];

  const table = useTable<RowUser>({
    columns,
    refineCoreProps: {
      resource: "users",
      meta: { gqlQuery: USERS_LIST_QUERY },
      pagination: { currentPage: 1, pageSize: 10 },
      sorters: { initial: [{ field: "createdAt", order: "desc" }] },
    },
  });

  const {
    refineCore: {
      sorters,
      filters,
      setFilters,
      setPageSize,
      currentPage,
      pageSize,
    },
    reactTable: { setSorting, getState },
  } = table;

  const handlePageSizeChange = (value: string) => {
    const size = Number(value);
    setPageSize(size);
  };
  const handleOrderFieldChange = (value: string) => {
    const order = getState()?.sorting?.[0]?.desc ? "desc" : "asc";
    setSorting([{ id: value, desc: order === "desc" }]);
  };
  const handleOrderDirectionChange = (value: string) => {
    const field = getState()?.sorting?.[0]?.id || "createdAt";
    setSorting([{ id: field, desc: value === "desc" }]);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    // Refine DataTableFilterDropdownText already wires filter, but we also add a global searchTerm
    setFilters([{ field: "searchTerm", operator: "contains", value }]);
  };

  return (
    <div className="space-y-6">
      <ListView>
        <ListViewHeader canCreate={true} resource="users" />
        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm text-[#637381]">Filters</CardTitle>
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
                <Select value={String(((table as any).reactTable?.getState()?.sorting?.[0]?.id) || "createdAt")} onValueChange={handleOrderFieldChange}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="createdAt">Created At</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={String((((table as any).reactTable?.getState()?.sorting?.[0]?.desc) ? "desc" : "asc"))} onValueChange={handleOrderDirectionChange}>
                  <SelectTrigger className="w-28">
                    <SelectValue placeholder="Direction" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asc">Asc</SelectItem>
                    <SelectItem value="desc">Desc</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        <DataTable table={table} />
      </ListView>
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              This action is permanent. Are you sure you want to delete this user?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>Cancel</Button>
            <Button
              variant="destructive"
              onClick={async () => {
                if (!confirmId) return;
                try {
                  await deleteUser({ variables: { id: confirmId } });
                  setConfirmOpen(false);
                  setConfirmId(null);
                  (table as any).refineCore.tableQuery.refetch();
                } catch (e) {
                  console.error(e);
                }
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <JsonView value={{ filters, pagination: { currentPage, pageSize }, sorters }} />
    </div>
  );
}

export default function UsersRefinePage() {
  "use no memo";
  return (
      <UsersListRefine />
  );
}