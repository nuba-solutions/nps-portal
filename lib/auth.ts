import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
	pages: {
		signIn: '/'
	},
	providers: [
        CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Username", type: "text" },
				password: { label: "Password", type: "password" }
			},
			async authorize(credentials, req) {
				if (!credentials?.email || !credentials?.password) return null;

				const res = await fetch(`${process.env.BASE_API_URL}/signin`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					credentials: 'include',
					body: JSON.stringify({
						email: credentials?.email,
						password: credentials?.password
					}),
				})

				if (!res || res.status === 401) return null;

				const user = await res.json();
				if (!user) return null;

				return {
					id: `${user.id}`,
					name: user.name,
					email: user.email,
                    accessToken: user.accessToken
				}
			}
        })
	],
	callbacks: {
		async jwt({ token, user, trigger, session }) {
			if (trigger === "update") {
				return { ...token, ...session.user, password: null}
			}
			return { ...token, ...user, password: null}
		},
		async session({ session, token }) {
			session.user = token as any
			return session
		}
	}
}