import React from 'react'
import PageHeading from '@/components/ui/headings/PageHeading'
import { Session, getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getUserClientProvider } from '@/utils/theme_providers'
import Learn3Messages from '@/components/sections/learn3/Learn3Messages'
import PrivateLayout from '../_layout'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { getUserNotifications } from '@/query_functions/notifications'
import NotificationsList from '@/components/sections/notifications/NotificationsList'
import { getDictionary } from '../../../../utils/dictionaries'
import { Locale } from '@/i18n.config'


const page = async ({ params: {lang}}: { params: { lang: Locale } }) => {
    const dict = await getDictionary(lang)
    const session = await getServerSession(authOptions)
    const client_provider = await getUserClientProvider(session?.user.client_provider)

    const queryClient = new QueryClient()
	await queryClient.prefetchQuery({
		queryKey: ['notifications'],
		queryFn: () => getUserNotifications(session?.user.id),
	})

    return (
        <PrivateLayout>
            <Learn3Messages learn3Links={client_provider?.learn3Links}/>
            <section className='p-4 flex-1'>
                <PageHeading description={dict.pages.notifications["subtitle"]} title={dict.pages.notifications["title"]}/>
                <hr className='h-px my-4 bg-slate-200 border-0 dark:bg-slate-700'/>

                <HydrationBoundary state={dehydrate(queryClient)}>
                    <NotificationsList user_id={session?.user.id} session={session as Session} dict={dict} lang={lang}/>
				</HydrationBoundary>
            </section>
        </PrivateLayout>
    )
}

export default page