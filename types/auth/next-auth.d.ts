import "next-auth"
import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session extends DefaultSession {
        user: {
            id: string,
            theme: string,
            stripeId: string,
            notificationsEnabled: boolean,
            client_provider: TClientProvider,
            accessToken: JWT
        } & DefaultSession["user"]
    }
}