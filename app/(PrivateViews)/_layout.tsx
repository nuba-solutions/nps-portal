import { MainNav } from '@/components/ui/navigation/MainNav'
import type { Metadata } from 'next'
import { SidebarStateContextProvider } from '@/contexts/SidebarStateContext'
import { Learn3StateContextProvider } from '@/contexts/Learn3StateContext'
import Sidebar from '@/components/ui/navigation/Sidebar'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getUserClientProvider } from '@/utils/theme_providers'

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
	const client_provider = await getUserClientProvider(session?.user.client_provider)

	return (
		<SidebarStateContextProvider>
			<Learn3StateContextProvider>
				<header>
					<MainNav/>
				</header>
				<main className="relative top-[80px] flex w-full">
					<Sidebar menus={client_provider?.menus}/>
					{children}
				</main>
			</Learn3StateContextProvider>
		</SidebarStateContextProvider>
	)
}