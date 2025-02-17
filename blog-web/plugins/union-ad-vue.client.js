import { defineNuxtPlugin } from '#app';
import { createUnionAdComponent } from 'union-ad-vue';
import { h } from 'vue';

export default defineNuxtPlugin((nuxtApp) => {
  const UnionAd = createUnionAdComponent(h);
  nuxtApp.vueApp.component('UnionAd', UnionAd);
});
