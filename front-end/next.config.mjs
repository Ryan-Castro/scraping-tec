/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.terabyteshop.com.br',
            },
            {
                protocol: 'https',
                hostname: 'images.kabum.com.br',
            },
            {
                protocol: 'https',
                hostname: 'static.kabum.com.br',
            },
            {
                protocol: 'https',
                hostname: 'www.kabum.com.br',
            },
            {
                protocol: 'https',
                hostname: 'media.pichau.com.br',
            },
        ],
    },
    
};

export default nextConfig;
