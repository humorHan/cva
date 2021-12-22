#!/usr/bin/env node

const commander = require('commander');
const chalk = require('chalk');
const execa = require('execa');
const fs = require('fs');
const inquirer = require('inquirer');
const packageInfo = require('../package.json');
const errorHandler = require('./utils/error-handler.js');

const program = new commander.Command();

errorHandler();

// 版本号
program
  .version(packageInfo.version)

// 初始化一个vue项目'
program
  .command('create <appName>')
  .description('初始化一个vue项目')
  .action((appname) => {
    if (fs.existsSync(`${process.cwd()}/${appname}`)) {
      console.error(chalk.red(`${appname} 文件夹已存在，请检查后再操作`));
      return;
    }
    inquirer.prompt([
      {
        type: 'rawlist',
        name: 'template',
        message: '请选择初始化项目的vue模板',
        choices: ['vue3', 'vue2']
      }
    ]).then(async (answer) => {
      const gitUrl = {
        vue3: 'https://github.com/humorHan/cva-vue3-template.git',
        vue2: 'https://github.com/humorHan/cva-vue2-template.git',
      }[answer.template];
      try {
        await cloneTemplate(gitUrl, appname);
        await autoYarn(appname);
        await rmGit(appname);
      } catch (err) {
        console.log(chalk.red('项目初始化异常'))
        return console.error(err)
      }
      console.log(chalk.green('项目初始化完成'))
    })
  })

program.parse(process.argv);

async function cloneTemplate(url, appname) {
  await execa('git', ['clone', url, `${process.cwd()}/${appname}`]);
}

async function rmGit(appname) {
  await execa('rm', ['-rf', '.git'], {
    cwd: `${process.cwd()}/${appname}`,
    stdio: 'inherit'
  })
}

async function autoYarn(appname) {
  await execa(`yarn`, {
    cwd: `${process.cwd()}/${appname}`,
    stdio: 'inherit'
  })
}
