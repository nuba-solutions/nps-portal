import React from 'react'

type TPageHeadingProps = {
    title: string
    subtitle: string
}

const PageHeading = ({title, subtitle}: TPageHeadingProps) => {
    return (
        <div>
            <h1 className="text-lg font-semibold">{title}</h1>
            <p className='text-xs text-slate-500 dark:text-slate-400'>{subtitle}</p>
        </div>
    )
}

export default PageHeading