import { Navbar } from "@/components/sections/layout/navbar";
import { Footer } from "@/components/sections/layout/footer";
import { WAFloating } from "@/components/shared/wa-floating";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
            <WAFloating />
        </div>
    );
}
