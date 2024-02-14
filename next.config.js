/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
        return {
            beforeFiles: [
                // Anything pointing to <WEBSITE_URL>/api/auth/* will be rewritten to <API_URL>/api/auth/*
                // including <WEBSITE_URL>/api/auth => <PORTAL_URL>/api/auth
                {
                source: `/api/auth/:path*`,
                destination: `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/:path*`,
                },
            ],
        };
    },
}

module.exports = nextConfig
