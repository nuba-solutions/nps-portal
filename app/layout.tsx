import './globals.css'
import './styles/helpers.css'
import './styles/buttons.css'
import './styles/inputs.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import Provider from '@/lib/providers'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '900'] })

export const metadata: Metadata = {
	title: 'Nuba Nvoicex - Client Portal',
	description: 'Payments API',
}

export default async function RootLayout({
  	children,
}: {
  	children: React.ReactNode
}) {
	const session = await getServerSession(authOptions)
	const theme = session?.user.preferences[0].theme

	return (
		<html lang="en" className={`${theme}`}>
			<body className={`${poppins.className} bg-slate-50 dark:bg-slate-900 h-full w-full overflow-x-hidden`}>
				<Provider>
					{children}
				</Provider>
				<Toaster />
			</body>
		</html>
	)
}
