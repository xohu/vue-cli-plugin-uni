#!/usr/bin/env node

const path = require('path')
const semver = require('semver')
const { error } = require('@vue/cli-shared-utils')
const requiredVersion = require('@vue/cli-service/package.json').engines.node

if (!semver.satisfies(process.version, requiredVersion)) {
  error(
    `You are using Node ${process.version}, but vue-cli-service ` +
    `requires Node ${requiredVersion}.\nPlease upgrade your Node version.`
  )
  process.exit(1)
}

const rawArgv = process.argv.slice(2)
const args = require('minimist')(rawArgv, { boolean: ['modern', 'report', 'report-json', 'inline-vue', 'watch', 'open', 'copy', 'https', 'verbose', 'minimize', 'clean'] });
const PLATFORMS = ['h5', 'app-plus', 'mp-weixin', 'mp-qq', 'mp-baidu', 'mp-alipay', 'mp-toutiao'];
const Service = require('@vue/cli-service/lib/Service')
const { initCustomScript } = require('@dcloudio/uni-cli-shared/lib/package')
const { platform, minimize } = args;

if (typeof platform != 'string') {
  console.error(`请指定要运行平台 --platform 的值`)
  process.exit(0)
}

process.env.UNI_PLATFORM = platform
process.env.UNI_MINIMIZE = minimize.toString()
process.env.NODE_ENV = /serve/g.test(args._[0]) ? 'development' : 'production'

const pkg = require(path.resolve(process.cwd(), 'package.json'))
const scriptOptions = pkg['uni-app'];

if (scriptOptions && scriptOptions['scripts'] && scriptOptions['scripts'][platform]) {
  const scriptOptions = initCustomScript(platform, path.resolve(process.cwd(), 'package.json'))
  if (scriptOptions) {
    scriptOptions.title && console.log('>' + scriptOptions.title)
  }
} else {
  if (PLATFORMS.indexOf(platform) === -1) {
    console.error(`UNI_PLATFORM 支持以下平台 ${JSON.stringify(PLATFORMS)}`)
    process.exit(0)
  }
}

const service = new Service(process.env.VUE_CLI_CONTEXT || process.cwd())
const command = (process.env.NODE_ENV === 'development' && process.env.UNI_PLATFORM === 'h5')
  ? 'uni-serve' : 'uni-build'

service.run(command, args, rawArgv).catch(err => {
  error(err)
  process.exit(1)
})