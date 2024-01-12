import axios, { AxiosHeaderValue } from "axios"

export async function createNotification(session: any, data: Partial<TNotification>) {
    const { data: response } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/notifications`, JSON.stringify(data), {
        headers: {
            'Authorization': session?.user.accessToken as AxiosHeaderValue
        }
    })
    return response
}

export async function deleteNotification(session: any, data: Partial<TNotification>) {
    const { data: response } = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_API_URL}/notifications`, {
        headers: {
            'Authorization': session?.user.accessToken as AxiosHeaderValue
        },
        data: {
            id: data
        }
    })
    return response
}
