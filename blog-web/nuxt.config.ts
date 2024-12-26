// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  runtimeConfig: {
    public: {
      baseURL: process.env.NUXT_PUBLIC_API_BASE
    }
  },
  devtools: { enabled: true },
  devServer: {
    port: 3100
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no',
      title: '欢迎访问重庆崽儿Brand的数字空间',
      meta: [
        { name: 'description', content: '重庆崽儿Brand的个人博客, 重庆崽儿Brand的生活成长, 重庆崽儿Brand的代码作品' },
        { name: 'keywords', content: '重庆崽儿Brand, Vue, React, blog, 首页, JavaScript, js, css, html, web前端, 前端开发, 个人博客' },
        { name: 'author', content: '重庆崽儿Brand,Brand' },
        { name: 'renderer', content: 'webkit|ie-comp|ie-stand' },
      ],
      script: [],
      style: [],
      link: [
         {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      ]
    },
  },
  modules: [
    '@pinia/nuxt'
  ],
  plugins: [],
  css: [
    '@/assets/css/style.scss',
    '@/assets/css/preview.scss',
    '@/assets/css/monokai.css',
  ]
})
