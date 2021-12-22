const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');
const htmlPlugin = require('./lib/html-plugin.js');
const baseConfig = require('./base.js')
const generateCssLoaders = require('./lib/generate-css-loaders');
const utils = require('./lib/utils');

const mode = 'production';
const isProduction = mode === 'production';
module.exports = merge(baseConfig, {
  mode,
  cache: false,
  watch: false,
  devtool: false,
  output: {
    publicPath: process.env.PUBLIC_URL || '/',
    filename: 'js/[name]-[contenthash].js',
    chunkFilename: 'js/[name]-[contenthash].chunk.js'
  },
  resolve: {
    alias: {}
  },
  module: {
    rules: [{
      test: /\.vue$/i,
      use: {
        loader: utils.isVue3() ? 'vue-loader' : 'vue-loader-v15',
        options: {
          hotReload: false,
        },
      }
    }, {
      test: /\.s?(c|a)ss$/i,
      use: generateCssLoaders(isProduction),
    }]
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 5,
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[contenthash].css',
      chunkFilename: 'css/[name]-chunk-[contenthash].css',
      ignoreOrder: true,
    }),
    htmlPlugin(isProduction),
  ]
});
