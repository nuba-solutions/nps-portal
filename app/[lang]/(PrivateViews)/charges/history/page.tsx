import React from 'react'
import PrivateLayout from '../../_layout'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { getInvoices } from '@/query_functions/invoices'
import InvoicesTableContainer from '@/components/sections/invoices/InvoicesTableContainer'
import { getDictionary } from '@/utils/dictionaries'

const ChargesHistory = async ({ params: {lang}}: { params: { lang: Locale } }) => {
    const dict = await getDictionary(lang as any)

    const queryClient = new QueryClient()
	await queryClient.prefetchQuery({
		queryKey: ['all_invoices'],
		queryFn: () => getInvoices('')
	})

    return (
        <PrivateLayout>
            <section className='p-4 flex-1 overflow-hidden'>
				<HydrationBoundary state={dehydrate(queryClient)}>
                    <InvoicesTableContainer dict={dict}/>
				</HydrationBoundary>
            </section>
        </PrivateLayout>
    )
}

export default ChargesHistory