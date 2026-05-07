"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { testimonials, type Testimonial } from "@/data/testimonials";

/* ── Modal ─────────────────────────────────────────────────────────── */
function TestimonialModal({
    item,
    onClose,
}: {
    item: Testimonial;
    onClose: () => void;
}) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const id = requestAnimationFrame(() => setVisible(true));
        return () => cancelAnimationFrame(id);
    }, []);

    const handleClose = () => {
        setVisible(false);
        setTimeout(onClose, 300);
    };

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    return (
        <div
            onClick={handleClose}
            className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-all duration-300
                ${visible ? "bg-black/70 backdrop-blur-sm" : "bg-black/0 backdrop-blur-none"}`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`relative bg-transparent border border-white/10 rounded-3xl overflow-hidden max-w-lg w-full shadow-2xl transition-all duration-300
                    ${visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"}`}
            >
                {/* Close */}
                <button
                    onClick={handleClose}
                    aria-label="Close"
                    className="absolute top-4 right-4 z-10 size-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M1 1l12 12M13 1L1 13" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                </button>

                {/* Avatar + name header — no image */}
                <div className="px-6 pt-8 pb-4 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-white/10 flex items-center justify-center">
                        {item.src ? (
                            <Image src={item.src} alt={item.alt ?? item.name} width={64} height={64} className="object-cover w-full h-full" />
                        ) : (
                            <span className="text-white/60 text-xl font-suisse-medium uppercase">{item.name.charAt(0)}</span>
                        )}
                    </div>
                    <p className="font-suisse-bold text-white text-base leading-snug">{item.name}</p>
                </div>

                <div className="px-6 pb-8">
                    <p className="text-white/80 font-suisse-light text-sm leading-relaxed">&ldquo;{item.text}&rdquo;</p>
                </div>
            </div>
        </div>
    );
}

const avatars = [
    "/Images/Testimonial/1.jpg",
    "/Images/Testimonial/2.jpg",
    "/Images/Testimonial/03.jpg",
    "/Images/Testimonial/afomia.jpg",
    "/Images/Testimonial/tigist.jpg",
    "/Images/Testimonial/kid.jpg",
];

interface CardProps {
    name: string;
    text: string;
    src?: string;
    age?: number;
    blur?: boolean;
    delay?: number;
    onClick?: () => void;
}

function TestimonialCard({ name, text, src, blur, onClick }: CardProps) {
    return (
        <div
            onClick={!blur ? onClick : undefined}
            className={`relative bg-transparent p-4 transition-all duration-300
                ${blur ? "opacity-20 blur-[2px] pointer-events-none select-none" : "cursor-pointer group hover:bg-white/5 rounded-xl"}`}
        >
            {/* Corner brackets */}
            <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-primary" />
            <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-primary" />

            <div className="flex items-center gap-3 mb-3">
                {src ? (
                    <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                            src={src}
                            alt={name}
                            width={56}
                            height={56}
                            className="object-cover w-full h-full"
                        />
                    </div>
                ) : (
                    <div className="w-14 h-14 rounded-full bg-white/10 flex-shrink-0 flex items-center justify-center">
                        <span className="text-white/60 text-sm font-suisse-medium uppercase">
                            {name ? name.charAt(0) : ''}
                        </span>
                    </div>
                )}
            </div>

            <p className="text-white text-sm font-suisse-light leading-relaxed mb-3 line-clamp-3">
                &ldquo;{text}&rdquo;
            </p>

            <p className="text-white/60 text-xs font-suisse-regular">
                {name || 'Anonymous'}
            </p>
        </div>
    );
}

const cardData = [
    { ...testimonials[0]},
    { ...testimonials[13]},
    { ...testimonials[1]},
    { ...testimonials[2]},
    { ...testimonials[11]},
    { ...testimonials[4]},
    { ...testimonials[10]},
    { ...testimonials[12]},
    { ...testimonials[7]},
    // { ...testimonials[11]},
    // { ...testimonials[10]},
];

// Column layout: [col index, row within col, blur]
const layout: { col: number; blur: boolean }[][] = [
    // Row 0
    [
        { col: 0, blur: true },
        { col: 1, blur: false },
        { col: 2, blur: true },
        { col: 3, blur: false },
    ],
    // Row 1
    [
        { col: 0, blur: false },
        { col: 1, blur: true },
        { col: 2, blur: false },
        { col: 3, blur: true },
    ],
    // Row 2
    [
        { col: 0, blur: true },
        { col: 1, blur: false },
        { col: 2, blur: true },
        { col: 3, blur: false },
    ],
];

