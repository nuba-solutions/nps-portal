import React from 'react'
import PrivateLayout from '../../_layout'
import { IoAccessibility, IoSend, IoTrash, IoWallet } from 'react-icons/io5'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const page = () => {
    return (
        <PrivateLayout>
            <section className="p-4 flex-1">
                <h1 className="page-heading text-primary-500 dark:text-primary-400 mt-2">Buttons</h1>
                <hr className='h-px my-4 bg-slate-200 border-0 dark:bg-slate-700'/>

                <h2 className="mt-2 text-md font-semibold text-primary-500">Button Sizes</h2>
                <small className='max-w-full'>
                    Available sizes. Simply add .btn-desired_size in addition to the base .btn class. For instance, .btn-lg for large.
                </small>
                <div className="flex items-center mt-2 gap-2 flex-wrap">
                    <button className="btn btn-xs btn-primary">Button XS</button>
                    <button className="btn btn-sm btn-primary">Button SM</button>
                    <button className="btn btn-primary">Button Base</button>
                    <button className="btn btn-lg btn-primary">Button LG</button>
                    <button className="btn btn-xl btn-primary">Button XL</button>
                </div>

                <h2 className="mt-10 text-md font-semibold text-primary-500">Button Types</h2>
                <small className='max-w-full'>
                    These are all button types available. Simply add .btn-desired_type in addition to the base .btn class
                </small>
                <div className="flex items-center mt-2 gap-2 flex-wrap">
                    <button className="btn btn-primary">Primary</button>
                    <button className="btn btn-secondary">Secondary</button>
                    <button className="btn btn-tertiary">Tertiary</button>
                    <button className="btn btn-info">Info</button>
                    <button className="btn btn-destructive">Destructive</button>
                    <button className="btn btn-success">Success</button>
                    <button className="btn btn-warning">Warning</button>
                    <button className="btn btn-muted">Muted</button>
                    <button className="btn btn-white">White</button>
                    <button className="btn btn-black">Black</button>
                </div>

                <h2 className="mt-10 text-md font-semibold text-primary-500">Button States</h2>
                <small className='max-w-full'>
                    These are all button states. Styles are automatically applied when using the .btn class
                </small>
                <div className="flex items-center mt-2 gap-2 flex-wrap">
                    <button className="btn bg-primary-500 text-white">Default</button>
                    <button className="btn bg-primary-600 text-white">Hovered</button>
                    <button className="btn btn-primary" disabled>Disabled</button>
                    <button className="btn bg-primary-700 text-white">Active</button>
                    <button className="btn bg-primary-500 text-white ring-4 ring-primary-300 ml-1">Focused</button>
                    <button className='btn btn-primary' disabled>
                        <AiOutlineLoading3Quarters className="spinner"/>
                        Loading
                    </button>
                </div>

                <h2 className="mt-10 text-md font-semibold text-primary-500">Button Options</h2>
                <small className='max-w-full'>
                    By default, the class .btn picks contained, but you can assign .btn-outlined to change the visual.
                </small>
                <div className="flex items-center mt-2 gap-2 flex-wrap">
                    <button className="btn bg-primary-500 text-white">Contained</button>
                    <button className="btn border-2 border-primary-500 bg-transparent text-primary-500">Outlined</button>
                </div>

                <h2 className="mt-10 text-md font-semibold text-primary-500">Button Children</h2>
                <small className='max-w-full'>
                    Children can be anything. Text + Icon, only text or only icons.
                </small>
                <div className="flex items-center mt-2 gap-2 flex-wrap">
                    <button className="btn btn-primary">
                        <IoSend/>
                        Icon left
                    </button>
                    <button className="btn btn-destructive">
                        Icon right
                        <IoTrash/>
                    </button>
                    <button className="btn btn-info">
                        <IoWallet/>
                    </button>
                    <button className="btn btn-warning rounded-full">
                        <IoAccessibility/>
                    </button>
                </div>

                <h1 className="page-heading text-primary-500 mt-20">Usage</h1>
                <hr className='h-px my-4 bg-slate-200 border-0 dark:bg-slate-700'/>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    <pre className='p-10 bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 shadow-2xl shadow-slate-500/10'>
                        <code>
                            {`<button className="btn btn-primary">`}<br/>
                            &nbsp;&nbsp;&nbsp;{`Button Base`}<br/>
                            {`</button>`}<br/>
                        </code>
                    </pre>
                    <pre className='p-10 bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 shadow-2xl shadow-slate-500/10'>
                        <code>
                            {`<button className="btn btn-lg btn-primary">`}<br/>
                            &nbsp;&nbsp;&nbsp;{`Button Large`}<br/>
                            {`</button>`}<br/>
                        </code>
                    </pre>
                    <pre className='p-10 bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 shadow-2xl shadow-slate-500/10'>
                        <code>
                            {`<button className="btn btn-primary btn-outlined">`}<br/>
                            &nbsp;&nbsp;&nbsp;{`Button Outlined`}<br/>
                            {`</button>`}<br/>
                        </code>
                    </pre>
                    <pre className='p-10 bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 shadow-2xl shadow-slate-500/10'>
                        <code>
                            {`<button className="btn btn-primary">`}<br/>
                            &nbsp;&nbsp;&nbsp;{`<IoSend />`}<br/>
                            &nbsp;&nbsp;&nbsp;{`Button Text`}<br/>
                            {`</button>`}<br/>
                        </code>
                    </pre>
                </div>
            </section>
        </PrivateLayout>
    )
}

export default page