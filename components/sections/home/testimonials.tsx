"use client";

import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/components/providers/language-provider";

interface Testimonial {
    id: string;
    personName: string;
    personRole: string;
    content: any;
    rating: number;
    client: {
        name: string;
        logoUrl: string;
    };
}

interface TestimonialsProps {
    content?: {
        titleEn?: string;
        titleId?: string;
        subtitleEn?: string;
        subtitleId?: string;
    };
    testimonials: Testimonial[];
}

export function Testimonials({ content, testimonials }: TestimonialsProps) {
    const { language, t } = useLanguage();
    const isId = language === "id";

    const title = isId ? (content?.titleId || t.testimonials.title) : (content?.titleEn || t.testimonials.title);

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-slate-800 font-oswald">
                    {title}
                </h2>
                <div className="flex flex-wrap justify-center gap-8">
                    {testimonials.map((t) => (
                        <Card key={t.id} className="bg-slate-50 border-none shadow-sm hover:shadow-md transition-shadow w-full md:w-[350px] lg:w-[400px] flex flex-col">
                            <CardContent className="pt-6 flex-1 flex flex-col">
                                <Quote className="h-8 w-8 text-blue-500 mb-4 opacity-50 mx-auto" />
                                <div className="flex-1 flex items-center justify-center">
                                    <p className="text-slate-600 mb-6 italic text-center text-lg leading-relaxed">
                                        &quot;{isId ? t.content.id : t.content.en}&quot;
                                    </p>
                                </div>
                                <div className="flex flex-col items-center gap-2 mt-auto pt-4 border-t border-slate-100">
                                    <Avatar className="h-16 w-16 mb-2">
                                        <AvatarImage src={t.client.logoUrl} alt={t.client.name} className="object-cover" />
                                        <AvatarFallback className="bg-blue-100 text-blue-700 text-xl font-bold">
                                            {t.personName.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="text-center">
                                        <p className="font-bold text-slate-900 text-lg">{t.personName}</p>
                                        <p className="text-sm text-slate-500 font-medium">{t.personRole}</p>
                                        <p className="text-xs text-blue-600 font-bold mt-1 uppercase tracking-wider">{t.client.name}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    {testimonials.length === 0 && (
                        <div className="w-full text-center py-12 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                            <p className="text-slate-400 italic">No testimonials available at the moment.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
