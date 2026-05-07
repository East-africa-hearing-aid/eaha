"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const services = [
    {
        title: "Advanced Hearing-\naids",
        description:
            "Our advanced hearing aid services include assessment, fitting, and ongoing support using modern digital technology. We offer a wide range of devices, from discreet in-ear options to powerful behind-the-ear models, all designed for comfort, clarity, and real-world listening. With features like noise reduction, Bluetooth connectivity, and adaptive sound settings, each device is carefully customized and fine-tuned by our specialists to match the individual’s unique hearing needs.",
        highlights: [
            "noise reduction",
            "Bluetooth connectivity, and adaptive sound settings",
            "Features like noise reduction, Bluetooth connectivity",
        ],
        cta: { label: "View Products", href: "/" },
        images: ["/Images/about/a1.jpg", "/Images/about/a2.jpeg"],
    },
    {
        title: "Speech Therapy",
        description:
            "Our speech therapy and rehabilitation programs help individuals communicate more clearly and confidently by focusing on speaking, listening, and comprehension skills. Through personalized sessions tailored to each person’s progress, we provide continuous guidance and auditory training for all ages, making everyday communication more natural, effective, and comfortable.",
        highlights: ["speaking", "listening", "comprehension skills"],
        cta: null,
        images: ["/Images/about/speech.jpg", "/Images/about/speech2.jpeg"],
    },
    {
        title: "Hearing Aid Fitting\n& Maintenance",
        description:
            "Our hearing aid fitting and maintenance services begin with detailed hearing assessments and precise device programming to match real-life listening needs. Each device is carefully adjusted for optimal clarity, comfort, and natural sound, while regular follow-ups, checkups, cleaning, and fine-tuning ensure long-term performance and reliability with the support of skilled specialists and modern tools.",
        highlights: [
            "detailed hearing assessments and precise device programming",
            "Each device is carefully adjusted for optimal clarity, comfort, and natural sound",
            "Through regular followups & checkups, cleaning, and fine tuning, we protect long term performance.",
        ],
        cta: null,
        images: ["/Images/about/hearing.jpg", "/Images/about/hearing2.jpg"],
    },
    {
        title: "Cochlear Implants",
        description:
            "We provide comprehensive cochlear implant solutions for individuals with severe hearing loss, starting with thorough evaluations and continuing through surgical placement by specialists and precise programming tailored to each user. With ongoing follow-up and mapping sessions, we ensure optimal performance and help individuals reconnect with sound, speech, and their surroundings.",
        highlights: [],
        cta: null,
        images: ["/Images/about/cochlear1.jpg", "/Images/about/cochlear2.jpg"],
    },
];

const renderHighlightedDescription = (text: string, highlights: string[]) => {
    if (!highlights.length) {
        return text;
    }

    const sortedHighlights = [...highlights].sort((a, b) => b.length - a.length);
    const segments: Array<{ text: string; highlighted: boolean }> = [];
    let cursor = 0;

    while (cursor < text.length) {
        let matched = false;

        for (const phrase of sortedHighlights) {
            if (text.startsWith(phrase, cursor)) {
                segments.push({ text: phrase, highlighted: true });
                cursor += phrase.length;
                matched = true;
                break;
            }
        }

        if (!matched) {
            let nextHighlightIndex = text.length;

            for (const phrase of sortedHighlights) {
                const idx = text.indexOf(phrase, cursor + 1);
                if (idx !== -1 && idx < nextHighlightIndex) {
                    nextHighlightIndex = idx;
                }
            }

            const plainChunk = text.slice(cursor, nextHighlightIndex);
            segments.push({ text: plainChunk, highlighted: false });
            cursor = nextHighlightIndex;
        }
    }

    return segments.map((segment, index) =>
        segment.highlighted ? (
            <span key={index} className="text-white">
                {segment.text}
            </span>
        ) : (
            <span key={index}>{segment.text}</span>
        )
    );
};

