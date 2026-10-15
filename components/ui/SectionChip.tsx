import clsx from "clsx";

type ChipTone = "light" | "dark" | "brand";

const toneStyles: Record<ChipTone, { pill: string; dot: string }> = {
    // Grey pill on white sections ("• What We Do", "• FAQ", …)
    light: { pill: "bg-[#c4c4c4] text-white", dot: "bg-white" },
    // Charcoal pill on black sections ("• Our Team")
    dark: { pill: "bg-[#333333] text-white", dot: "bg-white" },
    // Rust pill with orange text ("• Appointment" on the booking page)
    brand: { pill: "bg-[#7a2c16] text-primary", dot: "bg-primary" },
};

interface SectionChipProps {
    children: React.ReactNode;
    tone?: ChipTone;
    className?: string;
}

/** Small rounded label with a leading dot, used above section titles. */
export default function SectionChip({ children, tone = "light", className }: SectionChipProps) {
    const styles = toneStyles[tone];
    return (
        <span
            className={clsx(
                "inline-flex align-top items-center gap-2.5 rounded-lg px-3.5 h-[25px] font-suisse-regular text-[13px] md:text-sm leading-none tracking-tight",
                styles.pill,
                className
            )}
        >
            <span className={clsx("size-[3px] rounded-full shrink-0", styles.dot)} aria-hidden />
            {children}
        </span>
    );
}
