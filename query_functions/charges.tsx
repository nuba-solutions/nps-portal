import { authOptions, getAuthToken } from "@/lib/auth"
import axios from "axios"
import { getServerSession } from "next-auth"

export const getCharges = async () => {
    const session = await getServerSession(authOptions)
    if (!session) return
    const token = await getAuthToken()

    try {
        const { data: charges } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/charges`, {
            headers: {
                'Authorization': token
            },
            withCredentials: true
        })
        return charges
    } catch (error) {
        console.error(error)
        return error
    }
}

export const getCharge = async () => {
    const session = await getServerSession(authOptions)
    if (!session) return
    const token = await getAuthToken()

    try {
        const { data: charge } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/charges?user=${session.user.id}`, {
            headers: {
                'Authorization': token
            },
            withCredentials: true
        })
        return charge
    } catch (error) {
        console.error(error)
        return error
    }
}