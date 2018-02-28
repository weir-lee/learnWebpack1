module.exports = {
  // 打包的入口文件
  entry: './src/script/main.js',

  output: {
    // 打包后文件的输出路径
    path: './dist/js',
    // 打包生成的文件名
    filename: 'bundle.js'
  }
}