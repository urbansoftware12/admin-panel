/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "**",
    }]
  },
  env: {
    HOST: "https://st.urbanfits.ae",
    // HOST: "http://localhost:3000",
    MONGO_URI: "mongodb+srv://UFdbuser:Admin%402023@cluster0.qogq2kp.mongodb.net/?tls=true",
    SECRET_KEY: "MuhammadBilawalAshrafOwnsUrbanFitsBrand",
    DEFAULT_PFP: "https://urban-fits.s3.eu-north-1.amazonaws.com/website-copyrights/default-pfp.jpg",
    // IP2Lcation access key
    IPINFO_ACCESS_TOKEN: "9435a9027e6305",
    // Pusher app credentials
    PUSHER_APP_ID: "1665659",
    PUSHER_KEY: "b1922c08c9c41869d7b3",
    PUSHER_SECRET: "cef24361002750c60137",
    PUSHER_CLUSTER: "mt1"
  },
  async headers() {
    return [
      {
        source: "/api/(.*)",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  }
}
module.exports = nextConfig
