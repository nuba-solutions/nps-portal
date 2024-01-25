import { authOptions } from "@/lib/auth";
import getShareInvoiceEmailPlainText from "@/templates/emails/ShareInvoicePlainText";
import getShareInvoiceEmailTemplate from "@/templates/emails/ShareInvoiceTemplate";
import { transporter } from "@/utils/nodemailer";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)

	const { email, invoiceNumber, invoiceLink, invoiceAmount, subject, dict }: {
        email: string
        invoiceNumber: string
        invoiceLink: string
        invoiceAmount: string
        dict: any
        subject: {
            prefix: string
            suffix: string
        }
    } = await request.json()
	if (!email || !invoiceNumber || !invoiceLink || !invoiceAmount) return NextResponse.json({ error : "Missing required data"}, { status: 400 })

    try {
        await transporter.sendMail({
            to: email,
            from: { address: "info@nvoicex.com", name: "Nvoicex" },
            subject: `${subject.prefix} ${session?.user.name} ${subject.suffix}`,
            text: getShareInvoiceEmailPlainText(session, invoiceNumber, invoiceLink, invoiceAmount, dict),
            html: getShareInvoiceEmailTemplate(session, invoiceNumber, invoiceLink, invoiceAmount, dict)
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
        email: email,
        invoiceLink: invoiceLink,
        invoiceNumber: invoiceNumber
    }, { status: 200 })
}