"use client"

import { useMemo, useState } from "react";
import { gql } from "@urql/core";
import { Refine } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { DataTableSorter } from "@/components/refine-ui/data-table/data-table-sorter";
import { DataTableFilterDropdownDateRangePicker, DataTableFilterDropdownText } from "@/components/refine-ui/data-table/data-table-filter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

type RowUser = { id: string; name?: string | null; email: string; createdAt: string };

function UsersListRefine() {
  const [search, setSearch] = useState("");

  const columns = useMemo<ColumnDef<RowUser>[]>(() => [
    {
      id: "email",
      accessorKey: "email",
      header: ({ column }) => (
        <div className="flex items-center gap-1">
          <span>Email</span>
          <DataTableSorter column={column} />
        </div>
      ),
    },
    {
      id: "name",
      accessorKey: "name",
      header: ({ column, table }) => (
        <div className="flex items-center gap-1">
          <span>Name</span>
          <DataTableSorter column={column} />
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
      header: ({ column }) => (
        <div className="flex items-center gap-1">
          <span>Created</span>
          <DataTableSorter column={column} />
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
  ], []);

  const table = useTable<RowUser>({
    columns,
    refineCoreProps: {
      resource: "users",
      meta: { gqlQuery: USERS_LIST_QUERY },
      pagination: { currentPage: 1, pageSize: 20 },
      sorters: { initial: [{ field: "createdAt", order: "desc" }] },
    },
  });

  const { 
    refineCore: { 
      filters,
       setFilters,
        setPageSize, 
        currentPage, 
        pageSize,
        
        tableQuery:{
          isLoading,
        }
       },
    reactTable: { setSorting, getState },
 } = table;

  const totalCount = Number(((table as any).refineCore?.tableQuery?.data?.total) ?? 0);
  const totalPages = useMemo(() => Math.max(Math.ceil(totalCount / pageSize), 1), [totalCount, pageSize]);

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#202223]">Users (Refine)</h1>
          <p className="mt-1 text-sm text-[#637381]">List powered by Refine GraphQL provider.</p>
        </div>
      </div>
      <JsonView value={{ filters, pagination: { currentPage, pageSize } }} />
      <Card className="border-[#DFE3E8]">
        <CardHeader>
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
        </CardHeader>
        <CardContent>
          {isLoading && <p className="text-sm text-[#637381]">Loading users…</p>}
          {!isLoading && table.reactTable?.getRowModel?.().rows.length === 0 && (
            <p className="text-sm text-[#637381]">No users found.</p>
          )}
          {!isLoading && (
            <div className="rounded border border-[#DFE3E8] bg-white">
              <DataTable table={table} />
            </div>
          )}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-xs text-[#637381]">Page {currentPage} of {totalPages} • {totalCount} total</div>
            <div className="flex items-center gap-2">
              <button
                className="rounded px-2 py-1 text-xs text-[#637381] hover:bg-[#F6F7F8] hover:text-[#202223]"
                disabled={currentPage <= 1}
                onClick={() => (table as any).refineCore?.setCurrentPage?.(Math.max(currentPage - 1, 1))}
              >Prev</button>
              <button
                className="rounded px-2 py-1 text-xs text-[#637381] hover:bg-[#F6F7F8] hover:text-[#202223]"
                disabled={currentPage >= totalPages}
                onClick={() => (table as any).refineCore?.setCurrentPage?.(Math.min(currentPage + 1, totalPages))}
              >Next</button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function UsersRefinePage() {
  return (
    <Refine dataProvider={apolloDataProvider}>
      <UsersListRefine />
    </Refine>
  );
}