"use client"
import gsap from "gsap";
import { useEffect } from "react";
import AudioAnimation from "../ui/AudioAnimation";

const Preloader = ({ setShowPreloader }: { setShowPreloader: React.Dispatch<React.SetStateAction<boolean>> }) => {

    useEffect(() => {
        gsap.set(".slider", { width: "100%", height: "10px", clipPath: "inset(0 0 0 0)" });
        gsap.timeline({
            defaults: {
                ease: "power2.inOut",
            }
        }).fromTo(".slider",
            {
                scaleX: 0,
                duration: 7,
            },
            {
                scaleX: 1,
                duration: 7,
            }
        )
            .to(".slider",
                {
                    autoAlpha: 0,
                    duration: 1,
                },
            ).to(".loaderText",
                {
                    autoAlpha: 0,
                    duration: 1,
                },
            )
            .fromTo(".mainWrapper",
                {
                    clipPath: "inset(0 0 0 0)",
                    duration: 1,
                },
                {
                    clipPath: "inset(100% 0 0 0)",
                    duration: 1,
                }
            ).to(".mainWrapper, .slider, .loaderText", {
                display: "none",
                onComplete: () => {
                    setShowPreloader(false);
                }
            })
    }, [])
    return (
        <div className="h-screen w-screen absolute bg-transparent pointer-events-none main-main-preloader">
            <div className="absolute slider origin-left top-0 z-[60] left-0 bg-black will-change-transform" />
            <div className='w-full mainWrapper min-h-screen bg-white flex flex-col items-center justify-center fixed inset-0 pointer-events-none z-50'>
                <div className="flex flex-col justify-center items-center">
                    <AudioAnimation />
                    <p className="text-xl font-bold loaderText">East African Hearing Aid Center</p>
                </div>
            </div>
        </div>
    )
}

export default Preloader;