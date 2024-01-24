import { Session } from "next-auth"

const getNotificationEmailTemplate = (
        session: Session | null,
        title: string,
        description: string,
        subject: {
            prefix: string
            suffix: string
        }
    ) => {
    return `
        <!doctype html>
        <html>
            <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>Nvoicex</title>
            </head>
            <body>
                <small>${subject.prefix} <strong>${session?.user.name}</strong></small> ${subject.suffix}.
                <h3>${title}</h3>
                <p>${description}</p>
            </body>
        </html>
    `
}

export default getNotificationEmailTemplate