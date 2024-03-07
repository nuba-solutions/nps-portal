import React from 'react'
import PageHeading from '@/components/ui/headings/PageHeading'
import Learn3Preferences from '@/components/sections/learn3/Learn3Preferences'
import { getServerSession, Session } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getUserClientProvider } from '@/utils/theme_providers'
import PrivateLayout from '../_layout'
import ToggleNotifications from '@/components/buttons/ToggleNotifications'
import ThemeSwitcherButton from '@/components/buttons/ThemeSwitcherButton'
import AccountCard from '@/components/ui/cards/AccountCard'
import { getDictionary } from '@/utils/dictionaries'
import ChangeLanguageButtonGroup from '@/components/buttons/ChangeLanguageButtonGroup'
import { Locale } from '@/i18n.config'
import ClientCredentialsCard from '@/components/ui/cards/ClientCredentialsCard'

const page = async ({ params: {lang}}: { params: { lang: Locale } }) => {
    const dict = await getDictionary(lang)
    const { cards: cards_dictionary } = dict.pages.account

    const session = await getServerSession(authOptions)
    const client_provider = await getUserClientProvider(session?.user.client_provider)

    return (
        <PrivateLayout>
            <Learn3Preferences learn3Links={client_provider?.learn3Links}/>
            <section className='p-4 flex-1'>
                <PageHeading description={dict.pages.account["subtitle"]} title={dict.pages.account["title"]}/>
                <hr className='h-px my-4 bg-slate-200 border-0 dark:bg-slate-700'/>

                <div className="max-w-5xl w-full flex flex-col gap-6">
                    <AccountCard session={session as Session} dict={dict}/>

                    <div className="bg-white dark:bg-slate-800 rounded-lg md:rounded-xl w-full shadow-xl shadow-slate-400/10 dark:shadow-slate-950/50 pb-4 overflow-clip">
                        <div className='bg-slate-200 dark:bg-slate-700 px-4 py-2 lg:py-3 flex flex-col border-b border-b-slate-300 dark:border-b-slate-600'>
                            <h2 className='text-base font-semibold'>{cards_dictionary.notifications["title"]}</h2>
                        </div>

                        <div className='px-4 pt-4 flex flex-col'>
                            <div className="flex items-center justify-between gap-5">
                                <div className="flex flex-col">
                                    <p className='font-semibold'>{cards_dictionary.notifications["main_text"]}</p>
                                    <p className='text-slate-500 dark:text-slate-400'>{cards_dictionary.notifications["sub_text"]}</p>
                                </div>
                                <ToggleNotifications session={session as Session}/>
                            </div>
                            <hr className="h-px my-4 border-gray-200 dark:border-slate-700"></hr>
                            <div className="flex flex-col">
                                <p className='text-slate-500 dark:text-slate-400'>{cards_dictionary.notifications["footer"]}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-lg md:rounded-xl w-full shadow-xl shadow-slate-400/10 dark:shadow-slate-950/50 pb-4 overflow-clip">
                        <div className='bg-slate-200 dark:bg-slate-700 px-4 py-2 lg:py-3 flex flex-col border-b border-b-slate-300 dark:border-b-slate-600'>
                            <h2 className='text-base font-semibold'>{cards_dictionary.language["title"]}</h2>
                        </div>

                        <div className='px-4 pt-4 flex flex-col'>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                                <div className="flex flex-col">
                                    <p className='font-semibold'>{cards_dictionary.language["main_text"]}</p>
                                    <p className='text-slate-500 dark:text-slate-400'>{cards_dictionary.language["sub_text"]}</p>
                                </div>
                                <ChangeLanguageButtonGroup lang={lang} dict={cards_dictionary}/>
                            </div>
                            <hr className="h-px my-4 border-gray-200 dark:border-slate-700"></hr>
                            <div className="flex flex-col">
                                <p className='text-slate-500 dark:text-slate-400'>{cards_dictionary.language["footer"]}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-lg md:rounded-xl w-full shadow-xl shadow-slate-400/10 dark:shadow-slate-950/50 pb-4 overflow-clip">
                        <div className='bg-slate-200 dark:bg-slate-700 px-4 py-2 lg:py-3 flex flex-col border-b border-b-slate-300 dark:border-b-slate-600'>
                            <h2 className='text-base font-semibold'>{cards_dictionary.theme["title"]}</h2>
                        </div>

                        <div className='px-4 pt-4 flex flex-col'>
                            <div className="flex items-center justify-between gap-5">
                                <div className="flex flex-col">
                                    <p className='font-semibold'>{cards_dictionary.theme["main_text"]}</p>
                                    <p className='text-slate-500 dark:text-slate-400'>{cards_dictionary.theme["sub_text"]}</p>
                                </div>
                                <ThemeSwitcherButton session={session as Session} placement='account'/>
                            </div>
                            <hr className="h-px my-4 border-gray-200 dark:border-slate-700"></hr>
                            <div className="flex flex-col">
                                <p className='text-slate-500 dark:text-slate-400'>{cards_dictionary.theme["footer"]}</p>
                            </div>
                        </div>
                    </div>

                    <ClientCredentialsCard session={session as Session} dict={dict}/>
                </div>
            </section>
        </PrivateLayout>
    )
}

export default page