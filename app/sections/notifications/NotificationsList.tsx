"use client"

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getUserNotifications } from '@/query_functions/notifications'
import NotificationCard from '@/components/ui/cards/NotificationsCard'
import { Session } from 'next-auth'

type TNotificationsListProps = {
    user_id: string | number | undefined
    session: Session
}

const NotificationsList = ({session, user_id}: TNotificationsListProps) => {
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
                                />
                            ))
                        }
                    </ul>
                ) : (
                    <div className='whitespace-nowrap'>
                        <p className='font-semibold'>Nothing new to see here!</p>
                        <p className='text-sm'>You have <strong>NO</strong> notifications at this time.</p>
                    </div>
                )
            }
        </div>
    )
}

export default NotificationsList