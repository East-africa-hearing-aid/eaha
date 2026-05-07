import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/Button";
import Copy from "../ui/Copy/Copy";
import { testimonials } from "@/data/testimonials";

const Testimonials = () => {
    const displayed = testimonials;
    return (
    <section className="w-full bg-white overflow-hidden">
        <div className="mx-auto">
            <div className="px-6 md:px-16 lg:px-20 pt-16 lg:pt-20 pb-10 lg:pb-14 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0">
                <div>
                    <p className="font-suisse-mono text-sm tracking-[0.2em] uppercase text-gray-500 mb-3">TESTIMONIALS</p>
                    <Copy animateOnScroll={true}>
                        <h4 className="font-suisse-bold text-3xl md:text-5xl leading-[1] mb-4 md:max-w-3xl">
                            <span className="text-[#ff6633]">East Africa Hearing aid Center</span>{" "}
                            <span className="text-black">has been changing thousands of lives.</span>
                        </h4>
                    </Copy>
                    <p className="font-suisse-regular text-base md:text-xl text-gray-500">
                        Real time testimonials and data to prove that.
                    </p>
                </div>
                <Link href="/about">
                    <Button variant="lg" mode="default">
                        Hear More
                    </Button>
                </Link>
            </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-6 md:px-16 lg:px-20 pb-16">

            <div className="md:col-span-1 flex flex-col items-center gap-6 h-full">
                <div className="w-full h-full lg:h-[600px] rounded-3xl overflow-hidden">
                    <Image
                        src={displayed[10].src!}
                        alt={displayed[10].alt!}
                        width={400}
                        height={400}
                        className="object-cover w-full h-full"
                    />
                </div>
                <div className="bg-gray-100 rounded-2xl p-6 w-full font-suisse-regular  text-gray-700">
                    <p className="mb-2">{displayed[10].text.slice(0,300)}...</p>
                    <span className="font-suisse-bold text-black">— {displayed[10].name}</span>
                </div>
            </div>
            {/* Center image testimonial */}
            <div className="md:col-span-1 flex flex-col gap-6 h-full">

                <div className="bg-gray-100 rounded-2xl h-max p-6 flex flex-col justify-center font-suisse-regular  text-gray-700">
                    <p className="mb-2">{displayed[2].text}</p>
                    <span className="font-suisse-bold text-black">— {displayed[2].name}</span>
                </div>
                <div className="w-full h-full lg:h-[600px] rounded-3xl overflow-hidden">
                    <Image
                        src={displayed[2].src!}
                        alt={displayed[2].alt!}
                        width={400}
                        height={400}
                        className="object-cover w-full h-full"
                    />
                </div>
            </div>
            {/* Right column: two text testimonials stacked */}
            <div className="md:col-span-1 flex flex-col gap-6 h-full items-center">
                <div className="w-full h-full lg:h-[600px] rounded-3xl overflow-hidden">
                    <Image
                        src={displayed[11].src!}
                        alt={displayed[11].alt!}
                        width={400}
                        height={400}
                        className="object-cover w-full h-full md:h-full"
                    />
                </div>
                <div className="bg-gray-100 rounded-2xl p-6 w-full font-suisse-regular  text-gray-700">
                    <p className="mb-2">{displayed[11].text.slice(0,300)}...</p>
                    <span className="font-suisse-bold text-black">— {displayed[11].name}</span>
                </div>
            </div>
        </div>
    </section >
    );
}

export default Testimonials;