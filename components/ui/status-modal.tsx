"use client";

import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StatusModalProps {
    isOpen: boolean;
    onClose: () => void;
    status: "idle" | "loading" | "success" | "error";
    title?: string;
    message?: string;
    description?: string; // Additional failure reason
}

export function StatusModal({ isOpen, onClose, status, title, message, description }: StatusModalProps) {
    // Determine content based on status
    const isSuccess = status === "success";
    const isError = status === "error";
    const isLoading = status === "loading";

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            if (!open && !isLoading) onClose();
        }}>
            <DialogContent className="sm:max-w-md text-center flex flex-col items-center gap-6 p-8">
                {/* Icon Animation */}
                <div className={cn(
                    "h-20 w-20 rounded-full flex items-center justify-center transition-all duration-500",
                    isSuccess && "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-500",
                    isError && "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-500",
                    isLoading && "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-500"
                )}>
                    {isSuccess && <CheckCircle className="h-10 w-10 animate-in zoom-in duration-300" />}
                    {isError && <XCircle className="h-10 w-10 animate-in zoom-in duration-300" />}
                    {isLoading && <Loader2 className="h-10 w-10 animate-spin" />}
                </div>

                <div className="space-y-2 w-full">
                    <DialogTitle className="text-xl font-bold text-center">
                        {title || (isSuccess ? "Success!" : isError ? "Something Went Wrong" : "Processing...")}
                    </DialogTitle>
                    {message && (
                        <p className="text-slate-600 dark:text-slate-300 text-center">
                            {message}
                        </p>
                    )}
                    {description && isError && (
                        <div className="mt-2 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 p-2 rounded-md font-mono border border-red-100 dark:border-red-900/50 break-words">
                            {description}
                        </div>
                    )}
                </div>

                <div className="w-full flex justify-center">
                    {!isLoading && (
                        <Button
                            onClick={onClose}
                            className={cn(
                                "w-full sm:w-auto min-w-[120px]",
                                isSuccess && "bg-green-600 hover:bg-green-700",
                                isError && "bg-red-600 hover:bg-red-700"
                            )}
                        >
                            {isSuccess ? "Continue" : "Try Again"}
                        </Button>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
