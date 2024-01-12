import React from 'react'

const PageHeading = ({title, description}: TClientMenuItemPageInfo) => {
    return (
        <div>
            <h1 className="text-lg font-semibold leading-6">{title}</h1>
            <p className='text-xs dark:text-slate-400'>{description}</p>
        </div>
    )
}

export default PageHeading