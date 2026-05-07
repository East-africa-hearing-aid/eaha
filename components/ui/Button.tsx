import React from "react";
import clsx from "clsx";

type Variant = "sm" | "md" | "lg";
type Mode = "default" | "icon" | "iconOnly";

interface ButtonProps {
  children?: React.ReactNode;
  variant?: Variant;
  mode?: Mode;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  "aria-label"?: string;
}

const variantStyles: Record<Variant, string> = {
  sm: "px-6 py-1 text-sm rounded-lg",
  md: "px-8 py-2 text-lg rounded-2xl",
  lg: "px-6 py-3 text-base md:px-10 md:py-4 md:text-xl rounded-xl lg:rounded-3xl",
};

export function Button({
  children,
  variant = "md",
  mode = "default",
  icon,
  onClick,
  className = "",
  type = "button",
  disabled = false,
  "aria-label": ariaLabel,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      className={clsx(
        "relative bg-primary text-white font-suisse-regular active:scale-95 cursor-pointer transition-all duration-300 overflow-hidden group disabled:opacity-60 disabled:cursor-not-allowed",
        variantStyles[variant],
        className
      )}
      onClick={onClick}
    >
      {/* Clip-path reveal overlay — collapses to top edge, sweeps down on hover */}
      <span
        className="absolute inset-0 pointer-events-none z-0 bg-black
          [clip-path:polygon(0_0,100%_0,100%_0,0_0)]
          group-hover:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]
          transition-[clip-path] duration-500 ease-in-out"
      />
      <span className="relative flex items-center justify-center gap-2 z-10">
        {(mode === "icon" || mode === "iconOnly") && icon}
        {mode !== "iconOnly" && children}
      </span>
    </button>
  );
}