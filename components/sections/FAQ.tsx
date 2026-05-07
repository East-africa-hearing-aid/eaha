"use client";

import Image from "next/image";
import { useState } from "react";
import Copy from "../ui/Copy/Copy";

export const faqData = [
  {
    question: "How do I know if I have a hearing problem?",
    answer: `You might have a hearing problem if you frequently ask people to repeat themselves, struggle to follow conversations—especially in noisy places—or feel like others are mumbling. You may also turn up the TV volume higher than others prefer. A hearing test is the only way to know for sure.`
  },
  {
    question: "How much do hearing aids cost?",
    answer: `The cost of hearing aids varies depending on technology, features, and brand. Prices typically range from basic to premium depending on what best fits your hearing needs and lifestyle. During your consultation, we'll recommend the most suitable option with transparent pricing.`
  },
  {
    question: "How can hearing aids improve my quality of life?",
    answer: `Hearing aids help you reconnect with people and the world around you. They make conversations clearer, reduce listening effort, improve confidence, and support better mental well-being. Many people report feeling more active, social, and engaged once they start using hearing aids.`
  },
  {
    question: "I think I might have a hearing problem. What should I do?",
    answer: `If you suspect hearing loss, the best next step is to schedule a professional hearing evaluation. It's quick, painless, and will help determine the cause and degree of hearing difficulty. From there, we'll guide you through your options.`
  },
  {
    question: "What are some dangerously loud activities?",
    answer: `Activities such as attending concerts, using power tools, riding motorcycles, working in factories, or listening to loud music through headphones can damage hearing over time. Long exposure to noise above 85 dB can be harmful.`
  },
  {
    question: "What causes hearing loss?",
    answer: `Hearing loss can be caused by aging, long-term noise exposure, ear infections, genetics, certain medications, or sudden loud sounds. In some cases, it may be temporary; in others, it can be permanent.`
  },
  {
    question: "Which professions are at higher risk for hearing loss?",
    answer: `People working in noisy environments face higher risk—such as musicians, construction workers, factory workers, pilots, military personnel, DJs, mechanics, and drivers of loud vehicles or machinery.`
  },
  {
    question: "Will hearing aids restore my hearing?",
    answer: `Hearing aids don't cure hearing loss, but they significantly improve your ability to hear and understand speech. They amplify sounds in a way that matches your unique hearing needs, helping you hear more clearly and naturally.`
  },
  {
    question: "Will I need one or two hearing aids?",
    answer: `If both ears have hearing loss, you'll benefit most from two hearing aids. Using two improves sound clarity, balance, and your ability to locate where sounds come from—similar to how two eyes improve vision depth.`
  },
  {
    question: "Won't hearing aids make me look old?",
    answer: `Modern hearing aids are small, discreet, and designed to blend naturally with your appearance. In fact, untreated hearing loss is often more noticeable than wearing hearing aids.`
  },
  {
    question: "Wouldn't I already know if I had hearing loss?",
    answer: `Not always. Hearing loss often develops gradually, making it hard to notice at first. Many people adjust without realizing it—until conversations become stressful or exhausting. A hearing test is the easiest way to know.`
  }
];

const INITIAL_COUNT = 5;
const STEP = 5;

const FAQ = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const handleToggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  const handleMore = () => {
    setVisibleCount(prev => Math.min(prev + STEP, faqData.length));
  };

  const handleLess = () => {
    setVisibleCount(INITIAL_COUNT);
  };

  const hasMore = visibleCount < faqData.length;
  const hasLess = visibleCount > INITIAL_COUNT;

  return (
    <section className="w-full px-4 lg:px-24 py-16 bg-white rounded-b-[2rem] md:rounded-b-[4rem]">
      <div className="w-full mx-auto px-4 max-w-[1440px]">
        <div className="mb-10">
          <p className="font-suisse-mono text-sm tracking-[0.2em] uppercase text-gray-500 mb-3">FAQ</p>
          <Copy animateOnScroll={true} delay={0.2}>
            <h2 className="font-suisse-bold text-3xl md:text-5xl leading-[1] mb-4">
              Frequently Asked <br />
              <span className="text-[#ff6633]">Questions</span>
            </h2>
          </Copy>
          <p className="font-suisse-regular text-base md:text-xl text-gray-500">
            Everything you need to know about hearing care.
          </p>
        </div>

        <div className="w-full flex items-start justify-center gap-8">
          {/* Image — sticky so it stays centered as the list grows */}
          <div className="max-w-md w-full hidden lg:block self-center">
            <Image
              src="/Images/ear.jpg"
              alt="Ear illustration"
              className="w-full h-auto object-contain"
              width={450}
              height={450}
            />
          </div>

          {/* FAQ list */}
          <div className="md:w-1/2 ml-auto">
            <div className="space-y-2">
              {faqData.slice(0, visibleCount).map((faq, idx) => (
                <div key={idx} className="border-b border-gray-200">
                  <button
                    onClick={() => handleToggle(idx)}
                    aria-expanded={openIdx === idx}
                    className="w-full flex items-center justify-between cursor-pointer py-4 group text-left"
                  >
                    <span
                      className={`text-lg md:text-xl transition-colors duration-200 ${openIdx === idx ? "text-[#ff6633]" : "text-black"
                        } group-hover:text-[#ff6633]`}
                    >
                      {faq.question}
                    </span>

                    <span
                      className={`ml-4 flex-shrink-0 transition-transform duration-300 ${openIdx === idx
                        ? "rotate-45 text-[#ff6633]"
                        : "text-gray-400"
                        }`}
                      aria-hidden
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>

                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${openIdx === idx ? "max-h-[500px] opacity-100 pb-4" : "max-h-0 opacity-0"
                      } text-base text-gray-600 font-suisse-regular`}
                  >
                    {faq.answer.split("\n").map((line, i) => (
                      <div key={i} className="mb-1">{line}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* More / Less buttons */}
            {(hasMore || hasLess) && (
              <div className="mt-8 flex justify-center gap-3">
                {hasMore && (
                  <button
                    onClick={handleMore}
                    className="cursor-pointer px-8 py-2.5 rounded-xl border border-gray-300 bg-white text-black font-suisse-regular text-sm hover:border-gray-400 hover:bg-gray-50 transition-colors"
                  >
                    More
                  </button>
                )}
                {hasLess && (
                  <button
                    onClick={handleLess}
                    className="cursor-pointer px-8 py-2.5 rounded-xl border border-gray-300 bg-white text-black font-suisse-regular text-sm hover:border-gray-400 hover:bg-gray-50 transition-colors"
                  >
                    Less
                  </button>
                )}
              </div>
            )}

            <div className="mt-8 text-lg text-black">
              Still having troubles? Reach out to us{" "}
              <span className="text-[#ff6633]">info@eahac.com</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
