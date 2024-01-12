"use client"

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getUserNotifications } from '@/query_functions/notifications'
import NotificationCard from '@/components/ui/cards/NotificationsCard'
import Button from '@/components/ui/buttons/Button'
import { createNotification } from '@/utils/notification_helpers'
import { Session } from 'next-auth'
import notify from '@/utils/notify'

type TNotificationsListProps = {
    user_id: string | number | undefined
    session: Session
}

const NotificationsList = ({session, user_id}: TNotificationsListProps) => {
    const { data: notifications, error, isError, isPending } = useQuery({
        queryKey: ['notifications'],
        queryFn: () => getUserNotifications(user_id),
        refetchOnWindowFocus: true
    })

    if (isPending) {
        return <span>Loading...</span>
    }

    const createUserNotification = async () => {
        const toastId = notify.loading({text: 'Creating notification'})

        try {
            const notification: Partial<TNotification> = {
                userId: 1,
                title: 'Another Notification',
                description: 'This is a notification created via code 2.'
            }
            const createdNotification = await createNotification(session, notification)

            if (!createdNotification) {
                notify.error({
                    text: 'Could not create notification!',
                    id: toastId
                })
                return
            }
            notify.success({
                text: 'Notification created successfully!',
                id: toastId
            })
            window.location.reload()
        } catch (error) {
            notify.error({
                text: 'Something went wrong!',
                id: toastId
            })
        }
    }

    return (
        <div className="max-w-5xl w-full flex flex-col">
            <Button
                onClick={createUserNotification}
                className='mb-5'
            >
                Create Notification
            </Button>
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