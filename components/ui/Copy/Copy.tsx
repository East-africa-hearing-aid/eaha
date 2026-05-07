"use client";
import "./Copy.css";
import React, { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText);

export default function Copy({ children, animateOnScroll = true, delay = 0 }: { children: React.ReactElement, animateOnScroll?: boolean, delay?: number }) {
  const containerRef = useRef<HTMLElement>(null);
  const elementRefs = useRef<Element[]>([]);
  const splitRefs = useRef<SplitText[]>([]);
  const lines = useRef<Element[]>([]);


  useGSAP(
    () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      let observer: IntersectionObserver | null = null;
      let tween: gsap.core.Tween | null = null;

      const initializeSplitText = () => {

        splitRefs.current = [];
        lines.current = [];
        elementRefs.current = [];

        let elements: HTMLElement[] = [];
        if (container.hasAttribute("data-copy-wrapper")) {
          elements = Array.from(container.children) as HTMLElement[];
        } else {
          elements = [container];
        }

        elements.forEach((element) => {
          elementRefs.current.push(element);

          const split = SplitText.create(element, {
            type: "lines",
            mask: "lines",
            linesClass: "line++",
            lineThreshold: 0.1,
          });

          splitRefs.current.push(split);

          const computedStyle = window.getComputedStyle(element);
          const textIndent = computedStyle.textIndent;

          if (textIndent && textIndent !== "0px") {
            if (split.lines.length > 0) {
              (split.lines[0] as HTMLElement).style.paddingLeft = textIndent;
            }
            element.style.textIndent = "0";
          }

          lines.current.push(...split.lines);
        });

        gsap.set(lines.current, { y: "100%" });

        const animationProps = {
          y: "0%",
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          delay: delay,
        };

        const playAnimation = () => {
          if (tween) return;
          tween = gsap.to(lines.current, animationProps);
        };

        if (!animateOnScroll) {
          playAnimation();
          return;
        }

        observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (entry.isIntersecting) {
                playAnimation();
                observer?.disconnect();
                observer = null;
                break;
              }
            }
          },
          { rootMargin: "0px 0px -10% 0px", threshold: 0 }
        );

        observer.observe(container);
      };

      initializeSplitText();

      return () => {
        observer?.disconnect();
        tween?.kill();
        splitRefs.current.forEach((split) => {
          if (split) {
            split.revert();
          }
        });
      };
    },
    { scope: containerRef, dependencies: [animateOnScroll, delay] }
  );

  if (React.Children.count(children) === 1) {
    // @ts-expect-error ref prop type mismatch for cloneElement
    return React.cloneElement(children, { ref: containerRef });
  }

  return (
    <div ref={containerRef as React.RefObject<HTMLDivElement>} data-copy-wrapper="true">
      {children}
    </div>
  );
}