export default function TestimonialsContent() {
    const heroRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const [selected, setSelected] = useState<Testimonial | null>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Animate the vertical line growing down
        if (lineRef.current) {
            gsap.fromTo(
                lineRef.current,
                { scaleY: 0, transformOrigin: "top center" },
                {
                    scaleY: 1,
                    duration: 1.2,
                    ease: "power2.out",
                    delay: 0.8,
                }
            );
        }

        // Animate hero text
        if (heroRef.current) {
            const els = heroRef.current.querySelectorAll(".hero-anim");
            gsap.fromTo(
                els,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.9,
                    stagger: 0.15,
                    ease: "power3.out",
                    delay: 0.2,
                }
            );
        }

        // Animate cards on scroll
        if (cardsRef.current) {
            const cards = cardsRef.current.querySelectorAll(".testimonial-card");
            cards.forEach((card) => {
                gsap.fromTo(
                    card,
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.7,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 88%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    // Build flat list of cards from layout rows
    const rows = layout.map((row, rowIdx) =>
        row.map((cell, cellIdx) => {
            const cardIdx = rowIdx * 4 + cellIdx;
            const card = cardData[cardIdx % cardData.length];
            return { ...card, blur: cell.blur, key: `${rowIdx}-${cellIdx}` };
        })
    );

    return (
        <main className="min-h-screen bg-black">
            {selected && (
                <TestimonialModal item={selected} onClose={() => setSelected(null)} />
            )}
            {/* ─── Hero ─────────────────────────────────────────────── */}
            <section
                ref={heroRef}
                className="flex flex-col items-center text-center pt-28 pb-0 px-6"
            >
                {/* Avatars row */}
                <div className="hero-anim flex items-center mb-4">
                    <div className="flex -space-x-2">
                        {avatars.map((src, i) => (
                            <div
                                key={i}
                                className="w-9 h-9 rounded-full overflow-hidden border-2 border-black"
                                style={{ zIndex: avatars.length - i }}
                            >
                                <Image
                                    src={src}
                                    alt="patient"
                                    width={36}
                                    height={36}
                                    className="object-cover w-full h-full grayscale"
                                />
                            </div>
                        ))}
                    </div>
                    <p className="ml-4 text-white/50 text-xs font-suisse-light text-left leading-snug max-w-[180px]">
                        From quiet voices to busy streets.<br />
                        Our patients share what they hear now.
                    </p>
                </div>

                {/* Main heading */}
                <h1 className="hero-anim font-suisse-bold text-white text-4xl md:text-6xl lg:text-7xl leading-tight max-w-3xl">
                    Everyday Sounds,<br />Back in Focus!
                </h1>

                {/* Subheading */}
                <p className="hero-anim mt-5 text-white/50 text-sm md:text-base font-suisse-light max-w-lg leading-relaxed">
                    Real people sharing how conversations stopped slipping away.<br />
                    From family talks to phone calls and meetings.<br />
                    No guessing. No pretending. Just hearing what matters.
                </p>

                {/* Vertical connector line */}
                <div className="hero-anim flex flex-col items-center mt-10 mb-0">
                    <div className="w-[2px] h-1 rounded-full bg-white/40" />
                    <div
                        ref={lineRef}
                        className="w-[1px] h-20 bg-white/30 origin-top"
                    />
                    <div className="w-2 h-2 rounded-full bg-white/40" />
                </div>
            </section>

            {/* ─── Scattered cards grid ─────────────────────────────── */}
            <section ref={cardsRef} className="pb-24 pt-8">
                {/* Mobile: single column, non-blurred only */}
                <div className="md:hidden flex flex-col gap-4 px-4">
                    {rows.flat().filter(card => !card.blur).map((card) => (
                        <div key={card.key} className="testimonial-card">
                            <TestimonialCard
                                name={card.name}
                                text={card.text}
                                src={card.src}
                                blur={false}
                                onClick={() => setSelected(card)}
                            />
                        </div>
                    ))}
                </div>

                {/* Desktop: staggered 4-col grid */}
                <div className="hidden md:block px-10">
                {rows.map((row, rowIdx) => (
                    <div
                        key={rowIdx}
                        className="grid grid-cols-4 gap-4 mb-4"
                        style={{
                            marginTop: rowIdx % 2 === 1 ? "2rem" : "0",
                        }}
                    >
                        {row.map((card, colIdx) => {
                            // Stagger vertical offset per column
                            const offsets = [0, 40, 16, 56];
                            const offset = offsets[colIdx % offsets.length];
                            return (
                                <div
                                    key={card.key}
                                    className="testimonial-card"
                                    style={{ marginTop: `${offset}px` }}
                                >
                                    <TestimonialCard
                                        name={card.name}
                                        text={card.text}
                                        src={card.src}
                                        blur={card.blur}
                                        onClick={() => setSelected(card)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                ))}
                </div>
            </section>
        </main>
    );
}
