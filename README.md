# Personal-Blog-System

> 好像 nodejs 17+ 不再支持 centos。选择服务器镜像可能需要注意下。

> centos安装高版本nodejs网上有办法解决，请自行搜索

### 项目 master 分支 使用技术栈及版本：
- Node.js(v20.14.0) (其他node版本可能会出问题)
- Mysql
- Nuxt.js(v3.14.159)
- React (v18.3.1) + Antd (v5.22.2)
- Nest.js

### 博客线上地址：
[https://www.brandhuang.com](https://www.brandhuang.com)

> 永久静态博客备份地址（部署在 netlify 上）
[https://blog.brandhuang.com](https://blog.brandhuang.com)
### 分支介绍
- **`master` 分支（默认分支）**

- **`v-ts` [分支](https://github.com/CQBoyBrand/Personal-Blog-System/tree/v-ts)**: 后续应该不会在更新了，项目能完整跑起来，能正常使用（如有需要，可自行克隆修改～）

        该分支前端使用 `Nuxt 2.4.0`，管理端使用`React 16.13.1`，服务端使用 `Nest.js`，数据库使用 `MySQL`


- **`v-new` [分支](https://github.com/CQBoyBrand/Koa2-nuxt-MySQL/tree/v-new )**：后续应该不会在更新了，项目能完整跑起来，能正常使用（如有需要，可自行克隆修改～）

        该分支前端使用 `Nuxt2.x.js`，管理端使用 `Vue2.X.js`，服务端使用 `Koa2`，数据库使用 `MySQL`

### 项目目录介绍
1. **blog-web** ：该文件夹存放前端代码（即用户访问的页面代码）
2. **blog-admin** ：该文件夹存放管理后台代码（后台管理系统，用来管理博客内容的地方）
3. **blog-server** ： 该文件夹用来提供 API 服务（即为 blog 和 admin 提供接口，进行与数据库的交互）
4. **nginxConfig** : 该文件夹是通过域名访问服务器的一些简单配置（请自行修改，更深了解请自行 Google）
5. **blog.sql** ：该文件是本博客线上使用的数据库文件（方便想使用本项目的人能轻松运行起来，数据库采用的 MySQL，请自行安装）


 ### 使用：
 分别在 `blog-admin`、`blog-web`、 `blog-server` 文件夹下执行依赖安装
 
 #### 安装依赖
 ```bash
 npm install
 # 或者
 yarn install

 ```
 #### 本地运行

 `servre` 端需要先全局安装 `nestjs` 脚手架
 
 ```md
    npm install -g @nestjs/cli
 ```

然后在 `server` 文件夹执行如下代码

```bash
    启动 admin 端服务：nest start -w backend
    启动 blog 端服务：nest start -w frontend
```
 #### 打包

 ```bash
//blog-web
        执行打包：npm run build
        // 请查看package.json 文件,
        // 根据 .env、.env.production、.env.test等 配置打包不通环境的版本
        // 打包部署需要上传以下 2 个文件（夹）
        .outtput
        ecosystem.config.js

        上传好文件后

        pm2启动服务:

        pm2 start


// admin-web
        在 .env, .env.production 中配置不同的环境

        执行打包：npm run build

        // 请查看package.json 文件,
        // 根据 .env、.env.production、.env.test等 配置打包不通环境的版本

        上传 dist 文件夹

// server
    
        // 这个不用打包，直接上传服务器

        node_modules下的文件就不要上传了，太大了，把其他文件上传服务器后运行  npm install 就好了
        
        注意自己复制 .env.example 粘贴为 .env 并修改其中内容

        修改 backend 和 frontend 下的 main.js，处理跨域问题

        const app = await NestFactory.create(AppModule,{
            // cors: {
            //     "origin": ['http://www.brandhuang.com','https://www.brandhuang.com','http://admin.brandhuang.com','https://admin.brandhuang.com'],
            //     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
            //     "preflightContinue": false,
            //     "optionsSuccessStatus": 204
            // }
            cors: true
        });
        
        在 server 端的根目录下（此启动方式用于本地开发，服务端部署时，启动方式请看最下面！）

        运行：
        nest start -w backend 启动 admin 端的接口服务

        运行：
        nest start -w frontend 启动 web 端的接口服务
            
       
// blog.sql

        本项目的数据库结构文件。数据库用的mysql
        
        
        根据前面的配置，本地安装的有mysql，导入数据库文件后，应该就能把整个项目跑起来了
```

### 初次使用本项目请注意
由于数据库没有初始数据，要登录后台需要先注册用户

`（2020年8月更新： 使用admin-web时，请先自行注册一个账号。）`

操作详情参考：[issues #8](https://github.com/CQBoyBrand/Koa2-nuxt-MySQL/issues/8)

 **部署 `Server` 端注意了！！！**

 建议在本地执行 `npm run build frontend` 和 `npm run build backend` 完后

 将 `dist` 目录下的 `frontend` 和 `backend` 文件夹放到服务器上的 `dist` 文件夹中。

 然后启动（我用 `pm2`）:
 ```bash
// 请查看package.json 文件,启动不同的端和环境，例如：
// 启动 web 端测试环境
npm run pm2frontend:test
// 启动 admin 端测试环境
npm run pm2backend:test
// 启动 web 端生产环境
npm run pm2frontend:prod
// 启动 admin 端生产环境
npm run pm2backend:prod
 ```

 (**请执行完一个就部署一个**，因为 `dist` 文件夹会被覆盖，在本地运行的时候你会发现 `dist` 目录下可以同时存在 `frontend` 和 `backend` 两个文件夹，**但是** `build` 的时候不会！！)
 
 ### 服务器部署教程
 1. 项目比较详细、完整的部署请看我的文章：[http://www.brandhuang.com/article/1552997590733](http://www.brandhuang.com/article/1552997590733)
 
 2. 项目比较详细、完整的部署请看我的文章(备用地址一)：[https://juejin.im/post/6844903558895124488](https://juejin.im/post/6844903558895124488)
  
 3. 项目比较详细、完整的部署请看我的文章(备用地址二)：[https://segmentfault.com/a/1190000013095046](https://segmentfault.com/a/1190000013095046)
 
  我 1 核 1G 的垃圾服务器在服务器直接执行 `nest start frontend` ，直接卡爆。。。,高配置的应该没啥问题吧

### 公众号「九零后重庆崽儿」

![公众号](./brandQRcode.jpg)

### 小程序「工具人助手」

面向娃编程，无聊写了个微信小程序，目前支持算术题打印、自定义字帖打印、口算练习、汉字笔顺练习。欢迎扫码体验

![工具人助手](./qrcode.jpg)
  
  ## 感谢你的支持
