// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  runtimeConfig: {
    public: {
      baseURL: process.env.API
    }
  },
  devtools: { enabled: true },
  devServer: {
    port: 3100
  },
  build: {
    transpile: ["swiper"],
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      charset: 'utf-8',
      htmlAttrs: {
        lang: "zh-CN"
      },
      viewport: 'width=device-width, initial-scale=1, minimum-scale=1',
      title: '重庆崽儿Brand的网络世界',
      meta: [
        { name: 'description', content: '重庆崽儿Brand的个人博客, 记录和分享生活成长、代码、诗与远方' },
        { name: 'keywords', content: '重庆崽儿Brand, Vue, React, blog, 首页, JavaScript, js, css, html, web前端, 前端开发, 个人博客' },
        { name: 'author', content: '重庆崽儿Brand,Brand' },
        { name: 'google-site-verification', content: process.env.GOOGLE_CONSOLE },
        { name: 'msvalidate.01', content: process.env.BING_CONSOLE },
        { name: 'google-adsense-account', content: process.env.GOOGLE_AD },
        // { name: 'sogou_site_verification', content: process.env.SOUGO_CONSOLE },
        // { "http-equiv": 'Content-Type', content: process.env.SOUGO_CONSOLE_TYPE },
        { name: '360-site-verification', content: process.env.QIHOO360_CONSOLE },
        { name: 'baidu-site-verification', content: process.env.BAIDU_CONSOLE },
        { name: 'renderer', content: 'webkit|ie-comp|ie-stand' },
        // { name: 'baidu_union_verify', content: process.env.BAIDU_UNION },
      ],
      script: [
        {src: `https://hm.baidu.com/hm.js?${process.env.BAIDU_TONGJI}`, async: true },
        {
          src: `https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_CONSOLE}`,
          async: true
        },
        {
          children: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GOOGLE_CONSOLE}');
          `,
          type: 'text/javascript',
          tagPosition: 'head',
        },
        {src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.GOOGLE_AD}`, async: true, crossorigin: 'anonymous'},
      ],
      style: [],
      link: [
         {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
         {rel: 'canonical', href: 'https://www.brandhuang.com'},
        { rel: 'alternate', type: 'application/rss+xml', href: '/rss.xml', title: 'RSS' },
        { rel: 'sitemap', type: 'application/xml', href: '/sitemap.xml' }
      ]
    },
  },
  modules: [
    // '@pinia/nuxt'
  ],
  plugins: [
    "@/plugins/union-ad-vue.client.js"
  ],
  css: [
    '@/assets/css/style.scss',
    '@/assets/css/preview.scss',
    '@/assets/css/monokai.css',
  ]
})
