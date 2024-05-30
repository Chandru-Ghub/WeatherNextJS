/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['lucide-react'],
    images:{
        domains:['openweathermap.org','www.weatherbit.io']
    }
};

export default nextConfig;
