
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, Calendar, MapPin, Edit, Trash2, BarChart3, Eye } from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import { useSession } from "@/lib/auth-client";
import { DeleteEventDocument, EventsOrderField, OrderDirection, GetMyEventsPagedQuery } from "@/graphql/types";
import { EventStatus} from "@/graphql/types";

  const GET_EVENTS_PAGED = gql`
  query GetMyEventsPaged($filter: EventsFilterInput, $pagination: PaginationInput, $orderBy: [EventsOrderByInput!]) {
    events(filter: $filter, pagination: $pagination, orderBy: $orderBy) {
      id
      title
      status
      startDate
      images { banner }
      theme { primaryColor secondaryColor }
      location { venue city }
      ticketTiers { soldCount }
    }
    eventsCount(filter: $filter)
  }
`;

export default function MyEvents() {
  const { data: session } = useSession();

  const [activeTab, setActiveTab] = useState<'all' | EventStatus>("all");

  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const { data: eventsData, loading: isLoading } = useQuery<GetMyEventsPagedQuery>(GET_EVENTS_PAGED, {
    variables: {
      filter: {
        userId: session?.user?.id || undefined,
        status: activeTab === 'all' ? undefined : activeTab,
      },
      pagination: { limit: pageSize, offset: page * pageSize },
      orderBy: [ { field: EventsOrderField.UpdatedAt, direction: OrderDirection.Desc } ],
    },
    fetchPolicy: 'cache-and-network',
  });

  const [deleteEvent] = useMutation(DeleteEventDocument);

  const myEvents = (eventsData?.events || []);
  const total = typeof eventsData?.eventsCount === 'number' ? eventsData.eventsCount : 0;
  const totalPages = Math.max(Math.ceil(total / pageSize), 1);

  const filteredEvents = myEvents.filter(event => {
    if (activeTab === "all") return true;
    return event.status === activeTab;
  });

  const statusColors: Record<EventStatus, string> = {
    [EventStatus.Draft]: "bg-gray-100 text-gray-700",
    [EventStatus.Published]: "bg-green-100 text-green-700",
    [EventStatus.Ended]: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-cyan-600 to-amber-500 bg-clip-text text-transparent">
              My Events
            </h1>
            <p className="text-gray-600 mt-2">Manage and track your events</p>
          </div>
          <Link href={"/events/create"}>
            <Button className="bg-linear-to-r from-cyan-600 to-amber-500 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create New Event
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Events</p>
                  <p className="text-3xl font-bold mt-1">{myEvents.length}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-cyan-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Published</p>
                  <p className="text-3xl font-bold mt-1">
                    {myEvents.filter(e => e.status === EventStatus.Published).length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Draft</p>
                  <p className="text-3xl font-bold mt-1">
                    {myEvents.filter(e => e.status === EventStatus.Draft).length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <Edit className="w-4 h-4 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Tickets</p>
                  <p className="text-3xl font-bold mt-1">
                    {myEvents.reduce((sum, e) =>
                      sum + (e.ticketTiers?.reduce((tSum, t) => tSum + (t.soldCount || 0), 0) || 0), 0
                    )}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Events List */}
        <Card>
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'all' | EventStatus)}>
              <TabsList className="mb-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value={EventStatus.Draft}>Draft</TabsTrigger>
                <TabsTrigger value={EventStatus.Published}>Published</TabsTrigger>
                <TabsTrigger value={EventStatus.Ended}>Ended</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab}>
                {isLoading ? (
                  <div className="space-y-4">
                    {Array(3).fill(0).map((_, i) => (
                      <div key={i} className="flex gap-4">
                        <Skeleton className="w-32 h-24 rounded-lg" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-6 w-3/4" />
                          <Skeleton className="h-4 w-1/2" />
                          <Skeleton className="h-4 w-1/3" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : filteredEvents.length > 0 ? (
                  <div className="space-y-4">
                    {filteredEvents.map((event) => (
                      <div
                        key={event.id}
                        className="group flex flex-col sm:flex-row gap-4 p-4 rounded-xl border-2 hover:shadow-lg transition-all duration-300"
                        style={{
                          borderColor: `${event.theme?.primaryColor ?? '#e5e7eb'}30`,
                          background: `linear-gradient(135deg, ${event.theme?.primaryColor ?? '#000000'}05, ${event.theme?.secondaryColor ?? '#000000'}05)`
                        }}
                      >
                        {/* Event Image */}
                        <div className="w-full sm:w-32 h-32 rounded-lg overflow-hidden shrink-0">
                          <div
                            className="w-full h-full bg-cover bg-center"
                            style={{
                              backgroundImage: `url(${event.images?.banner ?? 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400'})`
                            }}
                          />
                        </div>

                        {/* Event Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-gray-900 mb-1">{event.title}</h3>
                              <Badge className={statusColors[event.status]}>
                                {event.status}
                              </Badge>
                            </div>
                          </div>

                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {format(new Date(event.startDate), "EEE, MMM d, yyyy 'at' h:mm a")}
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              {event.location?.venue || 'Venue'}, {event.location?.city || ''}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2 mt-4">
                            <Link href={`/event/${event.id}`}>
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4 mr-2" />
                                View
                              </Button>
                            </Link>
                            
                            <Link href={`/events/create?id=${event.id}`}>
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </Button>
                            </Link>

                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                if (confirm('Are you sure you want to delete this event?')) {
                                  deleteEvent({ variables: { id: event.id } });
                                }
                              }}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-linear-to-br from-cyan-100 to-amber-100 flex items-center justify-center">
                      <Calendar className="w-12 h-12 text-cyan-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No events yet</h3>
                    <p className="text-gray-600 mb-6">Start creating amazing events for your audience</p>
                    <Link href={"/events/create"}>
                      <Button className="bg-linear-to-r from-cyan-600 to-amber-500 text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Your First Event
                      </Button>
                    </Link>
                  </div>
                )}
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-xs text-gray-600">Page {page + 1} of {totalPages} • {total} total</div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" disabled={page === 0} onClick={() => setPage((p) => Math.max(p - 1, 0))}>Prev</Button>
                    <Button size="sm" variant="outline" disabled={page + 1 >= totalPages} onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}>Next</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
