"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal, Pencil, Trash } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteCategory } from "@/lib/actions/categories";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CategoryDialog } from "./category-dialog";
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
        cell: ({ row }) => {
            const category = row.original;

            // eslint-disable-next-line react-hooks/rules-of-hooks
            const router = useRouter();

            const [open, setOpen] = useState(false);

            const handleDelete = async () => {
                if (confirm("Are you sure?")) {
                    await deleteCategory(category.id); // Fixed signature to match definition
                    router.refresh();
                }
            }

            return (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => setOpen(true)}>
                                <Pencil className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                                <Trash className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <CategoryDialog
                        open={open}
                        onOpenChange={setOpen}
                        initialData={{
                            id: category.id,
                            slug: category.slug,
                            nameEn: category.nameEn,
                            nameId: category.nameId,
                        }}
                    />
                </>
            )
        },
    },
]
