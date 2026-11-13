/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/index.html",
        destination: "/",
        permanent: false,
      },
      {
        source: "/contact.html",
        destination: "/contact",
        permanent: false,
      },
      {
        source: "/services.html",
        destination: "/services",
        permanent: false,
      },
      {
        source: "/industries.html",
        destination: "/industries",
        permanent: false,
      },
      {
        source: "/service-:slug.html",
        destination: "/services/:slug",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
