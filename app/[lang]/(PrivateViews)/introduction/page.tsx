import React from 'react'
import PageHeading from '@/components/ui/headings/PageHeading'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getUserClientProvider } from '@/utils/theme_providers'
import PrivateLayout from '../_layout'
import Learn3Introduction from '@/components/sections/learn3/Learn3Introduction'

const page = async () => {
    const session = await getServerSession(authOptions)
    const client_provider = await getUserClientProvider(session?.user.client_provider)

    return (
        <PrivateLayout>
            <Learn3Introduction learn3Links={client_provider?.learn3Links}/>
            <section className='p-4 flex-1'>
                <PageHeading description="Demo page" title="Introduction"/>
                <hr className='h-px my-4 bg-slate-200 border-0 dark:bg-slate-700'/>
            </section>
        </PrivateLayout>
    )
}

export default page