import { authOptions, getAuthToken } from "@/lib/auth"
import axios from "axios"
import { getServerSession } from "next-auth"
import Stripe from "stripe"

export const getInvoicesByStatus = async (invoice_status: Stripe.Invoice.Status, stripeId: string) => {
    const session = await getServerSession(authOptions)
    if (!session) return
    const token = await getAuthToken()

    try {
        const { data: invoices } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/invoices/${invoice_status}?stId=${stripeId}`, {
            headers: {
                'Authorization': token
            },
            withCredentials: true
        })
        return invoices
    } catch (error) {
        console.error(error)
        return error
    }
}

export const getAllInvoices = async (stripeId: string) => {
    const session = await getServerSession(authOptions)
    if (!session) return
    const token = await getAuthToken()

    try {
        const { data: invoices } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/invoices?stId=${stripeId}`, {
            headers: {
                'Authorization': token
            },
            withCredentials: true
        })
        return invoices
    } catch (error) {
        console.error(error)
        return error
    }
}