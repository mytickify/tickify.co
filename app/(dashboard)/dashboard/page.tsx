"use client";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { EventStatus, GetPagesDocument, GetUsersDocument, GetEventsCountQuery } from "@/graphql/types";

// query definition for codegen is embedded below but we use the generated document for typing
const GET_EVENTS_COUNT = gql`query GetEventsCount($filter: EventsFilterInput) { eventsCount(filter: $filter) }`;

export default function DashboardOverviewPage() {
  const { data: eventsCountData, loading: eventsCountLoading } = useQuery<GetEventsCountQuery>(GET_EVENTS_COUNT, {
    variables: { filter: { status: EventStatus.Published } },
    fetchPolicy: 'cache-and-network',
  });
  const { data: pagesData, loading: pagesLoading } = useQuery(GetPagesDocument);
  const { data: usersData, loading: usersLoading } = useQuery(GetUsersDocument);

  const activeEvents = typeof eventsCountData?.eventsCount === 'number' ? eventsCountData.eventsCount : 0;
  const publishedPages = Array.isArray(pagesData?.pages)
    ? pagesData.pages.filter((p) => !!p.published).length
    : 0;
  const totalUsers = Array.isArray(usersData?.users) ? usersData.users.length : 0;

  return (
    <div className="space-y-6">
      {/* PageHeader */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#202223]">Overview</h1>
          <p className="mt-1 text-sm text-[#637381]">Key metrics and recent activity</p>
        </div>
        {/* Primary action placeholder */}
        <div className="flex gap-2">
          {/* Actions could go here (e.g., Create Page/Event) */}
        </div>
      </div>

      {/* KPI Widgets */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="border-[#DFE3E8]">
          <CardHeader>
            <CardTitle className="text-sm text-[#637381]">Active Events</CardTitle>
          </CardHeader>
          <CardContent>
            {(eventsCountLoading) ? (
              <div className="space-y-2">
                <Skeleton className="h-8 w-14" />
                <Skeleton className="h-4 w-32" />
              </div>
            ) : (
              <>
                <div className="text-3xl font-semibold text-[#202223]">{activeEvents}</div>
                <p className="mt-1 text-sm text-[#637381]">Published events</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="border-[#DFE3E8]">
          <CardHeader>
            <CardTitle className="text-sm text-[#637381]">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            {usersLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-4 w-36" />
              </div>
            ) : (
              <>
                <div className="text-3xl font-semibold text-[#202223]">{totalUsers}</div>
                <p className="mt-1 text-sm text-[#637381]">Registered users</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="border-[#DFE3E8]">
          <CardHeader>
            <CardTitle className="text-sm text-[#637381]">Published Pages</CardTitle>
          </CardHeader>
          <CardContent>
            {pagesLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-8 w-12" />
                <Skeleton className="h-4 w-28" />
              </div>
            ) : (
              <>
                <div className="text-3xl font-semibold text-[#202223]">{publishedPages}</div>
                <p className="mt-1 text-sm text-[#637381]">Pages published</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity placeholder */}
      <Card className="border-[#DFE3E8]">
        <CardHeader>
          <CardTitle className="text-sm text-[#637381]">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {eventsCountLoading || pagesLoading || usersLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ) : (
            <p className="text-sm text-[#637381]">We’ll list recent changes here.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}