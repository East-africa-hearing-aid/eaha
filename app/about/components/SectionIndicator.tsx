"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
    { id: "about-us", label: "About us" },
    { id: "services", label: "Services" },
];

/** Fixed label on the left edge showing which part of the About page is in view. */
export default function SectionIndicator() {
    const [active, setActive] = useState(SECTIONS[0].id);
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            const services = document.getElementById("services");
            if (!services) return;
            const top = services.getBoundingClientRect().top;
            setActive(top < window.innerHeight * 0.5 ? "services" : "about-us");
            // get out of the way once the footer scrolls in
            const footers = document.querySelectorAll("footer");
            const footer = footers[footers.length - 1];
            setHidden(!!footer && footer.getBoundingClientRect().top < window.innerHeight * 0.6);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const goTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <nav aria-label="About page sections" className={`hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 z-20 flex-col gap-0.5 transition-opacity duration-300 ${hidden ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
            {SECTIONS.map((s) => {
                const isActive = active === s.id;
                return (
                    <button
                        key={s.id}
                        type="button"
                        onClick={() => goTo(s.id)}
                        className={`relative text-left font-suisse-medium text-[15.5px] tracking-[-0.02em] cursor-pointer transition-colors ${isActive ? "text-[#b3b3b3]" : "text-[#666] hover:text-[#999]"}`}
                    >
                        <span
                            className={`absolute -left-4 top-1/2 -translate-y-1/2 size-[6px] rounded-full bg-white transition-opacity ${isActive ? "opacity-100" : "opacity-0"}`}
                            aria-hidden
                        />
                        {s.label}
                    </button>
                );
            })}
        </nav>
    );
}
