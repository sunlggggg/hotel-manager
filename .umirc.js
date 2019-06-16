
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
 
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: false,
      dva: false,
      dynamicImport: false,
      title: 'hotel-web',
      dll: false,
      
      routes: {
        exclude: [
          /components\//,
        ],
      },
    }],
  ],
  proxy: {
    '/api': {
      target: 'http://localhost:8081',
      pathRewrite: { '^/api': '' },
      changeOrigin: true
    }
  }
}
