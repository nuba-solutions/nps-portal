"use client"

import { getAllInvoices } from '@/query_functions/invoices'
import { useQuery } from '@tanstack/react-query'
import React, { SetStateAction } from 'react'
import {
    ColumnSort,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import TablePagination from '@/components/ui/pagination/TablePagination'
import { HiSortAscending, HiSortDescending } from 'react-icons/hi'
import { getInvoiceTableColumnsDefinition } from '@/utils/column_definitions'
import { Locale } from '@/i18n.config'
import { useSession } from 'next-auth/react'
import BaseLoader from '@/components/ui/loaders/BaseLoader'

type TInvoiceTableProps = {
    searchValue: string
    setSearchValue: React.Dispatch<SetStateAction<string>>
    setSorting: React.Dispatch<SetStateAction<ColumnSort[]>>
    sorting: ColumnSort[]
    dict: any
    lang: Locale
}

const InvoicesTable = ({searchValue, setSearchValue, sorting, setSorting, dict, lang}: TInvoiceTableProps) => {
    const session = useSession()
    const { data: invoices, isPending } = useQuery({
        queryKey: ['all_invoices'],
        queryFn: () => getAllInvoices(session.data?.user.stripeId as string),
    })

    const invoicesTable = useReactTable({
        data: invoices,
        columns: getInvoiceTableColumnsDefinition(dict, lang),
        getCoreRowModel: getCoreRowModel(),
        onGlobalFilterChange: setSearchValue,
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            sorting: sorting,
            globalFilter: searchValue
        },
        initialState: {
			pagination: {
				pageSize: 20,
			},
		},
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        enableSortingRemoval: false,
        enableMultiSort: false,
        onSortingChange: setSorting,
        autoResetPageIndex: false,
        enableFilters: true,
    })

    if (invoices.length < 1) {
        return (
            <div>
                <h2 className='text-xl font-semibold'>{dict.pages.charges_history["empty_title"]}</h2>
                <p>{dict.pages.charges_history["empty_message"]}</p>
            </div>
        )
    }

    if (isPending) {
        return <BaseLoader/>
    }

    if (invoices && invoices.length > 0) {
        return (
            <>
                <table className="w-full bg-white dark:bg-slate-800 border-slate-400 dark:border-slate-700 shadow-lg rounded-xl overflow-clip">
                    <thead className='bg-slate-200 dark:bg-slate-700'>
                        {invoicesTable.getHeaderGroups().map((headerGroup: any) => (
                            <tr key={headerGroup.id}>
                                {
                                    headerGroup.headers.map((header: any) => (
                                        <th key={header.id} className='px-6 py-3 font-semibold whitespace-nowrap text-left'>
                                            {
                                                header.isPlaceholder
                                                ? null
                                                : (
                                                    <div
                                                        {...{
                                                            className: header.column.getCanSort()
                                                            ? 'cursor-pointer select-none flex items-center justify-between'
                                                            : '',
                                                            onClick: header.column.getToggleSortingHandler(),
                                                        }}
                                                    >
                                                        {
                                                            flexRender(
                                                                header.column.columnDef.header,
                                                                header.getContext()
                                                            )
                                                        }
                                                        {
                                                            {
                                                                asc: <HiSortAscending className='text-slate-400 dark:text-slate-400 ml-2'/> as React.ReactNode,
                                                                desc: <HiSortDescending className='text-slate-400 dark:text-slate-400 ml-2'/> as React.ReactNode,
                                                            } [header.column.getIsSorted() as string] ?? null
                                                        }
                                                    </div>
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
                            invoicesTable.getRowModel().rows.map(row => (
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

                <TablePagination table={invoicesTable} tableData={invoices} dict={dict}/>
            </>
        )
    }
}

export default InvoicesTable