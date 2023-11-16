import React from 'react'
import PrivateLayout from '../_layout'
import PageHeading from '@/components/ui/headings/PageHeading'

const page = () => {
    return (
        <PrivateLayout>
            <section className='p-4 flex-1'>
                <PageHeading title='Messages' subtitle='Your received messages'/>
                <hr className='h-px my-4 bg-slate-200 border-0 dark:bg-slate-700'/>
            </section>
        </PrivateLayout>
    )
}

export default page