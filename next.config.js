/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/admin/articles",
        permanent: true,
      },
    ]
  },
  output: 'standalone'
}

module.exports = nextConfig
