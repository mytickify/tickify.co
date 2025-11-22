import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { BaseRecord,  useTranslate } from "@refinedev/core";
import { PropsWithChildren } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";

type CheckAllProps<TData extends BaseRecord = BaseRecord> = React.ComponentPropsWithoutRef<typeof Checkbox> &
    PropsWithChildren<{
        table: Table<TData>;
        options?: {
            label: string;
            onClick: () => void;
        }[];
    }>;

export function CheckAll<TData extends BaseRecord = BaseRecord>({ table, children, options }: CheckAllProps<TData>) {
    const t = useTranslate();
    return (
        <>
            <Checkbox
                checked={
                    table.getIsSomeRowsSelected()
                        ? "indeterminate"
                        : table.getIsAllPageRowsSelected()
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                className="translate-y-[2px]"
                aria-label={t("Select all")}
            />
            {children ||
                (Array.isArray(options) && options.length && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                disabled={
                                    !(
                                        table.getIsSomeRowsSelected() ||
                                        table.getIsAllPageRowsSelected()
                                    )
                                }
                                size={"icon"}
                                variant={"ghost"}
                                className="px-0 w-5"
                            >
                                <DotsVerticalIcon className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            <DropdownMenuLabel>
                                {t("Bulk Actions")}
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {!children &&
                                Array.isArray(options) &&
                                options?.length > 0
                                ? options.map((option, key) => (
                                    <DropdownMenuItem
                                        key={key}
                                        onSelect={option.onClick}
                                    >
                                        {option.label}
                                    </DropdownMenuItem>
                                ))
                                : children}
                        </DropdownMenuContent>
                    </DropdownMenu>
                ))}
        </>
    );
}

CheckAll.displayName = "CheckAll";