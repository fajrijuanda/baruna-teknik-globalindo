
import { getPageContent } from "@/lib/actions/content";
import { ContactContent } from "@/components/sections/contact/contact-content";

export default async function ContactPage() {
    const contactContent = await getPageContent("contact", "info");

    return <ContactContent contactContent={contactContent} />;
}
