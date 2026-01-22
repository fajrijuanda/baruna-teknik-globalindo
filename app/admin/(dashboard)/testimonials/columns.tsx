"use client";

// Imports fixed
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

// Removed unused Dialog imports and form import since they were unused
// import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { TestimonialForm } from "./_components/testimonial-form";

export type TestimonialColumn = {
    id: string;
    clientName: string;
    personName: string;
    role: string;
    rating: number;
    isVisible: boolean;
    createdAt: string;
    originalData: unknown; // Full data for editing
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
    // Removed unused state
    // const [open, setOpen] = useState(false);
    // const [loading, setLoading] = useState(false);

    const onConfirm = async () => {
        try {
            await deleteTestimonial(data.id);
            toast.success("Testimonial deleted");
            router.refresh();
        } catch {
            toast.error("Make sure to remove all dependencies first");
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
                {/* Edit functionality temporarily disabled/simplified as per previous comments */}
                <DropdownMenuItem className="text-blue-600 cursor-pointer">
                    <Pencil className="mr-2 h-4 w-4" /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onConfirm} className="text-red-600 cursor-pointer">
                    <Trash className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

