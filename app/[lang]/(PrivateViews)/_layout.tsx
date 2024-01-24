import { MainNav } from '@/components/ui/navigation/MainNav'
import type { Metadata } from 'next'
import { SidebarStateContextProvider } from '@/contexts/SidebarStateContext'
import { Learn3StateContextProvider } from '@/contexts/Learn3StateContext'
import Sidebar from '@/components/ui/navigation/Sidebar'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getUserClientProvider } from '@/utils/theme_providers'
import { redirect } from 'next/navigation'
import { NotificationsStateContextProvider } from '@/contexts/NotificationsContext'
import { getUserNotifications } from '@/query_functions/notifications'
import { BackdropContextProvider } from '@/contexts/BackdropContext'
import BlurBackdrop from '@/components/ui/backdrop/BlurBackdrop'

export const metadata: Metadata = {
	title: 'Nuba Nvoicex - Client Portal',
	description: 'Payments API',
}

export default async function PrivateLayout({
  	children,
}: {
  	children: React.ReactNode
}) {
	const session = await getServerSession(authOptions)
	if (!session?.user) redirect('/')

	const client_provider = await getUserClientProvider(session?.user.client_provider)

	const notifications = await getUserNotifications(session?.user.id)

	return (
		<BackdropContextProvider>
			<SidebarStateContextProvider>
				<Learn3StateContextProvider>
					<NotificationsStateContextProvider>
						<header>
							<MainNav notifications={notifications}/>
						</header>
						<main className="relative top-[80px] flex w-full">
							<Sidebar menus={client_provider?.menus} userNotificationsCount={notifications.length}/>
							{children}
						</main>
					</NotificationsStateContextProvider>
				</Learn3StateContextProvider>
			</SidebarStateContextProvider>
			<BlurBackdrop/>
		</BackdropContextProvider>
	)
}