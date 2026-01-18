"use client";

import Image from "next/image";
import { useLanguage } from "@/components/providers/language-provider";

interface ClientProps {
    id: string;
    logoUrl: string;
    name: string;
}

interface ClientsSectionProps {
    clients: ClientProps[];
}

export function Clients({ clients }: ClientsSectionProps) {
    const { t } = useLanguage();

    return (
        <section className="py-20 bg-slate-50 dark:bg-slate-900">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-12 text-slate-800 dark:text-white font-oswald">
                    {t.clients.title}
                </h2>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                    {clients.length > 0 ? (
                        clients.map((client) => (
                            <div key={client.id} className="relative w-32 h-20 md:w-40 md:h-24 transition-opacity hover:opacity-100 dark:invert dark:brightness-200">
                                {/* Added dark mode adjustments for logos if they are black text */}
                                <Image
                                    src={client.logoUrl}
                                    alt={client.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        ))
                    ) : (
                        <div className="text-slate-400 italic py-8 border-2 border-dashed border-slate-200 rounded-lg w-full max-w-2xl mx-auto">
                            No clients or partners added yet.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
