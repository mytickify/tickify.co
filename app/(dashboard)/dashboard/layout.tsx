"use client";
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router";
import { PropsWithChildren } from "react";
import { resources } from "./resources";
import apolloDataProvider from "@/lib/refine/apollo-data-provider";

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