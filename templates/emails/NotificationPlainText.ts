import { Session } from "next-auth"

const getNotificationEmailPlainText = (
        session: Session | null,
        title: string,
        description: string
    ) => {
    return `
        =====================================================
        Nvoicex Payments
        =====================================================

        Hello ${session?.user.name}. You have a notification.

        -----------------------------------------------------

        Title: ${title}

        Description: ${description}

        =====================================================
    `
}

export default getNotificationEmailPlainText