import { getAuthToken } from "@/lib/auth"
import axios from "axios"

export async function createClientCredentials({user_id, client_provider_id}: {user_id: string, client_provider_id: number}) {
    const token = await getAuthToken()
    if (!token) return

    try {
        const { data: clientCredentials } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/clients`, {
                user_id,
                client_provider_id
            }, {
            headers: {
                'Authorization': token
            },
            withCredentials: true
        })

        return clientCredentials
    } catch (error) {
        console.error(error)
        return error
    }
}
