import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from "next/navigation";

export default async function page({params: {lang}}: { params: { lang: Locale } }) {
	const session = await getServerSession(authOptions)
	session?.user ? redirect(`/${lang}/dashboard`) : redirect(`/${lang}/auth/signin`)
}
