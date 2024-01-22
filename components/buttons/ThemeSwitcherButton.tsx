"use client"

import React, { useEffect, useState } from 'react'
import { IoMoon, IoSunny } from 'react-icons/io5'
import { useSession } from 'next-auth/react'
import { Session } from 'next-auth'
import { updateUserTheme } from '@/utils/update_user'
import Button from '../ui/buttons/Button'
import { useParams } from 'next/navigation'
import { getDictionary } from '@/utils/dictionaries'

type TThemeSwitcherProps = {
    session: Session
    placement: "navbar" | "profile" | "account"
}

const ThemeSwitcherButton = ({session, placement}: TThemeSwitcherProps) => {
    const { lang } = useParams()
    const [dict, setDict] = useState<any>({})

    const getProfileDictionary = async () => {
        const { profile } = await getDictionary(lang as any)
        setDict(profile)
    }

    useEffect(() => {
        getProfileDictionary()
    }, [])

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
            <Button
                sz='xs'
                variant='light'
                circle
                onClick={() => handleUpdateThemePreference()}
                disabled={isUpdating}
                className='shadow-none'
            >
                {
                    themeUI === 'dark' ? (
                        <IoSunny className="text-base"/>
                    ) : (
                        <IoMoon className="text-base"/>
                    )
                }
                <span className='sr-only'>{dict['change-theme']}</span>
            </Button>
        )
    }

    if (placement === "account") {
        return (
            <div className={`flex gap-2 items-center ${isUpdating ? 'opacity-50' : 'opacity-100'}`}>
                <p className='font-semibold text-right hidden sm:block'>{themeUI === 'dark' ? dict["switch_light"] : dict["switch_dark"]}</p>
                <Button
                    sz='xs'
                    variant='info'
                    square
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
                    <span className='sr-only'>{dict['change-theme']}</span>
                </Button>
            </div>
        )
    }

    return (
        <button className='flex sm:hidden items-center justify-between w-full h-full py-2 px-3 rounded-lg hover:bg-slate-100 hover:dark:bg-slate-900 hover:text-primary-500'
            onClick={() => handleUpdateThemePreference()}
        >
            {dict['change-theme']}
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