import { CellContext, ColumnDef } from "@tanstack/react-table"
import { renderInvoiceActions, renderInvoiceDetails, renderInvoiceNumber, renderInvoiceStatus, renderTableDateCell, renderTableDollarCell } from "./column_helpers"
import Stripe from "stripe"
import { Locale } from "@/i18n.config"

export const getInvoiceTableColumnsDefinition = (dict: any, lang: Locale) => {
    const { table_columns: table_columns_dictionary } = dict.pages.charges_history
    const invoiceTableColumns: ColumnDef<Partial<Stripe.Invoice>, any>[] = [
        {
            header: table_columns_dictionary["invoice_number"],
            accessorKey: 'number',
            cell: (row: CellContext<Partial<Stripe.Invoice>, unknown>) => renderInvoiceNumber(row.row.original.number as string, table_columns_dictionary)
        },
        {
            header: table_columns_dictionary["provider"],
            accessorFn: (row: Partial<Stripe.Invoice>) => `${row.metadata?.provider || row.account_name}`
        },
        {
            header: table_columns_dictionary["description"],
            accessorFn: (row: Partial<Stripe.Invoice>) => `${row.description || table_columns_dictionary["generic_description"]}`,
        },
        {
            header: table_columns_dictionary["details"],
            cell: (row: CellContext<Partial<Stripe.Invoice>, unknown>) => renderInvoiceDetails(row.row.original, table_columns_dictionary)
        },
        {
            header: table_columns_dictionary["created"],
            cell: (row: CellContext<Partial<Stripe.Invoice>, unknown>) => renderTableDateCell(row.row.original.created as number, 'MMM dd yyyy', lang)
        },
        {
            header: table_columns_dictionary["due_date"],
            cell: (row: CellContext<Partial<Stripe.Invoice>, unknown>) => renderTableDateCell(row.row.original.due_date as number, 'MMM dd yyyy', lang)
        },
        {
            header: table_columns_dictionary["total"],
            accessorKey: 'amount_due',
            cell: (row: CellContext<Partial<Stripe.Invoice>, unknown>) => renderTableDollarCell(row.row.original.amount_due as number) || ''
        },
        {
            header: table_columns_dictionary["status"],
            accessorKey: 'status',
            cell: (row: CellContext<Partial<Stripe.Invoice>, unknown>) => renderInvoiceStatus(row.row.original.status as string, table_columns_dictionary)
        },
        {
            header: table_columns_dictionary["paid_date"],
            cell: (row: CellContext<Partial<Stripe.Invoice>, unknown>) => row.row.original.paid && renderTableDateCell(row.row.original.status_transitions?.paid_at as number, 'MMM dd, yyyy', lang) || ''
        },
        {
            header: table_columns_dictionary["actions"],
            cell: (row: CellContext<Partial<Stripe.Invoice>, unknown>) => renderInvoiceActions(row.row.original, dict)
        }
    ]

    return invoiceTableColumns
}