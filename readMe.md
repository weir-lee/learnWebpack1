# webpack1.0基础用法笔记
## 安装
1. 环境准备
    安装node，安装 npm
2. 局部安装 webpack
   * 新建一个文件夹为项目根目录
   * 在根目录下打开cmd窗口，输入npm初始化项目命令：npm init，一路默认yes即可，会生成package.json文件
   * 使用 npm 局部安装 webpack命令：npm install --save-dev webpack@1.0
   * 由于是局部安装的webpack，所以直接在cmd里输入 webpack 会报 webpack不是内部或外部命令，所以解决办法是：使用 npm 的scripts。在package.json文件 scripts 选项下自定义一个命令用来执行 webpack打包命令。
例如：
"scripts": {
    "demo": "webpack hello.js hello.bundle.js"
  }。
  在cmd中执行 npm run demo就会将 hello.js作为入口文件进行打包，最终生成hello.bundle.js打包文件。
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