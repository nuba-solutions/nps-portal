"use client"

import { getInvoices } from '@/query_functions/invoices'
import { useQuery } from '@tanstack/react-query'
import React, { SetStateAction } from 'react'
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { invoiceTableColumns } from '@/utils/column_definitions'

type TInvoiceTableProps = {
    searchValue: string
    setSearchValue: React.Dispatch<SetStateAction<string>>
}

const InvoicesTable = ({searchValue, setSearchValue}: TInvoiceTableProps) => {
    const { data: invoices, error, isError, isPending } = useQuery({
        queryKey: ['all_invoices'],
        queryFn: () => getInvoices(''),
    })

    const table = useReactTable({
        data: invoices,
        columns: invoiceTableColumns,
        getCoreRowModel: getCoreRowModel(),
        onGlobalFilterChange: setSearchValue,
        state: {
            globalFilter: searchValue
        },
        getFilteredRowModel: getFilteredRowModel(),
    })

    if (isPending) {
        return <span>Loading...</span>
    }

    if (invoices && invoices.length > 0) {
        return (
            <table className="w-full bg-white dark:bg-slate-800 border-slate-400 dark:border-slate-700 shadow-lg rounded-xl overflow-clip">
                <thead className='bg-slate-200 dark:bg-slate-700'>
                    {table.getHeaderGroups().map((headerGroup: any) => (
                        <tr key={headerGroup.id}>
                            {
                                headerGroup.headers.map((header: any) => (
                                    <th key={header.id} className='px-6 py-3 font-semibold whitespace-nowrap text-left'>
                                        {
                                            header.isPlaceholder ?
                                            null : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )
                                        }
                                    </th>
                                ))
                            }
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {
                        table.getRowModel().rows.map(row => (
                            <tr key={row.id} className='border-b last-of-type:border-b-0 dark:border-slate-700 hover:bg-slate-50 hover:dark:bg-slate-900'>
                                {
                                    row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className='px-6 py-2 border-r dark:border-slate-700 last-of-type:border-r-0 whitespace-nowrap'>
                                            {
                                                flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )
                                            }
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        )
    }
}

export default InvoicesTable