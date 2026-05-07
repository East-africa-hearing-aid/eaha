"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { div } from "three/tsl";

gsap.registerPlugin(ScrollTrigger);

const team = [
    { name: "Full Name", title: "Surgeon",     image: "/Images/team/01.jpg"   },
    { name: "Full Name", title: "Audiologist", image: "/Images/team/02.jpg"   },
    { name: "Full Name", title: "Specialist",  image: "/Images/team/03.jpg"  },
    { name: "Full Name", title: "Therapist",   image: "/Images/team/04.jpg"    },
    { name: "Full Name", title: "Audiometrist",image: "/Images/team/05.jpg"    },
    { name: "Full Name", title: "Consultant",  image: "/Images/team/06.jpg"    },
    { name: "Full Name", title: "Consultant",  image: "/Images/team/07.jpg"    },
    { name: "Full Name", title: "Consultant",  image: "/Images/team/08.jpg"    },
];

// triple the array so each row is always wider than the viewport even with offset
const row = [...team, ...team, ...team];

const PhotoCard = ({ member, idx }: { member: (typeof team)[number]; idx: number }) => (
    <div
        key={idx}
        className="photo-card shrink-0 w-full lg:w-[19.6vw] aspect-square overflow-hidden"
    >
        <Image
            src={member.image}
            alt={member.name}
            width={400}
            height={400}
            className="object-cover w-full h-full grayscale"
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
        <section className="w-full py-20 overflow-hidden max-w-[1440px] mx-auto">
            {/* Header — top right */}
            <div className="flex justify-end items-center gap-2 mb-12">
                <span className="font-suisse-mono text-xl tracking-[0.2em] uppercase text-gray-400">
                    Our Team
                </span>
                <div className="w-3 h-5 bg-primary shrink-0" />
            </div>

            {/* Row 1 — flush left, right-to-left reveal */}
            <div ref={row1Ref} className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-8 mb-3">
                {row.slice(0, 3).map((member, idx) => (
                    <PhotoCard key={`r1-${idx}`} member={member} idx={idx} />
                ))}
            </div>

            {/* Row 2 — offset right, left-to-right reveal */}
            <div
                ref={row2Ref}
                className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-8 mb-3"
            >
                <div className="hidden md:flex"></div>
                {row.slice(3, 6).map((member, idx) => (
                    <PhotoCard key={`r2-${idx}`} member={member} idx={idx} />
                ))}
            </div>

            {/* Row 3 — flush left, right-to-left reveal */}
            <div ref={row3Ref} className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-8 mb-3">
                {row.slice(6, 8).map((member, idx) => (
                    <PhotoCard key={`r3-${idx}`} member={member} idx={idx} />
                ))}
            </div>
        </section>
    );
};

export default OurTeam;
