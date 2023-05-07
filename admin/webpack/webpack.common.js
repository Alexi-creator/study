const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const { EnvironmentPlugin } = require('webpack')

module.exports = {
  entry: path.resolve(__dirname, '..', './src/index.tsx'),
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin()],
    alias: {
      components: path.resolve(__dirname, '..', 'src/components'),
      views: path.resolve(__dirname, '..', 'src/views'),
      uikit: path.resolve(__dirname, '..', 'src/UIKit'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.module\.s(a|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]__[sha1:hash:hex:7]',
              },
            },
          },
          'sass-loader',
          'postcss-loader',
        ],
      },
      {
        test: /^((?!\.module).)*s(a|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, '..', './build'),
    filename: '[name].[chunkhash].js',
    clean: true,
    assetModuleFilename: 'assets/images/[name][ext]',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', './src/static/index.html'),
    }),
    new MiniCssExtractPlugin(),
    new EnvironmentPlugin({
      CLIENT_URL: false,
      CLIENT_URL_DEV: false,
      AUTH_URL: false,
      AUTH_URL_DEV: false,
    }),
  ],
  stats: 'errors-only',
}
