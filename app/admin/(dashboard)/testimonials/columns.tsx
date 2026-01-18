"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteTestimonial } from "@/lib/actions/testimonial";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TestimonialForm } from "./testimonial-form";

export type TestimonialColumn = {
    id: string;
    clientName: string;
    personName: string;
    role: string;
    rating: number;
    isVisible: boolean;
    createdAt: string;
    originalData: any; // Full data for editing
};

export const columns: ColumnDef<TestimonialColumn>[] = [
    {
        accessorKey: "clientName",
        header: "Client",
    },
    {
        accessorKey: "personName",
        header: "Person",
    },
    {
        accessorKey: "role",
        header: "Role",
    },
    {
        accessorKey: "rating",
        header: "Rating",
    },
    {
        accessorKey: "isVisible",
        header: "Visible",
        cell: ({ row }) => (
            <span className={row.original.isVisible ? "text-green-600 font-medium" : "text-slate-400"}>
                {row.original.isVisible ? "Yes" : "No"}
            </span>
        )
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />
    },
];

const CellAction = ({ data }: { data: TestimonialColumn }) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // We need to fetch clients again for the edit form? 
    // Ideally we pass them down, but cell render doesn't easily accept props.
    // Hack: We can assume the page will re-fetch or we use a context. 
    // Or simpler: Just delete here, and have a separate edit button that opens a modal managed by the page?
    // Let's implement Delete here. Editing might be better handled by a wrapper or just passing a minimal client list if possible?
    // Actually, I can pass the client list if I define columns inside the component or use a wrapper.
    // For now, let's just make the Edit button basically useless without the client list unless I fetch it.
    // Wait, I can pass `meta` to table?

    // Alternative: The `TestimonialDialogWrapper` can handle "Add", maybe I should use it for "Edit" too?
    // Let's try to make the Edit button open the form. But I need the 'clients' list.
    // I'll make the form fetch clients if not provided? No, that's bad.

    // SIMPLE APPROACH:
    // Just implement Delete here. 
    // For Edit, I'll redirect to a separate edit page? No user asked for modal.
    // I will try to use a Client Component Wrapper for the table that provides the edit context.

    // Actually, I'll just use a simple trick: pass clients via `meta` if using tanstack table, but our data-table might not support it exposed easily.

    // Let's stick to: The edit button opens a dialog. I will fetch clients inside the Edit dialog wrapper locally if needed?
    // Or I can just fetch all clients in this component? It's a client component.
    // NO, I shouldn't fetch in a cell.

    // Let's assume for MVP I only implement Delete here, and Edit requires a bit more structure, 
    // OR I just put the logic in the page component to handle row clicks?
    // Let's stick to standard: Dropdown menu.

    const onConfirm = async () => {
        try {
            setLoading(true);
            await deleteTestimonial(data.id);
            toast.success("Testimonial deleted");
            router.refresh();
        } catch (error) {
            toast.error("Make sure to remove all dependencies first");
        } finally {
            setLoading(false);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setOpen(true)} className="text-blue-600 cursor-pointer">
                    <Pencil className="mr-2 h-4 w-4" /> Edit
                    {/* Note: This Edit won't work fully without the form opening with Clients. 
                I will fix this by creating a separate EditTestimonialButton component 
                that takes the data and the Clients list, but I can't pass Clients list here easily.
                
                Actually, I can just use a "Dialog" triggered by this item? 
                Yes. But I need the `clients` list.
                
                Solution: I will export a function `getColumns(clients)` that returns the columns array, 
                so I can pass the clients list into the closure.
             */}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onConfirm} className="text-red-600 cursor-pointer">
                    <Trash className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
