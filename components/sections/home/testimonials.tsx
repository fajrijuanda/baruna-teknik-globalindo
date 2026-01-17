"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SectionHeader } from "@/components/shared/section-header";
import { Quote } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";

const TESTIMONIALS = [
    {
        content: "PT Baruna Teknik Globalindo has been our go-to supplier for industrial pumps for over 5 years. Their technical support and after-sales service are unmatched.",
        author: "Budi Santoso",
        role: "Plant Manager",
        company: "PT Petrokimia Gresik",
        avatar: "BS"
    },
    {
        content: "Excellent quality valves and quick delivery. They really understand the urgency of industrial operations. Highly recommended!",
        author: "Dewi Ratnasari",
        role: "Procurement Head",
        company: "PT Unilever Indonesia",
        avatar: "DR"
    },
    {
        content: "The engineering team at Baruna Teknik provided us with a custom solution that significantly improved our production efficiency.",
        author: "Hendra Wijaya",
        role: "Chief Engineer",
        company: "PT Indofood CBP",
        avatar: "HW"
    },
];

export function Testimonials() {
    const { t } = useLanguage();

    return (
        <section className="py-24 bg-white dark:bg-black">
            <div className="container mx-auto px-4">
                <SectionHeader
                    title={t.testimonials.title}
                    subtitle={t.testimonials.subtitle}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
                    {TESTIMONIALS.map((testimonial, index) => (
                        <Card key={index} className="bg-white dark:bg-slate-800 border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CardContent className="p-8">
                                <Quote className="h-10 w-10 text-blue-500/20 mb-6" />
                                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed italic">
                                    &quot;{testimonial.content}&quot;
                                </p>
                                <div className="flex items-center gap-4">
                                    <Avatar>
                                        <AvatarFallback className="bg-blue-600 text-white font-bold">{testimonial.avatar}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white font-oswald">{testimonial.author}</h4>
                                        <p className="text-sm text-slate-500">{testimonial.role}</p>
                                        <p className="text-xs text-blue-600 font-medium">{testimonial.company}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
