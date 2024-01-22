import '../globals.css'
import '../styles/client_theme.css'
import '../styles/helpers.css'
import '../styles/buttons.css'
import '../styles/inputs.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import Provider from '@/lib/providers'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getUserClientProvider } from '@/utils/theme_providers'
import { Locale, i18n } from '@/i18n.config'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '900'] })

export const metadata: Metadata = {
	title: 'Nvoicex - Client Portal',
	description: 'Nuba Payments System',
}

export async function generateStaticParams() {
	return i18n.locales.map(locale => ({ lang: locale }))
}

export default async function RootLayout({
  	children,
	params
}: {
  	children: React.ReactNode
	params: { lang: Locale }
}) {
	const session = await getServerSession(authOptions)
	const theme = session?.user.theme || 'light'
	const client_provider = await getUserClientProvider(session?.user.client_provider)

	return (
		<html lang={params.lang} className={`${theme}`}>
			<body className={`${poppins.className} bg-slate-50 dark:bg-slate-900 h-full min-h-screen w-full overflow-x-hidden ${client_provider?.name as string || ''}`}>
				<Provider>
					{children}
				</Provider>
				<Toaster />
			</body>
		</html>
	)
}
