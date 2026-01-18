"use client";

import { useEffect, useRef } from "react";
import { trackVisitor } from "@/actions/track-visitor";
import { usePathname } from "next/navigation";

export function VisitorTracker() {
    const pathname = usePathname();
    const initialized = useRef(false);

    useEffect(() => {
        // Prevent double tracking in React Strict Mode (Dev)
        if (!initialized.current) {
            initialized.current = true;
            trackVisitor(pathname);
        }
    }, [pathname]);

    return null;
}
