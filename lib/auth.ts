import { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
	pages: {
		signIn: '/auth/signin'
	},
	session: {
		strategy: 'jwt',
		maxAge: 10 * 24 * 60 * 60,
	},
	jwt: {
		maxAge: 10 * 24 * 60 * 60,
	},
	providers: [],
	callbacks: {
		async jwt({ token, user, trigger, session, account }) {
			if (trigger === "update") {
				return { ...token, ...session.user}
			}
			return { ...token, ...user}
		},
		async session({ session, token }) {
			session.user = token as any
			return session
		},
		async redirect({ url, baseUrl }) {
			return url.replace(baseUrl, process.env.SERVER_URL)
		}
	}
}

// to use on server components and react query
export async function getAuthToken() {
    let token: string | undefined

	if (typeof window === 'undefined') {
		const { cookies } = require("next/headers")
		const cookieStore = cookies()
		if (cookieStore.has('next-auth.session-token')) {
			token = cookieStore.get('next-auth.session-token')?.value
		}
	} else {
		const { getCookie } = require("cookies-next")
		token = getCookie('next-auth.session-token')
	}

	return `Bearer ${token}`
}