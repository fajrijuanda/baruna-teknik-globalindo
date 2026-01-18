"use client";

import { Copy, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteAdmin } from "@/lib/actions/users";
import { useStatusModal } from "@/hooks/use-status-modal";
import { UserDialog } from "@/app/admin/(dashboard)/users/_components/user-dialog";
import { useState } from "react";
import { Pencil } from "lucide-react";

// Avoid circular dependency by defining a local interface
interface CellActionProps {
    data: {
        id: string;
        name: string;
        email: string;
        role: string;
        createdAt: string; // Ensure this matches what is passed
    };
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
    const router = useRouter();
    const { openLoading, openSuccess, openError } = useStatusModal();
    const [open, setOpen] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [loading, setLoading] = useState(false);

    const onDelete = async () => {
        openLoading("Deleting user...");
        try {
            if (data.role === "superadmin") {
                openError("Cannot delete Superadmin from this quick action.");
                return;
            }
            const result = await deleteAdmin(data.id);
            if (result.success) {
                openSuccess("User deleted successfully.");
                router.refresh();
            } else {
                openError(result.error || "Something went wrong");
            }
        } catch {
            openError("Something went wrong");
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
                    <DropdownMenuItem
                        onClick={() => {
                            navigator.clipboard.writeText(data.id);
                            toast.success("ID copied to clipboard");
                        }}
                    >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy ID
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onDelete} className="text-red-600 focus:text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <UserDialog
                open={open}
                onOpenChange={setOpen}
                initialData={{
                    id: data.id,
                    name: data.name,
                    email: data.email,
                    role: data.role
                }}
            />
        </>
    );
};
