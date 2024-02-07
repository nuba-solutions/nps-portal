import React from 'react'
import PrivateLayout from '../../_layout'
import PageHeading from '@/components/ui/headings/PageHeading'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getInvoicesByStatus } from '@/query_functions/invoices'
import axios, { AxiosHeaderValue } from 'axios'
import ChargesList from '@/components/sections/charges/open/ChargesList'
import { getCharges } from '@/query_functions/charges'

const page = async () => {
    const queryClient = new QueryClient()
	await queryClient.prefetchQuery({
		queryKey: ['charges'],
		queryFn: () => getCharges()
	})

    return (
        <PrivateLayout>
            <section className='p-4 flex-1'>
                <PageHeading description="Test page" title="Charges"/>
                <hr className='h-px my-4 bg-slate-200 border-0 dark:bg-slate-700'/>

                <HydrationBoundary state={dehydrate(queryClient)}>
                    <ChargesList />
				</HydrationBoundary>
            </section>
        </PrivateLayout>
    )
}

export default page