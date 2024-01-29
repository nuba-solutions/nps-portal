import { authOptions } from "@/lib/auth"
import axios, { AxiosHeaderValue } from "axios"
import { getServerSession } from "next-auth"
import Stripe from "stripe"

export const getInvoicesByStatus = async (invoice_status: Stripe.Invoice.Status, stripeId: string) => {
    const session = await getServerSession(authOptions)
    if (!session) return

    try {
        const { data: invoices } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/invoices/${invoice_status}?stId=${stripeId}`, {
            headers: {
                'Authorization': session?.user.accessToken as AxiosHeaderValue
            },
            withCredentials: true
        })
        return invoices
    } catch (error) {
        return error
    }
}

export const getAllInvoices = async (stripeId: string) => {
    const session = await getServerSession(authOptions)
    if (!session) return

    try {
        const { data: invoices } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/invoices?stId=${stripeId}`, {
            headers: {
                'Authorization': session?.user.accessToken as AxiosHeaderValue
            },
            withCredentials: true
        })
        return invoices
    } catch (error) {
        return error
    }
}