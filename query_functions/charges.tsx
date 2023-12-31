import { authOptions } from "@/lib/auth"
import axios, { AxiosHeaderValue } from "axios"
import { getServerSession } from "next-auth"

export const getCharges = async () => {
    const session = await getServerSession(authOptions)
    if (!session) return

    try {
        const { data: charges } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/charges`, {
            headers: {
                'Authorization': session?.user.accessToken as AxiosHeaderValue
            },
            withCredentials: true
        })
        return charges
    } catch (error) {
        return error
    }
}

export const getCharge = async () => {
    const session = await getServerSession(authOptions)
    if (!session) return

    try {
        const { data: charge } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/charges?user=${session.user.id}`, {
            headers: {
                'Authorization': session?.user.accessToken as AxiosHeaderValue
            },
            withCredentials: true
        })
        return charge
    } catch (error) {
        return error
    }
}