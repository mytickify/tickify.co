"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@apollo/client/react";
import { GetEventsDocument, GetEventsQuery, GetPagesDocument, GetPagesQuery, GetUsersDocument, GetUsersQuery } from "@/graphql/operations";

// Generated types from codegen are used for events and pages

export default function DashboardOverviewPage() {
  const { data: eventsData } = useQuery<GetEventsQuery>(GetEventsDocument);
  const { data: pagesData } = useQuery<GetPagesQuery>(GetPagesDocument);
  const { data: usersData } = useQuery<GetUsersQuery>(GetUsersDocument);

  const activeEvents = Array.isArray(eventsData?.events)
    ? eventsData.events.filter((e) => e.status === 'PUBLISHED').length
    : 0;
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
            <div className="text-3xl font-semibold text-[#202223]">{activeEvents}</div>
            <p className="mt-1 text-sm text-[#637381]">Published events</p>
          </CardContent>
        </Card>

        <Card className="border-[#DFE3E8]">
          <CardHeader>
            <CardTitle className="text-sm text-[#637381]">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-[#202223]">{totalUsers}</div>
            <p className="mt-1 text-sm text-[#637381]">Registered users</p>
          </CardContent>
        </Card>

        <Card className="border-[#DFE3E8]">
          <CardHeader>
            <CardTitle className="text-sm text-[#637381]">Published Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-[#202223]">{publishedPages}</div>
            <p className="mt-1 text-sm text-[#637381]">Pages published</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity placeholder */}
      <Card className="border-[#DFE3E8]">
        <CardHeader>
          <CardTitle className="text-sm text-[#637381]">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-[#637381]">We’ll list recent changes here.</p>
        </CardContent>
      </Card>
    </div>
  );
}