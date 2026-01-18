import { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface DataTablePaginationProps<TData> {
    table: Table<TData>;
}

export function DataTablePagination<TData>({
    table,
}: DataTablePaginationProps<TData>) {
    return (
        <div className="flex items-center justify-between px-2 w-full mt-4">
            <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">Rows per page</p>
                    <Select
                        value={`${table.getState().pagination.pageSize}`}
                        onValueChange={(value) => {
                            table.setPageSize(Number(value));
                        }}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={table.getState().pagination.pageSize} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Numbered Pagination Buttons */}
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    {/* Simple Pagination Numbers: Show Current, Prev, Next if available */}
                    <div className="flex items-center gap-1">
                        {Array.from({ length: table.getPageCount() }, (_, i) => i).map((pageIndex) => {
                            // Logic to show limited pages (e.g., current, +1, -1, first, last)
                            // For simplicity in this admin panel, let's just show all if < 5, or windowing logic.
                            // But user specifically asked for "number 1 in the middle".
                            // Let's standard "show all" if small, or sliding window.
                            // Simple version: Show all page numbers for now as product count is low. 
                            // If high, we can implement ellipisis.
                            if (table.getPageCount() > 7 && Math.abs(pageIndex - table.getState().pagination.pageIndex) > 2) {
                                return null; // Logic for ellipsis would be here, skipping for simple MVP
                            }

                            return (
                                <Button
                                    key={pageIndex}
                                    variant={table.getState().pagination.pageIndex === pageIndex ? "default" : "outline"}
                                    className="h-8 w-8 p-0"
                                    onClick={() => table.setPageIndex(pageIndex)}
                                >
                                    {pageIndex + 1}
                                </Button>
                            )
                        })}
                    </div>

                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
