'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Link from 'next/link';

const QUESTIONS = [
    "Do you often ask people to repeat themselves?",
    "Do you have difficulty following conversations in noisy places?",
    "Do you turn the TV or radio up louder than others prefer?",
    "Do you have ringing or buzzing sounds in your ears?",
    "Do you miss parts of conversations on the phone?",
    "Do family or friends say you don't hear well?",
];

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI'];

const CX = 100, CY = 100, RO = 86, RI = 50, GAP = 8;
const DARK_SEG = '#2e2e2e';
const ORANGE = '#FF6633';
const GRAY_SEG = '#777777'; // answered No — highlighted but neutral

function polar(cx: number, cy: number, r: number, deg: number) {
    const rad = ((deg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function donutArc(i: number): string {
    const s = i * 60 + GAP;
    const e = (i + 1) * 60 - GAP;
    const o1 = polar(CX, CY, RO, s);
    const o2 = polar(CX, CY, RO, e);
    const i1 = polar(CX, CY, RI, e);
    const i2 = polar(CX, CY, RI, s);
    return `M${o1.x.toFixed(2)},${o1.y.toFixed(2)} A${RO},${RO},0,0,1,${o2.x.toFixed(2)},${o2.y.toFixed(2)} L${i1.x.toFixed(2)},${i1.y.toFixed(2)} A${RI},${RI},0,0,0,${i2.x.toFixed(2)},${i2.y.toFixed(2)} Z`;
}

interface HearingQuizProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function HearingQuiz({ isOpen, onClose }: HearingQuizProps) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<(boolean | null)[]>(Array(6).fill(null));
    const [showResult, setShowResult] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const questionRef = useRef<HTMLDivElement>(null);
    const segRefs = useRef<(SVGGElement | null)[]>([]);
    const resultRef = useRef<HTMLDivElement>(null);

    // Body scroll lock
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    // Panel open/close animation
    useEffect(() => {
        const backdrop = backdropRef.current;
        const panel = panelRef.current;
        const wrapper = wrapperRef.current;
        if (!backdrop || !panel || !wrapper) return;

        if (isOpen) {
            wrapper.style.pointerEvents = 'auto';
            gsap.to(backdrop, { opacity: 1, duration: 0.3, ease: 'power2.out' });
            gsap.fromTo(panel,
                { opacity: 0, scale: 0.94, y: 24 },
                { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power3.out' }
            );
        } else {
            gsap.to(backdrop, { opacity: 0, duration: 0.25 });
            gsap.to(panel, {
                opacity: 0, scale: 0.94, y: 24, duration: 0.25, ease: 'power2.in',
                onComplete: () => { wrapper.style.pointerEvents = 'none'; },
            });
        }
    }, [isOpen]);

    // Reset + animate segments when modal opens
    useEffect(() => {
        if (!isOpen) return;
        setCurrentQuestion(0);
        setAnswers(Array(6).fill(null));
        setShowResult(false);
        setIsTransitioning(false);

        segRefs.current.forEach((g, i) => {
            if (!g) return;
            gsap.set(g, { opacity: 0, scale: 0, svgOrigin: `${CX} ${CY}` });
            gsap.to(g, {
                opacity: 1,
                scale: 1,
                duration: 0.55,
                delay: 0.3 + i * 0.07,
                ease: 'back.out(1.5)',
                svgOrigin: `${CX} ${CY}`,
            });
        });
    }, [isOpen]);

    // Animate question in on every transition (delay=0 for mid-quiz, delay=0.35 for first)
    useEffect(() => {
        if (!questionRef.current || showResult || !isOpen) return;
        gsap.fromTo(
            questionRef.current,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.35, delay: currentQuestion === 0 ? 0.38 : 0, ease: 'power2.out' }
        );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentQuestion, isOpen]);

    // Animate result in
    useEffect(() => {
        if (showResult && resultRef.current) {
            gsap.fromTo(resultRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
            );
        }
    }, [showResult]);

    const handleAnswer = (isYes: boolean) => {
        if (isTransitioning) return;
        setIsTransitioning(true);

        const newAnswers = [...answers];
        newAnswers[currentQuestion] = isYes;
        setAnswers(newAnswers);

        // Animate segment — orange for Yes, gray for No
        const g = segRefs.current[currentQuestion];
        const path = g?.querySelector('path');
        if (g && path) {
            const flashColor = isYes ? '#FF9966' : '#aaaaaa';
            const targetColor = isYes ? ORANGE : GRAY_SEG;
            gsap.timeline()
                .to(path, { attr: { fill: flashColor }, duration: 0.1 })
                .to(path, { attr: { fill: targetColor }, duration: 0.3, ease: 'power2.out' });
            gsap.to(g, {
                scale: 1.08,
                svgOrigin: `${CX} ${CY}`,
                duration: 0.14,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut',
            });
        }

        // Slide current question out, then advance
        const isLast = currentQuestion === QUESTIONS.length - 1;
        gsap.to(questionRef.current, {
            opacity: 0,
            y: -18,
            duration: 0.25,
            delay: 0.4,
            ease: 'power2.in',
            onComplete: () => {
                if (isLast) {
                    setShowResult(true);
                } else {
                    setCurrentQuestion(prev => prev + 1);
                }
                setIsTransitioning(false);
            },
        });
    };

    const yesCount = answers.filter(a => a === true).length;

    return (
        <div
            ref={wrapperRef}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-8"
            style={{ pointerEvents: 'none' }}
        >
            {/* Backdrop */}
            <div
                ref={backdropRef}
                className="absolute inset-0 bg-black/75 backdrop-blur-sm"
                style={{ opacity: 0 }}
                onClick={onClose}
            />

            {/* Panel */}
            <div
                ref={panelRef}
                className="relative w-full max-w-4xl bg-[#1c1c1c] rounded-2xl lg:rounded-3xl shadow-2xl overflow-hidden"
                style={{ opacity: 0 }}
            >
                {/* Close */}
                <button
                    onClick={onClose}
                    className="cursor-pointer absolute top-5 right-5 z-10 text-white/30 hover:text-white/70 transition-colors p-1"
                    aria-label="Close"
                >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                        <path d="M2 2l14 14M16 2L2 16" />
                    </svg>
                </button>

                {showResult ? (
                    /* ── Result screen ── */
                    <div ref={resultRef} className="px-8 lg:px-14 py-12 lg:py-16">
                        <div className="flex gap-5 mb-12">
                            <div className="w-1 bg-[#FF6633] rounded-full self-stretch flex-shrink-0" />
                            <div className="space-y-5">
                                <h2 className="text-4xl lg:text-5xl text-white font-suisse-book leading-tight">
                                    What&apos;s<br />Next&nbsp;?
                                </h2>
                                <p className="text-white text-base lg:text-lg font-suisse-regular leading-relaxed max-w-2xl">
                                    {yesCount >= 2 ? (
                                        <>
                                            You answered Yes to{' '}
                                            <span className="text-[#FF6633] font-suisse-book">{yesCount}</span>{' '}
                                            questions. It may be helpful to have a professional hearing evaluation.
                                            Early care can make communication easier and improve quality of life.
                                        </>
                                    ) : (
                                        <>
                                            You answered Yes to{' '}
                                            <span className="text-[#FF6633] font-suisse-book">{yesCount}</span>{' '}
                                            {yesCount === 1 ? 'question' : 'questions'}.
                                            If you answered Yes to{' '}
                                            <span className="text-[#FF6633] font-suisse-book">two</span>{' '}
                                            or more, a professional evaluation is recommended. Your results look
                                            reassuring — keep monitoring your hearing regularly.
                                        </>
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={onClose}
                                className="cursor-pointer bg-[#FF6633] hover:bg-[#e55520] text-white px-14 py-4 rounded-full text-base font-suisse-regular transition-colors"
                            >
                                Done
                            </button>
                            <Link
                                href="/book"
                                className="bg-white hover:bg-gray-100 text-[#FF6633] border border-[#FF6633] px-14 py-4 rounded-full text-base font-suisse-regular transition-colors text-center"
                            >
                                Book a Call
                            </Link>
                        </div>
                    </div>
                ) : (
                    /* ── Quiz screen ── */
                    <div className="flex flex-col lg:flex-row gap-0 items-stretch min-h-[400px]">

                        {/* Question side */}
                        <div className="flex-1 flex flex-col justify-center px-8 lg:px-14 py-12 lg:py-14">

                            {/* Progress bar */}
                            <div className="flex items-center gap-3 mb-10">
                                <span className="text-[#FF6633] font-suisse-book text-sm tabular-nums">
                                    {ROMAN[currentQuestion]}
                                </span>
                                <span className="text-white/25 text-sm font-suisse-regular">
                                    of {ROMAN[QUESTIONS.length - 1]}
                                </span>
                                <div className="flex gap-1.5 ml-2">
                                    {QUESTIONS.map((_, i) => (
                                        <div
                                            key={i}
                                            className={`h-px rounded-full transition-all duration-400 ${i < currentQuestion
                                                ? 'bg-[#FF6633] w-6'
                                                : i === currentQuestion
                                                    ? 'bg-[#FF6633]/50 w-4'
                                                    : 'bg-white/15 w-4'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Animated question + buttons */}
                            <div ref={questionRef} style={{ opacity: 0 }}>
                                <p className="text-white font-suisse-book text-2xl lg:text-[1.75rem] leading-snug mb-10">
                                    {QUESTIONS[currentQuestion]}
                                </p>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => handleAnswer(true)}
                                        disabled={isTransitioning}
                                        className="cursor-pointer px-10 py-3 rounded-xl bg-[#FF6633] text-white font-suisse-regular text-sm hover:bg-[#e55520] active:scale-95 transition-all duration-150 disabled:opacity-30 disabled:pointer-events-none"
                                    >
                                        Yes
                                    </button>
                                    <button
                                        onClick={() => handleAnswer(false)}
                                        disabled={isTransitioning}
                                        className="cursor-pointer px-10 py-3 rounded-xl border border-white/20 text-white font-suisse-regular text-sm hover:border-white/45 active:scale-95 transition-all duration-150 disabled:opacity-30 disabled:pointer-events-none"
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="hidden lg:block w-px bg-white/5 self-stretch" />

                        {/* Chart side */}
                        <div className="flex flex-col items-center justify-center gap-8 px-10 py-12 lg:py-14 flex-shrink-0">
                            <svg
                                width="210"
                                height="210"
                                viewBox="0 0 200 200"
                                aria-label="Assessment progress"
                                role="img"
                            >
                                {Array.from({ length: 6 }, (_, i) => (
                                    <g key={i} ref={el => { segRefs.current[i] = el; }}>
                                        <path d={donutArc(i)} fill={DARK_SEG} />
                                    </g>
                                ))}
                            </svg>

                            <button
                                onClick={() => setShowResult(true)}
                                disabled={isTransitioning}
                                className="cursor-pointer px-8 py-2.5 rounded-full border border-white/15 text-white/50 font-suisse-regular text-xs hover:border-white/35 hover:text-white/80 transition-colors disabled:opacity-30"
                            >
                                Skip to results
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
