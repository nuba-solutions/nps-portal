import React from 'react'
import PrivateLayout from '../../_layout'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { getInvoices } from '@/query_functions/invoices'
import InvoicesTableContainer from '@/app/sections/invoices/InvoicesTableContainer'

const ChargesHistory = async () => {
    const queryClient = new QueryClient()
	await queryClient.prefetchQuery({
		queryKey: ['all_invoices'],
		queryFn: () => getInvoices('')
	})

    return (
        <PrivateLayout>
            <section className='p-4 flex-1 overflow-hidden'>
				<HydrationBoundary state={dehydrate(queryClient)}>
                    <InvoicesTableContainer />
				</HydrationBoundary>
            </section>
        </PrivateLayout>
    )
}

export default ChargesHistory