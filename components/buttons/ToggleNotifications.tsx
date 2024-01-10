"use client"

import { updateUserNotifications } from '@/utils/update_user'
import { Switch } from '@headlessui/react'
import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'

type TSwitchProps = {
    sz?: 'xs' | 'sm' | 'lg' | 'xl'
    session: Session
}

const ToggleNotifications = ({sz, session} : TSwitchProps) => {
    const [isUpdating, setIsUpdating] = useState(false)
    const [enabled, setEnabled] = useState<boolean>(session?.user.notificationsEnabled)

    const { update } = useSession()

    const handleUpdateNotificationsPreference = async () => {
        setIsUpdating(true)

        const data: Partial<TUser> = {
            id: parseInt(session?.user.id),
            email: session?.user.email as string,
            name: session?.user.name as string,
            notificationsEnabled: !enabled,
            theme: session?.user.theme
        }

        const updatedUser = await updateUserNotifications(session, data)

        await update({
            ...session,
            user: {
                ...session?.user,
                notificationsEnabled: updatedUser.data.notificationsEnabled,
            }
        }).then((res) => {
            window.location.reload()
            setIsUpdating(false)
        })
    }

    let handleSizeClasses, containerSizeClasses, translateClass;
    switch (sz) {
        case 'xs':
            handleSizeClasses = 'h-[14px] w-[14px]'
            containerSizeClasses = 'h-[18px] w-[38px]'
            translateClass = 'translate-x-5'
            break
        case 'sm':
            handleSizeClasses = 'h-[18px] w-[18px]'
            containerSizeClasses = 'h-[22px] w-[42px]'
            translateClass = 'translate-x-5'
            break
        case 'lg':
            handleSizeClasses = 'h-[28px] w-[28px]'
            containerSizeClasses = 'h-[32px] w-[64px]'
            translateClass = 'translate-x-8'
            break
        case 'xl':
            handleSizeClasses = 'h-[32px] w-[32px]'
            containerSizeClasses = 'h-[36px] w-[72px]'
            translateClass = 'translate-x-9'
            break
        default:
            handleSizeClasses = 'h-[22px] w-[22px]'
            containerSizeClasses = 'h-[26px] w-[46px]'
            translateClass = 'translate-x-5'
            break
    }

    return (
        <div className='flex gap-2 items-center'>
            <p className='font-semibold uppercase'>{enabled ? 'ON' : 'OFF'}</p>
            <Switch
                disabled={isUpdating}
                checked={enabled}
                onChange={() => {
                    setEnabled(prev => !prev);
                    handleUpdateNotificationsPreference()
                }}
                className={`${enabled ? 'bg-blue-500' : ' bg-slate-300 dark:bg-slate-600'} ${isUpdating ? 'opacity-50' : 'opacity-100'}
                relative inline-flex ${containerSizeClasses} shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white`}
            >
                <span className="sr-only">Toggle Notifications</span>
                <span
                    aria-hidden="true"
                    className={`${enabled ? translateClass : 'translate-x-0'}
                    pointer-events-none inline-block ${handleSizeClasses} transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
            </Switch>
        </div>
    )
}

export default ToggleNotifications