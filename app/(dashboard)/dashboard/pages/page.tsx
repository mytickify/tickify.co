import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPagesList() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#202223]">Pages</h1>
        <p className="mt-1 text-sm text-[#637381]">Manage site pages built with the Site Builder.</p>
      </div>
      <Card className="border-[#DFE3E8]">
        <CardHeader>
          <CardTitle className="text-sm text-[#637381]">List</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-[#637381]">Placeholder list. We’ll fetch pages via GraphQL.</p>
        </CardContent>
      </Card>
    </div>
  );
}