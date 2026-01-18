import { prisma } from "@/lib/prisma";
import { DataTable } from "@/components/admin/data-table/data-table";
import { columns, ClientColumn } from "@/components/admin/clients/columns"; // Import columns
import { format } from "date-fns";
import { ClientDialogWrapper } from "./_components/client-dialog-wrapper"; // Client Component for "Add New" button

export default async function ClientsPage() {
    const clients = await prisma.client.findMany({
        orderBy: { createdAt: "desc" },
    });

    const formattedClients: ClientColumn[] = clients.map((item) => ({
        id: item.id,
        name: item.name,
        logoUrl: item.logoUrl,
        website: item.website,
        isFeatured: item.isFeatured,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }));

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Clients</h2>
                    <p className="text-slate-500">Manage your clients and partners</p>
                </div>
                <ClientDialogWrapper />
            </div>
            <DataTable searchKey="name" columns={columns} data={formattedClients} />
        </div>
    );
}
