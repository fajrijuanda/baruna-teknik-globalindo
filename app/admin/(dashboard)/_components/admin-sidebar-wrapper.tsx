"use client";

import { useState, useEffect } from "react";
import { AdminSidebar } from "./admin-sidebar";

export function AdminSidebarWrapper() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Communicate state to parent/sibling if needed, or simply render sidebar
    // For now, simpler approach: AdminSidebar handles its own state for visuals, 
    // but the main content margin needs to adjust.
    // 
    // A context provider would be cleaner, but let's try a simpler CSS approach first 
    // or lift state if we want smooth transitions on the main content margin.
    // 
    // Actually, AdminSidebar has the toggle button. Let's make AdminSidebar accept props or callback.

    return (
        <AdminSidebar
            isCollapsed={isCollapsed}
            onToggle={() => setIsCollapsed(!isCollapsed)}
        />
    );
}

// Wait, I need to update AdminSidebar to accept these props first.
// Let's rewrite AdminSidebar below to match this expectation in a later step
// OR just put the logic in the Sidebar and use context for layout padding.
