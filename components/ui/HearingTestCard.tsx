type HearingTestCardProps = {
    text: string,
    icon: React.ReactNode,
    desc: string
}
const HearingTestCard = ({ text, icon, desc }: HearingTestCardProps) => {
    return (
        <div className='flex flex-col items-center gap-0.5 max-w-72'>
            <div className={`flex items-center justify-between gap-2 p-4 w-full cursor-pointer bg-gray-200 rounded-t-2xl`}>
                <div className="flex items-center gap-2">
                    <div
                        className={`size-8 md:size-10 text-xl md:text-3xl rounded-lg flex justify-center items-center bg-primary text-white`}
                    >
                        {icon}
                    </div>
                    <span className='font-suisse-regular text-xl uppercase'>
                        {text}
                    </span>
                </div>
            </div>
            <p className='bg-gray-200 text-gray-500 rounded-b-2xl text-left text-sm py-2 px-6 font-suisse-mono'>{desc}</p>
        </div>
    )
}

export default HearingTestCard