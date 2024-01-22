"use client"

import PageHeading from '@/components/ui/headings/PageHeading'
import React, { useState } from 'react'
import InvoicesTable from './InvoicesTable'
import TableSearch from '@/components/search/TableSearch'
import { ColumnSort } from '@tanstack/react-table'

const InvoicesTableContainer = ({dict}: any) => {
    const [searchValue, setSearchValue] = useState('')
    const [sorting, setSorting] = useState<ColumnSort[]>([])

    return (
        <>
            <div className="flex items-center justify-between">
                <PageHeading description={dict.pages.charges_history["subtitle"]} title={dict.pages.charges_history["title"]}/>
                <div className='w-6/12 lg:w-4/12 xl:w-3/12 3xl:w-2/12'>
                    <TableSearch searchValue={searchValue} setSearchValue={setSearchValue}/>
                </div>
            </div>
            <hr className='h-px my-4 bg-slate-200 border-0 dark:bg-slate-700'/>
            <div className="overflow-auto scroll-xs pb-2">
                <InvoicesTable searchValue={searchValue} setSearchValue={setSearchValue} sorting={sorting} setSorting={setSorting}/>
            </div>
        </>
    )
}

export default InvoicesTableContainer