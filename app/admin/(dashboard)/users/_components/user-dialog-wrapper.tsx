"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserDialog } from "./user-dialog";

export function UserDialogWrapper() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Add User
            </Button>
            <UserDialog open={open} onOpenChange={setOpen} />
        </>
    );
}
