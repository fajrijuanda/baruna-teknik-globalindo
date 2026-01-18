import { prisma } from "@/lib/prisma";
import { DataTable } from "@/components/admin/data-table/data-table";
// import { columns, TestimonialColumn } from "./columns"; // I need to adjust columns to accept clients for Edit
import { format } from "date-fns";
import { TestimonialDialogWrapper } from "./_components/testimonial-dialog-wrapper";
import { TestimonialsClient } from "./client-page"; // I'll create this to handle columns generation

export default async function TestimonialsPage() {
    const testimonials = await prisma.testimonial.findMany({
        include: { client: true },
        orderBy: { createdAt: "desc" },
    });

    const clients = await prisma.client.findMany({
        select: { id: true, name: true },
        orderBy: { name: "asc" }
    });

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Testimonials</h2>
                    <p className="text-slate-500">Manage client testimonials</p>
                </div>
                <TestimonialDialogWrapper clients={clients} />
            </div>

            <TestimonialsClient data={testimonials} clients={clients} />
        </div>
    );
}
