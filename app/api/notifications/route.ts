import { authOptions } from "@/lib/auth";
import getNotificationEmailPlainText from "@/templates/emails/NotificationPlainText";
import getNotificationEmailTemplate from "@/templates/emails/NotificationTemplate";
import { transporter } from "@/utils/nodemailer";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)

	const { email, title, description }: any = await request.json()
	if (!email || !title || !description) return NextResponse.json({ error : "Missing required data"}, { status: 400 })

    try {
        await transporter.sendMail({
            to: email,
            from: { address: "info@nvoicex.com", name: "Nvoicex" },
            subject: `Hello there 👋 ${session?.user.name}. You have a new notification.`,
            text: getNotificationEmailPlainText(session, title, description),
            html: getNotificationEmailTemplate(session, title, description)
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
        email: email
    }, { status: 200 })
}