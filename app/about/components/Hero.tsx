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
        <section id="about-us" className="w-full bg-background pt-40 md:pt-[12.2rem] pb-16 md:pb-[7.5rem] px-0 md:px-[6rem] max-w-[1440px] mx-auto">
            {/* Heading */}
            <div className="relative w-fit max-w-full mx-auto mb-16 md:mb-[3.9rem] px-4 md:px-[2.3rem] py-1">
                <div className="absolute top-0 right-0 z-10 size-5 md:size-[35px] border-t border-r border-primary" />
                <div className="absolute bottom-0 left-0 z-10 size-5 md:size-[35px] border-b border-l border-primary" />
                <Copy>
                    <h1 className="font-suisse-medium text-right text-[#f2f2f2] text-[1.45rem] md:text-[2.7rem] leading-[1.29] tracking-[-0.03em]">
                        Helping you hear what matters,
                    </h1>
                </Copy>
                <Copy delay={0.2}>
                    <h1 className="font-suisse-medium text-left text-[#f2f2f2] text-[1.45rem] md:text-[2.7rem] leading-[1.29] tracking-[-0.03em]">
                        With simple, dependable hearing care.
                    </h1>
                </Copy>
            </div>

            {/* Image — starts at 70% width centred, expands to full on scroll */}
            <div
                ref={imageWrapRef}
                className="overflow-hidden mx-auto h-[560px] md:h-[807px] relative"
                style={{ width: "70%", borderRadius: "1rem" }}
            >
                <Image
                    src="/Images/bg.jpg"
                    alt="EAHAC clinic"
                    fill
                    className="object-cover grayscale"
                    priority
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 px-6 pb-8 md:pl-[4.3rem] md:pb-[3.9rem] max-w-[600px]">
                    <Copy>
                        <p className="font-suisse-medium text-sm md:text-[16.9px] text-[#cccccc] leading-[1.28] tracking-[-0.02em]">
                            Established in 2018, we have been helping people across Ethiopia hear more clearly and live more fully. From careful testing and precise fitting to long term support and speech therapy, our work is guided by modern technology, skilled professionals, and genuine attention to every person who walks through our doors.
                        </p>
                    </Copy>
                </div>
            </div>
        </section>
    );
};

export default Hero;
