import axios, { AxiosHeaderValue } from "axios"

export default async function updateUserTheme(session: any, data: Partial<TUser>) {
    const { data: response } = await axios.put(`${process.env.NEXT_PUBLIC_BASE_API_URL}/users`, JSON.stringify(data), {
        headers: {
            'Authorization': session?.user.accessToken as AxiosHeaderValue
        }
    })

    return response
}