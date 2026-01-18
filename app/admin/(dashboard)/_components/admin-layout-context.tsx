"use client";

import React, { createContext, useContext, useState } from "react";

interface AdminLayoutContextType {
    isCollapsed: boolean;
    toggleSidebar: () => void;
}

const AdminLayoutContext = createContext<AdminLayoutContextType | undefined>(undefined);

export function AdminLayoutProvider({ children }: { children: React.ReactNode }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => setIsCollapsed(prev => !prev);

    return (
        <AdminLayoutContext.Provider value={{ isCollapsed, toggleSidebar }}>
            {children}
        </AdminLayoutContext.Provider>
    );
}

export function useAdminLayout() {
    const context = useContext(AdminLayoutContext);
    if (context === undefined) {
        throw new Error("useAdminLayout must be used within an AdminLayoutProvider");
    }
    return context;
}
