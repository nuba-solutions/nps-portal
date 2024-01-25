import { Table } from '@tanstack/react-table'
import React from 'react'

type TTablePaginationProps = {
    table: Table<any>
    tableData: any[]
    pageSizes?: number[]
    dict: any
}

const TablePagination = ({table, tableData, pageSizes = [5, 10, 20, 30, 40, 50], dict}: TTablePaginationProps) => {
    const { table_pagination: table_pagination_dictionary } = dict.pages.charges_history
    return (
        <nav className="flex flex-col gap-4 lg:flex-row items-center justify-between pt-4" aria-label="Table navigation">
            <div className='flex items-center'>
                <label htmlFor="invoice-table-page-size-selector" className='sr-only'>{table_pagination_dictionary['select_message']}</label>
                <select
                    id='invoice-table-page-size-selector'
                    className='input input-sm'
                    value={table.getState().pagination.pageSize}
                    onChange={e => {
                        table.setPageSize(Number(e.target.value))
                    }}
                >
                    {pageSizes.map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            {table_pagination_dictionary['show']} {pageSize}
                        </option>
                    ))}
                </select>
                <span className="ml-4 text-sm font-normal">
                    {table_pagination_dictionary['showing']}
                    <span className="font-semibold mx-2">
                    {
                        tableData.length > table.getState().pagination.pageSize ? table.getState().pagination.pageSize : tableData.length
                    }
                    </span>
                    {table_pagination_dictionary['of']}
                    <span className="font-semibold mx-2">{tableData.length}</span>
                    {table_pagination_dictionary['records']}
                </span>
            </div>
            <div className='flex items-center'>
                <span className="mr-4 flex items-center text-sm font-normal">
                    <div>{table_pagination_dictionary['page']}</div>
                    <strong className='font-semibold mx-2'>
                        {table.getState().pagination.pageIndex + 1}
                        <span className='font-normal mx-2'>{table_pagination_dictionary['of']}</span>
                        {table.getPageCount()}
                    </strong>
                </span>
                <ul className="inline-flex -space-x-px text-sm h-8">
                    <li>
                        <button
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                            className="flex items-center justify-center px-3 h-8 ml-0 leading-tight rounded-l-lg bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-primary-500 shadow-lg disabled:opacity-50"
                        >
                            {table_pagination_dictionary['first']}
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="flex items-center justify-center px-3 h-8 ml-0 leading-tight bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-primary-500 shadow-lg disabled:opacity-50"
                        >
                            {table_pagination_dictionary['previous']}
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className="flex items-center justify-center px-3 h-8 ml-0 leading-tight bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-primary-500 shadow-lg disabled:opacity-50"
                        >
                            {table_pagination_dictionary['next']}
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                            className="flex items-center justify-center px-3 h-8 ml-0 leading-tight bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-primary-500 rounded-r-lg shadow-lg disabled:opacity-50"
                        >
                            {table_pagination_dictionary['last']}
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default TablePagination