import React from 'react'
import PrivateLayout from '../../_layout'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { getAllInvoices } from '@/query_functions/invoices'
import InvoicesTableContainer from '@/components/sections/invoices/InvoicesTableContainer'
import { getDictionary } from '@/utils/dictionaries'
import { Locale } from '@/i18n.config'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const ChargesHistory = async ({ params: {lang}}: { params: { lang: Locale } }) => {
    const session = await getServerSession(authOptions)
    const dict = await getDictionary(lang)

    const queryClient = new QueryClient()
	await queryClient.prefetchQuery({
		queryKey: ['all_invoices'],
        staleTime: 1000,
		queryFn: () => getAllInvoices(session?.user.stripeId as string)
	})

    return (
        <PrivateLayout>
            <section className='p-4 flex-1 overflow-hidden'>
				<HydrationBoundary state={dehydrate(queryClient)}>
                    <InvoicesTableContainer dict={dict} lang={lang}/>
				</HydrationBoundary>
            </section>
        </PrivateLayout>
    )
}

export default ChargesHistory