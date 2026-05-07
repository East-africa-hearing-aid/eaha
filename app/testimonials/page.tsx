import type { Metadata } from "next";
import TestimonialsContent from "./TestimonialsContent";

export const metadata: Metadata = {
    title: "Patient Testimonials | East Africa Hearing Aid Center",
    description:
        "Hear from real patients at East Africa Hearing Aid Center. Discover how our hearing aids, speech therapy, and audiology care have transformed lives across Ethiopia.",
    openGraph: {
        title: "Patient Testimonials | East Africa Hearing Aid Center",
        description:
            "Hear from real patients at East Africa Hearing Aid Center — stories of rediscovered sound, family moments, and renewed confidence.",
        url: "https://eaha.et/testimonials",
        siteName: "East Africa Hearing Aid Center",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Patient Testimonials | East Africa Hearing Aid Center",
        description:
            "Hear from real patients at East Africa Hearing Aid Center — stories of rediscovered sound, family moments, and renewed confidence.",
    },
};

export default function TestimonialsPage() {
    return <TestimonialsContent />;
}
