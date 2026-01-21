"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteCategory } from "@/lib/actions/categories";
import { CategoryDialog } from "./category-dialog";
import type { CategoryColumn } from "./columns";

interface CellActionProps {
    data: CategoryColumn;
}

export function CellAction({ data }: CellActionProps) {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this category?")) {
            await deleteCategory(data.id);
            router.refresh();
        }
    };

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
                    id: data.id,
                    slug: data.slug,
                    nameEn: data.nameEn,
                    nameId: data.nameId,
                }}
            />
        </>
    );
}