const OurCoreServices = () => {
    return (
        <section className="w-full bg-background py-16 px-6 md:px-16 lg:px-24">
            {/* Header — top right */}
            <div className="flex justify-end items-center gap-3 mb-16">
                <div>
                    <h2 className="font-suisse-bold text-white text-right text-lg md:text-xl leading-tight">
                        Our Services
                    </h2>
                    <p className="font-suisse-regular text-gray-400 text-sm md:text-base">
                        We provide complete hearing solutions across every stage of care
                    </p>
                </div>
                    <div className="w-3 h-10 bg-primary shrink-0 mt-0.5" />
            </div>

            {/* Service blocks */}
            <div className="flex flex-col max-w-6xl ml-auto">
                {services.map((service, i) => (
                    <div
                        key={i}
                        className="pt-12 pb-16"
                    >
                        {/* Title + description row */}
                        <div className="mb-8 items-start">
                            {/* Title col */}
                            <div className="relative pl-4 pt-4 pb-6 md:pb-4">
                                <div className="w-max relative">
                                    {/* top-left bracket */}
                                    <span className="absolute -top-3 -left-6 size-4 md:size-8 border-t-2 border-l-2 border-primary" />
                                    {/* bottom-right bracket */}
                                    <span className="absolute -bottom-3 -right-6 size-4 md:size-8 border-b-2 border-r-2 border-primary" />
                                    <h3 className="font-suisse-bold text-white relative text-3xl md:text-4xl lg:text-5xl leading-tight whitespace-pre-line">
                                        {service.title}
                                    </h3>
                                </div>
                            </div>

                            {/* Description col */}
                            <div className="flex flex-col gap-6 justify-center md:w-[51%] md:ml-auto md:pt-4">
                                <p className="font-suisse-light text-gray-400 text-sm md:text-base leading-relaxed">
                                    {renderHighlightedDescription(service.description, service.highlights)}
                                </p>
                                {service.cta && (
                                    <div className="flex justify-end">
                                        <Link href={service.cta.href}>
                                            <Button variant="md" mode="default" className="bg-transparent border-primary border">
                                                {service.cta.label}
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Images row */}
                        <div className="grid grid-cols-2 gap-3 md:gap-8">
                            {service.images.map((src, j) => (
                                <div
                                    key={j}
                                    className="relative w-full aspect-square overflow-hidden bg-white/5"
                                >
                                    <Image
                                        src={src}
                                        alt={`${service.title} image ${j + 1}`}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 50vw, 40vw"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Why Choose Us ─────────────────────────────────────────── */}
            <div className="max-w-6xl ml-auto mt-8 pt-12 border-t border-white/10">
                <div className="flex items-start gap-3 mb-10">
                    <div className="w-3 h-5 bg-primary shrink-0 mt-0.5" />
                    <h2 className="font-suisse-bold text-white text-lg md:text-xl leading-tight">
                        Why Choose Us
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                    {[
                        "Patient-centered, family-focused care",
                        "Experienced multidisciplinary team",
                        "Advanced diagnostic and rehabilitation services",
                        "Continuous follow-up and long-term support",
                    ].map((item, i) => (
                        <div key={i} className="relative pl-4 py-4 pr-6 w-max">
                            <span className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary/70" />
                            <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary/70" />
                            <p className="font-suisse-regular text-white text-sm md:text-xl font-bold uppercase leading-relaxed">
                                {item}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Start Your Hearing Journey ────────────────────────────── */}
            <div className="max-w-6xl ml-auto mt-20 pb-4">
                <div className="relative pl-4 pt-4 pb-6">
                    <div className="w-max relative">
                        <h3 className="font-suisse-bold text-white text-3xl md:text-4xl lg:text-5xl leading-tight">
                            Start Your Hearing<br />Journey Today
                        </h3>
                    </div>
                </div>
                <div className="md:w-[51%] md:ml-auto mt-6">
                    <p className="font-suisse-light text-gray-400 text-sm md:text-base leading-relaxed">
                        Better hearing begins with the right care. Whether you need a hearing aid, cochlear implant support, or speech therapy, our team is here to help every step of the way.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default OurCoreServices;
