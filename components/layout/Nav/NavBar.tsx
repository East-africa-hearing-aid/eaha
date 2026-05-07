"use client";
import "./Nav.css";
import AudioAnimation from "@/components/ui/AudioAnimation";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import MenuBtn from "../MenuBtn/MenuBtn";

const Nav = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isInitializedRef = useRef(false);

  useLayoutEffect(() => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create(
      "hop",
      "M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1"
    );
  }, []);

  useEffect(() => {
    if (menuRef.current) {
      const menu = menuRef.current;
      const links = menu.querySelectorAll(".link");
      const socialLinks = menu.querySelectorAll(".socials p");

      gsap.set(menu, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      });
      gsap.set(links, { y: 30, opacity: 0 });
      gsap.set(socialLinks, { y: 30, opacity: 0 });
      gsap.set(".header h1 span", {
        y: 500,
        rotateY: 90,
        scale: 0.8,
      });

      isInitializedRef.current = true;
    }
  }, []);

  const animateMenu = useCallback((open: boolean) => {

    if (!menuRef.current) {
      return;
    }
    const menu = menuRef.current;
    const links = menu.querySelectorAll(".link");
    const socialLinks = menu.querySelectorAll(".socials p");

    setIsAnimating(true);

    if (open) {
      gsap.to(menu, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "hop",
        duration: 1.5,
        onStart: () => {
          menu.style.pointerEvents = "all";
        },
        onComplete: () => {
          setIsAnimating(false);
          console.log("Open animation completed");
        },
      });

      gsap.to(links, {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        delay: 0.85,
        duration: 1,
        ease: "power3.out",
      });

      gsap.to(socialLinks, {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        delay: 0.85,
        duration: 1,
        ease: "power3.out",
      });

      gsap.to(".video-wrapper", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "hop",
        duration: 1.5,
        delay: 0.5,
      });

      gsap.to(".header h1 span", {
        rotateY: 0,
        stagger: 0.05,
        delay: 0.75,
        duration: 1.5,
        ease: "power4.out",
      });

      gsap.to(".header h1 span", {
        y: 0,
        scale: 1,
        stagger: 0.05,
        delay: 0.5,
        duration: 1.5,
        ease: "power4.out",
      });
    } else {
      gsap.to(menu, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        ease: "hop",
        duration: 1.5,
        onComplete: () => {
          menu.style.pointerEvents = "none";
          gsap.set(menu, {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          });

          gsap.set(links, { y: 30, opacity: 0 });
          gsap.set(socialLinks, { y: 30, opacity: 0 });
          gsap.set(".header h1 span", {
            y: 500,
            rotateY: 90,
            scale: 0.8,
          });

          setIsAnimating(false);
          console.log("Close animation completed");
        },
      });
    }
  }, []);

  useEffect(() => {
    if (isInitializedRef.current) {
      console.log(`isOpen changed: ${isOpen}`);
      animateMenu(isOpen);
    }
  }, [isOpen, animateMenu]);

  const toggleMenu = useCallback(() => {
    if (!isAnimating) {
      setIsOpen((prevIsOpen) => {
        return !prevIsOpen;
      });
    }
  }, [isAnimating, isOpen]);

  const splitTextIntoSpans = (text: string) => {
    return text
      .split("")
      .map((char, index) =>
        char === " " ? (
          <span key={index}>&nbsp;&nbsp;</span>
        ) : (
          <span key={index}>{char}</span>
        )
      );
  };

  return (
    <div>
      <Link href="/" className="logo z-20">
        <Image src="/Images/logo.png" alt="Logo" width={60} height={60} />
      </Link>

      <MenuBtn isOpen={isOpen} toggleMenu={toggleMenu} />

      <div className="menu flex flex-col lg:flex-row z-20" ref={menuRef}>
        <div className="pt-[10em] px-[2em] pb-[2em] col flex col-1 bg-black relative justify-between h-full items-end flex-col">
          <div className="menu-logo">
            <Image src="/Images/logo.png" alt="Logo" width={60} height={60} />
          </div>
          <div className="links font-suisse-book uppercase mx-auto">
            <div className="link text-center px-1">
              <Link href="/" onClick={() => setIsOpen(!isOpen)}>Home</Link>
              <div className="clippy absolute inset-0 -z-10 pr-2 w-full" />
            </div>
            <div className="link text-center px-1">
              <Link href="#services" onClick={() => setIsOpen(!isOpen)}>Services</Link>
              <div className="clippy absolute inset-0 -z-10 pr-2 w-full" />
            </div>
            <div className="link text-center px-1">
              <Link href="/about" onClick={() => setIsOpen(!isOpen)}>About us</Link>
              <div className="clippy absolute inset-0 -z-10 pr-2 w-full" />
            </div>
            <div className="link text-center px-1">
              <Link href="/testimonials" onClick={() => setIsOpen(!isOpen)}>Testimonials</Link>
              <div className="clippy absolute inset-0 -z-10 pr-2 w-full" />
            </div>
            <div className="link text-center px-1">
              <Link href="/book" onClick={() => setIsOpen(!isOpen)}>Book an Appointment</Link>
              <div className="clippy absolute inset-0 -z-10 pr-2 w-full" />
            </div>
          </div>
          <div className="hidden lg:flex px-4 w-full justify-center items-center rounded-3xl bg-[#1d1d1d]">
            <AudioAnimation />
          </div>
        </div>
        <div className="flex pt-[2em] lg:pt-[10em] px-[2em] pb-[2em] col col-2">
          <div className="socials lg:flex lg:w-1/2 lg:gap-[2em] font-suisse-thin">
            <div className="sub-col">
              <p>East Africa Hearing Aid Center PLC</p>
              <p>Kirkos Subcity Wereda 03, <br /> Lydia Plaza 1st Floor</p>
              <p>(Ethio-China Friendship Road, Wello Sefer)</p>
              <p>P.O.Box 5784, Addis Ababa, Ethiopia</p>
            </div>
            <div className="sub-col flex flex-col">
              <Link className="text-white hover:underline hover:text-primary duration-300 transition-all" target="_blank" href="https://www.instagram.com/eahasc/">Instagram</Link>
              <Link className="text-white hover:underline hover:text-primary duration-300 transition-all" target="_blank" href="https://www.linkedin.com/posts/east-africa-hearing-and-speech-center_eastafrica-eastafricahearingandspeechcenter-activity-7298966821225807872-2kSI/">LinkedIn</Link>
              <Link className="text-white hover:underline hover:text-primary duration-300 transition-all" target="_blank" href="https://web.facebook.com/people/East-Africa-Hearing-and-Speech-Center/61573861297371/">Facebook</Link>
              <Link className="text-white hover:underline hover:text-primary duration-300 transition-all" target="_blank" href="https://www.youtube.com/@EastAfricahearingaidcenterCent/shorts">Youtube</Link>
              <Link className="text-white hover:underline hover:text-primary duration-300 transition-all" target="_blank" href="https://t.me/eahasc">Telegram</Link>
              <br />
              <Link className="text-white" href="tel:+251911523444">+251 911 523 444</Link>
              <Link className="text-white" href="tel:+251912501599">+251 912 501 599</Link>
              <Link className="text-white" href="tel:+251114552580">+251 114 552 580</Link>
            </div>
          </div>

          <div className="hidden lg:flex header text-[3.5rem] md:text-[10rem] 2xl:text-[15rem] absolute bottom-0 font-suisse-book text-primary">
            <h1 className="">{splitTextIntoSpans("EAHAC")}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
