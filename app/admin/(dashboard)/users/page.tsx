import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DataTable } from "@/components/admin/data-table/data-table";
import { columns, UserColumn } from "@/components/admin/users/columns";
import { UserDialogWrapper } from "./_components/user-dialog-wrapper";
import { getAdmins } from "@/lib/actions/users";
import { format } from "date-fns";
import type { AdminRole } from "@/lib/types";

export default async function UsersPage() {
    const session = await auth();
    const role = (session?.user as { role?: AdminRole } | undefined)?.role;

    if (role !== "superadmin") {
        redirect("/admin");
    }

    const result = await getAdmins();
    const admins = result.success ? result.data ?? [] : [];

    const formattedUsers: UserColumn[] = admins.map((item) => ({
        id: item.id,
        name: item.name || "",
        email: item.email,
        role: item.role,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }));

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
                    <p className="text-slate-500">Manage admin accounts and permissions.</p>
                </div>
                <UserDialogWrapper />
            </div>
            <DataTable searchKey="name" columns={columns} data={formattedUsers} />
        </div>
    );
}
