/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'placeimg.com',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'blog-re51km1de-sasas-projects-3fee24ea.vercel.app',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'blogger-pwdk.vercel.app ',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'blog-mu-cyan-36.vercel.app',
          pathname: '/**',
        },
        {
          hostname: "localhost",
        },
        {
          hostname: "res.cloudinary.com",
        },
      ],
    },
  };
  
  export default nextConfig;
  