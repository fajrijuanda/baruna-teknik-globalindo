
import { PAGE_CONTENT } from "@/lib/data/static";
import { ContactContent } from "@/components/sections/contact/contact-content";

export default async function ContactPage() {
    const contactContent = PAGE_CONTENT.contact.info;

    return <ContactContent contactContent={contactContent} />;
}
