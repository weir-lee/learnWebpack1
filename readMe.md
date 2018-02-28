# webpack1.0基础用法笔记（一）
* 说明：该笔记的内容是 慕课网 webpack 深入与实践 的课程内容。
* 项目目录结构：
！[目录结构图](./demoImages/project_directory_tree.png)
## 安装
1. 环境准备
    安装node，安装 npm
2. 局部安装 webpack1.0
   * 新建一个文件夹为项目根目录
   * 在根目录下打开cmd窗口，输入npm初始化项目命令：npm init，一路默认yes即可，会生成package.json文件
   * 使用 npm 局部安装 webpack命令：npm install --save-dev webpack@1.0
   * 由于是局部安装的webpack，所以直接在cmd里输入 webpack 会报 webpack不是内部或外部命令，所以解决办法是：使用 npm 的scripts。在package.json文件 scripts 选项下自定义一个命令用来执行 webpack打包命令。
例如：
<pre><code>
  "scripts": {
    "demo": "webpack hello.js hello.bundle.js"
    }
</code></pre>
  在cmd中执行 npm run demo 就会 将 hello.js作为入口文件进行打包，最终生成hello.bundle.js打包文件。
## webpack使用
webpack可以把任何资源当做模块进行打包
1. 打包css文件
    * 在某个js文件中 require 或者 import 一个 css 文件，打包的时候需要使用 css-loader 对 css 文件进行处理，这样才能将 css 文件当做一个模块引入。如果想在 html 片段中使用 css 的样式，还需要 style-loader 对 css 文件进行处理，最终在 html 里面会将样式写入到 style 标签里面。
    例如： 
      + npm install --save-dev css-loader style-loader
      + require('style-loader!css-loader!./style.css')
注意： 在对 css 文件进行处理的时候 style-loader 要写在前面，css-loader要写在后面，这（书写顺序）与执行顺序是相反的。
2. webpack 的一些命令：
+ --module-bind
    --module-bind css=style-loader!css-loader 对所有css文件使用style-loader和css-loader处理，这样就不用在每次 require css文件的时候写loader了，更方便。
+ --watch
监测文件，当文件更新的时候自动打包
+ --progress
显示打包进度百分比
+ --display-modules
显示打包了哪些模块
+ --display-reasons
显示打包该模块的理由
* "scripts": {
    "demo": "webpack hello.js hello.bundle.js --module-bind css=style-loader!css-loader --watch --progress --display-modules --display-reasons"
  }
  
  # webpack1.0基础用法笔记（二）
  ## 建立项目的webpack配置文件
  + 在命令行使用webpack命令来配置显得不方便，使用 --config 命令可以指定 webpack的配置文件。本节主要内容是webpack如何使用配置文件。
  ### 准备工作
  + npm 初始化项目：npm init
  + 局部安装webpack1：npm install --save-dev webpack@1
  + 创建 index.html、src、script、css等目录
  + 项目根目录下创建webpack 的配置文件 webpack.config.js
  + [目录截图](./demoImages/project_directory_tree_2.png)
  ### webpack配置文件 webpack.config.js
  * 单个入口
  <pre><code>
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
  </code></pre>
  在根目录执行 webapck 命令，默认会把根目录下的 webpack.config.js 作为配置文件，可以使用 webapck --config filename指定配置文件。
  * 多个入口，多个输出(多页面应用)：对象语法
   [name] 被 chunk 的 name 替换。
   [hash] 被 compilation 生命周期的 hash 替换。
   [chunkhash] 被 chunk 的 hash 替换。
  <pre><code>
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
  </code></pre>
  [打包生成的文件截图](./demoImages/compile_directory.png)  [命令行截图](./demoImages/compile_cmd.png) 
  # webpack1.0基础用法笔记（三）
  ## 自动化生成项目中的html页面
  目的：每次打包后生成的文件名可能不一样，如何实现自动生成 html 页面，并自动引入打包后的脚本，这个时候需要借助webpack的插件 html-webpack-plugin。
  * npm 安装插件：
  npm install --save-dev html-webpack-plugin
  * webpack 配置文件plugins中引用 html-webpack-plugin
  * 想用某个 html 文件为模板生成新的html 文件，html-webpack-plugin提供了 template 选项
  * 想把打包生成的 js 注入到html文件的某个位置，html-webpack-plugin提供了 jnject 选项('head', 'body', false)
  * 想要在 html-webpack-plugin里面传入参数，在 html 文件里面获取，html 文件是ejs的模板文件，可以通过html-webpack-plugin.options.XXX得到参数。
  代码示例 webpack.config.js
  <pre><code>
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
  </code></pre>
  
  模板 index.html 代码示例:
  
      <!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>webpack1 demo</title>
    <meta name="description" content="">
    <meta name="keywords" content="">
    <link href="" rel="stylesheet">
    </head>
    <body>
      <p>hello</p>
      <% for (var key in htmlWebpackPlugin) { %>
      <%= key %>
      <% } %>

      <% for (var key in htmlWebpackPlugin.files) { %>
      <%= key%>
      <% } %>

      <% for (var key in htmlWebpackPlugin.options) { %>
      <%= key %>
      <% } %>

      <p><%= htmlWebpackPlugin.options.date%></p>
    </body>
    </html>
    
  生成的html文件代码：
  
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>webpack1 demo</title>
    <meta name="description" content="">
    <meta name="keywords" content="">
    <link href="" rel="stylesheet">
    </head>
    <body>
      <p>hello</p>

      files

      options



      publicPath

      chunks

      js

      css

      manifest



      template

      filename

      hash

      inject

      compile

      favicon

      minify

      cache

      showErrors

      chunks

      excludeChunks

      title

      xhtml

      date


      <p>Wed Feb 28 2018 16:17:40 GMT+0800 (中国标准时间)</p>
    <script type="text/javascript" src="page3.0a2e60c5ccfee7362b2f.js"></script><script type="text/javascript" src="page2.0a2e60c5ccfee7362b2f.js"></script><script type="text/javascript" src="page1.0a2e60c5ccfee7362b2f.js"></script></body>
    </html>