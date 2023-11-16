import React from 'react'
import PrivateLayout from '../../_layout'
import InvoicesList from '@/app/sections/invoices/InvoicesList'
import { getInvoices } from '@/query_functions/invoices'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import PageHeading from '@/components/ui/headings/PageHeading'

const OpenCharges = async () => {
    const queryClient = new QueryClient()
	await queryClient.prefetchQuery({
		queryKey: ['invoices'],
		queryFn: () => getInvoices('open')
	})

    return (
        <PrivateLayout>
            <section className='p-4 flex-1'>
                <PageHeading title='Open Charges' subtitle='Your pending payments'/>
                <hr className='h-px my-4 bg-slate-200 border-0 dark:bg-slate-700'/>
                <HydrationBoundary state={dehydrate(queryClient)}>
                    <InvoicesList status='open'/>
				</HydrationBoundary>
            </section>
        </PrivateLayout>
    )
}

export default OpenCharges
