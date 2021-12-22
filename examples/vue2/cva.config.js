module.exports = {
  /**
   * cva配置
   */
  cva: {
    /**
     * 开启webpack-bundle-analyzer
     * @params boolean | object
     * 注释：object配置参考 https://www.npmjs.com/package/webpack-bundle-analyzer
     */
    analyzer: true,
    /**
     * 开启线上sourcemap
     * 属性值: object | boolean
     * soucermap的publicPath默认为process.env.SOURCEMAP_PUBLIC_URL
    */
    sourcemap: {
      publicPath: 'xxx'
    },
    /**
     * 通过 webpack.DefinePlugin 在编译时将你代码中的变量替换为其他值或表达式
     */
    envs: {
    },
    /**
     * 开始webpack编译前的钩子。此钩子执行位置为cva配置为webpack配置后，执行compile之前，用来处理最终执行的webpack配置
     * @param {*} options 编译前webpack配置
     * @param {*} mode  构建模式，mode: 'production' | 'development'
     * @returns 会被当做最终的webpack配置
     */
    beforeComile(options, mode) {
      // console.log(options, mode);
      return options;
    },
    /**
     * 构建成功后的钩子。注意只在`build`成功后执行
     * @param {*} stats compier构建后的stats
     * @param {*} mode  构建模式，mode: 'production' | 'development'
     */
    afterBuildSuccess(stats, mode) {
      console.log(stats, mode);
    },
  },
  /**
   * 如下配置参考 https://webpack.docschina.org/configuration/
   */
  entry: {
    index: './src/index.js'
  },
  devServer: {
    port: 8081,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      },
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: {
      rewrites: [
        { from: /^\//, to: '/index.html' },
      ]
    },
  },
};
