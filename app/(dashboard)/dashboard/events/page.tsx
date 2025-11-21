"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { EventsOrderField, OrderDirection, GetEventsPagedQuery } from "@/graphql/types";
import { useState } from "react";
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

const GET_EVENTS_PAGED = gql`
  query GetEventsPaged($filter: EventsFilterInput, $pagination: PaginationInput, $orderBy: [EventsOrderByInput!]) {
    events(filter: $filter, pagination: $pagination, orderBy: $orderBy) {
      id
      slug
      title
      status
      updatedAt
    }
    eventsCount(filter: $filter)
  }
`;

export default function DashboardEventsList() {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(20);
  const [orderField, setOrderField] = useState<EventsOrderField>(EventsOrderField.UpdatedAt);
  const [orderDirection, setOrderDirection] = useState<OrderDirection>(OrderDirection.Desc);

  const { data, loading, error } = useQuery<GetEventsPagedQuery>(GET_EVENTS_PAGED, {
    variables: {
      filter: { searchTerm: search || undefined },
      pagination: { limit: pageSize, offset: page * pageSize },
      orderBy: [{ field: orderField, direction: orderDirection }],
    },
    fetchPolicy: "cache-and-network",
  });

  const events = Array.isArray(data?.events) ? data.events : [];
  const total = typeof data?.eventsCount === 'number' ? data.eventsCount : 0;
  const totalPages = Math.max(Math.ceil(total / pageSize), 1);

  const handlePageSizeChange = (value: string) => {
    setPage(0);
    setPageSize(Number(value));
  };

  const handleOrderFieldChange = (value: string) => {
    setPage(0);
    setOrderField(value as EventsOrderField);
  };

  const handleOrderDirectionChange = (value: string) => {
    setPage(0);
    setOrderDirection(value as OrderDirection);
  };

  console.log('DashboardEventsList', data);
  if (!loading && error) {
    console.error('DashboardEventsList error', error);
    return <p className="text-sm text-[#637381]">Error loading events. {error.message}</p>;
  }
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
            <div className="flex items-center gap-2">
              <div className="w-64">
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by title or slug"
                />
              </div>
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
                  <SelectItem value={EventsOrderField.UpdatedAt}>Updated At</SelectItem>
                  <SelectItem value={EventsOrderField.CreatedAt}>Created At</SelectItem>
                  <SelectItem value={EventsOrderField.Title}>Title</SelectItem>
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
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-[#637381]">Loading events…</p>
          ) : events.length === 0 ? (
            <div className="rounded border border-dashed border-[#DFE3E8] p-6 text-center">
              <p className="text-sm text-[#637381]">No events found. Create your first event.</p>
            </div>
          ) : (
            <ul className="divide-y divide-[#DFE3E8]">
              {events.map((e) => (
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
          <div className="mt-4 flex items-center justify-between">
            <div className="text-xs text-[#637381]">Page {page + 1} of {totalPages} • {total} total</div>
            <div className="flex items-center gap-2">
              <button
                className="rounded px-2 py-1 text-xs text-[#637381] hover:bg-[#F6F7F8] hover:text-[#202223]"
                disabled={page === 0}
                onClick={() => setPage((p) => Math.max(p - 1, 0))}
              >Prev</button>
              <button
                className="rounded px-2 py-1 text-xs text-[#637381] hover:bg-[#F6F7F8] hover:text-[#202223]"
                disabled={page + 1 >= totalPages}
                onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
              >Next</button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}