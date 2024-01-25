"use client"

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getUserNotifications } from '@/query_functions/notifications'
import NotificationCard from '@/components/ui/cards/NotificationsCard'
import { Session } from 'next-auth'
import { Locale } from '@/i18n.config'

type TNotificationsListProps = {
    user_id: string | number | undefined
    session: Session
    dict: any
    lang: Locale
}

const NotificationsList = ({session, user_id, dict, lang}: TNotificationsListProps) => {
    const { data: notifications, isPending } = useQuery({
        queryKey: ['notifications'],
        queryFn: () => getUserNotifications(user_id),
        refetchOnWindowFocus: true
    })

    if (isPending) {
        return <span>Loading...</span>
    }

    return (
        <div className="max-w-5xl w-full flex flex-col">
            {
                Array.isArray(notifications) && notifications.length > 0 ? (
                    <ul className='pb-4 gap-4 flex flex-col'>
                        {
                            notifications?.map((notification: TNotification) => (
                                <NotificationCard
                                    notification={notification}
                                    key={notification?.id}
                                    session={session as Session}
                                    dict={dict}
                                    lang={lang}
                                />
                            ))
                        }
                    </ul>
                ) : (
                    <div className='whitespace-nowrap'>
                        <p className='font-semibold text-base'>{dict.notifications["empty_title"]}</p>
                        <p className='text-sm opacity-80'>{dict.notifications["empty_description"]}</p>
                    </div>
                )
            }
        </div>
    )
}

export default NotificationsList