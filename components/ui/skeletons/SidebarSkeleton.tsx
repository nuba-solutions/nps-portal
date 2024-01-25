import { useSidebarState } from '@/contexts/SidebarStateContext'
import React from 'react'

const SidebarSkeleton = () => {
    const { isSidebarOpen } = useSidebarState()
    return (
        <aside className={`z-10 transition-transform fixed top-[80px] ${isSidebarOpen ? 'left-0' : '-left-full -translate-x-full'} lg:sticky lg:translate-x-0 lg:left-0 w-[250px] h-[calc(100vh-80px)] pt-3 transition-[width] bg-white dark:bg-slate-800 border-r border-slate-300 dark:border-slate-700`} aria-label="Sidebar">
            <div className='h-full pb-10 pt-1 overflow-auto'>
                <ul className="font-medium px-3">
                    <li className='mb-2 h-[45px] rounded-lg bg-slate-200 dark:bg-slate-700 animate-pulse'></li>
                    <hr className="h-px my-3 border-slate-200 dark:border-slate-700"/>
                    <li className='my-3 h-[45px] rounded-lg bg-slate-200 dark:bg-slate-700 animate-pulse'></li>
                    <li className='my-3 h-[45px] rounded-lg bg-slate-200 dark:bg-slate-700 animate-pulse'></li>
                    <hr className="h-px my-3 border-slate-200 dark:border-slate-700"/>
                    <li className='my-3 h-[45px] rounded-lg bg-slate-200 dark:bg-slate-700 animate-pulse'></li>
                    <li className='my-3 h-[45px] rounded-lg bg-slate-200 dark:bg-slate-700 animate-pulse'></li>
                    <hr className="h-px my-3 border-slate-200 dark:border-slate-700"/>
                    <li className='my-3 h-[45px] rounded-lg bg-slate-200 dark:bg-slate-700 animate-pulse'></li>
                    <li className='my-3 h-[45px] rounded-lg bg-slate-200 dark:bg-slate-700 animate-pulse'></li>
                    <hr className="h-px my-3 border-slate-200 dark:border-slate-700"/>
                    <li className='my-3 h-[45px] rounded-lg bg-slate-200 dark:bg-slate-700 animate-pulse'></li>
                    <li className='my-3 h-[45px] rounded-lg bg-slate-200 dark:bg-slate-700 animate-pulse'></li>
                </ul>
            </div>
        </aside>
    )
}

export default SidebarSkeleton