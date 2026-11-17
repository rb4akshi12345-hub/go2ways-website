const isGitHubActions = process.env.GITHUB_ACTIONS === "true";
const repoName = "/go2ways-website";
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH || (isGitHubActions ? repoName : "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  distDir: process.env.NEXT_DIST_DIR || ".next",
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
