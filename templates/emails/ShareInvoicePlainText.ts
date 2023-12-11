import { Session } from "next-auth"

const getShareInvoiceEmailPlainText = (
        session: Session | null,
        invoiceNumber: string,
        invoiceLink: string,
        invoiceAmount: string
    ) => {
    return `
        =====================================================
        Nvoicex Payments
        =====================================================

        ${session?.user.name} sent you an invoice

        -----------------------------------------------------
        INVOICE DETAILS:

        Invoice Number: ${invoiceNumber}
        Invoice Amount: ${invoiceAmount}
        -----------------------------------------------------

        Pay using:
        ${invoiceLink}

        =====================================================
    `
}

export default getShareInvoiceEmailPlainText