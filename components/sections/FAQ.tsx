"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import Copy from "../ui/Copy/Copy";
import SectionChip from "../ui/SectionChip";

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

const BracketButton = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="relative cursor-pointer px-5 h-[37px] leading-none font-suisse-regular text-[1.34rem] tracking-[-0.03em] text-black hover:text-primary transition-colors"
  >
    <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary" />
    <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary" />
    <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary" />
    <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary" />
    {label}
  </button>
);

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
    <section className="w-full bg-white">
      {/* Full width with the same side padding as the other home sections. */}
      <div className="w-full px-6 md:px-16 lg:px-20 pt-16 lg:pt-28 pb-16 lg:pb-24">
        <div className="mb-10 lg:mb-[50px]">
          <SectionChip className="mb-5">FAQ</SectionChip>
          <Copy animateOnScroll={true} delay={0.2}>
            <h2 className="font-suisse-regular uppercase text-[2rem] md:text-[2.55rem] leading-[1.13] tracking-[-0.045em]">
              Frequently <br />
              Asked Questions
            </h2>
          </Copy>
        </div>

        <div className="w-full flex items-start">
          {/* Ear column: 46% of the width; the ear is centred in it and vertically against the question list */}
          <div className="hidden lg:flex w-[46%] shrink-0 self-center justify-center pr-8">
            <Image
              src="/Images/home/ear.png"
              alt="Ear illustration"
              className="w-[52%] max-w-[420px] h-auto object-contain drop-shadow-[0_40px_30px_rgba(0,0,0,0.12)]"
              width={600}
              height={600}
            />
          </div>

          {/* FAQ list */}
          <div className="w-full lg:w-[54%]">
            <div>
              {faqData.slice(0, visibleCount).map((faq, idx) => (
                <div key={idx} className="border-b border-[#cccccc]">
                  <button
                    onClick={() => handleToggle(idx)}
                    aria-expanded={openIdx === idx}
                    className="w-full flex items-end justify-between cursor-pointer pt-[34px] pb-[9px] group text-left"
                  >
                    <span
                      className={`font-suisse-regular text-lg md:text-[1.34rem] leading-[1.2] tracking-[-0.03em] transition-colors duration-200 ${openIdx === idx ? "text-primary" : "text-black"
                        } group-hover:text-primary`}
                    >
                      {faq.question}
                    </span>

                    <span
                      className={`ml-4 mb-[6px] flex-shrink-0 transition-transform duration-300 ${openIdx === idx
                        ? "rotate-45 text-primary"
                        : "text-[#cccccc]"
                        }`}
                      aria-hidden
                    >
                      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                        <line x1="15" y1="1" x2="15" y2="29" stroke="currentColor" strokeWidth="1" />
                        <line x1="1" y1="15" x2="29" y2="15" stroke="currentColor" strokeWidth="1" />
                      </svg>
                    </span>
                  </button>

                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${openIdx === idx ? "max-h-[500px] opacity-100 pb-5" : "max-h-0 opacity-0"
                      } text-base text-[#666] leading-relaxed font-suisse-regular`}
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
              <div className="mt-6 flex justify-end gap-4">
                {hasLess && <BracketButton label="Less" onClick={handleLess} />}
                {hasMore && <BracketButton label="More" onClick={handleMore} />}
              </div>
            )}

            <p className="mt-7 text-right font-suisse-mono text-base md:text-xl tracking-[-0.01em] text-black">
              Still Have questions, Reach out to us{" "}
              <Link href="/book" className="text-primary hover:underline">@contact</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
