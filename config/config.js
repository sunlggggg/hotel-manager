// ref: https://umijs.org/config/
import path from 'path'
import routes from './router.config'

const plugins = [
  // ref: https://umijs.org/plugin/umi-plugin-react.html
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      dynamicImport: true,
      dll: {
        include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
        exclude: ['@babel/runtime']
      },
      hardSource: false
    }
  ]
]

const config = {
  plugins,
  // history: 'hash',
  hash: true,
  targets: {
    ie: 10,
    android: 4,
    ios: 7
  },
  // 路由配置
  routes,
  // Theme for antd
  treeShaking: true,
  alias: {
    '@': path.resolve(__dirname, 'src')
  },
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:8081/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' }
    }
  },
  sass: {},
  ignoreMomentLocale: true,
  uglifyJSOptions(opts) {
    opts.uglifyOptions.compress['drop_console'] = true
    return opts
  },
  chainWebpack(config) {
    config.module
      .rule('eslint')
      .use('eslint-loader')
      .options({
        formatter: require.resolve('react-dev-utils/eslintFormatter'),
        eslintPath: require.resolve('eslint')
      })
  }
}

export default config
