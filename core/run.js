const parseConfig = require('./parse-config.js');
const compile = require('./compile.js');

module.exports = function run(mode, userConfig) {
  // ① transform cva config to webpack config 
  const config = parseConfig(mode, userConfig);

  // ② 执行webpack
  compile(mode, config);

}
