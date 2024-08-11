import path from 'path';
import CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin";

const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'jquery': path.resolve('node_modules/jquery/dist/jquery'),
      'jQuery': 'jquery',
    };
    config.plugins.push(new CaseSensitivePathsPlugin());
    return config;
  },
};

export default nextConfig;
