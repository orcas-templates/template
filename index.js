/**
 * 1.脚手架在运行时会对模版资源目录（source值）中的文件会使用lodash的template模版引擎语法进行渲染
 * 2.渲染时会将该配置文件metadata、helpers和prompts配置项注入到模版中
 */
// @ts-check
const path = require('path')
const chalk = require('chalk')
const { name, version } = require('./package.json')

module.exports = {
  name,
  version,
  // source: 'template', // 指定模版资源的目录名 默认为template
  metadata: {
    year: new Date().getFullYear()
  },
  // https://github.com/terkelg/prompts
  // 提示用户输入选择
  prompts: [
    {
      name: 'name',
      type: 'text',
      message: 'Template name'
    },
    {
      name: 'version',
      type: 'text',
      message: 'Template version'
    },
    {
      name: 'description',
      type: 'text',
      message: 'Template description',
      /** @param {any} _ @param {{ name: string }} values */
      initial: (_, values) => `A template for creating ${values.name} apps.`
    },
    {
      name: 'author',
      type: 'text',
      message: 'Template author name'
    },
    {
      name: 'email',
      type: 'text',
      message: 'Template author email'
    },
    {
      name: 'repoOwner',
      type: 'text',
      message: 'Git repository owner',
      initial: 'orcas-templates'
    },
    {
      name: 'source',
      type: 'text',
      message: 'Template source directory name',
      initial: 'template'
    },
    {
      name: 'features',
      type: 'multiselect',
      message: 'Choose the features you need',
      instructions: true,
      choices: [
        { title: 'Custom metadata', value: 'metadata' },
        { title: 'Custom prompts', value: 'prompts', selected: true },
        { title: 'Custom filters', value: 'filters' },
        { title: 'Custom helpers', value: 'helpers' },
        { title: 'Custom install', value: 'install' },
        { title: 'Custom git init', value: 'init' },
        { title: 'Custom setup hook', value: 'setup' },
        { title: 'Custom prepare hook', value: 'prepare' },
        { title: 'Custom emit hook', value: 'emit' },
        { title: 'Custom complete', value: 'complete', selected: true }
      ]
    },
    {
      name: 'complete',
      /** @param {Array} prev */
      type: prev => (process.env.NODE_ENV === 'test' || prev.includes('complete') ? 'select' : null),
      message: 'Complete type',
      hint: ' ',
      choices: [
        { title: 'Callback', value: 'callback' },
        { title: 'Message', value: 'message' }
      ]
    },
    {
      name: 'gitInit',
      type: 'confirm',
      message: 'Git init && git add && git commit',
      initial: true
    },
    {
      name: 'install',
      type: 'confirm',
      message: 'Install dependencies',
      initial: true
    },
    {
      name: 'pm',
      type: (/** @type {Boolean} */ prev) => (process.env.NODE_ENV === 'test' || prev ? 'select' : null),
      message: 'Package manager',
      hint: ' ', // 提示信息
      choices: [
        { title: 'npm', value: 'npm' },
        { title: 'pnpm', value: 'pnpm' },
        { title: 'yarn', value: 'yarn' }
      ]
    }
  ],
  // Execute `npm | yarn | pnpm install` command. If the value is 'false'，nothing is done
  install: 'npm',
  // Execute `git init && git add && git commit` command. If the value is 'false'，nothing is done
  init: true,
  // 用来过滤文件 是否包含在生成的模版中  函数返回: true包含  false不包含
  filters: {
    /** @param {{ features: string[] }} answers */
    'index.test.js': answers => answers.features.includes('test')
  },
  /**
   * 钩子函数  询问完问题后执行
   * ctx上下文对象，ctx.config表示当前导出的配置对象，ctx.answers表示用户输入的选项值
   * */
  setup: async ctx => {
    ctx.config.init = ctx.answers.gitInit
    ctx.config.install = ctx.answers.install && ctx.answers.pm
  },
  /**
   * 钩子函数  全部完成后执行
   * ctx上下文对象，ctx.config表示当前导出的配置对象，ctx.answers表示用户输入的选项值
   * */
  complete: async ctx => {
    console.clear()
    console.log(`Created a new project in ${chalk.blue(ctx.project)} by the ${chalk.green(ctx.template)} template.\n`)
    console.log('Getting Started:')
    if (ctx.dest !== process.cwd()) {
      console.log(`  $ cd ${path.relative(process.cwd(), ctx.dest)}`)
    }
    if (ctx.config.install === false) {
      console.log('  $ npm install')
    }
    console.log(`  $ ${ctx.config.install ? ctx.config.install : 'npm'} lint`)
    console.log('\n✨ Happy hacking :)\n')
  }
}
