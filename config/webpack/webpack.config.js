const { webpackConfig, inliningCss } = require("shakapacker");
const isDevelopment = process.env.NODE_ENV !== "production";

if (isDevelopment && inliningCss) {
  const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

  webpackConfig.plugins.push(
    new ReactRefreshWebpackPlugin({
      overlay: {
        sockPort: webpackConfig.devServer.port,
      },
    })
  );
}

module.exports = webpackConfig;
