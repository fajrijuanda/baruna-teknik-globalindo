"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import { CellAction } from "./cell-action";
import { createSelectColumn } from "@/components/admin/data-table/data-table";

// Define the shape of our data
export type ClientColumn = {
    id: string;
    name: string;
    logoUrl: string;
    website: string | null;
    isFeatured: boolean;
    createdAt: string;
}

export const columns: ColumnDef<ClientColumn>[] = [
    createSelectColumn<ClientColumn>(),
    {
        accessorKey: "logoUrl",
        header: "Logo",
        cell: ({ row }) => (
            <div className="relative w-10 h-10 rounded-full overflow-hidden border">
                <Image fill src={row.original.logoUrl} alt={row.original.name} className="object-cover" />
            </div>
        )
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "website",
        header: "Website",
    },
    {
        accessorKey: "isFeatured",
        header: "Active",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />,
    },
]
