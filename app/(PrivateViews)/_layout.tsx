import { MainNav } from '@/components/ui/navigation/MainNav'
import type { Metadata } from 'next'
import { SidebarStateContextProvider } from '@/contexts/SidebarStateContext'
import Sidebar from '@/components/ui/navigation/Sidebar'

export const metadata: Metadata = {
	title: 'Nuba Nvoicex - Client Portal',
	description: 'Payments API',
}

export default function PrivateLayout({
  	children,
}: {
  	children: React.ReactNode
}) {
	return (
		<>
			<SidebarStateContextProvider>
            	<header>
					<MainNav/>
				</header>
				<main className="relative top-[80px] flex w-full">
					<Sidebar/>
					{children}
				</main>
			</SidebarStateContextProvider>
        </>
	)
}