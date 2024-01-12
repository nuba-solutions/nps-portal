"use client"

import React, { useEffect, useState } from 'react'
import { IoMoon, IoSunny } from 'react-icons/io5'
import { useSession } from 'next-auth/react'
import { Session } from 'next-auth'
import { updateUserTheme } from '@/utils/update_user'

type TThemeSwitcherProps = {
    session: Session
    placement: "navbar" | "profile" | "account"
}

const ThemeSwitcherButton = ({session, placement}: TThemeSwitcherProps) => {
    const [isUpdating, setIsUpdating] = useState(false)
    const [themeUI, setThemeUI] = useState<string>(session?.user.theme)
    const { update } = useSession()

    const handleUpdateThemePreference = async () => {
        setIsUpdating(true)

        const data: Partial<TUser> = {
            id: parseInt(session?.user.id),
            email: session?.user.email as string,
            name: session?.user.name as string,
            notificationsEnabled: session?.user.notificationsEnabled,
            theme: document.getElementsByTagName('html')[0].className === 'dark' ? 'light' : 'dark'
        }

        const updatedUser = await updateUserTheme(session, data)

        await update({
            ...session,
            user: {
                ...session?.user,
                theme: updatedUser.data.theme,
            }
        }).then((res) => {
            const theme = res?.user.theme
            if (theme) handleUpdateThemeUi(theme)
            window.location.reload()
            setIsUpdating(false)
        })
    }

    const handleUpdateThemeUi = (newTheme: string) => {
        setThemeUI(newTheme)
        document.getElementsByTagName('html')[0].className = ""
        document.getElementsByTagName('html')[0].classList.add(newTheme)
    }

    useEffect(() => handleUpdateThemeUi(session?.user.theme), [])

    if (placement === "navbar") {
        return (
            <button
                className='hidden sm:flex items-center justify-center w-[35px] h-[35px] rounded-full bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-700 hover:text-primary-500 hover:dark:text-white disabled:pointer-events-none disabled:opacity-50'
                onClick={() => handleUpdateThemePreference()}
                disabled={isUpdating}
            >
                {
                    themeUI === 'dark' ? (
                        <IoSunny className="text-base"/>
                    ) : (
                        <IoMoon className="text-base"/>
                    )
                }
                <span className='sr-only'>Toggle theme color</span>
            </button>
        )
    }

    if (placement === "account") {
        return (
            <div className={`flex gap-2 items-center ${isUpdating ? 'opacity-50' : 'opacity-100'}`}>
                <p className='font-semibold text-right'>{themeUI === 'dark' ? 'Switch to light' : 'Switch to dark'}</p>
                <button
                    className='flex items-center justify-center w-[35px] h-[35px] rounded-lg bg-slate-200 dark:bg-slate-700 border border-slate-200 dark:border-slate-700 hover:text-blue-500 disabled:pointer-events-none disabled:opacity-50'
                    onClick={() => handleUpdateThemePreference()}
                    disabled={isUpdating}
                >
                    {
                        themeUI === 'dark' ? (
                            <IoSunny className="text-base"/>
                        ) : (
                            <IoMoon className="text-base"/>
                        )
                    }
                    <span className='sr-only'>Toggle theme color</span>
                </button>
            </div>
        )
    }

    return (
        <button className='flex sm:hidden items-center justify-between w-full h-full py-2 px-3 rounded-lg hover:bg-slate-100 hover:dark:bg-slate-900 hover:text-primary-500'
            onClick={() => handleUpdateThemePreference()}
        >
            Change theme
            {
                themeUI === 'dark' ? (
                    <IoSunny className="text-base"/>
                ) : (
                    <IoMoon className="text-base"/>
                )
            }
        </button>
    )
}

export default ThemeSwitcherButton