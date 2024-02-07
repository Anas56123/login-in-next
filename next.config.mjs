/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {remotePatterns: [{
        protocol: "https",
        hostname: "cqrmexkgwtucsgeiuoqu.supabase.co",
        port: "",
        pathname: "/storage/v1/object/sign/URLs/**",
    }]}
};

export default nextConfig;
