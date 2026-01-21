/**
 * Admin Dashboard Page
 * Displays overview statistics and recent activity
 */

import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VisitorChart } from "@/components/admin/dashboard/visitor-chart";
import { Package, Users, FolderOpen, Activity, ArrowUpRight } from "lucide-react";
import { formatShortDate } from "@/lib/utils/date";
import type { ActivityLogEntry } from "@/lib/types";

// ============================================================================
// Data Fetching
// ============================================================================

async function getDashboardStats() {
    const [productCount, categoryCount, clientCount, adminCount, visitorCount] =
        await Promise.all([
            prisma.product.count(),
            prisma.category.count(),
            prisma.client.count(),
            prisma.admin.count(),
            prisma.visitor.count(),
        ]);

    return { productCount, categoryCount, clientCount, adminCount, visitorCount };
}

async function getRecentActivities(): Promise<ActivityLogEntry[]> {
    try {
        const activities = await prisma.activityLog.findMany({
            take: 5,
            orderBy: { createdAt: "desc" },
        });
        return activities as ActivityLogEntry[];
    } catch {
        return [];
    }
}

// ============================================================================
// Page Component
// ============================================================================

export default async function DashboardPage() {
    const stats = await getDashboardStats();
    const recentActivities = await getRecentActivities();

    return (
        <div className="flex-1 space-y-8 p-8 pt-6 bg-slate-50/50">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                <StatCard
                    title="Web Visitors"
                    value={stats.visitorCount}
                    subtitle="Total hits"
                    icon={<Users className="h-4 w-4 text-cyan-500" />}
                    borderColor="border-l-cyan-500"
                    showArrow
                />
                <StatCard
                    title="Total Products"
                    value={stats.productCount}
                    subtitle="Catalog items"
                    icon={<Package className="h-4 w-4 text-blue-500" />}
                    borderColor="border-l-blue-500"
                />
                <StatCard
                    title="Categories"
                    value={stats.categoryCount}
                    subtitle="Active Categories"
                    icon={<FolderOpen className="h-4 w-4 text-emerald-500" />}
                    borderColor="border-l-emerald-500"
                />
                <StatCard
                    title="Clients"
                    value={stats.clientCount}
                    subtitle="Partner Logos"
                    icon={<Users className="h-4 w-4 text-purple-500" />}
                    borderColor="border-l-purple-500"
                />
                <StatCard
                    title="Admins"
                    value={stats.adminCount}
                    subtitle="System Users"
                    icon={<Activity className="h-4 w-4 text-orange-500" />}
                    borderColor="border-l-orange-500"
                />
            </div>

            {/* Charts and Activity */}
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
                        <ActivityList activities={recentActivities} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

// ============================================================================
// Sub-components
// ============================================================================

interface StatCardProps {
    title: string;
    value: number;
    subtitle: string;
    icon: React.ReactNode;
    borderColor: string;
    showArrow?: boolean;
}

function StatCard({
    title,
    value,
    subtitle,
    icon,
    borderColor,
    showArrow,
}: StatCardProps) {
    return (
        <Card className={`border-l-4 ${borderColor} shadow-sm hover:shadow-md transition-shadow`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                    {title}
                </CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-slate-800">{value}</div>
                <p className="text-xs text-slate-500 mt-1 flex items-center">
                    {showArrow && <ArrowUpRight className="h-3 w-3 text-emerald-500 mr-1" />}
                    {subtitle}
                </p>
            </CardContent>
        </Card>
    );
}

interface ActivityListProps {
    activities: ActivityLogEntry[];
}

function ActivityList({ activities }: ActivityListProps) {
    if (activities.length === 0) {
        return (
            <p className="text-sm text-muted-foreground">No activity recorded yet.</p>
        );
    }

    return (
        <div className="space-y-4">
            {activities.map((log) => (
                <div key={log.id} className="flex items-start">
                    <span className="relative flex h-2 w-2 mr-4 mt-1.5 flex-shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                    </span>
                    <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {log.action}{" "}
                            <span className="text-muted-foreground">{log.entity}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">{log.details}</p>
                        <p className="text-[10px] text-slate-400">
                            {formatShortDate(log.createdAt)}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
