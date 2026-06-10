/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        "import.meta.env.VITE_GOOGLE_CLIENT_ID": JSON.stringify(
          process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
            process.env.VITE_GOOGLE_CLIENT_ID ||
            ""
        ),
        "import.meta.env.VITE_BACKEND_URL": JSON.stringify(
          process.env.NEXT_PUBLIC_BACKEND_URL ||
            process.env.VITE_BACKEND_URL ||
            ""
        ),
        "import.meta.env.VITE_RAZORPAY_KEY_ID": JSON.stringify(
          process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
            process.env.VITE_RAZORPAY_KEY_ID ||
            ""
        ),
        "import.meta.env.VITE_S3_IMAGE_URL": JSON.stringify(
          process.env.NEXT_PUBLIC_S3_IMAGE_URL ||
            process.env.VITE_S3_IMAGE_URL ||
            ""
        ),
        "import.meta.env.VITE_AI_AGENT_PUBLIC_KEY": JSON.stringify(
          process.env.NEXT_PUBLIC_AI_AGENT_PUBLIC_KEY ||
            process.env.VITE_AI_AGENT_PUBLIC_KEY ||
            ""
        ),
      })
    );
    return config;
  },
};

export default nextConfig;
