"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { ProductDialog } from "@/components/admin/products/product-dialog";

export const ProductDialogWrapper = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Add New
            </Button>
            <ProductDialog open={open} onOpenChange={setOpen} />
        </>
    );
};
