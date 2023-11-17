import { createColumnHelper } from "@tanstack/react-table"
import { renderInvoiceActions, renderInvoiceDescription, renderInvoiceNumber, renderInvoiceStatus, renderTableDateCell, renderTableDollarCell } from "./column_helpers"
import Stripe from "stripe"

const columnHelper = createColumnHelper<Partial<Stripe.Invoice>>()

export const invoiceTableColumns = [
    columnHelper.accessor('number', {
        header: () => <span>Invoice number</span>,
        cell: info => renderInvoiceNumber(info.getValue() as string)
    }),
    columnHelper.accessor(row => row, {
        id: 'account_name',
        header: () => <span>Provider</span>,
        cell: row => row.getValue().metadata?.provider || row.getValue().account_name
    }),
    columnHelper.accessor(row => row, {
        id: 'description',
        header: () => <span>Description</span>,
        cell: row => renderInvoiceDescription(row.getValue(), row.row.index)
    }),
    columnHelper.accessor('created', {
        header: () => <span>Created</span>,
        cell: info => renderTableDateCell(info.getValue() as number, 'MMM dd, yyyy') || ''
    }),
    columnHelper.accessor('due_date', {
        header: () => <span>Due Date</span>,
        cell: info => renderTableDateCell(info.getValue() as number, 'MMM dd, yyyy') || ''
    }),
    columnHelper.accessor('amount_due', {
        header: () => <span>Invoice Total</span>,
        cell: info => renderTableDollarCell(info?.getValue() as number) || ''
    }),
    columnHelper.accessor('status', {
        header: () => <span>Status</span>,
        cell: info => renderInvoiceStatus(info.getValue() as string)
    }),
    columnHelper.accessor(row => row, {
        id: 'paid_at',
        header: () => <span>Paid Date</span>,
        cell: row => row.getValue().paid && renderTableDateCell(row.getValue().status_transitions?.paid_at as number, 'MMM dd, yyyy') || ''
    }),
    columnHelper.accessor(row => row, {
        id: 'actions',
        header: () => <span className='text-center'></span>,
        cell: row => renderInvoiceActions(row.getValue() as Partial<Stripe.Invoice>, row.row.index)
    }),
]