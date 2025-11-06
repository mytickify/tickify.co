import Link from "next/link";
import type { Route } from "next";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  if (!user) {
    redirect("/auth");
  }
  let isAdmin = true;
  try {
    if (user?.id) {
      const roles = await prisma.userRole.findMany({
        where: { userId: user.id },
        include: { role: true },
      });
      isAdmin = roles.some((r) => r.role?.name === "Admin");
    }
  } catch (e) {
    // Fallback: if role lookup fails, default to true to avoid blocking admins.
    isAdmin = true;
  }
  return (
    <SidebarProvider>
      <AppSidebar isAdmin={isAdmin} />
      <SidebarInset>
        {/* Topbar */}
        <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-[#DFE3E8] bg-white px-4">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-5" />
            <Link href={("/" as Route)} className="font-semibold text-[#202223]">Tickify</Link>
            <Separator orientation="vertical" className="h-5" />
            <span className="text-sm text-[#637381]">Dashboard</span>
          </div>
          <nav className="flex items-center gap-3 text-sm">
            <Link href={("/dashboard" as Route)} className="text-[#637381] hover:text-[#202223]">Overview</Link>
            <Link href={("/dashboard/pages" as Route)} className="text-[#637381] hover:text-[#202223]">Pages</Link>
            <Link href={("/dashboard/events" as Route)} className="text-[#637381] hover:text-[#202223]">Events</Link>
            {isAdmin && (
              <>
                <Link href={("/dashboard/users" as Route)} className="text-[#637381] hover:text-[#202223]">Users</Link>
                <Link href={("/dashboard/settings" as Route)} className="text-[#637381] hover:text-[#202223]">Settings</Link>
              </>
            )}
          </nav>
        </header>

        {/* Main */}
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}