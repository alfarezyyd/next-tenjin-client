import path from 'path';
import CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin";

const nextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias, 'jquery': path.resolve('node_modules/jquery/dist/jquery'), 'jQuery': 'jquery',
    };
    config.plugins.push(new CaseSensitivePathsPlugin());
    return config;
  }, images: {
    remotePatterns: [{
      protocol: 'https', hostname: 'tenjin.web.id', port: '8080', // Tambahkan port yang sesuai
      pathname: '**',
    },
      {
        protocol: 'http', hostname: 'localhost', port: '3001', // Tambahkan port yang sesuai
        pathname: '**',
      }],
  },
};

export default nextConfig;
