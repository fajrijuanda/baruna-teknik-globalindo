"use client";

import { useState } from "react";
import { StatusModal } from "@/components/ui/status-modal";

type StatusType = "idle" | "loading" | "success" | "error";

interface ModalState {
    isOpen: boolean;
    status: StatusType;
    title?: string;
    message?: string;
    description?: string;
}

export function useStatusModal() {
    const [state, setState] = useState<ModalState>({
        isOpen: false,
        status: "idle",
    });

    const openLoading = (message = "Processing...") => {
        setState({
            isOpen: true,
            status: "loading",
            title: "Please Wait",
            message,
        });
    };

    const openSuccess = (message: string, title = "Success!") => {
        setState({
            isOpen: true,
            status: "success",
            title,
            message,
        });
    };

    const openError = (description: string, message = "Operation failed", title = "Error") => {
        setState({
            isOpen: true,
            status: "error",
            title,
            message,
            description,
        });
    };

    const close = () => {
        setState((prev) => ({ ...prev, isOpen: false }));
    };

    // Helper to render the modal automatically
    const StatusDialog = () => (
        <StatusModal
            isOpen={state.isOpen}
            onClose={close}
            status={state.status}
            title={state.title}
            message={state.message}
            description={state.description}
        />
    );

    return {
        openLoading,
        openSuccess,
        openError,
        close,
        StatusDialog,
    };
}
