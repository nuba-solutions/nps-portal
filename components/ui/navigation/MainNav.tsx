import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import UserProfile from '../profiles/UserProfile'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import ToggleSidebarButton from '../../buttons/ToggleSidebarButton'
import ThemeSwitcherButton from '../../buttons/ThemeSwitcherButton'
import NotificationsButton from '../../buttons/NotificationsButton'

export const MainNav = async () => {
	const session = await getServerSession(authOptions)

	return (
		<nav className='fixed top-0 left-0 z-10 h-[80px] bg-white dark:bg-slate-800 border-b border-b-slate-300 dark:border-b-slate-700 flex items-center justify-between w-full px-2 lg:px-4'>
			<div className='flex items-center'>
				<ToggleSidebarButton/>
				<Link href={'/dashboard'} className='h-full flex items-center ml-2'>
					<Image
						src="/nvoicex.svg"
						alt="Nvoicex Logo"
						width={180}
						height={100}
						priority
						className='select-none dark:hidden'
					/>
					<Image
						src="/nvoicex-light.svg"
						alt="Nvoicex Logo"
						width={180}
						height={100}
						priority
						className='select-none hidden dark:block'
					/>
				</Link>
			</div>

			<div className='flex items-center gap-3'>
				<NotificationsButton/>
				<ThemeSwitcherButton/>
				<UserProfile user={session?.user}/>
			</div>
		</nav>
	)
}
