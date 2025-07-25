import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://vimsbarcvqpdfhqmytjx.supabase.co/storage/v1/object/public/meal-pictures/**')],
  },
};

export default nextConfig;
