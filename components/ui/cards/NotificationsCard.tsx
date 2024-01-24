"use client"

import { deleteNotification } from '@/utils/notification_helpers'
import notify from '@/utils/notify'
import { Session } from 'next-auth'
import React from 'react'
import { IoTrash } from 'react-icons/io5'
import Button from '../buttons/Button'
import { formatLongDateLocale } from '@/utils/date_format_helpers'
import { Locale } from '@/i18n.config'

type TNotificationCardProps = {
    notification: TNotification
    session: Session
    dict: any
    lang: Locale
}

const NotificationCard = ({session, notification, dict, lang} : TNotificationCardProps) => {
    const { card: card_dictionary } = dict.pages.notifications.components
    const deleteUserNotification = async (id: any) => {
        const toastId = notify.loading({text: card_dictionary.notify['action']})

        try {
            const deletedNotification = await deleteNotification(session, id)
            if (!deletedNotification.success) {
                notify.error({
                    text: card_dictionary.notify['delete-error'],
                    id: toastId
                })
                return
            }

            notify.success({
                text: card_dictionary.notify['delete-success'],
                id: toastId
            })
            window.location.reload()
        } catch (error) {
            notify.error({
                text: dict.misc['error'],
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
                            <p className='text-xs text-slate-500 dark:text-slate-400'>{formatLongDateLocale(new Date(notification?.createdAt), lang)}</p>
                        </div>
                        <Button
                            sz='xs'
                            square
                            variant='destructive'
                            onClick={() => deleteUserNotification(notification.id)}
                        >
                            <IoTrash className="text-base"/>
                            <span className='sr-only'>{card_dictionary['delete-button']}</span>
                        </Button>
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