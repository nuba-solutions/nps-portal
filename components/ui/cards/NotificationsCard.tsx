"use client"

import { deleteNotification } from '@/utils/notification_helpers'
import notify from '@/utils/notify'
import format from 'date-fns/format'
import { Session } from 'next-auth'
import React from 'react'
import { IoTrash } from 'react-icons/io5'

type TNotificationCardProps = {
    notification: TNotification
    session: Session
}

const NotificationCard = ({session, notification} : TNotificationCardProps) => {
    const deleteUserNotification = async (id: any) => {
        const toastId = notify.loading({text: 'Deleting notification'})

        try {
            const deletedNotification = await deleteNotification(session, id)
            if (!deletedNotification.success) {
                notify.error({
                    text: 'Could not delete notification!',
                    id: toastId
                })
                return
            }

            notify.success({
                text: 'Notification deleted successfully!',
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
        <li>
            <div className='bg-white dark:bg-slate-800 rounded-lg md:rounded-xl w-full shadow-xl shadow-slate-400/10 dark:shadow-slate-950/50 pb-4 overflow-clip'>
                <div className='px-4 pt-4 flex flex-col'>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <p className='font-semibold'>{notification?.title}</p>
                            <p className='text-xs text-slate-500 dark:text-slate-400'>{format(new Date(notification?.createdAt), `MMMM dd, yyyy`)}</p>
                        </div>
                        <button className='p-2 bg-slate-200 dark:bg-slate-700 rounded-lg text-base hover:text-red-500'
                            onClick={() => deleteUserNotification(notification.id)}
                        >
                            <IoTrash/>
                            <span className='sr-only'>Remove notification</span>
                        </button>
                    </div>
                    <hr className="h-px my-4 border-gray-200 dark:border-slate-700"></hr>
                    <div className="flex items-center justify-between gap-5">
                        <div className="flex flex-col">
                            <p className='text-slate-500 dark:text-slate-400'>{notification?.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default NotificationCard