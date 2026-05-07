
const waveBars = [
    { h: "h-8", color: "bg-primary", delay: ".1s" },
    { h: "h-16", color: "bg-black", delay: ".2s" },
    { h: "h-8", color: "bg-primary/20", delay: ".4s" },
    { h: "h-12", color: "bg-black", delay: ".7s" },
    { h: "h-24", color: "bg-primary/60", delay: ".6s" },
    { h: "h-28", color: "bg-primary", delay: ".5s" },
    { h: "h-24", color: "bg-primary/60", delay: ".6s" },
    { h: "h-12", color: "bg-primary", delay: ".7s" },
    { h: "h-8", color: "bg-primary/20", delay: ".4s" },
    { h: "h-16", color: "bg-black", delay: ".2s" },
    { h: "h-8", color: "bg-primary", delay: ".1s" },
];
const AudioAnimation = () => {

    return (
        <div className='flex flex-row gap-x-2 items-center justify-center'>
            {waveBars.map((bar, idx) => (
                <div
                    key={idx}
                    className={`wave rounded-full w-1 md:w-2 ${bar.h} ${bar.color}`}
                    style={{ animationDelay: `calc(1s - ${bar.delay})` }}
                />
            ))}
        </div>
    )
}

export default AudioAnimation