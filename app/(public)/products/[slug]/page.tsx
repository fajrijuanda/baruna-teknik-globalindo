import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Phone, FileText } from "lucide-react";

import { PRODUCTS } from "@/lib/data/static";

export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const product = PRODUCTS.find((p) => p.slug === slug);

    if (!product) {
        return notFound();
    }

    return (
        <div className="container mx-auto px-4 md:px-6 py-12">
            <Breadcrumbs />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Image Gallery (Simplified) */}
                <div className="space-y-4">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                        <div
                            className="w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-500"
                            style={{ backgroundImage: `url(${product.images?.[0]?.url})` }}
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="aspect-square rounded-lg bg-gray-100 border cursor-pointer hover:border-red-600 transition-colors" />
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col">
                    <Badge className="w-fit mb-4 bg-red-100 text-red-600 hover:bg-red-200 border-none px-3 py-1 text-xs uppercase tracking-wider font-bold">
                        {product.category.name.en}
                    </Badge>

                    <h1 className="font-heading font-bold text-3xl md:text-4xl text-navy-900 mb-6 leading-tight">
                        {product.title.en}
                    </h1>

                    <div className="prose text-gray-600 mb-8 leading-relaxed">
                        <p>{product.description.en}</p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 mb-8">
                        <h3 className="font-heading font-bold text-lg mb-4 text-navy-900 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-red-600" />
                            Technical Specifications
                        </h3>
                        <ul className="space-y-3">
                            {product.specs.map((spec: string, i: number) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <span>{spec}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-auto flex flex-col sm:flex-row gap-4">
                        <Button size="lg" className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold h-14 uppercase tracking-wide text-lg gap-2">
                            <Phone className="w-5 h-5" />
                            Request Quote
                        </Button>
                        <Button size="lg" variant="outline" className="flex-1 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white font-bold h-14 uppercase tracking-wide text-lg">
                            Download Datasheet
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
