"use client"

import React from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { IoMoon, IoSunny } from 'react-icons/io5'

const ThemeSwitcherButton = () => {
    const { theme, setTheme } = useTheme()

    return (
        <button className='flex items-center justify-center w-[35px] h-[35px] rounded-full bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-700 hover:text-primary-500 hover:dark:text-white'
            onClick={() => setTheme(!theme || theme === '' ? 'dark' : '')}
        >
            {
                theme === 'dark' ? (
                    <IoSunny className="text-base"/>
                ) : (
                    <IoMoon className="text-base"/>
                )
            }
            <span className='sr-only'>Toggle theme color</span>
        </button>
    )
}

export default ThemeSwitcherButton