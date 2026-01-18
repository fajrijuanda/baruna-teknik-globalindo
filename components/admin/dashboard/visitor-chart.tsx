"use client";

import { useState, useEffect } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { format, subDays, addDays } from "date-fns";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { getVisitorStats, DailyVisitorStat } from "@/lib/actions/analytics";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Simple Calendar implementation since we might not have the full shadcn calendar setup
// Using native date input for robustness in this step, or simple manual controls
function SimpleDatePicker({ date, setDate }: { date: Date; setDate: (d: Date) => void }) {
    return (
        <div className="flex items-center gap-2">
            <Button
                variant="outline"
                size="icon"
                onClick={() => setDate(subDays(date, 7))}
                title="Previous Week"
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="relative">
                <input
                    type="date"
                    className="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    value={format(date, "yyyy-MM-dd")}
                    onChange={(e) => e.target.valueAsDate && setDate(e.target.valueAsDate)}
                />
            </div>
            <Button
                variant="outline"
                size="icon"
                onClick={() => setDate(addDays(date, 7))}
                disabled={date >= new Date()}
                title="Next Week"
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
}

export function VisitorChart() {
    // End date of the 7-day window
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [data, setData] = useState<DailyVisitorStat[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                // Calculate start date (6 days before end date to make 7 days total)
                const startDate = subDays(endDate, 6);
                const stats = await getVisitorStats(startDate, endDate);
                setData(stats);
            } catch (error) {
                console.error("Failed to fetch visitor stats", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [endDate]);

    const totalVisitors = data.reduce((acc, curr) => acc + curr.total, 0);

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-6">
                <div className="space-y-1">
                    <CardTitle className="text-lg font-medium">Visitor Trends</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                        Daily unique visitors for the selected 7-day period.
                    </CardDescription>
                </div>
                <div className="flex-shrink-0">
                    <SimpleDatePicker date={endDate} setDate={setEndDate} />
                </div>
            </div>

            <div className="h-[350px] w-full">
                {loading ? (
                    <div className="h-full w-full flex items-center justify-center text-muted-foreground animate-pulse">
                        Loading statistics...
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                            <XAxis
                                dataKey="date"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}`}
                                allowDecimals={false}
                            />
                            <Tooltip
                                contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                                cursor={{ fill: "transparent" }}
                            />
                            <Bar
                                dataKey="total"
                                fill="currentColor"
                                radius={[4, 4, 0, 0]}
                                className="fill-blue-500 hover:fill-blue-600 transition-colors"
                                barSize={40}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>
            <div className="text-sm text-muted-foreground mt-4">
                Total visitors in period: <span className="font-bold text-foreground">{totalVisitors}</span>
            </div>
        </div>
    );
}
