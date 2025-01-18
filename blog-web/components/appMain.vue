<template>
  <main class="app-main">
    <div class="main-left">
      <NuxtPage :page-key="route => route.fullPath"/>
    </div>
    <sidebar class="main-side"></sidebar>
  </main>
</template>

<script setup>
  import sidebar from '@/components/sidebar'
</script>

<style lang="scss">
.app-main{
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1140px;
  @media screen and (max-width: 920px) {
    min-width: 320px;
    width: 100%;
  }
  .main-left{
    flex: 1;
    overflow: hidden;
    margin: 15px 0;
    width: 820px;
    border-radius: 6px;
    @media screen and (max-width: 920px) {
      width: 100%;
      min-width: 320px;
    }
  }
  .main-side{
    margin-top: 15px;
    margin-bottom: 15px;
    @media screen and (min-width: 920px){
      width: 320px;
      margin-left: 20px;
    }
    @media screen and (max-width: 920px) {
      width: 100%;
      min-width: 320px;
      margin-top: 0;
    }
  }
}
</style>
