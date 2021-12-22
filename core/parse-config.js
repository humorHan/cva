const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const devConfig = require('./webpack/develoment.js');
const prodConfig = require('./webpack/production.js');

module.exports = function parseConfig(mode, userConfig) {
  const defaultConfig = mode === 'development' ? devConfig : prodConfig;
  this.userCvaConfig = userConfig.cva || {};
  delete userConfig.cva;

  const options = merge(defaultConfig, userConfig);

  // 兼容微前端带壳开发逻辑
  if (mode === 'development') {
    options.output.publicPath = `http://localhost:${options.devServer.port}/`;
  }

  // 线上环境相关配置
  if (mode === 'production') {
    if (this.userCvaConfig.analyzer) {
      options.plugins.push(new BundleAnalyzerPlugin(typeof this.userCvaConfig.analyzer === 'object' ? this.userCvaConfig.analyzer : {}));
    }
    if (this.userCvaConfig.sourcemap) {
      options.plugins.push(new webpack.SourceMapDevToolPlugin({
        test: /\.js$/,
        filename: '[name]-[chunkhash].js.map',
        publicPath: this.userCvaConfig.publicPath || process.env.SOURCEMAP_PUBLIC_URL
      }));
    }
  }

  // DefinePlugin处理
  options.plugins.push(new webpack.DefinePlugin(this.userCvaConfig.envs || {}))

  // 最后执行beforeComile钩子
  const finnalOptions = (this.userCvaConfig.beforeComile || ((o) => o))(options, mode);
  this.options = finnalOptions;
  return finnalOptions;
};
