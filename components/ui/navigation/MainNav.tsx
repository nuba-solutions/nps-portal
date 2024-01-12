import React from 'react'
import UserProfile from '../profiles/UserProfile'
import { authOptions } from '@/lib/auth'
import { Session, getServerSession } from 'next-auth'
import ToggleSidebarButton from '../../buttons/ToggleSidebarButton'
import ThemeSwitcherButton from '../../buttons/ThemeSwitcherButton'
import NotificationsButton from '../../buttons/NotificationsButton'
import NavLogo from './NavLogo'
import { getUserClientProvider } from '@/utils/theme_providers'
import Learn3Button from '@/components/buttons/Learn3Button'

type TMainNavProps = {
	notifications: TNotification[]
}

export const MainNav = async ({notifications}: TMainNavProps) => {
	const session = await getServerSession(authOptions)
	const client_provider = await getUserClientProvider(session?.user.client_provider)

	return (
		<nav className='fixed top-0 left-0 z-50 h-[80px] bg-white dark:bg-slate-800 border-b border-b-slate-300 dark:border-b-slate-700 flex items-center justify-between w-full px-2 lg:px-4'>
			<div className='flex items-center'>
				<ToggleSidebarButton/>
				<NavLogo logo_url={client_provider?.logo_url}/>
			</div>

			<div className='flex items-center gap-2 md:gap-3'>
				{
					client_provider?.learn3Enabled ? (
						<Learn3Button />
					) : null
				}
				{
					session?.user.notificationsEnabled ? (
						<NotificationsButton notifications={notifications} session={session as Session}/>
					) : null
				}
				<ThemeSwitcherButton session={session as Session} placement={"navbar"}/>
				<UserProfile session={session as Session}/>
			</div>
		</nav>
	)
}
