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
    SECRET_KEY: "MuhammadBilawalAshrafOwnsUrbanFitsBrand",
    DEFAULT_PFP: "https://urban-fits.s3.eu-north-1.amazonaws.com/website-copyrights/default-pfp.jpg",
    // IP2Lcation access key
    IPINFO_ACCESS_TOKEN: "9435a9027e6305",
    // Pusher app credentials
    PUSHER_APP_ID: "1665659",
    PUSHER_KEY: "b1922c08c9c41869d7b3",
    PUSHER_SECRET: "cef24361002750c60137",
    PUSHER_CLUSTER: "mt1"
  }
}
module.exports = nextConfig
