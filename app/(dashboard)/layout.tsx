import Link from "next/link";
import type { Route } from "next";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  if (!user) {
    redirect("/auth");
  }
  return (
    <div className="min-h-screen bg-[#FAFBFC] text-[#202223]">
      {/* Topbar */}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-[#DFE3E8] bg-white px-4">
        <div className="flex items-center gap-3">
          <Link href={("/" as Route)} className="font-semibold text-[#202223]">Tickify</Link>
          <Separator orientation="vertical" className="h-5" />
          <span className="text-sm text-[#637381]">Dashboard</span>
        </div>
        <nav className="flex items-center gap-3 text-sm">
          <Link href={("/dashboard" as Route)} className="text-[#637381] hover:text-[#202223]">Overview</Link>
          <Link href={("/dashboard/pages" as Route)} className="text-[#637381] hover:text-[#202223]">Pages</Link>
          <Link href={("/dashboard/events" as Route)} className="text-[#637381] hover:text-[#202223]">Events</Link>
          <Link href={("/dashboard/users" as Route)} className="text-[#637381] hover:text-[#202223]">Users</Link>
          <Link href={("/dashboard/settings" as Route)} className="text-[#637381] hover:text-[#202223]">Settings</Link>
        </nav>
      </header>

      {/* AppFrame */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-[#DFE3E8] bg-white md:block">
          <div className="p-4">
            <div className="mb-3 text-xs font-semibold text-[#637381]">Manage</div>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href={("/dashboard" as Route)} className="block rounded px-3 py-2 text-[#637381] hover:bg-[#F6F7F8] hover:text-[#202223]">Overview</Link>
              </li>
              <li>
                <Link href={("/dashboard/pages" as Route)} className="block rounded px-3 py-2 text-[#637381] hover:bg-[#F6F7F8] hover:text-[#202223]">Pages</Link>
              </li>
              <li>
                <Link href={("/dashboard/events" as Route)} className="block rounded px-3 py-2 text-[#637381] hover:bg-[#F6F7F8] hover:text-[#202223]">Events</Link>
              </li>
              <li>
                <Link href={("/dashboard/users" as Route)} className="block rounded px-3 py-2 text-[#637381] hover:bg-[#F6F7F8] hover:text-[#202223]">Users</Link>
              </li>
            </ul>
            <div className="mt-6 mb-3 text-xs font-semibold text-[#637381]">Settings</div>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href={("/dashboard/settings" as Route)} className="block rounded px-3 py-2 text-[#637381] hover:bg-[#F6F7F8] hover:text-[#202223]">General</Link>
              </li>
            </ul>
          </div>
        </aside>
        {/* Main */}
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}