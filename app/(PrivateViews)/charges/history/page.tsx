import React from 'react'
import PrivateLayout from '../../_layout'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { getInvoices } from '@/query_functions/invoices'
import InvoicesTable from '@/app/sections/invoices/InvoicesTable'

const ChargesHistory = async () => {
    const queryClient = new QueryClient()
	await queryClient.prefetchQuery({
		queryKey: ['all_invoices'],
		queryFn: () => getInvoices('')
	})

    return (
        <PrivateLayout>
            <section className='p-4 flex-1'>
                <h1 className="page-heading text-primary-500 dark:text-primary-400 mt-2">Open Charges Page</h1>
                <hr className='h-px my-4 bg-slate-200 border-0 dark:bg-slate-700'/>
				<HydrationBoundary state={dehydrate(queryClient)}>
                    <InvoicesTable />
				</HydrationBoundary>
            </section>
        </PrivateLayout>
    )
}

export default ChargesHistory