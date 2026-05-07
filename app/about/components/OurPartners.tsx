"use client";

import React, { useState } from "react";
import Image from "next/image";

/* ── Partner data ────────────────────────────────────────────────── */
const partners = [
    {
        name: "MED-EL",
        logo: "/Images/about/med-el.png",
        description:
            "A global leader in hearing implant technology (like cochlear implants), focused on restoring hearing for people with severe hearing loss.",
    },
    {
        name: "WSAudiology",
        logo: "/Images/about/wsa.png",
        description:
            "One of the world's largest hearing aid groups (includes brands like Signia & Widex), providing advanced hearing solutions worldwide.",
    },
    {
        name: "Starkey",
        logo: "/Images/about/starkey.png",
        description:
            "A US-based hearing aid company known for innovative, AI-powered hearing devices and strong focus on health-tech integration.",
    },
];

/* ── Corner-bracket decorator ─────────────────────────────────────── */
const Brackets = () => (
    <>
        <span className="absolute top-0 left-0   w-4 h-4 border-t border-l border-primary/70" />
        <span className="absolute top-0 right-0  w-4 h-4 border-t border-r border-primary/70" />
        <span className="absolute bottom-0 left-0  w-4 h-4 border-b border-l border-primary/70" />
        <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary/70" />
    </>
);

/* ── Partner card with hover tooltip ──────────────────────────────── */
const PartnerCard = ({
    partner,
    className = "",
    style,
}: {
    partner: (typeof partners)[0];
    className?: string;
    style?: React.CSSProperties;
}) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className={`relative px-5 py-4 flex flex-col items-center justify-center gap-1 ${className}`}
            style={style}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Brackets />
            <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={60}
                className="object-contain h-14 w-auto"
            />

            {/* Tooltip */}
            <div
                className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-64 px-4 py-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 shadow-xl transition-all duration-200 pointer-events-none z-20 ${
                    hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
            >
                <p className="font-suisse-bold text-white text-sm mb-1">{partner.name}</p>
                <p className="font-suisse-light text-gray-300 text-xs leading-relaxed">
                    {partner.description}
                </p>
                {/* Arrow */}
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 rotate-45 bg-white/10 border-b border-r border-white/10" />
            </div>
        </div>
    );
};

/* ── Wireframe globe SVG ──────────────────────────────────────────── */
const Globe = () => (
    <Image
        src="/Images/glob.png"
        alt="Globe"
        width={420}
        height={420}
        className="w-full h-full object-contain"
    />
);

/* ── Main section ─────────────────────────────────────────────────── */
const OurPartners = () => {
    return (
        <section className="w-full bg-background py-16 px-6 md:px-16 lg:px-24">
            {/* Header */}
            <div className="flex items-start gap-3 mb-16">
                <div className="w-3 h-10 bg-primary shrink-0 mt-0.5" />
                <div>
                    <h2 className="font-suisse-bold text-white text-lg md:text-xl leading-tight">
                        Our Partners
                    </h2>
                    <p className="font-suisse-regular text-gray-400 text-sm md:text-base">
                        We are the official distributor of world-leading hearing technology
                    </p>
                </div>
            </div>

            {/* Globe + logos — desktop radial layout */}
            <div className="hidden md:flex items-center justify-center relative w-full h-[720px]">
                {/* Globe — perfectly centered */}
                <div className="w-[400px] h-[400px] shrink-0">
                    <Globe />
                </div>

                {/* MED-EL — top */}
                <PartnerCard
                    partner={partners[0]}
                    style={{ position: "absolute", left: "50%", top: "calc(50% - 330px)", transform: "translate(-50%, -50%)" }}
                />

                {/* WSAudiology — lower-right */}
                <PartnerCard
                    partner={partners[1]}
                    style={{ position: "absolute", left: "calc(50% + 394px)", top: "calc(50% + 267px)", transform: "translate(-50%, -50%)" }}
                />

                {/* Starkey — lower-left */}
                <PartnerCard
                    partner={partners[2]}
                    style={{ position: "absolute", left: "calc(50% - 394px)", top: "calc(50% + 167px)", transform: "translate(-50%, -50%)" }}
                />
            </div>

            {/* Mobile: globe + grid */}
            <div className="flex flex-col items-center gap-10 md:hidden">
                <div className="w-[280px] h-[280px]">
                    <Globe />
                </div>
                <div className="grid grid-cols-2 gap-6 w-full">
                    <PartnerCard partner={partners[0]} />
                    <PartnerCard partner={partners[1]} />
                    <PartnerCard partner={partners[2]} className="col-span-2 mx-auto" />
                </div>
            </div>
        </section>
    );
};

export default OurPartners;
