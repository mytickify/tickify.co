"use client"

import * as React from "react"
import Link from "next/link"
import {
  BookOpen,
  Calendar,
  Command,
  LayoutDashboard,
  LifeBuoy,
  Send,
  Settings2,
  Users,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Tickify",
    email: "admin@tickify.co",
    avatar: "/vercel.svg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Pages",
      url: "/dashboard/pages",
      icon: BookOpen,
      items: [
        { title: "List", url: "/dashboard/pages" },
      ],
    },
    {
      title: "Events",
      url: "/dashboard/events",
      icon: Calendar,
      items: [
        { title: "List", url: "/dashboard/events" },
      ],
    },
    {
      title: "Users",
      url: "/dashboard/users",
      icon: Users,
    },
        {
      title: "Users(Refine)",
      url: "/dashboard/users-refine",
      icon: Users,
    },
        {
      title: "Users(Shadcn)",
      url: "/dashboard/users-shadcn",
      icon: Users,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings2,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "/dashboard/support",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "/dashboard/feedback",
      icon: Send,
    },
  ],
}

export function AppSidebar({ isAdmin = true, ...props }: React.ComponentProps<typeof Sidebar> & { isAdmin?: boolean }) {
  const filteredNavMain = React.useMemo(() => {
    if (isAdmin) return data.navMain
    return data.navMain.filter((item) => !["Users", "Settings"].includes(item.title))
  }, [isAdmin])
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Tickify</span>
                  <span className="truncate text-xs">Dashboard</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={filteredNavMain} />
        {data.navSecondary.length ? (
          <NavSecondary items={data.navSecondary} className="mt-auto" />
        ) : null}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
