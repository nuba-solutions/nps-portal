import { Session } from "next-auth"

const getNotificationEmailPlainText = (
        session: Session | null,
        title: string,
        description: string,
        subject: {
            prefix: string
            suffix: string
        }
    ) => {
    return `
        =====================================================
        Nvoicex Payments
        =====================================================

        ${subject.prefix} ${session?.user.name} ${subject.suffix}.

        -----------------------------------------------------

        Title: ${title}

        Description: ${description}

        =====================================================
    `
}

export default getNotificationEmailPlainText