"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const team: { name: string; title: string; image: string }[] = [
    { name: "", title: "", image: "/Images/team/01.jpg" },
    { name: "", title: "", image: "/Images/team/02.jpg" },
    { name: "", title: "", image: "/Images/team/03.jpg" },
    { name: "", title: "", image: "/Images/team/04.jpg" },
    { name: "", title: "", image: "/Images/team/05.jpg" },
    { name: "", title: "", image: "/Images/team/06.jpg" },
    { name: "", title: "", image: "/Images/team/07.jpg" },
    { name: "", title: "", image: "/Images/team/08.jpg" },
];

// triple the array so each row is always wider than the viewport even with offset
const row = [...team, ...team, ...team];

const PhotoCard = ({ member }: { member: (typeof team)[number] }) => (
    <div className="photo-card relative shrink-0 w-full aspect-[259/302] overflow-hidden bg-[#111]">
        <Image
            src={member.image}
            alt={member.name || "EAHAC team member"}
            fill
            sizes="(max-width: 768px) 100vw, 260px"
            className="object-cover grayscale"
        />
    </div>
);

const OurTeam = () => {
    const row1Ref = useRef<HTMLDivElement>(null);
    const row2Ref = useRef<HTMLDivElement>(null);
    const row3Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const configs = [
            { ref: row1Ref, from: "inset(0 0 0 100%)", to: "inset(0 0 0 0%)" },   // right-to-left
            { ref: row2Ref, from: "inset(0 100% 0 0)",  to: "inset(0 0% 0 0)" },   // left-to-right
            { ref: row3Ref, from: "inset(0 0 0 100%)", to: "inset(0 0 0 0%)" },   // right-to-left
        ];

        const triggers: ScrollTrigger[] = [];

        configs.forEach(({ ref, from, to }) => {
            const el = ref.current;
            if (!el) return;
            const cards = el.querySelectorAll<HTMLElement>(".photo-card");

            const tween = gsap.fromTo(
                cards,
                { clipPath: from },
                {
                    clipPath: to,
                    duration: 1,
                    ease: "power2.out",
                    stagger: 0.12,
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    },
                }
            );

            if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
        });

        return () => { triggers.forEach(t => t.kill()); };
    }, []);

    return (
        <section className="w-full pt-10 pb-20 md:pb-[7.6rem] overflow-hidden max-w-[1440px] mx-auto md:px-[6.2rem]">
            {/* Header — top right */}
            <div className="flex justify-end items-center gap-7 mb-10 md:mb-[2.3rem]">
                <h2 className="font-suisse-medium text-[2rem] md:text-[2.4rem] tracking-[-0.03em] text-[#f2f2f2]">
                    Our Team
                </h2>
                <div className="w-3.5 h-[30px] bg-primary shrink-0" />
            </div>

            <div className="mx-auto max-w-[1132px]">
                {/* Row 1 — columns 1-3, right-to-left reveal */}
                <div ref={row1Ref} className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-[31px] mb-3 md:mb-[35px]">
                    {row.slice(0, 3).map((member, idx) => (
                        <PhotoCard key={`r1-${idx}`} member={member} />
                    ))}
                </div>

                {/* Row 2 — columns 2-4, left-to-right reveal */}
                <div ref={row2Ref} className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-[31px] mb-3 md:mb-[35px]">
                    <div className="hidden md:block" />
                    {row.slice(3, 6).map((member, idx) => (
                        <PhotoCard key={`r2-${idx}`} member={member} />
                    ))}
                </div>

                {/* Row 3 — columns 1-2, right-to-left reveal */}
                <div ref={row3Ref} className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-[31px]">
                    {row.slice(6, 8).map((member, idx) => (
                        <PhotoCard key={`r3-${idx}`} member={member} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurTeam;
