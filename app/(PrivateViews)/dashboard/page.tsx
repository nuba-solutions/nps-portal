import React from 'react'
import PrivateLayout from '../_layout'
import PageHeading from '@/components/ui/headings/PageHeading'
import Learn3Preferences from '@/app/sections/learn3/Learn3Preferences'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getClientProviderPageInfo, getUserClientProvider } from '@/utils/theme_providers'

const page = async () => {
    const session = await getServerSession(authOptions)
    const client_provider = await getUserClientProvider(session?.user.client_provider)
    const page = await getClientProviderPageInfo(session?.user.client_provider, 'dashboard')

    return (
        <PrivateLayout>
            <Learn3Preferences learn3Links={client_provider?.learn3Links}/>
            <section className='p-4 flex-1'>
                <PageHeading description={page?.page_info.description || 'Page description'} title={page?.page_info.title || 'Page Title'}/>
                <hr className='h-px my-4 bg-slate-200 border-0 dark:bg-slate-700'/>
            </section>
        </PrivateLayout>
    )
}

export default page
