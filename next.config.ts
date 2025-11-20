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
  turbopack: {
    resolveAlias: {
      'node:fs/promises': 'fs',
    }
  }
};

export default nextConfig;
