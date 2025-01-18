import { defineNuxtPlugin } from '#app';
import {createUnionAdComponent} from 'union-ad-vue';
// import 'union-ad-vue/dist/style.css';

export default defineNuxtPlugin((nuxtApp) => {
  // 注册广告组件
  const UnionAd = createUnionAdComponent(h);
  nuxtApp.vueApp.component('UnionAd', UnionAd);
});