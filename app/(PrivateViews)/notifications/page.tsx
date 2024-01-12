import React from 'react'
import PageHeading from '@/components/ui/headings/PageHeading'
import { Session, getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getClientProviderPageInfo, getUserClientProvider } from '@/utils/theme_providers'
import Learn3Messages from '@/app/sections/learn3/Learn3Messages'
import PrivateLayout from '../_layout'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { getUserNotifications } from '@/query_functions/notifications'
import NotificationsList from '@/app/sections/notifications/NotificationsList'


const page = async () => {
    const session = await getServerSession(authOptions)
    const client_provider = await getUserClientProvider(session?.user.client_provider)
    const page = await getClientProviderPageInfo(session?.user.client_provider, 'notifications')

    const queryClient = new QueryClient()
	await queryClient.prefetchQuery({
		queryKey: ['notifications'],
		queryFn: () => getUserNotifications(session?.user.id),
	})

    return (
        <PrivateLayout>
            <Learn3Messages learn3Links={client_provider?.learn3Links}/>
            <section className='p-4 flex-1'>
                <PageHeading description={page?.page_info.description || 'Page description'} title={page?.page_info.title || 'Page Title'}/>
                <hr className='h-px my-4 bg-slate-200 border-0 dark:bg-slate-700'/>

                <HydrationBoundary state={dehydrate(queryClient)}>
                    <NotificationsList user_id={session?.user.id} session={session as Session}/>
				</HydrationBoundary>
            </section>
        </PrivateLayout>
    )
}

export default page