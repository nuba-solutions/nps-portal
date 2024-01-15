import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getUserClientProvider } from '@/utils/theme_providers'
import PrivateLayout from '../_layout'
import Image from 'next/image'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { getInvoices } from '@/query_functions/invoices'
import StatsSection from '@/app/sections/dashboard/StatsSection'

const page = async () => {
    const session = await getServerSession(authOptions)
    const client_provider = await getUserClientProvider(session?.user.client_provider)

    const queryClient = new QueryClient()
	await queryClient.prefetchQuery({
		queryKey: ['invoices'],
		queryFn: () => getInvoices('open')
	})

    return (
        <PrivateLayout>
            <section className='p-4 flex-1'>

                <div className="flex flex-col gap-4">
                    <div className='bg-gradient-to-r from-primary-400 via-primary-500 to-primary-700 rounded-lg md:rounded-xl shadow-xl shadow-slate-400/10 dark:shadow-slate-950/50 overflow-clip'>
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                            <div className={`p-8 ${client_provider?.name === 'warrior_allegiance' ? 'text-slate-800' : 'text-white'} `}>
                                <p>Hello👋</p>
                                <p className='text-2xl font-semibold'>{session?.user.name}</p>
                                <p className='mt-8 font-semibold text-base xl:text-xl'>Welcome to your Nvoicex Dashboard</p>
                                <p>Here you can check your current standings and recent activities.</p>
                            </div>
                            <div className="relative">
                                <Image
                                    src={`${client_provider?.name === "warrior_allegiance" ? '/nvoicex-dark.svg' : '/nvoicex-white.svg'}`}
                                    alt=''
                                    width={250}
                                    height={200}
                                    className='hidden lg:block max-w-full mr-20'
                                />
                            </div>
                        </div>
                    </div>

                    <HydrationBoundary state={dehydrate(queryClient)}>
                        <StatsSection />
                    </HydrationBoundary>
                </div>
            </section>
        </PrivateLayout>
    )
}

export default page
