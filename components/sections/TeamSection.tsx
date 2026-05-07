"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Button } from "../ui/Button";
import Copy from "../ui/Copy/Copy";

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
  <div className="flex flex-col gap-4 w-[25vw] min-w-[300px] shrink-0">
    <div className="relative w-full aspect-[4/5] overflow-hidden">
      <Image
        src={member.image}
        alt={member.name}
        fill
        className="object-cover"
        sizes="25vw"
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
      className="w-full bg-background text-white overflow-hidden"
    >
      {/* Header */}
      <div className="px-6 md:px-16 lg:px-20 pt-16 pb-10 lg:pt-20 lg:pb-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <div>
          <Copy animateOnScroll={true}>
            <h2 className="font-suisse-bold text-3xl md:text-5xl leading-[1] mb-4">
              Our Team
            </h2>
          </Copy>
          <p className="font-suisse-regular text-base md:text-xl text-gray-400">
            Delivering excellence in patient care.
          </p>
        </div>
        <div className="lg:pb-1">
          <Link href="/about">
            <Button variant="lg" mode="default">
              Learn More
            </Button>
          </Link>
        </div>
      </div>

      {/* Desktop: infinite marquee */}
      <div className="hidden lg:block pb-20">
        <div ref={trackRef} className="flex gap-6">
          <div ref={setRef} className="flex gap-6 shrink-0">
            {team.map((member, idx) => (
              <TeamCard key={idx} member={member} />
            ))}
          </div>
          <div className="flex gap-6 shrink-0">
            {team.map((member, idx) => (
              <TeamCard key={`dup-${idx}`} member={member} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: vertical list */}
      <div className="lg:hidden px-6 md:px-16 pb-16 flex flex-col gap-8">
        {team.map((member, idx) => (
          <div key={idx} className="flex flex-col gap-3">
            <div className="relative w-full aspect-[4/5] rounded-md overflow-hidden bg-neutral-700">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover"
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
