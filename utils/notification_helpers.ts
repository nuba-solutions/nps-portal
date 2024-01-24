import axios, { AxiosHeaderValue } from "axios"
import { Session } from "next-auth"

export async function createNotification(session: Session, data: Partial<TNotification>) {
    const { data: response } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/notifications`, JSON.stringify(data), {
        headers: {
            'Authorization': session?.user.accessToken as AxiosHeaderValue
        }
    })
    await sendEmailNotification(session, data)
    return response
}

const sendEmailNotification = async (session: Session, data: Partial<TNotification>) => {
    const notificationResponse = await axios.post('/api/notifications', {
        email: session.user.email,
        title: data.title,
        description: data.description,
        subject: data.subject
    })

    return notificationResponse
}

export async function deleteNotification(session: Session, data: Partial<TNotification>) {
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
