"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { createSelectColumn } from "@/components/admin/data-table/data-table";

export type UserColumn = {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
};

export const columns: ColumnDef<UserColumn>[] = [
    createSelectColumn<UserColumn>(),
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
            const role = row.getValue("role") as string;
            return (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${role === "superadmin"
                    ? "bg-purple-100 text-purple-700 border border-purple-200"
                    : "bg-slate-100 text-slate-700 border border-slate-200"
                    }`}>
                    {role.toUpperCase()}
                </span>
            )
        }
    },
    {
        accessorKey: "createdAt",
        header: "Date Created",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];
