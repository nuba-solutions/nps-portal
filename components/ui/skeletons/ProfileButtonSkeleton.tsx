import React from 'react'

const ProfileButtonSkeleton = () => {
    return (
        <div className='flex items-center gap-5 border-l border-l-slate-300 dark:border-l-slate-700 pl-4'>
            <div className='hidden md:flex flex-col items-end gap-2'>
                <p className='h-2 min-w-[110px] bg-slate-200 dark:bg-slate-600 rounded-full animate-pulse'></p>
                <h2 className='h-3 min-w-[110px] bg-slate-200 dark:bg-slate-600 rounded-full animate-pulse'></h2>
            </div>

            <div className='animate-pulse rounded-full h-[35px] md:h-[40px] w-[35px] md:w-[40px] bg-slate-300 dark:bg-slate-600 cursor-pointer flex items-center justify-center ring-4 ring-slate-500/20 dark:ring-slate-500/40'></div>
        </div>
    )
}

export default ProfileButtonSkeleton