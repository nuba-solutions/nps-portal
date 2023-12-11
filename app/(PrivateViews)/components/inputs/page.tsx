import React from 'react'
import PrivateLayout from '../../_layout'
import PageHeading from '@/components/ui/headings/PageHeading'
import Input from '@/components/ui/inputs/Input'
import InputGroup from '@/components/ui/inputs/InputGroup'
import Select from '@/components/ui/inputs/Select'
import TextArea from '@/components/ui/inputs/TextArea'
import Checkbox from '@/components/ui/inputs/Checkbox'
import RadioButton from '@/components/ui/inputs/RadioButton'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getClientProviderPageInfo } from '@/utils/theme_providers'

const page = async () => {
    const session = await getServerSession(authOptions)
    const page = await getClientProviderPageInfo(session?.user.client_provider, 'components/inputs')

    const optionsArray = [{id: 1, name: 'Option 1'}, {id: 2, name: 'Option 2'}]
    return (
        <PrivateLayout>
            <section className="p-4 pb-20 flex-1">
                <PageHeading description={page?.page_info.description || 'Page description'} title={page?.page_info.title || 'Page Title'}/>
                <hr className='h-px my-4 bg-slate-200 border-0 dark:bg-slate-700'/>

                <h2 className="mt-2 text-md font-semibold">Input Sizes</h2>
                <div className='max-w-full flex items-center mb-4'>
                    Available sizes. Simply add <pre className='mx-2 px-2 py-1 rounded-md bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-500'><code>sz="xs"</code></pre> for extra small or omit for base size.
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 items-center mt-2 gap-2">
                    <InputGroup>
                        <Input id='sample-input-xs' placeholder='Input' label='Input XS' sz='xs' name="sample"/>
                    </InputGroup>
                    <InputGroup>
                        <Input id='sample-input-sm' placeholder='Input' label='Input SM' sz='sm' name="sample"/>
                    </InputGroup>
                    <InputGroup>
                        <Input id='sample-input-base' placeholder='Input' label='Input Base' name="sample"/>
                    </InputGroup>
                    <InputGroup>
                        <Input id='sample-input-lg' placeholder='Input' label='Input LG' sz='lg' name="sample"/>
                    </InputGroup>
                    <InputGroup>
                        <Input id='sample-input-xl' placeholder='Input' label='Input XL' sz='xl' name="sample"/>
                    </InputGroup>
                </div>

                <h2 className="mt-6 text-md font-semibold">Input States</h2>
                <div className='max-w-full flex items-center mb-4'>
                    Input states. For error, add <pre className='mx-2 px-2 py-1 rounded-md bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-500'><code>error</code></pre>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 items-center mt-2 gap-2">
                    <input type="text" className='h-[45px] px-3 w-full rounded-lg bg-white dark:bg-slate-800 outline-0 border-2 border-slate-300 dark:border-slate-700' placeholder='Default'/>
                    <input type="text" className='h-[45px] px-3 w-full rounded-lg bg-white dark:bg-slate-800 ring-4 ring-blue-500/20 outline-0 border-2 border-blue-500 dark:border-blue-500' placeholder='Focused'/>
                    <input type="text" className='h-[45px] px-3 w-full rounded-lg bg-white dark:bg-slate-800 outline-0 border-2 border-slate-300 dark:border-slate-700 disabled:opacity-50' placeholder='Disabled' disabled/>
                    <input type="text" className='h-[45px] px-3 w-full rounded-lg bg-white dark:bg-slate-800 outline-0 border-2 border-red-500 dark:border-red-500 text-red-500' defaultValue='Error'/>
                    <input type="text" className='h-[45px] px-3 w-full rounded-lg bg-white dark:bg-slate-800 ring-4 ring-red-500/20 outline-0 border-2 border-red-500 dark:border-red-500 text-red-500' defaultValue='Error Focused'/>
                </div>

                <h2 className="mt-6 text-md font-semibold">Input Types</h2>
                <div className='max-w-full flex items-center mb-4'>
                    Input types. Simply add <pre className='mx-2 px-2 py-1 rounded-md bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-500'><code>type="password"</code></pre> for password input.
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 items-center mt-2 gap-2">
                    <InputGroup>
                        <Input id='sample-input-text' placeholder='Input Text' label='Input Text' type='text' name="sample"/>
                    </InputGroup>
                    <InputGroup>
                        <Input id='sample-input-password' placeholder='Input Password' label='Input Password' type='password' name="sample"/>
                    </InputGroup>
                    <InputGroup>
                        <Input id='sample-input-number' placeholder='Input Number' label='Input Number' type='number' name="sample"/>
                    </InputGroup>
                    <InputGroup>
                        <Input id='sample-input-email' placeholder='Input Email' label='Input Email' type='email' name="sample"/>
                    </InputGroup>
                    <InputGroup>
                        <Input id='sample-input-date' placeholder='Input Date' label='Input Date' type='date' name="sample"/>
                    </InputGroup>
                </div>

                <div className='mt-6 max-w-full flex items-center mb-4'>
                    Select input: <pre className='mx-2 px-2 py-1 rounded-md bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-500'><code>{`<Select>{map over options}</Select>`}</code></pre>. For Textarea, use <pre className='mx-2 px-2 py-1 rounded-md bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-500'><code>{`<TextArea />`}</code></pre>.
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 items-start mt-2 gap-2">
                    <InputGroup>
                        <Select id='sample-input-text' label='Select Input' name="sample">
                            <option value="">Please select</option>
                            {
                                optionsArray.map((opt) => (
                                    <option key={opt.id} value={opt.id}>
                                        {opt.name}
                                    </option>
                                ))
                            }
                        </Select>
                    </InputGroup>

                    <InputGroup>
                        <TextArea
                            id='sample-text-area'
                            name='sample'
                            label='Text Area'
                            rows={5}
                            placeholder='Enter your message'
                        />
                    </InputGroup>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 items-start mt-2 gap-2">
                    <div>
                        <div className='mt-6 max-w-full flex items-center mb-4'>
                            Checkboxes: <pre className='mx-2 px-2 py-1 rounded-md bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-500'><code>{`<Checkbox />`}</code></pre>.
                        </div>
                        <div className='flex flex-col gap-3'>
                            <InputGroup inline reverse>
                                <Checkbox
                                    id="checkbox-example1"
                                    name='sample'
                                    label='Checkbox 1'
                                    defaultChecked
                                />
                            </InputGroup>
                            <InputGroup inline reverse>
                                <Checkbox
                                    id="checkbox-example2"
                                    name='sample'
                                    label='Checkbox 2'
                                />
                            </InputGroup>
                            <InputGroup inline reverse>
                                <Checkbox
                                    id="checkbox-example3"
                                    name='sample'
                                    label='Checkbox 3'
                                />
                            </InputGroup>
                        </div>
                    </div>

                    <div>
                        <div className='mt-6 max-w-full flex items-center mb-4'>
                            Radio buttons: <pre className='mx-2 px-2 py-1 rounded-md bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-500'><code>{`<RadioButton />`}</code></pre>.
                        </div>
                        <div className='flex flex-col gap-3'>
                            <InputGroup inline reverse>
                                <RadioButton
                                    id="radio-example-1"
                                    name='radio-group-example-y'
                                    label='Radio 1'
                                    defaultChecked
                                />
                            </InputGroup>
                            <InputGroup inline reverse>
                                <RadioButton
                                    id="radio-example-2"
                                    name='radio-group-example-y'
                                    label='Radio 2'
                                />
                            </InputGroup>
                            <InputGroup inline reverse>
                                <RadioButton
                                    id="radio-example-3"
                                    name='radio-group-example-y'
                                    label='Radio 3'
                                />
                            </InputGroup>
                        </div>
                    </div>
                </div>

                <h1 className="page-heading mt-20">Usage</h1>
                <hr className='h-px my-4 bg-slate-200 border-0 dark:bg-slate-700'/>
                <div>
                    How to import the Input, Select, TextArea, Checkbox and RadioButton components:
                    <pre className='w-fit mb-4 mt-2 px-2 py-1 rounded-md bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-500'>
                        <code>
                            import Input from '@/components/ui/inputs/"DesiredComponent"'
                        </code>
                    </pre>
                </div>
                <div>
                    All inputs listed here MUST be wrapped in an {`<InputGroup>`} component.
                    <pre className='w-fit mb-4 mt-2 px-2 py-1 rounded-md bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-500'>
                        <code>
                            {`<InputGroup> Your Input Here </InputGroup>`}
                        </code>
                    </pre>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    <pre className='p-10 bg-white dark:bg-slate-700 rounded-xl border border-slate-300 dark:border-slate-500 shadow-2xl shadow-slate-500/10'>
                        <code>
                            {`<InputGroup>`}<br/>
                            &nbsp;&nbsp;&nbsp;{`<Input`}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`id="sample-input"`}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`name="sample-input"`}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`type="text"`}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`placeholder="Enter your name"`}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`label="First Name"`}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`sz="sm"`}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`register={register} // If using within react hook form`}<br/>
                            &nbsp;&nbsp;&nbsp;{`/>`}<br/>
                            {`</InputGroup>`}<br/>
                        </code>
                    </pre>
                    <pre className='p-10 bg-white dark:bg-slate-700 rounded-xl border border-slate-300 dark:border-slate-500 shadow-2xl shadow-slate-500/10'>
                        <code>
                            {`<InputGroup>`}<br/>
                            &nbsp;&nbsp;&nbsp;{`<Select`}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`id="sample-input"`}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`name="sample-input"`}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`type="text"`}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`label="Select an option"`}<br/>
                            &nbsp;&nbsp;&nbsp;{`>`}<br/>
                            &nbsp;&nbsp;&nbsp;{`{`}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`yourOptionsArray.map(opt => (`}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`<option key={opt.id} value={opt.value}>`}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`{opt.name}`}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`</option>`}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`)`}<br/>
                            &nbsp;&nbsp;&nbsp;{`}`}<br/>
                            &nbsp;&nbsp;&nbsp;{`</Select>`}<br/>
                            {`</InputGroup>`}<br/>
                        </code>
                    </pre>
                    <pre className='p-10 bg-white dark:bg-slate-700 rounded-xl border border-slate-300 dark:border-slate-500 shadow-2xl shadow-slate-500/10'>
                        <code>
                            {`<InputGroup inline reverse>`}<br/>
                            &nbsp;&nbsp;&nbsp;{`<Checkbox`}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`id="sample-checkbox-1"`}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`name="sample-checkbox-1"`}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`label="Checkbox 1"`}<br/>
                            &nbsp;&nbsp;&nbsp;{`/>`}<br/>
                            {`</InputGroup>`}<br/>
                            {`<InputGroup inline reverse>`}<br/>
                            &nbsp;&nbsp;&nbsp;{`<Checkbox`}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`id="sample-checkbox-2"`}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`name="sample-checkbox-2"`}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`label="Checkbox 2"`}<br/>
                            &nbsp;&nbsp;&nbsp;{`/>`}<br/>
                            {`</InputGroup>`}<br/>
                        </code>
                    </pre>
                    <pre className='p-10 bg-white dark:bg-slate-700 rounded-xl border border-slate-300 dark:border-slate-500 shadow-2xl shadow-slate-500/10'>
                        <code>
                            {`<InputGroup inline reverse>`}<br/>
                            &nbsp;&nbsp;&nbsp;{`<RadioButton`}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`id="sample-radio-1"`}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`name="sample-radio-group"`}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`label="Radio 1"`}<br/>
                            &nbsp;&nbsp;&nbsp;{`/>`}<br/>
                            {`</InputGroup>`}<br/>
                            {`<InputGroup inline reverse>`}<br/>
                            &nbsp;&nbsp;&nbsp;{`<RadioButton`}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`id="sample-radio-2"`}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`name="sample-radio-group"`}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`label="Radio 2"`}<br/>
                            &nbsp;&nbsp;&nbsp;{`/>`}<br/>
                            {`</InputGroup>`}<br/>
                        </code>
                    </pre>
                </div>
            </section>
        </PrivateLayout>
    )
}

export default page