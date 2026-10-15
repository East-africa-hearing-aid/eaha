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

const heroAvatars = [
    "/Images/Testimonial/tigist.jpg",
    "/Images/Testimonial/afomia.jpg",
    "/Images/Testimonial/03.jpg",
];

/* ── Card ──────────────────────────────────────────────────────────── */
const Brackets = ({ size = "w-6 h-6" }: { size?: string }) => (
    <>
        <span className={`absolute top-0 left-0 ${size} border-t border-l border-primary`} />
        <span className={`absolute top-0 right-0 ${size} border-t border-r border-primary`} />
        <span className={`absolute bottom-0 left-0 ${size} border-b border-l border-primary`} />
        <span className={`absolute bottom-0 right-0 ${size} border-b border-r border-primary`} />
    </>
);

const Avatar = ({ item, size }: { item: Testimonial; size: number }) => (
    <div className="rounded-full overflow-hidden flex-shrink-0 bg-white/10 flex items-center justify-center" style={{ width: size, height: size }}>
        {item.src ? (
            <Image src={item.src} alt={item.alt ?? item.name} width={size * 2} height={size * 2} className="object-cover w-full h-full grayscale" />
        ) : (
            <span className="text-white/60 text-sm font-suisse-medium uppercase">{item.name ? item.name.charAt(0) : "·"}</span>
        )}
    </div>
);

function TestimonialCard({ item, blur, onClick }: { item: Testimonial; blur?: boolean; onClick?: () => void }) {
    if (blur) {
        return (
            <div aria-hidden className="w-full blur-[3px] opacity-45 pointer-events-none select-none">
                <Avatar item={item} size={30} />
                <p className="mt-2 text-[#cccccc] text-[10px] font-suisse-medium leading-tight line-clamp-3">{item.text}</p>
                <p className="mt-2 text-[#999] text-[11px] font-suisse-regular">{item.name}</p>
            </div>
        );
    }
    return (
        <button
            type="button"
            onClick={onClick}
            className="group relative block w-full text-left px-[1.15rem] pt-7 pb-3 cursor-pointer"
        >
            <Brackets />
            <Avatar item={item} size={50} />
            <p className="mt-5 text-[#cccccc] group-hover:text-white transition-colors text-base md:text-[16.4px] font-suisse-medium leading-[1.2] tracking-[-0.02em] line-clamp-3">
                {item.text}
            </p>
            <p className="mt-3 pl-1 text-[#999999] text-lg md:text-[18.3px] font-suisse-regular tracking-[-0.02em]">
                -&nbsp; {item.name || "Anonymous"}
            </p>
        </button>
    );
}

/* ── Layout: positions measured from the design (1366px-wide canvas) ── */
type Placed = { x: number; y: number; t: number; blur?: boolean };
const SCATTER: Placed[] = [
    { x: 262, y: 37, t: 5, blur: true },
    { x: 690, y: 27, t: 2 },
    { x: 1210, y: 75, t: 9, blur: true },
    { x: 69, y: 123, t: 10 },
    { x: 775, y: 260, t: 4, blur: true },
    { x: 193, y: 420, t: 6, blur: true },
    { x: 1134, y: 403, t: 8, blur: true },
    { x: 612, y: 414, t: 11 },
    { x: 36, y: 567, t: 0 },
    { x: 655, y: 692, t: 3, blur: true },
    { x: 1148, y: 787, t: 7, blur: true },
    { x: 223, y: 877, t: 12, blur: true },
    { x: 658, y: 868, t: 1 },
];
const unit = (v: number) => `calc(${v} * min(100vw, 1440px) / 1366)`;

