"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useQuery } from "@apollo/client/react";
import { GetPagesDocument, GetPagesQuery } from "@/graphql/operations";
import { useMemo, useState } from "react";
import Link from "next/link";
import type { Route } from "next";

function formatDate(dt?: string | any | null) {
  try {
    if (!dt) return "--";
    const d = typeof dt === "string" ? new Date(dt) : new Date(dt as any);
    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(d);
  } catch {
    return String(dt ?? "--");
  }
}

export default function DashboardPagesList() {
  const { data, loading } = useQuery<GetPagesQuery>(GetPagesDocument);
  const [search, setSearch] = useState<string>("");

  const pages = Array.isArray(data?.pages) ? data!.pages : [];
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return pages;
    return pages.filter((p) => {
      const base = `${p.name} ${p.slug}`.toLowerCase();
      return base.includes(q);
    });
  }, [pages, search]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#202223]">Pages</h1>
          <p className="mt-1 text-sm text-[#637381]">Manage site pages built with the Site Builder.</p>
        </div>
        <div className="flex gap-2">
          {/* New Page placeholder link to builder route */}
          <Link
            href={("/page/create" as Route)}
            className="rounded bg-[#5C6AC4] px-3 py-2 text-sm font-medium text-white hover:bg-[#4E5AA8]"
          >
            New Page
          </Link>
        </div>
      </div>

      <Card className="border-[#DFE3E8]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm text-[#637381]">List</CardTitle>
            <div className="w-64">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title or slug"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-[#637381]">Loading pages…</p>
          ) : filtered.length === 0 ? (
            <div className="rounded border border-dashed border-[#DFE3E8] p-6 text-center">
              <p className="text-sm text-[#637381]">No pages found. Create your first page.</p>
            </div>
          ) : (
            <ul className="divide-y divide-[#DFE3E8]">
              {filtered.map((p) => (
                <li key={p.id} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded bg-[#F6F7F8]" />
                    <div>
                      <div className="text-sm font-medium text-[#202223]">{p.name}</div>
                      <div className="text-xs text-[#637381]">/{p.slug}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`rounded px-2 py-1 text-xs ${p.published ? "bg-[#E3F8F7] text-[#107569]" : "bg-[#FFF3E0] text-[#B45309]"}`}>
                      {p.published ? "Published" : "Draft"}
                    </span>
                    <div className="text-xs text-[#637381]">Updated {formatDate(p.updatedAt as any)}</div>
                    <div className="flex gap-2">
                      <Link
                        href={(`/p/${p.slug}` as Route)}
                        className="rounded px-2 py-1 text-xs text-[#637381] hover:bg-[#F6F7F8] hover:text-[#202223]"
                      >
                        View
                      </Link>
                      <Link
                        href={("/dashboard/pages/" + p.id as Route)}
                        className="rounded px-2 py-1 text-xs text-[#637381] hover:bg-[#F6F7F8] hover:text-[#202223]"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}