"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal, Pencil, Trash } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useState } from "react";
import { ClientDialog } from "./client-dialog";
import { deleteClient } from "@/lib/actions/clients";
import { useRouter } from "next/navigation";

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
        cell: ({ row }) => {
            const client = row.original;

            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [open, setOpen] = useState(false);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const router = useRouter();

            const handleDelete = async () => {
                if (confirm("Are you sure?")) {
                    await deleteClient(client.id);
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

                    <ClientDialog
                        open={open}
                        onOpenChange={setOpen}
                        initialData={{
                            id: client.id,
                            name: client.name,
                            logoUrl: client.logoUrl,
                            website: client.website || "",
                            isFeatured: client.isFeatured
                        }}
                    />
                </>
            )
        },
    },
]
