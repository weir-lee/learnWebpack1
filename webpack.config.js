var htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 上下文默认为根目录
  // context: '',

  // 打包的入口文件
  entry: {
    page1: './src/script/main.js',
    page2: './src/script/b.js',
    page3: './src/script/c.js'
  },

  output: {
    // 打包后文件的输出路径
    path: './dist/js',
    // 打包生成的文件名
    filename: '[name].[hash].js'
  },

  plugins: [ 
    new htmlWebpackPlugin({
      // 模板的路径根据webpack的上下文，可以在context选项配置，默认为根目录
      template: 'index.html',
      inject: 'body',
      // 在打包生成的 html 文件中拿到date 参数：htmlWebpackPlugin.options.date
      date: new Date()
    }) 
  ]
}