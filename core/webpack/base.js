const webpack = require('webpack');
const utils = require('./lib/utils.js');
const VueLoaderPlugin = utils.isVue3() ? require('vue-loader/lib/plugin') : require('vue-loader-v15').VueLoaderPlugin;

module.exports = {
  // entry: {
  //   index: utils.resolve('src/index.js'),
  // },
  output: {
    path: utils.resolve('build'),
    libraryTarget: 'umd',
    assetModuleFilename: 'images/[hash][ext][query]'
  },
  resolve: {
    extensions: ['.js', '.vue', '.scss']
  },
  stats: {
    errorDetails: true
  },
  module: {
    rules: [{
      test: /\.(woff2?|eot|ttf|otf)$/i,
      type: 'asset',
    }, {
      test: /\.(png|gif|jpg|jpeg|svg)$/i,
      type: 'asset',
      parser: {
        dataUrlCondition: {
          maxSize: 4 * 1024 // 4kb
        }
      }
    }, {
      test: /\.js$/,
      exclude: [
        /\bcore-js\b/,
        /\bwebpack\/buildin\b/,
        /\bvue-loader\b/
      ],
      use: {
        loader: 'babel-loader',
      }
    }]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20480,
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          priority: 100,
        },
      }
    },
    runtimeChunk: {
      name: 'manifest'
    }
  },
};
