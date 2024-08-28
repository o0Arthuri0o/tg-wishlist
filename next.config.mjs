/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
        
                {
                    protocol: 'https',
                    hostname: 'tg-wishlist.vercel.app',
                    port: '',
                    pathname: '/_next/**',
                },
        ]

    }
};

export default nextConfig;
