"use client"

import React, { useEffect, useRef, useState } from 'react'
import { IoNotifications, IoOpen, IoTrash } from 'react-icons/io5'
import useComponentVisible from '@/hooks/useClickOutside'
import Link from 'next/link'
import Button from '../ui/buttons/Button'
import notify from '@/utils/notify'
import { deleteNotification } from '@/utils/notification_helpers'
import { Session } from 'next-auth'
import { useBackdropState } from '@/contexts/BackdropContext'
import { getDictionary } from '@/utils/dictionaries'
import { useParams } from 'next/navigation'

type TNotificationButtonProps = {
    session: Session
	notifications: TNotification[]
}

const NotificationsButton = ({session, notifications}: TNotificationButtonProps) => {
    const { lang } = useParams()
    const [dict, setDict] = useState<any>({})

    const getProfileDictionary = async () => {
        const { notifications } = await getDictionary(lang as any)
        setDict(notifications)
    }

    useEffect(() => {
        getProfileDictionary()
    }, [])

    const { setIsBackdropVisible } = useBackdropState()
	const notificationsRef = useRef<any>()
	const {
		isComponentVisible,
		setIsComponentVisible
	} = useComponentVisible(false, notificationsRef);

    const deleteUserNotification = async (id: any) => {
        const toastId = notify.loading({text: dict.notify["deleting"]})

        try {
            const deletedNotification = await deleteNotification(session, id)
            if (!deletedNotification.success) {
                notify.error({
                    text: dict.notify["delete_error"],
                    id: toastId
                })
                return
            }

            notify.success({
                text: dict.notify["delete_success"],
                id: toastId
            })
            window.location.reload()
        } catch (error) {
            notify.error({
                text: dict["error"],
                id: toastId
            })
        }
    }

	return (
		<div className='relative z-50'>
            <Button
                sz='xs'
                variant='light'
                circle
                onClick={() => {
                    setIsComponentVisible((prev: boolean) => !prev),
                    setIsBackdropVisible((prev: boolean) => !prev)
                }}
                className='shadow-none'
            >
                <div className="relative">
                    <IoNotifications className="text-base"/>
                    {
                        notifications?.length > 0 ? (
                            <span className='h-[8px] w-[8px] bg-red-500 absolute -top-[2px] right-0 rounded-full border border-slate-100 dark:border-slate-700'></span>
                        ) : null
                    }
                </div>
                <span className='sr-only'>{dict["view_all_button"]}</span>
            </Button>
            {
                isComponentVisible ? (
                    <div ref={notificationsRef} className='bg-white dark:bg-slate-700 rounded-xl pt-4 mt-2 shadow-xl border border-slate-300 dark:border-slate-600 absolute -right-24 w-fit max-w-[300px] sm:max-w-[330px] md:right-0'>
                        <div className="text-left px-6 whitespace-nowrap">
                            <h2 className='font-semibold text-base'>{dict["title"]}</h2>
                            <p className='text-xs text-slate-400'>{dict["subtitle"]}</p>
                        </div>
                        <hr className='h-px mt-4 px-6 border-slate-300 dark:border-slate-600'/>
                        {
                            Array.isArray(notifications) && notifications.length > 0 ? (
                                <ul className='px-2 py-4 max-w-[400px]'>
                                    {
                                        notifications?.map((notification: TNotification, idx: number) => (
                                            idx < 4 ? (
                                                <li
                                                    key={notification?.id}
                                                    className='w-full h-full px-3 rounded-lg'
                                                >
                                                    <div className='flex items-center justify-between gap-10 '>
                                                        <div className='w-[70%]'>
                                                            <div className="flex items-center gap-2">
                                                                <Link href={'/notifications'} className='font-semibold truncate'>{notification?.title}</Link>
                                                                <IoOpen className="text-xs"/>
                                                            </div>
                                                            <p className='text-xs truncate opacity-70'>{notification?.description}</p>
                                                        </div>
                                                        <Button
                                                            sz='xs'
                                                            square
                                                            variant='destructive'
                                                            className='shadow-none'
                                                            onClick={() => deleteUserNotification(notification.id)}
                                                        >
                                                            <IoTrash className="text-base"/>
                                                            <span className='sr-only'>{dict["delete_notification"]}</span>
                                                        </Button>
                                                    </div>
                                                    {
                                                        idx < 3 && idx >= 0 ? (
                                                            <hr className='h-px border my-4 border-slate-200 dark:border-slate-600'/>
                                                        ) : null
                                                    }
                                                </li>
                                            ) : null
                                        ))
                                    }
                                    <li className='flex mt-5 px-2'>
                                        {
                                            notifications.length > 3 ? (
                                                <Button sz='sm' variant='info' link='/notifications' className='w-full'>
                                                    {dict["view_all_button"]}
                                                </Button>
                                            ) : null
                                        }
                                    </li>
                                </ul>
                            ) : (
                                <div className='px-5 py-4 whitespace-nowrap'>
                                    <p className='font-semibold'>{dict["empty_title"]}</p>
                                    <p className='text-xs text-slate-400'>{dict["empty_description"]}</p>
                                    <span className='flex items-center gap-2 mt-4 whitespace-normal'>
                                        <p className='text-xs'>{dict["empty_marker"]}</p>
                                        <span className='h-[8px] w-[8px] bg-red-500 rounded-full'></span>
                                    </span>
                                </div>
                            )
                        }
                    </div>
                ) : null
            }
        </div>
	)
}

export default NotificationsButton
