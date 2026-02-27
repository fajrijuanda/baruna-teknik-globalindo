import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Download, ChevronRight, CheckCircle2 } from "lucide-react";
import { PRODUCT_BRANDS_MENU, SITE_CONFIG } from "@/lib/constants";
import { CLIENTS } from "@/lib/data/static";
import { BrandImageCarousel } from "@/components/shared/brand-image-carousel";

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

    // Brand product images for carousel
    const brandImages = brandData.images || [];

    // Format WhatsApp phone number (remove non-digits)
    const waPhone = SITE_CONFIG.phone.replace(/\D/g, "");
    const waMessage = `Halo Baruna Teknik, saya ingin mendapatkan informasi lebih lanjut mengenai produk dari merek ${brandData.name}.`;
    const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(waMessage)}`;

    // Get catalogs from brand data
    const catalogs = brandData.catalogs || [];

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-24">
            {/* Header Area using Dark Theme for Navbar sync */}
            <div className="relative bg-slate-900 overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-400 via-slate-900 to-slate-900"></div>

                <div className="container relative z-10 mx-auto px-4">
                    {/* Breadcrumbs */}
                    <div className="flex flex-wrap items-center gap-2 text-sm text-slate-300 mb-8 md:mb-12">
                        <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
                        <ChevronRight className="h-4 w-4 text-slate-500" />
                        <Link href="/products" className="hover:text-white transition-colors text-slate-400">Produk</Link>
                        <ChevronRight className="h-4 w-4 text-slate-500" />
                        <Link href={`/products?category=${categoryData.slug}`} className="hover:text-white transition-colors text-slate-400">{categoryData.category}</Link>
                        <ChevronRight className="h-4 w-4 text-slate-500" />
                        <span className="font-semibold text-white">{brandData.name}</span>
                    </div>

                    <div className="flex flex-col md:flex-row gap-10 items-stretch">
                        {/* Logo/Carousel Container */}
                        <div className="w-full md:w-[320px] shrink-0">
                            {brandImages.length > 0 ? (
                                <BrandImageCarousel
                                    images={brandImages}
                                    brandName={brandData.name}
                                />
                            ) : (
                                <div className="aspect-[4/3] relative bg-white rounded-2xl p-8 shadow-xl flex items-center justify-center">
                                    <Image
                                        src={logoUrl}
                                        alt={`${brandData.name} Logo`}
                                        fill
                                        className="object-contain p-6"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Brand Info */}
                        <div className="flex-1 flex flex-col justify-center space-y-5">
                            <div>
                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold tracking-wide uppercase mb-4">
                                    {categoryData.category} Partner
                                </span>
                                <h1 className="text-4xl md:text-6xl font-bold font-oswald text-white tracking-tight mb-4">
                                    {brandData.name}
                                </h1>
                                <p className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed">
                                    Kami adalah penyedia resmi dan terpercaya untuk produk-produk {brandData.name}. Temukan solusi {categoryData.category.toLowerCase()} terbaik untuk kebutuhan industri Anda dengan standar kualitas kelas dunia.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Fade */}
                <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent z-10" />
            </div>

            {/* Content & Action Area */}
            <div className="container relative z-20 mx-auto px-4 -mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Main Content Details */}
                    <div className="lg:col-span-2">
                        <section className="bg-white dark:bg-slate-900 rounded-2xl p-8 md:p-10 border border-slate-200 dark:border-slate-800 shadow-sm h-full">
                            <h2 className="text-2xl font-bold font-oswald text-slate-900 dark:text-white mb-6">Sekilas Tentang Produk</h2>
                            <div className="prose prose-slate dark:prose-invert max-w-none">
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                                    {brandData.description || `Produk dari ${brandData.name} dirancang untuk memberikan kinerja optimal dan ketahanan jangka panjang di berbagai aplikasi industri. Dengan teknologi mutakhir, produk ini menjawab tantangan teknis modern dengan efisiensi tinggi.`}
                                </p>

                                <h3 className="text-xl font-semibold mt-10 mb-6 text-slate-900 dark:text-white border-b pb-4">Keunggulan Utama:</h3>
                                <ul className="space-y-4">
                                    {[
                                        "Kualitas material tinggi dan tahan lama.",
                                        "Dirancang sesuai spesifikasi standar industri global.",
                                        "Efisiensi operasional yang mengurangi biaya perawatan.",
                                        "Ketersediaan suku cadang terjamin."
                                    ].map((benefit, i) => (
                                        <li key={i} className="flex items-start gap-4">
                                            <div className="bg-emerald-100 dark:bg-emerald-900/40 p-1 rounded-full shrink-0 mt-0.5">
                                                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                            </div>
                                            <span className="text-slate-700 dark:text-slate-300 font-medium">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>
                    </div>

                    {/* Action Cards Sidebar */}
                    <div className="lg:col-span-1 flex flex-col gap-6">
                        {/* Download Catalog Card */}
                        {catalogs.length > 0 && (
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
                                    <Download className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Brosur & Katalog</h3>
                                <p className="text-sm text-slate-500 mb-6 px-4">
                                    Unduh file PDF untuk melihat spesifikasi detail produk {brandData.name}.
                                </p>
                                <div className="space-y-3">
                                    {catalogs.map((catalog, i) => (
                                        <Link
                                            key={i}
                                            href={catalog.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block"
                                        >
                                            <button className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white py-3.5 px-4 rounded-xl font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5 text-sm">
                                                <Download className="h-4 w-4 shrink-0" />
                                                {catalog.name}
                                            </button>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Contact Card */}
                        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/40 dark:to-slate-900 rounded-2xl p-8 border border-emerald-200/60 dark:border-emerald-900/50 shadow-sm text-center">
                            <div className="w-16 h-16 bg-emerald-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md shadow-emerald-200 dark:shadow-none transform -rotate-3">
                                <MessageCircle className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Konsultasi Penjualan</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-8 px-4">Hubungi tim sales kami untuk informasi harga terbaru dan ketersediaan stok.</p>
                            <Link
                                href={waUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                            >
                                <button className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white py-4 px-4 rounded-xl font-semibold shadow-emerald-500/20 shadow-lg transition-all hover:-translate-y-0.5">
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
