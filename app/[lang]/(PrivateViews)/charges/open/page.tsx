import React from 'react'
import InvoicesList from '@/components/sections/invoices/InvoicesList'
import { getInvoicesByStatus } from '@/query_functions/invoices'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import PageHeading from '@/components/ui/headings/PageHeading'
import PrivateLayout from '../../_layout'
import { getDictionary } from '@/utils/dictionaries'
import { Locale } from '@/i18n.config'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const OpenCharges = async ({ params: {lang}}: { params: { lang: Locale } }) => {
    const session = await getServerSession(authOptions)
    const dict = await getDictionary(lang)

    const queryClient = new QueryClient()
	await queryClient.prefetchQuery({
		queryKey: ['open_invoices'],
		queryFn: () => getInvoicesByStatus('open', session?.user.stripeId as string)
	})

    return (
        <PrivateLayout>
            <section className='p-4 flex-1'>
                <PageHeading description={dict.pages.open_charges["subtitle"]} title={dict.pages.open_charges["title"]}/>
                <hr className='h-px my-4 bg-slate-200 border-0 dark:bg-slate-700'/>

                <HydrationBoundary state={dehydrate(queryClient)}>
                    <InvoicesList dict={dict} lang={lang}/>
				</HydrationBoundary>
            </section>
        </PrivateLayout>
    )
}

export default OpenCharges
