"use client"
import gsap from 'gsap';
import { useEffect, useState } from 'react';
import Preloader from '../lib/Preloader';
import FindTheRightFitButton from '../ui/FindTheRightFitButton';
import TileShader from '../ui/ShaderPlane';
import FractalGlass from '../ui/glass/FractalGlass';
import Copy from '../ui/Copy/Copy';

const Landing = () => {
  const [loading, setLoading] = useState(true);
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    // Reset states on mount to ensure clean state
    setLoading(true);
    setShowPreloader(true);

    const preloaderShown = sessionStorage.getItem("preloaderShown");

    if (!preloaderShown) {
      setTimeout(() => {
        setLoading(false);
      }, 0);
      gsap
        .timeline()
        .from(".landingText", {
          autoAlpha: 1,
          duration: 5,
          delay: 0.5,
        })
        .eventCallback("onComplete", () => {
          sessionStorage.setItem("preloaderShown", "true");
        });
    } else {
      gsap.to(".main-main-preloader", {
        autoAlpha: 0,
        duration: 1,
        ease: "power2.inOut",
        display: "none",
      });
      setLoading(false);
      setShowPreloader(false);
    }

    // Cleanup function to reset GSAP targets
    return () => {
      gsap.killTweensOf(".landingText");
      gsap.killTweensOf(".main-main-preloader");
    };
  }, []);

  return (
    <div className='relative'>
      {showPreloader && <Preloader setShowPreloader={setShowPreloader} />}
      <FractalGlass key="fractal-glass" className='fixed inset-0 -z-10 h-[105dvh] md:h-[118dvh] overflow-hidden' />

      <div className='w-screen h-[110dvh] flex flex-col justify-end items-center bg-transparent gap-y-6 py-28 relative z-0'>
        <h1 className='sr-only'>Rediscover The Beauty of Hearing</h1>
        <p className='sr-only'>One wave, one frequency, one life at a time.</p>

        <Copy animateOnScroll={true} delay={0.2} key="landing-copy">
          <h1 className='landingText font-suisse-book text-center text-white text-[3rem] leading-[1] md:text-7xl'>Rediscover <br /> The Beauty of Hearing</h1>
        </Copy>

        <p className='font-suisse-mono text-white text-sm px-6 md:text-xl text-center'>One wave, one frequency, one life at a time.</p>
        <FindTheRightFitButton />
      </div>
    </div>
  )
}

export default Landing