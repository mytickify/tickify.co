import { CaretDownIcon, CaretUpIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import type { BaseRecord, CrudSort } from "@refinedev/core";
import { Column } from "@tanstack/react-table";

export const Sort = <TData extends BaseRecord = BaseRecord>({
    column,
    sorters,
}: {
    column: Column<TData>;
    sorters?: CrudSort[];
}) => {
    const sort = sorters?.find((sorter) => sorter.field === column.id)?.order || false
    return (
        <div
            className="cursor-pointer"
            onClick={() => {
                column.toggleSorting(undefined, true)
            }}

        >
            <div className="inline-flex flex-col">
                <CaretUpIcon
                    className={cn(
                        "-mb-1.5 w-5 h-5",
                        sort === "asc" ? "text-primary" : "text-input"
                    )}
                />
                <CaretDownIcon
                    className={cn(
                        "-mt-1.5 w-5 h-5",
                        sort === "desc" ? "text-primary" : "text-input"
                    )}
                />
            </div>
        </div>
    );
};