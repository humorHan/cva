#!/usr/bin/env node

const path = require('path');
const commander = require('commander');
const chalk = require('chalk');
const run = require('../core/run.js');
const packageInfo = require('../package.json');
const errorHandler = require('./utils/error-handler.js');

const program = new commander.Command();

errorHandler();

// 版本号
program
  .version(packageInfo.version)

// 本地开发
program
  .command('serve')
  .option('-c [userConfigPath]', '--config <userConfigPath>', path.resolve(process.cwd(), './cva.config.js'))
  .description('cva 配置文件地址')
  .action(({ c, config }) => {
    let _config = config || c;
    console.log(chalk.blue('cva starting...'));
    run('development', require(_config));
  })

// 部署
program
  .command('build')
  .option('-c [userConfigPath]', '--config <userConfigPath>', path.resolve(process.cwd(), './cva.config.js'))
  .description('cva 配置文件地址')
  .action(({ c, config }) => {
    let _config = config || c;
    console.log(chalk.blue('cva building...'));
    run('production', require(_config));
  })

program.parse(process.argv);
