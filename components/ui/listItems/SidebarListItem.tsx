import { useWindowSize } from "@/hooks/useWindowSize"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { SetStateAction, useState } from "react"
import { IoChevronDown, IoChevronUp } from "react-icons/io5"

type TSidebarListItemProps = {
    children?: React.ReactNode
    onClick?: () => void | React.Dispatch<SetStateAction<boolean>>
    setIsSidebarOpen?: React.Dispatch<SetStateAction<boolean>>
    link?: string
    notification?: boolean
    name: string
    iconLeft?: React.ReactNode
    iconRight?: React.ReactNode
    rightText?: string
    count?: number
    dropdown?: boolean
    classes?: string
}

const SidebarListItem: React.FC<TSidebarListItemProps> = ({children, name, onClick, link, iconLeft, iconRight, rightText, count, dropdown, classes, setIsSidebarOpen}) => {
    const path = usePathname();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const screenSize = useWindowSize() as any

    return (
        <li className='relative'>
            {link ? (
                <>
                    <Link
                        onClick={() => {
                            onClick;
                            setIsSidebarOpen ? setIsSidebarOpen(prev => !prev) : ''
                        }}
                        href={link}
                        className={`relative select-none cursor-pointer flex items-center justify-between h-[45px] px-[.89rem] rounded-lg ${isDropdownOpen ? 'rounded-b-none bg-slate-100 dark:bg-slate-700' : 'bg-none'} hover:bg-slate-100 dark:hover:bg-slate-700 ${path == `${link}` ? "active" : "text-inherit"} ${classes ?  classes : ''}`}
                    >
                        <div className="flex items-center">
                            {
                                iconLeft ? (
                                    <div className="text-lg relative text-slate-400 dark:text-slate-500">
                                        {iconLeft}
                                    </div>
                                ) : ('')
                            }
                            <span className="ml-2">{name}</span>
                        </div>
                        <div className="flex items-center">
                            {
                                rightText ? (
                                    <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium bg-slate-200 text-slate-600 dark:text-slate-100 rounded-full dark:bg-slate-700">{rightText}</span>
                                ) : ('')
                            }
                            {
                                count ? (
                                    <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-xs font-medium text-white rounded-full bg-red-500 dark:bg-red-500/90">{count > 10 ? '10+' : count}</span>
                                ) : ('')
                            }
                            {
                                iconRight ? (
                                    <div className="text-slate-300 dark:text-slate-500 ml-2 text-lg">
                                        {iconRight}
                                    </div>
                                ) : ('')
                            }
                        </div>
                        {
                            path == `${link}` ? (
                                <span className="w-2.5 h-2.5 rounded-full bg-primary-500 absolute -right-1 ring-4 ring-white dark:ring-slate-800"></span>
                            ) : null
                        }
                    </Link>
                </>
            ) : (
                    <>
                        <span
                            onClick={!dropdown? onClick : () => setIsDropdownOpen(prev => !prev)}
                            onMouseEnter={() => screenSize >= 1024 && setIsDropdownOpen(true)}
                            onMouseLeave={() => screenSize >= 1024 && setIsDropdownOpen(false)}
                            className={`select-none cursor-pointer flex justify-between items-center h-[45px] px-[.89rem] rounded-lg ${isDropdownOpen && dropdown ? 'rounded-b-none bg-slate-100 dark:bg-slate-700': 'bg-none'} hover:bg-slate-100 dark:hover:bg-slate-700`}>
                            <div className="flex items-center">
                                {
                                    iconLeft ? (
                                        <div className="text-lg relative text-slate-400 dark:text-slate-500">
                                            {iconLeft}
                                        </div>
                                    ) : ('')
                                }
                                <span className="ml-2">{name}</span>
                            </div>
                            <div className="flex items-center">
                                {
                                    rightText ? (
                                        <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium bg-slate-200 text-slate-600 dark:text-slate-100 rounded-full dark:bg-slate-700">{rightText}</span>
                                    ) : ('')
                                }
                                {
                                    count ? (
                                        <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-xs font-medium text-white rounded-full bg-red-500">{count < 10 ? count : `9+`}</span>
                                    ) : ('')
                                }
                                {
                                    iconRight && !dropdown? (
                                        <div className="text-slate-400 dark:text-slate-400 ml-2 text-lg">
                                            {iconRight}
                                        </div>
                                    ) : ('')
                                }
                                {
                                    dropdown ? (
                                        <div className="text-slate-500 dark:text-slate-400 ml-2 text-lg">
                                            {isDropdownOpen ? <IoChevronUp/> : <IoChevronDown/>}
                                        </div>
                                    ) : ('')
                                }
                            </div>
                        </span>
                        {dropdown ? (
                            <div
                                className={`${isDropdownOpen ? 'opacity-1 absolute w-full z-50 delay-100' : 'w-0 h-0 opacity-0'} transition-opacity`}
                                onMouseEnter={() => setIsDropdownOpen(true)}
                                onMouseLeave={() => setIsDropdownOpen(false)}
                            >
                                {children}
                            </div>
                        ) : ''}
                    </>
                )
            }
        </li>
    )
}

export default SidebarListItem