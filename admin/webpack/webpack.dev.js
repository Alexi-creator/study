const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    hot: true,
    open: true,
    historyApiFallback: true,
    port: 3000,
    allowedHosts: 'all',
    client: {
      webSocketURL: { hostname: undefined, pathname: undefined, port: '0' },
    },
  },
  plugins: [new ReactRefreshWebpackPlugin()],
}
