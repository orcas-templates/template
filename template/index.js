/**
 * 1.脚手架在运行时会对模版资源目录（source值）中的文件会使用lodash的template模版引擎语法进行渲染
 * 2.渲染时会将该配置文件metadata、helpers和prompts配置项注入到模版中
 */
// @ts-check

import fs from 'fs'

const { name, version } = JSON.parse(fs.readFileSync('./package.json', 'utf8'))

export default {
  name,
  version<% if (source !== 'template') { %>,
  source: '<%= source %>'<% } if (features.includes('metadata')) { %>,
  metadata: {
    // TODO: predefined template metadata
    year: new Date().getFullYear()
  }<% } if (features.includes('prompts')) { %>,
  // https://github.com/terkelg/prompts
  prompts: [
    {
      name: 'name',
      type: 'text',
      message: 'Project name'
    },
    {
      name: 'version',
      type: 'text',
      message: 'Project version'
    },
    {
      name: 'description',
      type: 'text',
      message: 'Template description',
      initial: 'Awesome <%= name %> apps.'
    },
    {
      name: 'author',
      type: 'text',
      message: 'Project author name'
    },
    {
      name: 'email',
      type: 'text',
      message: 'Project author email'
    },
    {
      name: 'repoOwner',
      type: 'text',
      message: 'Git repository owner',
      initial: 'emi-templates'
    },
    /*{
      name: 'features',
      type: 'multiselect',
      message: 'Choose the features you need',
      instructions: false,
      choices: [
        // TODO: custom template features
        { title: 'Automatic test', value: 'test', selected: true },
      ]
    },*/
    {
      name: 'install',
      type: 'confirm',
      message: 'Install dependencies',
      initial: true
    },
    {
      name: 'pm',
      /** @param {Boolean} prev */
      type: prev => process.env.NODE_ENV === 'test' || prev ? 'select' : null,
      message: 'Package manager',
      hint: ' ',
      choices: [
        { title: 'npm', value: 'npm' },
        { title: 'pnpm', value: 'pnpm' },
        { title: 'yarn', value: 'yarn' }
      ]
    }
  ]<% } if (features.includes('filters')) { %>,
  // 用来过滤文件 是否包含在生成的模版中  函数返回: true包含  false不包含
  filters: {
    /** @param {{ features: string[] }} answers */
    'test/**': answers => answers.features.includes('test')
  }<% } if (features.includes('helpers')) { %>,
  // 自定义模版帮助器 可以自定义一下帮助函数 以供版本中使用
  helpers: {
    upper: input => input.toUpperCase()
  }<% } if (features.includes('install')) { %>,
  // Execute `npm | yarn | pnpm install` command. If the value is 'false'，nothing is done
  install: 'npm'<% } if (features.includes('init')) { %>,
  // Execute `git init && git add && git commit` command. If the value is 'false'，nothing is done
  init: true<% } if (features.includes('setup')) { %>,
  /**
   * 钩子函数  询问完问题后执行
   * ctx上下文对象，ctx.config表示当前导出的配置对象，ctx.answers表示用户输入的选项值
   * */
  setup: async ctx => {
    ctx.config.install = ctx.answers.install && ctx.answers.pm
  }<% } if (features.includes('prepare')) { %>,
  /**
   * 钩子函数  在模版文件准备就绪后，还没开始渲染之前执行
   * ctx上下文对象，ctx.config表示当前导出的配置对象，ctx.answers表示用户输入的选项值
   * */
  prepare: async ctx => {
    console.log('prepare', ctx)
  }<% } if (features.includes('emit')) { %>,
  /**
   * 钩子函数  在模版文件全部都渲染到目标目录（用户指定的项目路径）中后执行
   * ctx上下文对象，ctx.config表示当前导出的配置对象，ctx.answers表示用户输入的选项值
   * */
  emit: async ctx => {
    console.log('emit', ctx)
  }<% } if (features.includes('complete') && complete === 'callback') { %>,
  /**
   * 钩子函数  全部完成后执行
   * ctx上下文对象，ctx.config表示当前导出的配置对象，ctx.answers表示用户输入的选项值
   * */
  complete: async ctx => {
    console.clear()
    console.log(`Created a new project in ${ctx.project} by the ${ctx.template} template.\n`)
    console.log('\n✨ Happy to carry bricks :)\n')
  }<% } if (features.includes('complete') && complete === 'message') { %>,
  // TODO: custom complete message
  complete: '\n✨ Happy to carry bricks :)\n'<% } %>
}
