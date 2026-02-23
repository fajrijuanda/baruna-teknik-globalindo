import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Download, ChevronRight, CheckCircle2 } from "lucide-react";
import { PRODUCT_BRANDS_MENU, SITE_CONFIG } from "@/lib/constants";
import { CLIENTS } from "@/lib/data/static";

// Next.js 15 requires dynamic route params to be treated as a Promise
export default async function BrandDetailPage({
    params,
}: {
    params: Promise<{ category: string; brandSlug: string }>;
}) {
    const resolvedParams = await params;

    // Find Category and Brand
    const categoryData = PRODUCT_BRANDS_MENU.find(c => c.slug === resolvedParams.category);
    if (!categoryData) return notFound();

    const brandData = categoryData.brands.find(b => b.slug === resolvedParams.brandSlug);
    if (!brandData) return notFound();

    // Find Logo if exists in CLIENTS
    const clientData = CLIENTS.find(c => c.name.toLowerCase() === brandData.name.toLowerCase());
    const logoUrl = clientData?.logoUrl || "/images/placeholder.jpg";

    // Format WhatsApp phone number (remove non-digits)
    const waPhone = SITE_CONFIG.phone.replace(/\D/g, "");
    const waMessage = `Halo Baruna Teknik, saya ingin mendapatkan informasi lebih lanjut mengenai produk dari merek ${brandData.name}.`;
    const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(waMessage)}`;

    // Catalog PDF path expectation: /catalogs/[brandSlug].pdf
    const catalogPdfUrl = `/catalogs/${brandData.slug}.pdf`;

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-24">
            {/* Header Area */}
            <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 pt-28 md:pt-36 pb-12">
                <div className="container mx-auto px-4">
                    {/* Breadcrumbs */}
                    <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 mb-8">
                        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-slate-400">Products</span>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-slate-400">{categoryData.category}</span>
                        <ChevronRight className="h-4 w-4" />
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{brandData.name}</span>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                        {/* Logo Container */}
                        <div className="w-full md:w-1/3 max-w-[300px] aspect-video relative bg-white border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex items-center justify-center">
                            <Image
                                src={logoUrl}
                                alt={`${brandData.name} Logo`}
                                fill
                                className="object-contain p-4"
                            />
                        </div>

                        {/* Brand Info */}
                        <div className="w-full md:w-2/3 space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-semibold tracking-wide uppercase">
                                {categoryData.category} Partner
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold font-oswald text-slate-900 dark:text-white tracking-tight">
                                {brandData.name}
                            </h1>
                            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                                Kami adalah penyedia resmi dan terpercaya untuk produk-produk {brandData.name}. Temukan solusi {categoryData.category.toLowerCase()} terbaik untuk kebutuhan industri Anda dengan standar kualitas kelas dunia.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content & Action Area */}
            <div className="container mx-auto px-4 mt-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Main Content Details */}
                    <div className="md:col-span-8 space-y-8">
                        <section className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                            <h2 className="text-2xl font-bold font-oswald text-slate-900 dark:text-white mb-6">Sekilas Tentang Produk</h2>
                            <div className="prose prose-slate dark:prose-invert max-w-none">
                                <p>
                                    {brandData.description || `Produk dari ${brandData.name} dirancang untuk memberikan kinerja optimal dan ketahanan jangka panjang di berbagai aplikasi industri. Dengan teknologi mutakhir, produk ini menjawab tantangan teknis modern dengan efisiensi tinggi.`}
                                </p>

                                <h3 className="text-lg font-semibold mt-6 mb-4">Keunggulan Utama:</h3>
                                <ul className="space-y-3">
                                    {[
                                        "Kualitas material tinggi dan tahan lama.",
                                        "Dirancang sesuai spesifikasi standar industri global.",
                                        "Efisiensi operasional yang mengurangi biaya perawatan.",
                                        "Ketersediaan suku cadang terjamin."
                                    ].map((benefit, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                                            <span className="text-slate-600 dark:text-slate-300">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>
                    </div>

                    {/* Action Cards */}
                    <div className="md:col-span-4 space-y-6">
                        {/* Download Catalog Card */}
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                            <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Download className="h-8 w-8" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Brosur & Katalog</h3>
                            <p className="text-sm text-slate-500 mb-6">Unduh file PDF untuk melihat spesifikasi detail seluruh produk {brandData.name}.</p>
                            <Link
                                href={catalogPdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <button className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-medium transition-colors">
                                    <Download className="h-4 w-4" />
                                    Download Katalog PDF
                                </button>
                            </Link>
                        </div>

                        {/* Contact Card */}
                        <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl p-6 border border-emerald-100 dark:border-emerald-900/50 shadow-sm text-center">
                            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MessageCircle className="h-8 w-8" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Konsultasi Produk</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">Hubungi tim sales kami untuk informasi harga dan ketersediaan stok.</p>
                            <Link
                                href={waUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <button className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-4 rounded-xl font-medium shadow-sm shadow-emerald-200 dark:shadow-none transition-colors">
                                    <MessageCircle className="h-5 w-5" />
                                    Hubungi WhatsApp
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
