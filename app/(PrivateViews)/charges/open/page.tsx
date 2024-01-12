import React from 'react'
import InvoicesList from '@/app/sections/invoices/InvoicesList'
import { getInvoices } from '@/query_functions/invoices'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import PageHeading from '@/components/ui/headings/PageHeading'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getClientProviderPageInfo } from '@/utils/theme_providers'
import PrivateLayout from '../../_layout'

const OpenCharges = async () => {
    const session = await getServerSession(authOptions)
    const page = await getClientProviderPageInfo(session?.user.client_provider, 'charges/open')

    const queryClient = new QueryClient()
	await queryClient.prefetchQuery({
		queryKey: ['invoices'],
		queryFn: () => getInvoices('open')
	})

    return (
        <PrivateLayout>
            <section className='p-4 flex-1'>
                <PageHeading description={page?.page_info.description || 'Page description'} title={page?.page_info.title || 'Page Title'}/>
                <hr className='h-px my-4 bg-slate-200 border-0 dark:bg-slate-700'/>

                <HydrationBoundary state={dehydrate(queryClient)}>
                    <InvoicesList status='open'/>
				</HydrationBoundary>
            </section>
        </PrivateLayout>
    )
}

export default OpenCharges
