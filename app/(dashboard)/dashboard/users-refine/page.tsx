"use client"

import { useCallback, useEffect, useMemo, useState } from "react";
import { gql } from "@urql/core";
import { Refine } from "@refinedev/core";
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

function UsersListRefine() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [orderField, setOrderField] = useState("createdAt");
  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("desc");
  const [isLoading, setLoading] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const fetchList = useCallback(async () => {
    setLoading(true);
    try {
      const result = await apolloDataProvider.getList({
        resource: "users",
        pagination: { currentPage: page, pageSize },
        sorters: [{ field: orderField, order: orderDirection }],
        filters: [{ field: "searchTerm", operator: "eq", value: search || undefined }],
        meta: { gqlQuery: USERS_LIST_QUERY },
      });
      const rows = Array.isArray(result?.data) ? result!.data : [];
      setUsers(rows as any[]);
      setTotalCount(Number(result?.total ?? 0));
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, orderField, orderDirection, search]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const totalPages = useMemo(() => Math.max(Math.ceil(totalCount / pageSize), 1), [totalCount, pageSize]);

  const handlePageSizeChange = (value: string) => {
    setPage(1);
    setPageSize(Number(value));
  };
  const handleOrderFieldChange = (value: string) => {
    setPage(1);
    setOrderField(value);
  };
  const handleOrderDirectionChange = (value: string) => {
    setPage(1);
    setOrderDirection(value as any);
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
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or email" />
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
              <Select value={orderField} onValueChange={handleOrderFieldChange}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt">Created At</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                </SelectContent>
              </Select>
              <Select value={orderDirection} onValueChange={handleOrderDirectionChange}>
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
            <div className="text-xs text-[#637381]">Page {page} of {totalPages} • {totalCount} total</div>
            <div className="flex items-center gap-2">
              <button className="rounded px-2 py-1 text-xs text-[#637381] hover:bg-[#F6F7F8] hover:text-[#202223]" disabled={page <= 1} onClick={() => setPage((p) => Math.max(p - 1, 1))}>Prev</button>
              <button className="rounded px-2 py-1 text-xs text-[#637381] hover:bg-[#F6F7F8] hover:text-[#202223]" disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(p + 1, totalPages))}>Next</button>
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