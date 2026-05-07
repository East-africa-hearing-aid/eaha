"use client"

import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import Copy from "../ui/Copy/Copy";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const slides = [
  {
    title: "Hearing Aid Fitting & Maintenance",
    image: "/Images/services/2.jpg",
    card: {
      desc: `Our qualified speech therapists provide personalized sessions to improve communication skills. Whether it's speech delays, articulation issues, or other communication challenges, we are here to support both children and adults.`,
    },
  },
  {
    title: "Speech Therapy",
    image: "/Images/services/9.jpg",
    card: {
      desc: `Our qualified speech therapists provide personalized sessions to improve communication skills. Whether it's speech delays, articulation issues, or other communication challenges, we are here to support both children and adults.`,
    },
  },
  {
    title: "Hearing Assessment",
    image: "/Images/services/8.jpg",
    card: {
      desc: "We perform comprehensive hearing evaluations using state-of-the-art equipment to accurately measure hearing levels. Based on your results, we recommend the most effective solutions for your needs.",
    },
  },
  {
    title: "Cochlear Implants",
    image: "/Images/services/6.jpg",
    card: {
      desc: "For individuals with severe to profound hearing loss, hearing aids may not be enough. Cochlear implants provide sound perception by directly stimulating the auditory nerve, bypassing damaged areas of the inner ear. While they do not restore natural hearing, they offer the chance to experience and understand sounds more clearly.",
    },
  },
  {
    title: "Follow-up Care",
    image: "/Images/services/7.jpg",
    card: {
      desc: "We believe in long-term support. Our team provides regular follow-up appointments to monitor your progress, adjust your devices, and ensure your therapy or hearing aids continue to perform at their best."
    },
  }
];

export default function WhatWeDo() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const scrollDistance = track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          pin: true,
          scrub: true,
          end: () => `+=${scrollDistance}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      scrollTriggerRef.current = tween.scrollTrigger!;
    });
  }, { scope: sectionRef });

  const scrollByCard = (direction: number) => {
    const st = scrollTriggerRef.current;
    if (!st) return;
    const cardWidth = 620;
    const progress = st.progress;
    const totalScroll = st.end - st.start;
    const step = cardWidth / (trackRef.current?.scrollWidth ?? 1 - window.innerWidth);
    const targetProgress = Math.max(0, Math.min(1, progress + step * direction));
    const targetScroll = st.start + totalScroll * targetProgress;

    gsap.to(window, {
      scrollTo: { y: targetScroll },
      duration: 0.8,
      ease: "power2.inOut",
    });
  };

  return (
    <section ref={sectionRef} className="relative w-full bg-white min-h-screen flex justify-center items-center overflow-hidden">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="px-6 md:px-16 lg:px-20 pt-16 lg:pt-20 pb-8 w-full flex flex-col md:flex-row justify-between items-center">
          <div>
            <p className="font-suisse-mono text-sm tracking-[0.2em] uppercase text-gray-500 mb-3">WHAT WE DO</p>
            <Copy animateOnScroll={true}>
              <h3 className="font-suisse-bold text-3xl md:text-5xl leading-[1] mb-4">
                What You Hear Shapes<br />How You Live
              </h3>
            </Copy>
            <p className="font-suisse-regular text-base md:text-xl text-gray-500">
              We offer personalized hearing care that improves your ability to connect and communicate
            </p>
          </div>
        </div>

        {/* Desktop: horizontal scroll track */}
        <div className="hidden lg:block">
          <div
            ref={trackRef}
            className="flex gap-8 pl-20 pr-10 pb-12 w-max"
          >
            {slides.map((slide, idx) => (
              <div key={idx} className="flex-shrink-0 w-[35rem] snap-start">
                <p className="text-black text- font-suisse-book uppercase pt-2 pb-1">
                  [<span className="text-gray-500">0{idx+1}</span>] {slide.title}
                </p>
                <div className="relative h-[55dvh] overflow-hidden">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    width={550}
                    height={400}
                    className="object-cover absolute bottom-0 left-0 h-full w-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical list */}
        <div className="lg:hidden flex flex-col gap-8 px-4 sm:px-6 pb-12 mt-4">
          {slides.map((slide, idx) => (
            <div key={idx} className="w-full">
              <div className="relative h-[45vh] overflow-hidden">
                <p className="bg-black text-white text-xs font-suisse-book uppercase pt-2 pb-1 px-2 rounded-xl">
                  {slide.title}
                </p>
                <Image
                  src={slide.image}
                  alt={slide.title}
                  width={550}
                  height={400}
                  className="object-cover absolute bottom-0 left-0 h-full w-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
