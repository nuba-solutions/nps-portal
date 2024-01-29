import React from 'react'
import { headers } from 'next/headers'
import PrivateLayout from '../../_layout'
import { IoAccessibility, IoAlarm, IoAmericanFootball, IoSend, IoTrash, IoWallet } from 'react-icons/io5'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import PageHeading from '@/components/ui/headings/PageHeading'
import Button from '@/components/ui/buttons/Button'
import { Locale } from '@/i18n.config'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getClientProviderAuthorizedPages, getClientProviderPageInfo, getUserClientProvider } from '@/utils/theme_providers'

const page = async ({ params: {lang}}: { params: { lang: Locale } }) => {
    const session = await getServerSession(authOptions)
    const client_provider = await getUserClientProvider(session?.user.client_provider)
    const page = await getClientProviderPageInfo(session?.user.client_provider, 'components/buttons')

    return (
        <PrivateLayout>
            <section className="p-4 flex-1">
                <PageHeading description="Internal use page" title="Buttons"/>
                <hr className='h-px my-4 bg-slate-200 border-0 dark:bg-slate-700'/>

                <h2 className="mt-2 text-md font-semibold">Button Sizes</h2>
                <div className='max-w-full flex items-center mb-4'>
                    Available sizes. Simply add <pre className='mx-2 px-2 py-1 rounded-md bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-500'><code>sz="xs"</code></pre> for extra small or omit for base size.
                </div>
                <div className="flex items-center mt-2 gap-2 flex-wrap">
                    <Button variant="primary" sz='xs'>Button XS</Button>
                    <Button variant="primary" sz='sm'>Button SM</Button>
                    <Button variant='primary'>Button Base</Button>
                    <Button variant='primary' sz='lg'>Button LG</Button>
                    <Button variant='primary' sz='xl'>Button XL</Button>
                </div>

                <h2 className="mt-10 text-md font-semibold">Button Types</h2>
                <div className='max-w-full flex items-center mb-4 flex-wrap'>
                    These are all button types available. For example, simply add <pre className='mx-2 px-2 py-1 rounded-md bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-500'><code>variant="primary"</code></pre> for primary colored button.
                    If omitted, button will be defaulted to white on dark theme and black on light theme.
                </div>
                <div className="flex items-center mt-2 gap-2 flex-wrap">
                    <Button variant='primary'>Primary</Button>
                    <Button variant='info'>Info</Button>
                    <Button variant='destructive'>Destructive</Button>
                    <Button variant='success'>Success</Button>
                    <Button variant='warning'>Warning</Button>
                    <Button variant='muted'>Muted</Button>
                    <Button>Omitted Variant</Button>
                </div>

                <h2 className="mt-10 text-md font-semibold">Button States</h2>
                <p className='max-w-full flex items-center mb-4'>
                    These are all button states. No need to do anything.
                </p>
                <div className="flex items-center mt-2 gap-2 flex-wrap">
                    <button className="h-[45px] px-4 rounded-lg flex items-center justify-center gap-2 outline-0 font-semibold shadow-lg bg-primary-500 text-white">Default</button>
                    <button className="h-[45px] px-4 rounded-lg flex items-center justify-center gap-2 outline-0 font-semibold shadow-lg bg-primary-600 text-white">Hovered</button>
                    <button className="h-[45px] px-4 rounded-lg flex items-center justify-center gap-2 outline-0 font-semibold shadow-lg bg-primary-500 text-white opacity-50" disabled>Disabled</button>
                    <button className="h-[45px] px-4 rounded-lg flex items-center justify-center gap-2 outline-0 font-semibold shadow-lg bg-primary-700 text-white">Active</button>
                    <button className="h-[45px] px-4 rounded-lg flex items-center justify-center gap-2 outline-0 font-semibold shadow-lg bg-primary-500 text-white ring-4 ring-primary-300 ml-1">Focused</button>
                    <button className='h-[45px] px-4 rounded-lg flex items-center justify-center gap-2 outline-0 font-semibold shadow-lg bg-primary-500 text-white' disabled>
                        <AiOutlineLoading3Quarters className="spinner"/>
                        Loading
                    </button>
                </div>

                <h2 className="mt-10 text-md font-semibold">Button Options</h2>
                <div className='max-w-full flex items-center mb-4'>
                    By default, the button is contained, but you can assign <pre className='mx-2 px-2 py-1 rounded-md bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-500'><code>outlined</code></pre> to change it.
                </div>
                <div className="flex items-center mt-2 gap-2 flex-wrap">
                    <Button variant='primary'>Contained</Button>
                    <Button variant='primary' outlined>Outlined</Button>
                </div>

                <h2 className="mt-10 text-md font-semibold">Button Children</h2>
                <div className='max-w-full flex items-center mb-4'>
                    Children can be anything. Text + Icon, only text or only icons. For instance <pre className='mx-2 px-2 py-1 rounded-md bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-500'><code>{`<Button>Hello</Button>`}</code></pre> where Hello is the children.
                </div>
                <div className="flex items-center mt-2 gap-2 flex-wrap">
                    <Button variant='primary'>
                        <IoSend/>
                        Icon left
                    </Button>
                    <Button variant='primary'>
                        Icon right
                        <IoTrash/>
                    </Button>
                    <Button variant='primary'>
                        <IoWallet/>
                    </Button>
                    <Button variant='primary'>
                        <IoAccessibility/>
                    </Button>
                </div>

                <h2 className="mt-10 text-md font-semibold">Button Shape</h2>
                <div className='max-w-full flex items-center mb-4'>
                    Button defaults to rectangle but can be rounded by adding <pre className='mx-2 px-2 py-1 rounded-md bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-500'><code>round</code></pre> to it.
                </div>
                <div className="flex items-center mt-2 gap-2 flex-wrap">
                    <Button variant='primary' round>
                        <IoAmericanFootball/>
                        Rounded text + icon
                    </Button>
                    <Button variant='primary' round>
                        <IoAlarm/>
                    </Button>
                </div>

                <h1 className="page-heading mt-20">Usage</h1>
                <hr className='h-px my-4 bg-slate-200 border-0 dark:bg-slate-700'/>
                <div>
                    How to import the button component:
                    <pre className='w-fit mb-4 mt-2 px-2 py-1 rounded-md bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-500'>
                        <code>
                            import Button from '@/components/ui/buttons/Button'
                        </code>
                    </pre>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    <pre className='p-10 bg-white dark:bg-slate-700 rounded-xl border border-slate-300 dark:border-slate-500 shadow-2xl shadow-slate-500/10'>
                        <code>
                            {`<Button variant="primary">`}<br/>
                            &nbsp;&nbsp;&nbsp;{`Button Primary`}<br/>
                            {`</Button>`}<br/>
                        </code>
                    </pre>
                    <pre className='p-10 bg-white dark:bg-slate-700 rounded-xl border border-slate-300 dark:border-slate-500 shadow-2xl shadow-slate-500/10'>
                        <code>
                            {`<Button sz="lg">`}<br/>
                            &nbsp;&nbsp;&nbsp;{`Button Large`}<br/>
                            {`</Button>`}<br/>
                        </code>
                    </pre>
                    <pre className='p-10 bg-white dark:bg-slate-700 rounded-xl border border-slate-300 dark:border-slate-500 shadow-2xl shadow-slate-500/10'>
                        <code>
                            {`<Button outlined>`}<br/>
                            &nbsp;&nbsp;&nbsp;{`Button Outlined`}<br/>
                            {`</Button>`}<br/>
                        </code>
                    </pre>
                    <pre className='p-10 bg-white dark:bg-slate-700 rounded-xl border border-slate-300 dark:border-slate-500 shadow-2xl shadow-slate-500/10'>
                        <code>
                            {`<Button round>`}<br/>
                            &nbsp;&nbsp;&nbsp;{`<IoSend />`}<br/>
                            &nbsp;&nbsp;&nbsp;{`Button Text`}<br/>
                            {`</Button>`}<br/>
                        </code>
                    </pre>
                </div>
            </section>
        </PrivateLayout>
    )
}

export default page