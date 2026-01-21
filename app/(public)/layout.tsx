import { Navbar } from "@/components/sections/layout/navbar";
import { Footer } from "@/components/sections/layout/footer";
import { WAFloating } from "@/components/shared/wa-floating";
import { BottomNav } from "@/components/sections/layout/bottom-nav";
import { VisitorTracker } from "@/components/visitor-tracker";
import { getPageContent } from "@/lib/actions/content";
import type { ContactContent } from "@/lib/types";

export default async function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const rawContent = await getPageContent("contact", "info");
    const contactContent = rawContent as ContactContent | null;

    return (
        <>
            <VisitorTracker />
            <Navbar />
            <div className="flex flex-col min-h-screen pb-16 md:pb-0">
                <main className="flex-grow">{children}</main>
                <Footer contactContent={contactContent ?? undefined} />
                <WAFloating />
                <BottomNav />
            </div>
        </>
    );
}

