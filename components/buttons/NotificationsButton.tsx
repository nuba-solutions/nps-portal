"use client"

import React, { FC, useRef } from 'react'
import { IoNotifications, IoOpen, IoTrash } from 'react-icons/io5'
import useComponentVisible from '@/hooks/useClickOutside'
import Link from 'next/link'

type TNotification = {
    id: string | number
    title: string
    description: string
}

const NotificationsButton = () => {
	const notificationsRef = useRef<any>()
	const {
		isComponentVisible,
		setIsComponentVisible
	} = useComponentVisible(false, notificationsRef);

    const notifications: TNotification[] = [
        {
            id: 1,
            title: "Payment due",
            description: "You have a new payment due on 10/25/2023"
        },
        {
            id: 2,
            title: "Information requested",
            description: "Please provide missing documents."
        },
        {
            id: 3,
            title: "Credit card expiration",
            description: "Your credit card is about to expire."
        },
        {
            id: 4,
            title: "A long notification",
            description: "This is an example of a very long notification description to illustrate how it would look like when such thing happens."
        },
    ]

	return (
		<div className='relative z-50'>
                <button className='flex items-center justify-center w-[35px] h-[35px] rounded-full bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-700 hover:text-primary-500 hover:dark:text-white'
                    onClick={setIsComponentVisible}
                >
                    <div className="relative">
                        <IoNotifications className="text-base"/>
                        {
                            notifications?.length > 0 ? (
                                <span className='h-[8px] w-[8px] bg-red-500 absolute -top-[2px] right-0 rounded-full border border-slate-100 dark:border-slate-700'></span>
                            ) : null
                        }
                    </div>
                    <span className='sr-only'>Open notifications window</span>
                </button>
            {
                isComponentVisible ? (
                    <div ref={notificationsRef} className='bg-white dark:bg-slate-800 rounded-xl pt-4 mt-2 shadow-xl border border-slate-300 dark:border-slate-700 w-fit absolute -right-14 max-w-[300px] md:right-0'>
                        <div className="text-left px-6 whitespace-nowrap">
                            <h2 className='font-semibold text-base'>Notifications</h2>
                            <p className='text-sm text-slate-400'>Keep up with your latest events</p>
                        </div>
                        <hr className='h-px mt-4 px-6 border-slate-300 dark:border-slate-700'/>
                        {
                            Array.isArray(notifications) && notifications.length > 0 ? (
                                <ul className='px-2 py-4 max-w-[400px]'>
                                    {
                                        notifications?.map((notification: TNotification, idx: number) => (
                                            <li
                                                key={notification?.id}
                                                className='w-full h-full px-3 rounded-lg'
                                            >
                                                <div className='flex items-center justify-between gap-10 '>
                                                    <div className='w-[70%]'>
                                                        <div className="flex items-center gap-2">
                                                            <Link href={'/'} className='font-semibold truncate'>{notification?.title}</Link>
                                                            <IoOpen className="text-xs"/>
                                                        </div>
                                                        <p className='text-xs truncate opacity-70'>{notification?.description}</p>
                                                    </div>
                                                    <button className='p-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-base text-red-500 dark:text-red-500/80'>
                                                        <IoTrash/>
                                                        <span className='sr-only'>Remove notification</span>
                                                    </button>
                                                </div>
                                                {
                                                    idx < notifications.length -1 ? (
                                                        <hr className='h-px border my-4 border-slate-200 dark:border-slate-700'/>
                                                    ) : null
                                                }
                                            </li>
                                        ))
                                    }
                                </ul>
                            ) : (
                                <div className='px-5 py-4 whitespace-nowrap'>
                                    <p className='font-semibold'>Nothing to worry!</p>
                                    <p className='text-sm'>You have <strong>NO</strong> notifications at this time.</p>
                                    <span className='flex items-center gap-1 mt-4'>
                                        <p className='text-xs'>Come back whenever you see a red marker</p>
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
