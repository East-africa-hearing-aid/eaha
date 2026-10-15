'use client';
import gsap from 'gsap';
import { useCallback, useEffect, useRef, useState } from 'react';
import { BsSoundwave } from 'react-icons/bs';
import { TbWaveSine } from 'react-icons/tb';
import { Button } from '../ui/Button';
import HearingTestCard from '../ui/HearingTestCard';
import SectionChip from '../ui/SectionChip';
import Copy from '../ui/Copy/Copy';
import HearingQuiz from './HearingQuiz';


const audioFiles = [
    {
        src: '/Audio/pink-noise.mp3',
        icon: <BsSoundwave />,
        name: 'Noise',
        description: "This mode allows you to conduct a hearing test through the usage of pink noise."
    },
    {
        src: '/Audio/words.mp3',
        icon: <span className='font-suisse-book leading-none'>Aa</span>,
        name: 'Words',
        description: "This mode allows you to conduct a hearing test through the usage of spoken words."
    },
    {
        src: '/Audio/frequency-sweep.mp3',
        icon: <TbWaveSine />,
        name: 'Frequencies',
        description: "This mode sweeps from 125 Hz to 8 kHz so you can hear which frequencies are harder to detect."
    },
];

// Dashed ring: idle dashes are always drawn, audio makes them grow.
const NUM_RAYS = 56;
const INNER_RADIUS_RATIO = 0.4;   // of the canvas' smaller side
const IDLE_DASH_RATIO = 0.055;    // idle dash length
const MAX_EXTRA_RATIO = 0.045;    // extra length at full signal
const DASH_WIDTH_RATIO = 0.016;
const ACTIVE_RGB = [255, 102, 51]; // #FF6633 while audio plays
const IDLE_RGB = [204, 204, 204]; // #CCCCCC at rest

/** Rectangular gradient bar with tick marks; the native range input sits on top for interaction. */
function VolumeControl({ volume, onChange }: { volume: number; onChange: (v: number) => void }) {
    return (
        <div className="w-full max-w-[250px]">
            <div className="relative h-[29px] w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-[#fff4ef] via-[#ffb08f] to-primary" />
                {/* current level marker */}
                <span
                    className="absolute inset-y-0 w-[2px] -ml-px bg-black/70 transition-[left] duration-150"
                    style={{ left: `${volume * 100}%` }}
                    aria-hidden
                />
                {[19, 35, 51, 67, 83].map((left) => (
                    <span key={left} className="absolute bottom-0 h-[13px] w-px bg-white" style={{ left: `${left}%` }} />
                ))}
                <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={(e) => onChange(parseFloat(e.target.value))}
                    aria-label="Volume control"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
            </div>
            <p className="mt-4 font-suisse-regular text-[15px] md:text-[17px] tracking-[-0.03em] text-[#808080] uppercase">Volume Control</p>
        </div>
    );
}

/** Four corner brackets around a mode icon. */
function ModeBrackets({ active }: { active: boolean }) {
    // Corners sit slightly outside when idle and snap into place (and turn orange) when selected.
    const c = active ? 'border-primary' : 'border-[#cfcfcf]';
    const base = `absolute w-2.5 h-2.5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${c}`;
    const o = active ? '0px' : '-3px';
    return (
        <>
            <span className={`${base} border-t border-l`} style={{ top: o, left: o }} />
            <span className={`${base} border-t border-r`} style={{ top: o, right: o }} />
            <span className={`${base} border-b border-l`} style={{ bottom: o, left: o }} />
            <span className={`${base} border-b border-r`} style={{ bottom: o, right: o }} />
        </>
    );
}

