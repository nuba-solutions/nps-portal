"use client"

import React, { useEffect, useState } from 'react'
import { IoMoon, IoSunny } from 'react-icons/io5'
import updateUserPreferences from '@/utils/update_preferences'
import { useSession } from 'next-auth/react'
import { Session } from 'next-auth'

type TThemeSwitcherProps = {
    session: Session
    placement: "navbar" | "profile"
}

const ThemeSwitcherButton = ({session, placement}: TThemeSwitcherProps) => {
    const [themeUI, setThemeUI] = useState<string>(session?.user.preferences[0].theme)
    const { update } = useSession()

    const handleUpdateThemePreference = async () => {
        const data: TUserPreferences = {
            id: session?.user.preferences[0].id,
            notificationsEnabled: session?.user.preferences[0].notificationsEnabled,
            userId: session?.user.preferences[0].userId,
            theme: document.getElementsByTagName('html')[0].className === 'dark' ? 'light' : 'dark'
        }

        const updatedPreferences = await updateUserPreferences(session, data)

        await update({
            ...session,
            user: {
                ...session?.user,
                preferences: [{
                    id: session.user.preferences[0].id,
                    userId: session.user.preferences[0].userId,
                    notificationsEnabled: session.user.preferences[0].notificationsEnabled,
                    theme: updatedPreferences.theme
                }]
            }
        }).then((res) => {
            const theme = res?.user.preferences[0].theme
            if (theme) handleUpdateThemeUi(theme)
            window.location.reload()
        })
    }

    const handleUpdateThemeUi = (newTheme: string) => {
        setThemeUI(newTheme)
        document.getElementsByTagName('html')[0].className = ""
        document.getElementsByTagName('html')[0].classList.add(newTheme)
    }

    useEffect(() => handleUpdateThemeUi(session.user.preferences[0].theme), [])

    if (placement === "navbar") {
        return (
            <button className='hidden sm:flex items-center justify-center w-[35px] h-[35px] rounded-full bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-700 hover:text-primary-500 hover:dark:text-white'
                onClick={() => handleUpdateThemePreference()}
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