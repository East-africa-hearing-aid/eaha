"use client";

import Image from "next/image";
import Link from "next/link";

const services = [
    {
        title: "Advanced Hearing-aids\nAnd Diagnostic Device",
        // Narrow screens can't fit "Advanced Hearing-aids" on one line.
        mobileTitle: "Advanced Hearing-\naids And\nDiagnostic Device",
        description:
            "Our advanced hearing aid portfolio combines cutting-edge technology with expert customization. From discreet in-ear devices to powerful behind-the-ear models, each solution is designed for comfort, clarity, and real-world listening. Features like noise reduction, Bluetooth connectivity, and adaptive sound settings ensure a seamless experience, while our specialists fine-tune every device to each person’s unique hearing needs.",
        highlights: [
            "From discreet in-ear devices to powerful behind-the-ear models,",
            "Features like noise reduction, Bluetooth connectivity, and adaptive sound settings",
        ],
        cta: { label: "View Products", href: "/" },
        images: ["/Images/about/a1.jpg", "/Images/about/path-device.jpg"],
    },
    {
        title: "Speech Therapy",
        description:
            "Our speech therapy helps people communicate more clearly and confidently. We work on speaking, understanding, and listening skills through personalized guidance. Each session is tailored to your progress, with ongoing support to make everyday communication easier and more natural.",
        highlights: [],
        cta: null,
        images: ["/Images/about/speech.jpg", "/Images/about/speech2.jpeg"],
    },
    {
        title: "Hearing Aid Fitting &\nMaintenance",
        description:
            "Our fitting and maintenance process begins with detailed hearing testing and precise device programming to match real listening needs. Each hearing aid is carefully adjusted for clarity, comfort, and natural sound. Through regular followups & checkups, cleaning, and fine tuning, we protect long term performance. With modern tools and skilled specialists, we ensure every device continues to deliver reliable results.",
        highlights: [
            "Through regular followups & checkups, cleaning, and fine tuning, we protect long term performance.",
        ],
        cta: null,
        images: ["/Images/about/hearing.jpg", "/Images/about/hearing2.jpg"],
    },
    {
        title: "Cochlear Implants",
        description:
            "We provide cochlear implant solutions for individuals with severe hearing loss who benefit from advanced auditory technology. Each implant is carefully assessed, surgically placed by specialists, and programmed to match the wearer’s hearing profile. Ongoing follow-up and mapping sessions ensure optimal performance, helping clients reconnect with sounds, speech, and the world around them.",
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
        <section id="services" className="w-full bg-background pt-16 md:pt-24 pb-24 md:pb-32 px-2 md:px-[6.2rem] max-w-[1440px] mx-auto">
            {/* Header — top right */}
            <div className="flex justify-end items-center gap-7 mb-12 md:mb-[3.6rem]">
                <h2 className="font-suisse-medium text-[2rem] md:text-[2.4rem] tracking-[-0.03em] text-[#f2f2f2]">
                    Our Core Services
                </h2>
                <div className="w-3.5 h-[30px] bg-primary shrink-0" />
            </div>

            {/* Service blocks */}
            <div className="flex flex-col max-w-[973px] ml-auto gap-20 md:gap-[5.6rem]">
                {services.map((service, i) => (
                    <div key={i}>
                        {/* Title in a bracket frame */}
                        <div className="relative w-full md:w-max md:min-w-[453px] min-h-[96px] md:min-h-[120px] pl-5 pt-4 md:pl-[1.4rem] md:pt-[0.9rem] pr-6 md:pr-16 pb-5 md:pb-8">
                            <span className="absolute top-0 left-0 size-4 md:size-[18px] border-t border-l border-primary" />
                            <span className="absolute bottom-0 right-0 size-4 md:size-[18px] border-b border-r border-primary" />
                            <h3 className="font-suisse-bold text-[#f2f2f2] text-[1.9rem] md:text-[2.7rem] leading-[1.08] tracking-[-0.035em] whitespace-pre-line">
                                {"mobileTitle" in service && service.mobileTitle ? (
                                    <>
                                        <span className="md:hidden">{service.mobileTitle}</span>
                                        <span className="hidden md:inline">{service.title}</span>
                                    </>
                                ) : (
                                    service.title
                                )}
                            </h3>
                        </div>

                        {/* Description */}
                        <div className="flex flex-col gap-6 md:w-[51%] md:ml-auto mt-6 md:mt-[1.6rem]">
                            <p className={`font-suisse-medium text-sm md:text-[15.4px] leading-[1.39] tracking-[-0.02em] ${service.highlights.length ? "text-[#b7b7b7]" : "text-[#cccccc]"}`}>
                                {renderHighlightedDescription(service.description, service.highlights)}
                            </p>
                            {service.cta && (
                                <div className="flex justify-end">
                                    <Link
                                        href={service.cta.href}
                                        className="inline-flex items-center h-10 px-5 rounded-[0.85rem] border border-primary font-suisse-medium text-[#f2f2f2] text-lg md:text-[20.5px] tracking-[-0.03em] hover:bg-primary transition-colors"
                                    >
                                        {service.cta.label}
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Images row */}
                        <div className="grid grid-cols-2 gap-3 md:gap-[38px] mt-10 md:mt-[2.9rem] md:pl-[23px]">
                            {service.images.map((src, j) => (
                                <div
                                    key={j}
                                    className="relative w-full aspect-[456/415] overflow-hidden bg-white/5"
                                >
                                    <Image
                                        src={src}
                                        alt={`${service.title.replace("\n", " ")} image ${j + 1}`}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 50vw, 460px"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default OurCoreServices;
