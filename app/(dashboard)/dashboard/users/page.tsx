"use client";
import { useMemo, useState } from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { GetUsersPagedQuery, UsersOrderField, OrderDirection } from "@/graphql/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

export default function UsersListPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [orderField, setOrderField] = useState<UsersOrderField>(UsersOrderField.CreatedAt);
  const [orderDirection, setOrderDirection] = useState<OrderDirection>(OrderDirection.Desc);

  const { data, loading, error } = useQuery<GetUsersPagedQuery>(GET_USERS_PAGED, {
    variables: {
      filter: { searchTerm: search || undefined },
      pagination: { limit: pageSize, offset: page * pageSize },
      orderBy: [{ field: orderField, direction: orderDirection }],
    },
    fetchPolicy: "cache-and-network",
  });
  console.log("UsersListPage", data, loading, error);
  const users = useMemo(() => {
    return Array.isArray(data?.users) ? data.users : [];
  }, [data, search, page, pageSize, orderField, orderDirection, loading]);

  const total = typeof data?.usersCount === "number" ? data.usersCount : 0;
  const totalPages = Math.max(Math.ceil(total / pageSize), 1);

  const handlePageSizeChange = (value: string) => {
    setPage(0);
    setPageSize(Number(value));
  };

  const handleOrderFieldChange = (value: string) => {
    setPage(0);
    setOrderField(value as UsersOrderField);
  };

  const handleOrderDirectionChange = (value: string) => {
    setPage(0);
    setOrderDirection(value as OrderDirection);
  };

  return (
    <div className="space-y-6">
      {/* PageHeader */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#202223]">Users</h1>
          <p className="mt-1 text-sm text-[#637381]">Manage registered users</p>
        </div>
        {/* Placeholder actions */}
        <div className="flex gap-2"></div>
      </div>
      {error && <p className="text-red-500">Error: {error.message}</p>}
      {/* Filters */}
      <Card className="border-[#DFE3E8]">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email"
            />
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
                <SelectItem value={UsersOrderField.CreatedAt}>Created At</SelectItem>
                <SelectItem value={UsersOrderField.Name}>Name</SelectItem>
                <SelectItem value={UsersOrderField.Email}>Email</SelectItem>
              </SelectContent>
            </Select>
            <Select value={orderDirection} onValueChange={handleOrderDirectionChange}>
              <SelectTrigger className="w-28">
                <SelectValue placeholder="Direction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={OrderDirection.Asc}>Asc</SelectItem>
                <SelectItem value={OrderDirection.Desc}>Desc</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* List */}
      <Card className="border-[#DFE3E8]">
        <CardHeader>
          <CardTitle className="text-sm text-[#637381]">All Users</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && <p className="text-sm text-[#637381]">Loading users…</p>}
          {!loading && users.length === 0 && (
            <p className="text-sm text-[#637381]">No users found.</p>
          )}
          {!loading && users.length > 0 && (
            <div className="divide-y divide-[#DFE3E8] rounded border border-[#DFE3E8] bg-white">
              {users.map((u) => (
                <div key={u.id} className="flex items-center justify-between p-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="h-8 w-8 shrink-0 rounded-full bg-[#DFE3E8]" />
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium text-[#202223]">{u.name || "Unnamed"}</div>
                      <div className="truncate text-xs text-[#637381]">{u.email}</div>
                    </div>
                  </div>
                  <div className="text-xs text-[#637381]">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-xs text-[#637381]">
          Page {page + 1} of {totalPages} • {total} total
        </div>
        <div className="flex items-center gap-2">
          <button
            className="rounded px-2 py-1 text-xs text-[#637381] hover:bg-[#F6F7F8] hover:text-[#202223]"
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
          >
            Prev
          </button>
          <button
            className="rounded px-2 py-1 text-xs text-[#637381] hover:bg-[#F6F7F8] hover:text-[#202223]"
            disabled={page + 1 >= totalPages}
            onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}