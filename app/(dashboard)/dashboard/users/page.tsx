"use client";
import { useMemo, useState } from "react";
import { useQuery } from "@apollo/client/react";
import { GetUsersDocument, GetUsersQuery } from "@/graphql/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function UsersListPage() {
  const { data, loading } = useQuery<GetUsersQuery>(GetUsersDocument);
  const [search, setSearch] = useState("");

  const users = useMemo(() => {
    const list = Array.isArray(data?.users) ? data!.users : [];
    if (!search.trim()) return list;
    const q = search.toLowerCase();
    return list.filter((u) =>
      (u.name || "").toLowerCase().includes(q) ||
      (u.email || "").toLowerCase().includes(q)
    );
  }, [data, search]);

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

      {/* Filters */}
      <Card className="border-[#DFE3E8]">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email"
            />
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
    </div>
  );
}