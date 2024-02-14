import { authOptions, getAuthToken } from "@/lib/auth"
import axios from "axios"
import { getServerSession } from "next-auth"

export const getUsers = async () => {
    const session = await getServerSession(authOptions)
    if (!session) return
    const token = await getAuthToken()

    try {
        const { data: users } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/users`, {
            headers: {
                'Authorization': token
            },
            withCredentials: true
        })
        return users
    } catch (error) {
        console.error(error)
        return error
    }
}

export const getUser = async () => {
    const session = await getServerSession(authOptions)
    if (!session) return
    const token = await getAuthToken()

    try {
        const { data: user } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/users/${session.user.id}`, {
            headers: {
                'Authorization': token
            },
            withCredentials: true
        })
        return user
    } catch (error) {
        console.error(error)
        return error
    }
}