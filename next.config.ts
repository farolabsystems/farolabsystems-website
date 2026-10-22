import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  serverExternalPackages: ["@aws-sdk/client-s3"],
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
