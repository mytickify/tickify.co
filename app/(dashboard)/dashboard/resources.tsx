import { Home, NewspaperIcon, User2 } from "lucide-react";
import type { ResourceProps } from "@refinedev/core";

export const resources: ResourceProps[] = [
    {
        name: "dashboard",
        list: "/dashboard",
        meta: {
            title: "Dashboard",
            icon: <Home className="h-4 w-4" />,
        },
    },
    {
        name: "users",
        list: "/dashboard/users",
        show: "/dashboard/users/:id",
        create: "/dashboard/users/create",
        edit: "/dashboard/users/:id/edit",
        meta: {
            title: "Users",
            icon: <User2 className="h-4 w-4" />,
        },
    },
];