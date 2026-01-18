"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import * as LucideIcons from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

// Get all icon names
const iconList = Object.keys(LucideIcons)
    .filter((key) => isNaN(Number(key)) && key !== "createLucideIcon" && key !== "default")
    .slice(0, 300); // Limit to first 300 for performance initially, or lazy load. 
// For a real app, better to use a virtual list or a curated set.
// I will stick to a reasonable subset or just all if performant enough.
// Let's actually use a curated list of relevant icons for "Why Choose Us" context to ensure relevance and performance.

const RELEVANT_ICONS = [
    "Activity", "Award", "BadgeCheck", "BarChart", "Box", "Briefcase", "Building",
    "Calendar", "Check", "CheckCircle", "Clock", "Cloud", "Cog", "Compass",
    "CreditCard", "Database", "DollarSign", "Droplet", "Eye", "File", "Flag",
    "folder", "Globe", "Heart", "Home", "Image", "Inbox", "Key", "Layers", "Layout",
    "LifeBuoy", "Link", "Lock", "Mail", "Map", "MapPin", "MessageCircle", "Monitor",
    "MousePointer", "Package", "Phone", "PieChart", "Play", "Power", "Printer",
    "Search", "Server", "Settings", "Share", "Shield", "ShieldCheck", "ShoppingBag",
    "ShoppingCart", "Smartphone", "Star", "Sun", "Tablet", "Tag", "Target",
    "Terminal", "Thermometer", "ThumbsUp", "Tool", "Trash", "TrendingUp", "Truck",
    "Tv", "Umbrella", "Unlock", "Upload", "User", "Users", "Video", "Voicemail",
    "Volume2", "Watch", "Wifi", "Zap", "ZoomIn"
];

interface IconPickerProps {
    value: string;
    onChange: (value: string) => void;
}

export function IconPicker({ value, onChange }: IconPickerProps) {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState("");

    const selectedIcon = value ? (LucideIcons as any)[value] : null;
    const SelectedIconComp = selectedIcon;

    const filteredIcons = RELEVANT_ICONS.filter((icon) =>
        icon.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {value ? (
                        <div className="flex items-center gap-2">
                            {SelectedIconComp && <SelectedIconComp className="h-4 w-4" />}
                            <span>{value}</span>
                        </div>
                    ) : (
                        "Select icon..."
                    )}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
                <Command>
                    <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
                        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                        <input
                            placeholder="Search icons..."
                            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <CommandList>
                        <CommandEmpty>No icon found.</CommandEmpty>
                        <CommandGroup heading="Icons">
                            <ScrollArea className="h-[300px]">
                                <div className="grid grid-cols-4 gap-2 p-2">
                                    {filteredIcons.map((iconName) => {
                                        const Icon = (LucideIcons as any)[iconName];
                                        if (!Icon) return null;
                                        return (
                                            <div
                                                key={iconName}
                                                className={cn(
                                                    "flex flex-col items-center justify-center gap-1 p-2 rounded-md hover:bg-accent cursor-pointer border border-transparent",
                                                    value === iconName ? "bg-accent border-primary" : ""
                                                )}
                                                onClick={() => {
                                                    onChange(iconName);
                                                    setOpen(false);
                                                }}
                                            >
                                                <Icon className="h-6 w-6" />
                                                <span className="text-[10px] truncate w-full text-center" title={iconName}>
                                                    {iconName}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </ScrollArea>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
