"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { CellAction } from "./cell-action";
import { createSelectColumn } from "@/components/admin/data-table/data-table";

// Define the shape of our data
export type ProductColumn = {
    id: string;
    titleEn: string;
    titleId: string;
    category: string;
    categoryId: string;
    slug: string;
    descEn: string;
    descId: string;
    imageUrl?: string;
    isFeatured: boolean;
    createdAt: string;
}

export const columns: ColumnDef<ProductColumn>[] = [
    createSelectColumn<ProductColumn>(),
    {
        accessorKey: "titleEn",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "isFeatured",
        header: "Featured",
        cell: ({ row }) => (
            <div className={row.original.isFeatured ? "text-green-600 font-bold" : "text-slate-500"}>
                {row.original.isFeatured ? "Yes" : "No"}
            </div>
        )
    },
    {
        accessorKey: "createdAt",
        header: "Created",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />,
    },
]
