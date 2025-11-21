import type { NextConfig } from "next";
import { webpack } from "next/dist/compiled/webpack/webpack";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    reactCompiler: true,
    typedEnv: true,
    gzipSize: true,
  },
  typedRoutes: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.graphql$/,
      exclude: /node_modules/,
      loader: '@graphql-tools/webpack-loader',
    })

    return config
  },
};

export default nextConfig;
