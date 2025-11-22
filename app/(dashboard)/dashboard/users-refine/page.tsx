"use client"
"use no memo"

import { useMemo, useState } from "react";
import { gql } from "@apollo/client";
import { Refine, useUserFriendlyName } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import type { ColumnDef, Table } from "@tanstack/react-table";
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

import apolloDataProvider from "@/lib/refine/apollo-data-provider";
import JsonView from "@uiw/react-json-view";
import { ListView, ListViewHeader } from "@/components/refine-ui/views/list-view";
import { Sort } from "@/components/table/sort";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckAll } from "@/components/table/checkall";

type RowUser = { id: string; name?: string | null; email: string; createdAt: string };
  const columns: ColumnDef<RowUser>[] = [
    // {
    //   id: 'select', // Unique ID for the select column
    //   header: ({ table }) => (
    //     <CheckAll<RowUser>
    //       options={[
    //         bulkDeleteAction(table, (selected) => {
    //           alert(
    //             `Delete ${selected.length} ${friendly(
    //               "Row",
    //               selected.length > 1 ? "plural" : "singular",
    //             )}`
    //           );
    //         }),
    //       ]}
    //       table={table}
    //     />
    //   ),
    //   size: 10,
    //   cell: ({ row }) => (
    //     <Checkbox
    //       className="translate-y-[2px]"
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) =>
    //         row.toggleSelected(!!value)
    //       }
    //       aria-label="Select row"
    //       key={`checkbox-${row.original.id}`}
    //     />
    //   ),
    // },
    {
      id: "email",
      accessorKey: "email",
      header: ({ column, table, ...props }) => (
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
  ];

function UsersListRefine() {
  const [search, setSearch] = useState("");
  const friendly = useUserFriendlyName();
  
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
        <ListViewHeader title="Users" canCreate={true} resource="users-refine" />
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
      <JsonView value={{ filters, pagination: { currentPage, pageSize }, sorters }} />
    </div>
  );
}

export default function UsersRefinePage() {
  "use no memo";
  return (
    <Refine dataProvider={apolloDataProvider}>
      <UsersListRefine />
    </Refine>
  );
}