'use client';
import gsap from 'gsap';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { BsSoundwave } from 'react-icons/bs';
import { PiTextAaLight } from 'react-icons/pi';
import { TbWaveSine } from 'react-icons/tb';
import AudioButton from '../ui/AudioButton';
import { Button } from '../ui/Button';
import HearingTestCard from '../ui/HearingTestCard';
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
        icon: <PiTextAaLight />,
        name: 'Word',
        description: "This mode allows you to conduct a hearing test through the usage of spoken words."
    },
    {
        src: '/Audio/frequency-sweep.mp3',
        icon: <TbWaveSine />,
        name: 'Frequencies',
        description: "This mode sweeps from 125 Hz to 8 kHz so you can hear which frequencies are harder to detect."
    },
];

const NUM_RAYS = 96;
const RADIUS_RATIO = 0.35;
const RAY_LENGTH_RATIO = 0.15;
const BAR_COLOR = '#FF6633';

export default function AudioVisualizer() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mountRef = useRef<HTMLDivElement>(null);
    const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
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

    const buttonRefs = useRef<(HTMLDivElement | null)[]>([]);
    const arrowRef = useRef<HTMLDivElement>(null);

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
            const radius = minDim * RADIUS_RATIO;
            const innerRadius = radius * (1 - RAY_LENGTH_RATIO);
            const maxBarHeight = radius - innerRadius;

            ctx.clearRect(0, 0, w, h);

            const freqData = freqDataRef.current;
            const analyser = analyserRef.current;
            if (analyser && freqData) {
                analyser.getByteFrequencyData(freqData);
            }

            const angleStep = (Math.PI * 2) / NUM_RAYS;
            const barWidth = (2 * Math.PI * innerRadius) / (NUM_RAYS * 2);

            ctx.fillStyle = BAR_COLOR;

            for (let i = 0; i < NUM_RAYS; i++) {
                const angle = i * angleStep - Math.PI / 2;
                const freqValue = freqData ? freqData[i % freqData.length] / 255 : 0;
                const barHeight = maxBarHeight * freqValue;

                if (barHeight < 0.5) continue;

                ctx.save();
                ctx.translate(cx, cy);
                ctx.rotate(angle);

                const halfW = barWidth / 2;
                const r = Math.min(halfW, barHeight / 2);

                ctx.beginPath();
                ctx.roundRect(-halfW, -innerRadius - barHeight, barWidth, barHeight, r);
                ctx.fill();

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

    // Volume sync
    useEffect(() => {
        if (gainRef.current) {
            gainRef.current.gain.value = volume;
        }
    }, [volume]);

    // Arrow position animation
    useEffect(() => {
        const activeBtn = buttonRefs.current[currentAudioIndex];
        const arrow = arrowRef.current;
        if (activeBtn && arrow) {
            const btnRect = activeBtn.getBoundingClientRect();
            const parentRect = activeBtn.parentElement!.getBoundingClientRect();
            const offset = btnRect.top - parentRect.top + btnRect.height / 2 - 16;
            gsap.to(arrow, { top: offset, duration: 0.4, ease: "power2.out" });
        }
    }, [currentAudioIndex]);

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

    return (
        <>
        <div className="relative -mt-18 min-h-[100dvh] lg:min-h-screen 2xl:min-h-[85vh] bg-white flex flex-col lg:flex-row justify-center items-end rounded-t-[2rem] md:rounded-t-[4rem]">
            <div ref={mountRef} className="absolute inset-0 h-[57dvh]" >
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
                <Image className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' src="/Images/logo.png" alt="Logo" width={90} height={90} />
            </div>
            <div className='flex flex-col items-center lg:items-end justify-center gap-8 mt-[57dvh] w-full h-full max-w-[1440px]'>
                <div className="lg:flex flex-col hidden lg:absolute left-1/2 -translate-x-1/2 lg:-translate-0 lg:left-20 top-1/2 lg:-translate-y-1/2">
                    <div
                        ref={arrowRef}
                        className='absolute top-5 -left-5 size-8 pointer-events-none z-10 rotate-180'
                    >
                        <svg width="24" height="24" viewBox="0 0 32 32">
                            <polygon
                                points="0,16 32,0 32,32"
                                fill="#ff6633"
                            >
                                <animate
                                    attributeName="points"
                                    dur="0.4s"
                                    values="0,16 32,0 32,32; 0,16 32,4 32,28; 0,16 32,0 32,32"
                                    repeatCount="1"
                                    fill="freeze"
                                />
                            </polygon>
                        </svg>
                    </div>
                    {audioFiles.map((track, idx) => (
                        <div
                            key={idx}
                            ref={el => { buttonRefs.current[idx] = el; }}
                            className="flex items-center"
                        >
                            <AudioButton
                                className={`px-6 py-2 md:py-3 rounded ${idx === currentAudioIndex ? ' text-black' : ' text-gray-400'}`}
                                onClick={() => playAudio(idx, isPlaying)}
                                text={track.name}
                            >
                                <div className={`rounded-lg flex justify-center items-center transition-all duration-300
                                ${idx === currentAudioIndex ? 'bg-primary text-white size-8 md:size-12 text-xl md:text-3xl' : 'bg-gray-200 size-7 md:size-11  text-lg md:text-2xl'}`}>
                                    {idx === currentAudioIndex ? track.icon : null}
                                </div>
                            </AudioButton>
                        </div>
                    ))}
                </div>
                <div className='flex md:hidden flex-col items-center justify-center space-y-3'>
                    <Copy animateOnScroll={true} delay={0.2}>
                        <h2 className='text-2xl lg:text-3xl font-suisse-book'>It Starts With a Hearing Test</h2>
                    </Copy>
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="w-64 h-3 rounded-full bg-gradient-to-r from-white via-primary/80 to-primary appearance-none
                        hover:cursor-pointer
                        accent-transparent
                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md
                        [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-md"
                    />
                    <p className='text-gray-400 text-2xl font-suisse-regular text-center'>Volume</p>
                </div>

                <div className="hidden md:flex flex-col absolute right-18 top-1/2 -translate-y-1/2 max-w-xs space-y-6">
                    <h2 className='text-5xl font-suisse-book'>It Starts With a Hearing Test</h2>
                    <p className='text-gray-400 text-2xl font-suisse-regular'>Check the health of your ears with a click of a button.</p>
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="w-64 h-3 rounded-full bg-gradient-to-r from-white via-primary/80 to-primary appearance-none
                    hover:cursor-pointer
                    accent-transparent
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md
                    [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-md"
                    />
                    <p className='text-gray-400 text-2xl font-suisse-regular'>Volume</p>
                </div>

                <div className="flex flex-col items-center gap-4 mx-auto">
                    <div>
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
                    </div>
                    <div className="flex lg:hidden gap-4">
                        <Button
                            variant='sm'
                            mode='iconOnly'
                            icon={
                                <svg width="24" height="24" fill="#fff"><path d="M15 6l-6 6 6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            }
                            className="bg-gray-200 hover:bg-primary/80 text-black rounded-full p-3 transition"
                            onClick={() => {
                                const prevIdx = (currentAudioIndex - 1 + audioFiles.length) % audioFiles.length;
                                playAudio(prevIdx, isPlaying);
                            }}
                            aria-label="Previous"
                        />
                        <Button
                            variant='sm'
                            mode='iconOnly'
                            icon={
                                <svg width="24" height="24" fill="#fff"><path d="M9 6l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            }
                            className="bg-gray-200 hover:bg-primary/80 text-black rounded-full p-3 transition"
                            onClick={() => {
                                const nextIdx = (currentAudioIndex + 1) % audioFiles.length;
                                playAudio(nextIdx, isPlaying);
                            }}
                            aria-label="Next"
                        />
                    </div>
                    <Button
                        variant='lg'
                        mode='default'
                        className='w-full'
                        onClick={() => {
                            if (!hasStartedTest) setHasStartedTest(true);
                            if (!bufferRef.current) {
                                playAudio(0, false).then(() => startPlayback());
                                return;
                            }
                            if (isPlaying) pausePlayback();
                            else startPlayback();
                        }}
                    >
                        {isPlaying ? 'Stop Testing' : 'Test My Hearing'}
                    </Button>

                    <button
                        ref={quickBtnRef}
                        onClick={() => setQuizOpen(true)}
                        className="cursor-pointer flex items-center gap-2 text-sm font-suisse-regular text-gray-400 hover:text-black transition-colors"
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
        </div>

        <HearingQuiz isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
        </>
    );
}
