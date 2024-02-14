import { authOptions, getAuthToken } from "@/lib/auth"
import axios from "axios"
import { getServerSession } from "next-auth"

export const getUserNotifications = async (user_id: string | number | undefined) => {
    const session = await getServerSession(authOptions)
    if (!session) return
    const token = await getAuthToken()

    try {
        const { data: notifications } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/notifications/${user_id}`, {
            headers: {
                'Authorization': token
            },
            withCredentials: true
        })
        return notifications
    } catch (error) {
        console.error(error)
        return error
    }
}