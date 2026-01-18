"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { UserForm } from "./user-form";

interface UserDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialData?: {
        id: string;
        name: string;
        email: string;
        role: string;
    };
}

export function UserDialog({ open, onOpenChange, initialData }: UserDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{initialData ? "Edit User" : "Add New User"}</DialogTitle>
                    <DialogDescription>
                        {initialData ? "Update user account details." : "Create a new admin or superadmin account."}
                    </DialogDescription>
                </DialogHeader>
                <UserForm onSuccess={() => onOpenChange(false)} initialData={initialData} />
            </DialogContent>
        </Dialog>
    );
}
