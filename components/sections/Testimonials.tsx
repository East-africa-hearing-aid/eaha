import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/Button";
import Copy from "../ui/Copy/Copy";
import SectionChip from "../ui/SectionChip";
import { testimonials, type Testimonial } from "@/data/testimonials";

const QuoteCard = ({ item }: { item: Testimonial }) => (
    <div className="bg-[#e6e6e6] rounded-[1.75rem] w-full min-h-[240px] lg:h-[264px] px-6 pt-14 pb-12 lg:pt-[3.6rem] lg:pb-[3.4rem] flex flex-col justify-between gap-6">
        <p className="font-suisse-light text-black text-lg lg:text-xl leading-[1.2] tracking-[-0.04em] line-clamp-4 lg:line-clamp-3">
            {item.text}
        </p>
        <p className="font-suisse-bold text-black text-lg lg:text-xl tracking-[-0.02em] pl-2">
            -&nbsp; {item.name}
        </p>
    </div>
);

const Photo = ({ item, className = "" }: { item: Testimonial; className?: string }) => (
    <div className={`relative w-full rounded-[1.75rem] overflow-hidden h-[420px] ${className}`}>
        <Image
            src={item.src!}
            alt={item.alt ?? item.name}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover"
        />
    </div>
);

const Testimonials = () => {
    const left = testimonials[10];
    const middle = testimonials[2];
    const right = testimonials[11];

    return (
        <section className="relative z-20 w-full bg-white overflow-hidden rounded-t-[2.5rem] md:rounded-t-[6.5rem] -mt-24 md:-mt-[8.75rem]">
            <div className="px-6 md:px-16 lg:px-20 pt-16 lg:pt-[5.3rem] pb-10 lg:pb-[5.6rem] flex flex-col md:flex-row justify-between md:items-end gap-8 md:gap-0">
                <div>
                    <SectionChip className="mb-4">Testimonials</SectionChip>
                    <Copy animateOnScroll={true}>
                        <h4 className="font-suisse-regular text-[2rem] md:text-[2.55rem] leading-[1.13] tracking-[-0.04em] mb-2 md:max-w-[500px]">
                            <span className="text-primary">East Africa Hearing and Speech Center</span>{" "}
                            <span className="text-black">has been changing thousands of lives.</span>
                        </h4>
                    </Copy>
                    <p className="font-suisse-regular text-lg md:text-[1.47rem] tracking-[-0.03em] text-[#4d4d4d]">
                        Real time testimonials and data to prove that.
                    </p>
                </div>
                <Link href="/testimonials" className="shrink-0">
                    <Button variant="md" mode="default" className="!rounded-[0.9rem] !px-10 !py-0 h-[46px] !text-[1.375rem] tracking-[-0.03em]">
                        Hear More
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-[18px] px-6 md:px-16 lg:px-20 pb-20 lg:pb-[6.5rem]">
                <div className="flex flex-col gap-5 lg:gap-[22px]">
                    <Photo item={left} className="lg:h-[595px]" />
                    <QuoteCard item={left} />
                </div>
                <div className="flex flex-col-reverse lg:flex-col gap-5 lg:gap-[14px]">
                    <QuoteCard item={middle} />
                    <Photo item={middle} className="lg:h-[605px]" />
                </div>
                <div className="flex flex-col gap-5 lg:gap-[22px]">
                    <Photo item={right} className="lg:h-[595px]" />
                    <QuoteCard item={right} />
                </div>
            </div>
        </section>
    );
}

export default Testimonials;
