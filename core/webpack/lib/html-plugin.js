const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function htmlPlugin(isProduction) {
  let conf = {
    template: `${process.cwd()}/index.html`,
    filename: 'index.html',
    inject: true,
  };
  if (isProduction) {
    conf.minify = {
      caseSensitive: false,
      removeComments: true,
      removeEmptyAttributes: true,
      collapseWhitespace: true
    };
  }
  return new HtmlWebpackPlugin(conf);
};
