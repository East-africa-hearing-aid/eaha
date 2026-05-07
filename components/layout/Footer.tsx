"use client";

import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef } from "react";
import FractalGlass from "../ui/glass/FractalGlass";

const NAV_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/#services" },
  { label: "Testimonial", href: "/testimonials" },
  { label: "Book a visit/call", href: "/book" },
];

const SOCIALS = [
  {
    label: "Instagram",
    url: "https://www.instagram.com/eahasc/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/posts/east-africa-hearing-and-speech-center_eastafrica-eastafricahearingandspeechcenter-activity-7298966821225807872-2kSI/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    url: "https://web.facebook.com/people/East-Africa-Hearing-and-Speech-Center/61573861297371/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    url: "https://www.youtube.com/@EastAfricahearingaidcenterCent/shorts",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];


// ── Footer ───────────────────────────────────────────────────────────────────
const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const shaderMountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ft-nav a", {
        y: 32, opacity: 0, duration: 1, stagger: 0.07, ease: "power3.out", delay: 0.1,
      });
      gsap.from(".ft-contact, .ft-social", {
        y: 24, opacity: 0, duration: 1, stagger: 0.12, ease: "power3.out", delay: 0.2,
      });
      gsap.from(".ft-copy", {
        opacity: 0, duration: 1, ease: "power2.out", delay: 0.8,
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-[95%] mx-auto overflow-hidden min-h-[70vh] bg-white rounded-[2rem] lg:rounded-[4rem] mb-6 flex flex-col"
    >

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1 pt-14 pb-4 max-w-[1440px] mx-auto w-full">

        {/* ── Top section ── */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 flex-1 mt-16 px-6">

          {/* Menu */}
          <nav className="ft-nav flex flex-col gap-4">
            <p className="font-suisse-bold text-black mb-2">Menu</p>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-black/50 hover:text-black font-suisse-regular leading-tight transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Reach */}
          <div className=" flex flex-col gap-2">
            <p className="font-suisse-bold text-black mb-2">Reach</p>
            <p className="font-suisse-regular text-black/50">+251 911 523 444</p>
            <p className="font-suisse-regular text-black/50">+251 912 501 599</p>
            <p className="font-suisse-regular text-black/50">+251 114 552 580</p>
            <p className="font-suisse-regular text-sm text-black/50 max-w-[220px] mt-2">
              Kirkos Subcity Wereda 03,<br />
              Lydia Plaza 1st Floor<br />
              (Ethio-China Friendship Road, Wello Sefer)<br />
              P.O.Box 5784, Addis Ababa, Ethiopia
            </p>
          </div>

          {/* Social Media */}
          <div className="ft-social">
            <p className="font-suisse-bold text-sm text-black mb-4">Social Media</p>
            <div className="flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black/60 hover:text-black transition-colors duration-200"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <p className="ft-copy font-suisse-regular text-black/30 text-sm text-left leading-relaxed">
            © {new Date().getFullYear()} EAHAC.<br className="hidden sm:block" /> ALL RIGHTS RESERVED.<br />Powered by <span className="text-black/50">Gezat Communications</span>
          </p>
        </div>

        {/* ── Bottom section ── */}
        <div className="mt-8">
          {/* Shader text effect */}
          <div className="relative w-full overflow-hidden rounded-2xl">
            {/* Shader layer */}
            <div className="absolute right-0">
              <FractalGlass showRefraction={false} quality={0.6} className="w-full h-full" />
            </div>
            {/* White mask with black text — screen blend makes black = shader, white = white */}
            <div
              className="relative flex items-center justify-center bg-white mix-blend-screen select-none pointer-events-none"
            >
              <h2
                className="ft-brand font-suisse-bold leading-none text-black text-7xl md:text-9xl lg:text-[15rem] 2xl:text-[25rem]"
              >
                EAHAC
              </h2>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
