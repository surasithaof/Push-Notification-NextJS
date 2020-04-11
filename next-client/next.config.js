const withOffline = require("next-offline");

const nextConfig = {
  workboxOpts: {
    generateInDevMode: true,
  },
};

module.exports = withOffline(nextConfig);
