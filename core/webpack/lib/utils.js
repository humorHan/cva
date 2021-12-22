const path = require('path');

const cwd = path.resolve(process.cwd());

const packageInfo = require(path.resolve(cwd, 'package.json'));

module.exports = {
  cwd,
  resolve() {
    return path.resolve(cwd, ...arguments);
  },
  isVue3() {
    const vueVersion = packageInfo.dependencies.vue || packageInfo.devDependencies.vue || '';
    return vueVersion.startsWith('3');
  }
};
