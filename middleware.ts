import { withAuth } from "next-auth/middleware";

export const config = { matcher: ["/(Private Views)/:path*"] }

export default withAuth({
    pages: {
        signIn: "/auth/signin",
    },
});