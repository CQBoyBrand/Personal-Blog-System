# Blog System
## 本项目暂时停更啦
> 服务器到期了，续费太贵，暂时用静态博客了。本项目暂时不做更新了。

> 截止 2022年8月12日，建议使用 node 版本：14，不要使用16版本，否则安装依赖会报错！

## 博客线上地址：
[http://www.brandhuang.com](http://www.brandhuang.com)
## 分支介绍
- **`v-ts` 分支(默认分支)**：目前一直在更新的版本，计划用 `TypeScript` 重构

> 该分支前端使用 `Nuxt.js`，管理端使用 ~~`Vue2.X.js`~~（已换成 `React.js`），服务端使用 `Nest.js`，数据库使用 `MySQL`

- **`v-new` [分支](https://github.com/CQBoyBrand/Koa2-nuxt-MySQL/tree/v-new )**：后续应该不会在更新了，项目能完整跑起来，能正常使用（如有需要，可自行克隆修改～）

> 该分支前端使用 `Nuxt.js`，管理端使用 `Vue2.X.js`，服务端使用 `Koa2`，数据库使用 `MySQL`

## 项目目录介绍
1. **blog** ：该文件夹存放前端代码（即用户访问的页面代码）
2. **admin** ：该文件夹存放管理后台代码（即博主用来管理博客内容的地方）
3. **server** ： 该文件夹用来提供 API 服务（即为 blog 和 admin 提供接口，进行与数据库的交互）
4. **nginxConfig** : 该文件夹是通过域名访问服务器的一些简单配置（请自行修改，更深了解请自行 Google）
5. **blog.sql** ：该文件是本博客线上使用的数据库文件（方便想使用本项目的人能轻松运行起来，数据库采用的 MySQL，请自行安装）

# 注意：**`新的sql文件调整了字段`**
如果已经部署了之前的代码的朋友，想要使用新的代码，请照sql文件自行调整～（数据库字段更改日期：2020年8月27日）

**世界不毁灭，折腾不停止！**
> 本分支将继续折腾我的个人博客，计划如下

- [ ] **blog**：打算采用 `TypeScript` 重构。
- [x] **admin**：计划用 React 重构。
- [x] **server**：计划近期用 `nest.js` 进行重构（纯粹是想学习用用 `TypeScript`）

**后续主要按 Vue + React + nodejs 这样的技术栈来玩，博客功能应该暂时就这么多了，后面主要是优化代码，写的代码实在是太烂了。。**

 ## 使用：
 分别在 `admin`、`blog`、 `server` 文件夹下执行依赖安装
 
 ### 安装依赖
 ```bash
 npm install
 # 或者
 yarn install

 ```
 ### 本地运行

 `servre` 端需要先全局安装 `nestjs` 脚手架
 
 ```md
    npm install -g @nestjs/cli
 ```

然后在 `server` 文件夹执行如下代码

```bash
    启动 admin 端服务：nest start -w backend
    启动 blog 端服务：nest start -w frontend
```
 ### 打包

 ```bash
//blog
        执行打包：npm run build

        // 打包部署需要上传以下 4 个文件（夹）
        .nuxt
        server
        pakage.json
        nuxt.config.js

        最好在服务器这四个文件(夹)的同一级目录下新建一个static来放favicon.ico文件,要不然这个图片显示不出来

        上传好文件后，记得执行 npm install 安装依赖

        pm2启动服务:
        pm2 start npm --name "blog" -- run start


// admin
        在.env,  .env.production中配置不同的环境

        执行打包：npm run build

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

`（2020年8月更新：sql文件中内置了一条用户数据：账号：admin，密码：123; 如果没有数据，请自行注册。）`

操作详情参考：[issues #8](https://github.com/CQBoyBrand/Koa2-nuxt-MySQL/issues/8)

 **部署 `Server` 端注意了！！！**

 建议在本地执行 `npm run build frontend` 和 `npm run build backend` 完后

 将 `dist` 目录下的 `frontend` 和 `backend` 文件夹放到服务器上的 `dist` 文件夹中。

 然后启动（我用 `pm2`）:
 ```bash
pm2 start npm --name "frontend" -- run frontend
pm2 start npm --name "backend" -- run backend
 ```

 (**请执行完一个就部署一个**，因为 `dist` 文件夹会被覆盖，在本地运行的时候你会发现 `dist` 目录下可以同时存在 `frontend` 和 `backend` 两个文件夹，**但是** `build` 的时候不会！！)
 
 ### 服务器部署教程
 1. 项目比较详细、完整的部署请看我的文章：[http://www.brandhuang.com/article/1552997590733](http://www.brandhuang.com/article/1552997590733)
 
 2. 项目比较详细、完整的部署请看我的文章(备用地址一)：[https://juejin.im/post/6844903558895124488](https://juejin.im/post/6844903558895124488)
  
 3. 项目比较详细、完整的部署请看我的文章(备用地址二)：[https://segmentfault.com/a/1190000013095046](https://segmentfault.com/a/1190000013095046)
 
  我 1 核 1G 的垃圾服务器在服务器直接执行 `nest start frontend` ，直接卡爆。。。,高配置的应该没啥问题吧

# 公众号「九零后重庆崽儿」

![公众号](./brandQRcode.jpg)

# 小程序「工具人助手」

面向娃编程，无聊写了个微信小程序，目前支持算术题打印、自定义字帖打印、口算练习、汉字笔顺练习。欢迎扫码体验

![工具人助手](./qrcode.png)
  
  ## 感谢你的支持
