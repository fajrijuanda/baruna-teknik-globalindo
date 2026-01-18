"use client";

import { DataTable } from "@/components/admin/data-table/data-table";
import { format } from "date-fns";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TestimonialForm } from "./_components/testimonial-form";

export type TestimonialColumn = {
    id: string;
    clientName: string;
    personName: string;
    role: string;
    rating: number;
    isVisible: boolean;
    createdAt: string;
    originalData: any;
};

interface TestimonialsClientProps {
    data: any[];
    clients: { id: string; name: string }[];
}

export function TestimonialsClient({ data, clients }: TestimonialsClientProps) {
    const router = useRouter();

    const columns: ColumnDef<TestimonialColumn>[] = [
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
            cell: ({ row }) => <CellAction data={row.original} clients={clients} />
        },
    ];

    const formattedData: TestimonialColumn[] = data.map((item) => ({
        id: item.id,
        clientName: item.client.name,
        personName: item.personName,
        role: item.personRole,
        rating: item.rating,
        isVisible: item.isVisible,
        createdAt: format(new Date(item.createdAt), "MMMM do, yyyy"),
        originalData: item
    }));

    return (
        <DataTable searchKey="clientName" columns={columns} data={formattedData} />
    );
}

const CellAction = ({ data, clients }: { data: TestimonialColumn, clients: { id: string; name: string }[] }) => {
    const router = useRouter();
    const [open, setOpen] = useState(false); // For Delete Alert (if I implemented Alert) - actually reusing dropdown state implicitly or creating separate dialog states
    const [editOpen, setEditOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const onConfirm = async () => {
        try {
            setLoading(true);
            await deleteTestimonial(data.id);
            toast.success("Testimonial deleted");
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    return (
        <>
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Testimonial</DialogTitle>
                    </DialogHeader>
                    <TestimonialForm
                        clients={clients}
                        initialData={data.originalData}
                        onClose={() => setEditOpen(false)}
                    />
                </DialogContent>
            </Dialog>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => setEditOpen(true)} className="cursor-pointer">
                        <Pencil className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onConfirm} className="text-red-600 cursor-pointer">
                        <Trash className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};
