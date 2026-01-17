import { cn } from "@/lib/utils";

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    align?: "left" | "center" | "right";
    className?: string;
}

export function SectionHeader({
    title,
    subtitle,
    align = "center",
    className,
    titleClassName,
    subtitleClassName,
}: SectionHeaderProps & { titleClassName?: string; subtitleClassName?: string }) {
    return (
        <div
            className={cn(
                "flex flex-col gap-2 mb-12",
                {
                    "items-center text-center": align === "center",
                    "items-start text-left": align === "left",
                    "items-end text-right": align === "right",
                },
                className
            )}
        >
            <div className="h-1 w-20 bg-blue-600 rounded-full mb-4" />
            <h2 className={cn("text-3xl md:text-4xl font-bold font-oswald text-slate-900 dark:text-white tracking-tight", titleClassName)}>
                {title}
            </h2>
            {subtitle && (
                <p className={cn("text-muted-foreground max-w-2xl text-lg leading-relaxed", subtitleClassName)}>
                    {subtitle}
                </p>
            )}
        </div>
    );
}
