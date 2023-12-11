import React from 'react'
import PrivateLayout from '../../_layout'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { getInvoices } from '@/query_functions/invoices'
import InvoicesTableContainer from '@/app/sections/invoices/InvoicesTableContainer'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getClientProviderPageInfo } from '@/utils/theme_providers'

const ChargesHistory = async () => {
    const session = await getServerSession(authOptions)
    const page = await getClientProviderPageInfo(session?.user.client_provider, 'charges/history')

    const queryClient = new QueryClient()
	await queryClient.prefetchQuery({
		queryKey: ['all_invoices'],
		queryFn: () => getInvoices('')
	})

    return (
        <PrivateLayout>
            <section className='p-4 flex-1 overflow-hidden'>
				<HydrationBoundary state={dehydrate(queryClient)}>
                    <InvoicesTableContainer page={page}/>
				</HydrationBoundary>
            </section>
        </PrivateLayout>
    )
}

export default ChargesHistory