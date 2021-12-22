const webpack = require('webpack');
const { merge } = require('webpack-merge');
const htmlPlugin = require('./lib/html-plugin.js');
const baseConfig = require('./base.js')
const generateCssLoaders = require('./lib/generate-css-loaders');
const utils = require('./lib/utils');

const mode = 'development';
const isProduction = mode === 'production';
module.exports = merge(baseConfig, {
  mode,
  cache: true,
  devtool: 'inline-source-map',
  watch: true,
  output: {
    publicPath: '/',
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js',
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
          hotReload: true,
        },
      }
    }, {
      test: /\.s?(c|a)ss$/i,
      use: generateCssLoaders(isProduction),
    }]
  },
  plugins: [
    htmlPlugin(isProduction),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    proxy: {
      '/api': 'http://localhost:8080'
    },
    historyApiFallback: {
      // verbose: true,
      rewrites: [
        { from: /^\//, to: '/index.html' },
      ]
    },
    client: {
      progress: true,
    },
    allowedHosts: ['.sankuai.com'],
    // quiet: true,
    port: 8081,
    compress: true,
    hot: true,
    open: true,
    // openPage: './',
    // logLevel: 'error'
    static: 'build/',
  }
});
