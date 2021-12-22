const webpack = require('webpack');
const chalk = require('chalk');
const WebpackDevServer = require('webpack-dev-server');

module.exports = async function compile(mode, options) {
  if (mode === 'production') {
    return webpack(options, (err, stats) => {
      if (err) {
        console.error(chalk.red(err.stack || err));
        if (err.details) {
          console.error(err.details);
        }
        console.log(chalk.red('【cva 异常结束】'))
        process.exit(1);
      }
      const info = stats.toJson();
      if (stats.hasErrors()) {
        console.log(chalk.red('【cva 异常结束】'))
        console.error(info.errors);
        process.exit(1);
      }
      if (stats.hasWarnings()) {
        console.log(chalk.yellow('【cva warning】'))
        console.warn(info.warnings);
      }
      console.log(chalk.blue('【cva 构建完成】'));
      (this.userCvaConfig.afterCompile || (() => {}))(stats, mode);
    });
  }

  const compiler = webpack(options);
  const server = new WebpackDevServer(options.devServer, compiler);
  server.start(options.devServer.port, 'http://localhost', () => {
    console.log(`Starting server on http://localhost:${options.devServer.port}`);
  });
}
