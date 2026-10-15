"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Button } from "../ui/Button";
import Copy from "../ui/Copy/Copy";
import SectionChip from "../ui/SectionChip";

gsap.registerPlugin(ScrollTrigger);

const team = [
  { name: "Full Name", title: "Surgeon", image: "/Images/team/01.jpg" },
  { name: "Full Name", title: "Title", image: "/Images/team/07.jpg" },
  { name: "Full Name", title: "Title", image: "/Images/team/03.jpg" },
  { name: "Full Name", title: "Title", image: "/Images/team/04.jpg" },
  { name: "Full Name", title: "Title", image: "/Images/team/05.jpg" },
  { name: "Full Name", title: "Title", image: "/Images/team/06.jpg" },
  { name: "Full Name", title: "Title", image: "/Images/team/02.jpg" },
  { name: "Full Name", title: "Title", image: "/Images/team/08.jpg" },
];

const TeamCard = ({ member }: { member: (typeof team)[number] }) => (
  <div className="flex flex-col gap-4 w-[29.5vw] max-w-[402px] min-w-[300px] shrink-0">
    <div className="group relative w-full aspect-[402/470] overflow-hidden">
      <Image
        src={member.image}
        alt="EAHAC team member"
        fill
        className="object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-500"
        sizes="30vw"
      />
    </div>
  </div>
);

const TeamSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      const firstSet = setRef.current;
      if (!track || !section || !firstSet) return;

      const gap = parseFloat(getComputedStyle(track).gap) || 24;
      const loopWidth = firstSet.offsetWidth + gap;

      const tween = gsap.to(track, {
        x: -loopWidth,
        ease: "none",
        duration: 25,
        repeat: -1,
      });

      let resetCall: gsap.core.Tween | null = null;

      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          if (resetCall) resetCall.kill();

          const velocity = self.getVelocity();
          const speed = 1 + Math.min(Math.abs(velocity) / 400, 4);
          gsap.to(tween, {
            timeScale: self.direction * speed,
            duration: 0.3,
            overwrite: true,
          });

          resetCall = gsap.delayedCall(0.4, () => {
            gsap.to(tween, {
              timeScale: self.direction,
              duration: 1.2,
              ease: "power2.out",
            });
          });
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative z-10 w-full bg-background text-white overflow-hidden rounded-t-[2.5rem] md:rounded-t-[6.5rem]"
    >
      {/* Header */}
      <div className="px-6 md:px-16 lg:px-20 pt-16 pb-12 lg:pt-[6.6rem] lg:pb-[6.8rem] flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <div>
          <SectionChip tone="dark" className="mb-5">Our Team</SectionChip>
          <Copy animateOnScroll={true}>
            <h2 className="font-suisse-medium text-[2.6rem] md:text-[3.75rem] leading-[1.15] tracking-[-0.035em] mb-3">
              Meet Our<br /><span className="text-[#cccccc]">Medical Team</span>
            </h2>
          </Copy>
          <p className="font-suisse-regular text-lg md:text-[1.44rem] tracking-[-0.03em] text-[#cccccc]">
            Delivering excellence in patient care.
          </p>
        </div>
        <div className="lg:pb-1">
          <Link href="/about">
            <Button variant="md" mode="default" className="!bg-[#6b6b6b] !rounded-[0.9rem] !px-11 !py-0 h-[46px] !text-[1.375rem] tracking-[-0.03em]">
              About us
            </Button>
          </Link>
        </div>
      </div>

      {/* Desktop: infinite marquee */}
      <div className="hidden lg:block pb-[17.5rem]">
        <div ref={trackRef} className="flex gap-[52px]">
          <div ref={setRef} className="flex gap-[52px] shrink-0">
            {team.map((member, idx) => (
              <TeamCard key={idx} member={member} />
            ))}
          </div>
          <div className="flex gap-[52px] shrink-0" aria-hidden>
            {team.map((member, idx) => (
              <TeamCard key={`dup-${idx}`} member={member} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: vertical list */}
      <div className="lg:hidden px-6 md:px-16 pb-32 flex flex-col gap-8">
        {team.map((member, idx) => (
          <div key={idx} className="flex flex-col gap-3">
            <div className="relative w-full aspect-[4/5] rounded-md overflow-hidden bg-neutral-700">
              <Image
                src={member.image}
                alt="EAHAC team member"
                fill
                className="object-cover grayscale"
                sizes="100vw"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
