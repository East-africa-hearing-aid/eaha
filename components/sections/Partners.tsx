import Image from "next/image";

const logos = [
    { name: "MED-EL", src: "/Images/partners/medel.png", h: "h-[30px] md:h-[37px]" },
    { name: "Signia", src: "/Images/partners/signia.png", h: "h-[64px] md:h-[88px]" },
    { name: "Starkey", src: "/Images/partners/starkey.png", h: "h-[64px] md:h-[92px]" },
    { name: "Care", src: "/Images/partners/care.png", h: "h-[36px] md:h-[48px]" },
    { name: "Sivantos", src: "/Images/partners/sivantos.png", h: "h-[42px] md:h-[56px]" },
    { name: "PATH MEDICAL", src: "/Images/partners/path-medical.png", h: "h-[40px] md:h-[52px]" },
];

/** Logo strip that closes the white content block on the home page. */
const Partners = () => (
    <section className="relative z-10 w-full bg-white rounded-b-[2.5rem] md:rounded-b-[6.5rem] px-6 pt-4 pb-20 md:pb-[8.5rem]">
        <h2 className="text-center font-suisse-medium uppercase text-2xl md:text-[2.05rem] tracking-[-0.03em] text-black">
            Our Partners
        </h2>
        {/* Design: the row spans ~76% of the page width (12% margin each side), logos spread evenly */}
        <ul className="mt-10 md:mt-12 mx-auto w-full lg:w-[76%] flex flex-wrap lg:flex-nowrap items-center justify-center lg:justify-between gap-x-10 gap-y-8">
            {logos.map((logo) => (
                <li key={logo.name} className="flex items-center">
                    <Image
                        src={logo.src}
                        alt={logo.name}
                        width={400}
                        height={200}
                        className={`${logo.h} w-auto object-contain`}
                    />
                </li>
            ))}
        </ul>
    </section>
);

export default Partners;
