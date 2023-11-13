import { authOptions } from "@/lib/auth"
import axios, { AxiosHeaderValue } from "axios"
import { getServerSession } from "next-auth"

export const getInvoices = async (invoice_status: string) => {
    const session = await getServerSession(authOptions)
    if (!session) return

    try {
        const { data: invoices } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/invoices/${invoice_status}`, {
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