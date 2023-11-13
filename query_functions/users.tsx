import { authOptions } from "@/lib/auth"
import axios, { AxiosHeaderValue } from "axios"
import { getServerSession } from "next-auth"

export const getUsers = async () => {
    const session = await getServerSession(authOptions)
    if (!session) return

    try {
        const { data: users } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/users`, {
            headers: {
                'Authorization': session?.user.accessToken as AxiosHeaderValue
            },
            withCredentials: true
        })
        return users
    } catch (error) {
        return error
    }
}

export const getUser = async () => {
    const session = await getServerSession(authOptions)
    if (!session) return

    try {
        const { data: user } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/users/${session.user.id}`, {
            headers: {
                'Authorization': session?.user.accessToken as AxiosHeaderValue
            },
            withCredentials: true
        })
        return user
    } catch (error) {
        return error
    }
}