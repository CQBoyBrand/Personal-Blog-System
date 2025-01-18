<template>
    <div 
      class="vertical-ad-carousel" 
      ref="carousel" 
      @mouseover="stopCarousel" 
      @mouseleave="startCarousel"
    >
      <!-- 广告容器 -->
      <div class="ad-container" :style="{ transform: `translateY(-${currentIndex * adHeight}px)` }">
        <div v-if="ads.length === 0" style="line-height: 60px;letter-spacing: 2em;">广而告之</div>
        <div class="ad" v-for="(ad, index) in ads" :key="index">
          <slot :ad="ad">
            <a :href="ad.adUrl" ref="nofollow" target="_blank">
                <img :src="ad.adImage" :alt="ad.adName" />
            </a>
          </slot>
        </div>
      </div>
      
      <!-- 控制按钮 -->
      <div class="controls" v-if="ads.length > 0">
        <button @click="prevAd">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M12 8l-6 6h12z" /> <!-- 上箭头 -->
          </svg>
        </button>
        <button @click="nextAd">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M12 16l6-6H6z" /> <!-- 下箭头 -->
          </svg>
        </button>
      </div>



    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  // 定义广告内容，可以传递到组件外部
  const props = defineProps({
    ads: {
      type: Array,
      default: () => [],
    },
    interval: {
      type: Number,
      default: 3000, // 每个广告停留时间（毫秒）
    },
  });
  console.log(props.ads);
  const currentIndex = ref(0); // 当前广告索引
  const carousel = ref(null); // 轮播容器引用
  let intervalId = null; // 定时器 ID
  let adHeight = 0; // 单个广告的高度
  
  // 自动轮播功能
  const startCarousel = () => {
    intervalId = setInterval(nextAd, props.interval);
  };
  
  // 停止轮播功能
  const stopCarousel = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };
  
  // 切换到下一广告
  const nextAd = () => {
    currentIndex.value = (currentIndex.value + 1) % props.ads.length;
  };
  
  // 切换到上一广告
  const prevAd = () => {
    currentIndex.value =
      (currentIndex.value - 1 + props.ads.length) % props.ads.length;
  };
  
  // 在组件挂载后初始化
  onMounted(() => {
    adHeight = carousel.value.offsetHeight; // 获取单个广告的高度
    startCarousel();
  });
  
  // 在组件卸载前清除定时器
  onUnmounted(() => {
    stopCarousel();
  });
  </script>
  
  <style lang="scss" scoped>
  .vertical-ad-carousel {
    position: relative;
    overflow: hidden;
    height: 60px; // 单个广告高度
    width: 100%;
    // border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .ad-container {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    transition: transform 0.5s ease-in-out;
  }
  
  .ad {
    height: 60px; // 单个广告高度
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f9f9f9;
    // border-bottom: 1px solid #eee;
    font-size: 16px;
    color: #333;
    a {
        display: inline-block;
        width: 100%;
        height: 100%;
    }
    img {
        width: 100%;
        height: 100%;
    }
  }
  
  .controls {
  position: absolute;
  top: 50%;
  right: 5px;
  display: flex;
  flex-direction: column;
  transform: translateY(-50%);
  gap: 5px;
  z-index: 10;
}

.controls button {
  background-color: #007bff;
  color: #fff;
  border: none;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

// .controls button:hover {
//   background-color: #0056b3;
//   transform: scale(1.1);
// }

// .controls button:active {
//   transform: scale(0.9);
// }

.controls button svg {
  width: 10px;
  height: 10px;
  fill: #fff;
}

  </style>
  