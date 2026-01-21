"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/components/providers/language-provider";

interface HeroProps {
    titleEn?: string;
    titleId?: string;
    subtitleEn?: string;
    subtitleId?: string;
    heroImage?: string;
}

export function Hero({ titleEn, titleId, subtitleEn, subtitleId, heroImage }: HeroProps) {
    const { t, language } = useLanguage();

    // Determine content based on language and props
    const title = language === "en" ? (titleEn || t.hero.title) : (titleId || t.hero.title);
    const subtitle = language === "en" ? (subtitleEn || t.hero.subtitle) : (subtitleId || t.hero.subtitle);
    const bgImage = heroImage || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop";

    return (
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950">
            <div className="absolute inset-0 z-0">
                <Image
                    src={bgImage}
                    alt="Industrial Background"
                    fill
                    className="object-cover opacity-60"
                    priority
                    sizes="100vw"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/80 to-slate-950/40 z-10" />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-purple-900/20 z-10 animate-pulse" />

                {/* Abstract Mesh Pattern */}
                <div className="absolute inset-0 opacity-10 z-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            <div className="container relative z-20 px-4 text-center">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="inline-block animate-fade-in-up">
                        <span className="px-4 py-1.5 rounded-full border border-blue-400/30 bg-blue-500/10 text-blue-300 text-sm font-medium backdrop-blur-sm">
                            BARUNA TEKNIK GLOBALINDO
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-none font-oswald animate-slide-up">
                        {title}
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-200 max-w-2xl mx-auto leading-relaxed animate-slide-up-delay-1 whitespace-pre-line">
                        {subtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up-delay-2">
                        <Button
                            size="lg"
                            className="h-14 px-8 text-lg bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-900/50 transition-all hover:scale-105"
                            asChild
                        >
                            <Link href="/contact">
                                {t.hero.ctaPrimary}
                            </Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="h-14 px-8 text-lg border-white/20 bg-white/5 text-white hover:bg-white/10 backdrop-blur-sm transition-all hover:scale-105"
                            asChild
                        >
                            <Link href="/products">
                                {t.hero.ctaSecondary}
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
                <div className="w-1 h-12 rounded-full border-2 border-white/20 flex justify-center p-1">
                    <div className="w-1 h-3 bg-blue-500 rounded-full" />
                </div>
            </div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent z-10" />
        </section>
    );
}
