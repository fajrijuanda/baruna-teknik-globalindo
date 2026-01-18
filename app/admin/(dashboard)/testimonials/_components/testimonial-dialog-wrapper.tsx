"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { TestimonialForm } from "./testimonial-form";

interface TestimonialDialogWrapperProps {
    clients: { id: string; name: string }[];
}

export function TestimonialDialogWrapper({ clients }: TestimonialDialogWrapperProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Testimonial
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Add Testimonial</DialogTitle>
                </DialogHeader>
                <TestimonialForm clients={clients} onClose={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}
