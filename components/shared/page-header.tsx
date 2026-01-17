import { cn } from "@/lib/utils";

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    className?: string;
}

export function PageHeader({
    title,
    subtitle,
    className,
}: PageHeaderProps) {
    return (
        <section className={cn("relative py-20 md:py-32 bg-slate-900 overflow-hidden", className)}>
            {/* Background Overlay */}
            <div className="absolute inset-0 z-0">
                {/* Abstract Pattern */}

            </div>

            <div className="container relative z-10 mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-white font-oswald mb-6 tracking-wide animate-fade-in-up">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-100">
                        {subtitle}
                    </p>
                )}
            </div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-950 to-transparent z-10" />
        </section>
    );
}
