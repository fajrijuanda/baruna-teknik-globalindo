"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { CellAction } from "./cell-action";
import { createSelectColumn } from "@/components/admin/data-table/data-table";

export type CategoryColumn = {
    id: string;
    nameEn: string;
    nameId: string;
    slug: string;
    productCount: number;
}

export const columns: ColumnDef<CategoryColumn>[] = [
    createSelectColumn<CategoryColumn>(),
    {
        accessorKey: "nameEn",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name (EN)
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "nameId",
        header: "Name (ID)",
    },
    {
        accessorKey: "slug",
        header: "Slug",
    },
    {
        accessorKey: "productCount",
        header: "Products",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />,
    },
]
