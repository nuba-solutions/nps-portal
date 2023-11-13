import axios, { AxiosHeaderValue } from "axios"

export default async function updateUserPreferences(session: any, data: UserPreferences) {
    const { data: response } = await axios.put(`${process.env.NEXT_PUBLIC_BASE_API_URL}/preferences`, JSON.stringify(data), {
        headers: {
            'Authorization': session?.user.accessToken as AxiosHeaderValue
        }
    })

    return response
}