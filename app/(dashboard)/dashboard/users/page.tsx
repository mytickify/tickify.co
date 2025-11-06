import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardUsersList() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#202223]">Users</h1>
        <p className="mt-1 text-sm text-[#637381]">Manage user roles and access.</p>
      </div>
      <Card className="border-[#DFE3E8]">
        <CardHeader>
          <CardTitle className="text-sm text-[#637381]">List</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-[#637381]">Placeholder list. We’ll fetch users via GraphQL.</p>
        </CardContent>
      </Card>
    </div>
  );
}