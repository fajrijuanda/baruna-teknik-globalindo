const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const content = {
    vision: {
        titleEn: "OUR VISION",
        titleId: "VISI KAMI",
        descriptionEn: "To be the leading industrial solutions provider in Indonesia known for quality, integrity, and innovation.",
        descriptionId: "Menjadi penyedia solusi industri terdepan di Indonesia yang dikenal karena kualitas, integritas, dan inovasi."
    },
    mission: {
        titleEn: "OUR MISSION",
        titleId: "MISI KAMI",
        listEn: [
            "Provide high-quality industrial products with international standards.",
            "Deliver responsive and reliable after-sales service.",
            "Build long-term mutually beneficial partnerships with clients and principals.",
            "Continuously innovate in providing efficient engineering solutions."
        ],
        listId: [
            "Menyediakan produk industri berkualitas tinggi dengan standar internasional.",
            "Memberikan layanan purna jual yang responsif dan dapat diandalkan.",
            "Membangun kemitraan jangka panjang yang saling menguntungkan dengan klien dan prinsipal.",
            "Terus berinovasi dalam memberikan solusi teknik yang efisien."
        ]
    },
    ceo: {
        name: "Nama Direktur",
        roleEn: "President Director",
        roleId: "Direktur Utama",
        titleEn: "Message from the Director",
        titleId: "Pesan dari Direktur Utama",
        subtitleEn: "Leading with Integrity and Innovation",
        subtitleId: "Memimpin dengan Integritas dan Inovasi",
        contentEn: [
            "Welcome to PT Baruna Teknik Globalindo. Since our inception, we have been committed to appearing as more than just a distributor; we are a strategic partner for your industrial success.",
            "In an ever-changing industrial world, reliability and efficiency are key. That is why we focus not only on selling products but also on providing appropriate technical solutions to enhance your operations.",
            "We thank you for the trust you have placed in us. We are committed to continuously improving our service quality and growing together with your business."
        ],
        contentId: [
            "Selamat datang di PT Baruna Teknik Globalindo. Sejak awal berdirinya, kami telah berkomitmen untuk menjadi lebih dari sekadar distributor; kami adalah mitra strategis bagi kesuksesan industri Anda.",
            "Dalam dunia industri yang terus berubah, keandalan dan efisiensi adalah kunci. Itulah sebabnya kami tidak hanya fokus pada penjualan produk, tetapi juga pada memberikan solusi teknis yang tepat guna untuk meningkatkan operasional Anda.",
            "Kami berterima kasih atas kepercayaan yang telah Anda berikan kepada kami. Kami berkomitmen untuk terus meningkatkan kualitas layanan kami dan tumbuh bersama bisnis Anda."
        ],
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800"
    },
    organization: {
        titleEn: "Organizational Structure",
        titleId: "Struktur Organisasi",
        descriptionEn: "Our dedicated team of professionals serving your industrial needs.",
        descriptionId: "Tim profesional kami yang berdedikasi untuk melayani kebutuhan industri Anda.",
        image: ""
    },
    history: {
        titleEn: "Our Journey",
        titleId: "Perjalanan Kami",
        descriptionEn: "Milestones of PT Baruna Teknik Globalindo through the years.",
        descriptionId: "Tonggak pencapaian PT Baruna Teknik Globalindo dari masa ke masa.",
        milestones: [
            {
                year: "2010",
                titleEn: "Company Establishment",
                titleId: "Pendirian Perusahaan",
                descriptionEn: "PT Baruna Teknik Globalindo was officially founded in Jakarta.",
                descriptionId: "PT Baruna Teknik Globalindo resmi didirikan di Jakarta."
            },
            {
                year: "2015",
                titleEn: "National Expansion",
                titleId: "Ekspansi Nasional",
                descriptionEn: "Opened branch offices in Surabaya and Medan to serve clients across Indonesia.",
                descriptionId: "Membuka kantor cabang di Surabaya dan Medan untuk melayani klien di seluruh Indonesia."
            },
            {
                year: "2018",
                titleEn: "Strategic Partnerships",
                titleId: "Kemitraan Strategis",
                descriptionEn: "Became the official distributor for several leading global pump and valve brands.",
                descriptionId: "Menjadi distributor resmi untuk beberapa merek pompa dan valve global terkemuka."
            },
            {
                year: "2023",
                titleEn: "Digital Transformation",
                titleId: "Transformasi Digital",
                descriptionEn: "Launched digital service platforms to enhance customer experience.",
                descriptionId: "Meluncurkan platform layanan digital untuk meningkatkan pengalaman pelanggan."
            }
        ]
    }
};

async function main() {
    try {
        console.log("Seeding About Page Details...");
        await prisma.pageContent.upsert({
            where: {
                page_section: {
                    page: "about",
                    section: "details"
                }
            },
            update: { content },
            create: {
                page: "about",
                section: "details",
                content
            }
        });
        console.log("Success! About Page Details seeded.");
    } catch (e) {
        console.error("Error seeding content:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
