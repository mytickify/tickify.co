"use client"

import { useMemo, useState } from "react";
import { gql } from "@urql/core";
import { Refine } from "@refinedev/core";
import { useTable } from "@refinedev/antd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

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

type RowUser = { id: string; name?: string | null; email: string; createdAt: string };

function UsersListRefine() {
  const [search, setSearch] = useState("");

  const { tableProps, sorters, setSorters, filters, setFilters } = useTable({
    resource: "users",
    meta: { gqlQuery: USERS_LIST_QUERY },
    syncWithLocation: false,
    sorters: {
      initial: [
        { field: "createdAt", order: "desc" },
      ],
    },
    pagination: {
      current: 1,
      pageSize: 20,
    } as any,
  });

  const users = useMemo<RowUser[]>(() => Array.isArray((tableProps as any)?.dataSource) ? (tableProps as any).dataSource as RowUser[] : [], [tableProps]);
  const isLoading = (tableProps as any)?.loading ?? false;
  const currentPage = (tableProps as any)?.pagination?.current ?? 1;
  const pageSize = (tableProps as any)?.pagination?.pageSize ?? 20;
  const totalCount = (tableProps as any)?.pagination?.total ?? (Array.isArray(users) ? users.length : 0);
  const totalPages = useMemo(() => Math.max(Math.ceil(totalCount / pageSize), 1), [totalCount, pageSize]);

  const handlePageSizeChange = (value: string) => {
    const size = Number(value);
    const onChange = (tableProps as any)?.pagination?.onChange;
    const onShowSizeChange = (tableProps as any)?.pagination?.onShowSizeChange;
    if (typeof onShowSizeChange === "function") onShowSizeChange(1, size);
    else if (typeof onChange === "function") onChange(1, size);
  };
  const handleOrderFieldChange = (value: string) => {
    const nextOrder = Array.isArray(sorters) && sorters[0]?.order ? sorters[0].order : "desc";
    setSorters?.([{ field: value, order: nextOrder } as any]);
  };
  const handleOrderDirectionChange = (value: string) => {
    const field = Array.isArray(sorters) && sorters[0]?.field ? String(sorters[0].field) : "createdAt";
    setSorters?.([{ field, order: value as any }]);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setFilters?.([{ field: "searchTerm", operator: "contains", value } as any]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#202223]">Users (Refine)</h1>
          <p className="mt-1 text-sm text-[#637381]">List powered by Refine GraphQL provider.</p>
        </div>
      </div>

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
              <Select value={String((Array.isArray(sorters) && sorters[0]?.field) || "createdAt")} onValueChange={handleOrderFieldChange}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt">Created At</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                </SelectContent>
              </Select>
              <Select value={String((Array.isArray(sorters) && sorters[0]?.order) || "desc")} onValueChange={handleOrderDirectionChange}>
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
          {!isLoading && users.length === 0 && (
            <p className="text-sm text-[#637381]">No users found.</p>
          )}
          {!isLoading && users.length > 0 && (
            <div className="divide-y divide-[#DFE3E8] rounded border border-[#DFE3E8] bg-white">
              {users.map((u) => (
                <div key={u.id} className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded bg-[#F6F7F8] px-3 py-1 text-xs text-[#637381]">{u.email}</div>
                    <Separator orientation="vertical" className="h-5" />
                    <div className="text-sm text-[#202223]">{u.name || "Unknown"}</div>
                  </div>
                  <div className="text-xs text-[#637381]">{new Date(u.createdAt).toLocaleString()}</div>
                </div>
              ))}
            </div>
          )}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-xs text-[#637381]">Page {currentPage} of {totalPages} • {totalCount} total</div>
            <div className="flex items-center gap-2">
              <button
                className="rounded px-2 py-1 text-xs text-[#637381] hover:bg-[#F6F7F8] hover:text-[#202223]"
                disabled={currentPage <= 1}
                onClick={() => {
                  const onChange = (tableProps as any)?.pagination?.onChange;
                  if (typeof onChange === "function") onChange(Math.max(currentPage - 1, 1), pageSize);
                }}
              >Prev</button>
              <button
                className="rounded px-2 py-1 text-xs text-[#637381] hover:bg-[#F6F7F8] hover:text-[#202223]"
                disabled={currentPage >= totalPages}
                onClick={() => {
                  const onChange = (tableProps as any)?.pagination?.onChange;
                  if (typeof onChange === "function") onChange(Math.min(currentPage + 1, totalPages), pageSize);
                }}
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