import { auth } from "@/auth";
import { AdminLayoutShell } from "./_components/admin-layout-shell";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    return (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <AdminLayoutShell userEmail={session?.user?.email} userRole={(session?.user as any)?.role}>
            {children}
        </AdminLayoutShell>
    );
}
