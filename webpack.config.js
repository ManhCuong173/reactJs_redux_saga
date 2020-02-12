const webpack = require('webpack');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const devServer = {
  port: 3000,
  open: true,
  disableHostCheck: true,
  overlay: true,
  stats: 'minimal',
};

module.exports = {
  entry: {
    bundle: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/i,
      },
      {
        use: 'babel-loader',
        test: /\.js$/i,
        exclude: '/node_modules/',
      },
      {
        use: [{ loader: 'file-loader' }],
        test: /\.(jpe?g$|gif$|png$|svg$|woff$|woff2$|eot$|ttf$|wav$|mp3$|ico$)/i,
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      JQuery: 'jquery',
      'window.$': 'jquery',
      'window.JQuery': 'jquery',
    }),
    new HTMLWebpackPlugin({
      template: './src/index.html',
      title: 'Redux_Saga',
    }),
    new ManifestPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  devServer,
};
