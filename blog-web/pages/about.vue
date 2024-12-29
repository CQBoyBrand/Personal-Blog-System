<template>
  <div class="about">
    <div class="about-me">关于我</div>
    <div class="clearfix about-me-detail">
      <div class="about-me-left">
        <img src="https://s.gravatar.com/avatar/d8065bea49aa2877ce13686772727711?s=80" alt="重庆崽儿Brand">
        <h5>重庆崽儿Brand</h5>
      </div>
      <ul class="about-me-right">
        <li>2016年 <a href="https://www.ysu.edu.cn/">[燕山大学]</a>大学本科毕业，毕业从事前端开发至今</li>
        <li>90后瘦宅，喜欢美剧、爬山、徒步、篮球、乒乓球、羽毛球等球类；还爱养龟</li>
        <li>工作主要使用的是Vue.js、React.js，平时自己偶尔折腾下Node.js</li>
        <li>轻微强迫症，对代码有一点点洁癖</li>
        <li>喜欢看足球，C罗粉</li>
        <li>在学拍照，但是还没有认真去拍过</li>
        <li>未完待续</li>
      </ul>
    </div>
    <div class="about-site">关于本站</div>
    <div class="site-box">
      <div class="site-descript">
        本站当初建立，主要是自己为了使用新学的技术，因为当初在工作中一直使用的原生和 JQuery 开发，新的框架在工作中一直没有使用的机会，于是只能自己来练手了。这个博客从2017年上线至今，现在它不仅仅是我练手的站点了，也是我自己用来记录学习、工作和一切自己想记录的东西的地方。感谢访问
        <a href="http://www.brandhuang.com">我的博客</a>。
        <div>
          博客界面如果你觉得有些丑，请保留～。反正我是看心情修改。如果你有一些简约看着又不错的博客界面，可以给我留言或者邮件，我参考参考。
        </div>
        <div style="text-align: center;">
          <img src="http://static.brandhuang.com/Hi-brand-dongtu.gif" alt="hi-brand" />
        </div>
      </div>
      <div>
        本站所用技术栈：
      </div>
      <div class="site-tech">
        <div>前端：Nuxt.js（V3）</div>
        <div>管理端：React.js (V18) + Antd (v5)</div>
        <div>服务端：Nest.js</div>
        <div>数据库：Mysql</div>
        <div>本站源码Github：<a href="https://github.com/CQBoyBrand/Personal-Blog-System" target="_blank">Personal-Blog-System</a></div>
      </div>
    </div>
  </div>
</template>

<script setup>
  useHead({
    title: "关于重庆崽儿Brand",
    meta: [
      { name: 'keywords', content: "重庆崽儿Brand, Brand, 重庆崽儿, 崽儿" },
      { name: 'description', content: "站长的自我介绍"}
    ]
  })
</script>

<style lang="scss" scoped>
  .about{
    background-color: #fff;
    padding: 15px 0;
    box-sizing: border-box;
    .about-me,
    .contact-me,
    .about-site{
      text-align: center;
      font-size: 18px;
      line-height: 60px;
      color: #333;
    }
    .about-me-detail{
      max-width: 800px;
      margin: 0 auto;
      padding: 15px;
      .about-me-left{
        padding-bottom: 10px;
        img{
          display: block;
          width: 80px;
          height: 80px;
          margin: 0 auto;
          border-radius: 50%;
        }
        h5{
          padding: 8px 0 0;
        }
      }
      .about-me-right{
        font-size: 13px;
        li{
          list-style: none;
          line-height: 20px;
        }
      }
    }
    .friends-list-wrap{
      max-width: 800px;
      margin: 0 auto;
      padding: 15px;
      li{
        float: left;
        background-color: #eee;
        list-style: none;
        border-radius: 4px;
        margin-bottom: 7px;
        margin-right: 7px;
        a{
          display: inline-block;
          width: 100%;
          height: 100%;
          line-height: 38px;
          padding: 0px 10px;
        }
      }
    }
    .site-box{
      padding: 15px;
      font-size: 13px;
      line-height: 24px;
      box-sizing: border-box;
      .site-descript{
        text-indent: 2em;
        padding-bottom: 15px;
      }
      .site-tech{
        padding: 8px 0 8px 2em;
        box-sizing: border-box;
      }
    }
    @media screen and (min-width: 769px) {
      .about-me-left,.about-me-right{
        float: left;
      }
      .about-me-left{
        width: 100px;
        margin: 0 auto;
        text-align: center;
      }
      .about-me-right{
        max-width: 600px;
        margin-left: 20px;
        li{
          padding-bottom: 15px;
        }
      }
    }
    @media screen and (max-width: 768px) {
      .about-me-left{
        width: 100%;
        margin: 0 auto;
        text-align: center;
      }
      .about-me-right{
        padding-bottom: 15px;
      }
    }
  }
  a{
        color: #409EFF;
      }
</style>
