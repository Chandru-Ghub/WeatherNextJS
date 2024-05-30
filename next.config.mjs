/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['lucide-react'],
    images:{
        domains:['openweathermap.org','cdn.weatherbit.io','flagsapi.com']
    }
};

export default nextConfig;
