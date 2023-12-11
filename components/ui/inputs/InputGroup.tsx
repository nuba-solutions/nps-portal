import React from 'react'

type TInputGroupProps = {
    children: React.ReactNode
    inline?: boolean
    className?: string
    reverse?:boolean
    leading?: boolean
}

const InputGroup = ({children, inline, reverse, leading, className}: TInputGroupProps) => {

    return (
        <div className={`flex ${inline && reverse ? 'flex-row-reverse' : 'flex-row'} ${inline ? 'w-fit items-center gap-2 [&>label]:mb-0' : 'flex-col items-start'} ${inline && leading ? '[&>label]:leading-4' : '[&>label]:leading-none'} ${className}`}>
            {children}
        </div>
    )
}

export default InputGroup