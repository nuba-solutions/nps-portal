import React from 'react'
import PrivateLayout from '../../_layout'

const page = () => {
    return (
        <PrivateLayout>
            <section className="p-4 pb-20 flex-1">
                <h1 className="page-heading text-primary-500 dark:text-primary-400 mt-2">Inputs</h1>
                <hr className='h-px my-4 bg-slate-200 border-0 dark:bg-slate-700'/>

                <h2 className="mt-2 text-md font-semibold text-primary-500">Input Sizes</h2>
                <small className='max-w-full'>
                    Available sizes. Simply add .input-desired_size in addition to the base .input class. For instance, .input-lg for large.
                </small>
                <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 items-center mt-2 gap-2">
                    <input type="text" className='input input-xs' placeholder='.input-xs'/>
                    <input type="text" className='input input-sm' placeholder='.input-sm'/>
                    <input type="text" className='input' placeholder='.input-base'/>
                    <input type="text" className='input input-lg' placeholder='.input-lg'/>
                    <input type="text" className='input input-xl' placeholder='.input-xl'/>
                </div>

                <h2 className="mt-2 text-md font-semibold text-primary-500">Input States</h2>
                <small className='max-w-full'>
                    Available states. For error, use the .input-error class.
                </small>
                <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 items-center mt-2 gap-2">
                    <input type="text" className='h-[45px] px-2 w-full rounded-lg bg-white dark:bg-slate-800 outline-0 border-2 border-slate-300 dark:border-slate-700' placeholder='Default'/>
                    <input type="text" className='h-[45px] px-2 w-full rounded-lg bg-white dark:bg-slate-800 ring-4 ring-primary-500/20 outline-0 border-2 border-primary-500 dark:border-primary-500' placeholder='Focused'/>
                    <input type="text" className='h-[45px] px-2 w-full rounded-lg bg-white dark:bg-slate-800 outline-0 border-2 border-slate-300 dark:border-slate-700' placeholder='Disabled' disabled/>
                    <input type="text" className='h-[45px] px-2 w-full rounded-lg bg-white dark:bg-slate-800 outline-0 border-2 border-red-500 dark:border-red-500 text-red-500' defaultValue='Error'/>
                    <input type="text" className='h-[45px] px-2 w-full rounded-lg bg-white dark:bg-slate-800 ring-4 ring-red-500/20 outline-0 border-2 border-red-500 dark:border-red-500 text-red-500' defaultValue='Error Focused'/>
                </div>

                <h2 className="mt-6 text-md font-semibold text-primary-500">Input Types</h2>
                <small className='max-w-full'>
                    Available types. Simply add .input class. Then change the <code>type</code> property to your need.
                </small>

                <h2 className="mt-6 text-md font-semibold text-secondary-300 dark:text-slate-400">Basic types</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 items-center mt-2 gap-2">
                    <input type="text" className='input' placeholder='type="text"' />
                    <input type="password" className='input' placeholder='type="password"' />
                    <input type="number" className='input' placeholder='type="number"' />
                    <input type="email" className='input' placeholder='type="email"' />
                    <input type="date" className='input' placeholder='type="date"' />
                </div>

                <h2 className="mt-6 text-md font-semibold text-secondary-300 dark:text-slate-400">Select and Textarea</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 items-center mt-2 gap-2">
                    <select className='input'>
                        <option>Select input</option>
                        <option defaultValue="1">Option 1 Description</option>
                        <option defaultValue="2">Option 2 Description</option>
                        <option defaultValue="3">Option 3 Description</option>
                        <option defaultValue="4">Option 4 Description</option>
                    </select>

                    <textarea className='input input-textarea' placeholder='type in your message'></textarea>
                </div>

                <h2 className="mt-6 text-md font-semibold text-secondary-300 dark:text-slate-400">Checkboxes and Radios</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 items-center mt-2 gap-2">
                    <div>
                        <div className="input-group group-inline my-3">
                            <input id="checkbox-example1" type="checkbox" className='checkbox' defaultChecked/>
                            <label htmlFor="checkbox-example1" className='label'>Checkbox 1</label>
                        </div>
                        <div className="input-group group-inline my-3">
                            <input id="checkbox-example2" type="checkbox" className='checkbox'/>
                            <label htmlFor="checkbox-example2" className='label'>Checkbox 2</label>
                        </div>
                        <div className="input-group group-inline my-3">
                            <input id="checkbox-example3" type="checkbox" className='checkbox'/>
                            <label htmlFor="checkbox-example3" className='label'>Checkbox 3</label>
                        </div>
                    </div>

                    <div>
                        <div className="input-group group-inline my-3">
                            <input id="radio-example1" name="radio-group-example" type="radio" className='radio'/>
                            <label htmlFor="radio-example1" className='label'>Radio Button 1</label>
                        </div>
                        <div className="input-group group-inline my-3">
                            <input id="radio-example2" name="radio-group-example" type="radio" className='radio'/>
                            <label htmlFor="radio-example2" className='label'>Radio Button 2</label>
                        </div>
                        <div className="input-group group-inline my-3">
                            <input id="radio-example3" name="radio-group-example" type="radio" className='radio'/>
                            <label htmlFor="radio-example3" className='label'>Radio Button 3</label>
                        </div>
                    </div>
                </div>

                <h1 className="page-heading text-primary-500 mt-10">Labels</h1>
                <hr className='h-px my-4 bg-slate-200 border-0 dark:bg-slate-700'/>

                <h2 className="mt-2 text-md font-semibold text-primary-500">Label Sizes</h2>
                <small className='max-w-full'>
                    Available sizes. Simply add .label-desired_size in addition to the base .label class. For instance, .label-lg for large.
                </small>
                <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 items-center mt-2 gap-2">
                    <label htmlFor="" className='label label-xs'>Label XS</label>
                    <label htmlFor="" className='label label-sm'>Label SM</label>
                    <label htmlFor="" className='label'>Label Base</label>
                    <label htmlFor="" className='label label-lg'>Label LG</label>
                    <label htmlFor="" className='label label-xl'>Label XL</label>
                </div>

                <h1 className="page-heading text-primary-500 mt-10">Groups</h1>
                <hr className='h-px my-4 bg-slate-200 border-0 dark:bg-slate-700'/>

                <h2 className="mt-2 text-md font-semibold text-primary-500">Combining Labels & Inputs</h2>
                <small className='max-w-full'>
                    Input groups are available to help organize forms.
                </small>
                <div className="grid grid-cols-1 xl:grid-cols-3 items-center mt-2 gap-6">
                    <div className='mt-4'>
                        <p>Input Group <code className='bg-white dark:bg-slate-700 py-1 px-2 ml-2 rounded-md'>.input-group</code></p>
                        <div className="input-group mt-3">
                            <label htmlFor="" className='label'>Label</label>
                            <input type="text" className='input' placeholder='Placeholder'/>
                        </div>
                    </div>

                    <div className='mt-4'>
                        <p>Input Group Inline <code className='bg-white dark:bg-slate-700 py-1 px-2 ml-2 rounded-md'>.input-group .group-inline</code></p>
                        <div className="input-group group-inline mt-10">
                            <label htmlFor="" className='label'>Label</label>
                            <input type="text" className='input' placeholder='Placeholder'/>
                        </div>
                    </div>
                </div>

                <h1 className="page-heading text-primary-500 mt-20">Usage</h1>
                <hr className='h-px my-4 bg-slate-200 border-0 dark:bg-slate-700'/>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    <pre className='p-10 bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 shadow-2xl shadow-slate-500/10'>
                        <code>
                            {`<input type="text" className="input" />`}
                        </code>
                    </pre>

                    <pre className='p-10 bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 shadow-2xl shadow-slate-500/10'>
                        <code>
                            {`<div className="input-group">`}<br/>
                            &nbsp;&nbsp;&nbsp;{`<label className="label"/>`}<br/>
                            &nbsp;&nbsp;&nbsp;{`<input type="text" className="input" />`}<br/>
                            {`</div>`}<br/>
                        </code>
                    </pre>

                    <pre className='p-10 bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 shadow-2xl shadow-slate-500/10'>
                        <code>
                            {`<div className="input-group group-inline">`}<br/>
                            &nbsp;&nbsp;&nbsp;{`<label className="label label-lg"/>`}<br/>
                            &nbsp;&nbsp;&nbsp;{`<input type="text" className="input input-lg" />`}<br/>
                            {`</div>`}<br/>
                        </code>
                    </pre>

                    <pre className='p-10 bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 shadow-2xl shadow-slate-500/10'>
                        <code>
                            {`<div className="input-group group-inline">`}<br/>
                            &nbsp;&nbsp;&nbsp;{`<label htmlFor="checkbox-example" className="label label-lg"/>`}<br/>
                            &nbsp;&nbsp;&nbsp;{`<input id="checkbox-example" type="checkbox" className='checkbox'/>`}<br/>
                            {`</div>`}<br/>
                        </code>
                    </pre>
                </div>
            </section>
        </PrivateLayout>
    )
}

export default page