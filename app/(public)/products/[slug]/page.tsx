import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Phone, FileText } from "lucide-react";

// Dummy data lookup (simulated)
const PRODUCTS: Record<string, any> = {
    "ebara-50x40-fsja": {
        id: "1",
        title: "Ebara 50x40 FSJA - Centrifugal Pump",
        category: "Industrial Pump",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop",
        description: "High efficiency centrifugal pump suitable for water supply, industrial water, and irrigation. Known for its reliability and durability in harsh environments.",
        specs: [
            "Capacity: up to 0.4 m3/min",
            "Head: up to 40m",
            "Power: 1.5 kW",
            "Material: Cast Iron",
            "Inlet/Outlet: 50mm / 40mm"
        ]
    },
    "kitz-butterfly-valve-10-inch": {
        id: "2",
        title: "Kitz Butterfly Valve 10 Inch",
        category: "Valve",
        image: "https://plus.unsplash.com/premium_photo-1664303847960-586318f59035?q=80&w=2574&auto=format&fit=crop",
        description: "Durable butterfly valve for flow control in various industrial applications. Easy to install and maintain.",
        specs: [
            "Size: 10 Inch (DN 250)",
            "Pressure Rating: 10K / 150 PSI",
            "Body Material: Ductile Iron",
            "Disc Material: Stainless Steel 304",
            "Seat: EPDM"
        ]
    }
};

export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const product = PRODUCTS[slug];

    if (!product) {
        // In a real app we'd fetch from DB, but for now fallback to a generic placeholder or 404
        // return notFound(); 
        // Fallback for demo
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
                <p>The product with slug "{slug}" needs to be seeded in the database.</p>
                <Button className="mt-4" asChild><a href="/products">Back to Catalog</a></Button>
            </div>
        );
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
                            style={{ backgroundImage: `url(${product.image})` }}
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
                        {product.category}
                    </Badge>

                    <h1 className="font-heading font-bold text-3xl md:text-4xl text-navy-900 mb-6 leading-tight">
                        {product.title}
                    </h1>

                    <div className="prose text-gray-600 mb-8 leading-relaxed">
                        <p>{product.description}</p>
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
