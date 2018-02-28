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
    path: './dist',
    // 打包生成的文件名
    filename: 'js/[name].[hash].js'
  },

  plugins: [ 
    new htmlWebpackPlugin({
      filename: 'a.html',
      template: 'index.html',
      inject: 'body',
      title: 'this is a.html',
      // chunks: ['page1', 'page2']
      excludeChunks: ['page3']
    }),

    new htmlWebpackPlugin({
      filename: 'b.html',
      template: 'index.html',
      inject: 'body',
      title: 'this is b.html',
      // chunks: ['page2']
      excludeChunks: ['page1', 'page3']
    }),

    new htmlWebpackPlugin({
      filename: 'c.html',
      template: 'index.html',
      inject: 'body',
      title: 'this is c.html',
      // chunks: ['page3']
      excludeChunks: ['page1']
    })

  ]
}