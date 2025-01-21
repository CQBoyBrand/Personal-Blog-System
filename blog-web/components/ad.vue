<template>
  <div class="ad-carousel">
    <swiper
      :initial-slide="0"
      :loop="true"
      :direction="'vertical'"
      :autoplay="{ delay: interval, disableOnInteraction: false }"
      :mousewheel="true"
      :auto-height="true"
      :set-wrapper-size="true"
      :modules="[Autoplay, Mousewheel, Pagination, Navigation]"
      class="my-swiper"
    >
      <swiper-slide v-for="(ad, index) in ads" :key="index">
        <slot :ad="ad">
          <a :href="ad.adUrl" target="_blank" rel="nofollow">
            <img :src="ad.adImage" :alt="ad.adName" />
          </a>
        </slot>
      </swiper-slide>

      <!-- 添加分页器 -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Mousewheel, Pagination, Navigation } from "swiper/modules";

// Swiper 样式
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/mousewheel";
import "swiper/css/pagination";
import "swiper/css/navigation";
// Props
const props = defineProps({
  ads: {
    type: Array,
    default: () => [],
  },
  interval: {
    type: Number,
    default: 3000, // 自动切换时间（毫秒）
  },
});
</script>

<style scoped>
.ad-carousel {
  width: 100%;
  height: 60px; /* 自定义广告高度 */
  overflow: hidden;
}

.my-swiper {
  height: 100%;
}

.swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #fff;
}

.swiper-slide img {
  width: 100%;
  height: 60px;
  object-fit: contain;
}

.swiper-pagination {
  bottom: 5px;
}
</style>
