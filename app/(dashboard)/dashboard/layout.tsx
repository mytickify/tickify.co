"use client";
import apolloDataProvider from "@/lib/refine/apollo-data-provider";
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router";
import type { PropsWithChildren } from "react";
import { resources } from "./resources";

const AppLayout = ({ children }: PropsWithChildren) => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={apolloDataProvider}
            resources={resources}
        >
           {children}
        </Refine>
    );
};

export default AppLayout;