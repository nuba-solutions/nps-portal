import { authOptions } from "@/lib/auth";
import getNotificationEmailPlainText from "@/templates/emails/NotificationPlainText";
import getNotificationEmailTemplate from "@/templates/emails/NotificationTemplate";
import { transporter } from "@/utils/nodemailer";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error : "Missing session"}, { status: 400 })

	const { email, title, description, subject }: {
        email: string
        title: string
        description: string
        subject: {
            prefix: string
            suffix: string
        }
    } = await request.json()
	if (!email || !title || !description) return NextResponse.json({ error : "Missing required data"}, { status: 400 })

    try {
        await transporter.sendMail({
            to: email,
            from: { address: "info@nvoicex.com", name: "Nvoicex" },
            subject: `${subject.prefix} ${session?.user.name} ${subject.suffix}`,
            text: getNotificationEmailPlainText(session, title, description, subject),
            html: getNotificationEmailTemplate(session, title, description, subject)
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
        email: email
    }, { status: 200 })
}