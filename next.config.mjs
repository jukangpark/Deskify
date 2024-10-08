/** @type {import('next').NextConfig} */
const nextConfig = {
  // strict mode 해제
  reactStrictMode: false,
  images: {
    domains: [
      "img1.kakaocdn.net",
      "k.kakaocdn.net",
      "aqcpjrrdkmffieyetetc.supabase.co",
    ],
  },

  // headers
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
