import { Session } from "next-auth"

const getShareInvoiceEmailPlainText = (
        session: Session | null,
        invoiceNumber: string,
        invoiceLink: string,
        invoiceAmount: string,
        dict: any
    ) => {
    return `
        =====================================================
        Nvoicex Payments
        =====================================================

        ${session?.user.name} ${dict["email_subject_suffix"]}

        -----------------------------------------------------
        ${dict["invoice_details"]}

        ${dict["invoice_number"]}: ${invoiceNumber}
        ${dict["invoice_amount"]}: ${invoiceAmount}
        -----------------------------------------------------

        ${dict["pay_using_link"]}:
        ${invoiceLink}

        =====================================================
    `
}

export default getShareInvoiceEmailPlainText