import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getUserClientProvider } from '@/utils/theme_providers'
import PrivateLayout from '../_layout'
import Image from 'next/image'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { getInvoices } from '@/query_functions/invoices'
import StatsSection from '@/components/sections/dashboard/StatsSection'
import ChartSection from '@/components/sections/dashboard/ChartSection'
import { getDictionary } from '../../../../utils/dictionaries'
import { Locale } from '@/i18n.config'

const page = async ({ params: {lang}}: { params: { lang: Locale } }) => {
    const dict = await getDictionary(lang)
    const session = await getServerSession(authOptions)
    const client_provider = await getUserClientProvider(session?.user.client_provider)

    const queryClient = new QueryClient()
	await queryClient.prefetchQuery({
		queryKey: ['invoices'],
		queryFn: () => getInvoices('open')
	})

	await queryClient.prefetchQuery({
		queryKey: ['paid-invoices'],
		queryFn: () => getInvoices('paid')
	})

    return (
        <PrivateLayout>
            <section className='p-4 flex-1'>
                <div className="flex flex-col gap-4">
                    <div className='bg-gradient-to-r from-primary-400 via-primary-500 to-primary-700 rounded-lg md:rounded-xl shadow-xl shadow-slate-400/10 dark:shadow-slate-950/50 overflow-clip'>
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                            <div className={`p-4 md:p-8 ${client_provider?.name === 'warrior_allegiance' ? 'text-slate-800' : 'text-white'}`}>
                                <p>{dict.pages.dashboard['hello']}</p>
                                <p className='text-2xl font-semibold'>{session?.user.name}</p>
                                <p className='mt-4 md:mt-8 font-semibold text-base xl:text-lg'>{dict.pages.dashboard['welcome']} {client_provider?.display_name}</p>
                                <p className='opacity-80'>{dict.pages.dashboard['welcome-subtitle']}</p>
                            </div>
                            <div className='hidden md:block mr-10 text-right'>
                                <p className={`${client_provider?.name === 'warrior_allegiance' ? 'text-slate-800' : 'text-white'} text-xs`}>
                                    {dict.pages.dashboard['powered-by']}
                                </p>
                                <Image
                                    src={`${client_provider?.name === "warrior_allegiance" ? '/nvoicex/nvoicex-dark.svg' : '/nvoicex/nvoicex-white.svg'}`}
                                    alt='Nvoicex Logo'
                                    height={0}
                                    width={0}
                                    style={{ width:'200px', height: "auto" }}
                                />
                            </div>
                        </div>
                    </div>

                    <HydrationBoundary state={dehydrate(queryClient)}>
                        <StatsSection dict={dict}/>
                    </HydrationBoundary>

                    <HydrationBoundary state={dehydrate(queryClient)}>
                        <ChartSection provider={client_provider as any} theme={session?.user.theme} dict={dict} lang={lang}/>
                    </HydrationBoundary>
                </div>
            </section>
        </PrivateLayout>
    )
}

export default page
