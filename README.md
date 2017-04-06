[TOC]

# 步骤

## 创建工程项目

使用WebStorm，创建一个Express项目NPServer，模板采用EJS + PlainCSS。

> 使用Express版本是4.14.1，笔者这里无法使用express-generator创建4.15。
>
> 另关于jade和EJS的差别：前者更符合模板或者编程语言，后者更贴近html。如果多人合作，或者需要大量网络上的资源，建议EJS。如果单纯个人开发，或者技术实力较强，可以使用jade。

## 添加git相关

### 添加忽略文件

![](https://ws1.sinaimg.cn/large/41164137ly1fecq9bta4tj212x0o9gri.jpg)



![](https://ws1.sinaimg.cn/large/41164137ly1fecqansikhj20mw0g2mzs.jpg)



### github提交空文件夹

github本身不可以提交空文件夹。那么就需要使空文件夹不为空。

命令行进入工程目录下，输入下面这句话：

~~~
find . -type d -empty -exec touch {}/.gitignore \;
~~~



### 添加github

![](https://ws1.sinaimg.cn/large/41164137ly1fecqgvec4ej20r807fgvl.jpg)



选择git后，在将其分享到github上。

![](https://ws1.sinaimg.cn/large/41164137ly1fecqj1q96ij20fd0bnagb.jpg)



成功后如下图

![](https://ws1.sinaimg.cn/large/41164137ly1fecqlzdzefj21580iggr4.jpg)



## 添加第三方框架包

在`package.json`文件中，修改为如下：

~~~json
{
  "name": "npserver",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www"
  },
  "dependencies": {
    "body-parser": "~1.16.0",
    "cookie-parser": "~1.4.3",
    "debug": "~2.6.0",
    "ejs": "~2.5.5",
    "express": "~4.14.1",
    "morgan": "~1.7.0",
    "serve-favicon": "~2.3.2",
    "mysql":  "^2.13.0",
    "mdui": "^0.1.2",
    "eustia": "^0.4.0"
  }
}
~~~



> **mysql**：使用mysql数据库用；
>
> **mdui**：Material Design User Interface，MDUI 是一套基于 Material Design 的前端框架。轻量级、多主题切换、响应式、无依赖。http://www.mdui.org/
>
> **eustia**：Eustia是一个用于生成JavaScript函数库的工具。它能够扫描代码实时生成只包含所需方法的函数库。目前默认函数库除了underscore中使用较多的each、template等函数外，还包含类创建、cookie操作、Dom操作、日期格式化等实用的小库，共150+个模块，日常不断更新中。http://eustia.liriliri.io/



然后执行npm更新。



> 如果npm更新缓慢，建议更换国内的淘宝源。
>
> ~~~
> npm config set registry https://registry.npm.taobao.org
> ~~~



### 配置eustia

在项目根目录下，新建配置文件`.eustia`，修改为如下:

~~~json
{
  "page": {
    "files":["./layout/**/*.jade","./views/*.ejs","./views/**/*.ejs"] ,
    "output": "./static/js/eustia.js"
  },
  "node": {
    "files": ["./lib/*.js", "./tool/**/*.js","./routes/**/*.js","./routes/*.js"],
    "output": "./lib/util.js"
  }
}
~~~



在项目的根目录下，创建`eustia.js`文件，并修改为如下：

~~~javascript
var util = require('./util');
util.random();
util.dateFormat();
~~~



在命令行中切换到项目根目录下，然后执行下面的命令。

~~~
eustia build
~~~



此时，应该在项目的根目录下生成一个`util.js`文件。路面含有`dateFormat`和`random`方法。

> 如果使用`eustia`添加别的小类库，请查找方法名，并修改`eusti.js`文件，之后重新build即可。



### 配置mdui

将`node_modules`下的`mdui/dist`文件夹下的文件考出，放置在项目文件夹下。然后在所需要的页面文件中，配置即可。

![](https://ws1.sinaimg.cn/large/41164137ly1fecw0y49d2j20vm0gjjtx.jpg)



~~~html
<link rel='stylesheet' href='/stylesheets/mdui/css/mdui.min.css' />
~~~

> 笔者暂未找到直接使用node_modules里的方法。



