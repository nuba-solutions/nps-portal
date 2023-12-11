import React from 'react'

const PageHeading = ({title, description}: TClientMenuItemPageInfo) => {
    return (
        <div>
            <h1 className="text-lg font-semibold">{title}</h1>
            <p className='text-xs text-slate-500 dark:text-slate-400'>{description}</p>
        </div>
    )
}

export default PageHeading