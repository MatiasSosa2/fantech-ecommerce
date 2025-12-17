/**
 * Next.js configuration to support static export for GitHub Pages.
 */
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  // If you plan to deploy under a subpath (e.g., /fantech-ecommerce),
  // set basePath accordingly and ensure asset URLs work.
  basePath: isProd ? '/fantech-ecommerce' : '',
};
