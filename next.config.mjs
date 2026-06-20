/** @type {import('next').NextConfig} */

// When deploying to GitHub Pages the site is served from a sub-path:
//   https://<user>.github.io/untold.pk/
// The deploy workflow sets PAGES_BASE_PATH="/untold.pk" so asset/links
// resolve correctly. Locally (npm run dev) it stays empty.
const basePath = process.env.PAGES_BASE_PATH || "";

const nextConfig = {
  output: "export", // static HTML export -> works on GitHub Pages
  reactStrictMode: true,
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: {
    unoptimized: true, // no image server on static hosts
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
