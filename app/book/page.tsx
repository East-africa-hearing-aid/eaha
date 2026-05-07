import type { Metadata } from "next";
import BookContent from "./BookContent";

export const metadata: Metadata = {
    title: "Book a Visit | East African Hearing and Speech Center",
    description:
        "Schedule an appointment at East Africa Hearing and Speech Center in Addis Ababa. Book a hearing test, hearing aid fitting, speech therapy session, or consultation with our specialists.",
    openGraph: {
        title: "Book a Visit | East African Hearing and Speech Center",
        description:
            "Schedule an appointment at East Africa Hearing and Speech Center in Addis Ababa.",
        url: "https://eaha.et/book",
        siteName: "East African Hearing and Speech Center",
        locale: "en_US",
        type: "website",
    },
};

export default function BookPage() {
    return <BookContent />;
}
