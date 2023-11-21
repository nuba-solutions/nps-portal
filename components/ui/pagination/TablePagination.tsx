import { Table } from '@tanstack/react-table'
import React from 'react'

type TTablePaginationProps = {
    table: Table<any>
    tableData: any[]
    pageSizes?: number[]
}

const TablePagination = ({table, tableData, pageSizes = [5, 10, 20, 30, 40, 50]}: TTablePaginationProps) => {
    return (
        <nav className="flex flex-col gap-4 lg:flex-row items-center justify-between pt-4" aria-label="Table navigation">
            <div className='flex items-center'>
                <select
                    className='input input-sm'
                    value={table.getState().pagination.pageSize}
                    onChange={e => {
                        table.setPageSize(Number(e.target.value))
                    }}
                >
                    {pageSizes.map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
                <span className="ml-4 text-sm font-normal">
                    Showing
                    <span className="font-semibold mx-2">
                    {
                        tableData.length > table.getState().pagination.pageSize ? table.getState().pagination.pageSize : tableData.length
                    }
                    </span>
                    of
                    <span className="font-semibold mx-2">{tableData.length}</span>
                    Records
                </span>
            </div>
            <div className='flex items-center'>
                <span className="mr-4 flex items-center text-sm font-normal">
                    <div>Page</div>
                    <strong className='font-semibold mx-2'>
                        {table.getState().pagination.pageIndex + 1}
                        <span className='font-normal mx-2'>of</span>
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
                            First
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="flex items-center justify-center px-3 h-8 ml-0 leading-tight bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-primary-500 shadow-lg disabled:opacity-50"
                        >
                            Previous
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className="flex items-center justify-center px-3 h-8 ml-0 leading-tight bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-primary-500 shadow-lg disabled:opacity-50"
                        >
                            Next
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                            className="flex items-center justify-center px-3 h-8 ml-0 leading-tight bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-primary-500 rounded-r-lg shadow-lg disabled:opacity-50"
                        >
                            Last
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default TablePagination