import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#202223]">Settings</h1>
        <p className="mt-1 text-sm text-[#637381]">Configure organization and dashboard preferences.</p>
      </div>
      <Card className="border-[#DFE3E8]">
        <CardHeader>
          <CardTitle className="text-sm text-[#637381]">General</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-[#637381]">Placeholder settings. We’ll wire up forms later.</p>
        </CardContent>
      </Card>
    </div>
  );
}