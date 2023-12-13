import { withAuth } from "next-auth/middleware";

export const config = { matcher: ["/(PrivateViews)/:path*"] }

export default withAuth({
    pages: {
        signIn: "/auth/signin",
    },
});