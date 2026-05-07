import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
    title: "About Us | East African Hearing and Speech Center",
    description:
        "Learn about East Africa Hearing and Speech Center — Ethiopia's leading hearing care specialists. Meet our team, explore our services, and discover our global partners in Addis Ababa.",
    openGraph: {
        title: "About Us | East African Hearing and Speech Center",
        description:
            "Learn about East Africa Hearing and Speech Center — Ethiopia's leading hearing care specialists.",
        url: "https://eaha.et/about",
        siteName: "East African Hearing and Speech Center",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "About Us | East African Hearing and Speech Center",
        description:
            "Learn about East Africa Hearing and Speech Center — Ethiopia's leading hearing care specialists.",
    },
};

export default function AboutPage() {
    return <AboutContent />;
}
