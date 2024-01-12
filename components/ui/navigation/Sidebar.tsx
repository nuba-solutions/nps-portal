"use client"

import React, { useEffect } from 'react'
import { useSidebarState } from '@/contexts/SidebarStateContext'
import SidebarListItem from '@/components/ui/listItems/SidebarListItem'
import { getSidebarLeftIcon } from '@/utils/sidebar_helpers'
import { useNotificationsContext } from '@/contexts/NotificationsContext'

const Sidebar = ({menus, userNotificationsCount}: Partial<TClientProvider>) => {
    const { isSidebarOpen, setIsSidebarOpen } = useSidebarState()
    const { notificationsCount, setNotificationsCount } = useNotificationsContext()
    useEffect(() => setNotificationsCount(userNotificationsCount), [])
    // TODO: Create a count context for both notifications and messages
    const messagesCount = 0;

    return (
        <aside className={`z-10 transition-transform fixed top-[80px] ${isSidebarOpen ? 'left-0' : '-left-full -translate-x-full'} lg:sticky lg:translate-x-0 lg:left-0 w-[250px] h-[calc(100vh-80px)] pt-3 transition-[width] bg-white dark:bg-slate-800 border-r border-slate-300 dark:border-slate-700`} aria-label="Sidebar">
            <div className='h-full pb-10 overflow-auto'>
                {
                    menus?.map((group, idx) => (
                        <React.Fragment key={idx} >
                            <ul className="space-y-2 font-medium px-3">
                                {
                                    group.items.map((item) => (
                                        <SidebarListItem key={item.url} name={item.name} iconLeft={getSidebarLeftIcon(item.url)} link={item.url} setIsSidebarOpen={setIsSidebarOpen}
                                            count={item.name === "Notifications" ? notificationsCount : item.name === "Messages" ? messagesCount : undefined}
                                        />
                                    ))
                                }
                            </ul>
                            {
                                idx < menus.length -1 ? (
                                    <hr className="h-px my-3 border border-slate-200 dark:border-slate-700 mx-3"></hr>
                                ) : null
                            }
                        </React.Fragment>
                    ))
                }
            </div>
        </aside>
    )
}

export default Sidebar