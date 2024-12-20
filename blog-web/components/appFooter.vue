<template>
  <footer class="app-footer">
    <p>Powered By <a href="https://zh.nuxtjs.org/" rel="nofollow" target="_blank">Nuxt.js</a>，Designed By Brand</p>
    <p class="copyright">Copyright© 2017-{{currentYear}} <a href="https://github.com/CQBoyBrand" target="_blank">
      重庆崽儿Brand</a></p>
    <div style="height: 17px;">
      <a target="_blank" rel="nofollow" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=50011702500392"
         style="display:inline-block;text-decoration:none;height:20px;line-height:20px;">
        <img src="@/assets/images/beian.png" style="float:left;"/>
        <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">{{ siteConfig.psr }}</p></a>
    </div>
    <p><a href="http://beian.miit.gov.cn" rel="nofollow" target="_blank">{{ siteConfig.icp }}</a></p>
  </footer>
</template>

<script setup>
import { getSiteConfig } from '~/api/service';

const currentYear = new Date().getFullYear();
const { data: siteConfig } = await getSiteConfig()
</script>

<style scoped lang="scss">
.app-footer{
  text-align: center;
  font-size: 12px;
  background-color: #fff;
  padding: 10px 0;
  min-width: 320px;
  color: #939393;
  a{
    color: #939393;
  }
  .copyright{
    a{
      font-style: italic;
    }
  }
}
</style>
