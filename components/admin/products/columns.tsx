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
import { deleteProduct } from "@/lib/actions/products";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProductDialog } from "./product-dialog";

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
        cell: ({ row }) => {
            const product = row.original;

            // eslint-disable-next-line react-hooks/rules-of-hooks
            const router = useRouter();
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [open, setOpen] = useState(false);

            const handleDelete = async () => {
                if (confirm("Are you sure?")) {
                    await deleteProduct(product.id);
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

                    <ProductDialog
                        open={open}
                        onOpenChange={setOpen}
                        initialData={{
                            id: product.id,
                            slug: product.slug,
                            categoryId: product.categoryId,
                            titleEn: product.titleEn,
                            titleId: product.titleId,
                            descEn: product.descEn,
                            descId: product.descId,
                            imageUrl: product.imageUrl,
                        }}
                    />
                </>
            )
        },
    },
]