export default function AudioVisualizer() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mountRef = useRef<HTMLDivElement>(null);
    const [currentAudioIndex, setCurrentAudioIndex] = useState(1);
    const [volume, setVolume] = useState(0.5);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasStartedTest, setHasStartedTest] = useState(false);
    const [quizOpen, setQuizOpen] = useState(false);
    const quickBtnRef = useRef<HTMLButtonElement>(null);

    // Web Audio API refs
    const audioContextRef = useRef<AudioContext | null>(null);
    const sourceRef = useRef<AudioBufferSourceNode | null>(null);
    const gainRef = useRef<GainNode | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const bufferRef = useRef<AudioBuffer | null>(null);
    const freqDataRef = useRef<Uint8Array<ArrayBuffer> | null>(null);
    const playbackOffsetRef = useRef(0);
    const playbackStartRef = useRef(0);

    const animFrameRef = useRef<number | null>(null);
    const isVisibleRef = useRef(true);

    // Ring colour: grey at rest, eases to orange while audio is playing.
    const isPlayingRef = useRef(false);
    const ringMix = useRef(0);


    const getAudioContext = useCallback(() => {
        if (!audioContextRef.current) {
            const ctx = new AudioContext();
            const gain = ctx.createGain();
            gain.gain.value = volume;
            gain.connect(ctx.destination);
            gainRef.current = gain;

            const analyser = ctx.createAnalyser();
            analyser.fftSize = 256;
            analyser.smoothingTimeConstant = 0.8;
            analyser.connect(gain);
            analyserRef.current = analyser;
            freqDataRef.current = new Uint8Array(analyser.frequencyBinCount) as Uint8Array<ArrayBuffer>;

            audioContextRef.current = ctx;
        }
        return audioContextRef.current;
    }, []);

    const startPlayback = useCallback(() => {
        const ctx = audioContextRef.current;
        if (!ctx || !bufferRef.current || !analyserRef.current) return;
        const source = ctx.createBufferSource();
        source.buffer = bufferRef.current;
        source.loop = true;
        source.connect(analyserRef.current);
        source.start(0, playbackOffsetRef.current % bufferRef.current.duration);
        sourceRef.current = source;
        playbackStartRef.current = ctx.currentTime;
        setIsPlaying(true);
    }, []);

    const stopSource = useCallback(() => {
        if (sourceRef.current) {
            try { sourceRef.current.stop(); } catch { /* already stopped */ }
            sourceRef.current.disconnect();
            sourceRef.current = null;
        }
    }, []);

    const pausePlayback = useCallback(() => {
        if (!audioContextRef.current) return;
        const elapsed = audioContextRef.current.currentTime - playbackStartRef.current;
        playbackOffsetRef.current += elapsed;
        stopSource();
        setIsPlaying(false);
    }, [stopSource]);

    const playAudio = useCallback(async (index: number, wasPlaying: boolean) => {
        setCurrentAudioIndex(index);
        const ctx = getAudioContext();
        if (ctx.state === 'suspended') await ctx.resume();

        stopSource();
        setIsPlaying(false);
        playbackOffsetRef.current = 0;

        const response = await fetch(audioFiles[index].src);
        const arrayBuffer = await response.arrayBuffer();
        bufferRef.current = await ctx.decodeAudioData(arrayBuffer);

        if (wasPlaying) {
            const source = ctx.createBufferSource();
            source.buffer = bufferRef.current;
            source.loop = true;
            source.connect(analyserRef.current!);
            source.start(0);
            sourceRef.current = source;
            playbackStartRef.current = ctx.currentTime;
            setIsPlaying(true);
        }
    }, [getAudioContext, stopSource]);

    // Canvas 2D drawing + IntersectionObserver
    useEffect(() => {
        const canvas = canvasRef.current;
        const mount = mountRef.current;
        if (!canvas || !mount) return;

        const ctx = canvas.getContext('2d')!;

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio, 2);
            const w = mount.clientWidth;
            const h = mount.clientHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();
        window.addEventListener('resize', resize);

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const observer = new IntersectionObserver(
            ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
            { threshold: 0.05 }
        );
        observer.observe(mount);

        const draw = () => {
            animFrameRef.current = requestAnimationFrame(draw);
            if (!isVisibleRef.current) return;

            const w = mount.clientWidth;
            const h = mount.clientHeight;
            const cx = w / 2;
            const cy = h / 2;
            const minDim = Math.min(w, h);
            const innerRadius = minDim * INNER_RADIUS_RATIO;
            const idleLength = minDim * IDLE_DASH_RATIO;
            const maxExtra = minDim * MAX_EXTRA_RATIO;
            const dashWidth = Math.max(3, minDim * DASH_WIDTH_RATIO);

            ctx.clearRect(0, 0, w, h);

            const freqData = freqDataRef.current;
            const analyser = analyserRef.current;
            if (analyser && freqData) {
                analyser.getByteFrequencyData(freqData);
            }

            const angleStep = (Math.PI * 2) / NUM_RAYS;
            const targetMix = isPlayingRef.current ? 1 : 0;
            ringMix.current += (targetMix - ringMix.current) * (reduceMotion ? 1 : 0.08);
            const m = ringMix.current;
            const lerp = (a: number, b: number) => Math.round(a + (b - a) * m);
            ctx.fillStyle = `rgb(${lerp(IDLE_RGB[0], ACTIVE_RGB[0])}, ${lerp(IDLE_RGB[1], ACTIVE_RGB[1])}, ${lerp(IDLE_RGB[2], ACTIVE_RGB[2])})`;

            for (let i = 0; i < NUM_RAYS; i++) {
                const angle = i * angleStep - Math.PI / 2;
                const freqValue = freqData ? freqData[(i * 2) % freqData.length] / 255 : 0;
                const length = idleLength + maxExtra * freqValue;

                ctx.save();
                ctx.translate(cx, cy);
                ctx.rotate(angle);
                ctx.fillRect(-dashWidth / 2, -innerRadius - length, dashWidth, length);
                ctx.restore();
            }
        };
        draw();

        return () => {
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
            window.removeEventListener('resize', resize);
            observer.disconnect();
        };
    }, []);

    useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);

    // Volume sync
    useEffect(() => {
        if (gainRef.current) {
            gainRef.current.gain.value = volume;
        }
    }, [volume]);

    // Cleanup audio on unmount
    useEffect(() => {
        return () => {
            stopSource();
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, [stopSource]);

    // Animate Quick Assessment button in the first time the test starts
    useEffect(() => {
        if (!hasStartedTest || !quickBtnRef.current) return;
        gsap.fromTo(quickBtnRef.current,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.5, delay: 0.3, ease: 'power2.out' }
        );
    }, [hasStartedTest]);

    const toggleTest = () => {
        if (!hasStartedTest) setHasStartedTest(true);
        if (!bufferRef.current) {
            playAudio(currentAudioIndex, false).then(() => startPlayback());
            return;
        }
        if (isPlaying) pausePlayback();
        else startPlayback();
    };

    const modeList = (
        <div className="flex flex-col">
            <p className="flex items-center gap-2 font-suisse-regular text-[17px] tracking-[-0.03em] text-[#808080] mb-9">
                <span className="size-1 rounded-full bg-[#808080]" aria-hidden /> Mode
            </p>
            <div className="flex flex-col gap-5 ml-[13px]">
                {audioFiles.map((track, idx) => {
                    const active = idx === currentAudioIndex;
                    return (
                        <button
                            key={track.name}
                            type="button"
                            onClick={() => playAudio(idx, isPlaying)}
                            aria-pressed={active}
                            className={`group flex items-center gap-4 cursor-pointer text-left motion-safe:transition-[filter,opacity,translate] motion-safe:duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${active
                                ? 'blur-0 opacity-100 translate-x-0'
                                : 'blur-[1.2px] opacity-75 -translate-x-1 hover:blur-[0.3px] hover:opacity-100'}`}
                        >
                            <span className="relative flex items-center justify-center w-[55px] h-[46px] shrink-0 text-[25px] text-black">
                                <ModeBrackets active={active} />
                                <span className={`motion-safe:transition-all motion-safe:duration-500 ${active ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>{track.icon}</span>
                            </span>
                            <span className={`font-suisse-regular text-xl xl:text-2xl uppercase tracking-[-0.04em] transition-colors duration-500 ${active ? 'text-black' : 'text-[#c4c4c4] group-hover:text-[#9a9a9a]'}`}>
                                {track.name}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );

    return (
        <>
        <div className="relative -mt-18 bg-white rounded-t-[2.5rem] md:rounded-t-[6.5rem]">
          {/* Full width with the same side padding as the other home sections. */}
          <div className="relative w-full px-6 md:px-16 lg:px-20 pt-10 md:pt-[93px] pb-12 lg:pb-16">
            <SectionChip>Self Assessment</SectionChip>

            <div className="grid grid-cols-1 lg:grid-cols-[313fr_auto_358fr] items-start gap-y-10 mt-6 lg:mt-[2px] xl:pl-[40px]">
                {/* Left: mode list (desktop) */}
                <div className="hidden lg:block pt-[133px]">
                    {modeList}
                </div>

                {/* Centre: ring, card, CTA */}
                <div className="flex flex-col items-center">
                    <div ref={mountRef} className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] xl:w-[452px] xl:h-[452px]">
                        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden />
                    </div>

                    {/* Title block (mobile / tablet) */}
                    <div className="lg:hidden flex flex-col items-center text-center gap-4 mt-6">
                        <Copy animateOnScroll={true} delay={0.2}>
                            <h2 className="text-[1.9rem] leading-[1.05] tracking-[-0.03em] font-suisse-medium">It Starts With<br />A Hearing Test</h2>
                        </Copy>
                        <p className="text-[#808080] text-lg leading-snug tracking-[-0.03em] font-suisse-regular max-w-[260px]">Check the health of your ears with a click of a button.</p>
                        <VolumeControl volume={volume} onChange={setVolume} />
                    </div>

                    {/* Mode switcher (mobile / tablet) */}
                    <div className="lg:hidden flex flex-wrap justify-center gap-x-6 gap-y-3 mt-8">
                        {audioFiles.map((track, idx) => (
                            <button
                                key={track.name}
                                type="button"
                                onClick={() => playAudio(idx, isPlaying)}
                                aria-pressed={idx === currentAudioIndex}
                                className={`font-suisse-regular text-base uppercase tracking-[-0.03em] cursor-pointer ${idx === currentAudioIndex ? 'text-black underline decoration-primary underline-offset-8' : 'text-[#bdbdbd]'}`}
                            >
                                {track.name}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-col items-center gap-7 mt-8 lg:mt-12 w-full">
                        {audioFiles.map(({ description, icon, name }, idx) => {
                            if (idx !== currentAudioIndex) return null;
                            return (
                                <HearingTestCard
                                    key={name}
                                    text={name}
                                    icon={icon}
                                    desc={description}
                                />
                            )
                        })}
                        <Button
                            variant='lg'
                            mode='default'
                            className='w-full max-w-[265px] !rounded-[1.4rem] !py-0 h-[56px] md:h-[62px] !text-xl md:!text-[1.4rem] tracking-[-0.02em]'
                            onClick={toggleTest}
                        >
                            {isPlaying ? 'Stop Testing' : 'Test My Hearing'}
                        </Button>

                        <button
                            ref={quickBtnRef}
                            onClick={() => setQuizOpen(true)}
                            className="cursor-pointer -mt-2 flex items-center gap-2 text-sm font-suisse-regular text-gray-400 hover:text-black transition-colors"
                            style={{ opacity: 0 }}
                            aria-label="Open quick hearing assessment"
                        >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2a5 5 0 015 5c0 3-2 5-4 6.5V17a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3.5C7 12 5 10 5 7a7 7 0 017-5z" />
                                <path d="M10 21h4" />
                            </svg>
                            Take a quick assessment
                        </button>
                    </div>
                </div>

                {/* Right: title, copy, volume (desktop) */}
                <div className="hidden lg:flex flex-col items-start lg:ml-auto pt-[133px] pl-10 xl:pr-[36px]">
                    <Copy animateOnScroll={true} delay={0.2}>
                        <h2 className="text-[1.9rem] xl:text-[2.25rem] leading-[1.03] tracking-[-0.03em] font-suisse-medium">It Starts With<br />A Hearing Test</h2>
                    </Copy>
                    <p className="mt-3 text-[#808080] text-[1.15rem] xl:text-[1.31rem] leading-[1.18] tracking-[-0.03em] font-suisse-regular max-w-[240px]">Check the health of your ears with a click of a button.</p>
                    <div className="mt-[11px] w-full">
                        <VolumeControl volume={volume} onChange={setVolume} />
                    </div>
                </div>
            </div>

            <a
                href="#services"
                aria-label="Scroll to services"
                className="hidden lg:flex absolute right-20 xl:right-[116px] top-[842px] items-center justify-center size-[37px] rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-colors"
            >
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden><path d="M1 1l7 7 7-7" stroke="currentColor" strokeWidth="1.5" /></svg>
            </a>
          </div>
        </div>

        <HearingQuiz isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
        </>
    );
}
