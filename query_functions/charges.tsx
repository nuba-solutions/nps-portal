import { authOptions } from "@/lib/auth"
import axios, { AxiosHeaderValue } from "axios"
import { getServerSession } from "next-auth"

export const getCharges = async () => {
    const session = await getServerSession(authOptions)
    try {
        const { data: charges } = await axios.get(`${process.env.BASE_API_URL}/charges`, {
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