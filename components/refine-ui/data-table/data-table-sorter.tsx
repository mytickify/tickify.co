"use client";


import type { Column, Table as ReactTable } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CrudSort } from "@refinedev/core";

export type DataTableSorterProps<TData> = {
  column: Column<TData>;
  sorters?: CrudSort[];
} & React.ComponentProps<typeof Button>;

export function DataTableSorter<TData>({
  column,
  sorters,
  className,
}: DataTableSorterProps<TData>) {
  const sort = sorters?.find((sorter) => sorter.field === column.id)?.order || false
  const title =
    sort === "desc"
      ? `Sort by ${column.id} as descending`
      : sort === "asc"
        ? `Sort by ${column.id} as ascending`
        : `Sort by ${column.id}`;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => column.toggleSorting(undefined, true)}
      title={title}
      aria-label={title}
      className={cn("data-[state=open]:bg-accent", "w-5 h-5", className)}
    >
      {sort === "desc" ? (
        <ArrowDown className={cn("text-primary", "!w-3", "!h-3")} />
      ) : sort === "asc" ? (
        <ArrowUp className={cn("text-primary", "!w-3", "!h-3")} />
      ) : (
        <ChevronsUpDown
          className={cn("text-muted-foreground", "!w-3", "!h-3")}
        />
      )}
    </Button>
  );
}

DataTableSorter.displayName = "DataTableSorter";
