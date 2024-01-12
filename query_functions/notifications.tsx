import { authOptions } from "@/lib/auth"
import axios, { AxiosHeaderValue } from "axios"
import { getServerSession } from "next-auth"

export const getUserNotifications = async (user_id: string | number | undefined) => {
    const session = await getServerSession(authOptions)
    if (!session) return

    try {
        const { data: notifications } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/notifications/${user_id}`, {
            headers: {
                'Authorization': session?.user.accessToken as AxiosHeaderValue
            },
            withCredentials: true
        })
        return notifications
    } catch (error) {
        return error
    }
}