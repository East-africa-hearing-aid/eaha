"use client";

import React, { useState } from "react";
import Image from "next/image";

/* ── Partner data ────────────────────────────────────────────────── */
// x / y: offset of each logo from the globe centre on desktop (px, measured from the design).
const partners = [
    {
        name: "MED-EL",
        logo: "/Images/partners/medel-on-black.png",
        logoClass: "h-[44px]",
        x: -60, y: -330,
        description:
            "A global leader in hearing implant technology (like cochlear implants), focused on restoring hearing for people with severe hearing loss.",
    },
    {
        name: "Signia",
        logo: "/Images/partners/signia-on-black.png",
        logoClass: "h-[86px]",
        x: -398, y: 30,
        description:
            "A hearing aid brand of WS Audiology, known for discreet, rechargeable and connected hearing aids.",
    },
    {
        name: "Sivantos",
        logo: "/Images/partners/sivantos-on-black.png",
        logoClass: "h-[54px]",
        x: 423, y: -34,
        description:
            "The hearing company behind Signia, now part of WS Audiology, one of the world's largest hearing aid groups.",
    },
    {
        name: "Starkey",
        logo: "/Images/partners/starkey-on-black.png",
        logoClass: "h-[78px]",
        x: 19, y: 355,
        description:
            "A US-based hearing aid company known for innovative, AI-powered hearing devices and strong focus on health-tech integration.",
    },
    {
        name: "PATH MEDICAL",
        logo: "/Images/partners/path-medical.png",
        logoClass: "h-[46px] rounded-md bg-white p-1.5",
        x: 410, y: 300,
        description:
            "A German medical technology company developing advanced hearing diagnostic devices, including OAE, ABR and audiometry screening for newborns, children and adults.",
    },
];

/* ── Corner-bracket decorator ─────────────────────────────────────── */
const Brackets = () => (
    <>
        <span className="absolute top-0 left-0 w-3.5 h-3.5 border-t border-l border-primary" />
        <span className="absolute top-0 right-0 w-3.5 h-3.5 border-t border-r border-primary" />
        <span className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b border-l border-primary" />
        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b border-r border-primary" />
    </>
);

/* ── Partner card with hover tooltip ──────────────────────────────── */
const PartnerCard = ({
    partner,
    className = "",
    style,
}: {
    partner: (typeof partners)[number];
    className?: string;
    style?: React.CSSProperties;
}) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className={`relative px-4 py-3.5 flex items-center justify-center bg-black ${className}`}
            style={style}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Brackets />
            <Image
                src={partner.logo}
                alt={partner.name}
                width={400}
                height={200}
                className={`object-contain w-auto max-w-[180px] ${partner.logoClass}`}
            />

            {/* Tooltip */}
            <div
                className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-64 px-4 py-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 shadow-xl transition-all duration-200 pointer-events-none z-20 ${hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                    }`}
            >
                <p className="font-suisse-bold text-white text-sm mb-1">{partner.name}</p>
                <p className="font-suisse-light text-gray-300 text-xs leading-relaxed">
                    {partner.description}
                </p>
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 rotate-45 bg-white/10 border-b border-r border-white/10" />
            </div>
        </div>
    );
};

/* ── Globe with a soft glow behind it ─────────────────────────────── */
const Globe = () => (
    <div className="relative w-full h-full">
        <div className="absolute inset-[-18%] rounded-full bg-[radial-gradient(circle,rgba(255,236,200,0.22)_0%,rgba(255,200,140,0.08)_38%,transparent_65%)]" />
        <Image
            src="/Images/glob.png"
            alt="Globe"
            width={500}
            height={500}
            className="relative w-full h-full object-contain"
        />
    </div>
);

/* ── Main section ─────────────────────────────────────────────────── */
const OurPartners = () => {
    return (
        <section className="w-full bg-background py-16 md:pt-0 md:pb-20 px-6 md:px-[7.9rem] max-w-[1440px] mx-auto">
            {/* Header */}
            <div className="flex items-stretch gap-6 mb-16 md:mb-6">
                <div className="w-[13px] bg-primary shrink-0" />
                <h2 className="font-suisse-medium text-[1.9rem] md:text-[2.1rem] leading-[1.13] tracking-[-0.03em]">
                    <span className="text-[#f2f2f2]">Our Partners</span><br />
                    <span className="text-[#b3b3b3]">Around the globe</span>
                </h2>
            </div>

            {/* Globe + logos — desktop radial layout */}
            <div className="hidden md:block relative w-full h-[860px]">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]">
                    <Globe />
                </div>
                {partners.map((partner) => (
                    <PartnerCard
                        key={partner.name}
                        partner={partner}
                        style={{
                            position: "absolute",
                            left: `calc(50% + ${partner.x}px)`,
                            top: `calc(50% + ${partner.y}px)`,
                            transform: "translate(-50%, -50%)",
                        }}
                    />
                ))}
            </div>

            {/* Mobile: globe + grid */}
            <div className="flex flex-col items-center gap-10 md:hidden">
                <div className="w-[280px] h-[280px]">
                    <Globe />
                </div>
                <div className="grid grid-cols-2 gap-6 w-full">
                    {partners.map((partner) => (
                        <PartnerCard key={partner.name} partner={partner} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurPartners;