export default function TestimonialsContent() {
    const heroRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const [selected, setSelected] = useState<Testimonial | null>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const triggers: ScrollTrigger[] = [];

        if (lineRef.current) {
            gsap.fromTo(
                lineRef.current,
                { scaleY: 0, transformOrigin: "top center" },
                { scaleY: 1, duration: 1.2, ease: "power2.out", delay: 0.8 }
            );
        }

        if (heroRef.current) {
            const els = heroRef.current.querySelectorAll(".hero-anim");
            gsap.fromTo(
                els,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: "power3.out", delay: 0.2 }
            );
        }

        if (cardsRef.current) {
            cardsRef.current.querySelectorAll(".testimonial-card").forEach((card) => {
                const tween = gsap.fromTo(
                    card,
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.7,
                        ease: "power2.out",
                        scrollTrigger: { trigger: card, start: "top 92%", toggleActions: "play none none none" },
                    }
                );
                if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
            });
        }

        return () => { triggers.forEach((t) => t.kill()); };
    }, []);

    const clearCards = SCATTER.filter((c) => !c.blur);

    return (
        <main className="min-h-screen bg-black overflow-hidden">
            {selected && (
                <TestimonialModal item={selected} onClose={() => setSelected(null)} />
            )}

            {/* ─── Hero ─────────────────────────────────────────────── */}
            <section ref={heroRef} className="flex flex-col items-center text-center pt-36 md:pt-[14.8rem] px-6">
                <div className="hero-anim flex items-center gap-5 mb-1">
                    <div className="flex">
                        {heroAvatars.map((src, i) => (
                            <div key={src} className="size-10 rounded-full overflow-hidden" style={{ zIndex: heroAvatars.length - i }}>
                                <Image src={src} alt="" width={80} height={80} className="object-cover w-full h-full grayscale" />
                            </div>
                        ))}
                    </div>
                    <p className="text-[#808080] text-[13px] font-suisse-mono text-left leading-[1.3] tracking-[-0.02em]">
                        From quiet voices to busy streets.<br />
                        Our patients share what they hear now.
                    </p>
                </div>

                <h1 className="hero-anim font-suisse-bold text-white text-[2.8rem] md:text-[4.35rem] leading-[1.1] tracking-[-0.04em]">
                    Everyday Sounds,<br />Back in Focus!
                </h1>

                <p className="hero-anim mt-6 text-[#cccccc] text-sm md:text-[16.9px] font-suisse-medium leading-[1.17] tracking-[-0.02em]">
                    Real people sharing how conversations stopped slipping away.<br />
                    From family talks to phone calls and meetings.<br />
                    No guessing. No pretending. Just hearing what matters.
                </p>

                {/* Vertical connector line with a dot at each end */}
                <div className="hero-anim flex flex-col items-center mt-16">
                    <span className="size-[7px] rounded-full bg-white" />
                    <div ref={lineRef} className="w-px h-[110px] bg-white origin-top" />
                    <span className="size-[7px] rounded-full bg-white" />
                </div>
            </section>

            {/* ─── Scattered cards ──────────────────────────────────── */}
            <section ref={cardsRef} className="pt-16 lg:pt-[5.5rem] pb-24">
                {/* Mobile / tablet: simple list */}
                <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-8 px-6 max-w-3xl mx-auto">
                    {clearCards.map((c) => (
                        <div key={`${c.x}-${c.y}`} className="testimonial-card">
                            <TestimonialCard item={testimonials[c.t]} onClick={() => setSelected(testimonials[c.t])} />
                        </div>
                    ))}
                </div>

                {/* Desktop: scattered canvas */}
                <div className="hidden lg:block relative mx-auto w-full max-w-[1440px]" style={{ height: unit(1080) }}>
                    {SCATTER.map((c) => (
                        <div
                            key={`${c.x}-${c.y}`}
                            className={`absolute ${c.blur ? "" : "testimonial-card"}`}
                            style={{ left: unit(c.x), top: unit(c.y), width: c.blur ? unit(210) : unit(358) }}
                        >
                            <TestimonialCard item={testimonials[c.t]} blur={c.blur} onClick={() => setSelected(testimonials[c.t])} />
                        </div>
                    ))}
                </div>

            </section>
        </main>
    );
}
