import React from 'react'
import PageHeading from '@/components/ui/headings/PageHeading'
import Learn3Preferences from '@/app/sections/learn3/Learn3Preferences'
import { getServerSession, Session } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getClientProviderPageInfo, getUserClientProvider } from '@/utils/theme_providers'
import PrivateLayout from '../_layout'
import ToggleNotifications from '@/components/buttons/ToggleNotifications'
import ThemeSwitcherButton from '@/components/buttons/ThemeSwitcherButton'
import AccountCard from '@/components/ui/cards/AccountCard'

const page = async () => {
    const session = await getServerSession(authOptions)
    const client_provider = await getUserClientProvider(session?.user.client_provider)
    const page = await getClientProviderPageInfo(session?.user.client_provider, 'account')

    return (
        <PrivateLayout>
            <Learn3Preferences learn3Links={client_provider?.learn3Links}/>
            <section className='p-4 flex-1'>
                <PageHeading description={page?.page_info.description || 'Page description'} title={page?.page_info.title || 'Page Title'}/>
                <hr className='h-px my-4 bg-slate-200 border-0 dark:bg-slate-700'/>

                <div className="max-w-5xl w-full flex flex-col gap-6">
                    <AccountCard session={session as Session}/>

                    <div className="bg-white dark:bg-slate-800 rounded-lg md:rounded-xl w-full shadow-xl shadow-slate-400/10 dark:shadow-slate-950/50 pb-4 overflow-clip">
                        <div className='bg-slate-200 dark:bg-slate-700 px-4 py-2 lg:py-3 flex flex-col border-b border-b-slate-300 dark:border-b-slate-600'>
                            <h2 className='text-base font-semibold'>Notifications</h2>
                        </div>

                        <div className='px-4 pt-4 flex flex-col'>
                            <div className="flex items-center justify-between gap-5">
                                <div className="flex flex-col">
                                    <p className='font-semibold'>Enable / Disable Notifications</p>
                                    <p className='text-slate-500 dark:text-slate-400'>Switch between receiving notifications.</p>
                                </div>
                                <ToggleNotifications session={session as Session}/>
                            </div>
                            <hr className="h-px my-4 border-gray-200 dark:border-slate-700"></hr>
                            <div className="flex flex-col">
                                <p className='text-slate-500 dark:text-slate-400'>You can manually toggle between enabled and disabled. When enabled, we are going to send you important messages related to your account and activities. We will NEVER send you spam.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-lg md:rounded-xl w-full shadow-xl shadow-slate-400/10 dark:shadow-slate-950/50 pb-4 overflow-clip">
                        <div className='bg-slate-200 dark:bg-slate-700 px-4 py-2 lg:py-3 flex flex-col border-b border-b-slate-300 dark:border-b-slate-600'>
                            <h2 className='text-base font-semibold'>Theme</h2>
                        </div>

                        <div className='px-4 pt-4 flex flex-col'>
                            <div className="flex items-center justify-between gap-5">
                                <div className="flex flex-col">
                                    <p className='font-semibold'>Change App Color Scheme</p>
                                    <p className='text-slate-500 dark:text-slate-400'>Switch between dark and light mode.</p>
                                </div>
                                <ThemeSwitcherButton session={session as Session} placement='account' />
                            </div>
                            <hr className="h-px my-4 border-gray-200 dark:border-slate-700"></hr>
                            <div className="flex flex-col">
                                <p className='text-slate-500 dark:text-slate-400'>You can toggle between dark mode and light mode at any time. The change will persist until you manually change it again.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PrivateLayout>
    )
}

export default page