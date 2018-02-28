module.exports = {
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
  }
}