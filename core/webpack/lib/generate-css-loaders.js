const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 * 获取style-loader的规则
 * @param {*} isProduction mode是否是production模式
 */
function getStyleLoaderRule(isProduction) {
  return {
    loader: isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
    options: isProduction ? {} : {
      injectType: 'styleTag'
    },
  }
}
/**
 * 获取css-loader的规则
 * @param {*} isProduction mode是否是production模式
 */
function getCssLoaderRule(isProduction) {
  return {
    loader: 'css-loader',
    options: {
      sourceMap: !isProduction,
      importLoaders: 1,
    }
  };
}

/**
 * 获取postcss-loader规则
 * @param {*} isProduction mode是否是production模式
 */
function getPostcssLoaderRule(isProduction) {
  return {
    loader: 'postcss-loader',
    options: {
      sourceMap: !isProduction,
      postcssOptions: {
        plugins: [
          ['postcss-preset-env']
        ],
      }
    }
  }
}

/**
 * 获取sass-loader规则
 * @param {*} isProduction mode是否是production模式
 */
function getSassLoaderRule(isProduction) {
  return {
    loader: 'sass-loader',
    options: {
      sourceMap: !isProduction,
    },
  }
}

// /**
//  * 获取resolve-url-loader规则
//  * @param {*} isProduction mode是否是production模式
//  */
// function getResolveUrlLoaderRule(isProduction) {
//   return {
//     loader: 'resolve-url-loader',
//     options: {
//       sourceMap: !isProduction,
//     },
//   }
// }

module.exports = function generateCssLoaders(isProduction) {
  return [
    getStyleLoaderRule(isProduction),
    getCssLoaderRule(isProduction),
    getPostcssLoaderRule(isProduction),
    // getResolveUrlLoaderRule(isProduction),
    getSassLoaderRule(isProduction),
  ]
};
