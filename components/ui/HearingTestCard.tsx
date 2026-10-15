type HearingTestCardProps = {
    text: string,
    icon: React.ReactNode,
    desc: string
}

const HearingTestCard = ({ text, icon, desc }: HearingTestCardProps) => {
    return (
        <div className='flex flex-col w-[282px] max-w-full overflow-hidden rounded-[1.25rem]'>
            <div className='flex items-center gap-10 bg-[#efefef] px-7 h-[66px]'>
                <span className='flex justify-center items-center w-[50px] h-[40px] rounded-lg bg-primary text-white text-[25px] leading-none'>
                    {icon}
                </span>
                <span className='font-suisse-regular text-2xl tracking-[-0.03em] text-black'>
                    {text}
                </span>
            </div>
            <p className='mt-[3px] bg-[#efefef] text-[#808080] text-left text-base leading-[1.13] tracking-[-0.02em] px-7 pt-4 pb-7 font-suisse-regular'>
                {desc}
            </p>
        </div>
    )
}

export default HearingTestCard
