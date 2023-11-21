import { CellContext, ColumnDef } from "@tanstack/react-table"
import { renderInvoiceActions, renderInvoiceDetails, renderInvoiceNumber, renderInvoiceStatus, renderTableDateCell, renderTableDollarCell } from "./column_helpers"
import Stripe from "stripe"

export const invoiceTableColumns: ColumnDef<Partial<Stripe.Invoice>, any>[] = [
    {
        header: 'Invoice Number',
        accessorKey: 'number',
        cell: (row: CellContext<Partial<Stripe.Invoice>, unknown>) => renderInvoiceNumber(row.row.original.number as string)
    },
    {
        header: 'Provider',
        accessorFn: (row: Partial<Stripe.Invoice>) => `${row.metadata?.provider || row.account_name}`
    },
    {
        header: 'Description',
        accessorFn: (row: Partial<Stripe.Invoice>) => `${row.description || 'Invoice charges'}`,
    },
    {
        header: 'Details',
        cell: (row: CellContext<Partial<Stripe.Invoice>, unknown>) => renderInvoiceDetails(row.row.original)
    },
    {
        header: 'Created',
        cell: (row: CellContext<Partial<Stripe.Invoice>, unknown>) => renderTableDateCell(row.row.original.created as number, 'MMM dd yyyy')
    },
    {
        header: 'Due date',
        cell: (row: CellContext<Partial<Stripe.Invoice>, unknown>) => renderTableDateCell(row.row.original.due_date as number, 'MMM dd yyyy')
    },
    {
        header: 'Total',
        accessorKey: 'amount_due',
        cell: (row: CellContext<Partial<Stripe.Invoice>, unknown>) => renderTableDollarCell(row.row.original.amount_due as number) || ''
    },
    {
        header: 'Status',
        accessorKey: 'status',
        cell: (row: CellContext<Partial<Stripe.Invoice>, unknown>) => renderInvoiceStatus(row.row.original.status as string)
    },
    {
        header: 'Paid date',
        cell: (row: CellContext<Partial<Stripe.Invoice>, unknown>) => row.row.original.paid && renderTableDateCell(row.row.original.status_transitions?.paid_at as number, 'MMM dd, yyyy') || ''
    },
    {
        header: 'Actions',
        cell: (row: CellContext<Partial<Stripe.Invoice>, unknown>) => renderInvoiceActions(row.row.original)
    }
]