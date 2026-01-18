"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

interface DashboardChartsProps {
    data: { name: string; total: number }[];
}

export function OverviewChart({ data }: DashboardChartsProps) {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis
                    dataKey="name"
                    stroke="#64748B"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#64748B" }}
                    dy={10}
                />
                <YAxis
                    stroke="#64748B"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                    tick={{ fill: "#64748B" }}
                />
                <Tooltip
                    cursor={{ fill: '#F1F5F9' }}
                    contentStyle={{
                        borderRadius: '12px',
                        border: 'none',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                        backgroundColor: '#FFFFFF',
                        padding: '12px'
                    }}
                    labelStyle={{ color: '#64748B', marginBottom: '4px', fontSize: '12px' }}
                />
                <Bar
                    dataKey="total"
                    fill="#3B82F6"
                    radius={[6, 6, 0, 0]}
                    barSize={60}
                    activeBar={{ fill: '#2563EB' }}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}
