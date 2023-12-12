import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
	pages: {
		signIn: '/auth/signin',
		error: '/auth/error'
	},
	providers: [
        CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Username", type: "text" },
				password: { label: "Password", type: "password" },
				client_provider: { label: "Provider", type: "option" }
			},
			async authorize(credentials, req) {
				if (!credentials?.email || !credentials?.password || !credentials.client_provider) return null;

				const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/signin`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					credentials: 'include',
					body: JSON.stringify({
						email: credentials?.email,
						password: credentials?.password,
						client_provider: credentials?.client_provider
					}),
				})

				if (!res || res.status === 401) return null;

				const user = await res.json();
				if (!user) return null;

				return {
					id: `${user.id}`,
					name: user.name,
					email: user.email,
					theme: user.theme,
					notificationsEnabled: user.notificationsEnabled,
					client_provider: user.client_provider,
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
		},
		async redirect({url, baseUrl}) {
			return url.startsWith(baseUrl)
				? Promise.resolve(url)
				: Promise.resolve(baseUrl)
		}
	},
	cookies: {
		sessionToken: {
			name: `next-auth.session-token`,
			options: {
				httpOnly: true,
				sameSite: "none",
				path: "/",
				secure: true,
			},
		},
		callbackUrl: {
			name: `next-auth.callback-url`,
			options: {
				httpOnly: true,
				sameSite: "none",
				path: "/",
				secure: true,
			},
		},
		csrfToken: {
			name: "next-auth.csrf-token",
			options: {
				httpOnly: true,
				sameSite: "none",
				path: "/",
				secure: true,
			}
		},
	}
}