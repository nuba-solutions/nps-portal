"use client"

import PageHeading from '@/components/ui/headings/PageHeading'
import React, { useState } from 'react'
import InvoicesTable from './InvoicesTable'
import TableSearch from '@/components/search/TableSearch'

const InvoicesTableContainer = () => {
    const [searchValue, setSearchValue] = useState('')

    return (
        <>
            <div className="flex items-center justify-between">
                <PageHeading title='Charges History' subtitle='A list of all your payments'/>
                <TableSearch searchValue={searchValue} setSearchValue={setSearchValue}/>
            </div>
            <hr className='h-px my-4 bg-slate-200 border-0 dark:bg-slate-700'/>
            <div className="overflow-auto scroll-xs pb-5">
                <InvoicesTable searchValue={searchValue} setSearchValue={setSearchValue}/>
            </div>
        </>
    )
}

export default InvoicesTableContainer