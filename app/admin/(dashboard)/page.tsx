import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VisitorChart } from "@/components/admin/dashboard/visitor-chart";
import { Package, Users, FolderOpen, Activity, ArrowUpRight } from "lucide-react";

export default async function DashboardPage() {
    const productCount = await prisma.product.count();
    const categoryCount = await prisma.category.count();
    const clientCount = await prisma.client.count();
    const adminCount = await prisma.admin.count();
    // Safeguard for when Prisma Client hasn't been regenerated yet
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const visitorCount = (prisma as any).visitor ? await prisma.visitor.count() : 0;

    const chartData = [
        { name: "Products", total: productCount },
        { name: "Categories", total: categoryCount },
        { name: "Clients", total: clientCount },
        { name: "Admins", total: adminCount },
    ];

    // Fetch recent activities
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recentActivities = (prisma as any).activityLog ? await (prisma as any).activityLog.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
    }) : [];

    // Helper to format time relative (e.g., "2 hours ago") - simpler version or use date-fns formatDistanceToNow
    // For now, simple date format
    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(date);
    };

    return (
        <div className="flex-1 space-y-8 p-8 pt-6 bg-slate-50/50">
            {/* Header is now in Navbar */}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                {/* Visitor Stats Card (First) */}
                <Card className="border-l-4 border-l-cyan-500 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">
                            Web Visitors
                        </CardTitle>
                        <Users className="h-4 w-4 text-cyan-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-800">{visitorCount}</div>
                        <p className="text-xs text-slate-500 mt-1 flex items-center">
                            <ArrowUpRight className="h-3 w-3 text-emerald-500 mr-1" />
                            Total hits
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">
                            Total Products
                        </CardTitle>
                        <Package className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-800">{productCount}</div>
                        <p className="text-xs text-slate-500 mt-1 flex items-center">
                            Catalog items
                        </p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-emerald-500 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">
                            Categories
                        </CardTitle>
                        <FolderOpen className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-800">{categoryCount}</div>
                        <p className="text-xs text-slate-500 mt-1 flex items-center">
                            Active Categories
                        </p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-purple-500 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">
                            Clients
                        </CardTitle>
                        <Users className="h-4 w-4 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-800">{clientCount}</div>
                        <p className="text-xs text-slate-500 mt-1 flex items-center">
                            Partner Logos
                        </p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-orange-500 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">
                            Admins
                        </CardTitle>
                        <Activity className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-800">{adminCount}</div>
                        <p className="text-xs text-slate-500 mt-1 flex items-center">
                            System Users
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-7">
                <Card className="col-span-4 shadow-md border-slate-200">
                    <CardHeader>
                        <CardTitle>Visitor Analytics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <VisitorChart />
                    </CardContent>
                </Card>
                <Card className="col-span-3 shadow-md border-slate-200">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <p className="text-sm text-slate-500">
                            Recent actions taken in the dashboard.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentActivities.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No activity recorded yet.</p>
                            ) : (
                                recentActivities.map((log: any) => (
                                    <div key={log.id} className="flex items-start">
                                        <span className="relative flex h-2 w-2 mr-4 mt-1.5 flex-shrink-0">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                        </span>
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm font-medium leading-none">
                                                {log.action} <span className="text-muted-foreground">{log.entity}</span>
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {log.details}
                                            </p>
                                            <p className="text-[10px] text-slate-400">
                                                {formatDate(log.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
