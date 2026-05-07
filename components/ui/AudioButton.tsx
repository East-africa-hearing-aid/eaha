import React from 'react'

type AudioButtonProps = {
    text: string
    className?: string
    onClick?: () => void
    children: React.ReactNode
}

const AudioButton = ({ text, className, onClick, children }: AudioButtonProps) => {
    return (
        <div className={`flex items-center gap-2 cursor-pointer ${className}`} onClick={onClick}>
            {children}
            <span className='font-suisse-regular text-2xl uppercase'>
                {text}
            </span>
        </div>
    )
}

export default AudioButton