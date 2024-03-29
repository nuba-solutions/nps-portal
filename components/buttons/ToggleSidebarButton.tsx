"use client"

import React from 'react'
import { useSidebarState } from '@/contexts/SidebarStateContext'
import { HiOutlineMenuAlt1 } from 'react-icons/hi'

const ToggleSidebarButton = () => {
    const { setIsComponentVisible, setIsBackdropVisible } = useSidebarState()

    return (
        <button
            onClick={() => {
                setIsComponentVisible((prev: boolean) => !prev)
                setIsBackdropVisible((prev: boolean) => !prev)
            }}
            type="button"
            className="inline-flex lg:hidden items-center p-2 text-sm rounded-lg hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:hover:bg-slate-700 dark:focus:ring-slate-600"
        >
            <span className="sr-only">Toggle sidebar</span>
            <HiOutlineMenuAlt1 className='text-2xl'/>
        </button>
    )
}

export default ToggleSidebarButton