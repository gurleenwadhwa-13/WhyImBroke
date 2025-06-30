/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Only lint specific directories
    dirs: ['app', 'components', 'lib'],
    // Ensure ESLint respects .eslintignore
    ignoreDuringBuilds: true
  }
};
module.exports = nextConfig;