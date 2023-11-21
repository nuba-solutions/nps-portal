"use client"

import React from 'react'
import { useSidebarState } from '@/contexts/SidebarStateContext'
import { IoAmericanFootball, IoApps, IoCard, IoDocumentText, IoMail, IoPizza, IoWine } from 'react-icons/io5'
import SidebarListItem from '@/components/ui/listItems/SidebarListItem'

const Sidebar = () => {
    const {isSidebarOpen, setIsSidebarOpen } = useSidebarState()

    return (
        <aside className={`z-10 transition-transform fixed top-[80px] ${isSidebarOpen ? 'left-0' : '-left-full -translate-x-full'} lg:sticky lg:translate-x-0 lg:left-0 w-[250px] h-[calc(100vh-80px)] pt-3 transition-[width] bg-white dark:bg-slate-800 border-r border-slate-300 dark:border-slate-700`} aria-label="Sidebar">
            <ul className="space-y-2 font-medium px-3">
                <SidebarListItem name='Dashboard' iconLeft={<IoApps/>} link='/dashboard' setIsSidebarOpen={setIsSidebarOpen}/>
            </ul>
            <hr className="h-px my-3 border border-slate-200 dark:border-slate-700 mx-3"></hr>
            <ul className="space-y-2 font-medium px-3">
                <SidebarListItem name='Open Charges' iconLeft={<IoCard/>} link='/charges/open' setIsSidebarOpen={setIsSidebarOpen}/>
                <SidebarListItem name='Charges History' iconLeft={<IoDocumentText/>} link='/charges/history' setIsSidebarOpen={setIsSidebarOpen}/>
            </ul>
            <hr className="h-px my-3 border border-slate-200 dark:border-slate-700 mx-3"></hr>
            <ul className="space-y-2 font-medium px-3">
                <SidebarListItem name='Messages' link="/messages" iconLeft={<IoMail/>} count={2} setIsSidebarOpen={setIsSidebarOpen}/>
            </ul>
            {/* <hr className="h-px my-3 border border-slate-200 dark:border-slate-700 mx-3"></hr>
            <ul className="space-y-2 font-medium px-3">
                <SidebarListItem name='Buttons' link="/components/buttons" iconLeft={<IoAmericanFootball/>} setIsSidebarOpen={setIsSidebarOpen}/>
                <SidebarListItem name='Inputs' link="/components/inputs" iconLeft={<IoPizza/>} setIsSidebarOpen={setIsSidebarOpen}/>
                <SidebarListItem name='Toasts' link="/components/toasts" iconLeft={<IoWine/>} setIsSidebarOpen={setIsSidebarOpen}/>
            </ul> */}
        </aside>
    )
}

export default Sidebar