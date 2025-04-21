<!-- components/AdBanner.vue -->
<template>
    <ins
      class="adsbygoogle"
      style="display: block"
      :data-ad-client="adClient"
      :data-ad-slot="adSlot"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  </template>
  
  <script setup lang="ts">
  import { onMounted } from 'vue'
  
  const props = defineProps({
    adClient: {
      type: String,
      required: true,
    },
    adSlot: {
      type: String,
      required: true,
    },
    format: {
      type: String,
      default: 'auto',
    },
    responsive: {
      type: String,
      default: 'true',
    },
  })
  
  onMounted(() => {
    // @ts-ignore
    if (window.adsbygoogle) {
      try {
        // @ts-ignore
        (adsbygoogle = window.adsbygoogle || []).push({})
      } catch (e) {
        console.error('Adsense error:', e)
      }
    }
  })
  </script>
  