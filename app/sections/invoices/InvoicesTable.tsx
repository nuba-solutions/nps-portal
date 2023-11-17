"use client"

import { getInvoices } from '@/query_functions/invoices'
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
import { invoiceTableColumns } from '@/utils/column_definitions'
import TablePagination from '@/components/ui/pagination/TablePagination'
import { HiSortAscending, HiSortDescending } from 'react-icons/hi'

type TInvoiceTableProps = {
    searchValue: string
    setSearchValue: React.Dispatch<SetStateAction<string>>
    setSorting: React.Dispatch<SetStateAction<ColumnSort[]>>
    sorting: ColumnSort[]
}

const InvoicesTable = ({searchValue, setSearchValue, sorting, setSorting}: TInvoiceTableProps) => {
    const { data: invoices, error, isError, isPending } = useQuery({
        queryKey: ['all_invoices'],
        queryFn: () => getInvoices(''),
    })

    const invoicesTable = useReactTable({
        data: invoices,
        columns: invoiceTableColumns,
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
        enableMultiSort: true,
        onSortingChange: setSorting,
    })

    if (isPending) {
        return <span>Loading...</span>
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

                <TablePagination table={invoicesTable} tableData={invoices}/>
            </>
        )
    }
}

export default InvoicesTable