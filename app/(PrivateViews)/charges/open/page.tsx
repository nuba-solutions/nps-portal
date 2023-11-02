import React from 'react'
import PrivateLayout from '../../_layout'
import {
	dehydrate,
	HydrationBoundary,
	QueryClient
} from "@tanstack/react-query"
import ChargesList from '@/app/sections/charges/open/ChargesList'
import { getCharges } from '@/query_functions/charges'


const OpenCharges = async () => {
	const queryClient = new QueryClient()
	await queryClient.prefetchQuery({
		queryKey: ['charges'],
		queryFn: getCharges
	})

    return (
        <PrivateLayout>
            <section className='p-4 flex-1'>
                <h1 className="page-heading text-primary-500 dark:text-primary-400 mt-2">Open Charges Page</h1>
                <hr className='h-px my-4 bg-slate-200 border-0 dark:bg-slate-700'/>
				<HydrationBoundary state={dehydrate(queryClient)}>
					<ChargesList/>
				</HydrationBoundary>

            </section>
        </PrivateLayout>
    )
}

export default OpenCharges
