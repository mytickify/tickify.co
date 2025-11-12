"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useQuery } from "@apollo/client/react";
import { GetEventsDocument, GetEventsQuery } from "@/graphql/operations";
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

export default function DashboardEventsList() {
  const { data, loading } = useQuery<GetEventsQuery>(GetEventsDocument);
  const [search, setSearch] = useState<string>("");

  const events = Array.isArray(data?.events) ? data!.events : [];
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return events;
    return events.filter((e) => {
      const base = `${e.title ?? ""} ${e.slug ?? ""}`.toLowerCase();
      return base.includes(q);
    });
  }, [events, search]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#202223]">Events</h1>
          <p className="mt-1 text-sm text-[#637381]">Manage your events, tickets, and schedules.</p>
        </div>
        <div className="flex gap-2">
          <Link
            href={("/events/create" as Route)}
            className="rounded bg-[#5C6AC4] px-3 py-2 text-sm font-medium text-white hover:bg-[#4E5AA8]"
          >
            New Event
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
            <p className="text-sm text-[#637381]">Loading events…</p>
          ) : filtered.length === 0 ? (
            <div className="rounded border border-dashed border-[#DFE3E8] p-6 text-center">
              <p className="text-sm text-[#637381]">No events found. Create your first event.</p>
            </div>
          ) : (
            <ul className="divide-y divide-[#DFE3E8]">
              {filtered.map((e) => (
                <li key={e.id} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded bg-[#F6F7F8]" />
                    <div>
                      <div className="text-sm font-medium text-[#202223]">{e.title}</div>
                      <div className="text-xs text-[#637381]">/{e.slug}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`rounded px-2 py-1 text-xs ${e.status === "PUBLISHED" ? "bg-[#E3F8F7] text-[#107569]" : "bg-[#FFF3E0] text-[#B45309]"}`}>
                      {e.status === "PUBLISHED" ? "Published" : "Draft"}
                    </span>
                    <div className="text-xs text-[#637381]">Updated {formatDate(e.updatedAt as any)}</div>
                    <div className="flex gap-2">
                      <Link
                        href={(`/event/${e.id}` as Route)}
                        className="rounded px-2 py-1 text-xs text-[#637381] hover:bg-[#F6F7F8] hover:text-[#202223]"
                      >
                        View
                      </Link>
                      <Link
                        href={(`/events/create?id=${e.id}` as Route)}
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