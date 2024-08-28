/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
        
                {
                    protocol: 'https',
                    hostname: 'tg-wishlist.vercel.app',
                    port: '',
                    pathname: '/next/**',
                },
        ]

    }
};

export default nextConfig;
