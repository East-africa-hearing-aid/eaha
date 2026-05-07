"use client";

import Copy from "@/components/ui/Copy/Copy";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const imageWrapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = imageWrapRef.current;
        if (!el) return;

        const tween = gsap.fromTo(
            el,
            { width: "70%", borderRadius: "1rem" },
            {
                width: "100%",
                borderRadius: "0rem",
                ease: "none",
                scrollTrigger: {
                    trigger: el,
                    start: "top 80%",
                    end: "center 30%",
                    scrub: 1.5,
                },
            }
        );

        return () => { tween.scrollTrigger?.kill(); };
    }, []);

    return (
        <section className="w-full bg-background pt-28 pb-16 max-w-[1440px] mx-auto">
            {/* Heading */}
            <div className="relative max-w-5xl mx-auto text-center mb-14 md:mb-18">
                <div className="absolute top-0 md:-top-3 -right-2 md:-right-6 z-10 size-4 md:size-8 border-t-2 border-r-2 border-primary" />
                <div className="absolute bottom-0 md:-bottom-3 -left-2 md:-left-6 z-10 size-4 md:size-8 border-b-2 border-l-2 border-primary" />
                <Copy>
                    <h1 className="font-suisse-medium text-right text-white text-xl md:text-5xl leading-snug">
                        Helping you hear what matters,
                    </h1>
                </Copy>
                <Copy delay={0.2}>
                    <h1 className="font-suisse-medium text-left text-white text-xl md:text-5xl leading-snug">
                        With simple, dependable hearing care.
                    </h1>
                </Copy>
            </div>

            {/* Image — starts at 70% width centered, expands to full on scroll */}
            <div
                ref={imageWrapRef}
                className="overflow-hidden mx-auto h-[580px] md:h-[1020px] relative"
                style={{ width: "70%", borderRadius: "1rem" }}
            >
                <Image
                    src="/Images/bg.jpg"
                    alt="EAHAC clinic"
                    fill
                    className="object-cover grayscale"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 md:p-10 max-w-xs md:max-w-xl">
                    <Copy>
                        <p className="font-suisse-light text-sm md:text-base text-white/80 leading-relaxed">
                          East Africa Hearing Aid Center (EAHAC) is a trusted provider of advanced hearing care and rehabilitation services in Addis Ababa. 
                          Established in 2008, we have been helping children and adults across Ethiopia reconnect with sound through personalized care, modern technology, and ongoing support. From comprehensive testing and precise device fitting to long-term care and speech therapy, our work is guided by skilled professionals and a genuine commitment to every individual we serve.
                        </p>
                    </Copy>
                </div>
            </div>
        </section>
    );
};

export default Hero;
