import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from "next/navigation";

export default async function page() {
	const session = await getServerSession(authOptions)
	session?.user ? redirect("/dashboard") : redirect('/auth/signin')
}
