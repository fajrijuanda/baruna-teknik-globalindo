"use client";

import { useLanguage } from "@/components/providers/language-provider";
import Image from "next/image";

// Dummy Clients Data
const CLIENTS = [
    { name: "Pertamina", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Pertamina_Logo.svg/1200px-Pertamina_Logo.svg.png" },
    { name: "PLN", logo: "https://upload.wikimedia.org/wikipedia/commons/9/97/Logo_PLN.png" },
    { name: "Wika", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Wijaya_Karya_Logo.svg/1200px-Wijaya_Karya_Logo.svg.png" },
    { name: "Adhi Karya", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Adhi_Karya_Logo.svg/2560px-Adhi_Karya_Logo.svg.png" },
    { name: "Pupuk Indonesia", logo: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Logo_Pupuk_Indonesia.png" },
    { name: "Semen Indonesia", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Semen_Indonesia_logo.svg/2560px-Semen_Indonesia_logo.svg.png" },
];

export function Clients() {
    const { t } = useLanguage();

    return (
        <section className="py-16 bg-slate-50 dark:bg-slate-900 overflow-hidden border-y border-slate-200 dark:border-slate-800">
            <div className="container mx-auto px-4 mb-8 text-center">
                <h3 className="text-sm font-bold tracking-widest text-slate-500 uppercase font-oswald mb-4">
                    {t.clients.title}
                </h3>
            </div>

            <div className="relative w-full overflow-hidden">
                {/* Gradients */}
                <div className="absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-white to-transparent dark:from-black dark:to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-white to-transparent dark:from-black dark:to-transparent pointer-events-none" />

                <div className="flex w-max animate-scroll gap-16 pl-4 items-center">
                    {[...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS].map((client, index) => (
                        <div key={`${client.name} -${index} `} className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                            <div className="relative h-16 w-32">
                                <Image
                                    src={client.logo}
                                    alt={client.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
