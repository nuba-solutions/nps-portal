
export const getInvoiceStatusLocale = (status: string | null, invoice_dict: any) => {
    switch (status) {
        case 'open':
            return invoice_dict.statuses.open
        case 'paid':
            return invoice_dict.statuses.paid
        case 'uncollectible':
            return invoice_dict.statuses.uncollectible
        case 'deleted':
            return invoice_dict.statuses.deleted
        case 'draft':
            return invoice_dict.statuses.draft
        case 'void':
            return invoice_dict.statuses.void
    }
}