import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  serverExternalPackages: ["@aws-sdk/client-s3", "@genspark/cli", "@prisma/adapter-pg", "pg"],
  outputFileTracingIncludes: {
    "/api/admin/blog/generate": [
      "./node_modules/@genspark/cli/**/*",
      "./node_modules/commander/**/*",
      "./node_modules/ws/**/*",
      "./node_modules/yazl/**/*",
      "./node_modules/buffer-crc32/**/*",
    ],
    "/api/cron/daily-blog": [
      "./node_modules/@genspark/cli/**/*",
      "./node_modules/commander/**/*",
      "./node_modules/ws/**/*",
      "./node_modules/yazl/**/*",
      "./node_modules/buffer-crc32/**/*",
    ],
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { protocol: "https", hostname: "farolabsystems.s3.ap-southeast-2.amazonaws.com" },
      { protocol: "https", hostname: "s3.ap-southeast-2.amazonaws.com" },
    ],
  },
};

export default nextConfig;
