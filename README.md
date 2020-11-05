# IOeditor
## 简介
一款在windows下运行的编辑器. 可以简单的运行代码(包括但不限于C,C++,java,python), 省略了创建项目与配置环境的操作, 可以将更多精力用于内容的书写.

## 面向群众
OIer/Acmer

## 运行
### 直接运行
注:不建议直接运行，建议打包后再使用
clone本仓库后使用yarn运行，输入
`npm i yarn -g`
即可安装 yarn,安装后通过
`yarn electron:serve`
打开界面
### 打包后运行
clone本仓库后使用yarn打包
`yarn electron:build`
即可打包至dist_electron目录下，点击exe即可运行
### 直接下载
[下载链接](http://photos.sunhr.top/shride.zip)



## ide使用
打开界面后可以使用下列快捷键进行部分操作
|快捷键|作用|
|----|----|
|Ctrl + C|复制|
|Ctrl + V|粘贴|
|Ctrl + Z|撤回|
|Ctrl + =|放大|
|Ctrl + -|缩小|
|选中 + Ctrl + /|注释选中部分|
|选中 + Tab|选中部分后移|
|选中 + Shift + Tab|选中部分前移|
|F5|编译并允许代码|

##  目录解释
-src
|- assets           储存一些文件，包括但不限于monaco-editor,mingw64,python
|- components       一些功能的实现，比如判断文件使用的语言，调用批处理文件
|- router
|- store
|- views
|- App.vue          样式设计
|- background.js    入口文件


## 更新日志
### 2020-10-15 16：00 更新至0.2.0
#### 更新内容
增加了翻译键，可以进行简单的翻译功能，在此感谢百度

## 联系作者
email: Sunhr520@gmail.com